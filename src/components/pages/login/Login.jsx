import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, ArrowRight, GalleryVerticalEnd } from "lucide-react"
import { useAuth } from '../../context/AuthContext'
import { toast } from "sonner"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})

  const { login, user, authenticated, logout } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrors({}) // reset errors
    try{
      const response = await login(email, password)
    }catch(e){
      console.log(e.response.data.error, 'error')
      const newErrors = {}
      if (e.response.data.error.includes('email')){
        newErrors.email = 'Invalid email'
      } else if (e.response.data.error.includes('password')){
        newErrors.password = 'Invalid password'
      }
      setErrors(newErrors)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="bg-primary text-primary-foreground flex w-10 h-10 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold">Acme Inc.</span>
        </div>

        {/* Form */}
        {user ? (
           <div className="text-center space-y-3">
           <div>
             <p className="text-sm text-gray-600 mb-1">Your session is still active</p>
             <p className="text-xs text-gray-500">Logged in as {user.name}</p>
           </div>
           <Button 
             onClick={() => window.location.href = '/dashboard'} // or wherever you want to redirect
             className="w-full"
           >
             Continue as {user.name}
             <ArrowRight className="ml-2 h-4 w-4" />
           </Button>
           <Button 
             variant="ghost" 
             className="w-full text-sm"
             onClick={() => logout()}
           >
             Sign in as a different user
           </Button>
         </div>
        ):(
          <>
           <form className="space-y-6" type='submit' onSubmit={handleLogin}>
          <div>
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${errors.email ? 'border-red-500' : ''} mt-1`}
              required
            />
            {errors?.email && (
              <div className="flex items-center mt-2">
                <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
              <p className="text-red-500 text-xs">{errors?.email}</p>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${errors.password ? 'border-red-500' : ''} mt-1`}
              required
            />
            {errors?.password && (
              <div className="flex items-center mt-2">
                <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
              <p className="text-red-500 text-xs">{errors?.password}</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end">
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="#" className="text-primary hover:underline">
            Sign up
          </a>
        </p>
          </>
        )}
       
      </div>
    </div>
  )
}

export default Login
