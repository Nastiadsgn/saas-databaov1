import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Layers3,
  Plus,
  Search,
  Edit3,
  Trash2,
  Link,
  Hash,
  Type,
  Calendar,
  ToggleLeft,
  ChevronRight,
  ChevronDown,
  BookOpen,
  GitBranch,
  BarChart2,
  Save,
  X,
  Sparkles,
} from 'lucide-react'

interface SemanticEntity {
  id: string
  name: string
  type: 'entity' | 'metric' | 'dimension'
  description: string
  source: string
  fields: SemanticField[]
  relationships: string[]
}

interface SemanticField {
  id: string
  name: string
  dataType: 'string' | 'number' | 'date' | 'boolean'
  businessName: string
  description: string
  formula?: string
}

const entities: SemanticEntity[] = [
  {
    id: '1',
    name: 'Customer',
    type: 'entity',
    description: 'Core customer entity representing all business customers',
    source: 'customers table',
    fields: [
      { id: 'f1', name: 'customer_id', dataType: 'string', businessName: 'Customer ID', description: 'Unique identifier' },
      { id: 'f2', name: 'full_name', dataType: 'string', businessName: 'Full Name', description: 'Customer full name' },
      { id: 'f3', name: 'email', dataType: 'string', businessName: 'Email Address', description: 'Primary contact email' },
      { id: 'f4', name: 'created_at', dataType: 'date', businessName: 'Registration Date', description: 'Account creation date' },
      { id: 'f5', name: 'is_active', dataType: 'boolean', businessName: 'Active Status', description: 'Whether customer is active' },
    ],
    relationships: ['Order', 'Subscription'],
  },
  {
    id: '2',
    name: 'Order',
    type: 'entity',
    description: 'Sales orders placed by customers',
    source: 'orders table',
    fields: [
      { id: 'f6', name: 'order_id', dataType: 'string', businessName: 'Order ID', description: 'Unique order identifier' },
      { id: 'f7', name: 'total_amount', dataType: 'number', businessName: 'Order Total', description: 'Total order value' },
      { id: 'f8', name: 'order_date', dataType: 'date', businessName: 'Order Date', description: 'When order was placed' },
    ],
    relationships: ['Customer', 'Product'],
  },
  {
    id: '3',
    name: 'Total Revenue',
    type: 'metric',
    description: 'Sum of all order totals',
    source: 'orders.total_amount',
    fields: [
      { id: 'f9', name: 'total_revenue', dataType: 'number', businessName: 'Total Revenue', description: 'Aggregated revenue', formula: 'SUM(orders.total_amount)' },
    ],
    relationships: [],
  },
  {
    id: '4',
    name: 'Customer Segment',
    type: 'dimension',
    description: 'Customer segmentation for analysis',
    source: 'customer_segments view',
    fields: [
      { id: 'f10', name: 'segment', dataType: 'string', businessName: 'Segment', description: 'Customer segment category' },
    ],
    relationships: ['Customer'],
  },
]

const typeIcons = {
  entity: BookOpen,
  metric: BarChart2,
  dimension: GitBranch,
}

const dataTypeIcons = {
  string: Type,
  number: Hash,
  date: Calendar,
  boolean: ToggleLeft,
}

