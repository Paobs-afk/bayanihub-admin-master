import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { X, AlertTriangle } from "lucide-react";
import styles from "./rejected-applicant.module.css";

const REJECTED_APPLICATIONS_DATABASE: { [key: string]: any } = {
  "2": {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1 (555) 987-6543",
    role: "Logistic",
    avatar: "📦",
    applicationId: "#APP-2025-0234",
    submittedDate: "Jan 15, 2025",
    decisionDate: "Jan 28, 2025",
    rejectionReason: {
      title: "Reason for Rejection",
      description:
        "After careful review of your application, we found that some required documentation was incomplete. Specifically, the employment verification letter did not meet our current requirements, and the financial statements provided were outdated (older than 90 days).",
    },
    nextSteps: [
      {
        step: 1,
        title: "Review Requirements",
        description: "Check our updated application guidelines and required documentation list.",
      },
      {
        step: 2,
        title: "Prepare Updated Documents",
        description: "Gather all required documentation with current dates and proper formatting.",
      },
      {
        step: 3,
        title: "Resubmit Application",
        description: "You may reapply after 30 days from the rejection date with updated materials.",
      },
    ],
  },
  "5": {
    id: 5,
    name: "Lisa Thompson",
    email: "lthompson@email.com",
    phone: "+1 (555) 345-6789",
    role: "Logistic",
    avatar: "📦",
    applicationId: "#APP-2025-0245",
    submittedDate: "Jan 09, 2025",
    decisionDate: "Jan 22, 2025",
    rejectionReason: {
      title: "Reason for Rejection",
      description:
        "After careful review of your application, we found that some required documentation was incomplete. Specifically, the employment verification letter did not meet our current requirements, and the financial statements provided were outdated (older than 90 days).",
    },
    nextSteps: [
      {
        step: 1,
        title: "Review Requirements",
        description: "Check our updated application guidelines and required documentation list.",
      },
      {
        step: 2,
        title: "Prepare Updated Documents",
        description: "Gather all required documentation with current dates and proper formatting.",
      },
      {
        step: 3,
        title: "Resubmit Application",
        description: "You may reapply after 30 days from the rejection date with updated materials.",
      },
    ],
  },
};

export default function RejectedApplicationDetail() {
  const router = useRouter();
  const { id } = router.query;

  const application = id ? REJECTED_APPLICATIONS_DATABASE[id as string] : null;

  if (!application) {
    return (
      <div className={styles.container}>
        <Header />
        <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#737373", fontSize: "1.125rem", marginBottom: "1rem" }}>
              Application not found
            </p>
            <button
              onClick={() => router.push("/volunteers")}
              style={{
                padding: "0.6rem 1rem",
                backgroundColor: "#5C6ED5",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Back to Volunteers
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.mainContent}>
        {/* Rejection Icon */}
        <div className={styles.iconContainer}>
          <div className={styles.rejectionCircle}>
            <X className={styles.rejectionIcon} />
          </div>
        </div>

        {/* Title and Message */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Application Rejected</h1>
          <p className={styles.subtitle}>
            Unfortunately, your application has not been approved at this time.
          </p>
        </div>

        {/* Application Details */}
        <div className={styles.card}>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <p className={styles.detailLabel}>Application ID</p>
              <p className={styles.detailValue}>{application.applicationId}</p>
            </div>
            <div className={styles.detailItem}>
              <p className={styles.detailLabel}>Submitted</p>
              <p className={styles.detailValue}>{application.submittedDate}</p>
            </div>
            <div className={styles.detailItem}>
              <p className={styles.detailLabel}>Decision Date</p>
              <p className={styles.detailValue}>{application.decisionDate}</p>
            </div>
          </div>
        </div>

        {/* Rejection Reason */}
        <div className={styles.card}>
          <div className={styles.reasonHeader}>
            <AlertTriangle className={styles.reasonIcon} />
            <h2 className={styles.reasonTitle}>{application.rejectionReason.title}</h2>
          </div>
          <p className={styles.reasonText}>{application.rejectionReason.description}</p>
        </div>

        {/* What You Can Do Next */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>What You Can Do Next</h2>
          <div className={styles.stepsContainer}>
            {application.nextSteps.map((item) => (
              <div key={item.step} className={styles.stepItem}>
                <div className={styles.stepNumber}>{item.step}</div>
                <div className={styles.stepContent}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDescription}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className={styles.noticeBox}>
          <div className={styles.noticeHeader}>
            <AlertTriangle className={styles.noticeIcon} />
            <div className={styles.noticeContent}>
              <p className={styles.noticeTitle}>Important Notice</p>
              <p className={styles.noticeText}>
                You must wait 30 days before resubmitting your application. Early resubmissions will be automatically rejected. Please ensure all requirements are met before your next submission.
              </p>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className={styles.linkContainer}>
          <Link href="/volunteers" className={styles.link}>
            Back to Volunteer Applications
          </Link>
          <span className={styles.divider}>•</span>
          <Link href="/" className={styles.link}>
            Back to Dashboard
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
