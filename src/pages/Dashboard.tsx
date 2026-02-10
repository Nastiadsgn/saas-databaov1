import { motion } from 'framer-motion'
import {
  Database,
  Bot,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Clock,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Shield,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

const activityData = [
  { time: '00:00', queries: 120, agents: 45 },
  { time: '04:00', queries: 80, agents: 30 },
  { time: '08:00', queries: 250, agents: 89 },
  { time: '12:00', queries: 380, agents: 156 },
  { time: '16:00', queries: 420, agents: 178 },
  { time: '20:00', queries: 280, agents: 98 },
  { time: '24:00', queries: 150, agents: 52 },
]

const qualityData = [
  { name: 'Accuracy', score: 94 },
  { name: 'Completeness', score: 87 },
  { name: 'Consistency', score: 91 },
  { name: 'Timeliness', score: 88 },
  { name: 'Validity', score: 96 },
]

const recentActivity = [
  { id: 1, action: 'Agent deployed', target: 'Inventory Monitor', time: '2 min ago', status: 'success' },
  { id: 2, action: 'Data product certified', target: 'Customer 360', time: '15 min ago', status: 'success' },
  { id: 3, action: 'Quality alert', target: 'Sales Pipeline', time: '1 hour ago', status: 'warning' },
  { id: 4, action: 'Connection synced', target: 'PostgreSQL Prod', time: '2 hours ago', status: 'success' },
  { id: 5, action: 'Agent paused', target: 'Fraud Detector', time: '3 hours ago', status: 'info' },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold text-night-900">
            Good afternoon, Data Steward
          </h1>
          <p className="text-night-500 mt-1">
            Here's what's happening with your data ecosystem
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <Clock className="w-4 h-4" />
            Last 24 hours
          </button>
          <button className="btn-primary">
            <Zap className="w-4 h-4" />
            Quick Actions
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-4 gap-4"
      >
        <motion.div variants={item} className="glass rounded-xl p-5 card-hover">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-bao-500/20 flex items-center justify-center">
              <Database className="w-5 h-5 text-bao-600" />
            </div>
            <span className="flex items-center gap-1 text-xs text-mint-600">
              <ArrowUpRight className="w-3 h-3" />
              +12%
            </span>
          </div>
          <p className="mt-4 text-2xl font-semibold text-night-900">24</p>
          <p className="text-sm text-night-500">Data Products</p>
        </motion.div>

        <motion.div variants={item} className="glass rounded-xl p-5 card-hover">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-mint-500/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-mint-600" />
            </div>
            <span className="flex items-center gap-1 text-xs text-mint-600">
              <ArrowUpRight className="w-3 h-3" />
              +8%
            </span>
          </div>
          <p className="mt-4 text-2xl font-semibold text-night-900">12</p>
          <p className="text-sm text-night-500">Active Agents</p>
        </motion.div>

        <motion.div variants={item} className="glass rounded-xl p-5 card-hover">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-amber-600" />
            </div>
            <span className="flex items-center gap-1 text-xs text-coral-600">
              <ArrowDownRight className="w-3 h-3" />
              -2%
            </span>
          </div>
          <p className="mt-4 text-2xl font-semibold text-night-900">91.2%</p>
          <p className="text-sm text-night-500">Avg. AI-Readiness</p>
        </motion.div>

        <motion.div variants={item} className="glass rounded-xl p-5 card-hover">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-coral-500/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-coral-600" />
            </div>
            <span className="text-xs text-night-500">Needs attention</span>
          </div>
          <p className="mt-4 text-2xl font-semibold text-night-900">3</p>
          <p className="text-sm text-night-500">Quality Alerts</p>
        </motion.div>
      </motion.div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-2 glass rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-night-900">Platform Activity</h3>
              <p className="text-sm text-night-500">Queries and agent executions over time</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-bao-500" />
                Queries
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-mint-500" />
                Agent Actions
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2aa3ff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2aa3ff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAgents" x1="0" y1="0" x2="0" y2="1">
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
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#688dc4', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a2744',
                  border: '1px solid #283d63',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#9db5da' }}
              />
              <Area
                type="monotone"
                dataKey="queries"
                stroke="#2aa3ff"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorQueries)"
              />
              <Area
                type="monotone"
                dataKey="agents"
                stroke="#22c55e"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorAgents)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Quality Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-night-900">Quality Dimensions</h3>
            <TrendingUp className="w-5 h-5 text-mint-600" />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={qualityData} layout="vertical">
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9db5da', fontSize: 12 }}
                width={90}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a2744',
                  border: '1px solid #283d63',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value}%`, 'Score']}
              />
              <Bar
                dataKey="score"
                fill="#2aa3ff"
                radius={[0, 4, 4, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-2 glass rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-night-900">Recent Activity</h3>
            <button className="text-sm text-bao-600 hover:text-bao-600 transition-colors">
              View all
            </button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-white/30 hover:bg-white/50 transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activity.status === 'success'
                      ? 'bg-mint-500/20'
                      : activity.status === 'warning'
                      ? 'bg-amber-500/20'
                      : 'bg-bao-500/20'
                  }`}
                >
                  <Activity
                    className={`w-4 h-4 ${
                      activity.status === 'success'
                        ? 'text-mint-600'
                        : activity.status === 'warning'
                        ? 'text-amber-600'
                        : 'text-bao-600'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">{activity.action}</p>
                  <p className="text-xs text-night-500">{activity.target}</p>
                </div>
                <span className="text-xs text-night-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Guardrails Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-night-900">Guardrails Status</h3>
            <Shield className="w-5 h-5 text-mint-600" />
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-mint-500/10 border border-mint-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-mint-600">Permissions</span>
                <span className="text-xs text-mint-600">Active</span>
              </div>
              <p className="text-xs text-night-500">All agents operating within user permissions</p>
            </div>
            <div className="p-4 rounded-lg bg-mint-500/10 border border-mint-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-mint-600">Audit Logging</span>
                <span className="text-xs text-mint-600">100%</span>
              </div>
              <p className="text-xs text-night-500">All decisions traced and logged</p>
            </div>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-amber-600">Human Approval</span>
                <span className="text-xs text-amber-600">2 pending</span>
              </div>
              <p className="text-xs text-night-500">High-risk actions awaiting review</p>
            </div>
            <div className="p-4 rounded-lg bg-mint-500/10 border border-mint-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-mint-600">Data Isolation</span>
                <span className="text-xs text-mint-600">Enforced</span>
              </div>
              <p className="text-xs text-night-500">Multi-tenant separation verified</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
