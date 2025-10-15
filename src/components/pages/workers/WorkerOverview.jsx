import { Edit, Plus } from "lucide-react"
import EditWorkerModal from "./EditWorkerModal"

const WorkerOverview = ({ worker, setWorker }) => {

  const calculateLateness = (carts, workerId) => {
    if (!carts || carts.length === 0) return 0;
  
    let count = 0;
  
    carts.forEach(cart => {
      cart.cart_workers.forEach(cw => {
        if (cw.worker_id === workerId && cw.time_message?.includes("Late")) {
          count += 1;
        }
      });
    });
  
    return count;
  };
  


  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      
      {/* Personal Information Card */}
      <div className="border p-4 rounded-lg flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="font-bold">Personal Information</p>
          <EditWorkerModal worker={worker} setWorker={setWorker} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="font-medium text-sm">First Name:</span>
            <span className="font-medium text-sm">{worker?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-sm">Last Name:</span>
            <span className="font-medium text-sm">{worker?.last_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-sm">Joined:</span>
            <span className="font-medium text-sm">{worker?.joined || <span>-</span>}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-sm">Address:</span>
            <span className="font-medium text-sm">{worker?.address ||<span>-</span>}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-sm">Phone:</span>
            <span className="font-medium text-sm">{worker?.phone_number || <span>-</span>}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-sm">Email:</span>
            <span className="font-medium text-sm">{worker?.email || <span>-</span>}</span>
          </div>
        </div>
      </div>

      {/* Work Information Card */}
      <div className="border p-4 rounded-lg flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="font-bold">Work Information</p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="font-medium text-sm">Shifts:</span>
            <span className="font-medium text-sm">{worker?.carts?.length || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-sm">Programmes Sold:</span>
            <span className="font-medium text-sm">{worker?.carts.reduce((acc, cart) => acc + cart.sold, 0) || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-sm">Lateness:</span>
            <span className="font-medium text-sm">{calculateLateness(worker?.carts, worker?.id) || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-sm">Watched:</span>
            <span className="font-medium text-sm">{worker?.watching === true ? 'Yes' : 'No' || "N/A"}</span>
          </div>
         
        </div>
      </div>

    </div>
  )
}

export default WorkerOverview

