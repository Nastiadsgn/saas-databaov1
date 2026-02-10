import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Eye,
  Sparkles,
  ArrowRight,
  Filter,
  RefreshCw,
} from 'lucide-react'

interface DataProduct {
  id: string
  name: string
  source: string
  aiScore: number
  dimensions: {
    accuracy: number
    completeness: number
    consistency: number
    timeliness: number
    validity: number
  }
  issues: number
  lastEvaluated: string
  status: 'certified' | 'pending' | 'needs-work'
}

const dataProducts: DataProduct[] = [
  {
    id: '1',
    name: 'Customer 360',
    source: 'Snowflake Warehouse',
    aiScore: 94,
    dimensions: { accuracy: 96, completeness: 92, consistency: 94, timeliness: 91, validity: 97 },
    issues: 2,
    lastEvaluated: '10 min ago',
    status: 'certified',
  },
  {
    id: '2',
    name: 'Sales Pipeline',
    source: 'Production PostgreSQL',
    aiScore: 78,
    dimensions: { accuracy: 82, completeness: 68, consistency: 85, timeliness: 74, validity: 81 },
    issues: 8,
    lastEvaluated: '1 hour ago',
    status: 'needs-work',
  },
  {
    id: '3',
    name: 'Inventory Master',
    source: 'Production PostgreSQL',
    aiScore: 89,
    dimensions: { accuracy: 91, completeness: 87, consistency: 92, timeliness: 85, validity: 90 },
    issues: 4,
    lastEvaluated: '30 min ago',
    status: 'pending',
  },
  {
    id: '4',
    name: 'Product Catalog',
    source: 'MongoDB Cluster',
    aiScore: 91,
    dimensions: { accuracy: 93, completeness: 89, consistency: 94, timeliness: 88, validity: 91 },
    issues: 3,
    lastEvaluated: '2 hours ago',
    status: 'certified',
  },
  {
    id: '5',
    name: 'User Behavior',
    source: 'BigQuery',
    aiScore: 85,
    dimensions: { accuracy: 88, completeness: 82, consistency: 87, timeliness: 80, validity: 88 },
    issues: 5,
    lastEvaluated: '45 min ago',
    status: 'pending',
  },
]

