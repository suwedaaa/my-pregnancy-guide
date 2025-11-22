import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Building2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

type PatientMarker = {
  id: string;
  name: string;
  weeks: number;
  status: "normal" | "emergency";
  medicalConditions?: string;
  position: { top: string; left: string };
};

type FacilityMarker = {
  id: string;
  name: string;
  type: "hospital" | "clinic";
  position: { top: string; left: string };
};

const Midwife = () => {
  const navigate = useNavigate();
  const [selectedMarker, setSelectedMarker] = useState<PatientMarker | FacilityMarker | null>(null);

  // Mocked patient data
  const patients: PatientMarker[] = [
    {
      id: "p1",
      name: "Sarah M.",
      weeks: 24,
      status: "normal",
      medicalConditions: "None reported",
      position: { top: "25%", left: "30%" },
    },
    {
      id: "p2",
      name: "Emma L.",
      weeks: 32,
      status: "emergency",
      medicalConditions: "Severe headache, vision changes",
      position: { top: "40%", left: "65%" },
    },
    {
      id: "p3",
      name: "Jessica K.",
      weeks: 18,
      status: "normal",
      medicalConditions: "Gestational diabetes",
      position: { top: "60%", left: "45%" },
    },
    {
      id: "p4",
      name: "Maria G.",
      weeks: 36,
      status: "emergency",
      medicalConditions: "Decreased fetal movement",
      position: { top: "70%", left: "25%" },
    },
    {
      id: "p5",
      name: "Lisa T.",
      weeks: 28,
      status: "normal",
      medicalConditions: "None reported",
      position: { top: "35%", left: "80%" },
    },
  ];

  // Mocked facility data
  const facilities: FacilityMarker[] = [
    {
      id: "f1",
      name: "City Hospital",
      type: "hospital",
      position: { top: "30%", left: "50%" },
    },
    {
      id: "f2",
      name: "Women's Health Clinic",
      type: "clinic",
      position: { top: "55%", left: "70%" },
    },
    {
      id: "f3",
      name: "Community Hospital",
      type: "hospital",
      position: { top: "75%", left: "60%" },
    },
  ];

  const isPatient = (marker: any): marker is PatientMarker => {
    return "weeks" in marker;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 p-4">
      <div className="max-w-6xl mx-auto space-y-4 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            Patient Map
          </h1>
          <div className="w-16" />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-muted-foreground">Normal Status</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-muted-foreground">Needs Help</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Medical Facilities</span>
          </div>
        </div>

        {/* Map Area */}
        <div className="relative w-full aspect-square md:aspect-video bg-gradient-to-br from-accent/30 to-accent/10 rounded-xl border-2 border-border overflow-hidden shadow-lg">
          {/* Grid overlay for map effect */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Patient Markers */}
          {patients.map((patient) => (
            <button
              key={patient.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125 focus:scale-125 focus:outline-none group"
              style={{ top: patient.position.top, left: patient.position.left }}
              onClick={() => setSelectedMarker(patient)}
            >
              <div className="relative">
                <MapPin
                  className={`w-8 h-8 drop-shadow-lg ${
                    patient.status === "emergency"
                      ? "text-red-500 animate-pulse"
                      : "text-green-500"
                  }`}
                  fill="currentColor"
                />
                {patient.status === "emergency" && (
                  <AlertCircle className="absolute -top-1 -right-1 w-4 h-4 text-red-600 animate-bounce" />
                )}
              </div>
            </button>
          ))}

          {/* Facility Markers */}
          {facilities.map((facility) => (
            <button
              key={facility.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 focus:scale-110 focus:outline-none"
              style={{ top: facility.position.top, left: facility.position.left }}
              onClick={() => setSelectedMarker(facility)}
            >
              <div className="bg-primary/90 rounded-full p-2 shadow-lg">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
            </button>
          ))}
        </div>

        {/* Info Card */}
        {selectedMarker && (
          <Card className="p-4 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {isPatient(selectedMarker) ? (
              <>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                      {selectedMarker.name}
                      {selectedMarker.status === "emergency" ? (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Patient ID: {selectedMarker.id}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedMarker(null)}
                  >
                    ✕
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Weeks Pregnant</p>
                    <p className="text-2xl font-bold text-foreground">
                      {selectedMarker.weeks}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className={`text-lg font-semibold ${
                      selectedMarker.status === "emergency"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}>
                      {selectedMarker.status === "emergency" ? "Needs Help" : "Normal"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Medical Conditions</p>
                  <p className="text-base text-foreground mt-1">
                    {selectedMarker.medicalConditions}
                  </p>
                </div>
                {selectedMarker.status === "emergency" && (
                  <Button className="w-full" variant="destructive">
                    Contact Patient
                  </Button>
                )}
              </>
            ) : (
              <>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      {selectedMarker.name}
                    </h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {selectedMarker.type}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedMarker(null)}
                  >
                    ✕
                  </Button>
                </div>
                <Button className="w-full" variant="outline">
                  View Details
                </Button>
              </>
            )}
          </Card>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <p className="text-3xl font-bold text-green-500">
              {patients.filter((p) => p.status === "normal").length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Stable Patients</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-3xl font-bold text-red-500">
              {patients.filter((p) => p.status === "emergency").length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Need Attention</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Midwife;
