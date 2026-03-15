import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function VolunteerRole() {
  const router = useRouter();
  const { role } = router.query;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />
      <PlaceholderPage
        title={`${role} Volunteers`}
        description={`View and manage all volunteers in the ${role} category`}
        icon={
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2Z" fill="white" stroke="white" strokeWidth="2"/>
          </svg>
        }
      />
      <Footer />
    </div>
  );
}
