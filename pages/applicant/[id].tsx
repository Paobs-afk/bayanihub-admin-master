import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock applicant data - detailed profiles
const APPLICANT_DATABASE: { [key: string]: any } = {
  "1": {
    id: 1,
    name: "Sarah Johnson",
    title: "Community Outreach Volunteer",
    role: "Medic",
    appliedDate: "March 15, 2025",
    status: "Under Review",
    avatar: "👩‍⚕️",
    personal: {
      email: "sarah.johnson@email.com",
      phone: "(555) 123-4567",
      address: "123 Main St, City, State 12345",
      emergencyContact: "John Johnson - (555) 987-6543",
    },
    experience: {
      title: "Previous Volunteer Experience",
      description: "3 years at local food bank, event coordination experience, youth mentoring program volunteer",
      skills: ["Communication", "Event Planning", "Leadership", "Bilingual (Spanish)"],
      motivation: "I am passionate about giving back to my community and helping those in need. Having grown up in this area, I understand the challenges many families face and want to be part of the solution.",
    },
    documents: [
      { name: "Resume_Sarah_Johnson.pdf", size: "2.3 MB", date: "Mar 15, 2025", icon: "📄" },
      { name: "Cover_Letter.docx", size: "1.1 MB", date: "Mar 15, 2025", icon: "📄" },
      { name: "Background_Check_Certificate.pdf", size: "890 KB", date: "Mar 15, 2025", icon: "🔒" },
      { name: "ID_Photo.jpg", size: "1.5 MB", date: "Mar 15, 2025", icon: "🖼️" },
    ],
    timeline: [
      { event: "Application Submitted", date: "Mar 15, 2025 at 2:30 PM", pending: false },
      { event: "Under Review", date: "Mar 15, 2025 at 9:00 AM", pending: false },
      { event: "Interview Scheduled", date: "Pending", pending: true },
    ],
    references: [
      {
        name: "Maria Rodriguez",
        title: "Food Bank Supervisor",
        phone: "(555) 234-5678",
      },
      {
        name: "David Chen",
        title: "Youth Program Director",
        phone: "(555) 345-6789",
      },
      {
        name: "Lisa Thompson",
        title: "Community Center Manager",
        phone: "(555) 456-7890",
      },
    ],
    notes: "",
  },
};

