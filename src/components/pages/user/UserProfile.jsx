import { useEffect, useState } from "react"
import {
  User,
  Mail,
  Lock,
  Bell,
  Globe,
  Clock,
  Camera,
  Save,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Shield,
  Check,
  IdCard,
  MailIcon,
  AlertCircle,
} from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { formatDate } from "@/components/functions/Format"
import { Switch } from "@/components/ui/switch"
import { toggleNotifications, updateOneManager, updatePassword } from "@/components/routes/ManagerRoutes"
import { toast } from "sonner"
const UserProfile = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordErrors, setPasswordErrors] = useState({})
  const [errors, setErrors] = useState({})

  const [passwords, setPasswords] = useState({})

  const { user } = useAuth()
  console.log(user, 'user')
  
  const [profileData, setProfileData] = useState({})


  useEffect(() => {
    setProfileData({
      name: user?.name,
      last_name: user?.last_name,
      email: user?.email,
      role: "Manager",
      location: "London, UK",
    })

    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }, [user])

  const [notifications, setNotifications] = useState([
    {
      type: "email",
      title: "General Emails",
      description: "Receive updates and announcements about your account.",
      enabled: user?.notifications,
    },
    {
      type: "game",
      title: "Game Notifications",
      description: "Get reminders about upcoming fixtures and completed games.",
      enabled: user?.game_notifications,
    },
    {
      type: "weekly",
      title: "Summary",
      description: "Receive weekly/monthly summaries.",
      enabled: user?.weekly_notifications,
    },
  ])

  const validateForm = () => {
    const newErrors = {}

    if (profileData.name.trim() === '') newErrors.name = 'First name is required'
    if (profileData.last_name.trim() === '') newErrors.last_name = 'Last name is required'
    if (profileData.email.trim() === '') newErrors.email = 'Email is required'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }
  
  const handleSave = async (id, data) => {

    if (!validateForm()) return

    try{
      const response = await updateOneManager(id, data)
      setIsEditingProfile(false)
      toast.success('Profile Updated Successfully', {
        description: 'Your profile information has been updated.'
      })
    }catch(e){
      console.log(e)
    }
  }


  const handleUpdatePassword = async (id, passwords) => {
    try{
      const response = await updatePassword(id, passwords)
      setShowPasswordForm(false)
      toast.success('Password Changed Successfully', {
        description: 'Your password has been updated.'
      })
    }catch(e){
      const newErrors = {}
      if (e.response.data.error.includes('current')) newErrors.currentPassword = e.response.data.error
      if (e.response.data.error.includes('match')) newErrors.confirmPassword = e.response.data.error
      setPasswordErrors(newErrors)
      toast.error('Error Changing Password', {
        description: e.response.data.error
      })
      console.log(e)
    }
  }


  const handleUpdateNotifications = async (id, type, enabled) => {
    try{
      const response = await toggleNotifications(id, type, enabled)
      toast.success('Notifications Updated', {
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} notifications have been ${enabled ? 'enabled' : 'disabled'}.`
      })
    }catch(e){
      console.log(e)
      toast.error('Error Updating Notifications', {
        description: 'There was an error updating your notification preferences.'
      })
    }
  }


  return (
    <div className="space-y-4">
      {/* Profile Header */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="h-20 bg-gradient-to-br from-gray-900 to-gray-800" />
        <div className="px-6 pb-6 -mt-12">
          <div className="flex items-end justify-between mb-4">
            <div className="relative">
              <div className="w-24 h-24 bg-yellow-600 rounded-xl flex items-center justify-center text-2xl font-bold border-4 border-white shadow-lg">
                {user?.name[0]}{user?.last_name[0]}
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            {!isEditingProfile ? (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSave(user?.id, profileData)}
                  className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-1"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
            )}
          </div>
          

          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {profileData?.name} {profileData?.last_name}
            </h1>
            <p className="text-gray-600 mb-3">{profileData?.role}</p>
            <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
                <IdCard className="w-4 h-4" />
                ID: {user?.id}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {profileData?.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Last login: {formatDate(user?.last_seen)}
              </span>
            </div>
            <div className="items-center hidden lg:flex">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-xs ml-1">Online</p>
            </div>
            </div>
          </div>
        </div>
      </div>


      {/* Personal Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-gray-700" />
          <h2 className="font-bold text-gray-900">Personal Details</h2>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">First Name</label>
              <input
                type="text"
                value={profileData.name}
                disabled={!isEditingProfile}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg disabled:bg-gray-50 disabled:text-gray-600 ${errors?.name ? 'border-red-500' : ''}`}
              />
              {errors?.name && (
              <div className="flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
              <p className="text-red-500 text-xs">{errors?.name}</p>
              </div>
            )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Last Name</label>
              <input
                type="text"
                value={profileData.last_name}
                disabled={!isEditingProfile}
                onChange={(e) => setProfileData({...profileData, last_name: e.target.value})}
                className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg disabled:bg-gray-50 disabled:text-gray-600 ${errors?.last_name ? 'border-red-500' : ''}`}
              />
              {errors?.last_name && (
              <div className="flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
              <p className="text-red-500 text-xs">{errors?.last_name}</p>
              </div>
            )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
            <input
              type="email"
              value={profileData.email}
              disabled={!isEditingProfile}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg disabled:bg-gray-50 disabled:text-gray-600 ${errors?.email ? 'border-red-500' : ''}`}
              />
            {errors?.email && (
              <div className="flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
              <p className="text-red-500 text-xs">{errors?.email}</p>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Location</label>
            <input
              type="text"
              value={profileData.location}
              disabled={!isEditingProfile}
              onChange={(e) => setProfileData({...profileData, location: e.target.value})}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg disabled:bg-gray-50 disabled:text-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-gray-700" />
          <h2 className="font-bold text-gray-900">Security</h2>
        </div>

        {!showPasswordForm ? (
          <button
            onClick={() => setShowPasswordForm(true)}
            className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Change Password
          </button>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                className={`${passwordErrors.currentPassword ? 'border-red-500' : ''} w-full px-3 py-2 text-sm border border-gray-200 rounded-lg`}
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
              />
              {passwordErrors?.currentPassword && (
              <div className="flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
              <p className="text-red-500 text-xs">{passwordErrors?.currentPassword}</p>
              </div>
            )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}

              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                className={`${passwordErrors.confirmPassword ? 'border-red-500' : ''} w-full px-3 py-2 text-sm border border-gray-200 rounded-lg`}
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
              />
              {passwordErrors?.confirmPassword && (
              <div className="flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
              <p className="text-red-500 text-xs">{passwordErrors?.confirmPassword}</p>
              </div>
            )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPasswordForm(false)}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdatePassword(user?.id, passwords)}
                className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Update Password
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="space-y-2 border p-5 rounded-xl border-gray-200">
      <div className="flex items-center gap-2 mb-4">
          <MailIcon className="w-5 h-5 text-gray-700" />
          <h2 className="font-bold text-gray-900">Notifications</h2>
        </div>
        {notifications.map((notif, index) => (
          <div
            key={notif.type}
            className="flex items-center justify-between p-3"
          >
            <div>
              <h3 className="text-sm font-medium text-gray-900">{notif.title}</h3>
              <p className="text-xs text-gray-500">{notif.description}</p>
            </div>
            <Switch
                checked={notif.enabled}
                onCheckedChange={(checked) => {
                  handleUpdateNotifications(user?.id, notif?.type, checked)
                  const updated = [...notifications]
                  updated[index].enabled = checked
                  setNotifications(updated)
                }}
              />
          </div>
        ))}
      </div>


      
    </div>
  )
}

export default UserProfile