export default function Evaluation() {
  const [selectedProduct, setSelectedProduct] = useState<DataProduct | null>(dataProducts[0])
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredProducts = dataProducts.filter(
    (p) => filterStatus === 'all' || p.status === filterStatus
  )

  return (
    <div className="h-full flex">
      {/* Left Panel - Product List */}
      <div className="w-96 border-r border-gray-200/50 flex flex-col">
        <div className="p-4 border-b border-gray-200/50">
          <h2 className="text-lg font-semibold text-night-900 mb-4">Data Products</h2>
          <div className="flex items-center gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 text-sm"
            >
              <option value="all">All Status</option>
              <option value="certified">Certified</option>
              <option value="pending">Pending Review</option>
              <option value="needs-work">Needs Work</option>
            </select>
            <button className="btn-ghost p-2">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredProducts.map((product) => (
            <motion.button
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              whileHover={{ x: 4 }}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                selectedProduct?.id === product.id
                  ? 'bg-bao-600/20 border border-bao-500/30'
                  : 'bg-white/30 border border-transparent hover:bg-white/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-night-900">{product.name}</h3>
                  <p className="text-xs text-night-500 mt-1">{product.source}</p>
                </div>
                <ScoreBadge score={product.aiScore} size="sm" />
              </div>
              <div className="flex items-center gap-2 mt-3">
                <StatusTag status={product.status} />
                {product.issues > 0 && (
                  <span className="text-xs text-night-500">
                    {product.issues} issues
                  </span>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Right Panel - Evaluation Details */}
      <div className="flex-1 overflow-y-auto p-6">
        {selectedProduct ? (
          <motion.div
            key={selectedProduct.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-display font-semibold text-night-900">
                    {selectedProduct.name}
                  </h1>
                  <StatusTag status={selectedProduct.status} />
                </div>
                <p className="text-night-500 mt-1">
                  Last evaluated {selectedProduct.lastEvaluated} • {selectedProduct.source}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-secondary">
                  <RefreshCw className="w-4 h-4" />
                  Re-evaluate
                </button>
                {selectedProduct.status !== 'certified' && (
                  <button className="btn-primary">
                    <Sparkles className="w-4 h-4" />
                    Certify
                  </button>
                )}
              </div>
            </div>

            {/* AI-Readiness Score */}
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-1 glass rounded-xl p-6 flex flex-col items-center justify-center">
                <ScoreBadge score={selectedProduct.aiScore} size="lg" />
                <h3 className="text-lg font-semibold text-night-900 mt-4">AI-Readiness Score</h3>
                <p className="text-sm text-night-500 mt-1">
                  {selectedProduct.aiScore >= 90
                    ? 'Excellent - Ready for production'
                    : selectedProduct.aiScore >= 80
                    ? 'Good - Minor improvements needed'
                    : 'Needs attention - Review issues'}
                </p>
              </div>

              {/* Dimension Breakdown */}
              <div className="col-span-2 glass rounded-xl p-6">
                <h3 className="text-lg font-semibold text-night-900 mb-4">Quality Dimensions</h3>
                <div className="space-y-4">
                  {Object.entries(selectedProduct.dimensions).map(([key, value]) => (
                    <DimensionBar
                      key={key}
                      name={key.charAt(0).toUpperCase() + key.slice(1)}
                      score={value}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Issues & Recommendations */}
            <div className="grid grid-cols-2 gap-6">
              {/* Issues */}
              <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-night-900">Detected Issues</h3>
                  <span className="px-2 py-1 text-xs font-medium bg-coral-500/20 text-coral-600 rounded-full">
                    {selectedProduct.issues} issues
                  </span>
                </div>
                <div className="space-y-3">
                  <IssueCard
                    type="warning"
                    title="Missing values in customer_email"
                    description="8.3% of records have null values"
                    column="customer_email"
                  />
                  <IssueCard
                    type="error"
                    title="Duplicate records detected"
                    description="142 potential duplicates found"
                    column="customer_id"
                  />
                  <IssueCard
                    type="warning"
                    title="Inconsistent date formats"
                    description="Mixed ISO and US date formats"
                    column="created_at"
                  />
                </div>
              </div>

              {/* Recommendations */}
              <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-night-900">AI Recommendations</h3>
                  <Sparkles className="w-5 h-5 text-bao-600" />
                </div>
                <div className="space-y-3">
                  <RecommendationCard
                    priority="high"
                    title="Apply email validation rule"
                    description="Add semantic validation to filter invalid email formats"
                    impact="+3% accuracy"
                  />
                  <RecommendationCard
                    priority="medium"
                    title="Enable deduplication"
                    description="Use fuzzy matching to identify and merge duplicates"
                    impact="+5% consistency"
                  />
                  <RecommendationCard
                    priority="low"
                    title="Standardize date formats"
                    description="Convert all dates to ISO 8601 format"
                    impact="+2% validity"
                  />
                </div>
              </div>
            </div>

            {/* Data Preview */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-night-900">Data Preview</h3>
                <button className="btn-ghost text-sm">
                  <Eye className="w-4 h-4" />
                  View Full Dataset
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-night-500 font-medium">customer_id</th>
                      <th className="py-3 px-4 text-left text-night-500 font-medium">name</th>
                      <th className="py-3 px-4 text-left text-night-500 font-medium">email</th>
                      <th className="py-3 px-4 text-left text-night-500 font-medium">created_at</th>
                      <th className="py-3 px-4 text-left text-night-500 font-medium">status</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-xs">
                    <tr className="border-b border-gray-200/50">
                      <td className="py-3 px-4 text-night-700">cust_001</td>
                      <td className="py-3 px-4 text-night-700">John Smith</td>
                      <td className="py-3 px-4 text-night-700">john.smith@email.com</td>
                      <td className="py-3 px-4 text-night-700">2024-01-15</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 bg-mint-500/20 text-mint-600 rounded">active</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200/50 bg-coral-500/5">
                      <td className="py-3 px-4 text-night-700">cust_002</td>
                      <td className="py-3 px-4 text-night-700">Jane Doe</td>
                      <td className="py-3 px-4 text-coral-600">
                        <span className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          NULL
                        </span>
                      </td>
                      <td className="py-3 px-4 text-night-700">01/16/2024</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 bg-mint-500/20 text-mint-600 rounded">active</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200/50">
                      <td className="py-3 px-4 text-night-700">cust_003</td>
                      <td className="py-3 px-4 text-night-700">Bob Johnson</td>
                      <td className="py-3 px-4 text-night-700">bob.j@company.io</td>
                      <td className="py-3 px-4 text-night-700">2024-01-17</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 bg-amber-500/20 text-amber-600 rounded">pending</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <FlaskConical className="w-12 h-12 text-night-600 mx-auto mb-4" />
              <p className="text-night-500">Select a data product to evaluate</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ScoreBadge({ score, size = 'md' }: { score: number; size?: 'sm' | 'md' | 'lg' }) {
  const getColor = (s: number) => {
    if (s >= 90) return { stroke: '#22c55e', bg: 'bg-mint-500/20', text: 'text-mint-600' }
    if (s >= 80) return { stroke: '#f59e0b', bg: 'bg-amber-500/20', text: 'text-amber-600' }
    return { stroke: '#f43f5e', bg: 'bg-coral-500/20', text: 'text-coral-600' }
  }

  const colors = getColor(score)
  const sizes = {
    sm: { container: 'w-12 h-12', text: 'text-sm', strokeWidth: 3 },
    md: { container: 'w-20 h-20', text: 'text-xl', strokeWidth: 4 },
    lg: { container: 'w-32 h-32', text: 'text-3xl', strokeWidth: 6 },
  }

  const s = sizes[size]

  return (
    <div className={`relative ${s.container}`}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth={s.strokeWidth}
          className="text-night-800"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={colors.stroke}
          strokeWidth={s.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${(score / 100) * 283} 283`}
          className="score-ring"
        />
      </svg>
      <div className={`absolute inset-0 flex items-center justify-center ${s.text} font-bold ${colors.text}`}>
        {score}
      </div>
    </div>
  )
}

function StatusTag({ status }: { status: DataProduct['status'] }) {
  const styles = {
    certified: 'bg-mint-500/20 text-mint-600 border-mint-500/30',
    pending: 'bg-amber-500/20 text-amber-600 border-amber-500/30',
    'needs-work': 'bg-coral-500/20 text-coral-600 border-coral-500/30',
  }

  const icons = {
    certified: CheckCircle2,
    pending: FlaskConical,
    'needs-work': AlertTriangle,
  }

  const labels = {
    certified: 'Certified',
    pending: 'Pending Review',
    'needs-work': 'Needs Work',
  }

  const Icon = icons[status]

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      <Icon className="w-3 h-3" />
      {labels[status]}
    </span>
  )
}

function DimensionBar({ name, score }: { name: string; score: number }) {
  const getColor = (s: number) => {
    if (s >= 90) return 'bg-mint-500'
    if (s >= 80) return 'bg-amber-500'
    return 'bg-coral-500'
  }

  return (
    <div className="flex items-center gap-4">
      <span className="w-28 text-sm text-night-600">{name}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${getColor(score)}`}
        />
      </div>
      <span className="w-10 text-sm font-medium text-night-700 text-right">{score}%</span>
    </div>
  )
}

function IssueCard({
  type,
  title,
  description,
  column,
}: {
  type: 'warning' | 'error'
  title: string
  description: string
  column: string
}) {
  return (
    <div
      className={`p-3 rounded-lg border ${
        type === 'error'
          ? 'bg-coral-500/10 border-coral-500/20'
          : 'bg-amber-500/10 border-amber-500/20'
      }`}
    >
      <div className="flex items-start gap-3">
        {type === 'error' ? (
          <XCircle className="w-4 h-4 text-coral-600 mt-0.5" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
        )}
        <div>
          <p className={`text-sm font-medium ${type === 'error' ? 'text-coral-600' : 'text-amber-600'}`}>
            {title}
          </p>
          <p className="text-xs text-night-500 mt-1">{description}</p>
          <span className="inline-block mt-2 px-2 py-0.5 text-xs font-mono bg-gray-100 text-night-600 rounded">
            {column}
          </span>
        </div>
      </div>
    </div>
  )
}

function RecommendationCard({
  priority,
  title,
  description,
  impact,
}: {
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  impact: string
}) {
  const priorityStyles = {
    high: 'border-coral-500/30 bg-coral-500/5',
    medium: 'border-amber-500/30 bg-amber-500/5',
    low: 'border-bao-500/30 bg-bao-500/5',
  }

  const priorityLabels = {
    high: { text: 'High', class: 'text-coral-600 bg-coral-500/20' },
    medium: { text: 'Medium', class: 'text-amber-600 bg-amber-500/20' },
    low: { text: 'Low', class: 'text-bao-600 bg-bao-500/20' },
  }

  return (
    <div className={`p-3 rounded-lg border ${priorityStyles[priority]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-medium text-night-900">{title}</p>
            <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${priorityLabels[priority].class}`}>
              {priorityLabels[priority].text}
            </span>
          </div>
          <p className="text-xs text-night-500">{description}</p>
        </div>
        <span className="flex items-center gap-1 text-xs text-mint-600">
          <TrendingUp className="w-3 h-3" />
          {impact}
        </span>
      </div>
      <button className="mt-2 text-xs text-bao-600 hover:text-bao-600 flex items-center gap-1">
        Apply fix <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  )
}
