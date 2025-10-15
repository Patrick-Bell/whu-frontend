import React, { useEffect, useState } from "react";
import { 
  Edit, 
  MoreHorizontal,
  MessageCircle,
  FilterIcon,
  ArrowLeft,
  Download,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { fetchOneManager } from "../../routes/ManagerRoutes";
import ManagersTable from "./ManagersTable";
import Loader from "../../loading/Loader";
import ManagerNotFound from "./ManagerNotFound";

const DynamicManagersPage = () => {
    const { id } = useParams()
    const [manager, setManager] = useState(null);
    const [activeTab, setActiveTab] = useState("games");
    const [loading, setLoading] = useState(true)


    const fetchData = async (id) => {
        try{
            const response = await fetchOneManager(id)
            setManager(response)
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

  if (!manager) {
    return <ManagerNotFound />
  }
  
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 h-12 w-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">
                {manager?.name?.[0] || ""} {manager?.last_name?.[0] || ""}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{manager?.name} {manager?.last_name}</h1>
                <p className="text-muted-foreground">Manager</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button onClick={() => window.location.href = '/managers'} className="inline-flex items-center px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
              <button className="inline-flex items-center px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>



        <div className="border-b border-border mt-4 mb-4">
              <nav className="flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'games', label: 'Games Portfolio' },
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
{manager?.games?.length > 0 ? (
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
        <ManagersTable manager={manager} />
          
</div>
):(
  <p className="text-sm text-gray-500">{manager?.name} must work at least 1 game before seeing their previous games.</p>
)}

</>
)}

    {activeTab === "overview" && (
      <>
        </>
    )}


      </div>
    </div>
  );
};

export default DynamicManagersPage;