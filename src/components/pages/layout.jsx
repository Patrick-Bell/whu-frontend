import { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "react-router-dom"
import AppSidebar from "../sidebar/AppSidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Routes, Route } from "react-router-dom"
import DashboardPage from "../dashboard/DashboardPage"
import WorkersPage from "./workers/WorkerPage"
import DynamicWorkerPage from "./workers/DynamicWorkerPage"
import GamesPage from "./games/GamesPage"
import DynamicGamesPage from "./games/DynamicGamesPage"
import FixturePage from "./fixtures/FixturePage"
import AnalyticsPage from "../analytics/AnalyticsPage"
import ManagerPage from "./managers/ManagerPage"
import DynamicManagersPage from "./managers/DynamicManagerPage"
import PageNotFound from "../loading/PageNotFound"
import Support from "./support/Support"
import SearchBox from "../sidebar/SearchBox"
import { useHotkeys } from "react-hotkeys-hook"
import UserProfile from '../pages/user/UserProfile'
import Login from "./login/Login"
import ProtectedRoute from "../context/ProtectedRoute"
import { useAuth } from "../context/AuthContext"

const Page = () => {
  const location = useLocation()
  const [section, setSection] = useState("Dashboard")
  const isLoginPage = location.pathname === "/"

  const { authenticated, loading } = useAuth()

  useEffect(() => {
    console.log('authenticated:', authenticated); 
  }, [authenticated])

  // Map routes to section names
  useEffect(() => {
    const path = location.pathname

    switch (true) {
      case path === "/dashboard":
        setSection("Dashboard")
        break
      case path === "/workers":
        setSection("Workers")
        break
      case path.startsWith("/workers/"):
        setSection("Worker Details")
        break
      case path === "/games":
        setSection("Games")
        break
      case path.startsWith("/games/"):
        setSection("Game Details")
        break
      case path === "/fixtures":
        setSection("Fixtures")
        break
      case path === "/analytics":
        setSection("Analytics")
        break
      case path === "/managers":
        setSection("Managers")
        break
      case path === '/support':
        setSection("Support")
        break
      case path === '/account':
        setSection('Account');
        break
      case path.startsWith("/managers/"):
        setSection("Manager Details")
        break
      default:
        setSection("Bandstand Merchandise Services")
    }
  }, [location.pathname])

  useEffect(() => {
    document.title = `${section} | Bandstand Merchandise Services`
  }, [section])



  useHotkeys("ctrl+r, meta+r", (e) => {
    e.preventDefault()
    window.location.href = '/account'
  },
)

  return (
    <>
    <Helmet>
        <meta name="description" content={`View the ${section} section`} />
      </Helmet>


    {!isLoginPage ? (
      <SidebarProvider>
      
      <AppSidebar />

      <SidebarInset>
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between px-4 bg-white/80 backdrop-blur-sm border-b">
      {/* Left side: sidebar trigger + breadcrumb */}
          <div className="flex items-center gap-3">
            <SidebarTrigger className="ml-1" />
            <Separator orientation="vertical" className="h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='dashboard'>
                    Bandstand Merchandise Services
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{section}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Right side: Search in corner */}
          <div className="flex items-center">
            <SearchBox />
          </div>
        </header>


        <div className="flex-1 p-6 w-full">
            <ProtectedRoute authenticated={authenticated}>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/workers" element={<WorkersPage />} />
            <Route path="/workers/:id" element={<DynamicWorkerPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/games/:id" element={<DynamicGamesPage />} />
            <Route path="/fixtures" element={<FixturePage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/managers" element={<ManagerPage />} />
            <Route path="/managers/:id" element={<DynamicManagersPage />} />
            <Route path="/support" element={<Support />} />
            <Route path="/account" element={<UserProfile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
            </ProtectedRoute>
        </div>
      </SidebarInset>
    </SidebarProvider>
    ):(
      <>
      <div className="w-full">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
        </>
    )}
    
    </>
  )
}

export default Page
