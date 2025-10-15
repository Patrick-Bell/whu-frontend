// KeyboardShortcutsPDF.jsx
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

  // Content Page
  contentPage: {
    padding: 50,
    paddingBottom: 60,
  },
  pageTitle: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 30,
    lineHeight: 1.5,
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
  tableColCommand: {
    width: "25%",
    padding: 10,
  },
  tableColShortcut: {
    width: "25%",
    padding: 10,
  },
  tableColPage: {
    width: "20%",
    padding: 10,
  },
  tableColAction: {
    width: "30%",
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
  },
  tableCellAction: {
    fontSize: 9,
    color: "#6b7280",
    lineHeight: 1.4,
  },

  // Keyboard Key Styles
  kbdGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  kbd: {
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 3,
    fontSize: 8,
    fontFamily: "Courier",
    color: "#111827",
    marginRight: 3,
  },
  kbdPlus: {
    fontSize: 8,
    color: "#9ca3af",
    marginHorizontal: 2,
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
})

const shortcuts = [
  { 
    category: "Navigation",
    items: [
      { command: "Quick Search", keys: ["cmd", "k"], page: "Any Page", action: "Open quick search dialog to find anything quickly" },
      { command: "Toggle Sidebar", keys: ["cmd", "b"], page: "Any Page", action: "Show or hide the navigation sidebar" },
      { command: "My Account", keys: ["cmd", "r"], page: "Any Page", action: "To return to the 'My Account' section" },
    ]
  },
  { 
    category: "Creating Content",
    items: [
      { command: "New Worker", keys: ["cmd", "o"], page: "Workers Page", action: "Open the add worker modal to create a new worker profile" },
      { command: "New Game", keys: ["cmd", "o"], page: "Games Page", action: "Open the add game modal to create a new game" },
      { command: "New Cart", keys: ["cmd", "o"], page: "Games Page", action: "Open the add cart modal to create a new cart" },
    ]
  },
  { 
    category: "General Actions",
    items: [
      { command: "Close Modal", keys: ["Esc"], page: "Any Modal", action: "Close the currently open modal or dialog window" },
      { command: "Help", keys: ["cmd", "h"], page: "Any Page", action: "Open tutorials specific to the page OR how to use the application" },
    ]
  },
]

