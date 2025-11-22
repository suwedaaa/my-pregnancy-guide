import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";
import { toast } from "sonner";

const commonSymptoms = [
  { id: "nausea", label: "Nausea or morning sickness" },
  { id: "fatigue", label: "Fatigue or tiredness" },
  { id: "backache", label: "Back pain" },
  { id: "swelling", label: "Swelling in hands or feet" },
  { id: "headache", label: "Frequent headaches" },
  { id: "heartburn", label: "Heartburn or indigestion" },
  { id: "cramping", label: "Abdominal cramping" },
  { id: "bleeding", label: "Bleeding or spotting" },
  { id: "contractions", label: "Contractions" },
  { id: "breathing", label: "Shortness of breath" },
];

const Symptoms = () => {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState<Record<string, boolean>>({});

  const handleSymptomToggle = (symptomId: string, value: boolean) => {
    setSymptoms((prev) => ({
      ...prev,
      [symptomId]: value,
    }));
  };

  const handleSubmit = () => {
    const selectedSymptoms = Object.entries(symptoms)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    sessionStorage.setItem("symptoms", JSON.stringify(selectedSymptoms));
    
    toast.success("Symptom information saved!");
    
    // Navigate to a results page or back to home
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 p-6 pb-24">
      <div className="max-w-2xl mx-auto space-y-6 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Button
          variant="ghost"
          onClick={() => navigate("/pregnant-info")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Current Symptoms
          </h1>
          <p className="text-muted-foreground">
            Select any symptoms you're currently experiencing
          </p>
        </div>

        <div className="space-y-4">
          {commonSymptoms.map((symptom, index) => (
            <div
              key={symptom.id}
              className="bg-card rounded-xl p-4 shadow-md border border-border animate-in fade-in slide-in-from-bottom-2 duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-foreground">
                  {symptom.label}
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={symptoms[symptom.id] === true ? "default" : "outline"}
                    className="h-10 w-20 font-semibold"
                    style={
                      symptoms[symptom.id] === true
                        ? { background: "hsl(var(--secondary))", color: "hsl(var(--secondary-foreground))" }
                        : undefined
                    }
                    onClick={() => handleSymptomToggle(symptom.id, true)}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Yes
                  </Button>
                  <Button
                    size="sm"
                    variant={symptoms[symptom.id] === false ? "default" : "outline"}
                    className="h-10 w-20 font-semibold"
                    style={
                      symptoms[symptom.id] === false
                        ? { background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }
                        : undefined
                    }
                    onClick={() => handleSymptomToggle(symptom.id, false)}
                  >
                    <X className="w-4 h-4 mr-1" />
                    No
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent">
          <div className="max-w-2xl mx-auto">
            <Button
              size="lg"
              className="w-full h-14 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
              style={{ background: "var(--gradient-warm)" }}
              onClick={handleSubmit}
            >
              Complete Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Symptoms;
