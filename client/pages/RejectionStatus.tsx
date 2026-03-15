import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { X, AlertTriangle } from "lucide-react";

export default function RejectionStatus() {
  const navigate = useNavigate();

  const applicationData = {
    id: "#APP-2025-001234",
    submittedDate: "Jan 15, 2025",
    decisionDate: "Jan 28, 2025",
  };

  const rejectionReason = {
    title: "Reason for Rejection",
    description:
      "After careful review of your application, we found that some required documentation was incomplete. Specifically, the employment verification letter did not meet our current requirements, and the financial statements provided were outdated (older than 90 days).",
  };

  const nextSteps = [
    {
      step: 1,
      title: "Review Requirements",
      description: "Check our updated application guidelines and required documentation list.",
    },
    {
      step: 2,
      title: "Prepare Updated Documents",
      description: "Gather all required documentation with current dates and proper formatting.",
    },
    {
      step: 3,
      title: "Resubmit Application",
      description: "You may reapply after 30 days from the rejection date with updated materials.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />

      <main className="flex-1 w-full max-w-[800px] mx-auto px-5 sm:px-10 py-12 flex flex-col gap-8">
        {/* Rejection Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-[#ef4444] rounded-full flex items-center justify-center">
            <X className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Title and Message */}
        <div className="text-center">
          <h1 className="text-[#171717] text-3xl font-bold mb-2">Application Rejected</h1>
          <p className="text-[#737373] text-base">
            Unfortunately, your application has not been approved at this time.
          </p>
        </div>

        {/* Application Details */}
        <div className="bg-white border border-[#E5E5E5] rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="text-[#737373] text-xs font-semibold uppercase mb-1">Application ID</p>
              <p className="text-[#171717] text-base font-medium">{applicationData.id}</p>
            </div>
            <div>
              <p className="text-[#737373] text-xs font-semibold uppercase mb-1">Submitted</p>
              <p className="text-[#171717] text-base font-medium">{applicationData.submittedDate}</p>
            </div>
            <div>
              <p className="text-[#737373] text-xs font-semibold uppercase mb-1">Decision Date</p>
              <p className="text-[#171717] text-base font-medium">{applicationData.decisionDate}</p>
            </div>
          </div>
        </div>

        {/* Rejection Reason */}
        <div className="bg-white border border-[#E5E5E5] rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-[#737373] flex-shrink-0 mt-0.5" />
            <h2 className="text-[#171717] font-semibold text-lg">{rejectionReason.title}</h2>
          </div>
          <p className="text-[#525252] text-sm leading-relaxed">{rejectionReason.description}</p>
        </div>

        {/* What You Can Do Next */}
        <div className="bg-white border border-[#E5E5E5] rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-[#171717] font-semibold text-lg mb-6">What You Can Do Next</h2>
          <div className="space-y-4">
            {nextSteps.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#f3f4f6] text-[#525252] flex items-center justify-center font-semibold text-sm border border-[#E5E5E5]">
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

        {/* Important Notice */}
        <div className="bg-[#fef3c7] border border-[#fde68a] rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#b45309] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#92400e] font-semibold text-sm mb-1">Important Notice</p>
              <p className="text-[#78350f] text-sm">
                You must wait 30 days before resubmitting your application. Early resubmissions will be automatically rejected. Please ensure all requirements are met before your next submission.
              </p>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
          <button
            onClick={() => navigate("/volunteers")}
            className="text-[#5C6ED5] font-medium hover:underline"
          >
            Back to Volunteer Applications
          </button>
          <span className="text-[#E5E5E5]">•</span>
          <button
            onClick={() => navigate("/")}
            className="text-[#5C6ED5] font-medium hover:underline"
          >
            Back to Dashboard
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
