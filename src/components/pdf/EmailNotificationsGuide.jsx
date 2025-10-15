// EmailNotificationsPDF.jsx
import React from "react"
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    padding: 50,
    paddingBottom: 60,
    fontSize: 10,
    color: "#1f2937",
    fontFamily: "Helvetica",
  },
  
  // Cover Page
  coverPage: {
    padding: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  coverTitle: {
    fontSize: 42,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  coverSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
    textAlign: "center",
  },
  coverDivider: {
    width: 80,
    height: 2,
    backgroundColor: "#1f2937",
    marginVertical: 20,
  },
  coverDate: {
    fontSize: 9,
    color: "#9ca3af",
    marginTop: 40,
  },
  coverFooter: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 8,
    color: "#9ca3af",
  },

  // Table of Contents
  tocPage: {
    padding: 50,
    paddingBottom: 60,
  },
  tocTitle: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 30,
    borderBottom: "2pt solid #e5e7eb",
    paddingBottom: 12,
  },
  tocItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottom: "0.5pt solid #f3f4f6",
  },
  tocItemNumber: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#1f2937",
    width: 30,
  },
  tocItemTitle: {
    fontSize: 10,
    color: "#374151",
    flex: 1,
  },
  tocItemPage: {
    fontSize: 9,
    color: "#9ca3af",
    width: 40,
    textAlign: "right",
  },

  // Content Pages
  contentPage: {
    padding: 50,
    paddingBottom: 60,
  },
  sectionNumber: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#6b7280",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 6,
  },
  sectionDescription: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 24,
    lineHeight: 1.5,
  },
  sectionDivider: {
    width: 40,
    height: 1.5,
    backgroundColor: "#1f2937",
    marginBottom: 24,
  },

  // Introduction Section
  introSection: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: "#f9fafb",
    borderLeft: "3pt solid #1f2937",
    borderRadius: 4,
  },
  introTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 8,
  },
  introText: {
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.6,
  },

  // Category Headers
  categoryHeader: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 25,
    marginBottom: 15,
    paddingBottom: 8,
    borderBottom: "1pt solid #e5e7eb",
  },

  // Table
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    borderBottomStyle: "solid",
  },
  tableRowLast: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#f9fafb",
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderBottomColor: "#e5e7eb",
    borderBottomStyle: "solid",
  },
  tableColType: {
    width: "20%",
    padding: 10,
  },
  tableColTrigger: {
    width: "20%",
    padding: 10,
  },
  tableColRecipient: {
    width: "18%",
    padding: 10,
  },
  tableColPurpose: {
    width: "42%",
    padding: 10,
  },
  tableHeaderText: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  tableCellText: {
    fontSize: 9,
    color: "#1f2937",
    lineHeight: 1.4,
  },
  tableCellBold: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#1f2937",
    lineHeight: 1.4,
  },

  // Email Badge
  emailBadge: {
    backgroundColor: "#dbeafe",
    color: "#1e40af",
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    marginTop: 3,
  },

  // Tips Section
  tipsSection: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#fef3c7",
    borderLeft: "3pt solid #f59e0b",
    borderRadius: 4,
  },
  tipsTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#92400e",
    marginBottom: 8,
  },
  tipsList: {
    marginTop: 8,
  },
  tipItem: {
    flexDirection: "row",
    marginBottom: 6,
  },
  tipBullet: {
    width: 12,
    fontSize: 9,
    color: "#f59e0b",
  },
  tipText: {
    flex: 1,
    fontSize: 9,
    color: "#78350f",
    lineHeight: 1.5,
  },

  // Page Footer
  pageFooter: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "0.5pt solid #e5e7eb",
    paddingTop: 10,
  },
  pageNumber: {
    fontSize: 8,
    color: "#9ca3af",
  },
  footerText: {
    fontSize: 8,
    color: "#9ca3af",
  },

  // Info Box
  infoBox: {
    backgroundColor: "#f9fafb",
    borderLeft: "3pt solid #1f2937",
    padding: 15,
    borderRadius: 4,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.5,
  },
})

