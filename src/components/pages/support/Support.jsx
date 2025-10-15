import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  UserPlus,
  Eye,
  Gamepad2,
  ShoppingCart,
  Edit3,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Home,
  Search,
  MessageCircle,
  Mail,
  Book,
  Video,
  HelpCircleIcon,
  Download,
  FileText,
  Zap,
} from "lucide-react"
import KeyboardShortcutsTable from "./KeyboardShortcutsTable"
import WhatsNewSection from "./WhatsNew"
import UserGuide from "../../pdf/UserGuide"
import { PDFDownloadLink } from "@react-pdf/renderer"
import KeyboardShortcutsPDF from "@/components/pdf/KeyboardShortCutPDF"
import EmailNotificationsGuide from "@/components/pdf/EmailNotificationsGuide"
import Header from "./Header"
import HelpOptions from "./HelpOptions"
import Guides from "./Guides"
import DownloadGuides from "./DownloadGuides"

const Support = () => {

  return (
    <div>

      <Header/>


      <HelpOptions />


       <Guides />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <DownloadGuides />


      <WhatsNewSection />
      </div>

      <KeyboardShortcutsTable />


    </div>
  )
}

export default Support
