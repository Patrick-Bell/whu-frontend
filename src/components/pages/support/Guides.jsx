import { useState } from "react"
import { UserPlus, Eye, Gamepad2, ShoppingCart, Edit3, HelpCircleIcon, ChevronUp, ChevronDown, PanelLeftDashed } from "lucide-react"

const Guides = () => {
    const [openSection, setOpenSection] = useState(null)


    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index)
      }
   
    const guides = [
        {
          icon: UserPlus,
          title: "Adding a Worker",
          description: "Create a new worker profile in the system",
          steps: [
            "Navigate to the Workers section from the sidebar",
            'Click on "All Workers"',
            "Click the 'Add Worker' or '+' button in the top right corner",
            "Fill in the required information including name and last name",
            "Review the information for accuracy",
            "Click 'Save' or 'Create Worker' to add them to the system",
          ],
        },
        {
          icon: Eye,
          title: "Watching a Worker",
          description: "Monitor and track a worker's performance levels",
          steps: [
            'Go to the Workers directory by clicking "Workers" on the sidebar and then "All Workers"',
            "Navigate to the worker you wish to watch on the table",
            "Under Actions, click the 3 dots in line with the chosen worker",
            'Click "Watch Worker" ',
            "The workers name will now appear red on all pages and summaries",
          ],
        },
        {
          icon: Gamepad2,
          title: "Adding a Game",
          description: "Create a new game profile to the system ",
          steps: [
            "Access the Games section from the sidebar on the left side",
            'Click "All Games"',
            "Click the 'Add Game' button on the right side to open the creation form",
            "Choose the game from the dropdown list",
            "Details such as Game ID and Date will be automatically filled out",
            "You can access the game instantly by clicking 'View' in the bottom right corner once the game has been added",
          ],
        },
        {
          icon: ShoppingCart,
          title: "Adding a Cart",
          description: "Create a new cart",
          steps: [
            "Navigate to the Game you want to add a cart to",
            "Click 'Add Cart' or the '+' icon",
            "Assign a number to the cart",
            "Assign a worker to the cart and fill out the start and finish time",
            "Fill out the form",
            "Click 'Save' to add the cart",
            "To find out more on how to add a cart, click the 'i' button on the top right corner once the modal is open"
          ],
        },
        {
          icon: Edit3,
          title: "Editing a Cart",
          description: "Modify an existing cart's contents",
          steps: [
            "Go to the Carts section and find the cart you want to edit",
            "Click on the cart to open its details page",
            "Use the 'Edit' button to enable editing mode",
            "Add new items, remove existing ones, or update quantities",
            "Modify customer information if needed",
            "Apply any discount codes or promotional offers",
            "Click 'Save Changes' to update the cart",
          ],
        },
        {
          icon: HelpCircleIcon,
          title: "Need More Help?",
          description: "How to find more help",
          steps: [
            "Look out for 'Learn More' buttons or 'Information' buttons. They are typically located on the top right.",
            "Clicking these will provide you a tutorial on how to use certain features."
          ],
        }
      ]


    return (
        
        <div className="border border-gray-200 p-6 rounded-xl">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2 mb-4">
            <PanelLeftDashed />
            <p className="font-bold text-gray-900">Step by Step Guides</p>
            </div>
            <span className="text-sm text-gray-500">{guides.length} guides</span>
          </div>
  
        {/* Guides */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {guides.map((guide, index) => {
            const Icon = guide.icon
            const isOpen = openSection === index
  
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 transition-all duration-300"
              >
                {/* Header */}
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 hover:rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{guide.title}</h3>
                      <p className="text-sm text-gray-600">{guide.description}</p>
                    </div>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
  
                {/* Content */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-[600px]" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-6 border-t border-gray-100 bg-gray-50/60">
                    <h4 className="text-sm font-semibold text-gray-900 pt-5 mb-4">
                      Follow these steps:
                    </h4>
                    <ol className="space-y-3">
                      {guide.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex gap-4 items-start">
                        <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-900 text-white text-sm font-semibold mt-1">
                          {stepIndex + 1}
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                      </li>
                      
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        </div>

    )
}

export default Guides