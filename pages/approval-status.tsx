import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Mail, Download } from "lucide-react";
import styles from "./approval-status.module.css";

export default function ApprovalStatus() {
  const router = useRouter();

  const applicationData = {
    id: "#APP-2025-001234",
    submittedDate: "January 15, 2025",
    approvedDate: "January 22, 2025",
    processingTime: "7 business days",
  };

  const nextSteps = [
    {
      step: 1,
      title: "Check your email for confirmation",
      description: "We've sent detailed instructions to your registered email address.",
    },
    {
      step: 2,
      title: "Complete account setup",
      description: "Follow the link in your email to complete your account setup.",
    },
    {
      step: 3,
      title: "Access your dashboard",
      description: "Start using all available features and services.",
    },
  ];

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.mainContent}>
        {/* Success Icon */}
        <div className={styles.iconContainer}>
          <div className={styles.successCircle}>
            <Check className={styles.successIcon} />
          </div>
        </div>

        {/* Title and Message */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Application Approved!</h1>
          <p className={styles.subtitle}>
            Congratulations! Your application has been successfully approved.
          </p>
        </div>

        {/* Application Details */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Application Details</h2>
          <div className={styles.detailsGrid}>
            <div className={`${styles.detailColumn} ${styles.detailColumnBorderRight}`}>
              <div className={styles.detailPadding}>
                <p className={styles.detailLabel}>Application ID</p>
                <p className={styles.detailValue}>{applicationData.id}</p>
              </div>
            </div>
            <div className={styles.detailColumn}>
              <p className={styles.detailLabel}>Submitted Date</p>
              <p className={styles.detailValue}>{applicationData.submittedDate}</p>
            </div>
            <div className={`${styles.detailColumn} ${styles.detailColumnBorderRight}`}>
              <div className={styles.detailPadding}>
                <p className={styles.detailLabel}>Approved Date</p>
                <p className={styles.detailValue}>{applicationData.approvedDate}</p>
              </div>
            </div>
            <div className={styles.detailColumn}>
              <p className={styles.detailLabel}>Processing Time</p>
              <p className={styles.detailValue}>{applicationData.processingTime}</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Next Steps</h2>
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

        {/* Action Buttons */}
        <div className={styles.buttonGrid}>
          <button className={styles.buttonPrimary}>
            <Mail className="w-5 h-5" />
            Check Email
          </button>
          <button className={styles.buttonSecondary}>
            <Download className="w-5 h-5" />
            Download Certificate
          </button>
        </div>

        {/* Back Links */}
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
