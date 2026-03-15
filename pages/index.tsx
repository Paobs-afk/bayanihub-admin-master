import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./index.module.css";

function StatCard({ imageUrl, label, value }: { imageUrl: string; label: string; value: string }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statCardTop}>
        <img src={imageUrl} alt={label} className={styles.statIcon} />
        <span className={styles.statLabel}>Total</span>
      </div>
      <p className={styles.statValue}>{value}</p>
      <p className={styles.statLabel}>{label}</p>
    </div>
  );
}

function QuickAccessCard({ imageUrl, title, description, buttonLabel, href, lastUpdated }: { imageUrl: string; title: string; description: string; buttonLabel: string; href: string; lastUpdated: string }) {
  return (
    <div className={styles.quickCard}>
      <div className={styles.quickCardContent}>
        <img src={imageUrl} alt={title} className={styles.quickCardImage} />
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
          <StatCard value="1,247" label="Active Donors" imageUrl="https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2F55bd7150219642ff8bb81d921808f1c2?format=webp&width=800&height=1200" />
          <StatCard value="892" label="Volunteers" imageUrl="https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2Fb42539e66ff54d7db512691eb9b913df?format=webp&width=800&height=1200" />
          <StatCard value="3,456" label="Inventory Items" imageUrl="https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2F809749859f344fd6a82f775181af31de?format=webp&width=800&height=1200" />
        </section>

        <section className={styles.quickAccessSection}>
          <h3 className={styles.sectionTitle}>Quick Access</h3>
          <div className={styles.quickAccessGrid}>
            <QuickAccessCard href="/donors" title="Donor Management" description="View and manage all donor profiles, donations, and contribution history" buttonLabel="Go to Donors" lastUpdated="2 hours ago" imageUrl="https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2F3c6ffe4c2ed0471bb725b7f1adaa3c57?format=webp&width=800&height=1200" />
            <QuickAccessCard href="/volunteers" title="Volunteer Management" description="Coordinate volunteers, track activities, and manage schedules efficiently" buttonLabel="Go to Volunteers" lastUpdated="5 hours ago" imageUrl="https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2F03dca035d2ad47b1b707071db21129ac?format=webp&width=800&height=1200" />
            <QuickAccessCard href="/inventory" title="Inventory Management" description="Monitor stock levels, track items, and manage inventory distribution" buttonLabel="Go to Inventory" lastUpdated="1 hour ago" imageUrl="https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2F82ecdf71cb684ad4a1c4da1c24bb5be8?format=webp&width=800&height=1200" />
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
