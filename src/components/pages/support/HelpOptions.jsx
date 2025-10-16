import { MessageCircle, Mail, Book, Video } from "lucide-react"

const HelpOptions = () => {

    const quickActions = [
        {
          icon: MessageCircle,
          title: "Live Feedback",
          description: "Built in Validation",
          color: "bg-yellow-50 text-yellow-600",
        },
        {
          icon: Mail,
          title: "Email Support",
          description: "24/7 email support",
          color: "bg-yellow-50 text-yellow-600",
        },
        {
          icon: Book,
          title: "Documentation",
          description: "Browse full docs",
          color: "bg-yellow-50 text-yellow-600",
        },
        {
          icon: Video,
          title: "Tutorials",
          description: "Watch & learn",
          color: "bg-yellow-50 text-yellow-600",
        },
      ]


    return (

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon
          return (
            <button
              key={index}
              className="bg-white p-5 rounded-xl border border-gray-200 transition-all text-left group"
            >
              <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          )
        })}
      </div>


    )
}

export default HelpOptions