import { HelpCircle } from "lucide-react"

const Header = () => {


    return (

        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 mb-4 text-white">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-8 h-8" />
            <h1 className="text-3xl font-bold">How can we help you?</h1>
          </div>
          <p className="text-gray-300 mb-0">
            Search our knowledge base or browse guides below
          </p>
        </div>
      </div>

    )
}

export default Header