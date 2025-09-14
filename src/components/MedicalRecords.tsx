import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MedicalRecords = () => {
  const records = [
    {
      id: 1,
      type: "Lab Results",
      date: "2024-01-15",
      doctor: "Dr. Sarah Johnson",
      description: "Blood work and cholesterol screening"
    },
    {
      id: 2,
      type: "Prescription",
      date: "2024-01-10",
      doctor: "Dr. Michael Brown",
      description: "Medication for hypertension"
    },
    {
      id: 3,
      type: "X-Ray",
      date: "2024-01-05",
      doctor: "Dr. Emily Davis",
      description: "Chest X-ray examination"
    }
  ];

  return (
    <div className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Your Medical Records
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access and manage your complete medical history securely in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map((record) => (
            <Card key={record.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <FileText className="h-5 w-5 text-primary mr-2" />
                <CardTitle className="text-lg">{record.type}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{record.date}</p>
                <p className="text-sm font-medium mb-2">{record.doctor}</p>
                <p className="text-sm text-muted-foreground mb-4">{record.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};