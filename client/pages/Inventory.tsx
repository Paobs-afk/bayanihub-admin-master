import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock inventory data
const MOCK_INVENTORY = [
  {
    id: 1,
    name: "Canned Food Items",
    description: "Non-perishable goods",
    site: "Downtown Center",
    location: "Main Warehouse",
    date: "Jan 15, 2025",
    time: "2:30 PM",
    quantity: 150,
    unit: "units",
    category: "Food",
    status: "Available",
    icon: "🥫",
  },
  {
    id: 2,
    name: "Winter Clothing",
    description: "Coats, jackets, sweaters",
    site: "North Branch",
    location: "Storage Room B",
    date: "Jan 14, 2025",
    time: "10:15 AM",
    quantity: 75,
    unit: "items",
    category: "Clothing",
    status: "Reserved",
    icon: "🧥",
  },
  {
    id: 3,
    name: "Medical Supplies",
    description: "First aid kits, bandages",
    site: "South Branch",
    location: "Medical Storage",
    date: "Jan 13, 2025",
    time: "4:45 PM",
    quantity: 25,
    unit: "kits",
    category: "Medical",
    status: "Available",
    icon: "🏥",
  },
  {
    id: 4,
    name: "Blankets & Bedding",
    description: "Thermal blankets, sheets",
    site: "East Campus",
    location: "Warehouse A",
    date: "Jan 12, 2025",
    time: "9:20 AM",
    quantity: 120,
    unit: "sets",
    category: "Bedding",
    status: "Available",
    icon: "🛏️",
  },
  {
    id: 5,
    name: "Hygiene Kits",
    description: "Toiletries and personal care",
    site: "West Center",
    location: "Storage Room C",
    date: "Jan 11, 2025",
    time: "3:15 PM",
    quantity: 200,
    unit: "kits",
    category: "Hygiene",
    status: "Distributed",
    icon: "🧼",
  },
  {
    id: 6,
    name: "Baby Supplies",
    description: "Diapers, formula, wipes",
    site: "Downtown Center",
    location: "Main Warehouse",
    date: "Jan 10, 2025",
    time: "11:30 AM",
    quantity: 85,
    unit: "packs",
    category: "Baby",
    status: "Available",
    icon: "👶",
  },
  {
    id: 7,
    name: "Drinking Water",
    description: "Bottled water bottles",
    site: "North Branch",
    location: "Inventory Room",
    date: "Jan 09, 2025",
    time: "1:45 PM",
    quantity: 500,
    unit: "bottles",
    category: "Beverages",
    status: "Reserved",
    icon: "💧",
  },
  {
    id: 8,
    name: "First Aid Kits",
    description: "Complete emergency first aid",
    site: "South Branch",
    location: "Medical Storage",
    date: "Jan 08, 2025",
    time: "2:00 PM",
    quantity: 40,
    unit: "boxes",
    category: "Medical",
    status: "Available",
    icon: "🏥",
  },
];

