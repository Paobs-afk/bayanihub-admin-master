import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, X, CheckCircle, AlertCircle, XCircle, Clock } from "lucide-react";

// Mock volunteer data
const VOLUNTEERS_DATABASE = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    status: "verified",
    joinDate: "Jan 15, 2024",
    rating: 4.9,
    hoursLogged: "120 hours logged",
    backgroundVerified: true,
    avatar: "👩‍⚕️",
  },
  {
    id: 2,
    name: "John Smith",
    email: "john.smith@email.com",
    status: "not_volunteer",
    joinDate: "Mar 10, 2025",
    rating: 0,
    hoursLogged: "Not registered as volunteer",
    backgroundVerified: false,
    avatar: "👨‍💼",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "m.chen@email.com",
    status: "verified",
    joinDate: "Feb 20, 2024",
    rating: 4.8,
    hoursLogged: "89 hours logged",
    backgroundVerified: true,
    avatar: "📦",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    email: "emily@email.com",
    status: "pending",
    joinDate: "Mar 1, 2025",
    rating: 0,
    hoursLogged: "Pending verification",
    backgroundVerified: false,
    avatar: "🏃",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lthompson@email.com",
    status: "verified",
    joinDate: "Dec 5, 2023",
    rating: 4.7,
    hoursLogged: "156 hours logged",
    backgroundVerified: true,
    avatar: "📦",
  },
  {
    id: 6,
    name: "Robert Martinez",
    email: "rmartinez@email.com",
    status: "inactive",
    joinDate: "Jun 15, 2023",
    rating: 3.5,
    hoursLogged: "45 hours logged",
    backgroundVerified: true,
    avatar: "🏃",
  },
  {
    id: 7,
    name: "Amanda Davis",
    email: "adavis@email.com",
    status: "pending",
    joinDate: "Mar 5, 2025",
    rating: 0,
    hoursLogged: "Pending verification",
    backgroundVerified: false,
    avatar: "👩‍⚕️",
  },
];

const recentActivity = [
  {
    type: "registered",
    message: "New volunteer registered",
    timeAgo: "2 hours ago",
    icon: "➕",
  },
  {
    type: "background",
    message: "Background check completed",
    timeAgo: "4 hours ago",
    icon: "✓",
  },
  {
    type: "hours",
    message: "Volunteer hours logged",
    timeAgo: "6 hours ago",
    icon: "⏱️",
  },
];

