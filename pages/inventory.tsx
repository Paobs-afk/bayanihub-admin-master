import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./inventory.module.css";

const MOCK_INVENTORY = [
  { id: 1, name: "Canned Food Items", description: "Non-perishable goods", site: "Downtown Center", location: "Main Warehouse", date: "Jan 15, 2025", time: "2:30 PM", quantity: 150, unit: "units", category: "Food", status: "Available", icon: "🥫" },
  { id: 2, name: "Winter Clothing", description: "Coats, jackets, sweaters", site: "North Branch", location: "Storage Room B", date: "Jan 14, 2025", time: "10:15 AM", quantity: 75, unit: "items", category: "Clothing", status: "Reserved", icon: "🧥" },
  { id: 3, name: "Medical Supplies", description: "First aid kits, bandages", site: "South Branch", location: "Medical Storage", date: "Jan 13, 2025", time: "4:45 PM", quantity: 25, unit: "kits", category: "Medical", status: "Available", icon: "🏥" },
  { id: 4, name: "Blankets & Bedding", description: "Thermal blankets, sheets", site: "East Campus", location: "Warehouse A", date: "Jan 12, 2025", time: "9:20 AM", quantity: 120, unit: "sets", category: "Bedding", status: "Available", icon: "🛏️" },
  { id: 5, name: "Hygiene Kits", description: "Toiletries and personal care", site: "West Center", location: "Storage Room C", date: "Jan 11, 2025", time: "3:15 PM", quantity: 200, unit: "kits", category: "Hygiene", status: "Distributed", icon: "🧼" },
  { id: 6, name: "Baby Supplies", description: "Diapers, formula, wipes", site: "Downtown Center", location: "Main Warehouse", date: "Jan 10, 2025", time: "11:30 AM", quantity: 85, unit: "packs", category: "Baby", status: "Available", icon: "👶" },
  { id: 7, name: "Drinking Water", description: "Bottled water bottles", site: "North Branch", location: "Inventory Room", date: "Jan 09, 2025", time: "1:45 PM", quantity: 500, unit: "bottles", category: "Beverages", status: "Reserved", icon: "💧" },
  { id: 8, name: "First Aid Kits", description: "Complete emergency first aid", site: "South Branch", location: "Medical Storage", date: "Jan 08, 2025", time: "2:00 PM", quantity: 40, unit: "boxes", category: "Medical", status: "Available", icon: "🏥" },
];

const SITES = ["All Sites", "Downtown Center", "North Branch", "South Branch", "East Campus", "West Center"];
const CATEGORIES = ["All Categories", "Food", "Clothing", "Medical", "Bedding", "Hygiene", "Baby", "Beverages"];
const STATUSES = ["All Status", "Available", "Reserved", "Distributed"];

const STATUS_STYLES = {
  "Available": styles.statusAvailable,
  "Reserved": styles.statusReserved,
  "Distributed": styles.statusDistributed,
};

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statContent}>
        <p className={styles.statLabel}>{label}</p>
        <p className={styles.statValue}>{value}</p>
      </div>
    </div>
  );
}

