import { motion } from 'framer-motion'
import { Boxes, ClipboardList, Wrench, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { DataTable } from '@/components/ui/DataTable'
import type { TableColumn } from '@/types'

interface AssetRow {
  id: string
  name: string
  category: string
  status: 'Active' | 'In Repair' | 'Retired'
  assignedTo: string
}

const rows: AssetRow[] = [
  { id: 'A-1042', name: 'Dell Latitude 5440', category: 'Laptop', status: 'Active', assignedTo: 'Priya N.' },
  { id: 'A-1043', name: 'HP LaserJet Pro', category: 'Printer', status: 'In Repair', assignedTo: 'Facilities' },
  { id: 'A-1044', name: 'Herman Miller Aeron', category: 'Furniture', status: 'Active', assignedTo: 'Rahul K.' },
  { id: 'A-1045', name: 'Cisco Catalyst 9200', category: 'Networking', status: 'Active', assignedTo: 'IT Infra' },
  { id: 'A-1046', name: 'Forklift FL-02', category: 'Equipment', status: 'Retired', assignedTo: 'Warehouse' },
]

const columns: TableColumn<AssetRow>[] = [
  { key: 'id', header: 'Asset ID' },
  { key: 'name', header: 'Name' },
  { key: 'category', header: 'Category' },
  {
    key: 'status',
    header: 'Status',
    render: (row) => (
      <Badge
        variant={row.status === 'Active' ? 'success' : row.status === 'In Repair' ? 'warning' : 'default'}
      >
        {row.status}
      </Badge>
    ),
  },
  { key: 'assignedTo', header: 'Assigned to' },
]

const stats = [
  { label: 'Total Assets', value: '1,284', delta: '+4.2%', icon: Boxes },
  { label: 'Open Requests', value: '37', delta: '-12%', icon: ClipboardList },
  { label: 'Under Maintenance', value: '12', delta: '+2', icon: Wrench },
  { label: 'Utilization', value: '86%', delta: '+3.1%', icon: TrendingUp },
]

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-heading">Good morning, Aiden</h1>
        <p className="mt-1 text-sm text-text">Here's what's happening across your asset portfolio today.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
          >
            <Card>
              <CardContent className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-text">{stat.label}</p>
                  <p className="mt-2 text-2xl font-bold text-heading">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium text-accent">{stat.delta} this month</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-primary/10 text-primary">
                  <stat.icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Recent Assets</CardTitle>
            <CardDescription>Latest additions and status changes across your inventory</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable data={rows} columns={columns} getRowId={(r) => r.id} onRowClick={() => {}} />
        </CardContent>
      </Card>
    </div>
  )
}
