import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E5E5E5] bg-white">
      <div className="max-w-[2200px] mx-auto px-5 sm:px-10 lg:px-14 xl:px-20 2xl:px-24 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#525252] text-sm font-normal leading-5 tracking-[-0.5px]">
          © 2025 BayaniHub Admin Portal. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link 
            to="/help" 
            className="text-[#525252] text-sm font-normal leading-5 tracking-[-0.5px] hover:text-[#5C6ED5] transition-colors"
          >
            Help Center
          </Link>
          <Link 
            to="/privacy" 
            className="text-[#525252] text-sm font-normal leading-5 tracking-[-0.5px] hover:text-[#5C6ED5] transition-colors"
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms" 
            className="text-[#525252] text-sm font-normal leading-5 tracking-[-0.5px] hover:text-[#5C6ED5] transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}