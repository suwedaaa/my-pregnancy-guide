import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Stethoscope } from "lucide-react";

const Midwife = () => {
  const navigate = useNavigate();

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

        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-secondary/80 shadow-lg">
            <Stethoscope className="w-10 h-10 text-secondary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Midwife Portal
          </h1>
          <p className="text-muted-foreground">
            This section will be developed to allow midwives to view patient information and provide care.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-lg border border-border space-y-4">
          <h2 className="text-xl font-semibold">Coming Soon</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• View patient profiles</li>
            <li>• Track pregnancy progress</li>
            <li>• Review symptom reports</li>
            <li>• Schedule appointments</li>
            <li>• Send care recommendations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Midwife;
