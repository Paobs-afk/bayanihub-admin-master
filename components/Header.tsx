import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full h-20 border-b border-[#E5E5E5] bg-white flex items-center px-5 sm:px-10 lg:px-14 xl:px-20 2xl:px-24 shrink-0">
      <div className="w-full max-w-[2100px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img 
            src="/bayanihub_logo.png" 
            alt="BayaniHub" 
            className="h-12 w-auto object-contain"
          />
          <span className="text-[#171717] text-xl font-normal tracking-[-0.5px] leading-7 hidden sm:inline-block">
            Admin Portal
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notification bell */}
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5] hover:text-[#5C6ED5] transition-colors group">
            <svg width="18" height="20" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:text-[#5C6ED5]">
              <g clipPath="url(#clip0_header_bell)">
                <path d="M7.87519 0C7.25292 0 6.75019 0.502734 6.75019 1.125V1.7543C4.20136 2.15859 2.25019 4.36641 2.25019 7.03125V8.20547C2.25019 9.80156 1.70527 11.352 0.710347 12.5965L0.186519 13.2539C-0.0173877 13.507 -0.0560596 13.8551 0.0845654 14.1469C0.22519 14.4387 0.520503 14.625 0.84394 14.625H14.9064C15.2299 14.625 15.5252 14.4387 15.6658 14.1469C15.8064 13.8551 15.7678 13.507 15.5639 13.2539L15.04 12.6C14.0451 11.352 13.5002 9.80156 13.5002 8.20547V7.03125C13.5002 4.36641 11.549 2.15859 9.00019 1.7543V1.125C9.00019 0.502734 8.49746 0 7.87519 0ZM7.87519 3.375H8.15644C10.1744 3.375 11.8127 5.01328 11.8127 7.03125V8.20547C11.8127 9.88945 12.3014 11.5312 13.2084 12.9375H2.54199C3.44902 11.5312 3.93769 9.88945 3.93769 8.20547V7.03125C3.93769 5.01328 5.57597 3.375 7.59394 3.375H7.87519ZM10.1252 15.75H7.87519H5.62519C5.62519 16.3477 5.86074 16.9207 6.28261 17.3426C6.70449 17.7645 7.27753 18 7.87519 18C8.47285 18 9.04589 17.7645 9.46777 17.3426C9.88964 16.9207 10.1252 16.3477 10.1252 15.75Z" fill="currentColor" className="text-[#525252] group-hover:text-[#5C6ED5]"/>
              </g>
              <defs>
                <clipPath id="clip0_header_bell">
                  <path d="M0 0H15.75V18H0V0Z" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>

          {/* Divider */}
          <div className="w-px h-10 bg-[#E5E5E5]" />

          {/* User info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5C6ED5] to-[#3E5A99] flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div className="hidden sm:block">
              <p className="text-[#171717] text-sm font-normal leading-5 tracking-[-0.5px]">Admin</p>
              <p className="text-[#737373] text-xs font-normal leading-4 tracking-[-0.5px]">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
