import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Search,
  Plus,
  Copy,
  Check,
  Database,
  Bot,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Terminal,
  FileJson,
  Zap,
  MoreHorizontal,
  X,
  BarChart3,
  AlertTriangle,
  ArrowRight,
  Table,
  ShieldCheck,
  FileWarning,
  Layers,
  Shield,
  Rocket,
  Github,
  Cloud,
  Server,
  Eye,
  MessageSquare,
  Calculator,
  Globe,
  FileSearch,
  BrainCircuit,
  Cpu,
  ArrowLeft,
  Upload,
  FolderGit2,
  FileSpreadsheet,
  Link,
  Loader2,
  Hash,
  Type,
  Calendar,
  ToggleLeft,
  ScanSearch,
  Wand2,
} from 'lucide-react'

interface Domain {
  id: string
  name: string
  description: string
  status: 'healthy' | 'warning' | 'error' | 'syncing'
  aiScore: number
  lastSync: string
  tables: number
  agents: number
  mcpEndpoint: string
  validation: DomainValidation
  deployedAgents: DeployedAgent[]
}

interface DomainValidation {
  dimensions: { accuracy: number; completeness: number; consistency: number; timeliness: number; validity: number }
  issues: ValidationIssue[]
  tables: TableProfile[]
  recommendations: Recommendation[]
}

interface ValidationIssue {
  id: string
  severity: 'error' | 'warning' | 'info'
  title: string
  description: string
  table: string
  column?: string
  affectedRows?: number
}

interface TableProfile {
  name: string
  rows: number
  columns: number
  nullRate: number
  duplicateRate: number
  lastUpdated: string
}

interface Recommendation {
  id: string
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  impact: string
  autoFix?: boolean
}

interface DeployedAgent {
  id: string
  name: string
  status: 'active' | 'paused' | 'error'
  type: string
  executions: number
  lastRun: string
  mcpEndpoint: string
}

interface WorkspaceProps {
  user: { name: string; avatar: string }
}

const initialDomains: Domain[] = [
  {
    id: '1',
    name: 'customer-analytics',
    description: 'Customer behavior analytics and segmentation',
    status: 'healthy',
    aiScore: 94,
    lastSync: '2 min ago',
    tables: 12,
    agents: 3,
    mcpEndpoint: 'mcp://databao.ai/domains/customer-analytics',
    validation: {
      dimensions: { accuracy: 96, completeness: 92, consistency: 95, timeliness: 91, validity: 97 },
      issues: [
        { id: 'i1', severity: 'warning', title: 'Missing email values', description: '3.2% of records have null emails', table: 'customers', column: 'email', affectedRows: 1247 },
      ],
      tables: [
        { name: 'customers', rows: 38942, columns: 18, nullRate: 2.1, duplicateRate: 0.06, lastUpdated: '2 min ago' },
        { name: 'transactions', rows: 284756, columns: 12, nullRate: 0.4, duplicateRate: 0, lastUpdated: '2 min ago' },
      ],
      recommendations: [
        { id: 'r1', priority: 'medium', title: 'Add email validation', description: 'Implement regex validation', impact: '+2% accuracy', autoFix: true },
      ],
    },
    deployedAgents: [
      { id: 'a1', name: 'Customer Segmenter', status: 'active', type: 'Data Science', executions: 1247, lastRun: '5 min ago', mcpEndpoint: 'mcp://databao.ai/agents/customer-segmenter' },
    ],
  },
  {
    id: '2',
    name: 'inventory-service',
    description: 'Real-time inventory management',
    status: 'healthy',
    aiScore: 89,
    lastSync: '5 min ago',
    tables: 8,
    agents: 2,
    mcpEndpoint: 'mcp://databao.ai/domains/inventory-service',
    validation: {
      dimensions: { accuracy: 91, completeness: 87, consistency: 92, timeliness: 85, validity: 90 },
      issues: [
        { id: 'i3', severity: 'error', title: 'Negative stock values', description: '12 SKUs show negative inventory', table: 'stock_levels', column: 'quantity', affectedRows: 12 },
      ],
      tables: [
        { name: 'products', rows: 1945, columns: 22, nullRate: 4.2, duplicateRate: 0.1, lastUpdated: '5 min ago' },
      ],
      recommendations: [
        { id: 'r3', priority: 'high', title: 'Fix negative stock', description: 'Add constraint', impact: '+3% validity', autoFix: true },
      ],
    },
    deployedAgents: [
      { id: 'a4', name: 'Stock Monitor', status: 'active', type: 'Data Engineering', executions: 8934, lastRun: '2 min ago', mcpEndpoint: 'mcp://databao.ai/agents/stock-monitor' },
    ],
  },
  {
    id: '3',
    name: 'sales-pipeline',
    description: 'Sales forecasting and pipeline',
    status: 'warning',
    aiScore: 72,
    lastSync: '1 hour ago',
    tables: 15,
    agents: 1,
    mcpEndpoint: 'mcp://databao.ai/domains/sales-pipeline',
    validation: {
      dimensions: { accuracy: 78, completeness: 65, consistency: 74, timeliness: 68, validity: 76 },
      issues: [
        { id: 'i6', severity: 'error', title: 'Missing deal amounts', description: '18% missing values', table: 'deals', column: 'amount', affectedRows: 892 },
      ],
      tables: [
        { name: 'deals', rows: 4956, columns: 24, nullRate: 12.4, duplicateRate: 0.3, lastUpdated: '1 hour ago' },
      ],
      recommendations: [
        { id: 'r6', priority: 'high', title: 'Require deal amounts', description: 'Add NOT NULL constraint', impact: '+8% completeness' },
      ],
    },
    deployedAgents: [
      { id: 'a6', name: 'Forecast Generator', status: 'error', type: 'Data Science', executions: 52, lastRun: '3 hours ago', mcpEndpoint: 'mcp://databao.ai/agents/forecast-generator' },
    ],
  },
]

