import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const Appointment = () => {
  const navigate = useNavigate();
  const [weeksPregnant, setWeeksPregnant] = useState<number>(0);
  const [nextAppointment, setNextAppointment] = useState<{
    weeks: number;
    description: string;
  } | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // Get weeks from pregnantInfo stored in PregnantInfo page
    const pregnantInfoStr = sessionStorage.getItem("pregnantInfo");
    let weeks = 0;
    if (pregnantInfoStr) {
      try {
        const pregnantInfo = JSON.parse(pregnantInfoStr);
        weeks = parseInt(pregnantInfo.weeks || "0");
      } catch (error) {
        console.error("Error parsing pregnantInfo:", error);
      }
    }
    setWeeksPregnant(weeks);

    // Calculate next appointment based on weeks pregnant
    let nextApp;
    if (weeks < 12) {
      nextApp = { weeks: 12, description: "First trimester screening" };
    } else if (weeks < 20) {
      nextApp = { weeks: 20, description: "Anatomy scan" };
    } else if (weeks < 28) {
      nextApp = { weeks: 28, description: "Third trimester checkup" };
    } else if (weeks < 32) {
      nextApp = { weeks: 32, description: "Regular checkup" };
    } else if (weeks < 36) {
      nextApp = { weeks: 36, description: "Weekly checkup begins" };
    } else {
      nextApp = { weeks: weeks + 1, description: "Weekly monitoring" };
    }

    setNextAppointment(nextApp);
  }, []);

  const handleBookAppointment = () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!dateOfBirth) {
      toast.error("Please enter your date of birth");
      return;
    }
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time for your appointment");
      return;
    }

    sessionStorage.setItem(
      "appointment",
      JSON.stringify({
        name,
        dateOfBirth,
        isRegistered,
        date: selectedDate,
        time: selectedTime,
        type: nextAppointment?.description,
      })
    );

    toast.success("Appointment requested successfully!");
    setTimeout(() => navigate("/"), 1500);
  };

  const weeksUntilAppointment = nextAppointment
    ? nextAppointment.weeks - weeksPregnant
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 p-6 pb-32">
      <div className="max-w-2xl mx-auto space-y-6 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Button
          variant="ghost"
          onClick={() => navigate("/symptoms")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Your Next Appointment
          </h1>
          <p className="text-muted-foreground">
            Based on your pregnancy progress
          </p>
        </div>

        {/* Current Status */}
        <Card className="p-6 space-y-4 bg-gradient-to-br from-secondary/20 to-secondary/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Currently</p>
              <p className="text-3xl font-bold text-foreground">
                {weeksPregnant} weeks
              </p>
            </div>
            <Calendar className="w-12 h-12 text-primary" />
          </div>
        </Card>

        {/* Next Appointment Info */}
        {nextAppointment && (
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">
                Recommended Appointment
              </h2>
              <p className="text-2xl font-bold text-primary">
                Week {nextAppointment.weeks}
              </p>
              <p className="text-muted-foreground">
                {nextAppointment.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                <Clock className="w-4 h-4" />
                <span>
                  In approximately {weeksUntilAppointment}{" "}
                  {weeksUntilAppointment === 1 ? "week" : "weeks"}
                </span>
              </div>
            </div>
          </Card>
        )}

        {/* Book Appointment Form */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Request An Appointment For {nextAppointment?.description || "Appointment"}
          </h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="h-12"
              />
            </div>

            <h3 className="text-lg font-semibold text-foreground">
            Appointment Details
            </h3>

            <div className="space-y-2">
              <Label htmlFor="date">Preferred Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Preferred Time</Label>
              <Input
                id="time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Your nearest clinic
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                <div className="space-y-0.5">
                  <Label htmlFor="registered" className="text-base font-semibold">
                    Are you registered at this clinic?
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Check if you're already a patient here
                  </p>
                </div>
                <Switch
                  id="registered"
                  checked={isRegistered}
                  onCheckedChange={setIsRegistered}
                />
              </div>
            </div>

          </div>
        </Card>

        {/* Antenatal Care Info Button */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-base font-semibold text-foreground">
                Want more info about your pregnancy?
              </p>
              <p className="text-sm text-muted-foreground">
                Learn more about antenatal care personalized to your situation
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/antenatal-care")}
              className="shrink-0"
            >
              <Info className="w-4 h-4 mr-2" />
              Learn More
            </Button>
          </div>
        </Card>

        {/* Book Button */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent">
          <div className="max-w-2xl mx-auto">
            <Button
              size="lg"
              className="w-full h-14 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
              style={{ background: "var(--gradient-warm)" }}
              onClick={handleBookAppointment}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Request Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
