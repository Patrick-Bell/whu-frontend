import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Database, 
  Settings, 
  Bell, 
  User, 
  Menu, 
  X, 
  Home,
  Activity,
  PieChart,
  Target,
  Calendar,
  HelpCircle,
  LogOut
} from 'lucide-react';
import AppSidebar from './components/pages/layout';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import './App.css'
import './index.css'
import { Toaster } from 'sonner';

const App = () => {

  return (

    <div className="">
      <Toaster />
    <SidebarProvider>
      <div className="flex min-h-screen w-full z-50">
        <AppSidebar />

      </div>
    </SidebarProvider>
  </div>

  )
}

export default App;