const sourceTypes = [
  { id: 'github', name: 'GitHub Repository', icon: FolderGit2, description: 'Connect a Git repository with data files' },
  { id: 'postgresql', name: 'PostgreSQL', icon: Database, description: 'Connect to PostgreSQL database' },
  { id: 'snowflake', name: 'Snowflake', icon: Cloud, description: 'Connect to Snowflake warehouse' },
  { id: 'upload', name: 'File Upload', icon: Upload, description: 'Upload CSV, JSON, or Parquet files' },
  { id: 'api', name: 'REST API', icon: Link, description: 'Connect to a REST API endpoint' },
  { id: 'bigquery', name: 'BigQuery', icon: BarChart3, description: 'Connect to Google BigQuery' },
]

const sampleRepos = [
  { id: 'r1', name: 'acme-corp/product-catalog', description: 'Product inventory and pricing data', lastActive: '2 hours ago' },
  { id: 'r2', name: 'acme-corp/user-events', description: 'User behavior and analytics events', lastActive: '5 hours ago' },
  { id: 'r3', name: 'acme-corp/order-history', description: 'Historical order and transaction data', lastActive: '1 day ago' },
  { id: 'r4', name: 'acme-corp/marketing-campaigns', description: 'Campaign performance metrics', lastActive: '3 days ago' },
]

const agentTemplates = [
  { id: 'data-eng', name: 'Data Engineering', icon: Table, color: 'bao', description: 'ETL, validation, schema' },
  { id: 'data-sci', name: 'Data Science', icon: BrainCircuit, color: 'mint', description: 'ML, predictions, anomaly' },
  { id: 'conversational', name: 'Conversational', icon: MessageSquare, color: 'amber', description: 'Chat, Q&A, NL queries' },
  { id: 'custom', name: 'Custom Agent', icon: Cpu, color: 'coral', description: 'Full control' },
]

const toolOptions = [
  { id: 'sql', name: 'SQL Query', icon: Database, description: 'Execute queries' },
  { id: 'schema', name: 'Schema Analysis', icon: Layers, description: 'Inspect tables' },
  { id: 'ml', name: 'ML Inference', icon: BrainCircuit, description: 'Run models' },
  { id: 'viz', name: 'Visualization', icon: BarChart3, description: 'Generate charts' },
  { id: 'search', name: 'RAG Search', icon: FileSearch, description: 'Document search' },
  { id: 'web', name: 'Web Search', icon: Globe, description: 'Search internet' },
  { id: 'calc', name: 'Calculator', icon: Calculator, description: 'Math ops' },
  { id: 'alert', name: 'Alerts', icon: AlertTriangle, description: 'Notifications' },
]

export default function Workspace({ user }: WorkspaceProps) {
  const [domains, setDomains] = useState<Domain[]>(initialDomains)
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(initialDomains[0] ?? null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)
  const [showDeployFlow, setShowDeployFlow] = useState(false)
  const [showAddDomain, setShowAddDomain] = useState(false)

  const filteredDomains = domains.filter(
    (d) => d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedEndpoint(id)
    setTimeout(() => setCopiedEndpoint(null), 2000)
  }

  const handleAddDomain = (newDomain: Domain) => {
    setDomains([newDomain, ...domains])
    setShowAddDomain(false)
    setSelectedDomain(newDomain)
  }

  const isFocusMode = selectedDomain !== null

  return (
    <div className="h-screen flex flex-col bg-night-950">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-4 border-b border-night-800/50 bg-night-950/80 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-bao-500 to-bao-700 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-display font-semibold text-white">Databao</span>
        </div>

        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-night-500" />
          <input type="text" placeholder="Search domains..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-1.5 text-sm bg-night-900/50 border border-night-800 rounded-lg" />
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-night-800/50">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-bao-400 to-mint-500 flex items-center justify-center text-xs font-semibold text-white">{user.avatar}</div>
          </button>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex overflow-hidden">
        {/* Domain List */}
        <motion.div animate={{ width: isFocusMode ? 280 : '100%', opacity: isFocusMode ? 0.7 : 1 }} transition={{ duration: 0.3 }} className={`border-r border-night-800/50 flex flex-col ${isFocusMode ? 'hover:opacity-100' : ''}`}>
          <div className="p-4 border-b border-night-800/50 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">Data Domains</h2>
              <p className="text-xs text-night-500">{domains.length} connected</p>
            </div>
            <button onClick={() => setShowAddDomain(true)} className="btn-primary p-2" aria-label="Add domain">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {filteredDomains.length > 0 ? (
              <div className="space-y-1">
                {filteredDomains.map((domain) => (
                  <DomainListItem key={domain.id} domain={domain} isSelected={selectedDomain?.id === domain.id} onSelect={() => setSelectedDomain(domain)} onCopy={(text) => copyToClipboard(text, domain.id)} isCopied={copiedEndpoint === domain.id} compact={isFocusMode} />
                ))}
              </div>
            ) : (
              <EmptyState onAdd={() => setShowAddDomain(true)} />
            )}
          </div>
        </motion.div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selectedDomain && (
            <DomainDetail domain={selectedDomain} onClose={() => setSelectedDomain(null)} onCopy={(text) => copyToClipboard(text, 'detail')} isCopied={copiedEndpoint === 'detail'} onDeployAgent={() => setShowDeployFlow(true)} />
          )}
        </AnimatePresence>
      </div>

      {/* Add Domain Flow */}
      <AnimatePresence>
        {showAddDomain && <AddDomainFlow onClose={() => setShowAddDomain(false)} onComplete={handleAddDomain} />}
      </AnimatePresence>

      {/* Deploy Agent Flow */}
      <AnimatePresence>
        {showDeployFlow && selectedDomain && <DeployAgentFlow domain={selectedDomain} onClose={() => setShowDeployFlow(false)} />}
      </AnimatePresence>

      {/* Settings */}
      <AnimatePresence>
        {showSettings && <SettingsFlyout onClose={() => setShowSettings(false)} />}
      </AnimatePresence>
    </div>
  )
}

// ============ ADD DOMAIN FLOW ============

