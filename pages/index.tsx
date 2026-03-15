import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./index.module.css";

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statCardTop}>
        <div className={styles.statIcon}>{icon}</div>
        <span className={styles.statLabel}>Total</span>
      </div>
      <p className={styles.statValue}>{value}</p>
      <p className={styles.statLabel}>{label}</p>
    </div>
  );
}

function QuickAccessCard({ icon, title, description, buttonLabel, href, lastUpdated }: { icon: React.ReactNode; title: string; description: string; buttonLabel: string; href: string; lastUpdated: string }) {
  return (
    <div className={styles.quickCard}>
      <div className={styles.quickCardContent}>
        <div className={styles.quickCardIcon}>{icon}</div>
        <div>
          <h4 className={styles.quickCardTitle}>{title}</h4>
          <p className={styles.quickCardDescription}>{description}</p>
        </div>
        <Link href={href} className={styles.quickCardButton}>
          {buttonLabel}
          <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
            <path d="M11.993 7.61794C12.3348 7.27615 12.3348 6.72107 11.993 6.37927L7.61797 2.00427C7.27617 1.66248 6.72109 1.66248 6.3793 2.00427C6.0375 2.34607 6.0375 2.90115 6.3793 3.24294L9.26406 6.12498H0.875C0.391016 6.12498 0 6.51599 0 6.99998C0 7.48396 0.391016 7.87498 0.875 7.87498H9.26133L6.38203 10.757C6.04023 11.0988 6.04023 11.6539 6.38203 11.9957C6.72383 12.3375 7.27891 12.3375 7.6207 11.9957L11.9957 7.62068L11.993 7.61794Z" fill="white" />
          </svg>
        </Link>
      </div>
      <div className={styles.quickCardFooter}>
        <span className={styles.quickCardFooterLabel}>Last updated</span>
        <span className={styles.quickCardFooterValue}>{lastUpdated}</span>
      </div>
    </div>
  );
}

function ActivityItem({ icon, title, subtitle, time, isFirst }: { icon: React.ReactNode; title: string; subtitle: string; time: string; isFirst: boolean }) {
  return (
    <div className={`${styles.activityItem} ${!isFirst ? "border-t border-[#E5E5E5]" : ""}`}>
      <div className={styles.activityIcon}>{icon}</div>
      <div className={styles.activityContent}>
        <p className={styles.activityTitle}>{title}</p>
        <p className={styles.activitySubtitle}>{subtitle}</p>
      </div>
      <span className={styles.activityTime}>{time}</span>
    </div>
  );
}

