import React from "react";
import { ProposalData } from "@/templates/ProposalTemplate";
import { generateProposalHtml } from "@/templates/ProposalTemplate";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProposalPreviewProps {
  data: ProposalData;
}

const ProposalPreview: React.FC<ProposalPreviewProps> = ({ data }) => {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const htmlContent = generateProposalHtml(data);

  const handleDownloadPdf = async () => {
    setIsGenerating(true);
    try {
      const apiUrl = import.meta.env.VITE_PROPOSAL_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/api/generate-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: htmlContent }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      // Convert response to blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Proposal_${data.clientName || 'Client'}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error generating PDF. Make sure the Node server is running on port 3001.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full max-w-[850px] mx-auto">
      <div className="w-full flex justify-end">
        <Button onClick={handleDownloadPdf} disabled={isGenerating} size="lg" className="shadow-lg">
          {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
          {isGenerating ? "Generating..." : "Download PDF"}
        </Button>
      </div>

      <div className="w-full aspect-[1/1.414] shadow-2xl rounded-sm overflow-hidden border border-gray-300 bg-white relative">
         <iframe
            srcDoc={htmlContent}
            title="Proposal Live Preview"
            className="w-full h-full origin-top-left border-none pointer-events-none"
            style={{ 
              width: "794px", 
              height: "1123px",
              transform: "scale(min(1, calc(100% / 794px)))" 
            }}
         />
      </div>
    </div>
  );
};

export default ProposalPreview;
