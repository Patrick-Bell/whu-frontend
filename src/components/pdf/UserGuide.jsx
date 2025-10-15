// UserGuidePDF.jsx
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

  // Section Pages
  sectionPage: {
    padding: 50,
    paddingBottom: 60,
    fontSize: 10,
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

  // Steps
  stepsContainer: {
    marginTop: 8,
  },
  stepsLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  step: {
    flexDirection: "row",
    marginBottom: 14,
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#1f2937",
    color: "white",
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 6,
    marginRight: 12,
    flexShrink: 0,
  },
  stepText: {
    flex: 1,
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.6,
    paddingTop: 3,
  },

  // Tip Box
  tipBox: {
    backgroundColor: "#fef3c7",
    borderLeft: "3pt solid #f59e0b",
    padding: 12,
    marginTop: 20,
    borderRadius: 4,
  },
  tipLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#92400e",
    marginBottom: 4,
  },
  tipText: {
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

  // Final Footer Page
  finalFooter: {
    marginTop: 60,
    paddingTop: 20,
    borderTop: "1pt solid #e5e7eb",
    textAlign: "center",
  },
  finalFooterTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#374151",
    marginBottom: 8,
  },
  finalFooterText: {
    fontSize: 9,
    color: "#6b7280",
    marginBottom: 4,
    lineHeight: 1.5,
  },
  finalFooterCopyright: {
    fontSize: 8,
    color: "#9ca3af",
    marginTop: 12,
  },
})

const guides = [
  {
    id: "addWorker",
    title: "Adding a Worker",
    description: "Step-by-step instructions to create a new worker profile in the system.",
    steps: [
      "Navigate to the 'Workers' section from the sidebar.",
      'Click on "All Workers".',
      "Click the 'Add Worker' or '+' button in the top-right corner.",
      "Enter all required information, including first and last name.",
      "Review the details to ensure accuracy.",
      "Click 'Save' or 'Create Worker' to add the worker to the system.",
    ],
  },
  {
    id: "watchWorker",
    title: "Watching a Worker",
    description: "Monitor and track a worker's performance and activity.",
    steps: [
      'Go to "Workers" > "All Workers" from the sidebar.',
      "Locate the worker you want to monitor.",
      "Click the three dots under 'Actions' next to their name.",
      'Select "Watch Worker".',
      "The worker's name will now appear in red on all pages and summaries.",
    ],
    tip: "The color change indicates the watch action was successful.",
  },
  {
    id: "addGame",
    title: "Adding a Game",
    description: "Create a new game entry in the system.",
    steps: [
      "Navigate to the 'Games' section from the sidebar.",
      'Click "All Games".',
      "Click the 'Add Game' button to open the creation form.",
      "Select the game from the dropdown menu.",
      "Game details like ID and Date will auto-populate.",
      "Click 'View' to access the game immediately after adding.",
    ],
  },
  {
    id: "addCart",
    title: "Adding a Cart",
    description: "Create a new cart and assign it to a game and worker.",
    steps: [
      "Open the desired game page.",
      "Click 'Add Cart' or the '+' icon.",
      "Assign a cart number.",
      "Assign a worker and set start and end times.",
      "Complete the form with necessary details.",
      "Click 'Save' to add the cart.",
      "Use the 'i' button for additional help or tutorials when adding a cart.",
    ],
    tip: "The 'i' button provides extra guidance for adding carts efficiently.",
  },
  {
    id: "editCart",
    title: "Editing a Cart",
    description: "Modify an existing cart, including items and customer info.",
    steps: [
      "Go to the 'Carts' section and select the cart to edit.",
      "Click the cart to open its details.",
      "Click 'Edit' to enable editing mode.",
      "Add, remove, or update items as needed.",
      "Update customer information if necessary.",
      "Click 'Save Changes' to apply the updates.",
    ],
  },
  {
    id: "viewSummary",
    title: "PDF Summary",
    description: "Download a PDF summary of a completed game.",
    steps: [
      "Ensure the game and all associated carts are created.",
      "Navigate to the 'Statistics' tab of the game page.",
      "Click 'Complete Game' and confirm.",
      "Once completed, adding carts will be disabled.",
      "A download button will appear—click to download the PDF summary.",
      "Save the PDF to your computer for reference.",
    ],
  },
  {
    id: "nextGame",
    title: "Fixtures",
    description: "Find details for upcoming fixtures.",
    steps: [
      "Go to the 'Fixtures' page via the sidebar to view the next fixture.",
      "The top of the page shows the upcoming fixture and remaining time.",
      "Alternatively, scroll through the calendar on the dashboard to see games for the month.",
    ],
  },
  {
    id: "newAccount",
    title: "Creating a Manager Account",
    description: "Step-by-step instructions to create a new manager account.",
    steps: [
      "Log in to the system first.",
      "Navigate to the 'Managers' page.",
      "Click 'Add Manager'.",
      "Fill in the required information, ensuring the email is valid and password is remembered.",
      "The new account can now be used to log in.",
      "Managers can update their password in their profile settings.",
    ],
  },
  {
    id: "managerRoles",
    title: "Manager Roles",
    description: "Understand the roles assigned to each maager in the system.",
    steps: [
      "All managers have the same role by default.",
      "Roles determine what actions a manager can perform in the system.",
      "Roles cannot be changed as of now.",
      "Plans to include 'Read Only' roles and roles that can be edited are being considered."
    ]
  },
  {
    id: "forgotPassword",
    title: "Resetting Your Password",
    description: "Recover your account if you forget your password.",
    steps: [
      "On the login page, click 'Forgot Password'.",
      "Enter your registered email address.",
      "A link will be sent, valid for 10 minutes. You cannot generate a new link until it expires.",
      "Click the link to open a page where you can set a new password.",
      "Confirm the new password. You will receive a confirmation email.",
    ],
    tip: "Choose a strong, secure password to protect your account.",
  },
  {
    id: "analyticsSummary",
    title: "Viewing Summarised Data",
    description: "Learn how to access and understand summarised data for games and workers.",
    steps: [
      "Navigate to the 'Analytics' page from the sidebar.",
      "Browse the data summaries available for games, carts, and workers.",
      "Click the 'i' button in the top right for guidance on reading and interpreting the information.",
      "Use the summaries to track performance, game statistics, and overall trends."
    ]
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Manage notifications to stay updated on system activity.",
    steps: [
      "Go to your profile or notification settings.",
      "Turn on notifications to receive weekly updates, alerts about completed games, and other important events.",
      "You will now receive timely notifications directly in your account or via email.",
      "Adjust notification settings as needed to suit your preferences."
    ]
  },
  {
    id: "needHelp",
    title: "Finding More Help",
    description: "Locate tutorials and guidance within the system.",
    steps: [
      "Look for 'Learn More' or 'Information' buttons in the top-right of each section.",
      "Click them to access tutorials and additional instructions.",
    ],
  },
]


