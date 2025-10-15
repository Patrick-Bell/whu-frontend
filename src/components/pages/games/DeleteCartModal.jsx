import { deleteCart } from "../../routes/CartRoutes"
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
import { Trash } from "lucide-react"
import { toast } from "sonner"

const DeleteCartModal = ({ cart, setGame }) => {

  const confirmDelete = async (id) => {
    try {
      await deleteCart(id) // API call
      toast.success("Cart deleted", {
        description: `Cart ${cart?.cart_number} has been deleted.`,
      })

     setTimeout(() => {
      setGame(prev => ({
        ...prev,
        carts: prev.carts.filter(c => c.id !== id)
      }))
     })

      setGame(prevGame => ({
        ...prevGame,
        carts: prevGame.carts.filter(c => c.id !== id)
      }));

    } catch (e) {
      console.error(e)
      toast.error("Failed to delete cart")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="" className="flex items-center gap-2">
          <Trash className="w-4 h-4" /> Delete Cart
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Cart {cart?.cart_number}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete cart {cart?.cart_number}? This action <strong>CANNOT</strong> be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button onClick={() => confirmDelete(cart?.id)} type="button">
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteCartModal
