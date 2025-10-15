import { formatCurrency } from "@/components/functions/Format";

const WorkerSummary = ({ worker }) => {
    if (!worker) return null;
  
    const carts = worker.carts || [];
    const totalCarts = carts.length;
    const totalRevenue = carts.reduce((sum, c) => sum + (c.total_value || 0), 0);
    const totalWorkerValue = carts.reduce((sum, c) => sum + (c.worker_total || 0), 0);
    const averagePerformance =
      totalCarts > 0 ? ((totalWorkerValue / totalRevenue) * 100).toFixed(1) : null;
  
    // Punctuality insights (late count)
    let lateCount = 0;
    carts.forEach((cart) => {
      cart.cart_workers?.forEach((cw) => {
        if (cw.worker_id === worker.id && cw.time_message?.toLowerCase().includes("late")) {
          lateCount++;
        }
      });
    });
  
    // Build the "AI style" summary
    const summary = `
      ${worker.name} has worked on ${totalCarts} game${totalCarts !== 1 ? "s" : ""},
      generating a total expected value of ${formatCurrency(totalRevenue)} and achieving
      ${formatCurrency(totalWorkerValue)} in sales (${averagePerformance}% of target).
      ${lateCount > 0 ? `${worker.name} has been late ${lateCount} time${lateCount > 1 ? "s" : ""}.` : `${worker.name} has shown excellent punctuality.`}
      Overall, their performance indicates ${averagePerformance >= 100 ? "strong" : "steady"} results,
      with room for ${averagePerformance < 100 ? "slight improvement" : "continued consistency"}.
    `;
  
    return (
      <div className="border border-gray-200 p-4 rounded-lg">
        <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
      </div>
    );
  };
  
  export default WorkerSummary;
  