import { Zap, ChevronRight, Sparkles, Bug, TrendingUp, File, Search } from "lucide-react"

const WhatsNewSection = () => {
  const recentUpdates = [
    {
      version: "v2.4.0",
      date: "Oct 5, 2025",
      type: "latest",
      changes: [
        { text: "New powerful search feature", icon: Search, color: "text-blue-600" },
        { text: "New User Guides", icon: File, color: "text-purple-600" },
        { text: "Performance optimisations", icon: Zap, color: "text-yellow-600" },
        { text: "Bug fixes and stability improvements", icon: Bug, color: "text-green-600" },
      ],
      highlights: "Enhanced user experience with faster load times and intuitive navigation",
    },
  ]

  const update = recentUpdates[0]

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-50 rounded-2xl border border-yellow-200 p-6 shadow-sm mt-4">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="font-bold text-gray-900">What's New</h2>
          </div>
          <p className="text-sm text-gray-600">Stay updated with the latest features and improvements</p>
        </div>
      </div>

      <div className="space-y-4">
      

        {/* Changes List */}
        <div className="bg-white rounded-xl p-5 border border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-gray-900">Key Changes</h4>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {update.date}
            </span>
          </div>
          <ul className="space-y-3">
            {update.changes.map((change, index) => {
              const Icon = change.icon
              return (
                <li key={index} className="flex items-start gap-3 group">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gray-100 transition-colors">
                    <Icon className={`w-4 h-4 ${change.color}`} />
                  </div>
                  <span className="text-sm text-gray-700 leading-relaxed pt-1">{change.text}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default WhatsNewSection