function AddDomainFlow({ onClose, onComplete }: { onClose: () => void; onComplete: (domain: Domain) => void }) {
  const [step, setStep] = useState(1)
  const [sourceType, setSourceType] = useState<string | null>(null)
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null)
  const [domainName, setDomainName] = useState('')
  const [domainDescription, setDomainDescription] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)

  // Simulated scan results
  const [scanResults, setScanResults] = useState<{
    tables: { name: string; rows: number; columns: number; types: string[] }[]
    aiScore: number
    issues: number
  } | null>(null)

  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setScanResults({
        tables: [
          { name: 'products', rows: 2456, columns: 15, types: ['string', 'number', 'date'] },
          { name: 'categories', rows: 48, columns: 6, types: ['string', 'number'] },
          { name: 'inventory', rows: 8934, columns: 12, types: ['string', 'number', 'boolean'] },
          { name: 'suppliers', rows: 124, columns: 18, types: ['string', 'number', 'date'] },
        ],
        aiScore: 87,
        issues: 3,
      })
      setIsScanning(false)
      setScanComplete(true)
    }, 2500)
  }

  const handleDeploy = () => {
    setIsDeploying(true)
    setTimeout(() => {
      const newDomain: Domain = {
        id: `domain-${Date.now()}`,
        name: domainName.toLowerCase().replace(/\s+/g, '-'),
        description: domainDescription,
        status: 'healthy',
        aiScore: scanResults?.aiScore || 85,
        lastSync: 'Just now',
        tables: scanResults?.tables.length || 4,
        agents: 0,
        mcpEndpoint: `mcp://databao.ai/domains/${domainName.toLowerCase().replace(/\s+/g, '-')}`,
        validation: {
          dimensions: { accuracy: 89, completeness: 85, consistency: 88, timeliness: 92, validity: 87 },
          issues: [],
          tables: scanResults?.tables.map(t => ({
            name: t.name,
            rows: t.rows,
            columns: t.columns,
            nullRate: Math.random() * 5,
            duplicateRate: Math.random() * 0.5,
            lastUpdated: 'Just now',
          })) || [],
          recommendations: [],
        },
        deployedAgents: [],
      }
      onComplete(newDomain)
    }, 2000)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-950/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-3xl glass rounded-2xl overflow-hidden max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-5 border-b border-night-800/50 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-bao-500/20 flex items-center justify-center">
              <Database className="w-5 h-5 text-bao-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Add Data Domain</h2>
              <p className="text-xs text-night-400">Connect a new data source</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-night-400 hover:text-night-200 hover:bg-night-800/50"><X className="w-5 h-5" /></button>
        </div>

        {/* Progress */}
        <div className="px-6 pt-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            {[{ num: 1, label: 'Source' }, { num: 2, label: 'Connect' }, { num: 3, label: 'Scan' }, { num: 4, label: 'Configure' }, { num: 5, label: 'Deploy' }].map((s, i) => (
              <div key={s.num} className="flex-1 flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${s.num < step ? 'bg-mint-500 text-white' : s.num === step ? 'bg-bao-600 text-white' : 'bg-night-800 text-night-400'}`}>
                  {s.num < step ? <Check className="w-3.5 h-3.5" /> : s.num}
                </div>
                {i < 4 && <div className={`flex-1 h-0.5 ${s.num < step ? 'bg-mint-500' : 'bg-night-800'}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-night-300">Select your data source type:</p>
              <div className="grid grid-cols-3 gap-3">
                {sourceTypes.map((source) => (
                  <button key={source.id} onClick={() => setSourceType(source.id)} className={`p-4 rounded-xl text-left transition-all ${sourceType === source.id ? 'bg-bao-600/20 border-2 border-bao-500/50' : 'bg-night-800/30 border-2 border-transparent hover:border-night-700'}`}>
                    <source.icon className={`w-6 h-6 mb-2 ${sourceType === source.id ? 'text-bao-400' : 'text-night-400'}`} />
                    <h4 className="font-medium text-white text-sm">{source.name}</h4>
                    <p className="text-xs text-night-400 mt-1">{source.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && sourceType === 'github' && (
            <div className="space-y-4">
              <p className="text-sm text-night-300">Select a repository:</p>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-night-500" />
                <input type="text" placeholder="Search repositories..." className="w-full pl-10 pr-4 py-2.5" />
              </div>
              <div className="space-y-2">
                {sampleRepos.map((repo) => (
                  <button key={repo.id} onClick={() => setSelectedRepo(repo.id)} className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-4 ${selectedRepo === repo.id ? 'bg-bao-600/20 border-2 border-bao-500/50' : 'bg-night-800/30 border-2 border-transparent hover:border-night-700'}`}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedRepo === repo.id ? 'bg-bao-500/20' : 'bg-night-800'}`}>
                      <FolderGit2 className={`w-5 h-5 ${selectedRepo === repo.id ? 'text-bao-400' : 'text-night-400'}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">{repo.name}</p>
                      <p className="text-xs text-night-400">{repo.description}</p>
                    </div>
                    <span className="text-xs text-night-500">{repo.lastActive}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && sourceType === 'postgresql' && (
            <div className="space-y-4">
              <p className="text-sm text-night-300">Enter your PostgreSQL connection details:</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-night-300 mb-2">Host</label>
                  <input type="text" placeholder="localhost" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-night-300 mb-2">Port</label>
                  <input type="text" placeholder="5432" className="w-full" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-night-300 mb-2">Database Name</label>
                <input type="text" placeholder="my_database" className="w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-night-300 mb-2">Username</label>
                  <input type="text" placeholder="postgres" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-night-300 mb-2">Password</label>
                  <input type="password" placeholder="••••••••" className="w-full" />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-mint-500/10 border border-mint-500/20 flex items-center gap-2">
                <Shield className="w-4 h-4 text-mint-400" />
                <span className="text-xs text-mint-400">Connection is encrypted with SSL/TLS</span>
              </div>
            </div>
          )}

          {step === 2 && sourceType === 'upload' && (
            <div className="space-y-4">
              <p className="text-sm text-night-300">Upload your data files:</p>
              <div className="border-2 border-dashed border-night-700 rounded-xl p-8 text-center hover:border-bao-500/50 transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-night-500 mx-auto mb-4" />
                <p className="text-white font-medium mb-1">Drop files here or click to upload</p>
                <p className="text-xs text-night-400">Supports CSV, JSON, Parquet, Excel</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-night-500">
                <span className="flex items-center gap-1"><FileSpreadsheet className="w-3 h-3" />Max 100MB per file</span>
                <span className="flex items-center gap-1"><Database className="w-3 h-3" />Up to 10 files</span>
              </div>
            </div>
          )}

          {step === 2 && !['github', 'postgresql', 'upload'].includes(sourceType || '') && (
            <div className="space-y-4">
              <p className="text-sm text-night-300">Enter connection details for {sourceTypes.find(s => s.id === sourceType)?.name}:</p>
              <div>
                <label className="block text-sm font-medium text-night-300 mb-2">Connection String / URL</label>
                <input type="text" placeholder="Enter connection string..." className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-night-300 mb-2">Authentication Token (optional)</label>
                <input type="password" placeholder="••••••••" className="w-full" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              {!scanComplete ? (
                <div className="text-center py-8">
                  {isScanning ? (
                    <>
                      <div className="w-16 h-16 rounded-2xl bg-bao-500/20 flex items-center justify-center mx-auto mb-6">
                        <ScanSearch className="w-8 h-8 text-bao-400 animate-pulse" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Scanning Data Source...</h3>
                      <p className="text-sm text-night-400 mb-6">Profiling tables, detecting schemas, and analyzing quality</p>
                      <div className="max-w-xs mx-auto space-y-2">
                        {['Connecting to source...', 'Discovering tables...', 'Analyzing schemas...', 'Profiling data quality...'].map((task, i) => (
                          <div key={task} className="flex items-center gap-3 text-sm">
                            <Loader2 className={`w-4 h-4 text-bao-400 ${i < 2 ? '' : 'opacity-30'} animate-spin`} />
                            <span className={i < 2 ? 'text-night-200' : 'text-night-500'}>{task}</span>
                            {i < 2 && <Check className="w-4 h-4 text-mint-400 ml-auto" />}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-2xl bg-night-800/50 flex items-center justify-center mx-auto mb-6">
                        <ScanSearch className="w-8 h-8 text-night-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Ready to Scan</h3>
                      <p className="text-sm text-night-400 mb-6">We'll analyze your data source to discover tables, infer schemas, and evaluate AI-readiness</p>
                      <button onClick={handleScan} className="btn-primary">
                        <Wand2 className="w-4 h-4" />
                        Start Scan
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-xl bg-mint-500/10 border border-mint-500/20 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-mint-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-mint-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-mint-400">Scan Complete</h4>
                      <p className="text-sm text-night-300">Found {scanResults?.tables.length} tables with {scanResults?.aiScore}% AI-readiness</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">Discovered Tables</h4>
                    <div className="space-y-2">
                      {scanResults?.tables.map((table) => (
                        <div key={table.name} className="p-3 rounded-lg bg-night-900/50 border border-night-800/50 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Table className="w-4 h-4 text-night-400" />
                            <span className="font-mono text-sm text-white">{table.name}</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-night-400">
                            <span>{table.rows.toLocaleString()} rows</span>
                            <span>{table.columns} columns</span>
                            <div className="flex items-center gap-1">
                              {table.types.includes('string') && <Type className="w-3 h-3" />}
                              {table.types.includes('number') && <Hash className="w-3 h-3" />}
                              {table.types.includes('date') && <Calendar className="w-3 h-3" />}
                              {table.types.includes('boolean') && <ToggleLeft className="w-3 h-3" />}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {scanResults && scanResults.issues > 0 && (
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                      <div>
                        <p className="text-sm font-medium text-amber-400">{scanResults.issues} quality issues detected</p>
                        <p className="text-xs text-night-400">These will be shown in the validation tab after deployment</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-night-300 mb-2">Domain Name</label>
                <input type="text" value={domainName} onChange={(e) => setDomainName(e.target.value)} placeholder="e.g., product-catalog" className="w-full" />
                <p className="text-xs text-night-500 mt-1">This will be used in the MCP endpoint URL</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-night-300 mb-2">Description</label>
                <textarea value={domainDescription} onChange={(e) => setDomainDescription(e.target.value)} placeholder="Brief description of this data domain..." rows={3} className="w-full" />
              </div>
              <div className="p-4 rounded-xl bg-night-900/50 border border-night-800/50">
                <h4 className="text-sm font-medium text-white mb-3">Sync Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-night-300">Auto-sync enabled</span>
                    <button className="w-10 h-6 rounded-full bg-mint-500 relative"><span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" /></button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-night-300">Sync frequency</span>
                    <select className="text-sm bg-night-800 border border-night-700 rounded-lg px-3 py-1">
                      <option>Every 5 minutes</option>
                      <option>Every 15 minutes</option>
                      <option>Every hour</option>
                      <option>Daily</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-night-900/50 border border-night-800/50">
                <h4 className="text-sm font-semibold text-white mb-4">Deployment Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-night-400">Domain Name</span>
                    <span className="text-white font-medium">{domainName || 'Unnamed'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-night-400">Source Type</span>
                    <span className="text-white">{sourceTypes.find(s => s.id === sourceType)?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-night-400">Tables</span>
                    <span className="text-white">{scanResults?.tables.length || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-night-400">AI-Readiness</span>
                    <span className={`font-medium ${(scanResults?.aiScore || 0) >= 90 ? 'text-mint-400' : (scanResults?.aiScore || 0) >= 80 ? 'text-amber-400' : 'text-coral-400'}`}>{scanResults?.aiScore || 0}%</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-bao-500/10 border border-bao-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-bao-400" />
                  <span className="text-sm font-medium text-bao-400">MCP Endpoint</span>
                </div>
                <code className="block px-3 py-2 text-sm font-mono bg-night-900/80 text-night-200 rounded-lg">
                  mcp://databao.ai/domains/{domainName.toLowerCase().replace(/\s+/g, '-') || 'new-domain'}
                </code>
              </div>

              <div className="p-3 rounded-lg bg-night-900/50 border border-night-700/30 text-sm text-night-400">
                <p>After deployment, you'll be able to:</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>View detailed validation and quality metrics</li>
                  <li>Deploy AI agents using this domain</li>
                  <li>Connect via MCP from Cursor or Claude</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-night-800/50 flex items-center justify-between flex-shrink-0">
          <button onClick={() => step > 1 && setStep(step - 1)} className={`btn-ghost ${step === 1 ? 'invisible' : ''}`}>
            <ArrowLeft className="w-4 h-4" />Back
          </button>
          <button
            onClick={() => {
              if (step === 3 && !scanComplete) return
              if (step < 5) setStep(step + 1)
              else handleDeploy()
            }}
            disabled={(step === 1 && !sourceType) || (step === 2 && sourceType === 'github' && !selectedRepo) || (step === 3 && !scanComplete) || (step === 4 && !domainName) || isDeploying}
            className="btn-primary disabled:opacity-50"
          >
            {isDeploying ? (
              <><Loader2 className="w-4 h-4 animate-spin" />Deploying...</>
            ) : step === 5 ? (
              <><Rocket className="w-4 h-4" />Deploy Domain</>
            ) : (
              <>Continue<ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============ DEPLOY AGENT FLOW ============

function DeployAgentFlow({ domain, onClose }: { domain: Domain; onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [agentName, setAgentName] = useState('')
  const [agentGoal, setAgentGoal] = useState('')
  const [selectedTools, setSelectedTools] = useState<string[]>([])
  const [guardrails, setGuardrails] = useState({ humanApproval: true, rateLimit: '100', auditLogging: true, readOnly: true })
  const [deployTarget, setDeployTarget] = useState<'mcp' | 'github' | 'cloud'>('mcp')
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployComplete, setDeployComplete] = useState(false)

  const toggleTool = (toolId: string) => setSelectedTools((prev) => prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId])

  const handleDeploy = () => {
    setIsDeploying(true)
    setTimeout(() => { setIsDeploying(false); setDeployComplete(true) }, 2000)
  }

  const generatedEndpoint = `mcp://databao.ai/agents/${agentName.toLowerCase().replace(/\s+/g, '-') || 'new-agent'}`

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-950/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-3xl glass rounded-2xl overflow-hidden max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-night-800/50 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-bao-500/20 flex items-center justify-center"><Bot className="w-5 h-5 text-bao-400" /></div>
            <div>
              <h2 className="text-lg font-semibold text-white">Deploy Agent</h2>
              <p className="text-xs text-night-400">Domain: <span className="text-bao-400">{domain.name}</span></p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-night-400 hover:text-night-200 hover:bg-night-800/50"><X className="w-5 h-5" /></button>
        </div>

        {!deployComplete && (
          <div className="px-6 pt-4 flex-shrink-0">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((s, i) => (
                <div key={s} className="flex-1 flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${s < step ? 'bg-mint-500 text-white' : s === step ? 'bg-bao-600 text-white' : 'bg-night-800 text-night-400'}`}>
                    {s < step ? <Check className="w-3.5 h-3.5" /> : s}
                  </div>
                  {i < 4 && <div className={`flex-1 h-0.5 ${s < step ? 'bg-mint-500' : 'bg-night-800'}`} />}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6">
          {deployComplete ? (
            <DeploySuccess agentName={agentName} endpoint={generatedEndpoint} onClose={onClose} />
          ) : (
            <>
              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-sm text-night-300">Choose an agent template:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {agentTemplates.map((tpl) => (
                      <button key={tpl.id} onClick={() => setSelectedTemplate(tpl.id)} className={`p-4 rounded-xl text-left transition-all ${selectedTemplate === tpl.id ? 'bg-bao-600/20 border-2 border-bao-500/50' : 'bg-night-800/30 border-2 border-transparent hover:border-night-700'}`}>
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${tpl.color === 'bao' ? 'bg-bao-500/20' : tpl.color === 'mint' ? 'bg-mint-500/20' : tpl.color === 'amber' ? 'bg-amber-500/20' : 'bg-coral-500/20'}`}>
                          <tpl.icon className={`w-5 h-5 ${tpl.color === 'bao' ? 'text-bao-400' : tpl.color === 'mint' ? 'text-mint-400' : tpl.color === 'amber' ? 'text-amber-400' : 'text-coral-400'}`} />
                        </div>
                        <h4 className="font-medium text-white">{tpl.name}</h4>
                        <p className="text-xs text-night-400 mt-1">{tpl.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-night-300 mb-2">Agent Name</label><input type="text" value={agentName} onChange={(e) => setAgentName(e.target.value)} placeholder="e.g., Customer Churn Predictor" className="w-full" /></div>
                  <div><label className="block text-sm font-medium text-night-300 mb-2">Goal Description</label><textarea value={agentGoal} onChange={(e) => setAgentGoal(e.target.value)} placeholder="Describe what this agent should accomplish..." rows={3} className="w-full" /></div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-sm text-night-300">Select tools:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {toolOptions.map((tool) => (
                      <button key={tool.id} onClick={() => toggleTool(tool.id)} className={`p-3 rounded-xl text-left transition-all flex items-center gap-3 ${selectedTools.includes(tool.id) ? 'bg-bao-600/20 border-2 border-bao-500/50' : 'bg-night-800/30 border-2 border-transparent hover:border-night-700'}`}>
                        <tool.icon className={`w-5 h-5 ${selectedTools.includes(tool.id) ? 'text-bao-400' : 'text-night-400'}`} />
                        <div><h4 className="font-medium text-white text-sm">{tool.name}</h4><p className="text-xs text-night-400">{tool.description}</p></div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-3">
                  <p className="text-sm text-night-300">Configure guardrails:</p>
                  {[
                    { key: 'humanApproval', icon: Shield, color: 'coral', label: 'Human Approval', desc: 'Require approval for sensitive actions' },
                    { key: 'auditLogging', icon: Eye, color: 'bao', label: 'Audit Logging', desc: 'Log all actions' },
                    { key: 'readOnly', icon: Database, color: 'mint', label: 'Read-Only Mode', desc: 'Prevent modifications' },
                  ].map((item) => (
                    <div key={item.key} className="p-4 rounded-xl bg-night-800/30 border border-night-700/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                        <div><p className="text-sm font-medium text-white">{item.label}</p><p className="text-xs text-night-400">{item.desc}</p></div>
                      </div>
                      <button onClick={() => setGuardrails({ ...guardrails, [item.key]: !guardrails[item.key as keyof typeof guardrails] })} className={`w-11 h-6 rounded-full relative transition-colors ${guardrails[item.key as keyof typeof guardrails] ? 'bg-mint-500' : 'bg-night-700'}`}>
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${guardrails[item.key as keyof typeof guardrails] ? 'right-1' : 'left-1'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {step === 5 && (
                <div className="space-y-4">
                  <p className="text-sm text-night-300">Choose deployment target:</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[{ id: 'mcp', icon: Server, label: 'MCP Server' }, { id: 'github', icon: Github, label: 'GitHub Actions' }, { id: 'cloud', icon: Cloud, label: 'Managed Cloud' }].map((t) => (
                      <button key={t.id} onClick={() => setDeployTarget(t.id as typeof deployTarget)} className={`p-4 rounded-xl text-left ${deployTarget === t.id ? 'bg-bao-600/20 border-2 border-bao-500/50' : 'bg-night-800/30 border-2 border-transparent hover:border-night-700'}`}>
                        <t.icon className={`w-6 h-6 mb-2 ${deployTarget === t.id ? 'text-bao-400' : 'text-night-400'}`} />
                        <h4 className="font-medium text-white text-sm">{t.label}</h4>
                      </button>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-night-900/50 border border-night-800/50">
                    <p className="text-sm text-night-400 mb-2">Endpoint:</p>
                    <code className="block px-3 py-2 text-sm font-mono bg-night-900 text-bao-400 rounded-lg">{generatedEndpoint}</code>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {!deployComplete && (
          <div className="p-5 border-t border-night-800/50 flex items-center justify-between flex-shrink-0">
            <button onClick={() => step > 1 && setStep(step - 1)} className={`btn-ghost ${step === 1 ? 'invisible' : ''}`}><ArrowLeft className="w-4 h-4" />Back</button>
            <button onClick={() => step < 5 ? setStep(step + 1) : handleDeploy()} disabled={(step === 1 && !selectedTemplate) || (step === 2 && !agentName) || isDeploying} className="btn-primary disabled:opacity-50">
              {isDeploying ? <><Loader2 className="w-4 h-4 animate-spin" />Deploying...</> : step === 5 ? <><Rocket className="w-4 h-4" />Deploy</> : <>Continue<ArrowRight className="w-4 h-4" /></>}
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

function DeploySuccess({ agentName, endpoint, onClose }: { agentName: string; endpoint: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  const copyEndpoint = () => { navigator.clipboard.writeText(endpoint); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="w-16 h-16 rounded-2xl bg-mint-500/20 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-8 h-8 text-mint-400" />
      </motion.div>
      <h3 className="text-xl font-semibold text-white mb-2">Agent Deployed!</h3>
      <p className="text-night-400 mb-6"><span className="text-white font-medium">{agentName}</span> is now live</p>
      <div className="p-4 rounded-xl bg-bao-500/10 border border-bao-500/30 mb-6 text-left">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-bao-400">MCP Endpoint</span>
          <span className="px-2 py-0.5 text-xs font-medium bg-mint-500/20 text-mint-400 rounded">Live</span>
        </div>
        <div className="flex items-center gap-2">
          <code className="flex-1 px-3 py-2 text-sm font-mono bg-night-900/80 text-night-200 rounded-lg truncate">{endpoint}</code>
          <button onClick={copyEndpoint} className={`px-3 py-2 rounded-lg font-medium text-sm ${copied ? 'bg-mint-500 text-white' : 'bg-bao-600 hover:bg-bao-500 text-white'}`}>
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3 justify-center">
        <button onClick={onClose} className="btn-secondary">Close</button>
        <button className="btn-primary"><Eye className="w-4 h-4" />View Agent</button>
      </div>
    </motion.div>
  )
}

// ============ SHARED COMPONENTS ============

function DomainListItem({ domain, isSelected, onSelect, onCopy, isCopied, compact }: { domain: Domain; isSelected: boolean; onSelect: () => void; onCopy: (text: string) => void; isCopied: boolean; compact: boolean }) {
  const issueCount = domain.validation.issues.filter(i => i.severity === 'error' || i.severity === 'warning').length

  return (
    <motion.div layout onClick={onSelect} className={`p-3 rounded-xl cursor-pointer transition-all ${isSelected ? 'bg-bao-600/20 border border-bao-500/30' : 'hover:bg-night-900/50 border border-transparent'}`}>
      <div className="flex items-start gap-3">
        <StatusIndicator status={domain.status} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-white truncate">{domain.name}</h3>
            <ScoreBadge score={domain.aiScore} />
          </div>
          {!compact && <p className="text-xs text-night-400 truncate mt-0.5">{domain.description}</p>}
          <div className="flex items-center gap-3 mt-2 text-xs text-night-500">
            <span className="flex items-center gap-1"><Database className="w-3 h-3" />{domain.tables}</span>
            <span className="flex items-center gap-1"><Bot className="w-3 h-3" />{domain.deployedAgents.length}</span>
            {issueCount > 0 && <span className={`flex items-center gap-1 ${domain.status === 'error' ? 'text-coral-400' : 'text-amber-400'}`}><AlertTriangle className="w-3 h-3" />{issueCount}</span>}
          </div>
        </div>
        {!compact && (
          <button onClick={(e) => { e.stopPropagation(); onCopy(domain.mcpEndpoint) }} className={`p-2 rounded-lg transition-all ${isCopied ? 'bg-mint-500/20 text-mint-400' : 'text-night-400 hover:text-bao-400 hover:bg-night-800/50'}`}>
            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
      </div>
    </motion.div>
  )
}

function StatusIndicator({ status }: { status: Domain['status'] }) {
  const styles = { healthy: 'bg-mint-500', warning: 'bg-amber-500', error: 'bg-coral-500', syncing: 'bg-bao-500 animate-pulse' }
  return <div className="pt-1"><div className={`w-2.5 h-2.5 rounded-full ${styles[status]}`} /></div>
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 90 ? 'text-mint-400 bg-mint-500/20' : score >= 80 ? 'text-amber-400 bg-amber-500/20' : 'text-coral-400 bg-coral-500/20'
  return <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded ${color}`}>{score}%</span>
}

function DomainDetail({ domain, onClose, onCopy, isCopied, onDeployAgent }: { domain: Domain; onClose: () => void; onCopy: (text: string) => void; isCopied: boolean; onDeployAgent: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'validation' | 'agents'>('overview')
  const [agentConfig, setAgentConfig] = useState<'cursor' | 'claude'>('cursor')
  const [copiedConfig, setCopiedConfig] = useState(false)

  const cursorConfig = `{\n  "mcpServers": {\n    "${domain.name}": {\n      "command": "databao",\n      "args": ["mcp", "serve", "${domain.id}"]\n    }\n  }\n}`
  const claudeConfig = `{\n  "mcpServers": {\n    "${domain.name}": {\n      "command": "databao",\n      "args": ["mcp", "serve", "${domain.id}"],\n      "env": { "DATABAO_TOKEN": "$DATABAO_TOKEN" }\n    }\n  }\n}`

  const copyConfig = () => { navigator.clipboard.writeText(agentConfig === 'cursor' ? cursorConfig : claudeConfig); setCopiedConfig(true); setTimeout(() => setCopiedConfig(false), 2000) }

  const { validation } = domain
  const errorCount = validation.issues.filter(i => i.severity === 'error').length
  const warningCount = validation.issues.filter(i => i.severity === 'warning').length

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex-1 flex flex-col bg-night-950/50 backdrop-blur-sm overflow-hidden">
      <div className="p-4 border-b border-night-800/50 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <StatusIndicator status={domain.status} />
          <div><h2 className="text-lg font-semibold text-white">{domain.name}</h2><p className="text-xs text-night-400">{domain.description}</p></div>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg text-night-400 hover:text-night-200 hover:bg-night-800/50"><X className="w-5 h-5" /></button>
      </div>

      <div className="px-4 border-b border-night-800/50 flex items-center gap-1 flex-shrink-0">
        {[{ id: 'overview', label: 'Overview', icon: Layers }, { id: 'validation', label: 'Validation', icon: ShieldCheck, badge: errorCount + warningCount }, { id: 'agents', label: 'Agents', icon: Bot, badge: domain.deployedAgents.length }].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)} className={`flex items-center gap-2 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-bao-500 text-bao-400' : 'border-transparent text-night-400 hover:text-night-200'}`}>
            <tab.icon className="w-4 h-4" />{tab.label}
            {tab.badge !== undefined && tab.badge > 0 && <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded-full ${tab.id === 'validation' && errorCount > 0 ? 'bg-coral-500/20 text-coral-400' : 'bg-bao-500/20 text-bao-400'}`}>{tab.badge}</span>}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'overview' && (
          <>
            <div className="p-4 rounded-xl bg-bao-500/10 border border-bao-500/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-bao-400" /><span className="text-sm font-medium text-bao-400">MCP Endpoint</span></div>
                <span className="px-2 py-0.5 text-xs font-medium bg-mint-500/20 text-mint-400 rounded">Live</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2.5 text-sm font-mono bg-night-900/80 text-night-200 rounded-lg truncate">{domain.mcpEndpoint}</code>
                <button onClick={() => onCopy(domain.mcpEndpoint)} className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${isCopied ? 'bg-mint-500 text-white' : 'bg-bao-600 hover:bg-bao-500 text-white'}`}>
                  {isCopied ? <><Check className="w-4 h-4 inline mr-1" />Copied</> : <><Copy className="w-4 h-4 inline mr-1" />Copy</>}
                </button>
              </div>
            </div>
            <div className="rounded-xl border border-night-800/50 overflow-hidden">
              <div className="p-3 bg-night-900/30 border-b border-night-800/50 flex items-center justify-between">
                <span className="text-sm font-medium text-white">Agent Configuration</span>
                <select value={agentConfig} onChange={(e) => setAgentConfig(e.target.value as 'cursor' | 'claude')} className="text-xs bg-night-800 border border-night-700 rounded-lg px-2 py-1"><option value="cursor">Cursor</option><option value="claude">Claude Desktop</option></select>
              </div>
              <div className="p-3 bg-night-900/20"><pre className="text-xs font-mono text-night-300 overflow-x-auto">{agentConfig === 'cursor' ? cursorConfig : claudeConfig}</pre></div>
              <div className="p-3 bg-night-900/30 border-t border-night-800/50">
                <button onClick={copyConfig} className={`w-full py-2 rounded-lg font-medium text-sm ${copiedConfig ? 'bg-mint-500/20 text-mint-400 border border-mint-500/30' : 'bg-night-800 hover:bg-night-700 text-night-200 border border-night-700'}`}>
                  {copiedConfig ? <><Check className="w-4 h-4 inline mr-1" />Copied!</> : <><FileJson className="w-4 h-4 inline mr-1" />Copy Config</>}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-night-900/30 border border-night-800/50 text-center"><p className="text-xl font-semibold text-white">{domain.aiScore}%</p><p className="text-xs text-night-400">AI Readiness</p></div>
              <div className="p-3 rounded-xl bg-night-900/30 border border-night-800/50 text-center"><p className="text-xl font-semibold text-white">{domain.tables}</p><p className="text-xs text-night-400">Tables</p></div>
              <div className="p-3 rounded-xl bg-night-900/30 border border-night-800/50 text-center"><p className="text-xl font-semibold text-white">{domain.deployedAgents.length}</p><p className="text-xs text-night-400">Agents</p></div>
            </div>
          </>
        )}

        {activeTab === 'validation' && (
          <>
            <div className="p-4 rounded-xl bg-night-900/30 border border-night-800/50">
              <div className="flex items-center justify-between mb-3">
                <div><h3 className="text-sm font-semibold text-white">AI-Readiness</h3></div>
                <div className="relative w-12 h-12">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-night-800" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke={domain.aiScore >= 90 ? '#22c55e' : domain.aiScore >= 80 ? '#f59e0b' : '#f43f5e'} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(domain.aiScore / 100) * 264} 264`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center"><span className={`text-sm font-bold ${domain.aiScore >= 90 ? 'text-mint-400' : domain.aiScore >= 80 ? 'text-amber-400' : 'text-coral-400'}`}>{domain.aiScore}</span></div>
                </div>
              </div>
              <div className="space-y-2">
                {Object.entries(validation.dimensions).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3">
                    <span className="w-20 text-xs text-night-400 capitalize">{key}</span>
                    <div className="flex-1 h-1.5 bg-night-800 rounded-full overflow-hidden"><div className={`h-full rounded-full ${value >= 90 ? 'bg-mint-500' : value >= 80 ? 'bg-amber-500' : 'bg-coral-500'}`} style={{ width: `${value}%` }} /></div>
                    <span className="w-8 text-xs font-medium text-night-300 text-right">{value}%</span>
                  </div>
                ))}
              </div>
            </div>
            {validation.issues.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2"><FileWarning className="w-4 h-4 text-night-400" />Issues</h3>
                <div className="space-y-2">
                  {validation.issues.map((issue) => (
                    <div key={issue.id} className={`p-3 rounded-lg ${issue.severity === 'error' ? 'bg-coral-500/10 border border-coral-500/20' : 'bg-amber-500/10 border border-amber-500/20'}`}>
                      <div className="flex items-start gap-3">
                        {issue.severity === 'error' ? <XCircle className="w-4 h-4 text-coral-400 mt-0.5" /> : <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5" />}
                        <div><p className={`text-sm font-medium ${issue.severity === 'error' ? 'text-coral-400' : 'text-amber-400'}`}>{issue.title}</p><p className="text-xs text-night-400">{issue.description}</p></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'agents' && (
          <>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white">Deployed Agents</h3>
            </div>
            {domain.deployedAgents.length > 0 ? (
              <div className="space-y-2">
                {domain.deployedAgents.map((agent) => (
                  <div key={agent.id} className="p-4 rounded-xl bg-night-900/30 border border-night-800/50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${agent.status === 'active' ? 'bg-mint-500/20' : agent.status === 'paused' ? 'bg-amber-500/20' : 'bg-coral-500/20'}`}>
                          <Bot className={`w-5 h-5 ${agent.status === 'active' ? 'text-mint-400' : agent.status === 'paused' ? 'text-amber-400' : 'text-coral-400'}`} />
                        </div>
                        <div><h4 className="font-medium text-white">{agent.name}</h4><p className="text-xs text-night-400">{agent.type}</p></div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${agent.status === 'active' ? 'bg-mint-500/20 text-mint-400' : agent.status === 'paused' ? 'bg-amber-500/20 text-amber-400' : 'bg-coral-500/20 text-coral-400'}`}>{agent.status}</span>
                    </div>
                    <div className="text-xs text-night-400 mb-2">{agent.executions.toLocaleString()} runs • Last: {agent.lastRun}</div>
                    <code className="block px-2 py-1.5 text-xs font-mono bg-night-900/50 text-night-300 rounded truncate">{agent.mcpEndpoint}</code>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-night-900/30 border border-night-800/50 text-center">
                <Bot className="w-10 h-10 text-night-600 mx-auto mb-3" />
                <p className="text-sm text-night-400 mb-4">No agents deployed yet</p>
                <button onClick={onDeployAgent} className="btn-primary py-2 px-4 text-sm"><Rocket className="w-4 h-4" />Deploy First Agent</button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="p-4 border-t border-night-800/50 flex items-center gap-2 flex-shrink-0">
        <button className="flex-1 btn-secondary py-2"><RefreshCw className="w-4 h-4" />Sync</button>
        <button onClick={onDeployAgent} className="flex-1 btn-primary py-2"><Bot className="w-4 h-4" />Deploy Agent</button>
        <button className="p-2 rounded-lg text-night-400 hover:text-night-200 hover:bg-night-800/50"><MoreHorizontal className="w-5 h-5" /></button>
      </div>
    </motion.div>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-night-900/50 border border-night-800/50 flex items-center justify-center mb-4"><Database className="w-8 h-8 text-night-600" /></div>
      <h3 className="text-lg font-semibold text-white mb-2">No domains yet</h3>
      <p className="text-sm text-night-400 mb-6 max-w-xs">Connect a data source to create your first AI-ready domain.</p>
      <button onClick={onAdd} className="btn-primary"><Plus className="w-4 h-4" />Add Domain</button>
      <div className="w-full max-w-sm p-4 rounded-xl bg-night-900/30 border border-night-800/50 text-left mt-6">
        <div className="flex items-center gap-2 mb-3"><Terminal className="w-4 h-4 text-bao-400" /><span className="text-sm font-medium text-white">Or use CLI</span></div>
        <code className="block px-3 py-2 text-xs font-mono bg-night-900 text-night-300 rounded-lg">databao init</code>
      </div>
    </div>
  )
}

function SettingsFlyout({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex justify-end bg-night-950/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="w-96 h-full bg-night-900 border-l border-night-800/50 flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-night-800/50 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Settings</h2>
          <button onClick={onClose} className="p-2 rounded-lg text-night-400 hover:text-night-200 hover:bg-night-800/50"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-night-500 uppercase tracking-wider mb-3">Account</h3>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-night-800/30">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bao-400 to-mint-500 flex items-center justify-center text-sm font-semibold text-white">DS</div>
              <div><p className="text-sm font-medium text-white">Data Steward</p><p className="text-xs text-night-400">steward@acme-corp.com</p></div>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-night-500 uppercase tracking-wider mb-3">API Access</h3>
            <div className="p-3 rounded-lg bg-night-800/30">
              <div className="flex items-center justify-between mb-2"><span className="text-sm text-night-300">API Token</span><button className="text-xs text-bao-400 hover:text-bao-300">Regenerate</button></div>
              <code className="block px-2 py-1.5 text-xs font-mono bg-night-900 text-night-400 rounded">dbao_sk_••••••••••••</code>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