export default function SemanticLayer() {
  const [selectedEntity, setSelectedEntity] = useState<SemanticEntity | null>(entities[0])
  const [expandedFields, setExpandedFields] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const toggleField = (fieldId: string) => {
    setExpandedFields((prev) =>
      prev.includes(fieldId) ? prev.filter((id) => id !== fieldId) : [...prev, fieldId]
    )
  }

  const filteredEntities = entities.filter(
    (e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-full flex">
      {/* Left Panel - Entity List */}
      <div className="w-80 border-r border-gray-200/50 flex flex-col">
        <div className="p-4 border-b border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-night-900">Semantic Layer</h2>
            <button className="btn-primary p-2">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-night-500" />
            <input
              type="text"
              placeholder="Search entities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {/* Group by type */}
          {['entity', 'metric', 'dimension'].map((type) => {
            const typeEntities = filteredEntities.filter((e) => e.type === type)
            if (typeEntities.length === 0) return null

            return (
              <div key={type} className="mb-4">
                <h3 className="text-xs font-semibold text-night-500 uppercase tracking-wider px-3 mb-2">
                  {type === 'entity' ? 'Entities' : type === 'metric' ? 'Metrics' : 'Dimensions'}
                </h3>
                {typeEntities.map((entity) => {
                  const Icon = typeIcons[entity.type]
                  return (
                    <motion.button
                      key={entity.id}
                      onClick={() => setSelectedEntity(entity)}
                      whileHover={{ x: 4 }}
                      className={`w-full p-3 rounded-lg text-left transition-all mb-1 ${
                        selectedEntity?.id === entity.id
                          ? 'bg-bao-600/20 border border-bao-500/30'
                          : 'hover:bg-white/50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            entity.type === 'entity'
                              ? 'bg-bao-500/20'
                              : entity.type === 'metric'
                              ? 'bg-mint-500/20'
                              : 'bg-amber-500/20'
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 ${
                              entity.type === 'entity'
                                ? 'text-bao-600'
                                : entity.type === 'metric'
                                ? 'text-mint-600'
                                : 'text-amber-600'
                            }`}
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-night-900">{entity.name}</h4>
                          <p className="text-xs text-night-500">{entity.fields.length} fields</p>
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      {/* Right Panel - Entity Details */}
      <div className="flex-1 overflow-y-auto">
        {selectedEntity ? (
          <motion.div
            key={selectedEntity.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200/50">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedEntity.type === 'entity'
                        ? 'bg-bao-500/20'
                        : selectedEntity.type === 'metric'
                        ? 'bg-mint-500/20'
                        : 'bg-amber-500/20'
                    }`}
                  >
                    {(() => {
                      const Icon = typeIcons[selectedEntity.type]
                      return (
                        <Icon
                          className={`w-6 h-6 ${
                            selectedEntity.type === 'entity'
                              ? 'text-bao-600'
                              : selectedEntity.type === 'metric'
                              ? 'text-mint-600'
                              : 'text-amber-600'
                          }`}
                        />
                      )
                    })()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-display font-semibold text-night-900">
                        {selectedEntity.name}
                      </h1>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          selectedEntity.type === 'entity'
                            ? 'bg-bao-500/20 text-bao-600'
                            : selectedEntity.type === 'metric'
                            ? 'bg-mint-500/20 text-mint-600'
                            : 'bg-amber-500/20 text-amber-600'
                        }`}
                      >
                        {selectedEntity.type}
                      </span>
                    </div>
                    <p className="text-night-500 mt-1">{selectedEntity.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <button onClick={() => setIsEditing(false)} className="btn-ghost">
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                      <button onClick={() => setIsEditing(false)} className="btn-primary">
                        <Save className="w-4 h-4" />
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn-ghost">
                        <Sparkles className="w-4 h-4" />
                        AI Suggest
                      </button>
                      <button onClick={() => setIsEditing(true)} className="btn-secondary">
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Source info */}
              <div className="mt-4 flex items-center gap-6 text-sm">
                <span className="text-night-500">
                  Source: <span className="text-night-700 font-mono">{selectedEntity.source}</span>
                </span>
                {selectedEntity.relationships.length > 0 && (
                  <span className="flex items-center gap-2 text-night-500">
                    <Link className="w-4 h-4" />
                    Related to:{' '}
                    {selectedEntity.relationships.map((rel, i) => (
                      <span key={rel}>
                        <span className="text-bao-600 hover:underline cursor-pointer">{rel}</span>
                        {i < selectedEntity.relationships.length - 1 && ', '}
                      </span>
                    ))}
                  </span>
                )}
              </div>
            </div>

            {/* Fields */}
            <div className="flex-1 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-night-900">Fields</h3>
                {isEditing && (
                  <button className="btn-ghost text-sm">
                    <Plus className="w-4 h-4" />
                    Add Field
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {selectedEntity.fields.map((field) => {
                  const DataTypeIcon = dataTypeIcons[field.dataType]
                  const isExpanded = expandedFields.includes(field.id)

                  return (
                    <motion.div
                      key={field.id}
                      layout
                      className="glass rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleField(field.id)}
                        className="w-full p-4 flex items-center gap-4 hover:bg-gray-100/30 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-100/50 flex items-center justify-center">
                          <DataTypeIcon className="w-4 h-4 text-night-500" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-white">{field.name}</span>
                            <ChevronRight className="w-4 h-4 text-night-500" />
                            <span className="text-sm text-bao-600">{field.businessName}</span>
                          </div>
                          <p className="text-xs text-night-500 mt-0.5">{field.description}</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-mono bg-gray-100 text-night-600 rounded">
                          {field.dataType}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-night-500 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-gray-200/50"
                          >
                            <div className="p-4 space-y-4">
                              {isEditing ? (
                                <>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-xs font-medium text-night-500 mb-1">
                                        Technical Name
                                      </label>
                                      <input
                                        type="text"
                                        defaultValue={field.name}
                                        className="w-full text-sm font-mono"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium text-night-500 mb-1">
                                        Business Name
                                      </label>
                                      <input
                                        type="text"
                                        defaultValue={field.businessName}
                                        className="w-full text-sm"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium text-night-500 mb-1">
                                      Description
                                    </label>
                                    <textarea
                                      defaultValue={field.description}
                                      rows={2}
                                      className="w-full text-sm"
                                    />
                                  </div>
                                  {field.formula && (
                                    <div>
                                      <label className="block text-xs font-medium text-night-500 mb-1">
                                        Formula
                                      </label>
                                      <input
                                        type="text"
                                        defaultValue={field.formula}
                                        className="w-full text-sm font-mono"
                                      />
                                    </div>
                                  )}
                                  <div className="flex justify-end">
                                    <button className="btn-ghost text-xs text-coral-600 hover:text-coral-300">
                                      <Trash2 className="w-3 h-3" />
                                      Delete Field
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-night-500">Technical name:</span>
                                    <span className="ml-2 font-mono text-night-700">{field.name}</span>
                                  </div>
                                  <div>
                                    <span className="text-night-500">Data type:</span>
                                    <span className="ml-2 text-night-700">{field.dataType}</span>
                                  </div>
                                  {field.formula && (
                                    <div className="col-span-2">
                                      <span className="text-night-500">Formula:</span>
                                      <span className="ml-2 font-mono text-mint-600">{field.formula}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Layers3 className="w-12 h-12 text-night-600 mx-auto mb-4" />
              <p className="text-night-500">Select an entity to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
