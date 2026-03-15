import { useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock volunteer data - same as in Volunteers page
const MOCK_VOLUNTEERS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Medic",
    description: "Registered Nurse with 5 years emergency care experience",
    appliedDate: "Jan 19, 2025",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Logistic",
    description: "Supply chain manager with warehouse operations experience",
    appliedDate: "Jan 14, 2025",
    email: "m.chen@email.com",
    phone: "+1 (555) 987-6543",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Field",
    description: "Community outreach coordinator with disaster response training",
    appliedDate: "Jan 13, 2025",
    email: "emily@email.com",
    phone: "+1 (555) 456-7890",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Medic",
    description: "Paramedic with 3 years field emergency response experience",
    appliedDate: "Jan 10, 2025",
    email: "j.wilson@email.com",
    phone: "+1 (555) 234-5678",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Logistic",
    description: "Warehouse manager with inventory management expertise",
    appliedDate: "Jan 09, 2025",
    email: "lthompson@email.com",
    phone: "+1 (555) 345-6789",
  },
  {
    id: 6,
    name: "Robert Martinez",
    role: "Field",
    description: "Community volunteer with event coordination experience",
    appliedDate: "Jan 08, 2025",
    email: "rmartinez@email.com",
    phone: "+1 (555) 567-8901",
  },
  {
    id: 7,
    name: "Amanda Davis",
    role: "Medic",
    description: "Healthcare professional with CPR certification",
    appliedDate: "Jan 07, 2025",
    email: "adavis@email.com",
    phone: "+1 (555) 678-9012",
  },
  {
    id: 8,
    name: "David Lee",
    role: "Logistic",
    description: "Operations specialist with supply chain expertise",
    appliedDate: "Jan 06, 2025",
    email: "dlee@email.com",
    phone: "+1 (555) 789-0123",
  },
];

const VOLUNTEER_ROLES = ["All Applications", "Medic", "Logistic", "Field"];

function StatCard({ label, value, icon }: { label: string; value: string; icon?: string }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-lg p-4 text-center">
      <p className="text-[#737373] text-sm font-normal mb-2">{label}</p>
      <p className="text-[#171717] text-3xl font-semibold">{value}</p>
      {icon && <p className="text-[#737373] text-xs mt-1">{icon}</p>}
    </div>
  );
}

