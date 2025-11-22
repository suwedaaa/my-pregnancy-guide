import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const emergencySymptoms = [
  "Severe abdominal pain",
  "Heavy bleeding or gushing fluid",
  "Sudden severe headache with vision changes",
  "High fever (over 101°F / 38.3°C)",
  "Severe swelling of face or hands",
  "Decreased fetal movement",
  "Painful urination with fever",
  "Severe persistent vomiting",
  "Chest pain or difficulty breathing",
  "Fainting or dizziness",
];

const Symptoms = () => {
  const navigate = useNavigate();
  const [experiencingSymptoms, setExperiencingSymptoms] = useState<boolean | null>(null);

  const handleAnswer = (answer: boolean) => {
    setExperiencingSymptoms(answer);
    sessionStorage.setItem("hasEmergencySymptoms", JSON.stringify(answer));
    
    if (answer) {
      navigate("/emergency-services");
    } else {
      navigate("/appointment");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 p-6 pb-32">
      <div className="max-w-2xl mx-auto space-y-6 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Button
          variant="ghost"
          onClick={() => navigate("/pregnant-info")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-8 h-8 text-destructive" />
            <h1 className="text-3xl font-bold text-foreground">
              Emergency Symptoms
            </h1>
          </div>
          <p className="text-muted-foreground">
            Please review these emergency pregnancy symptoms carefully
          </p>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-md border border-border space-y-3">
          {emergencySymptoms.map((symptom, index) => (
            <div
              key={index}
              className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
              <span className="text-base text-foreground">{symptom}</span>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent">
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-center text-lg font-semibold text-foreground">
              Are you experiencing any of these symptoms?
            </p>
            <div className="flex gap-3">
              <Button
                size="lg"
                variant="destructive"
                className="flex-1 h-14 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
                onClick={() => handleAnswer(true)}
              >
                Yes
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="flex-1 h-14 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
                onClick={() => handleAnswer(false)}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Symptoms;
