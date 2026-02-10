import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  Bot,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Download,
  RefreshCw,
  Shield,
  User,
  Zap,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'

const latencyData = [
  { time: '00:00', p50: 120, p95: 245, p99: 380 },
  { time: '02:00', p50: 115, p95: 230, p99: 350 },
  { time: '04:00', p50: 105, p95: 210, p99: 320 },
  { time: '06:00', p50: 130, p95: 280, p99: 420 },
  { time: '08:00', p50: 180, p95: 360, p99: 520 },
  { time: '10:00', p50: 220, p95: 420, p99: 650 },
  { time: '12:00', p50: 250, p95: 480, p99: 720 },
  { time: '14:00', p50: 235, p95: 450, p99: 680 },
  { time: '16:00', p50: 200, p95: 380, p99: 560 },
  { time: '18:00', p50: 175, p95: 340, p99: 490 },
  { time: '20:00', p50: 150, p95: 290, p99: 420 },
  { time: '22:00', p50: 125, p95: 250, p99: 370 },
]

const successRateData = [
  { time: '00:00', rate: 99.8 },
  { time: '04:00', rate: 99.9 },
  { time: '08:00', rate: 99.2 },
  { time: '12:00', rate: 98.5 },
  { time: '16:00', rate: 99.1 },
  { time: '20:00', rate: 99.7 },
]

interface AuditLog {
  id: string
  timestamp: string
  agent: string
  action: string
  user: string
  status: 'success' | 'warning' | 'error'
  details: string
  duration: string
}

const auditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2024-01-20 14:32:15',
    agent: 'Customer Support Bot',
    action: 'RAG Query',
    user: 'system',
    status: 'success',
    details: 'Retrieved 3 relevant documents for query "refund policy"',
    duration: '234ms',
  },
  {
    id: '2',
    timestamp: '2024-01-20 14:31:48',
    agent: 'Inventory Monitor',
    action: 'Database Query',
    user: 'system',
    status: 'success',
    details: 'Checked stock levels for 42 SKUs',
    duration: '156ms',
  },
  {
    id: '3',
    timestamp: '2024-01-20 14:31:22',
    agent: 'Fraud Detector',
    action: 'Human Approval Request',
    user: 'john.doe@company.com',
    status: 'warning',
    details: 'Transaction #TXN-4521 flagged for manual review',
    duration: '45ms',
  },
  {
    id: '4',
    timestamp: '2024-01-20 14:30:55',
    agent: 'Sales Forecaster',
    action: 'ML Inference',
    user: 'system',
    status: 'error',
    details: 'Model timeout: prediction exceeded 30s threshold',
    duration: '30.1s',
  },
  {
    id: '5',
    timestamp: '2024-01-20 14:30:12',
    agent: 'Customer Support Bot',
    action: 'Chat Response',
    user: 'customer@email.com',
    status: 'success',
    details: 'Generated response with 94% confidence score',
    duration: '890ms',
  },
  {
    id: '6',
    timestamp: '2024-01-20 14:29:45',
    agent: 'Inventory Monitor',
    action: 'Alert Triggered',
    user: 'system',
    status: 'warning',
    details: 'Low stock alert: SKU-2847 below threshold',
    duration: '12ms',
  },
]

export default function Monitoring() {
  const [timeRange, setTimeRange] = useState('24h')
  const [logFilter, setLogFilter] = useState<'all' | 'success' | 'warning' | 'error'>('all')

  const filteredLogs = auditLogs.filter(
    (log) => logFilter === 'all' || log.status === logFilter
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold text-night-900">
            Monitoring & Governance
          </h1>
          <p className="text-night-500 mt-1">
            Real-time performance metrics and audit trail
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="text-sm"
          >
            <option value="1h">Last hour</option>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="btn-primary">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-mint-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-mint-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-night-900">99.4%</p>
              <p className="text-sm text-night-500">Uptime</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass rounded-xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-bao-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-bao-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-night-900">25,847</p>
              <p className="text-sm text-night-500">Requests (24h)</p>
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
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-night-900">178ms</p>
              <p className="text-sm text-night-500">Avg Latency</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-coral-500/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-coral-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-night-900">12</p>
              <p className="text-sm text-night-500">Errors (24h)</p>
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
            <div className="w-10 h-10 rounded-lg bg-mint-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-mint-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-night-900">100%</p>
              <p className="text-sm text-night-500">Audit Coverage</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Latency Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-night-900">Response Latency</h3>
              <p className="text-sm text-night-500">P50, P95, P99 percentiles</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-mint-500" />
                P50
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-amber-500" />
                P95
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-coral-500" />
                P99
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={latencyData}>
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#688dc4', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#688dc4', fontSize: 12 }}
                tickFormatter={(value) => `${value}ms`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a2744',
                  border: '1px solid #283d63',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#9db5da' }}
                formatter={(value: number) => [`${value}ms`]}
              />
              <Line
                type="monotone"
                dataKey="p50"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="p95"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="p99"
                stroke="#f43f5e"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Success Rate Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-night-900">Success Rate</h3>
              <p className="text-sm text-night-500">Percentage of successful requests</p>
            </div>
            <span className="text-2xl font-semibold text-mint-600">99.2%</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={successRateData}>
              <defs>
                <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#688dc4', fontSize: 12 }}
              />
              <YAxis
                domain={[95, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#688dc4', fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a2744',
                  border: '1px solid #283d63',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value}%`, 'Success Rate']}
              />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#successGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Audit Log */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass rounded-xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          <div>
            <h3 className="text-lg font-semibold text-night-900">Audit Trail</h3>
            <p className="text-sm text-night-500">Complete log of all agent actions</p>
          </div>
          <div className="flex items-center gap-2">
            {(['all', 'success', 'warning', 'error'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setLogFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  logFilter === filter
                    ? 'bg-bao-600/20 text-bao-600 border border-bao-500/30'
                    : 'text-night-500 hover:text-night-700 border border-transparent'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200/50">
                <th className="py-3 px-6 text-left text-xs font-medium text-night-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-night-500 uppercase tracking-wider">
                  Agent
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-night-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-night-500 uppercase tracking-wider">
                  User/Initiator
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-night-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-night-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-night-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-gray-200/30 hover:bg-white/30 transition-colors"
                >
                  <td className="py-4 px-6 text-sm font-mono text-night-600">
                    {log.timestamp}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-bao-600" />
                      <span className="text-sm text-white">{log.agent}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-night-700">{log.action}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {log.user === 'system' ? (
                        <Zap className="w-3 h-3 text-night-500" />
                      ) : (
                        <User className="w-3 h-3 text-night-500" />
                      )}
                      <span className="text-sm text-night-500">{log.user}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <LogStatusBadge status={log.status} />
                  </td>
                  <td className="py-4 px-6 text-sm font-mono text-night-600">
                    {log.duration}
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-night-500 max-w-xs truncate">{log.details}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-gray-200/50">
          <p className="text-sm text-night-500">Showing {filteredLogs.length} entries</p>
          <button className="text-sm text-bao-600 hover:text-bao-600 transition-colors">
            Load more
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function LogStatusBadge({ status }: { status: AuditLog['status'] }) {
  const styles = {
    success: 'bg-mint-500/20 text-mint-600',
    warning: 'bg-amber-500/20 text-amber-600',
    error: 'bg-coral-500/20 text-coral-600',
  }

  const icons = {
    success: CheckCircle2,
    warning: AlertTriangle,
    error: XCircle,
  }

  const Icon = icons[status]

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  )
}