function VolunteerCard({ volunteer }: { volunteer: (typeof VOLUNTEERS_DATABASE)[0] }) {
  const getStatusInfo = (status: string) => {
    const statusMap: { [key: string]: { color: string; dotColor: string; label: string } } = {
      verified: { color: "bg-[#dcfce7]", dotColor: "bg-[#22c55e]", label: "Verified Volunteer" },
      pending: { color: "bg-[#fef3c7]", dotColor: "bg-[#eab308]", label: "Pending Verification" },
      not_volunteer: { color: "bg-[#fee2e2]", dotColor: "bg-[#ef4444]", label: "Not a Volunteer" },
      inactive: { color: "bg-[#f3f4f6]", dotColor: "bg-[#9ca3af]", label: "Inactive" },
    };
    return statusMap[status] || statusMap.inactive;
  };

  const statusInfo = getStatusInfo(volunteer.status);

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-lg p-4 mb-3 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-12 h-12 bg-gradient-to-br from-[#5C6ED5]/10 to-[#3E5A99]/10 rounded-full flex items-center justify-center flex-shrink-0 text-lg">
            {volunteer.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-[#171717] font-semibold text-sm">{volunteer.name}</h3>
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotColor}`}></div>
                {statusInfo.label}
              </div>
            </div>
            <p className="text-[#737373] text-xs mb-2">{volunteer.email}</p>
            <div className="flex flex-wrap gap-3 text-xs text-[#737373]">
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Joined {volunteer.joinDate}
              </span>
              {volunteer.rating > 0 && (
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 10.26 24 10.26 17.55 16.53 19.64 24.74 12 18.46 4.36 24.74 6.45 16.53 0 10.26 8.91 10.26" />
                  </svg>
                  {volunteer.rating} rating
                </span>
              )}
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {volunteer.hoursLogged}
              </span>
              {volunteer.backgroundVerified && (
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7l2.5-2.5 4-4" />
                  </svg>
                  Background verified
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VolunteerVerification() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof VOLUNTEERS_DATABASE>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = VOLUNTEERS_DATABASE.filter(
      (v) => v.name.toLowerCase().includes(query) || v.email.toLowerCase().includes(query)
    );

    setSearchResults(results);
    setHasSearched(true);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
  };

  const stats = {
    total: VOLUNTEERS_DATABASE.length,
    activeThisMonth: 1234,
    verified: VOLUNTEERS_DATABASE.filter((v) => v.status === "verified").length,
    pending: VOLUNTEERS_DATABASE.filter((v) => v.status === "pending").length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-5 sm:px-10 py-8 flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
          <div>
            <h1 className="text-[#171717] text-3xl font-semibold mb-1">Volunteer Verification</h1>
            <p className="text-[#737373] text-sm">Check if users are registered volunteers in our system</p>
          </div>
          <div className="text-sm text-[#737373] whitespace-nowrap">
            Last updated: March 8, 2025
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Volunteer Lookup */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Search Section */}
            <div className="bg-white border border-[#E5E5E5] rounded-lg p-6">
              <h2 className="text-[#171717] font-semibold text-lg mb-4">Volunteer Lookup</h2>
              <p className="text-[#737373] text-sm mb-4">Search by Email or Name</p>

              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Enter email address or full name"
                    className="w-full px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#5C6ED5] focus:ring-1 focus:ring-[#5C6ED5]"
                  />
                  <Search className="absolute right-3 top-2.5 w-4 h-4 text-[#737373]" />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSearch}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#5C6ED5] text-white rounded-lg text-sm font-medium hover:bg-[#3E5A99] transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Search Volunteer
                </button>
                <button
                  onClick={handleClearSearch}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-[#E5E5E5] text-[#171717] rounded-lg text-sm font-medium hover:bg-[#FAFAFA] transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear Search
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="bg-white border border-[#E5E5E5] rounded-lg p-6">
              <h2 className="text-[#171717] font-semibold text-lg mb-4">Search Results</h2>

              {!hasSearched ? (
                <p className="text-[#737373] text-sm text-center py-8">Search for a volunteer to get started</p>
              ) : searchResults.length > 0 ? (
                <div className="space-y-2">
                  {searchResults.map((volunteer) => (
                    <VolunteerCard key={volunteer.id} volunteer={volunteer} />
                  ))}
                </div>
              ) : (
                <p className="text-[#737373] text-sm text-center py-8">No volunteers found matching "{searchQuery}"</p>
              )}
            </div>
          </div>

          {/* Right Column - Stats and Activity */}
          <div className="flex flex-col gap-6">
            {/* Quick Stats */}
            <div className="bg-white border border-[#E5E5E5] rounded-lg p-6">
              <h2 className="text-[#171717] font-semibold text-lg mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-[#737373] text-xs font-semibold uppercase mb-1">Total Volunteers</p>
                  <p className="text-[#171717] text-2xl font-bold">{stats.total.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[#737373] text-xs font-semibold uppercase mb-1">Active This Month</p>
                  <p className="text-[#171717] text-2xl font-bold">{stats.activeThisMonth.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[#737373] text-xs font-semibold uppercase mb-1">Verified Volunteers</p>
                  <p className="text-[#171717] text-2xl font-bold">{stats.verified}</p>
                </div>
                <div>
                  <p className="text-[#737373] text-xs font-semibold uppercase mb-1">Pending Verification</p>
                  <p className="text-[#171717] text-2xl font-bold">{stats.pending}</p>
                </div>
              </div>
            </div>

            {/* Verification Status Legend */}
            <div className="bg-white border border-[#E5E5E5] rounded-lg p-6">
              <h2 className="text-[#171717] font-semibold text-lg mb-4">Verification Status</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></div>
                  <span className="text-[#525252] text-sm">Verified Volunteer</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]"></div>
                  <span className="text-[#525252] text-sm">Pending Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></div>
                  <span className="text-[#525252] text-sm">Not a Volunteer</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#9ca3af]"></div>
                  <span className="text-[#525252] text-sm">Inactive</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-[#E5E5E5] rounded-lg p-6">
              <h2 className="text-[#171717] font-semibold text-lg mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-3 border-b border-[#E5E5E5] last:border-b-0">
                    <span className="text-lg flex-shrink-0">{activity.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#525252] text-sm">{activity.message}</p>
                      <p className="text-[#737373] text-xs">{activity.timeAgo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