export default function Index() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <section className={styles.welcomeSection}>
          <div className={styles.welcomeHeader}>
            <svg className={styles.welcomeIcon} viewBox="0 0 30 30" fill="none">
              <path d="M16.875 1.875C16.875 0.837891 16.0372 0 15 0C13.9629 0 13.125 0.837891 13.125 1.875V14.0625C13.125 14.5781 12.7032 15 12.1875 15C11.6719 15 11.25 14.5781 11.25 14.0625V3.75C11.25 2.71289 10.4122 1.875 9.37504 1.875C8.33793 1.875 7.50004 2.71289 7.50004 3.75V19.6875C7.50004 19.7754 7.50004 19.8691 7.5059 19.957L3.96098 16.582C3.02348 15.6914 1.54106 15.7266 0.644573 16.6641C-0.251912 17.6016 -0.210896 19.084 0.726604 19.9805L7.31254 26.25C9.83793 28.6582 13.1954 30 16.6875 30H17.8125C23.5079 30 28.125 25.3828 28.125 19.6875V7.5C28.125 6.46289 27.2872 5.625 26.25 5.625C25.2129 5.625 24.375 6.46289 24.375 7.5V14.0625C24.375 14.5781 23.9532 15 23.4375 15C22.9219 15 22.5 14.5781 22.5 14.0625V3.75C22.5 2.71289 21.6622 1.875 20.625 1.875C19.5879 1.875 18.75 2.71289 18.75 3.75V14.0625C18.75 14.5781 18.3282 15 17.8125 15C17.2969 15 16.875 14.5781 16.875 14.0625V1.875Z" fill="#5C6ED5" />
            </svg>
            <h1 className={styles.welcomeTitle}>Welcome Admin!</h1>
          </div>
          <p className={styles.welcomeSubtitle}>Manage your system efficiently from this dashboard</p>
        </section>

        <section className={styles.statsSection}>
          <StatCard value="1,247" label="Active Donors" icon={<svg width="25" height="20" viewBox="0 0 25 20" fill="none"><path d="M5.625 0C6.4538 0 7.24866 0.32924 7.83471 0.915291C8.42076 1.50134 8.75 2.2962 8.75 3.125C8.75 3.9538 8.42076 4.74866 7.83471 5.33471C7.24866 5.92076 6.4538 6.25 5.625 6.25C4.7962 6.25 4.00134 5.92076 3.41529 5.33471C2.82924 4.74866 2.5 3.9538 2.5 3.125C2.5 2.2962 2.82924 1.50134 3.41529 0.915291C4.00134 0.32924 4.7962 0 5.625 0ZM20 0C20.8288 0 21.6237 0.32924 22.2097 0.915291C22.7958 1.50134 23.125 2.2962 23.125 3.125C23.125 3.9538 22.7958 4.74866 22.2097 5.33471C21.6237 5.92076 20.8288 6.25 20 6.25C19.1712 6.25 18.3763 5.92076 17.7903 5.33471C17.2042 4.74866 16.875 3.9538 16.875 3.125C16.875 2.2962 17.2042 1.50134 17.7903 0.915291C18.3763 0.32924 19.1712 0 20 0ZM0 11.668C0 9.36719 1.86719 7.5 4.16797 7.5H5.83594C6.45703 7.5 7.04688 7.63672 7.57812 7.87891C7.52734 8.16016 7.50391 8.45312 7.50391 8.75C7.50391 10.2422 8.16016 11.582 9.19531 12.5C9.1875 12.5 9.17969 12.5 9.16797 12.5H0.832031C0.375 12.5 0 12.125 0 11.668Z" fill="white" /></svg>} />
          <StatCard value="892" label="Volunteers" icon={<svg width="25" height="20" viewBox="0 0 25 20" fill="none"><path d="M4.5 6C4.5 4.4087 5.13214 2.88258 6.25736 1.75736C7.38258 0.632141 8.9087 0 10.5 0C12.0913 0 13.6174 0.632141 14.7426 1.75736C15.8679 2.88258 16.5 4.4087 16.5 6C16.5 7.5913 15.8679 9.11742 14.7426 10.2426C13.6174 11.3679 12.0913 12 10.5 12C8.9087 12 7.38258 11.3679 6.25736 10.2426C5.13214 9.11742 4.5 7.5913 4.5 6Z" fill="white" /></svg>} />
          <StatCard value="3,456" label="Inventory Items" icon={<svg width="23" height="20" viewBox="0 0 23 20" fill="none"><path d="M9.6875 0H8.125C7.08984 0 6.25 0.839844 6.25 1.875V6.25C6.25 7.62891 7.37109 8.75 8.75 8.75H13.75C15.1289 8.75 16.25 7.62891 16.25 6.25V1.875C16.25 0.839844 15.4102 0 14.375 0H12.8125V3.125C12.8125 3.46875 12.5312 3.75 12.1875 3.75H10.3125C9.96875 3.75 9.6875 3.46875 9.6875 3.125V0Z" fill="white" /></svg>} />
        </section>

        <section className={styles.quickAccessSection}>
          <h3 className={styles.sectionTitle}>Quick Access</h3>
          <div className={styles.quickAccessGrid}>
            <QuickAccessCard href="/donors" title="Donor Management" description="View and manage all donor profiles, donations, and contribution history" buttonLabel="Go to Donors" lastUpdated="2 hours ago" icon={<svg width="27" height="24" viewBox="0 0 27 24" fill="none"><path d="M6.9375 3.59062C6.9375 1.60781 8.54531 0 10.5281 0C11.4797 0 12.3938 0.379687 13.0641 1.05L13.5 1.48594L13.9359 1.05C14.6062 0.379687 15.5203 0 16.4719 0C18.4547 0 20.0625 1.60781 20.0625 3.59062C20.0625 4.54219 19.6828 5.45625 19.0125 6.12656L14.1609 10.9734C13.7953 11.3391 13.2 11.3391 12.8344 10.9734L7.9875 6.12656C7.31719 5.45625 6.9375 4.54219 6.9375 3.59062Z" fill="white" /></svg>} />
            <QuickAccessCard href="/volunteers" title="Volunteer Management" description="Coordinate volunteers, track activities, and manage schedules efficiently" buttonLabel="Go to Volunteers" lastUpdated="5 hours ago" icon={<svg width="30" height="24" viewBox="0 0 30 24" fill="none"><path d="M4.5 6C4.5 4.4087 5.13214 2.88258 6.25736 1.75736C7.38258 0.632141 8.9087 0 10.5 0C12.0913 0 13.6174 0.632141 14.7426 1.75736C15.8679 2.88258 16.5 4.4087 16.5 6C16.5 7.5913 15.8679 9.11742 14.7426 10.2426C13.6174 11.3679 12.0913 12 10.5 12C8.9087 12 7.38258 11.3679 6.25736 10.2426C5.13214 9.11742 4.5 7.5913 4.5 6Z" fill="white" /></svg>} />
            <QuickAccessCard href="/inventory" title="Inventory Management" description="Monitor stock levels, track items, and manage inventory distribution" buttonLabel="Go to Inventory" lastUpdated="1 hour ago" icon={<svg width="30" height="24" viewBox="0 0 30 24" fill="none"><path d="M0 22.875V8.02964C0 6.80151 0.745313 5.69995 1.88438 5.24526L14.4422 0.224951C14.7984 0.0796387 15.1969 0.0796387 15.5578 0.224951L28.1156 5.24526C29.2547 5.69995 30 6.8062 30 8.02964V22.875C30 23.4984 29.4984 24 28.875 24H26.625C26.0016 24 25.5 23.4984 25.5 22.875V10.5C25.5 9.67026 24.8297 8.99995 24 8.99995H6C5.17031 8.99995 4.5 9.67026 4.5 10.5V22.875C4.5 23.4984 3.99844 24 3.375 24H1.125C0.501562 24 0 23.4984 0 22.875Z" fill="white" /></svg>} />
          </div>
        </section>

        <section className={styles.quickAccessSection}>
          <h3 className={styles.sectionTitle}>Recent Activity</h3>
          <div className={styles.activitySection}>
            <ActivityItem isFirst={true} title="New donor registered" subtitle="John Smith joined as a donor" time="10 min ago" icon={<svg width="20" height="16" viewBox="0 0 20 16" fill="none"><path d="M3 4C3 2.93913 3.42143 1.92172 4.17157 1.17157C4.92172 0.421427 5.93913 0 7 0C8.06087 0 9.07828 0.421427 9.82843 1.17157C10.5786 1.92172 11 2.93913 11 4C11 5.06087 10.5786 6.07828 9.82843 6.82843C9.07828 7.57857 8.06087 8 7 8C5.93913 8 4.92172 7.57857 4.17157 6.82843C3.42143 6.07828 3 5.06087 3 4Z" fill="#5C6ED5" /></svg>} />
            <ActivityItem isFirst={false} title="Inventory updated" subtitle="50 new items added to stock" time="1 hour ago" icon={<svg width="14" height="16" viewBox="0 0 14 16" fill="none"><path d="M1.58438 1.82812L0 5H6.5V1H2.92812C2.35938 1 1.84063 1.32187 1.58438 1.82812Z" fill="#5C6ED5" /></svg>} />
            <ActivityItem isFirst={false} title="Volunteer shift scheduled" subtitle="8 volunteers assigned for tomorrow" time="3 hours ago" icon={<svg width="14" height="16" viewBox="0 0 14 16" fill="none"><path d="M4 0C4.55312 0 5 0.446875 5 1V2H9V1C9 0.446875 9.44687 0 10 0C10.5531 0 11 0.446875 11 1V2H12.5C13.3281 2 14 2.67188 14 3.5V5H0V3.5C0 2.67188 0.671875 2 1.5 2H3V1C3 0.446875 3.44688 0 4 0Z" fill="#5C6ED5" /></svg>} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
