import { Download, FileText } from "lucide-react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import UserGuide from "../../pdf/UserGuide"
import EmailNotificationsGuide from "../../pdf/EmailNotificationsGuide"
import KeyboardShortcutsPDF from "../../pdf/KeyboardShortCutPDF"

const DownloadGuides = () => {

    const downloadableResources = [
        { name: "User Manual", size: "26.5 KB", icon: FileText, document: <UserGuide />, filename: 'User-Guide' },
        { name: "Email Reference Guide", size: "19.7 KB", icon: FileText, document: <EmailNotificationsGuide />, filename: 'Email-Guide'},
        { name: "Keyboard Shortcuts Guide", size: "12.7 KB", icon: FileText, document: <KeyboardShortcutsPDF />, filename: 'Keyboard-Shortcuts'},
      ]

    return (

        <div className="bg-white rounded-xl border border-gray-200 p-6 mt-4">
        <div className="flex items-center gap-2 mb-4">
          <Download className="w-5 h-5 text-gray-700" />
          <h2 className="font-bold text-gray-900">Downloadable Resources</h2>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {downloadableResources.map((resource, index) => (
            <PDFDownloadLink document={resource.document} fileName={resource.filename} className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all text-left group">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center transition-colors group-hover:bg-gray-900">
                <FileText className="w-5 h-5 text-gray-700 group-hover:text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{resource.name}</p>
                <p className="text-xs text-gray-500">{resource.size}</p>
              </div>
              <Download className="w-4 h-4 text-gray-400 group-hover:text-gray-900" />
            </PDFDownloadLink>
          ))}
        </div>
      </div>

    )
}

export default DownloadGuides