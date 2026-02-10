import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot,
  Plus,
  Play,
  Pause,
  Settings,
  Trash2,
  ChevronRight,
  Target,
  Database,
  Wrench,
  Shield,
  Zap,
  Globe,
  Calculator,
  FileSearch,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  X,
  Sparkles,
  Copy,
  ExternalLink,
  GitBranch,
  Rocket,
  Archive,
  LayoutGrid,
  List,
  Search,
  Terminal,
  Eye,
  Cpu,
  Workflow,
  Table,
  BarChart3,
  BrainCircuit,
  FlaskConical,
  Package,
  Github,
  Cloud,
  Server,
  Activity,
  Layers,
  ChevronDown,
  RotateCcw,
  Send,
} from 'lucide-react'

interface Agent {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'error' | 'draft' | 'deploying'
  type: 'data-engineering' | 'data-science' | 'conversational' | 'custom'
  goal: string
  dataProduct: string
  tools: string[]
  guardrails: string[]
  executions: number
  lastRun: string
  avgLatency: string
  mcpEndpoint?: string
}

interface Session {
  id: string
  agentId: string
  agentName: string
  status: 'running' | 'completed' | 'failed'
  startTime: string
  duration: string
  toolCalls: number
  logs: SessionLog[]
}

interface SessionLog {
  id: string
  type: 'tool_call' | 'reasoning' | 'action' | 'sensor'
  tool?: string
  message: string
  timestamp: string
  count?: number
}

const agents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Multi-Table Analyzer',
    description: 'Performs complex multi-table analysis and generates insights',
    status: 'active',
    type: 'data-engineering',
    goal: 'Analyze relationships across multiple tables and generate unified views for reporting',
    dataProduct: 'Customer 360',
    tools: ['SQL Query', 'Schema Analysis', 'Join Optimizer', 'Report Generator'],
    guardrails: ['Read-only access', 'Max 100 queries/hour', 'No PII exposure'],
    executions: 1247,
    lastRun: '2 min ago',
    avgLatency: '145ms',
    mcpEndpoint: 'mcp://databao.ai/agents/multi-table-analyzer',
  },
  {
    id: 'agent-2',
    name: 'Anomaly Detector',
    description: 'Trains isolation forest models for anomaly detection',
    status: 'active',
    type: 'data-science',
    goal: 'Automatically preprocess data, train isolation forest models, and flag anomalous records',
    dataProduct: 'Transaction History',
    tools: ['Data Preprocessor', 'Isolation Forest', 'Visualization', 'Alert System'],
    guardrails: ['Human approval for flags', 'Confidence threshold 85%', 'Max 1000 records/batch'],
    executions: 8934,
    lastRun: '5 min ago',
    avgLatency: '2.3s',
    mcpEndpoint: 'mcp://databao.ai/agents/anomaly-detector',
  },
  {
    id: 'agent-3',
    name: 'NL-to-SQL Generator',
    description: 'Creates time-dimension tables for natural language queries',
    status: 'active',
    type: 'data-engineering',
    goal: 'Build and maintain time-dimension tables enabling natural language to SQL translation',
    dataProduct: 'Sales Pipeline',
    tools: ['DDL Generator', 'Time Parser', 'SQL Validator', 'Schema Sync'],
    guardrails: ['Schema changes require approval', 'Dry-run before execute'],
    executions: 456,
    lastRun: '1 hour ago',
    avgLatency: '890ms',
    mcpEndpoint: 'mcp://databao.ai/agents/nl-to-sql',
  },
  {
    id: 'agent-4',
    name: 'Data Quality Asserter',
    description: 'Automates data quality assertions and validations',
    status: 'paused',
    type: 'data-engineering',
    goal: 'Enforce data quality rules: non-null IDs, unique constraints, referential integrity',
    dataProduct: 'Inventory Master',
    tools: ['Assertion Engine', 'Constraint Checker', 'Report Generator'],
    guardrails: ['Alert only mode', 'No data modification'],
    executions: 2341,
    lastRun: '30 min ago',
    avgLatency: '156ms',
    mcpEndpoint: 'mcp://databao.ai/agents/quality-asserter',
  },
]

