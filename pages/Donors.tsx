import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock donor data
const MOCK_DONORS = [
  {
    id: 1,
    name: "Michael Johnson",
    bloodType: "A+",
    location: "New York, NY",
    appliedDate: "03-15-2024",
    phone: "(555) 123-4567",
  },
  {
    id: 2,
    name: "Sarah Williams",
    bloodType: "O-",
    location: "Los Angeles, CA",
    appliedDate: "02-28-2024",
    phone: "(555) 987-6543",
  },
  {
    id: 3,
    name: "David Chen",
    bloodType: "B+",
    location: "Chicago, IL",
    appliedDate: "03-22-2024",
    phone: "(555) 456-7890",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    bloodType: "AB+",
    location: "Houston, TX",
    appliedDate: "01-18-2024",
    phone: "(555) 234-5678",
  },
  {
    id: 5,
    name: "James Wilson",
    bloodType: "O+",
    location: "Phoenix, AZ",
    appliedDate: "03-10-2024",
    phone: "(555) 345-6789",
  },
  {
    id: 6,
    name: "Lisa Thompson",
    bloodType: "A-",
    location: "Philadelphia, PA",
    appliedDate: "02-14-2024",
    phone: "(555) 567-8901",
  },
  {
    id: 7,
    name: "Robert Martinez",
    bloodType: "B-",
    location: "San Antonio, TX",
    appliedDate: "03-05-2024",
    phone: "(555) 678-9012",
  },
  {
    id: 8,
    name: "Amanda Davis",
    bloodType: "AB-",
    location: "San Diego, CA",
    appliedDate: "01-25-2024",
    phone: "(555) 789-0123",
  },
];

