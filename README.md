# Databao — AI-Ready Data Governance Platform

A concept application demonstrating the UI/UX for Databao, an enterprise platform that solves the "Garbage In, Garbage Out" problem in Agentic AI.

## 🎯 Overview

Databao focuses on the governance and maintenance layer required to make production data "AI-ready". The platform enables:

- **Trust via Governance**: Centralized policy controls and data quality monitoring
- **Rapid Agentization**: Turn validated data products into functional agents in minutes
- **Professional Tooling**: Profile, cleanse, and certify data before AI consumption

## 🧑‍💼 User Roles

| Role | Responsibility | Primary UI Surface |
|------|---------------|-------------------|
| Data Custodian | Technical implementation, DB connections, security | Connections |
| Data Steward | Semantic rules, data validation, quality | Evaluation & Semantic Layer |
| Agent Builder | Agentic workflows, goals, tools | Agent Factory |

## 📱 Features

### Dashboard
- Real-time platform metrics and activity
- Quality dimension scores
- Guardrails status overview
- Recent activity feed

### Data Connections
- Connect to PostgreSQL, Snowflake, MySQL, MongoDB, BigQuery
- Upload context documents (PDF, XLSX, CSV)
- Connection health monitoring
- Sync scheduling

### Evaluation Workspace
- AI-Readiness scoring (0-100%)
- Quality dimensions: Accuracy, Completeness, Consistency, Timeliness, Validity
- Issue detection and AI recommendations
- Data preview with anomaly highlighting

### Semantic Layer
- Entity, Metric, and Dimension management
- Field-level business definitions
- Relationship mapping
- Formula editor for calculated metrics

### Agent Factory
- Visual agent creation wizard
- Goal definition and context selection
- Tool configuration (DB Query, Web Search, Chat, etc.)
- Guardrail setup (rate limits, human approval, audit logging)
- MCP server endpoint generation

### Monitoring & Governance
- Real-time latency metrics (P50, P95, P99)
- Success rate tracking
- Complete audit trail
- Filterable log viewer

### Data Catalog
- Browse certified data products
- Search by name, description, or tags
- Grid and list view options
- Agent connection tracking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🛠 Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **Lucide React** for icons
- **React Router** for navigation

## 🎨 Design System

The UI uses a deep ocean-inspired dark theme with:

- **Primary**: Blue tones (`bao-*`) for interactive elements
- **Success**: Mint green for positive states
- **Warning**: Amber for caution states  
- **Error**: Coral for error states
- **Background**: Night palette for depth and hierarchy

Typography:
- **Display**: Inter
- **Body**: Inter
- **Mono**: Inter

## 📄 License

Concept/Demo purposes only.