function ApplicationItem({
  volunteer,
  onReview,
  onApprove,
  onReject,
}: {
  volunteer: (typeof MOCK_VOLUNTEERS)[0];
  onReview: (id: number) => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}) {
  const getRoleColor = (role: string) => {
    const colors: { [key: string]: { bg: string; text: string; icon: string } } = {
      Medic: { bg: "bg-blue-100", text: "text-blue-700", icon: "👨‍⚕️" },
      Logistic: { bg: "bg-green-100", text: "text-green-700", icon: "📦" },
      Field: { bg: "bg-orange-100", text: "text-orange-700", icon: "🏃" },
    };
    return colors[role] || { bg: "bg-gray-100", text: "text-gray-700", icon: "👤" };
  };

  const roleColor = getRoleColor(volunteer.role);

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-lg p-6 mb-4">
      <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 text-3xl">
            {roleColor.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[#171717] font-semibold text-lg mb-2">{volunteer.name}</h3>
            <p className="text-[#737373] text-sm mb-4">{volunteer.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-[#737373]">
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1" />
                  <path d="M12 1v6m6-6v6M6 1v6" />
                </svg>
                {volunteer.appliedDate}
              </span>
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
                {volunteer.email}
              </span>
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {volunteer.phone}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 flex-col sm:flex-row w-full sm:w-auto">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${roleColor.bg} ${roleColor.text} whitespace-nowrap`}>
            {volunteer.role}
          </span>
          <button
            onClick={() => onReview(volunteer.id)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors whitespace-nowrap w-full sm:w-auto"
          >
            Review
          </button>
          <button
            onClick={() => onApprove(volunteer.id)}
            className="px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm font-medium text-[#171717] hover:bg-[#FAFAFA] transition-colors whitespace-nowrap w-full sm:w-auto flex items-center gap-1 justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Approve
          </button>
          <button
            onClick={() => onReject(volunteer.id)}
            className="px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm font-medium text-[#171717] hover:bg-[#FAFAFA] transition-colors whitespace-nowrap w-full sm:w-auto flex items-center gap-1 justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VolunteerRole() {
  const navigate = useNavigate();
  const { role } = useParams<{ role: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Validate role parameter
  const validRole = role && VOLUNTEER_ROLES.includes(role) ? role : "All Applications";

  const filteredVolunteers = useMemo(() => {
    if (validRole === "All Applications") {
      return MOCK_VOLUNTEERS;
    }
    return MOCK_VOLUNTEERS.filter((v) => v.role === validRole);
  }, [validRole]);

  const totalPages = Math.ceil(filteredVolunteers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVolunteers = filteredVolunteers.slice(startIndex, startIndex + itemsPerPage);

  // Count applications by role
  const counts = {
    total: MOCK_VOLUNTEERS.length,
    medic: MOCK_VOLUNTEERS.filter((v) => v.role === "Medic").length,
    logistic: MOCK_VOLUNTEERS.filter((v) => v.role === "Logistic").length,
    field: MOCK_VOLUNTEERS.filter((v) => v.role === "Field").length,
  };

  const getRoleIcon = (roleName: string) => {
    const icons: { [key: string]: string } = {
      "All Applications": "📋",
      Medic: "👨‍⚕️",
      Logistic: "📦",
      Field: "🏃",
    };
    return icons[roleName] || "👤";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-8 py-8 flex flex-col gap-8">
        {/* Page header */}
        <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
          <button
            onClick={() => navigate("/volunteers")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-fit"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-2xl">{getRoleIcon(validRole)}</span>
              <h1 className="text-2xl font-semibold text-[#171717]">
                {validRole === "All Applications" ? "Volunteer Applications" : `${validRole} Volunteer Applications`}
              </h1>
            </div>
          </div>
          <div className="w-fit" />
        </div>

        {/* Application Queue section */}
        <div className="bg-white border border-[#E5E5E5] rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-[#171717] font-semibold text-lg mb-1">Application Queue</h2>
            <p className="text-[#737373] text-sm">Filter applications by volunteer role</p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard label="Total Pending" value={counts.total.toString()} />
            <StatCard label="Medic" value={counts.medic.toString()} icon="👨‍⚕️" />
            <StatCard label="Logistic" value={counts.logistic.toString()} icon="📦" />
            <StatCard label="Field" value={counts.field.toString()} icon="🏃" />
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-2 flex-wrap">
          {VOLUNTEER_ROLES.map((filterRole) => (
            <button
              key={filterRole}
              onClick={() => {
                if (filterRole === "All Applications") {
                  navigate("/volunteers");
                } else {
                  navigate(`/volunteers/${filterRole}`);
                }
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                validRole === filterRole
                  ? "bg-blue-500 text-white"
                  : "border border-[#E5E5E5] text-[#525252] hover:bg-[#FAFAFA]"
              }`}
            >
              {filterRole === "All Applications" && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
              )}
              {filterRole === "Medic" && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1" />
                </svg>
              )}
              {filterRole === "Logistic" && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 2L6 6H2v10h20V6h-4l-3-4z" />
                </svg>
              )}
              {filterRole === "Field" && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                </svg>
              )}
              {filterRole}
            </button>
          ))}
        </div>

        {/* Applications list */}
        <div>
          {paginatedVolunteers.length > 0 ? (
            <>
              {paginatedVolunteers.map((volunteer) => (
                <ApplicationItem
                  key={volunteer.id}
                  volunteer={volunteer}
                  onReview={(id) => navigate(`/applicant/${id}`)}
                  onApprove={(id) => console.log("Approve clicked for volunteer:", id)}
                  onReject={(id) => console.log("Reject clicked for volunteer:", id)}
                />
              ))}
            </>
          ) : (
            <div className="bg-white border border-[#E5E5E5] rounded-lg p-12 text-center">
              <p className="text-[#737373]">No volunteer applications found.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#737373]">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredVolunteers.length)} of{" "}
              {filteredVolunteers.length} applications
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-[#E5E5E5] rounded-lg disabled:opacity-50 hover:bg-[#FAFAFA] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "border border-[#E5E5E5] hover:bg-[#FAFAFA]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-[#E5E5E5] rounded-lg disabled:opacity-50 hover:bg-[#FAFAFA] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