const KeyboardShortcutsGuide = () => (
  <Document>
    {/* Cover Page */}
    <Page size="A4" style={styles.coverPage}>
      <View>
        <Text style={styles.coverTitle}>Keyboard Shortcuts</Text>
        <Text style={styles.coverSubtitle}>Quick Reference Guide</Text>
        <Text style={styles.coverSubtitle}>Boost Your Productivity</Text>
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

    {/* Content Page */}
    <Page size="A4" style={styles.contentPage}>
      <Text style={styles.pageTitle}>Keyboard Shortcuts Reference</Text>
      <Text style={styles.pageSubtitle}>
        Master these keyboard shortcuts to navigate the system faster and work more efficiently.
      </Text>

      {/* Introduction */}
      <View style={styles.introSection}>
        <Text style={styles.introTitle}>About This Guide</Text>
        <Text style={styles.introText}>
          Keyboard shortcuts allow you to perform common actions without using your mouse. 
          "cmd" represents the Command key on Mac or Ctrl key on Windows/Linux. 
          There are currently <strong>8</strong> keyboard shortcuts specific to this web application.
          Press the keys simultaneously to execute the command.
        </Text>
      </View>

      {/* Shortcuts by Category */}
      {shortcuts.map((category, catIndex) => (
        <View key={catIndex}>
          <Text style={styles.categoryHeader}>{category.category}</Text>
          
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <View style={styles.tableColCommand}>
                <Text style={styles.tableHeaderText}>Command</Text>
              </View>
              <View style={styles.tableColShortcut}>
                <Text style={styles.tableHeaderText}>Shortcut</Text>
              </View>
              <View style={styles.tableColPage}>
                <Text style={styles.tableHeaderText}>Page</Text>
              </View>
              <View style={styles.tableColAction}>
                <Text style={styles.tableHeaderText}>Action</Text>
              </View>
            </View>

            {/* Table Rows */}
            {category.items.map((shortcut, index) => (
              <View 
                key={index} 
                style={index === category.items.length - 1 ? styles.tableRowLast : styles.tableRow}
              >
                <View style={styles.tableColCommand}>
                  <Text style={styles.tableCellText}>{shortcut.command}</Text>
                </View>
                <View style={styles.tableColShortcut}>
                  <View style={styles.kbdGroup}>
                    {shortcut.keys.map((key, i) => (
                      <View key={i} style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={styles.kbd}>{key}</Text>
                        {i < shortcut.keys.length - 1 && <Text style={styles.kbdPlus}>+</Text>}
                      </View>
                    ))}
                  </View>
                </View>
                <View style={styles.tableColPage}>
                  <Text style={styles.tableCellText}>{shortcut.page}</Text>
                </View>
                <View style={styles.tableColAction}>
                  <Text style={styles.tableCellAction}>{shortcut.action}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Tips Section */}
      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>💡 Pro Tips</Text>
        <View style={styles.tipsList}>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              Practice shortcuts regularly to build muscle memory and increase your speed.
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              On Windows and Linux, use Ctrl instead of Cmd (Command) for all shortcuts.
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              You can press Esc to close any modal or dialog quickly without clicking.
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              Use Cmd+K (Quick Search) as your starting point to find anything in the system.
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.pageFooter}>
        <Text style={styles.footerText}>Keyboard Shortcuts Reference</Text>
        <Text style={styles.pageNumber}>Page 2</Text>
      </View>
    </Page>

    {/* Additional Page - Platform Differences */}
    <Page size="A4" style={styles.contentPage}>
      <Text style={styles.pageTitle}>Platform-Specific Keys</Text>
      <Text style={styles.pageSubtitle}>
        Understanding key differences between operating systems.
      </Text>

      <View style={styles.categoryHeader}>
        <Text>Key Symbol Reference</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <View style={[styles.tableColCommand, { width: "20%" }]}>
            <Text style={styles.tableHeaderText}>Symbol</Text>
          </View>
          <View style={[styles.tableColShortcut, { width: "30%" }]}>
            <Text style={styles.tableHeaderText}>Mac Key</Text>
          </View>
          <View style={[styles.tableColPage, { width: "30%" }]}>
            <Text style={styles.tableHeaderText}>Windows/Linux</Text>
          </View>
          <View style={[styles.tableColAction, { width: "20%" }]}>
            <Text style={styles.tableHeaderText}>Common Use</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableColCommand, { width: "20%" }]}>
            <Text style={styles.kbd}>Cmd</Text>
          </View>
          <View style={[styles.tableColShortcut, { width: "30%" }]}>
            <Text style={styles.tableCellText}>Command (Cmd)</Text>
          </View>
          <View style={[styles.tableColPage, { width: "30%" }]}>
            <Text style={styles.tableCellText}>Control (Ctrl)</Text>
          </View>
          <View style={[styles.tableColAction, { width: "20%" }]}>
            <Text style={styles.tableCellAction}>Primary modifier</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableColCommand, { width: "20%" }]}>
            <Text style={styles.kbd}>Alt</Text>
          </View>
          <View style={[styles.tableColShortcut, { width: "30%" }]}>
            <Text style={styles.tableCellText}>Option (Alt)</Text>
          </View>
          <View style={[styles.tableColPage, { width: "30%" }]}>
            <Text style={styles.tableCellText}>Alt</Text>
          </View>
          <View style={[styles.tableColAction, { width: "20%" }]}>
            <Text style={styles.tableCellAction}>Alternative actions</Text>
          </View>
        </View>

        <View style={styles.tableRowLast}>
          <View style={[styles.tableColCommand, { width: "20%" }]}>
            <Text style={styles.kbd}>Esc</Text>
          </View>
          <View style={[styles.tableColShortcut, { width: "30%" }]}>
            <Text style={styles.tableCellText}>Escape</Text>
          </View>
          <View style={[styles.tableColPage, { width: "30%" }]}>
            <Text style={styles.tableCellText}>Escape</Text>
          </View>
          <View style={[styles.tableColAction, { width: "20%" }]}>
            <Text style={styles.tableCellAction}>Cancel/Close</Text>
          </View>
        </View>
      </View>

      <View style={[styles.introSection, { marginTop: 30 }]}>
        <Text style={styles.introTitle}>Need Help?</Text>
        <Text style={styles.introText}>
          If you need assistance or have questions about keyboard shortcuts, please contact our support team at support@example.com or visit our help center.
        </Text>
      </View>

      <View style={styles.pageFooter}>
        <Text style={styles.footerText}>Platform-Specific Keys</Text>
        <Text style={styles.pageNumber}>Page 3</Text>
      </View>
    </Page>
  </Document>
)

export default KeyboardShortcutsGuide