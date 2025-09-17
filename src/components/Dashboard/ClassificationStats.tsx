import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const classificationData = [
  { name: "HR", value: 145, color: "#3b82f6" },
  { name: "Finance", value: 98, color: "#10b981" },
  { name: "Safety", value: 76, color: "#ef4444" },
  { name: "Technical", value: 132, color: "#8b5cf6" },
  { name: "Admin", value: 54, color: "#f59e0b" },
];

const accuracyData = [
  { department: "HR", accuracy: 98.2, processed: 145, errors: 3 },
  { department: "Finance", accuracy: 99.1, processed: 98, errors: 1 },
  { department: "Safety", accuracy: 96.8, processed: 76, errors: 2 },
  { department: "Technical", accuracy: 97.5, processed: 132, errors: 3 },
  { department: "Admin", accuracy: 100.0, processed: 54, errors: 0 },
];

export function ClassificationStats() {
  return (
    <div className="space-y-6">
      {/* Pie Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={classificationData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {classificationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Accuracy Stats */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Classification Accuracy</h4>
        {accuracyData.map((item) => (
          <div key={item.department} className="flex items-center justify-between p-2 rounded bg-muted/30">
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ 
                  backgroundColor: classificationData.find(d => d.name === item.department)?.color 
                }}
              />
              <span className="text-sm font-medium">{item.department}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{item.accuracy}%</p>
              <p className="text-xs text-muted-foreground">
                {item.processed} processed • {item.errors} errors
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}