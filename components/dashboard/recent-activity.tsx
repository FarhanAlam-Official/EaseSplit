"use client"

import { useApp } from "@/lib/app-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Receipt, 
  UserPlus, 
  UserMinus, 
  Edit3, 
  Trash2,
  Clock 
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

const activityIcons = {
  expense_added: Receipt,
  expense_updated: Edit3,
  expense_deleted: Trash2,
  member_added: UserPlus,
  member_removed: UserMinus,
  group_updated: Edit3,
}

const activityColors = {
  expense_added: "text-primary bg-primary/10",
  expense_updated: "text-blue-600 bg-blue-600/10",
  expense_deleted: "text-destructive bg-destructive/10",
  member_added: "text-green-600 bg-green-600/10",
  member_removed: "text-orange-600 bg-orange-600/10",
  group_updated: "text-purple-600 bg-purple-600/10",
}

export function RecentActivity() {
  const { getRecentActivities } = useApp()
  const activities = getRecentActivities(10)

  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No recent activity</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          <div className="space-y-1 p-4">
            {activities.map((activity) => {
              const Icon = activityIcons[activity.type]
              const colorClass = activityColors[activity.type]

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 ${colorClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