function InventoryRow({ item, selected, onSelect, onView, onEdit, onDelete }: { item: typeof MOCK_INVENTORY[0]; selected: boolean; onSelect: (id: number) => void; onView: (id: number) => void; onEdit: (id: number) => void; onDelete: (id: number) => void }) {
  const statusStyle = STATUS_STYLES[item.status as keyof typeof STATUS_STYLES] || styles.statusAvailable;
  
  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableCell}>
        <input type="checkbox" checked={selected} onChange={() => onSelect(item.id)} className={styles.checkbox} />
      </td>
      <td className={styles.tableCell}>
        <div className={styles.itemCell}>
          <div className={styles.itemIcon}>{item.icon}</div>
          <div className={styles.itemInfo}>
            <p className={styles.itemName}>{item.name}</p>
            <p className={styles.itemDescription}>{item.description}</p>
          </div>
        </div>
      </td>
      <td className={styles.tableCell}>
        <div className={styles.siteInfo}>
          <p className={styles.siteName}>{item.site}</p>
          <p className={styles.siteLocation}>{item.location}</p>
        </div>
      </td>
      <td className={styles.tableCell}>{item.date}</td>
      <td className={styles.tableCell}>{item.time}</td>
      <td className={styles.tableCell}>{item.quantity} {item.unit}</td>
      <td className={styles.tableCell}>
        <span className={`${styles.statusBadge} ${statusStyle}`}>{item.status}</span>
      </td>
      <td className={styles.tableCell}>
        <div className={styles.actionCell}>
          <button onClick={() => onView(item.id)} className={styles.iconButton} title="View">
            <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          <button onClick={() => onEdit(item.id)} className={styles.iconButton} title="Edit">
            <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button onClick={() => onDelete(item.id)} className={styles.iconButton} title="Delete">
            <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function Inventory() {
  const [selectedSite, setSelectedSite] = useState("All Sites");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const itemsPerPage = 10;

  const filteredItems = useMemo(() => {
    return MOCK_INVENTORY.filter((item) => {
      const matchesSite = selectedSite === "All Sites" || item.site === selectedSite;
      const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory;
      const matchesStatus = selectedStatus === "All Status" || item.status === selectedStatus;
      return matchesSite && matchesCategory && matchesStatus;
    });
  }, [selectedSite, selectedCategory, selectedStatus]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const stats = {
    total: MOCK_INVENTORY.length,
    available: MOCK_INVENTORY.filter((i) => i.status === "Available").length,
    reserved: MOCK_INVENTORY.filter((i) => i.status === "Reserved").length,
    distributed: MOCK_INVENTORY.filter((i) => i.status === "Distributed").length,
  };

  const handleSelectAll = () => {
    setSelectedItems(selectedItems.length === paginatedItems.length ? [] : paginatedItems.map((item) => item.id));
  };

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
            <h1 className={styles.headerTitle}>Review Donation Inventory</h1>
            <p className={styles.headerSubtitle}>Review and manage all donation items across different sites</p>
          </div>
          <div className={styles.headerSpacer} />
        </div>

        <div className={styles.filtersSection}>
          <div className={styles.filtersGrid}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Site</label>
              <select value={selectedSite} onChange={(e) => { setSelectedSite(e.target.value); setCurrentPage(1); }} className={styles.filterSelect}>
                {SITES.map((site) => <option key={site} value={site}>{site}</option>)}
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Item Category</label>
              <select value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }} className={styles.filterSelect}>
                {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Date Range</label>
              <input type="text" placeholder="mm/dd/yyyy" className={styles.filterInput} />
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Status</label>
              <select value={selectedStatus} onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }} className={styles.filterSelect}>
                {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
            <div className={styles.filterButtonsGroup}>
              <button className={styles.filterButton}>
                <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4z" />
                </svg>
                Export
              </button>
              <button className={`${styles.filterButton} ${styles.filterButtonPrimary}`}>
                <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add Item
              </button>
            </div>
          </div>
        </div>

        <div className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <h2 className={styles.tableTitle}>Donation Inventory</h2>
            <p className={styles.tableInfo}>Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredItems.length)} of {filteredItems.length} items</p>
          </div>
          {filteredItems.length > 0 ? (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead className={styles.tableHead}>
                  <tr>
                    <th className={styles.tableHeadCell}>
                      <input type="checkbox" className={styles.checkbox} checked={selectedItems.length === paginatedItems.length && paginatedItems.length > 0} onChange={handleSelectAll} />
                    </th>
                    <th className={styles.tableHeadCell}>Items</th>
                    <th className={styles.tableHeadCell}>Sites</th>
                    <th className={styles.tableHeadCell}>Date</th>
                    <th className={styles.tableHeadCell}>Time</th>
                    <th className={styles.tableHeadCell}>Quantity</th>
                    <th className={styles.tableHeadCell}>Status</th>
                    <th className={styles.tableHeadCell}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedItems.map((item) => (
                    <InventoryRow key={item.id} item={item} selected={selectedItems.includes(item.id)} onSelect={(id) => setSelectedItems(selectedItems.includes(id) ? selectedItems.filter((i) => i !== id) : [...selectedItems, id])} onView={(id) => console.log("View item:", id)} onEdit={(id) => console.log("Edit item:", id)} onDelete={(id) => console.log("Delete item:", id)} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.noResults}>No inventory items found matching your criteria.</div>
          )}
        </div>

        <div className={styles.statsGrid}>
          <StatCard label="Total Items" value={stats.total.toString()} icon="📦" />
          <StatCard label="Available" value={stats.available.toString()} icon="✓" />
          <StatCard label="Reserved" value={stats.reserved.toString()} icon="⏱️" />
          <StatCard label="Distributed" value={stats.distributed.toString()} icon="🚚" />
        </div>

        {totalPages > 1 && (
          <div className={styles.paginationContainer}>
            <p className={styles.paginationInfo}>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredItems.length)} of {filteredItems.length} items</p>
            <div className={styles.paginationControls}>
              <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className={styles.paginationButton}>
                <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className={styles.paginationPages}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button key={page} onClick={() => setCurrentPage(page)} className={`${styles.pageNumber} ${currentPage === page ? styles.pageNumberActive : ""}`}>{page}</button>
                ))}
              </div>
              <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className={styles.paginationButton}>
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
