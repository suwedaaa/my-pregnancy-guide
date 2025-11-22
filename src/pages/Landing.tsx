import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-in fade-in duration-700">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg mb-4">
            <Heart className="w-10 h-10 text-primary-foreground" fill="currentColor" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Mobile Midwife
          </h1>
          <p className="text-lg text-muted-foreground">
            Your trusted companion for pregnancy care
          </p>
        </div>

        <div className="space-y-4 pt-8">
          <Button
            size="lg"
            className="w-full h-16 text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            style={{ background: "var(--gradient-warm)" }}
            onClick={() => navigate("/midwife")}
          >
            I'm a Midwife
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full h-16 text-lg font-semibold border-2 hover:bg-accent/30 transition-all hover:scale-[1.02]"
            onClick={() => navigate("/pregnant-info")}
          >
            I'm Pregnant
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground pt-8">
          Safe • Secure • Supportive
        </p>
      </div>
    </div>
  );
};

export default Landing;
