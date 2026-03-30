export interface ProposalData {
  clientName: string;
  clientPhone?: string;
  clientEmail?: string;
  projectOverview: string;
  pagesOverview: string[];
  pagesNote: string;
  paymentCost: string;
  paymentSchedule: string[];
  contactInfo: string;
  references: { title: string; url: string }[];
  addedValue: string[];
  timeline: string[];
  notes: string[];
}

export const generateProposalHtml = (data: ProposalData): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proposal - ${data.clientName || 'Client'}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    body {
      font-family: 'Inter', sans-serif;
      background-color: #E8E4D9;
      margin: 0;
      padding: 0;
      width: 794px; /* Exact A4 Width at 96 DPI */
      height: 1123px; /* Exact A4 Height */
      overflow: hidden; /* Force strict containment */
      color: #000;
    }
    .main-container {
      width: 100%;
      height: 100%;
      padding: 24px;
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 12px;
      overflow: hidden;
    }
    .card-border {
      border: 1.5px solid #222;
      border-radius: 16px;
      background-color: transparent;
      padding: 12px 16px;
    }
    .pink-header {
      background-color: #d63864;
      color: white;
      border-radius: 9999px;
      text-align: center;
      padding: 4px 16px;
      font-weight: 800;
      border: 1.5px solid #222;
      margin: 4px 0;
      text-transform: uppercase;
      font-size: 13px;
      box-shadow: 2px 2px 0px rgba(0,0,0,0.1);
    }
    .header-logo {
      color: #d63864;
      font-weight: 800;
      font-size: 28px;
      line-height: 1;
      margin-bottom: 4px;
    }
    /* Typography compression */
    .text-body {
      font-size: 12px;
      line-height: 1.35;
    }
    .text-small {
      font-size: 11px;
      line-height: 1.3;
    }
  </style>
