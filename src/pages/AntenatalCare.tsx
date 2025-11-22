import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Shield, Users, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const AntenatalCare = () => {
  const navigate = useNavigate();
  const [weeksPregnant, setWeeksPregnant] = useState<number>(0);
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    // Get weeks from pregnantInfo
    const pregnantInfoStr = sessionStorage.getItem("pregnantInfo");
    if (pregnantInfoStr) {
      try {
        const pregnantInfo = JSON.parse(pregnantInfoStr);
        setWeeksPregnant(parseInt(pregnantInfo.weeks || "0"));
        // Check if location was shared (could be enhanced to get actual location)
        if (pregnantInfo.shareLocation) {
          setLocation("your area");
        }
      } catch (error) {
        console.error("Error parsing pregnantInfo:", error);
      }
    }
  }, []);

  const careSchedule = [
    {
      weeks: "0-12",
      title: "First Trimester",
      checks: [
        "Initial health assessment",
        "Blood pressure monitoring",
        "Basic blood tests",
        "Ultrasound if available",
        "Folic acid supplementation",
      ],
      crisisNote: "During crisis situations, prioritize finding safe shelter and basic nutrition. If medical facilities are limited, seek community health workers or mobile clinics.",
    },
    {
      weeks: "13-27",
      title: "Second Trimester",
      checks: [
        "Regular blood pressure checks",
        "Anemia screening",
        "Growth monitoring",
        "Anatomy scan (if facilities available)",
        "Iron and vitamin supplements",
      ],
      crisisNote: "Maintain hydration and nutrition. If displacement occurs, try to maintain continuity of care with any available health services.",
    },
    {
      weeks: "28-40",
      title: "Third Trimester",
      checks: [
        "Weekly blood pressure monitoring",
        "Fetal movement tracking",
        "Position checks",
        "Birth planning",
        "Emergency contact preparation",
      ],
      crisisNote: "Prepare an emergency birth kit. Identify safe delivery locations and trusted birth attendants. Keep emergency contacts accessible.",
    },
  ];

  const essentialTips = [
    {
      icon: Heart,
      title: "Nutrition in Crisis",
      content: "Eat whatever safe, nutritious food is available. Prioritize protein, iron-rich foods, and hydration. If supplements are available, take folic acid and iron as recommended.",
    },
    {
      icon: Shield,
      title: "Safety First",
      content: "Stay in safe areas when possible. Avoid exposure to smoke, chemicals, or unsafe water. Rest when you can, even in difficult circumstances.",
    },
    {
      icon: Users,
      title: "Community Support",
      content: "Connect with other pregnant women in your community. Share resources and information. Community health workers or traditional birth attendants can provide valuable support.",
    },
    {
      icon: AlertCircle,
      title: "Warning Signs",
      content: "Seek immediate help if you experience: severe abdominal pain, heavy bleeding, severe headaches, vision problems, severe swelling, or reduced fetal movement after 28 weeks.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 p-6 pb-32">
      <div className="max-w-3xl mx-auto space-y-6 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Button
          variant="ghost"
          onClick={() => navigate("/appointment")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Antenatal Care Guide
          </h1>
          <p className="text-muted-foreground">
            Personalized care information for {location || "your area"} during pregnancy
          </p>
          {weeksPregnant > 0 && (
            <p className="text-sm text-primary font-medium">
              You are currently {weeksPregnant} weeks pregnant
            </p>
          )}
        </div>

        {/* Crisis Context Banner */}
        <Card className="p-6 bg-destructive/10 border-destructive/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">
                Care During Crisis Situations
              </h3>
              <p className="text-sm text-muted-foreground">
                This guide is adapted for areas experiencing conflict or crisis. 
                Medical facilities may be limited, but essential care can still be provided 
                through community health workers, mobile clinics, or traditional birth attendants. 
                Your safety and your baby's health are the priority.
              </p>
            </div>
          </div>
        </Card>

        {/* Care Schedule */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Recommended Care Schedule
          </h2>
          {careSchedule.map((period, index) => (
            <Card key={index} className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">
                    {period.title}
                  </h3>
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Weeks {period.weeks}
                  </span>
                </div>
                <div className="space-y-2 mt-4">
                  <p className="text-sm font-medium text-foreground">
                    Recommended checks:
                  </p>
                  <ul className="space-y-2">
                    {period.checks.map((check, checkIndex) => (
                      <li key={checkIndex} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span className="text-sm text-muted-foreground">{check}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Crisis adaptation:</strong> {period.crisisNote}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Essential Tips */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Essential Tips for Your Pregnancy
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {essentialTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <Card key={index} className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {tip.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tip.content}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Emergency Information */}
        <Card className="p-6 bg-primary/10 border-primary/20">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              When to Seek Immediate Help
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-destructive">•</span>
                <span>Severe abdominal pain or cramping</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">•</span>
                <span>Heavy vaginal bleeding</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">•</span>
                <span>Severe headaches or vision problems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">•</span>
                <span>Severe swelling of hands, face, or feet</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">•</span>
                <span>No fetal movement after 28 weeks (for more than 2 hours)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">•</span>
                <span>Water breaking before 37 weeks</span>
              </li>
            </ul>
            <p className="text-sm font-medium text-foreground mt-4">
              In crisis situations, seek help from any available medical facility, 
              community health worker, or emergency services. Your safety is the priority.
            </p>
          </div>
        </Card>

        {/* Action Button */}
        <div className="pt-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/emergency-services")}
          >
            View Emergency Services
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AntenatalCare;

