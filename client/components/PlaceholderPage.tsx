import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function PlaceholderPage({ title, description, icon }: PlaceholderPageProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-[#262626] flex items-center justify-center mb-6">
        {icon}
      </div>
      <h2 className="text-[#171717] text-2xl font-normal leading-8 tracking-[-0.5px] mb-3">{title}</h2>
      <p className="text-[#525252] text-base font-normal leading-6 tracking-[-0.5px] max-w-md mb-8">{description}</p>
      <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 max-w-sm w-full text-left">
        <p className="text-[#737373] text-sm font-normal leading-5 tracking-[-0.5px]">
          This page is a placeholder. Continue prompting to build out the full functionality for this section.
        </p>
      </div>
      <Link
        to="/"
        className="mt-6 flex items-center gap-2 text-[#525252] text-sm font-normal leading-5 tracking-[-0.5px] hover:text-[#171717] transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.25 6H0.75M0.75 6L5.25 1.5M0.75 6L5.25 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to Dashboard
      </Link>
    </div>
  );
}
