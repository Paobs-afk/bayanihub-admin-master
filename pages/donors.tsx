import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./donors.module.css";

// Mock donor data
const MOCK_DONORS = [
  { id: 1, name: "Michael Johnson", bloodType: "A+", location: "New York, NY", appliedDate: "03-15-2024", phone: "(555) 123-4567" },
  { id: 2, name: "Sarah Williams", bloodType: "O-", location: "Los Angeles, CA", appliedDate: "02-28-2024", phone: "(555) 987-6543" },
  { id: 3, name: "David Chen", bloodType: "B+", location: "Chicago, IL", appliedDate: "03-22-2024", phone: "(555) 456-7890" },
  { id: 4, name: "Emily Rodriguez", bloodType: "AB+", location: "Houston, TX", appliedDate: "01-18-2024", phone: "(555) 234-5678" },
  { id: 5, name: "James Wilson", bloodType: "O+", location: "Phoenix, AZ", appliedDate: "03-10-2024", phone: "(555) 345-6789" },
  { id: 6, name: "Lisa Thompson", bloodType: "A-", location: "Philadelphia, PA", appliedDate: "02-14-2024", phone: "(555) 567-8901" },
  { id: 7, name: "Robert Martinez", bloodType: "B-", location: "San Antonio, TX", appliedDate: "03-05-2024", phone: "(555) 678-9012" },
  { id: 8, name: "Amanda Davis", bloodType: "AB-", location: "San Diego, CA", appliedDate: "01-25-2024", phone: "(555) 789-0123" },
];

const BLOOD_TYPES = ["All Blood Types", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const CITIES = ["All Cities", "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ", "Philadelphia, PA", "San Antonio, TX", "San Diego, CA"];

const BLOOD_TYPE_COLORS: { [key: string]: { bg: string; text: string } } = {
  "A+": { bg: "#EFF6FF", text: "#0369A1" },
  "A-": { bg: "#F0F9FF", text: "#0369A1" },
  "B+": { bg: "rgba(92, 110, 213, 0.1)", text: "#3E5A99" },
  "B-": { bg: "rgba(92, 110, 213, 0.05)", text: "#3E5A99" },
  "AB+": { bg: "rgba(92, 110, 213, 0.2)", text: "#5C6ED5" },
  "AB-": { bg: "rgba(92, 110, 213, 0.1)", text: "#5C6ED5" },
  "O+": { bg: "rgba(92, 110, 213, 0.15)", text: "#3E5A99" },
  "O-": { bg: "rgba(92, 110, 213, 0.05)", text: "#3E5A99" },
};

function BloodTypeBadge({ bloodType }: { bloodType: string }) {
  const color = BLOOD_TYPE_COLORS[bloodType] || { bg: "rgba(92, 110, 213, 0.1)", text: "#5C6ED5" };
  return (
    <span className={styles.bloodTypeBadge} style={{ backgroundColor: color.bg, color: color.text }}>
      {bloodType}
    </span>
  );
}

function DonorCard({ donor, onMenuClick }: { donor: (typeof MOCK_DONORS)[0]; onMenuClick: (id: number) => void }) {
  return (
    <div className={styles.donorCard}>
      <div className={styles.donorCardHeader}>
        <div className={styles.donorAvatar}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5C6ED5" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <BloodTypeBadge bloodType={donor.bloodType} />
      </div>
      <h3 className={styles.donorName}>{donor.name}</h3>
      <p className={styles.donorLocation}>{donor.location}</p>
      <p className={styles.donorApplied}>Applied {donor.appliedDate}</p>
      <div className={styles.donorCardFooter}>
        <a href={`tel:${donor.phone}`} className={styles.donorPhone}>
          {donor.phone}
        </a>
        <button onClick={() => onMenuClick(donor.id)} className={styles.donorMenuButton}>
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
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <Link href="/" className={styles.backButton}>
            <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <div className={styles.headerCenter}>
            <h1 className={styles.headerTitle}>Donor Management</h1>
            <p className={styles.headerSubtitle}>Manage and track donors in your system</p>
          </div>
          <div className={styles.headerSpacer} />
        </div>

        <div className={styles.filtersSection}>
          <div className={styles.filtersContent}>
            <div className={styles.searchContainer}>
              <div className={styles.searchWrapper}>
                <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search donors..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className={styles.searchInput}
                />
              </div>
            </div>
            <div className={styles.filterButtons}>
              <select value={selectedBloodType} onChange={(e) => { setSelectedBloodType(e.target.value); setCurrentPage(1); }} className={styles.filterSelect}>
                {BLOOD_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
              <select value={selectedCity} onChange={(e) => { setSelectedCity(e.target.value); setCurrentPage(1); }} className={styles.filterSelect}>
                {CITIES.map((city) => <option key={city} value={city}>{city}</option>)}
              </select>
              <div className={styles.actionButtonsGroup}>
                <button className={styles.actionButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  </svg>
                </button>
                <button className={styles.actionButton}>Export</button>
                <button className={styles.actionButtonPrimary}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Add Donor
                </button>
                <div className={styles.viewIconsGroup}>
                  <button className={styles.actionButton}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 011.502-.684l1.498 4.493a1 1 0 00.948.684H19a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                      <path d="M3 13a2 2 0 012-2h3.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 011.502-.684l1.498 4.493a1 1 0 00.948.684H19a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button className={styles.actionButton}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 011.502-.684l1.498 4.493a1 1 0 00.948.684H19a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {paginatedDonors.length > 0 ? (
          <div className={styles.donatorsGrid}>
            {paginatedDonors.map((donor) => (
              <DonorCard key={donor.id} donor={donor} onMenuClick={(id) => console.log("Menu clicked for donor:", id)} />
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <p className={styles.noResultsText}>No donors found matching your criteria.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className={styles.paginationContainer}>
            <p className={styles.paginationInfo}>
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredDonors.length)} of {filteredDonors.length} donors
            </p>
            <div className={styles.paginationControls}>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={styles.paginationButton}
              >
                <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className={styles.paginationPages}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`${styles.pageNumber} ${currentPage === page ? styles.pageNumberActive : ""}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={styles.paginationButton}
              >
                <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
