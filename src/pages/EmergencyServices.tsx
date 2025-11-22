import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, MapPin, Navigation } from "lucide-react";
import { Card } from "@/components/ui/card";

const EmergencyServices = () => {
  const navigate = useNavigate();

  const handleCallAmbulance = () => {
    window.location.href = "tel:911";
  };

  const nearbyServices = [
    {
      name: "City Hospital Maternity Ward",
      distance: "1.2 km",
      address: "123 Health Street",
      phone: "+1-234-567-8900",
    },
    {
      name: "Women's Health Clinic",
      distance: "2.5 km",
      address: "456 Care Avenue",
      phone: "+1-234-567-8901",
    },
    {
      name: "Community Midwife Center",
      distance: "3.8 km",
      address: "789 Wellness Road",
      phone: "+1-234-567-8902",
    },
  ];

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
          <h1 className="text-3xl font-bold text-destructive">
            Emergency Services Nearby
          </h1>
          <p className="text-muted-foreground">
            Find the nearest medical facility for immediate care
          </p>
        </div>

        {/* Map Placeholder */}
        <div className="bg-card rounded-xl p-8 shadow-md border border-border aspect-video flex items-center justify-center">
          <div className="text-center space-y-3">
            <MapPin className="w-12 h-12 text-primary mx-auto" />
            <p className="text-muted-foreground">Map view of nearby services</p>
            <p className="text-sm text-muted-foreground">
              Location services needed
            </p>
          </div>
        </div>

        {/* Nearby Services List */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            Nearest Facilities
          </h2>
          {nearbyServices.map((service, index) => (
            <Card
              key={index}
              className="p-4 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <h3 className="font-semibold text-foreground">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {service.address}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Navigation className="w-4 h-4" />
                    <span>{service.distance} away</span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => (window.location.href = `tel:${service.phone}`)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call: {service.phone}
              </Button>
            </Card>
          ))}
        </div>

        {/* Emergency Call Button */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent">
          <div className="max-w-2xl mx-auto">
            <Button
              size="lg"
              variant="destructive"
              className="w-full h-14 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
              onClick={handleCallAmbulance}
            >
              <Phone className="w-5 h-5 mr-2" />
              If unable to go, call an ambulance
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyServices;