const emailCategories = [
  {
    category: "Account Management",
    emails: [
      {
        type: "Welcome Email",
        trigger: "New account created",
        recipient: "Worker / Manager",
        purpose: "Confirms account creation and provides login instructions."
      },
      {
        type: "Password Reset",
        trigger: '"Forgot Password" requested',
        recipient: "User",
        purpose: "Provides secure link to reset password (valid for 10 minutes)."
      },
      {
        type: "Password Changed",
        trigger: "Password successfully updated",
        recipient: "User",
        purpose: "Confirms password has been changed for security purposes."
      },
    ]
  },
  {
    category: "Game Management",
    emails: [
      {
        type: "Game Completed",
        trigger: "Game marked as complete",
        recipient: "Managers",
        purpose: "Summarizes results and includes PDF summary link."
      },
      {
        type: "Monthly Fixtures",
        trigger: "First of every month",
        recipient: "Managers",
        purpose: "Notifies managers on all upcoming games for the month."
      },
      {
        type: "Upcoming Fixture",
        trigger: "Fixture within the next 24 houes",
        recipient: "Managers",
        purpose: "Notifies managers of upcoming event with date and time."
      },
    ]
  },
  {
    category: "Operations",
    emails: [
      {
        type: "Monthly Summary",
        trigger: "First of every month",
        recipient: "Managers",
        purpose: "Overview of completed games, workers performance, and monthly statistics."
      },
      {
        type: 'Performance Alert',
        trigger: "Worker performance below threshold",
        recipient: "Managers",
        purpose: "Alerts managers about workers with low performance ratings."
      }
    ]
  },
]