</head>
<body>
  <div class="main-container">
    
    <!-- Top Row -->
    <div class="flex justify-between items-start mb-2">
      <!-- Logo Side -->
      <div class="flex flex-col">
        <div class="header-logo pt-1 tracking-tight">HASTAGCREATOR</div>
        <div class="text-[9px] tracking-[0.25em] font-extrabold mb-1.5 text-gray-800">DESIGN • DEVELOP • SELL</div>
        <div class="font-bold text-[11px] mb-4">GSTIN: 092500425588TRN</div>
        
        <div class="mt-4 font-bold border-b-2 border-black pb-0.5 inline-block text-[13px]">
          CLIENT NAME: <span class="text-blue-700">${data.clientName || ''}</span>
        </div>
        ${(data.clientPhone || data.clientEmail) ? `
        <div class="mt-1.5 text-[10px] font-semibold space-y-0.5">
          ${data.clientPhone ? `<div>PHONE: <span class="text-gray-700 font-normal">${data.clientPhone}</span></div>` : ''}
          ${data.clientEmail ? `<div>EMAIL: <span class="text-gray-700 font-normal">${data.clientEmail}</span></div>` : ''}
        </div>
        ` : ''}
      </div>

      <!-- Contact Info Card -->
      <div class="card-border w-[320px] text-[11px] leading-tight space-y-2.5">
        <div class="flex items-start gap-2">
          <div class="text-[#d63864] mt-px">📍</div>
          <div class="font-medium text-gray-900">TECHNOLOGY BUSINESS INCUBATOR-NIET<br/>19, Knowledge Park II, Institutional Area,<br/>Greater Noida, Uttar Pradesh.</div>
        </div>
        <div class="flex items-start gap-2">
          <div class="text-[#d63864] mt-px">📞</div>
          <div class="font-medium text-gray-900">+91-8059957479</div>
        </div>
        <div class="flex items-start gap-2">
          <div class="text-[#d63864] mt-px">✉️</div>
          <div class="font-medium text-gray-900">contact@hastagcreator.com</div>
        </div>
        <div class="flex items-start gap-2">
          <div class="text-[#d63864] mt-px">🌐</div>
          <div class="font-medium text-gray-900">www.hastagcreator.com</div>
        </div>
      </div>
    </div>

    <!-- Main Content 2 Columns -->
    <div class="grid grid-cols-2 gap-5 flex-grow overflow-hidden">
      
      <!-- Left Column -->
      <div class="flex flex-col gap-2.5 h-full overflow-hidden shrink-0">
        
        <!-- Project Overview -->
        <div class="card-border text-body relative bg-transparent border-t-0 border-l-[1px] border-r-[2px] border-b-[2px] shadow-sm rounded-xl">
          <div class="font-bold text-center mb-1 text-[13px]">PROJECT OVERVIEW:</div>
          <div class="text-gray-800 leading-snug">
            ${data.projectOverview?.replace(/\n/g, '<br/>') || ''}
          </div>
        </div>

        ${data.pagesOverview && data.pagesOverview.length > 0 ? `
        <div class="pink-header w-[85%] mx-auto relative z-10 translate-y-1.5 shadow-sm">DELIVERABLES</div>
        <div class="card-border pb-3 pt-4 text-body h-full max-h-[300px] overflow-hidden shadow-sm flex flex-col">
          <div class="font-bold mb-2 uppercase text-[12px]">PAGES OVERVIEW</div>
          <ol class="list-decimal pl-4 ml-1 space-y-1 mb-2 font-medium text-gray-800 flex-grow">
            ${data.pagesOverview.map(page => `<li>${page}</li>`).join('')}
          </ol>
          <div class="text-[10px] font-bold text-gray-900 whitespace-pre-line mt-2 leading-tight">
            ${data.pagesNote || ''}
          </div>
        </div>
        ` : ''}

        <div class="pink-header w-[85%] mx-auto relative z-10 translate-y-1.5 shadow-sm">PAYMENT TERMS</div>

        <!-- Payment Terms -->
        <div class="card-border text-body pt-4 shadow-sm pb-3">
          <ul class="list-disc pl-4 space-y-1 mb-2 font-medium text-gray-800">
            <li>The total cost the project will be <b>${data.paymentCost || ''}</b> The payment has to be</li>
            <li>made in ${data.paymentSchedule?.length || 0} installment as follows:</li>
          </ul>
          <ol class="list-decimal pl-5 ml-3 space-y-0.5 text-body font-bold text-gray-900">
            ${data.paymentSchedule?.map(schedule => `<li>${schedule}</li>`).join('') || ''}
          </ol>
          <div class="mt-4 text-[10px] font-bold text-gray-900">
            CONTACT INFORMATION:<br/>
            <span class="font-normal border-b border-black pb-0.5 inline-block mt-0.5">For any queries or additional information, please contact: ${data.contactInfo || ''}</span>
          </div>
        </div>

      </div>

      <!-- Right Column -->
      <div class="flex flex-col gap-2.5 h-full overflow-hidden shrink-0">
        
        ${data.references && data.references.length > 0 ? `
        <div class="pink-header w-[90%] mx-auto relative z-10 translate-y-1.5 shadow-sm text-[12px]">DESIGN INSPO & Reffence Website</div>
        <div class="card-border pt-5 pb-3 text-center text-[14px] shadow-sm bg-transparent">
          <div class="flex flex-col items-center justify-center h-full gap-1 text-blue-700 underline font-medium">
            ${data.references.map((ref, i) => `<a href="${ref.url}" class="hover:text-blue-900">${ref.title || ('Reference ' + (i+1))}</a>`).join('')}
          </div>
        </div>
        ` : ''}

        ${data.addedValue && data.addedValue.length > 0 ? `
        <div class="pink-header w-[85%] mx-auto relative z-10 translate-y-1.5 shadow-sm">ADDED VALUE</div>
        <div class="card-border pt-4 pb-3 text-body shadow-sm">
          <ul class="list-disc pl-4 space-y-1.5 font-medium text-gray-800">
            ${data.addedValue.map(value => `<li>${value.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${data.timeline && data.timeline.length > 0 ? `
        <div class="pink-header w-[75%] mx-auto relative z-10 translate-y-1.5 shadow-sm">TIMELINE</div>
        <div class="card-border pt-4 pb-3 text-body shadow-sm">
          <ul class="list-disc pl-4 space-y-1 font-medium text-gray-800">
            ${data.timeline.map(item => `<li>${item.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${data.notes && data.notes.length > 0 ? `
        <div class="pink-header w-[75%] mx-auto relative z-10 translate-y-1.5 shadow-sm">NOTE</div>
        <div class="card-border pt-4 pb-3 text-small shadow-sm">
          <ul class="list-disc pl-4 space-y-1.5 leading-tight font-medium text-gray-800">
             ${data.notes.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

      </div>

    </div>
  </div>
</body>
</html>
  `;
};
