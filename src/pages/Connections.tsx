import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Database,
  Plus,
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  Settings,
  Trash2,
  ExternalLink,
  Upload,
  FileSpreadsheet,
  FileText,
  X,
  ChevronRight,
} from 'lucide-react'

interface Connection {
  id: string
  name: string
  type: 'postgresql' | 'snowflake' | 'mysql' | 'mongodb' | 'bigquery' | 's3'
  status: 'connected' | 'syncing' | 'error' | 'disconnected'
  host: string
  lastSync: string
  tables: number
  rows: string
}

const connections: Connection[] = [
  {
    id: '1',
    name: 'Production PostgreSQL',
    type: 'postgresql',
    status: 'connected',
    host: 'prod-db.company.com:5432',
    lastSync: '2 minutes ago',
    tables: 42,
    rows: '2.4M',
  },
  {
    id: '2',
    name: 'Snowflake Warehouse',
    type: 'snowflake',
    status: 'connected',
    host: 'company.snowflakecomputing.com',
    lastSync: '15 minutes ago',
    tables: 128,
    rows: '45.2M',
  },
  {
    id: '3',
    name: 'Analytics MySQL',
    type: 'mysql',
    status: 'syncing',
    host: 'analytics-db.company.com:3306',
    lastSync: 'Syncing...',
    tables: 23,
    rows: '890K',
  },
  {
    id: '4',
    name: 'Customer MongoDB',
    type: 'mongodb',
    status: 'error',
    host: 'mongo-cluster.company.com:27017',
    lastSync: '2 hours ago',
    tables: 15,
    rows: '1.2M',
  },
  {
    id: '5',
    name: 'BigQuery Data Lake',
    type: 'bigquery',
    status: 'connected',
    host: 'company-project.region.bigquery',
    lastSync: '30 minutes ago',
    tables: 89,
    rows: '120M',
  },
]

const dbIcons: Record<string, string> = {
  postgresql: '🐘',
  snowflake: '❄️',
  mysql: '🐬',
  mongodb: '🍃',
  bigquery: '📊',
  s3: '📦',
}

