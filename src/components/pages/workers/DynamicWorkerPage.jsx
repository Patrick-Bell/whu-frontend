import React, { useEffect, useState } from "react";
import { 
  Edit, 
  MoreHorizontal,
  MessageCircle,
  FilterIcon,
  ArrowLeft,
  Download,
  AlertTriangle,

} from "lucide-react";
import { findOneWorker } from "@/components/routes/WorkerRoutes";
import { useParams } from "react-router-dom";
import WorkerCards from "./WorkerCards";
import WorkerTable from "./WorkerTable";
import WorkerOverview from "./WorkerOverview";
import WorkerChart from "./WorkerChart";
import WorkerPieChart from "./WorkerPieChart";
import WorkerBarChart from "./WorkerPieChart";
import WorkerSummary from "./WorkerSummary";
import DynamicWorkerCards from './DynamicWorkerCards';
import EditWorkerModal from "./EditWorkerModal";
import { PDFDownloadLink } from "@react-pdf/renderer";
import WorkerSummaryPDF from "@/components/pdf/WorkerSummaryPDF";
import Loader from "../../loading/Loader";
import { Separator } from "@/components/ui/separator";
import WorkerNotFound from "./WorkerNotFound";

const DynamicWorkerPage = () => {
    const { id } = useParams()
    const [worker, setWorker] = useState(null);
    const [activeTab, setActiveTab] = useState("games");
    const [loading, setLoading] = useState(true)


    const fetchData = async (id) => {
        try{
            const response = await findOneWorker(id)
            setWorker(response)
        }catch(e){
            console.log(e)
        } finally {
          setLoading(false)
        }
    }

    useEffect(() => {
        fetchData(id)
    }, [])
  

  if (loading) {
    return <Loader />
  }

  if (!worker) {
    return <WorkerNotFound />
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          <div className="block lg:flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 h-12 w-12 bg-primary rounded-full flex items-center justify-center">
                <span className={`text-lg font-bold text-primary-foreground ${worker.watching ? 'text-red-500' : ''}`}>
                {worker?.name?.[0] || ""} {worker?.last_name?.[0] || ""}
                </span>
              </div>
              <div>
                <h1 className={`text-2xl font-bold text-foreground ${worker.watching ? 'text-red-500' : ''}`}>{worker?.name} {worker?.last_name}</h1>
                <p className="text-md text-muted-foreground">Programme Seller</p>
                {worker.watching && (
                  <div className="flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  <p className="text-xs text-gray-500 font-bold">{worker.watching ? `${worker.name} is being watched.` : ''}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="block lg:flex items-center space-x-2 mt-4 lg:mt-0">
              <button onClick={() => window.location.href = '/workers'} className="inline-flex items-center px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
              <EditWorkerModal worker={worker} setWorker={setWorker} />
              <PDFDownloadLink document={<WorkerSummaryPDF workerData={worker} />}>
              <button className="inline-flex items-center px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
              </PDFDownloadLink>
            </div>
          </div>
        </div>



        <div className="border-b border-border mt-4 mb-4">
              <nav className="flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'games', label: 'Games Portfolio' },
                  { id: 'analytics', label: 'Analytics' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>




{ activeTab === "games" && (
    <>
{worker?.carts?.length > 0 ? (
  <div className="mt-4">
  <div className="flex items-center justify-between mb-4">
      <p className="font-bold">Work</p>
      <div className="flex items-center space-x-2">
            <button className="inline-flex items-center px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
  </div>
    <WorkerTable worker={worker} />
</div>
):(
  <p className="text-sm text-gray-500">{worker?.name} must work at least 1 game before seeing their previous games.</p>
)}

</>
)}

    {activeTab === "overview" && (
      <>
        <DynamicWorkerCards worker={worker} />
        <WorkerOverview worker={worker} setWorker={setWorker} />
        </>
    )}

    {activeTab === "analytics" && (
        <>
        {worker?.carts?.length > 0 ? (
          <>
           <div className="mb-4">
        <WorkerSummary worker={worker} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WorkerBarChart worker={worker} />
        <WorkerChart worker={worker} />
        </div>
          </>
        ):(
          <>
           <p className="text-sm text-gray-500">{worker?.name} must work at least 1 game before seeing anayltics.</p>
          </>
        )}
       
        </>
    )}


      </div>
    </div>
  );
};

export default DynamicWorkerPage;