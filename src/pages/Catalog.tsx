import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Library,
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  StarOff,
  Database,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Bot,
  ArrowRight,
} from 'lucide-react'

interface CatalogItem {
  id: string
  name: string
  description: string
  source: string
  type: 'table' | 'view' | 'dataset'
  status: 'certified' | 'pending' | 'draft'
  aiScore: number
  owner: string
  lastUpdated: string
  tags: string[]
  usedByAgents: number
  starred: boolean
}

const catalogItems: CatalogItem[] = [
  {
    id: '1',
    name: 'Customer 360',
    description: 'Unified customer profile combining all touchpoints and interactions',
    source: 'Snowflake Warehouse',
    type: 'dataset',
    status: 'certified',
    aiScore: 94,
    owner: 'Data Team',
    lastUpdated: '2 hours ago',
    tags: ['customer', 'profile', 'core'],
    usedByAgents: 3,
    starred: true,
  },
  {
    id: '2',
    name: 'Sales Pipeline',
    description: 'Current and historical sales opportunities with stage tracking',
    source: 'Production PostgreSQL',
    type: 'table',
    status: 'pending',
    aiScore: 78,
    owner: 'Sales Ops',
    lastUpdated: '1 hour ago',
    tags: ['sales', 'pipeline', 'revenue'],
    usedByAgents: 1,
    starred: false,
  },
  {
    id: '3',
    name: 'Inventory Master',
    description: 'Real-time inventory levels across all warehouses',
    source: 'Production PostgreSQL',
    type: 'view',
    status: 'certified',
    aiScore: 89,
    owner: 'Supply Chain',
    lastUpdated: '30 min ago',
    tags: ['inventory', 'warehouse', 'stock'],
    usedByAgents: 2,
    starred: true,
  },
  {
    id: '4',
    name: 'Product Catalog',
    description: 'Complete product information including pricing and attributes',
    source: 'MongoDB Cluster',
    type: 'dataset',
    status: 'certified',
    aiScore: 91,
    owner: 'Product Team',
    lastUpdated: '4 hours ago',
    tags: ['product', 'catalog', 'pricing'],
    usedByAgents: 2,
    starred: false,
  },
  {
    id: '5',
    name: 'User Behavior',
    description: 'Clickstream and user interaction data from web and mobile',
    source: 'BigQuery',
    type: 'dataset',
    status: 'pending',
    aiScore: 85,
    owner: 'Analytics',
    lastUpdated: '45 min ago',
    tags: ['behavior', 'analytics', 'web'],
    usedByAgents: 0,
    starred: false,
  },
  {
    id: '6',
    name: 'Transaction History',
    description: 'Complete transaction records for financial analysis',
    source: 'Snowflake Warehouse',
    type: 'table',
    status: 'certified',
    aiScore: 96,
    owner: 'Finance',
    lastUpdated: '15 min ago',
    tags: ['transactions', 'finance', 'payments'],
    usedByAgents: 1,
    starred: true,
  },
]