const sessions: Session[] = [
  {
    id: 'sess-1',
    agentId: 'agent-2',
    agentName: 'Anomaly Detector',
    status: 'running',
    startTime: '14:32:15',
    duration: '2m 34s',
    toolCalls: 12,
    logs: [
      { id: 'l1', type: 'sensor', message: 'Reading transaction data from source', timestamp: '14:32:16' },
      { id: 'l2', type: 'tool_call', tool: 'Data Preprocessor', message: 'Normalizing 15,432 records', timestamp: '14:32:18', count: 3 },
      { id: 'l3', type: 'reasoning', message: 'Identified 5 potential feature columns for model training', timestamp: '14:32:45' },
      { id: 'l4', type: 'tool_call', tool: 'Isolation Forest', message: 'Training model with contamination=0.05', timestamp: '14:33:12', count: 1 },
      { id: 'l5', type: 'action', message: 'Flagged 23 anomalous transactions for review', timestamp: '14:34:49' },
    ],
  },
  {
    id: 'sess-2',
    agentId: 'agent-1',
    agentName: 'Multi-Table Analyzer',
    status: 'completed',
    startTime: '14:28:00',
    duration: '1m 12s',
    toolCalls: 8,
    logs: [
      { id: 'l6', type: 'sensor', message: 'Scanning schema for Customer 360 dataset', timestamp: '14:28:01' },
      { id: 'l7', type: 'tool_call', tool: 'Join Optimizer', message: 'Optimizing 4-table join path', timestamp: '14:28:15', count: 2 },
      { id: 'l8', type: 'reasoning', message: 'Recommended star schema transformation', timestamp: '14:28:45' },
      { id: 'l9', type: 'action', message: 'Generated unified view with 12 dimensions', timestamp: '14:29:12' },
    ],
  },
  {
    id: 'sess-3',
    agentId: 'agent-3',
    agentName: 'NL-to-SQL Generator',
    status: 'failed',
    startTime: '13:15:00',
    duration: '0m 45s',
    toolCalls: 3,
    logs: [
      { id: 'l10', type: 'sensor', message: 'Reading date columns from Sales Pipeline', timestamp: '13:15:01' },
      { id: 'l11', type: 'tool_call', tool: 'DDL Generator', message: 'Generating time dimension table', timestamp: '13:15:20', count: 1 },
      { id: 'l12', type: 'reasoning', message: 'Error: Ambiguous date format in order_date column', timestamp: '13:15:45' },
    ],
  },
]

const agentTemplates = [
  {
    id: 'tpl-1',
    name: 'Data Engineering Agent',
    description: 'Multi-table analysis, schema management, and ETL automation',
    icon: Table,
    color: 'bao',
    tasks: ['Table joins', 'Schema sync', 'DDL generation', 'Quality assertions'],
  },
  {
    id: 'tpl-2',
    name: 'Data Science Agent',
    description: 'Anomaly detection, model training, and statistical analysis',
    icon: BrainCircuit,
    color: 'mint',
    tasks: ['Preprocessing', 'Model training', 'Visualization', 'Predictions'],
  },
  {
    id: 'tpl-3',
    name: 'Conversational Agent',
    description: 'Natural language queries and knowledge base interactions',
    icon: MessageSquare,
    color: 'amber',
    tasks: ['NL-to-SQL', 'RAG search', 'Chat responses', 'Context handling'],
  },
  {
    id: 'tpl-4',
    name: 'Custom Agent',
    description: 'Build from scratch with full control over logic and tools',
    icon: Workflow,
    color: 'coral',
    tasks: ['Custom sensors', 'Logic rules', 'Action handlers', 'Integrations'],
  },
]

const toolOptions = [
  { id: 'sql-query', name: 'SQL Query', icon: Database, category: 'Data' },
  { id: 'schema-analysis', name: 'Schema Analysis', icon: Layers, category: 'Data' },
  { id: 'preprocessor', name: 'Data Preprocessor', icon: Cpu, category: 'ML' },
  { id: 'isolation-forest', name: 'Isolation Forest', icon: FlaskConical, category: 'ML' },
  { id: 'web-search', name: 'Web Search', icon: Globe, category: 'External' },
  { id: 'calculator', name: 'Calculator', icon: Calculator, category: 'Utils' },
  { id: 'file-search', name: 'File Search', icon: FileSearch, category: 'Data' },
  { id: 'chat', name: 'Chat Response', icon: MessageSquare, category: 'NLP' },
  { id: 'visualization', name: 'Visualization', icon: BarChart3, category: 'Output' },
  { id: 'alert-system', name: 'Alert System', icon: AlertTriangle, category: 'Output' },
]

