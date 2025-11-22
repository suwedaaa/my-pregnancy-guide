import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronDown, X } from "lucide-react";
import { toast } from "sonner";

const PregnantInfo = () => {
  const navigate = useNavigate();
  const [weeks, setWeeks] = useState("");
  const [shareLocation, setShareLocation] = useState(false);
  const [conditions, setConditions] = useState<string[]>([]);
  const [otherCondition, setOtherCondition] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const conditionOptions = [
    { value: "diabetes", label: "Gestational Diabetes" },
    { value: "hypertension", label: "High Blood Pressure" },
    { value: "preeclampsia", label: "Preeclampsia" },
    { value: "anemia", label: "Anemia" },
    { value: "thyroid", label: "Thyroid Issues" },
  ];

  const handleConditionToggle = (value: string) => {
    if (value === "none") {
      setConditions([]);
      setOtherCondition("");
    } else if (value === "other") {
      // Toggle "other" - if already selected, remove it and clear input
      if (conditions.includes("other")) {
        setConditions(conditions.filter((c) => c !== "other"));
        setOtherCondition("");
      } else {
        setConditions([...conditions, "other"]);
      }
    } else {
      // Toggle regular conditions
      if (conditions.includes(value)) {
        setConditions(conditions.filter((c) => c !== value));
      } else {
        setConditions([...conditions, value]);
      }
    }
  };

  const removeCondition = (value: string) => {
    if (value === "other") {
      setOtherCondition("");
    }
    setConditions(conditions.filter((c) => c !== value));
  };

  const handleNext = () => {
    if (!weeks || parseInt(weeks) < 1 || parseInt(weeks) > 42) {
      toast.error("Please enter a valid number of weeks (1-42)");
      return;
    }

    // Validate "other" condition has text if selected
    if (conditions.includes("other") && !otherCondition.trim()) {
      toast.error("Please specify your other medical condition");
      return;
    }

    // Store data in session storage for now
    const conditionData = {
      conditions: conditions.filter((c) => c !== "other"),
      otherCondition: conditions.includes("other") ? otherCondition : "",
    };

    sessionStorage.setItem(
      "pregnantInfo",
      JSON.stringify({ weeks, shareLocation, condition: conditionData })
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
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full h-12 text-base justify-between font-normal"
                >
                  <span className="text-muted-foreground">
                    {conditions.length === 0
                      ? "Select if applicable"
                      : `${conditions.length} selected`}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start" sideOffset={4}>
                <div className="p-2 space-y-2">
                  <div className="flex items-center space-x-2 p-2 rounded-sm hover:bg-accent">
                    <Checkbox
                      id="none"
                      checked={conditions.length === 0}
                      onCheckedChange={() => handleConditionToggle("none")}
                    />
                    <label
                      htmlFor="none"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                    >
                      None
                    </label>
                  </div>
                  {conditionOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2 p-2 rounded-sm hover:bg-accent"
                    >
                      <Checkbox
                        id={option.value}
                        checked={conditions.includes(option.value)}
                        onCheckedChange={() => handleConditionToggle(option.value)}
                      />
                      <label
                        htmlFor={option.value}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2 p-2 rounded-sm hover:bg-accent">
                    <Checkbox
                      id="other"
                      checked={conditions.includes("other")}
                      onCheckedChange={() => handleConditionToggle("other")}
                    />
                    <label
                      htmlFor="other"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                    >
                      Other
                    </label>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Display selected conditions as badges */}
            {conditions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {conditions
                  .filter((c) => c !== "other")
                  .map((condition) => {
                    const option = conditionOptions.find(
                      (opt) => opt.value === condition
                    );
                    return (
                      <Badge
                        key={condition}
                        variant="secondary"
                        className="px-3 py-1.5 text-sm"
                      >
                        {option?.label}
                        <button
                          onClick={() => removeCondition(condition)}
                          className="ml-2 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    );
                  })}
                {conditions.includes("other") && (
                  <Badge
                    variant="secondary"
                    className="px-3 py-1.5 text-sm"
                  >
                    {otherCondition.trim() || "Other"}
                    <button
                      onClick={() => removeCondition("other")}
                      className="ml-2 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Input field for "other" condition */}
            {conditions.includes("other") && (
              <div className="mt-3">
                <Input
                  placeholder="Please specify your condition"
                  value={otherCondition}
                  onChange={(e) => setOtherCondition(e.target.value)}
                  className="h-12 text-base"
                />
              </div>
            )}
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