export default function Catalog() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [items, setItems] = useState(catalogItems)

  const toggleStar = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, starred: !item.starred } : item
    ))
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold text-night-900">
            Data Catalog
          </h1>
          <p className="text-night-500 mt-1">
            Browse and discover certified data products
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-bao-600/20 text-bao-600'
                : 'text-night-500 hover:text-night-700'
            }`}
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-bao-600/20 text-bao-600'
                : 'text-night-500 hover:text-night-700'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-night-500" />
          <input
            type="text"
            placeholder="Search data products by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5"
          />
        </div>
        <div className="flex items-center gap-2">
          {['all', 'certified', 'pending', 'draft'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                statusFilter === status
                  ? 'bg-bao-600/20 text-bao-600 border border-bao-500/30'
                  : 'bg-gray-100/50 text-night-500 hover:text-night-700 border border-transparent'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <button className="btn-ghost">
          <Filter className="w-4 h-4" />
          More Filters
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-bao-500/20 flex items-center justify-center">
            <Library className="w-5 h-5 text-bao-600" />
          </div>
          <div>
            <p className="text-xl font-semibold text-night-900">{items.length}</p>
            <p className="text-sm text-night-500">Total Products</p>
          </div>
        </div>
        <div className="glass rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-mint-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-mint-600" />
          </div>
          <div>
            <p className="text-xl font-semibold text-night-900">
              {items.filter((i) => i.status === 'certified').length}
            </p>
            <p className="text-sm text-night-500">Certified</p>
          </div>
        </div>
        <div className="glass rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xl font-semibold text-night-900">
              {items.filter((i) => i.status === 'pending').length}
            </p>
            <p className="text-sm text-night-500">Pending Review</p>
          </div>
        </div>
        <div className="glass rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-coral-500/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-coral-600" />
          </div>
          <div>
            <p className="text-xl font-semibold text-night-900">
              {items.reduce((acc, i) => acc + i.usedByAgents, 0)}
            </p>
            <p className="text-sm text-night-500">Agent Connections</p>
          </div>
        </div>
      </div>

      {/* Catalog Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-xl p-5 card-hover cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.status === 'certified' ? 'bg-mint-500/20' :
                    item.status === 'pending' ? 'bg-amber-500/20' : 'bg-gray-100'
                  }`}>
                    <Database className={`w-5 h-5 ${
                      item.status === 'certified' ? 'text-mint-600' :
                      item.status === 'pending' ? 'text-amber-600' : 'text-night-500'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-night-900">{item.name}</h3>
                    <p className="text-xs text-night-500">{item.source}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleStar(item.id) }}
                  className="p-1 rounded text-night-500 hover:text-amber-600 transition-colors"
                >
                  {item.starred ? (
                    <Star className="w-4 h-4 fill-amber-400 text-amber-600" />
                  ) : (
                    <StarOff className="w-4 h-4" />
                  )}
                </button>
              </div>

              <p className="text-sm text-night-600 mb-3 line-clamp-2">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-gray-100/50 text-night-600 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200/50">
                <div className="flex items-center gap-3 text-xs text-night-500">
                  <CatalogStatusBadge status={item.status} />
                  <span className="flex items-center gap-1">
                    <ScoreIndicator score={item.aiScore} />
                    {item.aiScore}%
                  </span>
                </div>
                {item.usedByAgents > 0 && (
                  <span className="flex items-center gap-1 text-xs text-bao-600">
                    <Bot className="w-3 h-3" />
                    {item.usedByAgents}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className="glass rounded-xl p-4 flex items-center gap-6 card-hover cursor-pointer group"
            >
              <button
                onClick={(e) => { e.stopPropagation(); toggleStar(item.id) }}
                className="p-1 rounded text-night-500 hover:text-amber-600 transition-colors"
              >
                {item.starred ? (
                  <Star className="w-4 h-4 fill-amber-400 text-amber-600" />
                ) : (
                  <StarOff className="w-4 h-4" />
                )}
              </button>

              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                item.status === 'certified' ? 'bg-mint-500/20' :
                item.status === 'pending' ? 'bg-amber-500/20' : 'bg-gray-100'
              }`}>
                <Database className={`w-5 h-5 ${
                  item.status === 'certified' ? 'text-mint-600' :
                  item.status === 'pending' ? 'text-amber-600' : 'text-night-500'
                }`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-night-900">{item.name}</h3>
                  <CatalogStatusBadge status={item.status} />
                </div>
                <p className="text-sm text-night-500 truncate">{item.description}</p>
              </div>

              <div className="flex items-center gap-2">
                {item.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-gray-100/50 text-night-600 rounded"
                  >
                    {tag}
                  </span>
                ))}
                {item.tags.length > 2 && (
                  <span className="text-xs text-night-500">+{item.tags.length - 2}</span>
                )}
              </div>

              <div className="flex items-center gap-1 w-16">
                <ScoreIndicator score={item.aiScore} />
                <span className="text-sm font-medium text-night-700">{item.aiScore}%</span>
              </div>

              <div className="text-sm text-night-500 w-24">{item.source}</div>

              <div className="text-sm text-night-500 w-20">{item.lastUpdated}</div>

              {item.usedByAgents > 0 && (
                <span className="flex items-center gap-1 text-xs text-bao-600 w-12">
                  <Bot className="w-3 h-3" />
                  {item.usedByAgents}
                </span>
              )}

              <button className="p-2 rounded-lg text-night-500 hover:text-bao-600 hover:bg-gray-100/50 opacity-0 group-hover:opacity-100 transition-all">
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

function CatalogStatusBadge({ status }: { status: CatalogItem['status'] }) {
  const styles = {
    certified: 'bg-mint-500/20 text-mint-600',
    pending: 'bg-amber-500/20 text-amber-600',
    draft: 'bg-gray-200/50 text-night-500',
  }

  const icons = {
    certified: CheckCircle2,
    pending: Clock,
    draft: AlertTriangle,
  }

  const Icon = icons[status]

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  )
}

function ScoreIndicator({ score }: { score: number }) {
  const color = score >= 90 ? 'bg-mint-500' : score >= 80 ? 'bg-amber-500' : 'bg-coral-500'
  return <div className={`w-2 h-2 rounded-full ${color}`} />
}
