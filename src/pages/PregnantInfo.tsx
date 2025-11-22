import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const PregnantInfo = () => {
  const navigate = useNavigate();
  const [weeks, setWeeks] = useState("");
  const [shareLocation, setShareLocation] = useState(false);
  const [condition, setCondition] = useState("");

  const handleNext = () => {
    if (!weeks || parseInt(weeks) < 1 || parseInt(weeks) > 42) {
      toast.error("Please enter a valid number of weeks (1-42)");
      return;
    }

    // Store data in session storage for now
    sessionStorage.setItem(
      "pregnantInfo",
      JSON.stringify({ weeks, shareLocation, condition })
    );

    navigate("/symptoms");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 p-6">
      <div className="max-w-md mx-auto space-y-6 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Let's Get to Know You
          </h1>
          <p className="text-muted-foreground">
            Help us provide the best care for you and your baby
          </p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-lg space-y-6 border border-border">
          <div className="space-y-2">
            <Label htmlFor="weeks" className="text-base font-semibold">
              How far along are you?
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="weeks"
                type="number"
                min="1"
                max="42"
                placeholder="e.g., 20"
                value={weeks}
                onChange={(e) => setWeeks(e.target.value)}
                className="h-12 text-lg"
              />
              <span className="text-muted-foreground font-medium">weeks</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
              <div className="space-y-0.5">
                <Label htmlFor="location" className="text-base font-semibold">
                  Share my location
                </Label>
                <p className="text-sm text-muted-foreground">
                  Help find nearby midwives
                </p>
              </div>
              <Switch
                id="location"
                checked={shareLocation}
                onCheckedChange={setShareLocation}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition" className="text-base font-semibold">
              Any special medical conditions?
            </Label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Select if applicable" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="diabetes">Gestational Diabetes</SelectItem>
                <SelectItem value="hypertension">High Blood Pressure</SelectItem>
                <SelectItem value="preeclampsia">Preeclampsia</SelectItem>
                <SelectItem value="anemia">Anemia</SelectItem>
                <SelectItem value="thyroid">Thyroid Issues</SelectItem>
                <SelectItem value="other">Other (will specify later)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          style={{ background: "var(--gradient-warm)" }}
          onClick={handleNext}
        >
          Continue to Symptoms
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default PregnantInfo;