const UserGuide = () => (
  <Document>
    {/* Cover Page */}
    <Page size="A4" style={styles.coverPage}>
      <View>
        <Text style={styles.coverTitle}>User Guide</Text>
        <Text style={styles.coverSubtitle}>Complete Step-by-Step Instructions</Text>
        <Text style={styles.coverSubtitle}>For System Management & Operations</Text>
        <View style={styles.coverDivider} />
        <Text style={styles.coverDate}>
          Last Updated: October 9 2025
        </Text>
      </View>
      <Text style={styles.coverFooter}>
        © {new Date().getFullYear()} Bandstand Merchandise Services
      </Text>
    </Page>

    {/* Table of Contents */}
    <Page size="A4" style={styles.tocPage}>
      <Text style={styles.tocTitle}>Table of Contents</Text>
      {guides.map((guide, index) => (
        <View key={guide.id} style={styles.tocItem}>
          <Text style={styles.tocItemNumber}>{(index + 1).toString().padStart(2, '0')}</Text>
          <Text style={styles.tocItemTitle}>{guide.title}</Text>
          <Text style={styles.tocItemPage}>Page {index + 3}</Text>
        </View>
      ))}
      <View style={styles.pageFooter}>
        <Text style={styles.footerText}>User Guide</Text>
        <Text style={styles.pageNumber}>Page 2</Text>
      </View>
    </Page>

    {/* Guide Sections */}
    {guides.map((guide, index) => (
      <Page key={guide.id} size="A4" style={styles.sectionPage}>
        <Text style={styles.sectionNumber}>Section {(index + 1).toString().padStart(2, '0')}</Text>
        <Text style={styles.sectionTitle}>{guide.title}</Text>
        <Text style={styles.sectionDescription}>{guide.description}</Text>
        <View style={styles.sectionDivider} />

        <View style={styles.stepsContainer}>
          <Text style={styles.stepsLabel}>Step-by-Step Instructions</Text>
          {guide.steps.map((step, stepIndex) => (
            <View key={stepIndex} style={styles.step}>
              <Text style={styles.stepNumber}>{stepIndex + 1}</Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {guide.tip && (
          <View style={styles.tipBox}>
            <Text style={styles.tipLabel}>PRO TIP</Text>
            <Text style={styles.tipText}>{guide.tip}</Text>
          </View>
        )}

        {/* Last page footer */}
        {index === guides.length - 1 && (
          <View style={styles.finalFooter}>
            <Text style={styles.finalFooterTitle}>Need Additional Help?</Text>
            <Text style={styles.finalFooterText}>
              Contact our support team at support@example.com
            </Text>
            <Text style={styles.finalFooterText}>
              Visit our help center for more resources and tutorials
            </Text>
            <Text style={styles.finalFooterCopyright}>
              © {new Date().getFullYear()} Your Company Name. All rights reserved.
            </Text>
          </View>
        )}

        <View style={styles.pageFooter}>
          <Text style={styles.footerText}>{guide.title}</Text>
          <Text style={styles.pageNumber}>Page {index + 3}</Text>
        </View>
      </Page>
    ))}
  </Document>
)

export default UserGuide