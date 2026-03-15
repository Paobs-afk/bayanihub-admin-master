import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { X, AlertTriangle } from "lucide-react";
import styles from "./rejection-status.module.css";

export default function RejectionStatus() {
  const router = useRouter();

  const applicationData = {
    id: "#APP-2025-001234",
    submittedDate: "Jan 15, 2025",
    decisionDate: "Jan 28, 2025",
  };

  const rejectionReason = {
    title: "Reason for Rejection",
    description:
      "After careful review of your application, we found that some required documentation was incomplete. Specifically, the employment verification letter did not meet our current requirements, and the financial statements provided were outdated (older than 90 days).",
  };

  const nextSteps = [
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
  ];

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
              <p className={styles.detailValue}>{applicationData.id}</p>
            </div>
            <div className={styles.detailItem}>
              <p className={styles.detailLabel}>Submitted</p>
              <p className={styles.detailValue}>{applicationData.submittedDate}</p>
            </div>
            <div className={styles.detailItem}>
              <p className={styles.detailLabel}>Decision Date</p>
              <p className={styles.detailValue}>{applicationData.decisionDate}</p>
            </div>
          </div>
        </div>

        {/* Rejection Reason */}
        <div className={styles.card}>
          <div className={styles.reasonHeader}>
            <AlertTriangle className={styles.reasonIcon} />
            <h2 className={styles.reasonTitle}>{rejectionReason.title}</h2>
          </div>
          <p className={styles.reasonText}>{rejectionReason.description}</p>
        </div>

        {/* What You Can Do Next */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>What You Can Do Next</h2>
          <div className={styles.stepsContainer}>
            {nextSteps.map((item) => (
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
          <button
            onClick={() => router.push("/volunteers")}
            className={styles.link}
          >
            Back to Volunteer Applications
          </button>
          <span className={styles.divider}>•</span>
          <button
            onClick={() => router.push("/")}
            className={styles.link}
          >
            Back to Dashboard
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