export default function ApplicantDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [notes, setNotes] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const applicant = id ? APPLICANT_DATABASE[id as string] : null;

  if (!applicant) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[#737373] text-lg mb-4">Applicant not found</p>
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

  const handleSaveNotes = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const getRoleColor = (role: string) => {
    const colors: { [key: string]: { bg: string; text: string } } = {
      Medic: { bg: "bg-[#5C6ED5]/10", text: "text-[#5C6ED5]" },
      Logistic: { bg: "bg-[#3E5A99]/10", text: "text-[#3E5A99]" },
      Field: { bg: "bg-[#5C6ED5]/5", text: "text-[#5C6ED5]" },
    };
    return colors[role] || { bg: "bg-gray-100", text: "text-[#5C6ED5]" };
  };

  const roleColor = getRoleColor(applicant.role);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />

      <main className="flex-1 w-full max-w-[1890px] mx-auto px-5 sm:px-10 lg:px-8 py-8 flex flex-col gap-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#737373]">
          <Link href="/volunteers" className="hover:text-[#5C6ED5] transition-colors">
            Applications
          </Link>
          <span>/</span>
          <Link href="/volunteers" className="hover:text-[#5C6ED5] transition-colors">
            Volunteer Applications
          </Link>
          <span>/</span>
          <span className="text-[#171717] font-medium">{applicant.name}</span>
        </div>

        {/* Applicant Header */}
        <div className="bg-white border border-[#E5E5E5] rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between gap-6 flex-col sm:flex-row">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#5C6ED5]/10 to-[#3E5A99]/10 rounded-full flex items-center justify-center text-4xl flex-shrink-0">
                {applicant.avatar}
              </div>
              <div>
                <h1 className="text-[#171717] text-2xl font-semibold mb-1">{applicant.name}</h1>
                <p className="text-[#737373] text-sm mb-2">{applicant.title}</p>
                <p className="text-[#737373] text-xs">Applied on {applicant.appliedDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${roleColor.bg} ${roleColor.text} whitespace-nowrap`}>
                {applicant.status}
              </span>
              <button
                onClick={() => router.push("/approval-status")}
                className="px-4 py-2 bg-[#5C6ED5] text-white rounded-lg text-sm font-medium hover:bg-[#3E5A99] transition-colors whitespace-nowrap"
              >
                Approve
              </button>
              <button
                onClick={() => router.push("/rejection-status")}
                className="px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm font-medium text-[#171717] hover:bg-[#FAFAFA] hover:text-[#5C6ED5] transition-colors whitespace-nowrap"
              >
                Reject
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Personal Information */}
            <div className="bg-white border border-[#E5E5E5] rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-[#171717] font-semibold text-lg mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[#737373] text-xs font-semibold uppercase mb-1 block">Email</label>
                  <p className="text-[#171717] text-sm">{applicant.personal.email}</p>
                </div>
                <div>
                  <label className="text-[#737373] text-xs font-semibold uppercase mb-1 block">Phone</label>
                  <p className="text-[#171717] text-sm">{applicant.personal.phone}</p>
                </div>
                <div>
                  <label className="text-[#737373] text-xs font-semibold uppercase mb-1 block">Address</label>
                  <p className="text-[#171717] text-sm">{applicant.personal.address}</p>
                </div>
                <div>
                  <label className="text-[#737373] text-xs font-semibold uppercase mb-1 block">Emergency Contact</label>
                  <p className="text-[#171717] text-sm">{applicant.personal.emergencyContact}</p>
                </div>
              </div>
            </div>

            {/* Experience & Skills */}
            <div className="bg-white border border-[#E5E5E5] rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-[#171717] font-semibold text-lg mb-4">Experience & Skills</h2>

              <div className="mb-6">
                <h3 className="text-[#171717] font-semibold text-sm mb-2">{applicant.experience.title}</h3>
                <p className="text-[#525252] text-sm mb-4">{applicant.experience.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-[#171717] font-semibold text-sm mb-3">Relevant Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {applicant.experience.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-[#F5F5F5] text-[#171717] text-xs font-medium rounded-full border border-[#E5E5E5] hover:border-[#5C6ED5] transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[#171717] font-semibold text-sm mb-2">Motivation</h3>
                <p className="text-[#525252] text-sm">{applicant.experience.motivation}</p>
              </div>
            </div>

            {/* Uploaded Documents */}
            <div className="bg-white border border-[#E5E5E5] rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-[#171717] font-semibold text-lg mb-4">Uploaded Documents</h2>

              <div className="space-y-3 mb-4">
                {applicant.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border border-[#E5E5E5] rounded-lg hover:bg-[#FAFAFA] hover:border-[#5C6ED5] transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{doc.icon}</span>
                      <div>
                        <p className="text-[#171717] text-sm font-medium">{doc.name}</p>
                        <p className="text-[#737373] text-xs">{doc.size} • Uploaded {doc.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-[#737373] hover:text-[#5C6ED5] transition-colors" title="View">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button className="p-1 text-[#737373] hover:text-[#5C6ED5] transition-colors" title="Download">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="flex items-center gap-2 text-[#525252] text-sm font-medium hover:text-[#5C6ED5] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download All Documents
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Application Timeline */}
            <div className="bg-white border border-[#E5E5E5] rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-[#171717] font-semibold text-lg mb-4">Application Timeline</h2>

              <div className="space-y-4">
                {applicant.timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${item.pending ? "bg-[#E5E5E5]" : "bg-[#5C6ED5]"}`} />
                      {idx < applicant.timeline.length - 1 && <div className="w-0.5 h-8 bg-[#E5E5E5] my-1" />}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${item.pending ? "text-[#737373]" : "text-[#171717]"}`}>
                        {item.event}
                      </p>
                      <p className="text-[#737373] text-xs">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* References */}
            <div className="bg-white border border-[#E5E5E5] rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-[#171717] font-semibold text-lg mb-4">References</h2>

              <div className="space-y-4">
                {applicant.references.map((ref, idx) => (
                  <div key={idx} className="pb-4 border-b border-[#E5E5E5] last:border-b-0 hover:text-[#5C6ED5] transition-colors">
                    <p className="text-[#171717] font-medium text-sm hover:text-[#5C6ED5]">{ref.name}</p>
                    <p className="text-[#737373] text-xs mb-1">{ref.title}</p>
                    <p className="text-[#525252] text-xs hover:text-[#5C6ED5]">{ref.phone}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal Notes */}
            <div className="bg-white border border-[#E5E5E5] rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-[#171717] font-semibold text-lg mb-4">Internal Notes</h2>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this applicant..."
                className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#5C6ED5] focus:ring-1 focus:ring-[#5C6ED5] resize-none"
                rows={4}
              />

              <button
                onClick={handleSaveNotes}
                className={`w-full mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isSaved ? "bg-[#5C6ED5] text-white" : "bg-[#5C6ED5] text-white hover:bg-[#3E5A99]"
                }`}
              >
                {isSaved ? "✓ Saved" : "Save Notes"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
