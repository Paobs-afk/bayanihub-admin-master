import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Mail, Download } from "lucide-react";

export default function ApprovalStatus() {
  const navigate = useNavigate();

  const applicationData = {
    id: "#APP-2025-001234",
    submittedDate: "January 15, 2025",
    approvedDate: "January 22, 2025",
    processingTime: "7 business days",
  };

  const nextSteps = [
    {
      step: 1,
      title: "Check your email for confirmation",
      description: "We've sent detailed instructions to your registered email address.",
    },
    {
      step: 2,
      title: "Complete account setup",
      description: "Follow the link in your email to complete your account setup.",
    },
    {
      step: 3,
      title: "Access your dashboard",
      description: "Start using all available features and services.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />

      <main className="flex-1 w-full max-w-[800px] mx-auto px-5 sm:px-10 py-12 flex flex-col gap-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-[#22c55e] rounded-full flex items-center justify-center">
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Title and Message */}
        <div className="text-center">
          <h1 className="text-[#171717] text-3xl font-bold mb-2">Application Approved!</h1>
          <p className="text-[#737373] text-base">
            Congratulations! Your application has been successfully approved.
          </p>
        </div>

        {/* Application Details */}
        <div className="bg-white border border-[#E5E5E5] rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-[#171717] font-semibold text-lg mb-6">Application Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="sm:border-r border-[#E5E5E5]">
              <div className="sm:pr-6">
                <p className="text-[#737373] text-xs font-semibold uppercase mb-1">Application ID</p>
                <p className="text-[#171717] text-base font-medium">{applicationData.id}</p>
              </div>
            </div>
            <div>
              <p className="text-[#737373] text-xs font-semibold uppercase mb-1">Submitted Date</p>
              <p className="text-[#171717] text-base font-medium">{applicationData.submittedDate}</p>
            </div>
            <div className="sm:border-r border-[#E5E5E5]">
              <div className="sm:pr-6">
                <p className="text-[#737373] text-xs font-semibold uppercase mb-1">Approved Date</p>
                <p className="text-[#171717] text-base font-medium">{applicationData.approvedDate}</p>
              </div>
            </div>
            <div>
              <p className="text-[#737373] text-xs font-semibold uppercase mb-1">Processing Time</p>
              <p className="text-[#171717] text-base font-medium">{applicationData.processingTime}</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white border border-[#E5E5E5] rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-[#171717] font-semibold text-lg mb-6">Next Steps</h2>
          <div className="space-y-4">
            {nextSteps.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#5C6ED5] text-white flex items-center justify-center font-semibold text-sm">
                  {item.step}
                </div>
                <div className="flex-1">
                  <p className="text-[#171717] font-medium text-base mb-1">{item.title}</p>
                  <p className="text-[#737373] text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#5C6ED5] text-white rounded-lg font-medium hover:bg-[#3E5A99] transition-colors">
            <Mail className="w-5 h-5" />
            Check Email
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 border border-[#E5E5E5] text-[#171717] rounded-lg font-medium hover:bg-[#FAFAFA] hover:border-[#5C6ED5] hover:text-[#5C6ED5] transition-colors">
            <Download className="w-5 h-5" />
            Download Certificate
          </button>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="text-[#5C6ED5] font-medium hover:underline text-sm"
          >
            Back to Dashboard
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