export default function AgentFactory() {
  const [activeTab, setActiveTab] = useState<'agents' | 'sessions' | 'deploy'>('agents')
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedSession, setSelectedSession] = useState<Session | null>(sessions[0])
  const [sessionFilter, setSessionFilter] = useState<'all' | 'running' | 'completed' | 'failed'>('all')

  const filteredSessions = sessions.filter(
    (s) => sessionFilter === 'all' || s.status === sessionFilter
  )

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-display font-semibold text-night-900">
                Agent Factory
              </h1>
              <span className="px-2 py-0.5 text-xs font-medium bg-bao-500/20 text-bao-600 rounded-full">
                Mission Control
              </span>
            </div>
            <p className="text-night-500 mt-1">
              Build, evaluate, and deploy AI agents powered by your certified data
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
            >
              <Plus className="w-4 h-4" />
              New Agent
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 mt-6">
          {[
            { id: 'agents', label: 'Agents', icon: Bot },
            { id: 'sessions', label: 'Sessions', icon: Terminal },
            { id: 'deploy', label: 'Deploy', icon: Rocket },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-bao-600/20 text-bao-600 border border-bao-500/30'
                  : 'text-night-500 hover:text-night-700 hover:bg-gray-100/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'agents' && (
          <AgentsTab
            agents={agents}
            onSelectAgent={setSelectedAgent}
            selectedAgent={selectedAgent}
          />
        )}
        {activeTab === 'sessions' && (
          <SessionsTab
            sessions={filteredSessions}
            selectedSession={selectedSession}
            onSelectSession={setSelectedSession}
            filter={sessionFilter}
            onFilterChange={setSessionFilter}
          />
        )}
        {activeTab === 'deploy' && <DeployTab agents={agents} />}
      </div>

      {/* Create Agent Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <CreateAgentModal
            templates={agentTemplates}
            tools={toolOptions}
            onClose={() => setShowCreateModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Agent Detail Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <AgentDetailModal
            agent={selectedAgent}
            onClose={() => setSelectedAgent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function AgentsTab({
  agents,
  onSelectAgent,
  selectedAgent,
}: {
  agents: Agent[]
  onSelectAgent: (agent: Agent) => void
  selectedAgent: Agent | null
}) {
  return (
    <div className="h-full p-6 overflow-y-auto">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-mint-500/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-mint-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-night-900">
                {agents.filter((a) => a.status === 'active').length}
              </p>
              <p className="text-sm text-night-500">Active Agents</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-bao-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-bao-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-night-900">12.9K</p>
              <p className="text-sm text-night-500">Total Executions</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-night-900">342ms</p>
              <p className="text-sm text-night-500">Avg Latency</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-coral-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-coral-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-night-900">2</p>
              <p className="text-sm text-night-500">Pending Approvals</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-2 gap-4">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectAgent(agent)}
            className="glass rounded-xl p-5 card-hover cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    agent.type === 'data-engineering'
                      ? 'bg-bao-500/20'
                      : agent.type === 'data-science'
                      ? 'bg-mint-500/20'
                      : agent.type === 'conversational'
                      ? 'bg-amber-500/20'
                      : 'bg-gray-100'
                  }`}
                >
                  {agent.type === 'data-engineering' ? (
                    <Table className="w-6 h-6 text-bao-600" />
                  ) : agent.type === 'data-science' ? (
                    <BrainCircuit className="w-6 h-6 text-mint-600" />
                  ) : agent.type === 'conversational' ? (
                    <MessageSquare className="w-6 h-6 text-amber-600" />
                  ) : (
                    <Bot className="w-6 h-6 text-night-500" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-night-900">{agent.name}</h3>
                  <p className="text-sm text-night-500">{agent.description}</p>
                </div>
              </div>
              <AgentStatusBadge status={agent.status} />
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-night-500" />
                <span className="text-night-600 line-clamp-1">{agent.goal}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Database className="w-4 h-4 text-night-500" />
                <span className="text-night-500">
                  Data: <span className="text-bao-600">{agent.dataProduct}</span>
                </span>
              </div>
            </div>

            {/* MCP Endpoint */}
            {agent.mcpEndpoint && (
              <div className="p-2 rounded-lg bg-white/50 border border-gray-200/30 mb-4">
                <div className="flex items-center justify-between">
                  <code className="text-xs font-mono text-night-600 truncate">
                    {agent.mcpEndpoint}
                  </code>
                  <button className="p-1 text-night-500 hover:text-bao-600 transition-colors">
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-200/50">
              <div className="flex items-center gap-4 text-xs text-night-500">
                <span>{agent.executions.toLocaleString()} runs</span>
                <span>•</span>
                <span>{agent.avgLatency} avg</span>
              </div>
              <div className="flex items-center gap-1">
                {agent.status === 'active' ? (
                  <button className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-500/20 transition-colors">
                    <Pause className="w-4 h-4" />
                  </button>
                ) : (
                  <button className="p-1.5 rounded-lg text-mint-600 hover:bg-mint-500/20 transition-colors">
                    <Play className="w-4 h-4" />
                  </button>
                )}
                <button className="p-1.5 rounded-lg text-night-500 hover:bg-gray-100/50 transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function SessionsTab({
  sessions,
  selectedSession,
  onSelectSession,
  filter,
  onFilterChange,
}: {
  sessions: Session[]
  selectedSession: Session | null
  onSelectSession: (session: Session) => void
  filter: 'all' | 'running' | 'completed' | 'failed'
  onFilterChange: (filter: 'all' | 'running' | 'completed' | 'failed') => void
}) {
  return (
    <div className="h-full flex">
      {/* Sessions List */}
      <div className="w-80 border-r border-gray-200/50 flex flex-col">
        <div className="p-4 border-b border-gray-200/50">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm font-semibold text-night-900">Active & Archived Sessions</h3>
          </div>
          <div className="flex items-center gap-1">
            {(['all', 'running', 'completed', 'failed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => onFilterChange(f)}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  filter === f
                    ? 'bg-bao-600/20 text-bao-600'
                    : 'text-night-500 hover:text-night-700'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSelectSession(session)}
              className={`w-full p-3 rounded-lg text-left transition-all ${
                selectedSession?.id === session.id
                  ? 'bg-bao-600/20 border border-bao-500/30'
                  : 'hover:bg-white/50 border border-transparent'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-night-900">{session.agentName}</span>
                <SessionStatusBadge status={session.status} />
              </div>
              <div className="flex items-center gap-3 text-xs text-night-500">
                <span>{session.startTime}</span>
                <span>•</span>
                <span>{session.duration}</span>
                <span>•</span>
                <span>{session.toolCalls} calls</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Session Detail */}
      <div className="flex-1 p-6 overflow-y-auto">
        {selectedSession ? (
          <div className="space-y-6">
            {/* Session Header */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold text-night-900">
                    {selectedSession.agentName}
                  </h2>
                  <SessionStatusBadge status={selectedSession.status} />
                </div>
                <p className="text-sm text-night-500 mt-1">
                  Session {selectedSession.id} • Started {selectedSession.startTime}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {selectedSession.status === 'running' && (
                  <button className="btn-secondary">
                    <Pause className="w-4 h-4" />
                    Pause
                  </button>
                )}
                <button className="btn-ghost">
                  <RotateCcw className="w-4 h-4" />
                  Restart
                </button>
              </div>
            </div>

            {/* Session Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="glass-subtle rounded-lg p-4">
                <p className="text-xs text-night-500 mb-1">Duration</p>
                <p className="text-lg font-semibold text-night-900">{selectedSession.duration}</p>
              </div>
              <div className="glass-subtle rounded-lg p-4">
                <p className="text-xs text-night-500 mb-1">Tool Calls</p>
                <p className="text-lg font-semibold text-night-900">{selectedSession.toolCalls}</p>
              </div>
              <div className="glass-subtle rounded-lg p-4">
                <p className="text-xs text-night-500 mb-1">Reasoning Steps</p>
                <p className="text-lg font-semibold text-night-900">
                  {selectedSession.logs.filter((l) => l.type === 'reasoning').length}
                </p>
              </div>
              <div className="glass-subtle rounded-lg p-4">
                <p className="text-xs text-night-500 mb-1">Actions</p>
                <p className="text-lg font-semibold text-night-900">
                  {selectedSession.logs.filter((l) => l.type === 'action').length}
                </p>
              </div>
            </div>

            {/* Grouped Logs */}
            <div className="glass rounded-xl">
              <div className="flex items-center justify-between p-4 border-b border-gray-200/50">
                <h3 className="text-sm font-semibold text-night-900">Execution Log</h3>
                <span className="text-xs text-night-500">
                  Similar tool calls grouped for clarity
                </span>
              </div>
              <div className="p-4 space-y-3">
                {selectedSession.logs.map((log) => (
                  <LogEntry key={log.id} log={log} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Terminal className="w-12 h-12 text-night-600 mx-auto mb-4" />
              <p className="text-night-500">Select a session to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function LogEntry({ log }: { log: SessionLog }) {
  const typeStyles = {
    sensor: { icon: Eye, color: 'text-bao-600', bg: 'bg-bao-500/20' },
    tool_call: { icon: Wrench, color: 'text-mint-600', bg: 'bg-mint-500/20' },
    reasoning: { icon: BrainCircuit, color: 'text-amber-600', bg: 'bg-amber-500/20' },
    action: { icon: Zap, color: 'text-coral-600', bg: 'bg-coral-500/20' },
  }

  const style = typeStyles[log.type]
  const Icon = style.icon

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/30 hover:bg-white/50 transition-colors">
      <div className={`w-8 h-8 rounded-lg ${style.bg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-4 h-4 ${style.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-medium uppercase ${style.color}`}>
            {log.type.replace('_', ' ')}
          </span>
          {log.tool && (
            <span className="px-1.5 py-0.5 text-xs bg-gray-100 text-night-600 rounded">
              {log.tool}
            </span>
          )}
          {log.count && log.count > 1 && (
            <span className="px-1.5 py-0.5 text-xs bg-gray-200 text-night-500 rounded">
              ×{log.count}
            </span>
          )}
        </div>
        <p className="text-sm text-night-700">{log.message}</p>
      </div>
      <span className="text-xs text-night-500 font-mono">{log.timestamp}</span>
    </div>
  )
}

function DeployTab({ agents }: { agents: Agent[] }) {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null)

  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold text-night-900">Deploy to Production</h2>
          <p className="text-sm text-night-500 mt-1">
            One-click deployment to managed services or CI/CD pipelines
          </p>
        </div>

        {/* Agent Selection */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-sm font-semibold text-night-900 mb-4">Select Agent to Deploy</h3>
          <div className="grid grid-cols-2 gap-3">
            {agents
              .filter((a) => a.status === 'active' || a.status === 'paused')
              .map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgentId(agent.id)}
                  className={`p-4 rounded-xl text-left transition-all ${
                    selectedAgentId === agent.id
                      ? 'bg-bao-600/20 border-2 border-bao-500/50'
                      : 'bg-gray-100/30 border-2 border-transparent hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Bot className="w-5 h-5 text-bao-600" />
                    <div>
                      <p className="font-medium text-night-900">{agent.name}</p>
                      <p className="text-xs text-night-500">{agent.executions} executions</p>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>

        {/* Deployment Options */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass rounded-xl p-6 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-bao-500/20 flex items-center justify-center mb-4 group-hover:bg-bao-500/30 transition-colors">
              <Server className="w-6 h-6 text-bao-600" />
            </div>
            <h4 className="font-semibold text-night-900 mb-2">MCP Server</h4>
            <p className="text-sm text-night-500 mb-4">
              Deploy as an MCP-compatible server for direct integration with AI tools
            </p>
            <div className="flex items-center gap-2 text-xs text-bao-600">
              <CheckCircle2 className="w-3 h-3" />
              Ready to deploy
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass rounded-xl p-6 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
              <Github className="w-6 h-6 text-night-700" />
            </div>
            <h4 className="font-semibold text-night-900 mb-2">GitHub Actions</h4>
            <p className="text-sm text-night-500 mb-4">
              Generate workflow files for CI/CD automation in your repository
            </p>
            <div className="flex items-center gap-2 text-xs text-night-500">
              <GitBranch className="w-3 h-3" />
              Configure workflow
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass rounded-xl p-6 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-mint-500/20 flex items-center justify-center mb-4 group-hover:bg-mint-500/30 transition-colors">
              <Cloud className="w-6 h-6 text-mint-600" />
            </div>
            <h4 className="font-semibold text-night-900 mb-2">Managed Cloud</h4>
            <p className="text-sm text-night-500 mb-4">
              Deploy to Databao's managed infrastructure with auto-scaling
            </p>
            <div className="flex items-center gap-2 text-xs text-mint-600">
              <Sparkles className="w-3 h-3" />
              Recommended
            </div>
          </motion.div>
        </div>

        {/* MCP Integration Info */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-bao-600" />
            <h3 className="text-sm font-semibold text-night-900">MCP Integration</h3>
          </div>
          <p className="text-sm text-night-600 mb-4">
            Agents are deployed using the Model Context Protocol (MCP), allowing them to:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-white/50 border border-gray-200/30">
              <p className="text-sm text-night-700">
                ✓ Call compatible tools directly across platforms
              </p>
            </div>
            <div className="p-3 rounded-lg bg-white/50 border border-gray-200/30">
              <p className="text-sm text-night-700">
                ✓ Swap inference models via unified endpoint
              </p>
            </div>
            <div className="p-3 rounded-lg bg-white/50 border border-gray-200/30">
              <p className="text-sm text-night-700">
                ✓ Trace and debug behavior with observability
              </p>
            </div>
            <div className="p-3 rounded-lg bg-white/50 border border-gray-200/30">
              <p className="text-sm text-night-700">
                ✓ Reuse agents across different AI platforms
              </p>
            </div>
          </div>
        </div>

        {/* Deploy Button */}
        <div className="flex justify-end">
          <button
            disabled={!selectedAgentId}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Rocket className="w-4 h-4" />
            Deploy Selected Agent
          </button>
        </div>
      </div>
    </div>
  )
}

function AgentStatusBadge({ status }: { status: Agent['status'] }) {
  const styles = {
    active: 'bg-mint-500/20 text-mint-600 border-mint-500/30',
    paused: 'bg-amber-500/20 text-amber-600 border-amber-500/30',
    error: 'bg-coral-500/20 text-coral-600 border-coral-500/30',
    draft: 'bg-gray-200/50 text-night-500 border-night-600/30',
    deploying: 'bg-bao-500/20 text-bao-600 border-bao-500/30',
  }

  const icons = {
    active: CheckCircle2,
    paused: Pause,
    error: AlertTriangle,
    draft: Clock,
    deploying: Rocket,
  }

  const Icon = icons[status]

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      <Icon className={`w-3 h-3 ${status === 'deploying' ? 'animate-pulse' : ''}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

function SessionStatusBadge({ status }: { status: Session['status'] }) {
  const styles = {
    running: 'bg-mint-500/20 text-mint-600',
    completed: 'bg-bao-500/20 text-bao-600',
    failed: 'bg-coral-500/20 text-coral-600',
  }

  const icons = {
    running: Activity,
    completed: CheckCircle2,
    failed: AlertTriangle,
  }

  const Icon = icons[status]

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      <Icon className={`w-3 h-3 ${status === 'running' ? 'animate-pulse' : ''}`} />
      {status}
    </span>
  )
}

function AgentDetailModal({ agent, onClose }: { agent: Agent; onClose: () => void }) {
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
        className="w-full max-w-3xl glass rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                agent.type === 'data-engineering'
                  ? 'bg-bao-500/20'
                  : agent.type === 'data-science'
                  ? 'bg-mint-500/20'
                  : 'bg-amber-500/20'
              }`}
            >
              {agent.type === 'data-engineering' ? (
                <Table className="w-6 h-6 text-bao-600" />
              ) : agent.type === 'data-science' ? (
                <BrainCircuit className="w-6 h-6 text-mint-600" />
              ) : (
                <MessageSquare className="w-6 h-6 text-amber-600" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-night-900">{agent.name}</h2>
              <p className="text-sm text-night-500">{agent.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-night-500 hover:text-night-700 hover:bg-gray-100/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Goal */}
          <div className="glass-subtle rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-bao-600" />
              <h3 className="text-sm font-medium text-night-600">Goal</h3>
            </div>
            <p className="text-night-900">{agent.goal}</p>
          </div>

          {/* Configuration Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-subtle rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-4 h-4 text-bao-600" />
                <h3 className="text-sm font-medium text-night-600">Data Context</h3>
              </div>
              <div className="p-3 rounded-lg bg-gray-100/50 border border-gray-200/30">
                <p className="text-white font-medium">{agent.dataProduct}</p>
                <p className="text-xs text-night-500 mt-1">Certified Data Product</p>
              </div>
            </div>

            <div className="glass-subtle rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="w-4 h-4 text-mint-600" />
                <h3 className="text-sm font-medium text-night-600">Tools</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {agent.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 py-1 text-xs font-medium bg-gray-100/50 text-night-700 rounded-lg border border-gray-200/30"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Guardrails */}
          <div className="glass-subtle rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-coral-600" />
              <h3 className="text-sm font-medium text-night-600">Guardrails</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {agent.guardrails.map((guardrail) => (
                <div
                  key={guardrail}
                  className="p-3 rounded-lg bg-coral-500/5 border border-coral-500/20"
                >
                  <p className="text-sm text-night-700">{guardrail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* MCP Endpoint */}
          {agent.mcpEndpoint && (
            <div className="glass-subtle rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-bao-600" />
                  <h3 className="text-sm font-medium text-night-600">MCP Server Endpoint</h3>
                </div>
                <span className="px-2 py-0.5 text-xs font-medium bg-mint-500/20 text-mint-600 rounded">
                  Live
                </span>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 text-sm font-mono bg-white text-night-700 rounded-lg border border-gray-200/30">
                  {agent.mcpEndpoint}
                </code>
                <button className="p-2 rounded-lg text-night-500 hover:text-night-700 hover:bg-gray-100/50 transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg text-night-500 hover:text-night-700 hover:bg-gray-100/50 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-white/30">
              <p className="text-2xl font-semibold text-night-900">{agent.executions.toLocaleString()}</p>
              <p className="text-xs text-night-500">Total Executions</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/30">
              <p className="text-2xl font-semibold text-night-900">{agent.avgLatency}</p>
              <p className="text-xs text-night-500">Avg Latency</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/30">
              <p className="text-2xl font-semibold text-night-900">{agent.lastRun}</p>
              <p className="text-xs text-night-500">Last Run</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200/50 bg-white/20">
          <button className="btn-ghost text-coral-600 hover:text-coral-300">
            <Trash2 className="w-4 h-4" />
            Delete Agent
          </button>
          <div className="flex items-center gap-2">
            <button className="btn-secondary">
              <Settings className="w-4 h-4" />
              Configure
            </button>
            {agent.status === 'active' ? (
              <button className="btn-primary bg-amber-600 hover:bg-amber-500">
                <Pause className="w-4 h-4" />
                Pause Agent
              </button>
            ) : (
              <button className="btn-primary">
                <Play className="w-4 h-4" />
                Start Agent
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function CreateAgentModal({
  templates,
  tools,
  onClose,
}: {
  templates: typeof agentTemplates
  tools: typeof toolOptions
  onClose: () => void
}) {
  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [selectedTools, setSelectedTools] = useState<string[]>([])

  const toggleTool = (toolId: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
    )
  }

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
        className="w-full max-w-3xl glass rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          <div>
            <h2 className="text-xl font-semibold text-night-900">Create New Agent</h2>
            <p className="text-sm text-night-500 mt-1">Step {step} of 4</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-night-500 hover:text-night-700 hover:bg-gray-100/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 pt-4">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    s < step
                      ? 'bg-mint-500 text-white'
                      : s === step
                      ? 'bg-bao-600 text-white'
                      : 'bg-gray-100 text-night-500'
                  }`}
                >
                  {s < step ? <CheckCircle2 className="w-4 h-4" /> : s}
                </div>
                {s < 4 && (
                  <div className={`flex-1 h-0.5 ${s < step ? 'bg-mint-500' : 'bg-gray-100'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-night-500">
            <span>Template</span>
            <span>Goal</span>
            <span>Tools</span>
            <span>Guardrails</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-night-600">
                Choose an agent template to get started quickly:
              </p>
              <div className="grid grid-cols-2 gap-4">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`p-5 rounded-xl text-left transition-all ${
                      selectedTemplate === tpl.id
                        ? 'bg-bao-600/20 border-2 border-bao-500/50'
                        : 'bg-gray-100/30 border-2 border-transparent hover:border-gray-200'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                        tpl.color === 'bao'
                          ? 'bg-bao-500/20'
                          : tpl.color === 'mint'
                          ? 'bg-mint-500/20'
                          : tpl.color === 'amber'
                          ? 'bg-amber-500/20'
                          : 'bg-coral-500/20'
                      }`}
                    >
                      <tpl.icon
                        className={`w-5 h-5 ${
                          tpl.color === 'bao'
                            ? 'text-bao-600'
                            : tpl.color === 'mint'
                            ? 'text-mint-600'
                            : tpl.color === 'amber'
                            ? 'text-amber-600'
                            : 'text-coral-600'
                        }`}
                      />
                    </div>
                    <h4 className="font-semibold text-night-900 mb-1">{tpl.name}</h4>
                    <p className="text-sm text-night-500 mb-3">{tpl.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {tpl.tasks.map((task) => (
                        <span key={task} className="px-2 py-0.5 text-xs bg-gray-100 text-night-600 rounded">
                          {task}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-night-600 mb-2">
                  Agent Name
                </label>
                <input type="text" placeholder="e.g., Customer Churn Predictor" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-night-600 mb-2">
                  What should this agent accomplish?
                </label>
                <textarea
                  placeholder="Describe the agent's goal in detail. Be specific about inputs, outputs, and success criteria..."
                  rows={4}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-night-600 mb-2">
                  Data Product Context
                </label>
                <select className="w-full">
                  <option value="">Select a data product...</option>
                  <option>Customer 360</option>
                  <option>Transaction History</option>
                  <option>Sales Pipeline</option>
                  <option>Inventory Master</option>
                </select>
              </div>
              <div className="p-4 rounded-xl bg-bao-500/10 border border-bao-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-bao-600" />
                  <span className="text-sm font-medium text-bao-600">AI Suggestion</span>
                </div>
                <p className="text-sm text-night-600">
                  Based on your template choice, I recommend including preprocessing and validation steps
                  before the main analysis phase.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-night-600">
                Configure the tools this agent can use. These define its "action" capabilities:
              </p>
              <div className="grid grid-cols-3 gap-3">
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => toggleTool(tool.id)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      selectedTools.includes(tool.id)
                        ? 'bg-bao-600/20 border-2 border-bao-500/50'
                        : 'bg-gray-100/30 border-2 border-transparent hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <tool.icon
                        className={`w-5 h-5 ${
                          selectedTools.includes(tool.id) ? 'text-bao-600' : 'text-night-500'
                        }`}
                      />
                      <div>
                        <p className="font-medium text-night-900 text-sm">{tool.name}</p>
                        <p className="text-xs text-night-500">{tool.category}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-white/50 border border-gray-200/30">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-bao-600" />
                  <span className="text-sm font-medium text-night-600">MCP Compatibility</span>
                </div>
                <p className="text-xs text-night-500">
                  All selected tools are MCP-compatible and can be called from external AI platforms.
                </p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <p className="text-sm text-night-600">
                Configure safety guardrails. These are non-negotiable constraints:
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-gray-100/30 border border-gray-200/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-night-900">Human Approval Required</span>
                    <button className="w-10 h-6 rounded-full bg-mint-500 relative">
                      <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                    </button>
                  </div>
                  <p className="text-xs text-night-500">
                    High-risk actions (data modifications, external calls) require human validation
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gray-100/30 border border-gray-200/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-night-900">Rate Limiting</span>
                    <select className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-1">
                      <option>100 requests/hour</option>
                      <option>500 requests/hour</option>
                      <option>Unlimited</option>
                    </select>
                  </div>
                  <p className="text-xs text-night-500">Maximum number of tool calls per hour</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-100/30 border border-gray-200/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-night-900">Audit Logging</span>
                    <button className="w-10 h-6 rounded-full bg-mint-500 relative">
                      <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                    </button>
                  </div>
                  <p className="text-xs text-night-500">
                    Log all reasoning steps, tool calls, and actions for traceability
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gray-100/30 border border-gray-200/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-night-900">Data Access Scope</span>
                    <select className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-1">
                      <option>Read-only</option>
                      <option>Read-write (with approval)</option>
                      <option>Full access</option>
                    </select>
                  </div>
                  <p className="text-xs text-night-500">Define what operations the agent can perform</p>
                </div>
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
            onClick={() => (step < 4 ? setStep(step + 1) : onClose())}
            disabled={step === 1 && !selectedTemplate}
            className="btn-primary disabled:opacity-50"
          >
            {step === 4 ? 'Create & Deploy Agent' : 'Continue'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
