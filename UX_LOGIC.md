# Databao SaaS — UX Logic Documentation

## Table of Contents

1. [Application Overview](#application-overview)
2. [Architecture & Entry Point](#architecture--entry-point)
3. [Global Design System](#global-design-system)
4. [Workspace (Primary View)](#workspace-primary-view)
5. [Layout & Navigation (Secondary Shell)](#layout--navigation-secondary-shell)
6. [Page-Level UX Flows](#page-level-ux-flows)
7. [Modal & Overlay Patterns](#modal--overlay-patterns)
8. [Interaction Patterns](#interaction-patterns)
9. [State Management Summary](#state-management-summary)

---

## Application Overview

Databao is a SaaS data governance platform that enables users to:

- Connect and manage **Data Domains** (data sources)
- Evaluate and certify **Data Products** for AI-readiness
- Build, deploy, and monitor **AI Agents** powered by certified data
- Expose everything as **MCP (Model Context Protocol) endpoints** for integration with AI tools like Cursor and Claude

The core is: **Connect data → Validate quality → Deploy agents → Monitor & govern**.

---

## Architecture & Entry Point

```
main.tsx → App.tsx → Workspace (primary view)
```

- **`main.tsx`**: Standard React 18 entry point. Renders `<App />` inside `<React.StrictMode>`.
- **`App.tsx`**: Creates a hardcoded user (`{ name: 'Data Steward', avatar: 'DS' }`) and renders `<Workspace />` directly — **no router is used**. The `Workspace` component is the sole active page.
- **`Layout.tsx`**: A sidebar + top-header shell exists but is **not currently wired** into the app. It defines navigation routes (`/`, `/connections`, `/evaluation`, `/semantic`, `/agents`, `/monitoring`, `/catalog`) using React Router, but the app does not use routing at present. This layout is intended for a future multi-page version.

### Implication

All current UX is contained within `Workspace.tsx`. The other page components (`Dashboard.tsx`, `Connections.tsx`, etc.) are standalone page-level UIs designed for the `Layout.tsx` shell but are **not rendered in the current build**.

---

## Global Design System

### Color Palette (Custom Tailwind Theme)

| Token     | Purpose                              | Example Values             |
|-----------|--------------------------------------|----------------------------|
| `bao`     | Primary brand blue — CTAs, links     | `bao-500: #2aa3ff`         |
| `night`   | Neutrals — backgrounds, text, borders| `night-950: #0d141f` (bg)  |
| `mint`    | Success, healthy, active             | `mint-500: #22c55e`        |
| `coral`   | Error, destructive                   | `coral-500: #f43f5e`       |
| `amber`   | Warning, pending, caution            | `amber-500: #f59e0b`       |

### Typography

- Font: `Inter` (sans-serif) for all text including display and mono
- Display headings use `font-display font-semibold`
- Code/endpoints use `font-mono`

### Button Hierarchy

| Class           | Usage                        | Visual                                   |
|-----------------|------------------------------|------------------------------------------|
| `.btn-primary`  | Primary actions              | Blue bg (`bao-600`), white text, `px-2.5`|
| `.btn-secondary`| Secondary/alternative actions| Dark bg (`night-800`), light text, border |
| `.btn-ghost`    | Tertiary/subtle actions      | Transparent, text only, hover bg          |

### Glassmorphism

- `.glass` — semi-transparent bg with backdrop blur + subtle border
- `.glass-subtle` — lighter variant for nested containers
- `.card-hover` — lift effect (-translateY) with box shadow on hover

### Animations

- Framer Motion powers all page transitions, list stagger effects, modal animations
- Custom CSS animations: `pulse-glow` (status dots), `score-fill` (ring charts), `float`, `glow`

---

## Workspace (Primary View)

The Workspace is a **domain-centric single-page application** with a master-detail layout pattern.

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│  Header (h-14): Logo | Search | User Avatar         │
├─────────────┬───────────────────────────────────────┤
│  Domain     │                                       │
│  List       │  Domain Detail Panel                  │
│  (sidebar)  │  (overview / validation / agents)     │
│             │                                       │
│  Animated   │  Only visible when a domain           │
│  width:     │  is selected                          │
│  100% or    │                                       │
│  280px      │                                       │
└─────────────┴───────────────────────────────────────┘
```

### Focus Mode

- **No domain selected**: Domain list takes full width (`100%`), items show full details
- **Domain selected (Focus Mode)**: Domain list shrinks to `280px` at `opacity: 0.7` (hover restores to 1.0), and the detail panel slides in from the right

This transition is animated via `framer-motion` with a 0.3s duration.

### Header

- **Logo** — Sparkles icon + "Databao" text
- **Search** — Filters domains by name or description (live search via `searchQuery` state)
- **User avatar** — Gradient circle with initials

### Domain List Panel

Each `DomainListItem` shows:
- **Status indicator** — Colored dot (`mint` = healthy, `amber` = warning, `coral` = error, `bao-animated` = syncing)
- **Domain name** + **AI Readiness score** badge (color-coded: ≥90 green, ≥80 amber, <80 red)
- **Description** (hidden in compact/focus mode)
- **Stats row** — Table count, agent count, issue count
- **Copy MCP endpoint** button (hidden in compact mode)

When no domains exist, an **EmptyState** component shows:
- Icon + "No domains yet" heading
- "Add Domain" button
- CLI alternative: `databao init`

### Domain Detail Panel

Slides in from the right with Framer Motion. Has three tabs:

#### Overview Tab
1. **MCP Endpoint card** — Shows live endpoint URL with Copy button + "Live" badge
2. **Agent Configuration** — Togglable JSON config for Cursor or Claude Desktop. Includes copy button
3. **Stats grid** — AI Readiness %, Tables count, Agents count

#### Validation Tab
1. **AI-Readiness ring chart** — SVG donut showing overall score
2. **Quality dimensions** — Horizontal progress bars for: Accuracy, Completeness, Consistency, Timeliness, Validity
3. **Issues list** — Error/warning cards with severity icons, descriptions, affected tables/columns

#### Agents Tab
1. **Deployed agents list** — Each agent shows: icon, name, type, status badge, execution count, last run time, MCP endpoint
2. **Empty state** — If no agents, shows "Deploy First Agent" CTA
3. **Footer actions** — Sync button, Deploy Agent button, More options

---

## Layout & Navigation (Secondary Shell)

> **Note:** This shell is defined but NOT currently active. Documented for reference.

### Sidebar Navigation

| Route           | Label          | Icon            | Badge      |
|-----------------|----------------|-----------------|------------|
| `/`             | Dashboard      | LayoutDashboard | —          |
| `/connections`  | Connections    | Database        | —          |
| `/evaluation`   | Evaluation     | FlaskConical    | —          |
| `/semantic`     | Semantic Layer | Layers3         | —          |
| `/agents`       | Agent Factory  | Bot             | "New" pill |
| `/monitoring`   | Monitoring     | Activity        | —          |
| `/catalog`      | Data Catalog   | Library         | —          |

Active state: Blue bg highlight with border. Hover: subtle bg change.

### Top Header
- Global search bar with `⌘K` shortcut indicator
- Notification bell with red dot indicator

### Page Transitions
- `AnimatePresence` + `motion.div` on route change: fade-in from bottom (`y: 10 → 0`), fade-out to top (`y: 0 → -10`)

---

## Page-Level UX Flows

### Dashboard (`Dashboard.tsx`)

**Purpose:** Overview of the entire data ecosystem.

- **Greeting header** with time-of-day context + Quick Actions CTA
- **4-column stats grid** — Data Products (24), Active Agents (12), Avg. AI-Readiness (91.2%), Quality Alerts (3). Each card has trend indicators (up/down arrows with percentage)
- **Platform Activity chart** (Recharts AreaChart) — Queries vs Agent Actions over time
- **Quality Dimensions** (Recharts horizontal BarChart) — Accuracy, Completeness, Consistency, Timeliness, Validity
- **Recent Activity feed** — Timeline of events (agent deployed, data certified, quality alert, etc.)
- **Guardrails Status** — 4 status cards: Permissions, Audit Logging, Human Approval (with pending count), Data Isolation

### Connections (`Connections.tsx`)

**Purpose:** Manage database connections and file uploads.

- **Quick Upload cards** (3-column grid) — Upload Files, Context Documents, API Integration. Each has hover scale animation
- **Filter bar** — Search input + database type pills (PostgreSQL, Snowflake, MySQL, MongoDB, BigQuery) + More Filters button
- **Connection cards** — Each shows: DB icon (emoji), name + status badge, host, table count, row count, last sync, action buttons (refresh, settings, more)
- **Status badges** — connected (green), syncing (blue + spin), error (red), disconnected (gray)
- **New Connection Modal** (3-step wizard):
  1. Select database type (6 options in a 3-column grid)
  2. Connection form (host, port, database, username, password)
  3. Confirmation (success message + security protocol + sync schedule)

### Evaluation (`Evaluation.tsx`)

**Purpose:** Evaluate and certify data products for AI-readiness.

- **Split layout** — Left: data product list (w-96) | Right: evaluation details
- **Product list** — Filterable by status (all, certified, pending, needs-work). Each card shows name, source, score ring, status tag, issue count
- **Detail view** contains:
  - AI-Readiness Score (large ring chart) + quality assessment text
  - **Quality Dimensions** — 5 animated progress bars
  - **Detected Issues** — Error/warning cards with affected columns
  - **AI Recommendations** — Priority-tagged fix suggestions with impact estimates and "Apply fix" buttons
  - **Data Preview** — Sample table rows with inline quality highlighting (null values flagged in red)

### Semantic Layer (`SemanticLayer.tsx`)

**Purpose:** Define and manage the semantic model for data products.

- **Split layout** — Left: entity list (w-80) grouped by type | Right: entity detail
- **Entity types** — Entities, Metrics, Dimensions (each with distinct icon and color)
- **Entity list** — Grouped sections with hover slide animation. Search bar filters by name/description
- **Entity detail**:
  - Header with type badge, description, source info, relationships
  - **Edit mode** — Toggle between view and edit. Edit mode shows form inputs for all fields
  - **AI Suggest** button — Placeholder for AI-powered field suggestions
  - **Fields list** — Expandable accordion cards. Each shows: data type icon, technical name → business name, description, data type badge. Expand reveals: technical name, data type, formula (for metrics)

### Agent Factory (`AgentFactory.tsx`)

**Purpose:** Build, evaluate, and deploy AI agents.

- **Tab navigation** — Agents | Sessions | Deploy
- **"Mission Control" badge** in header

#### Agents Tab
- **4-column stats** — Active Agents, Total Executions (12.9K), Avg Latency (342ms), Pending Approvals (2)
- **Agent grid** (2-column) — Each agent card shows:
  - Icon based on type (Data Engineering=Table, Data Science=BrainCircuit, Conversational=MessageSquare)
  - Name, description, status badge (active/paused/error/draft/deploying)
  - Goal text, Data Product context
  - MCP endpoint with copy button
  - Execution stats + Pause/Play + Settings actions

#### Sessions Tab
- **Split layout** — Left: session list (w-80) | Right: session detail
- **Session filters** — all, running, completed, failed
- **Session detail**:
  - Session stats grid (Duration, Tool Calls, Reasoning Steps, Actions)
  - **Execution Log** — Grouped log entries with type icons:
    - 🔵 Sensor (blue) — Input/reading events
    - 🟢 Tool Call (green) — Tool invocations (with multiplier badges)
    - 🟡 Reasoning (amber) — AI reasoning steps
    - 🔴 Action (coral) — Output actions

#### Deploy Tab
- Agent selection grid (active/paused agents)
- **3 deployment targets**: MCP Server, GitHub Actions, Managed Cloud (recommended)
- **MCP Integration info card** — Lists 4 MCP capabilities
- Deploy button (disabled until agent selected)

#### Create Agent Modal (4-step wizard)
1. **Template** — 4 templates: Data Engineering, Data Science, Conversational, Custom. Each shows icon, description, and task tags
2. **Goal** — Agent name, goal description textarea, data product context dropdown + AI suggestion panel
3. **Tools** — 10 tools in 3-column grid: SQL Query, Schema Analysis, Data Preprocessor, Isolation Forest, Web Search, Calculator, File Search, Chat Response, Visualization, Alert System
4. **Guardrails** — Human Approval toggle, Rate Limiting dropdown, Audit Logging toggle, Data Access Scope dropdown

#### Agent Detail Modal
- Full agent configuration view: Goal, Data Context, Tools (tag list), Guardrails (card grid)
- MCP Server Endpoint with "Live" badge and copy/external-link buttons
- Stats (executions, avg latency, last run)
- Footer: Delete Agent (destructive) | Configure | Pause/Start Agent

### Monitoring (`Monitoring.tsx`)

**Purpose:** Real-time performance monitoring and audit trail.

- **Time range selector** — Last hour, 24 hours, 7 days, 30 days
- **5-column stats** — Uptime (99.4%), Requests/24h (25,847), Avg Latency (178ms), Errors/24h (12), Audit Coverage (100%)
- **Response Latency chart** (Recharts LineChart) — P50, P95, P99 percentile lines
- **Success Rate chart** (Recharts AreaChart) — Success percentage over time (95-100% range)
- **Audit Trail table** — Full-width table with columns: Timestamp, Agent, Action, User/Initiator, Status, Duration, Details. Filterable by status (all, success, warning, error)

### Data Catalog (`Catalog.tsx`)

**Purpose:** Browse and discover certified data products.

- **View toggle** — Grid (3-column) or List view
- **Search + status filters** (all, certified, pending, draft)
- **4-column stats** — Total Products, Certified count, Pending Review count, Agent Connections total
- **Grid view** — Cards with: icon, name, source, star toggle, description (2-line clamp), tags, status badge, AI score, agent usage count
- **List view** — Compact rows with: star, icon, name+status, description, tags (max 2 + overflow count), AI score, source, last updated, agent count, hover arrow

---

## Modal & Overlay Patterns

All modals share a consistent pattern:

1. **Backdrop** — Full-screen overlay with blur (`backdrop-blur-sm`) and semi-transparent bg (`bg-night-950/80` or `bg-gray-50/80`)
2. **Click-outside-to-close** — `onClick={onClose}` on backdrop, `e.stopPropagation()` on modal content
3. **Animation** — Framer Motion: scale 0.95→1 on enter, 1→0.95 on exit, with opacity fade
4. **Structure** — Header (title + close X) | Content (scrollable) | Footer (Back/Cancel + Primary CTA)
5. **Max height** — `max-h-[90vh]` with `overflow-y-auto`

### Add Domain Flow (5 steps)

| Step | Name      | Content                                                       |
|------|-----------|---------------------------------------------------------------|
| 1    | Source    | 6 source type cards (GitHub, PostgreSQL, Snowflake, Upload, API, BigQuery) |
| 2    | Connect   | Dynamic form based on source type (GitHub shows repo picker, PostgreSQL shows connection form, Upload shows drag-and-drop zone) |
| 3    | Scan      | Pre-scan CTA → animated scanning progress → scan results (discovered tables with row counts, column counts, data types) |
| 4    | Configure | Domain name input, description textarea, sync settings (auto-sync toggle, frequency dropdown) |
| 5    | Deploy    | Summary card (name, source, tables, AI-readiness) + MCP endpoint preview + capabilities list |

Progress indicator: numbered circles with check marks for completed steps, connected by colored lines.

### Deploy Agent Flow (5 steps)

| Step | Name       | Content                                                       |
|------|------------|---------------------------------------------------------------|
| 1    | Template   | 4 template cards (Data Engineering, Data Science, Conversational, Custom) |
| 2    | Configure  | Agent name input + goal description textarea                  |
| 3    | Tools      | 8 tool selection cards in 2-column grid                       |
| 4    | Guardrails | 3 toggle switches (Human Approval, Audit Logging, Read-Only)  |
| 5    | Target     | 3 deployment target cards (MCP Server, GitHub Actions, Cloud) + endpoint preview |

Deploy success screen: animated check icon, "Agent Deployed!" message, live MCP endpoint with copy button.

### Settings Flyout

- Slides in from the right as a side panel (`w-96`)
- Spring animation (damping: 25, stiffness: 300)
- Sections: Account info, API Access (token with regenerate button)

---

## Interaction Patterns

### Copy to Clipboard
- `navigator.clipboard.writeText(text)`
- Visual feedback: icon changes from Copy → Check, reverts after 2s via `setTimeout`
- Used for: MCP endpoints, JSON configs

### Search/Filtering
- Live filtering via controlled input state
- Filters applied in real-time (no submit button)
- Search scopes vary by context (domain names, entity names, catalog tags, etc.)

### Status Color System

| Status      | Color  | Usage                               |
|-------------|--------|-------------------------------------|
| Healthy/Active/Success/Certified | `mint`  | Positive states           |
| Warning/Pending/Paused  | `amber` | Caution states                      |
| Error/Needs-work        | `coral`  | Negative states                     |
| Syncing/Deploying/Info  | `bao`   | In-progress/neutral states          |
| Disconnected/Draft      | `gray`/`night` | Inactive states              |

### AI-Readiness Score Visualization

Displayed as a ring chart (SVG donut):
- ≥90% → Green (`mint`) — "Excellent / Ready for production"
- ≥80% → Amber — "Good / Minor improvements needed"
- <80% → Red (`coral`) — "Needs attention / Review issues"

Available in 3 sizes: `sm` (w-12), `md` (w-20), `lg` (w-32)

### List Item Selection
- Click-to-select pattern with highlighted border (`border-bao-500/30`) and bg tint (`bg-bao-600/20`)
- Clicking same item or close button deselects

### Wizard Navigation
- Back button hidden on first step (`invisible`)
- Continue/Next button disabled until required fields are filled
- Deploy/Submit buttons show loading state with spinner icon

---

## State Management Summary

All state is managed via React `useState` hooks at the component level — no global state management library is used.

### Workspace State

| State               | Type                  | Purpose                                      |
|----------------------|-----------------------|----------------------------------------------|
| `domains`           | `Domain[]`            | List of connected data domains               |
| `selectedDomain`    | `Domain \| null`      | Currently selected domain (drives focus mode) |
| `searchQuery`       | `string`              | Domain search filter                         |
| `showSettings`      | `boolean`             | Settings flyout visibility                   |
| `copiedEndpoint`    | `string \| null`      | ID of domain with active copy feedback       |
| `showDeployFlow`    | `boolean`             | Deploy Agent modal visibility                |
| `showAddDomain`     | `boolean`             | Add Domain modal visibility                  |

### Key Computed Values

- `filteredDomains` — Domains filtered by search query (name or description)
- `isFocusMode` — `selectedDomain !== null` — controls sidebar width and opacity

### Data Flow

```
User adds domain (wizard)
  ↓
Domain added to `domains` state
  ↓
Domain selected automatically → focus mode activates
  ↓
Detail panel shows → user can view validation, deploy agents
  ↓
Agent deployed (wizard) → appears in domain's agents tab
```

---

## Key Technical Dependencies

| Library            | Purpose                                  |
|--------------------|------------------------------------------|
| React 18           | UI framework                             |
| Framer Motion      | Animations (page transitions, modals, list stagger) |
| Lucide React       | Icon library (all icons)                 |
| Recharts           | Data visualization (charts in Dashboard, Monitoring, Evaluation) |
| Tailwind CSS       | Utility-first styling with custom theme  |
| Vite               | Build tool and dev server                |
