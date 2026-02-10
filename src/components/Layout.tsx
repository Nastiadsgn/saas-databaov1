import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Database,
  FlaskConical,
  Layers3,
  Bot,
  Activity,
  Library,
  Bell,
  Search,
  ChevronDown,
  Sparkles,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Connections', href: '/connections', icon: Database },
  { name: 'Evaluation', href: '/evaluation', icon: FlaskConical },
  { name: 'Semantic Layer', href: '/semantic', icon: Layers3 },
  { name: 'Agent Factory', href: '/agents', icon: Bot },
  { name: 'Monitoring', href: '/monitoring', icon: Activity },
  { name: 'Data Catalog', href: '/catalog', icon: Library },
]

export default function Layout() {
  const location = useLocation()

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col border-r border-gray-200/50 bg-gray-50">
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-200/50">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-bao-500 to-bao-700 flex items-center justify-center glow-blue">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-display font-semibold text-night-900 tracking-tight">
            Databao
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-bao-600/20 text-bao-600 border border-bao-500/30'
                    : 'text-night-500 hover:text-night-700 hover:bg-gray-100/50'
                }`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.name}</span>
              {item.name === 'Agent Factory' && (
                <span className="ml-auto px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-mint-500/20 text-mint-600 rounded">
                  New
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-gray-200/50">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100/50 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-bao-400 to-mint-500 flex items-center justify-center text-sm font-semibold text-night-900">
              DS
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-night-700">Data Steward</p>
              <p className="text-xs text-night-500">Enterprise Plan</p>
            </div>
            <ChevronDown className="w-4 h-4 text-night-500" />
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200/50 bg-gray-50/80 backdrop-blur-sm">
          {/* Search */}
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-night-500" />
            <input
              type="text"
              placeholder="Search data products, agents, connections..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white/50 border border-gray-200 rounded-lg placeholder-night-500 focus:border-bao-500/50 focus:ring-1 focus:ring-bao-500/20"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-night-500 bg-gray-100 rounded">
              ⌘K
            </kbd>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg text-night-500 hover:text-night-700 hover:bg-gray-100/50 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-coral-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto mesh-bg grid-pattern">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
