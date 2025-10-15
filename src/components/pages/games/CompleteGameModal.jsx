import { markGameAsComplete } from "@/components/routes/GameRoutes"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Check } from "lucide-react"
import { toast } from "sonner"

const CompleteGameModal = ({ setGame, game }) => {
  const handleCompleteGame = async (id) => {
    try {
      const response = await markGameAsComplete(id)
      toast.success(`Game Completed`, {
        description: `${game?.name} has been marked as completed You can now view the PDF Summary.`
      })
      setGame((prev) => ({ ...prev, complete_status: true }))
      window.location.reload()
    } catch (err) {
      toast.error("Failed to complete the game.")
      console.error(err)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors">
          <Check className="w-4 h-4 mr-2" /> Complete Game
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md p-0">
        {/* Header Section */}
        <div className="px-6 py-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Complete Game?
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Separator - touches both sides */}
        <Separator className="w-full rounded-none" />

        {/* Description Section */}
        <div className="px-6 py-4 space-y-3 text-sm text-muted-foreground">
          <DialogDescription>
            Are you sure you want to complete the{" "}
            <strong>{game?.name}</strong> event? Once confirmed, this action{" "}
            <strong>CANNOT</strong> be undone.
          </DialogDescription>

          <DialogDescription>
            Once confirmed, you will be able to download a PDF summary of the
            event in the <strong>STATISTICS</strong> section.
          </DialogDescription>

          <DialogDescription>
            This event currently has <strong>{game?.carts?.length}</strong>{" "}
            carts.
          </DialogDescription>
        </div>

        {/* Separator */}
        <Separator className="w-full rounded-none" />

        {/* Footer Section */}
        <div className="px-6 py-4">
          <DialogFooter className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <DialogClose asChild>
              <Button onClick={() => handleCompleteGame(game?.id)} type="button">
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CompleteGameModal