const EmailNotificationsGuide = () => (
  <Document>
    {/* Cover Page */}
    <Page size="A4" style={styles.coverPage}>
      <View>
        <Text style={styles.coverTitle}>Email Notifications</Text>
        <Text style={styles.coverSubtitle}>Complete Reference Guide</Text>
        <Text style={styles.coverSubtitle}>Understanding System Communications</Text>
        <View style={styles.coverDivider} />
        <Text style={styles.coverDate}>
          Generated on {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
      </View>
      <Text style={styles.coverFooter}>
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </Text>
    </Page>

    {/* Table of Contents */}
    <Page size="A4" style={styles.tocPage}>
      <Text style={styles.tocTitle}>Table of Contents</Text>
      
      <View style={styles.tocItem}>
        <Text style={styles.tocItemNumber}>01</Text>
        <Text style={styles.tocItemTitle}>Email Notifications Overview</Text>
        <Text style={styles.tocItemPage}>Page 3</Text>
      </View>

      <View style={styles.tocItem}>
        <Text style={styles.tocItemNumber}>02</Text>
        <Text style={styles.tocItemTitle}>Managing Email Preferences</Text>
        <Text style={styles.tocItemPage}>Page 4</Text>
      </View>

      <View style={styles.tocItem}>
        <Text style={styles.tocItemNumber}>03</Text>
        <Text style={styles.tocItemTitle}>Troubleshooting Email Issues</Text>
        <Text style={styles.tocItemPage}>Page 5</Text>
      </View>

      <View style={styles.pageFooter}>
        <Text style={styles.footerText}>Email Notifications Guide</Text>
        <Text style={styles.pageNumber}>Page 2</Text>
      </View>
    </Page>

    {/* Page 3: Email Types Overview */}
    <Page size="A4" style={styles.contentPage}>
      <Text style={styles.sectionNumber}>Section 01</Text>
      <Text style={styles.sectionTitle}>Email Notifications Overview</Text>
      <Text style={styles.sectionDescription}>
        Complete list of automated email notifications sent by the system
      </Text>
      <View style={styles.sectionDivider} />

      <View style={styles.introSection}>
        <Text style={styles.introTitle}>About Email Notifications</Text>
        <Text style={styles.introText}>
          The system automatically sends email notifications to keep users informed about important 
          events, updates, and actions. Emails are triggered by specific events and sent to relevant 
          recipients based on their role and involvement.
        </Text>
      </View>

      {/* Email Categories */}
      {emailCategories.map((category, catIndex) => (
        <View key={catIndex}>
          <Text style={styles.categoryHeader}>{category.category}</Text>
          
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <View style={styles.tableColType}>
                <Text style={styles.tableHeaderText}>Email Type</Text>
              </View>
              <View style={styles.tableColTrigger}>
                <Text style={styles.tableHeaderText}>Trigger</Text>
              </View>
              <View style={styles.tableColRecipient}>
                <Text style={styles.tableHeaderText}>Recipient</Text>
              </View>
              <View style={styles.tableColPurpose}>
                <Text style={styles.tableHeaderText}>Purpose</Text>
              </View>
            </View>

            {/* Table Rows */}
            {category.emails.map((email, index) => (
              <View 
                key={index} 
                style={index === category.emails.length - 1 ? styles.tableRowLast : styles.tableRow}
              >
                <View style={styles.tableColType}>
                  <Text style={styles.tableCellBold}>{email.type}</Text>
                </View>
                <View style={styles.tableColTrigger}>
                  <Text style={styles.tableCellText}>{email.trigger}</Text>
                </View>
                <View style={styles.tableColRecipient}>
                  <Text style={styles.tableCellText}>{email.recipient}</Text>
                </View>
                <View style={styles.tableColPurpose}>
                  <Text style={styles.tableCellText}>{email.purpose}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}

      <View style={styles.pageFooter}>
        <Text style={styles.footerText}>Email Notifications Overview</Text>
        <Text style={styles.pageNumber}>Page 3</Text>
      </View>
    </Page>

    {/* Page 4: Managing Email Preferences */}
    <Page size="A4" style={styles.contentPage}>
      <Text style={styles.sectionNumber}>Section 02</Text>
      <Text style={styles.sectionTitle}>Managing Email Preferences</Text>
      <Text style={styles.sectionDescription}>
        Customise which notifications you receive
      </Text>
      <View style={styles.sectionDivider} />

      <View style={styles.introSection}>
        <Text style={styles.introTitle}>Email Notification Settings</Text>
        <Text style={styles.introText}>
          You can customise your email notification preferences in your account settings. 
          Navigate to 'Profile' → 'Notifications' to manage which emails you receive.
        </Text>
      </View>

      <Text style={styles.categoryHeader}>How to Update Your Preferences</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Step 1: Access Settings</Text>
        <Text style={styles.infoText}>
          Click on 'Profile' on the sidebar. Alternatively, pressing cmd+r simultaneously will direct you to the Accounts page.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Step 2: Navigate to Notifications</Text>
        <Text style={styles.infoText}>
          In the profile page, scroll down to "Notifications" to view all available notification options.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Step 3: Customise Your Preferences</Text>
        <Text style={styles.infoText}>
          Toggle individual notification types on or off based on your preferences. Changes are saved automatically and you will recieve a brief message confirming this.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Warning:</Text>
        <Text style={styles.infoText}>
          Some emails will always be sent and these ones cannot be turned off in your settings. For example, resetting your password will send you an email as it is essential for you to click the link to reset your password. Failure to send an email in this case will result in you being locked out of your account.
          Signing up to the application will send the manager an email so they are aware they have been onboarded. Verification emails will also be sent. Although you can toggle the general emails to turn off, these specific emails will always be sent.
        </Text>
        <Text style={{...styles.infoText, marginTop:'10px'}}>
            Emails such as being alerted for an upcoming fixture, or weekly summaries can be turned off in your settings.
        </Text>
      </View>

      <Text style={[styles.categoryHeader, { marginTop: 30 }]}>Notification Frequency Options</Text>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <View style={{ width: "30%", padding: 10 }}>
            <Text style={styles.tableHeaderText}>Frequency</Text>
          </View>
          <View style={{ width: "70%", padding: 10 }}>
            <Text style={styles.tableHeaderText}>Description</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={{ width: "30%", padding: 10 }}>
            <Text style={styles.tableCellBold}>Instant</Text>
          </View>
          <View style={{ width: "70%", padding: 10 }}>
            <Text style={styles.tableCellText}>
              Receive emails immediately when events occur (default for critical notifications)
            </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={{ width: "30%", padding: 10 }}>
            <Text style={styles.tableCellBold}>Daily Digest</Text>
          </View>
          <View style={{ width: "70%", padding: 10 }}>
            <Text style={styles.tableCellText}>
              Receive a single summary email each day with all notifications
            </Text>
          </View>
        </View>

        <View style={styles.tableRowLast}>
          <View style={{ width: "30%", padding: 10 }}>
            <Text style={styles.tableCellBold}>Weekly Summary</Text>
          </View>
          <View style={{ width: "70%", padding: 10 }}>
            <Text style={styles.tableCellText}>
              Receive a comprehensive weekly summary every Monday morning
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>💡 Best Practices</Text>
        <View style={styles.tipsList}>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              Keep critical notifications (like password resets) enabled for security.
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              Use daily digests to reduce email clutter while staying informed.
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              Add no-reply@yourcompany.com to your safe senders list to prevent emails going to spam.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.pageFooter}>
        <Text style={styles.footerText}>Managing Email Preferences</Text>
        <Text style={styles.pageNumber}>Page 4</Text>
      </View>
    </Page>

    {/* Page 5: Troubleshooting */}
    <Page size="A4" style={styles.contentPage}>
      <Text style={styles.sectionNumber}>Section 03</Text>
      <Text style={styles.sectionTitle}>Troubleshooting Email Issues</Text>
      <Text style={styles.sectionDescription}>
        Common problems and solutions for email notifications
      </Text>
      <View style={styles.sectionDivider} />

      <Text style={styles.categoryHeader}>Common Issues</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Not Receiving Emails</Text>
        <Text style={styles.infoText}>
          Check your spam/junk folder. Add no-reply@yourcompany.com to your safe senders list. 
          Verify your email address is correct in account settings. Also, ensure notifications are enabled in your preferences.
          If the issue persists, feel free to reach out.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Delayed Email Delivery</Text>
        <Text style={styles.infoText}>
          Email delivery can take 1-5 minutes depending on your email provider. Check your internet connection. 
          If delays persist beyond 30 minutes, contact support.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Password Reset Link Expired</Text>
        <Text style={styles.infoText}>
          Password reset links expire after 10 minutes for security. Request a new password reset link 
          if yours has expired. Ensure you use the most recent link if multiple requests were made. Please remember
          that you will not be able to request a new reset link until the original one has been used, or has expired.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Receiving Too Many Emails</Text>
        <Text style={styles.infoText}>
          Adjust your notification preferences in Settings → Notifications. Consider switching specific emails off if you
          wish to not recieve them going forward. Each individual email can be customised in your settings so you can stay up to date your way.
        </Text>
        <Text style={{...styles.infoText, marginTop:'10px'}}>
            All the information recieved in emails (other than password reset links and verification emails) can be found on the web application. It is possible to
            just use the application and not recieve any emails. Default settings will have all email notifications turned off.
        </Text>
      </View>

      <Text style={[styles.categoryHeader, { marginTop: 80 }]}>Getting Help</Text>

      <View style={{...styles.introSection}}>
        <Text style={styles.introTitle}>Contact Support</Text>
        <Text style={styles.introText}>
          If you continue to experience issues with email notifications after trying these solutions, 
          please contact our support team at support@yourcompany.com. Include details about the specific 
          email type and when you last received notifications.
        </Text>
      </View>

      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>Prevention Tips</Text>
        <View style={styles.tipsList}>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              Keep your email address up to date in your account settings.
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              Regularly check your spam folder and mark system emails as "not spam."
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              Test notifications after changing settings to ensure they're working correctly.
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              Review notification preferences quarterly to ensure they still match your needs.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.pageFooter}>
        <Text style={styles.footerText}>Troubleshooting Email Issues</Text>
        <Text style={styles.pageNumber}>Page 5</Text>
      </View>
    </Page>
  </Document>
)

export default EmailNotificationsGuide