export default function Connections() {
  const [showNewModal, setShowNewModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const filteredConnections = connections.filter((conn) => {
    const matchesSearch = conn.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = !selectedType || conn.type === selectedType
    return matchesSearch && matchesType
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold text-night-900">
            Data Connections
          </h1>
          <p className="text-night-500 mt-1">
            Manage your database connections and file uploads
          </p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          New Connection
        </button>
      </div>

      {/* Quick Upload Cards */}
      <div className="grid grid-cols-3 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-xl p-5 text-left group hover:border-bao-500/30 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-bao-500/20 flex items-center justify-center group-hover:bg-bao-500/30 transition-colors">
              <Upload className="w-6 h-6 text-bao-600" />
            </div>
            <div>
              <h3 className="font-medium text-night-900">Upload Files</h3>
              <p className="text-sm text-night-500">CSV, XLSX, JSON, Parquet</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-xl p-5 text-left group hover:border-bao-500/30 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-mint-500/20 flex items-center justify-center group-hover:bg-mint-500/30 transition-colors">
              <FileSpreadsheet className="w-6 h-6 text-mint-600" />
            </div>
            <div>
              <h3 className="font-medium text-night-900">Context Documents</h3>
              <p className="text-sm text-night-500">PDF, DOCX, TXT</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-xl p-5 text-left group hover:border-bao-500/30 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
              <FileText className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-medium text-night-900">API Integration</h3>
              <p className="text-sm text-night-500">REST, GraphQL endpoints</p>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-night-500" />
          <input
            type="text"
            placeholder="Search connections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5"
          />
        </div>
        <div className="flex items-center gap-2">
          {['postgresql', 'snowflake', 'mysql', 'mongodb', 'bigquery'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(selectedType === type ? null : type)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedType === type
                  ? 'bg-bao-600/20 text-bao-600 border border-bao-500/30'
                  : 'bg-gray-100/50 text-night-500 hover:text-night-700 border border-transparent'
              }`}
            >
              {dbIcons[type]} {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <button className="btn-ghost">
          <Filter className="w-4 h-4" />
          More Filters
        </button>
      </div>

      {/* Connections List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredConnections.map((connection, index) => (
            <motion.div
              key={connection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-xl p-5 card-hover"
            >
              <div className="flex items-center gap-5">
                {/* DB Icon */}
                <div className="w-14 h-14 rounded-xl bg-gray-100/50 flex items-center justify-center text-2xl">
                  {dbIcons[connection.type]}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium text-night-900">{connection.name}</h3>
                    <StatusBadge status={connection.status} />
                  </div>
                  <p className="text-sm text-night-500 mt-1 font-mono">{connection.host}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-night-900">{connection.tables}</p>
                    <p className="text-xs text-night-500">Tables</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-night-900">{connection.rows}</p>
                    <p className="text-xs text-night-500">Rows</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-night-600">{connection.lastSync}</p>
                    <p className="text-xs text-night-500">Last Sync</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg text-night-500 hover:text-night-700 hover:bg-gray-100/50 transition-colors">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg text-night-500 hover:text-night-700 hover:bg-gray-100/50 transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg text-night-500 hover:text-night-700 hover:bg-gray-100/50 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* New Connection Modal */}
      <AnimatePresence>
        {showNewModal && (
          <NewConnectionModal onClose={() => setShowNewModal(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

function StatusBadge({ status }: { status: Connection['status'] }) {
  const styles = {
    connected: 'bg-mint-500/20 text-mint-600 border-mint-500/30',
    syncing: 'bg-bao-500/20 text-bao-600 border-bao-500/30',
    error: 'bg-coral-500/20 text-coral-600 border-coral-500/30',
    disconnected: 'bg-gray-200/50 text-night-500 border-night-600/30',
  }

  const icons = {
    connected: CheckCircle2,
    syncing: RefreshCw,
    error: AlertCircle,
    disconnected: Clock,
  }

  const Icon = icons[status]

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      <Icon className={`w-3 h-3 ${status === 'syncing' ? 'animate-spin' : ''}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

function NewConnectionModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [selectedDb, setSelectedDb] = useState<string | null>(null)

  const databases = [
    { id: 'postgresql', name: 'PostgreSQL', icon: '🐘', desc: 'Relational database' },
    { id: 'snowflake', name: 'Snowflake', icon: '❄️', desc: 'Cloud data warehouse' },
    { id: 'mysql', name: 'MySQL', icon: '🐬', desc: 'Relational database' },
    { id: 'mongodb', name: 'MongoDB', icon: '🍃', desc: 'Document database' },
    { id: 'bigquery', name: 'BigQuery', icon: '📊', desc: 'Google analytics warehouse' },
    { id: 'redshift', name: 'Redshift', icon: '🔴', desc: 'AWS data warehouse' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-50/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-2xl glass rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          <div>
            <h2 className="text-xl font-semibold text-night-900">New Connection</h2>
            <p className="text-sm text-night-500 mt-1">Step {step} of 3</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-night-500 hover:text-night-700 hover:bg-gray-100/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-night-600">Select your data source type:</p>
              <div className="grid grid-cols-3 gap-3">
                {databases.map((db) => (
                  <button
                    key={db.id}
                    onClick={() => setSelectedDb(db.id)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      selectedDb === db.id
                        ? 'bg-bao-600/20 border-2 border-bao-500/50'
                        : 'bg-gray-100/30 border-2 border-transparent hover:border-gray-200'
                    }`}
                  >
                    <span className="text-2xl">{db.icon}</span>
                    <h4 className="mt-2 font-medium text-night-900">{db.name}</h4>
                    <p className="text-xs text-night-500">{db.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-night-600 mb-2">
                  Connection Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Production Database"
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-night-600 mb-2">
                    Host
                  </label>
                  <input type="text" placeholder="localhost" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-night-600 mb-2">
                    Port
                  </label>
                  <input type="text" placeholder="5432" className="w-full" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-night-600 mb-2">
                  Database
                </label>
                <input type="text" placeholder="my_database" className="w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-night-600 mb-2">
                    Username
                  </label>
                  <input type="text" placeholder="postgres" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-night-600 mb-2">
                    Password
                  </label>
                  <input type="password" placeholder="••••••••" className="w-full" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-mint-500/10 border border-mint-500/20">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-mint-600" />
                  <div>
                    <p className="font-medium text-mint-600">Connection Successful</p>
                    <p className="text-sm text-night-500">
                      Found 42 tables with 2.4M total rows
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-night-600 mb-2">
                  Security Protocol
                </label>
                <select className="w-full">
                  <option>SSL/TLS Required</option>
                  <option>SSL/TLS Preferred</option>
                  <option>None (Not recommended)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-night-600 mb-2">
                  Sync Schedule
                </label>
                <select className="w-full">
                  <option>Every 5 minutes</option>
                  <option>Every 15 minutes</option>
                  <option>Every hour</option>
                  <option>Daily</option>
                  <option>Manual only</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200/50 bg-white/20">
          <button
            onClick={() => step > 1 && setStep(step - 1)}
            className={`btn-ghost ${step === 1 ? 'invisible' : ''}`}
          >
            Back
          </button>
          <button
            onClick={() => (step < 3 ? setStep(step + 1) : onClose())}
            disabled={step === 1 && !selectedDb}
            className="btn-primary disabled:opacity-50"
          >
            {step === 3 ? 'Create Connection' : 'Continue'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
