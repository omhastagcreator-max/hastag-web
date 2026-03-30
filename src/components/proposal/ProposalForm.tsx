import React from "react";
import { ProposalData } from "@/templates/ProposalTemplate";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProposalFormProps {
  data: ProposalData;
  onChange: (data: ProposalData) => void;
}

const ProposalForm: React.FC<ProposalFormProps> = ({ data, onChange }) => {
  const updateField = (field: keyof ProposalData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  // Array handlers
  const handleArrayChange = (field: keyof ProposalData, index: number, value: string) => {
    const arr = [...(data[field] as string[])];
    arr[index] = value;
    updateField(field, arr);
  };

  const addArrayItem = (field: keyof ProposalData) => {
    const arr = [...(data[field] as string[]), ""];
    updateField(field, arr);
  };

  const removeArrayItem = (field: keyof ProposalData, index: number) => {
    const arr = [...(data[field] as string[])];
    arr.splice(index, 1);
    updateField(field, arr);
  };

  // Dedicated reference handlers
  const handleRefChange = (index: number, key: 'title' | 'url', value: string) => {
    const arr = [...data.references];
    arr[index] = { ...arr[index], [key]: value };
    updateField("references", arr);
  };

  const addRef = () => {
    const arr = [...data.references, { title: "New Reference", url: "https://" }];
    updateField("references", arr);
  };

  const removeRef = (index: number) => {
    const arr = [...data.references];
    arr.splice(index, 1);
    updateField("references", arr);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Basics */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label>Client Name</Label>
            <Input value={data.clientName} onChange={(e) => updateField("clientName", e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Client Phone</Label>
              <Input placeholder="+91..." value={data.clientPhone || ""} onChange={(e) => updateField("clientPhone", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Client Email</Label>
              <Input placeholder="email@client.com" value={data.clientEmail || ""} onChange={(e) => updateField("clientEmail", e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Project Overview</Label>
            <Textarea rows={3} value={data.projectOverview} onChange={(e) => updateField("projectOverview", e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label>Contact Info</Label>
            <Input value={data.contactInfo} onChange={(e) => updateField("contactInfo", e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Pages Overview */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
             <Label className="text-lg font-semibold">Pages Overview / Deliverables</Label>
             <Button variant="outline" size="sm" onClick={() => addArrayItem("pagesOverview")}>
               <Plus className="w-4 h-4 mr-1" /> Add Page
             </Button>
          </div>
          
          <div className="space-y-2">
            {data.pagesOverview.map((item, i) => (
              <div key={i} className="flex gap-2">
                <Input value={item} onChange={(e) => handleArrayChange("pagesOverview", i, e.target.value)} />
                <Button variant="ghost" size="icon" onClick={() => removeArrayItem("pagesOverview", i)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-2 mt-4">
            <Label>Pages Note</Label>
            <Textarea rows={3} value={data.pagesNote} onChange={(e) => updateField("pagesNote", e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Payment Terms */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <Label className="text-lg font-semibold block mb-2">Payment Terms</Label>
          <div className="space-y-2">
            <Label>Total Cost</Label>
            <Input value={data.paymentCost} onChange={(e) => updateField("paymentCost", e.target.value)} />
          </div>
          <div className="space-y-2 mt-4">
             <div className="flex items-center justify-between">
                <Label>Payment Schedule</Label>
                <Button variant="outline" size="sm" onClick={() => addArrayItem("paymentSchedule")}>  <Plus className="w-4 h-4" /> </Button>
             </div>
             {data.paymentSchedule.map((item, i) => (
              <div key={i} className="flex gap-2">
                <Input value={item} onChange={(e) => handleArrayChange("paymentSchedule", i, e.target.value)} />
                <Button variant="ghost" size="icon" onClick={() => removeArrayItem("paymentSchedule", i)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* References */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
             <Label className="text-lg font-semibold">Design Inspo & References</Label>
             <Button variant="outline" size="sm" onClick={addRef}>
               <Plus className="w-4 h-4 mr-1" /> Add Reference
             </Button>
          </div>
          <div className="space-y-3">
             {data.references.map((item, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input placeholder="Title" value={item.title} onChange={(e) => handleRefChange(i, "title", e.target.value)} className="w-[120px]" />
                <Input placeholder="URL" value={item.url} onChange={(e) => handleRefChange(i, "url", e.target.value)} />
                <Button variant="ghost" size="icon" onClick={() => removeRef(i)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
             <Label className="text-lg font-semibold">Timeline</Label>
             <Button variant="outline" size="sm" onClick={() => addArrayItem("timeline")}>  <Plus className="w-4 h-4" /> </Button>
          </div>
          <div className="space-y-2">
             {data.timeline.map((item, i) => (
              <div key={i} className="flex gap-2">
                <Input value={item} onChange={(e) => handleArrayChange("timeline", i, e.target.value)} />
                <Button variant="ghost" size="icon" onClick={() => removeArrayItem("timeline", i)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Added Value */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
             <Label className="text-lg font-semibold">Added Value</Label>
             <Button variant="outline" size="sm" onClick={() => addArrayItem("addedValue")}>  <Plus className="w-4 h-4" /> </Button>
          </div>
          <div className="space-y-2">
             {data.addedValue.map((item, i) => (
              <div key={i} className="flex gap-2">
                <Input value={item} onChange={(e) => handleArrayChange("addedValue", i, e.target.value)} />
                <Button variant="ghost" size="icon" onClick={() => removeArrayItem("addedValue", i)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
             <Label className="text-lg font-semibold">Notes</Label>
             <Button variant="outline" size="sm" onClick={() => addArrayItem("notes")}>  <Plus className="w-4 h-4" /> </Button>
          </div>
          <div className="space-y-2">
             {data.notes.map((item, i) => (
              <div key={i} className="flex gap-2">
                <Textarea value={item} onChange={(e) => handleArrayChange("notes", i, e.target.value)} rows={2} />
                <Button variant="ghost" size="icon" onClick={() => removeArrayItem("notes", i)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default ProposalForm;