const SITES = ["All Sites", "Downtown Center", "North Branch", "South Branch", "East Campus", "West Center"];
const CATEGORIES = ["All Categories", "Food", "Clothing", "Medical", "Bedding", "Hygiene", "Baby", "Beverages"];
const STATUSES = ["All Status", "Available", "Reserved", "Distributed"];

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white border border-[#E5E5E5] rounded-lg hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 bg-gradient-to-br from-[#5C6ED5]/10 to-[#3E5A99]/10 rounded-lg flex items-center justify-center text-lg">
        {icon}
      </div>
      <div>
        <p className="text-[#737373] text-xs font-normal">{label}</p>
        <p className="text-[#171717] text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

function InventoryRow({
  item,
  selected,
  onSelect,
  onView,
  onEdit,
  onDelete,
}: {
  item: (typeof MOCK_INVENTORY)[0];
  selected: boolean;
  onSelect: (id: number) => void;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  const getStatusColor = (status: string) => {
    const colors: { [key: string]: { bg: string; text: string } } = {
      Available: { bg: "bg-[#5C6ED5]/10", text: "text-[#5C6ED5]" },
      Reserved: { bg: "bg-[#3E5A99]/10", text: "text-[#3E5A99]" },
      Distributed: { bg: "bg-[#5C6ED5]/5", text: "text-[#5C6ED5]" },
    };
    return colors[status] || { bg: "bg-gray-100", text: "text-gray-700" };
  };

  const statusColor = getStatusColor(item.status);

  return (
    <tr className="border-b border-[#E5E5E5] hover:bg-[#FAFAFA] transition-colors">
      <td className="px-4 py-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(item.id)}
          className="w-4 h-4 rounded border-[#E5E5E5] cursor-pointer text-[#5C6ED5] focus:ring-[#5C6ED5]"
        />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#5C6ED5]/10 to-[#3E5A99]/10 rounded flex items-center justify-center text-lg">
            {item.icon}
          </div>
          <div>
            <p className="text-[#171717] text-sm font-medium">{item.name}</p>
            <p className="text-[#737373] text-xs">{item.description}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div>
          <p className="text-[#171717] text-sm font-medium">{item.site}</p>
          <p className="text-[#737373] text-xs">{item.location}</p>
        </div>
      </td>
      <td className="px-4 py-4">
        <p className="text-[#171717] text-sm">{item.date}</p>
      </td>
      <td className="px-4 py-4">
        <p className="text-[#171717] text-sm">{item.time}</p>
      </td>
      <td className="px-4 py-4">
        <p className="text-[#171717] text-sm font-medium">
          {item.quantity} {item.unit}
        </p>
      </td>
      <td className="px-4 py-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor.bg} ${statusColor.text}`}>
          {item.status}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onView(item.id)} 
            className="p-1 text-[#737373] hover:text-[#5C6ED5] transition-colors" 
            title="View"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          <button 
            onClick={() => onEdit(item.id)} 
            className="p-1 text-[#737373] hover:text-[#5C6ED5] transition-colors" 
            title="Edit"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button 
            onClick={() => onDelete(item.id)} 
            className="p-1 text-[#737373] hover:text-[#5C6ED5] transition-colors" 
            title="Delete"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

  // Calculate statistics
  const stats = {
    total: MOCK_INVENTORY.length,
    available: MOCK_INVENTORY.filter((i) => i.status === "Available").length,
    reserved: MOCK_INVENTORY.filter((i) => i.status === "Reserved").length,
    distributed: MOCK_INVENTORY.filter((i) => i.status === "Distributed").length,
  };

  const handleSelectAll = () => {
    if (selectedItems.length === paginatedItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedItems.map((item) => item.id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />

      <main className="flex-1 w-full max-w-[1890px] mx-auto px-5 sm:px-10 lg:px-8 py-8 flex flex-col gap-8">
        {/* Page header */}
        <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-[#5C6ED5] text-white rounded-lg hover:bg-[#3E5A99] transition-colors w-fit"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-[#171717] mb-1">Review Donation Inventory</h1>
            <p className="text-[#737373]">Review and manage all donation items across different sites</p>
          </div>
          <div className="w-fit" />
        </div>

        {/* Filters */}
        <div className="bg-white border border-[#E5E5E5] rounded-lg p-4 hover:shadow-lg transition-shadow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#171717] mb-2">Site</label>
              <select
                value={selectedSite}
                onChange={(e) => {
                  setSelectedSite(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#5C6ED5] focus:ring-1 focus:ring-[#5C6ED5]"
              >
                {SITES.map((site) => (
                  <option key={site} value={site}>
                    {site}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#171717] mb-2">Item Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#5C6ED5] focus:ring-1 focus:ring-[#5C6ED5]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#171717] mb-2">Date Range</label>
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#5C6ED5] focus:ring-1 focus:ring-[#5C6ED5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#171717] mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#5C6ED5] focus:ring-1 focus:ring-[#5C6ED5]"
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button className="flex-1 px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm font-medium text-[#525252] hover:bg-[#FAFAFA] hover:text-[#5C6ED5] transition-colors flex items-center gap-2 justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4z" />
                </svg>
                Export
              </button>
              <button className="flex-1 px-4 py-2 bg-[#5C6ED5] text-white rounded-lg text-sm font-medium hover:bg-[#3E5A99] transition-colors flex items-center gap-2 justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add Item
              </button>
            </div>
          </div>
        </div>

        {/* Donation Inventory Table */}
        <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between">
            <h2 className="text-[#171717] font-semibold">Donation Inventory</h2>
            <p className="text-[#737373] text-sm">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredItems.length)} of {filteredItems.length}{" "}
              items
            </p>
          </div>

          {filteredItems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
                    <th className="px-4 py-3 text-left">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-[#E5E5E5] cursor-pointer text-[#5C6ED5] focus:ring-[#5C6ED5]"
                        checked={selectedItems.length === paginatedItems.length && paginatedItems.length > 0}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-[#171717]">Items</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#171717]">Sites</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#171717]">Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#171717]">Time</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#171717]">Quantity</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#171717]">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#171717]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedItems.map((item) => (
                    <InventoryRow
                      key={item.id}
                      item={item}
                      selected={selectedItems.includes(item.id)}
                      onSelect={(id) => {
                        setSelectedItems((prev) =>
                          prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
                        );
                      }}
                      onView={(id) => console.log("View item:", id)}
                      onEdit={(id) => console.log("Edit item:", id)}
                      onDelete={(id) => console.log("Delete item:", id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-[#737373]">No inventory items found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Items" value={stats.total.toString()} icon="📦" />
          <StatCard label="Available" value={stats.available.toString()} icon="✓" />
          <StatCard label="Reserved" value={stats.reserved.toString()} icon="⏱️" />
          <StatCard label="Distributed" value={stats.distributed.toString()} icon="🚚" />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#737373]">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredItems.length)} of{" "}
              {filteredItems.length} items
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