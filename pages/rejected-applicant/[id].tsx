import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertCircle, Download, Bell, ArrowLeft } from "lucide-react";

const REJECTED_APPLICATIONS_DATABASE: { [key: string]: any } = {
  "2": {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1 (555) 987-6543",
    role: "Logistic",
    avatar: "📦",
    applicationId: "#APP-2025-0342",
    submittedDate: "Jan 15, 2025",
    rejectionDate: "March 8, 2025",
    validationStatus: "Valid",
    rejectionReason: "Application does not meet the minimum requirements. Missing required documentation and incomplete information provided.",
    feedbackMessage: `Dear Michael Chen,

Thank you for your application. Unfortunately, we cannot proceed with your application at this time due to incomplete documentation. Please review the requirements and resubmit with all necessary materials.

Best regards,
Application Review Team`,
    notificationStatus: {
      sent: true,
      method: "email",
      timestamp: "Sent on March 8, 2025 at 2:45 PM",
    },
  },
  "5": {
    id: 5,
    name: "Lisa Thompson",
    email: "lthompson@email.com",
    phone: "+1 (555) 345-6789",
    role: "Logistic",
    avatar: "📦",
    applicationId: "#APP-2025-0312",
    submittedDate: "Jan 09, 2025",
    rejectionDate: "March 5, 2025",
    validationStatus: "Valid",
    rejectionReason: "Application does not meet the minimum requirements. Missing required documentation and incomplete information provided.",
    feedbackMessage: `Dear Lisa Thompson,

Thank you for your application. Unfortunately, we cannot proceed with your application at this time due to incomplete documentation. Please review the requirements and resubmit with all necessary materials.

Best regards,
Application Review Team`,
    notificationStatus: {
      sent: true,
      method: "email",
      timestamp: "Sent on March 5, 2025 at 3:20 PM",
    },
  },
};

export default function RejectedApplicationDetail() {
  const router = useRouter();
  const { id } = router.query;

  const application = id ? REJECTED_APPLICATIONS_DATABASE[id as string] : null;

  if (!application) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[#737373] text-lg mb-4">Application not found</p>
            <button
              onClick={() => router.push("/volunteers")}
              className="px-4 py-2 bg-[#5C6ED5] text-white rounded-lg hover:bg-[#3E5A99] transition-colors"
            >
              Back to Volunteers
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-5 sm:px-10 lg:px-8 py-8 flex flex-col gap-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#737373]">
          <Link href="/" className="hover:text-[#5C6ED5] transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/volunteers" className="hover:text-[#5C6ED5] transition-colors">
            Applications
          </Link>
          <span>/</span>
          <span className="text-[#171717] font-medium">Application Review</span>
        </div>

        {/* Page Header with Status */}
        <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
          <div>
            <h1 className="text-[#171717] text-3xl font-semibold mb-1">Application Rejected</h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#fee2e2] border border-[#fecaca]">
            <div className="w-2 h-2 rounded-full bg-[#dc2626]"></div>
            <span className="text-[#991b1b] text-sm font-medium">Status: Rejected</span>
          </div>
        </div>

        {/* Alert Section */}
        <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-[#dc2626] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[#991b1b] font-semibold text-sm mb-0.5">Application Rejected</p>
            <p className="text-[#7f1d1d] text-sm">This application has been rejected and the user will be notified via feedback message.</p>
          </div>
        </div>

        {/* Application Info */}
        <div className="bg-white border border-[#E5E5E5] rounded-lg p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-[#737373] text-xs font-semibold uppercase mb-2">Application ID</p>
              <p className="text-[#171717] font-medium">{application.applicationId}</p>
            </div>
            <div>
              <p className="text-[#737373] text-xs font-semibold uppercase mb-2">Rejection Date</p>
              <p className="text-[#171717] font-medium">{application.rejectionDate}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[#737373] text-xs font-semibold uppercase mb-2">Submitted</p>
              <p className="text-[#171717] font-medium">{application.submittedDate}</p>
            </div>
          </div>
        </div>

        {/* Applicant Information */}
        <div className="bg-white border border-[#E5E5E5] rounded-lg p-6">
          <h2 className="text-[#171717] font-semibold text-lg mb-4">Applicant Information</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#5C6ED5]/10 to-[#3E5A99]/10 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
              {application.avatar}
            </div>
            <div>
              <p className="text-[#171717] font-semibold text-base mb-0.5">{application.name}</p>
              <p className="text-[#737373] text-sm mb-2">{application.email}</p>
              <p className="text-[#525252] text-sm">{application.phone}</p>
            </div>
          </div>
        </div>

        {/* Rejection Reason */}
        <div className="bg-white border border-[#E5E5E5] rounded-lg p-6">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-[#737373] flex-shrink-0 mt-0.5" />
            <h2 className="text-[#171717] font-semibold text-lg">Reason for Rejection</h2>
          </div>
          <p className="text-[#525252] text-sm leading-relaxed">{application.rejectionReason}</p>
        </div>

        {/* Feedback Message */}
        <div className="bg-white border border-[#E5E5E5] rounded-lg p-6">
          <h2 className="text-[#171717] font-semibold text-lg mb-3">Feedback Message to User</h2>
          <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg p-4">
            <p className="text-[#525252] text-sm whitespace-pre-wrap leading-relaxed">{application.feedbackMessage}</p>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
          <button
            onClick={() => router.push("/volunteers")}
            className="text-[#5C6ED5] font-medium hover:underline"
          >
            Back to Volunteer Applications
          </button>
          <span className="text-[#E5E5E5]">•</span>
          <button
            onClick={() => router.push("/")}
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