const BLOOD_TYPES = ["All Blood Types", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const CITIES = [
  "All Cities",
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
];

function BloodTypeBadge({ bloodType }: { bloodType: string }) {
  const getColor = (type: string) => {
    const colors: { [key: string]: { bg: string; text: string } } = {
      "A+": { bg: "bg-blue-100", text: "text-[#5C6ED5]" },
      "A-": { bg: "bg-blue-50", text: "text-[#5C6ED5]" },
      "B+": { bg: "bg-[#5C6ED5]/10", text: "text-[#3E5A99]" },
      "B-": { bg: "bg-[#5C6ED5]/5", text: "text-[#3E5A99]" },
      "AB+": { bg: "bg-[#5C6ED5]/20", text: "text-[#5C6ED5]" },
      "AB-": { bg: "bg-[#5C6ED5]/10", text: "text-[#5C6ED5]" },
      "O+": { bg: "bg-[#5C6ED5]/15", text: "text-[#3E5A99]" },
      "O-": { bg: "bg-[#5C6ED5]/5", text: "text-[#3E5A99]" },
    };
    return colors[type] || { bg: "bg-gray-100", text: "text-[#5C6ED5]" };
  };

  const color = getColor(bloodType);
  return <span className={`text-xs font-semibold ${color.text} ${color.bg} px-2.5 py-1 rounded`}>{bloodType}</span>;
}

function DonorCard({
  donor,
  onMenuClick,
}: {
  donor: (typeof MOCK_DONORS)[0];
  onMenuClick: (id: number) => void;
}) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-[#5C6ED5]/10 to-[#3E5A99]/10 rounded-full flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5C6ED5" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <BloodTypeBadge bloodType={donor.bloodType} />
      </div>
      <h3 className="text-[#171717] text-sm font-semibold mb-1">{donor.name}</h3>
      <p className="text-[#737373] text-xs mb-1">{donor.location}</p>
      <p className="text-[#737373] text-xs mb-3">Applied {donor.appliedDate}</p>
      <div className="flex items-center justify-between pt-3 border-t border-[#E5E5E5]">
        <a href={`tel:${donor.phone}`} className="text-[#525252] text-xs hover:text-[#5C6ED5] transition-colors">
          {donor.phone}
        </a>
        <button
          onClick={() => onMenuClick(donor.id)}
          className="text-[#737373] hover:text-[#5C6ED5] p-1 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Donors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("All Blood Types");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredDonors = useMemo(() => {
    return MOCK_DONORS.filter((donor) => {
      const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBloodType = selectedBloodType === "All Blood Types" || donor.bloodType === selectedBloodType;
      const matchesCity = selectedCity === "All Cities" || donor.location === selectedCity;
      return matchesSearch && matchesBloodType && matchesCity;
    });
  }, [searchTerm, selectedBloodType, selectedCity]);

  const totalPages = Math.ceil(filteredDonors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDonors = filteredDonors.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />

      <main className="flex-1 w-full max-w-[1900px] mx-auto px-5 sm:px-10 lg:px-8 py-8 flex flex-col gap-6">
        {/* Page header */}
        <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-[#5C6ED5] text-white rounded-lg hover:bg-[#3E5A99] transition-colors w-fit"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-[#171717] mb-1">Donor Management</h1>
            <p className="text-[#737373]">Manage and track donors in your system</p>
          </div>
          <div className="w-fit" />
        </div>

        {/* Filters and controls */}
        <div className="bg-white border border-[#E5E5E5] rounded-lg p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search bar */}
            <div className="flex-1">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search donors..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#5C6ED5] focus:ring-1 focus:ring-[#5C6ED5]"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3 flex-wrap lg:flex-nowrap">
              <select
                value={selectedBloodType}
                onChange={(e) => {
                  setSelectedBloodType(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm bg-white focus:outline-none focus:border-[#5C6ED5] focus:ring-1 focus:ring-[#5C6ED5]"
              >
                {BLOOD_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm bg-white focus:outline-none focus:border-[#5C6ED5] focus:ring-1 focus:ring-[#5C6ED5]"
              >
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              {/* Action buttons */}
              <button className="p-2 border border-[#E5E5E5] rounded-lg hover:bg-[#FAFAFA] text-[#525252] hover:text-[#5C6ED5] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                </svg>
              </button>

              <button className="px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm text-[#525252] hover:bg-[#FAFAFA] hover:text-[#5C6ED5] transition-colors">
                Export
              </button>

              <button className="px-4 py-2 bg-[#5C6ED5] text-white rounded-lg text-sm font-medium hover:bg-[#3E5A99] transition-colors flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add Donor
              </button>

              <div className="flex gap-1 border border-[#E5E5E5] rounded-lg p-1">
                <button className="p-1.5 hover:bg-[#FAFAFA] rounded text-[#525252] hover:text-[#5C6ED5] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 011.502-.684l1.498 4.493a1 1 0 00.948.684H19a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                    <path d="M3 13a2 2 0 012-2h3.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 011.502-.684l1.498 4.493a1 1 0 00.948.684H19a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button className="p-1.5 hover:bg-[#FAFAFA] rounded text-[#525252] hover:text-[#5C6ED5] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 011.502-.684l1.498 4.493a1 1 0 00.948.684H19a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Donor cards grid */}
        <div>
          {paginatedDonors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {paginatedDonors.map((donor) => (
                <DonorCard
                  key={donor.id}
                  donor={donor}
                  onMenuClick={(id) => {
                    console.log("Menu clicked for donor:", id);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#E5E5E5] rounded-lg p-12 text-center">
              <p className="text-[#737373]">No donors found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#737373]">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredDonors.length)} of{" "}
              {filteredDonors.length} donors
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-[#E5E5E5] rounded-lg disabled:opacity-50 hover:bg-[#FAFAFA] hover:text-[#5C6ED5] transition-colors"
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
                        ? "bg-[#5C6ED5] text-white"
                        : "border border-[#E5E5E5] hover:bg-[#FAFAFA] hover:text-[#5C6ED5]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-[#E5E5E5] rounded-lg disabled:opacity-50 hover:bg-[#FAFAFA] hover:text-[#5C6ED5] transition-colors"
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