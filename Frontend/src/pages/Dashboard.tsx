import { Header } from "@/components/layout/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Users, FileText, AlertTriangle, TrendingUp, Plus, Download, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

// Sample data
const progressData = [
  { month: "Jan", score: 85, tests: 12 },
  { month: "Feb", score: 82, tests: 15 },
  { month: "Mar", score: 79, tests: 18 },
  { month: "Apr", score: 83, tests: 14 },
  { month: "May", score: 80, tests: 16 },
  { month: "Jun", score: 78, tests: 20 },
];

const speechMetrics = [
  { name: "Fluency", value: 75, color: "hsl(var(--primary))" },
  { name: "Clarity", value: 82, color: "hsl(var(--secondary))" },
  { name: "Vocabulary", value: 68, color: "hsl(var(--accent))" },
  { name: "Processing", value: 71, color: "hsl(var(--warning))" },
];

const recentPatients = [
  { id: 1, name: "Mary Johnson", age: 72, lastTest: "2024-01-15", score: 78, status: "normal" },
  { id: 2, name: "Robert Smith", age: 68, lastTest: "2024-01-14", score: 65, status: "concern" },
  { id: 3, name: "Linda Davis", age: 75, lastTest: "2024-01-13", score: 82, status: "normal" },
  { id: 4, name: "William Brown", age: 70, lastTest: "2024-01-12", score: 58, status: "flagged" },
];

const chartConfig = {
  score: {
    label: "Cognitive Score",
    color: "hsl(var(--primary))",
  },
  tests: {
    label: "Tests Completed",
    color: "hsl(var(--secondary))",
  },
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-heading font-bold text-foreground">Clinician Dashboard</h1>
            <p className="text-body text-muted-foreground">Monitor patient progress and screening results</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="lg">
              <Download className="mr-2 h-5 w-5" />
              Export Reports
            </Button>
            <Button variant="default" size="lg" asChild>
              <Link to="/test">
                <Plus className="mr-2 h-5 w-5" />
                New Assessment
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Patients"
            value="1,247"
            description="Active in system"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            variant="default"
          />
          <StatsCard
            title="Tests Completed"
            value="3,891"
            description="This month"
            icon={FileText}
            trend={{ value: 8, isPositive: true }}
            variant="success"
          />
          <StatsCard
            title="Flagged Cases"
            value="23"
            description="Requiring attention"
            icon={AlertTriangle}
            trend={{ value: 5, isPositive: false }}
            variant="warning"
          />
          <StatsCard
            title="Avg. Score"
            value="78.4"
            description="Cognitive assessment"
            icon={TrendingUp}
            trend={{ value: 3, isPositive: true }}
            variant="accent"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Progress Trends */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-subheading">Progress Trends</CardTitle>
                <p className="text-sm text-muted-foreground">Monthly cognitive scores and test volume</p>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Speech Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-subheading">Speech Analysis Metrics</CardTitle>
                <p className="text-sm text-muted-foreground">Average performance across domains</p>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <PieChart>
                    <Pie
                      data={speechMetrics}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {speechMetrics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
                              <p className="font-medium">{data.name}</p>
                              <p className="text-primary">{data.value}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Patients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-subheading">Recent Patient Assessments</CardTitle>
              <p className="text-sm text-muted-foreground">Latest screening results and status updates</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPatients.map((patient, index) => (
                  <motion.div
                    key={patient.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{patient.name}</h4>
                        <p className="text-sm text-muted-foreground">Age {patient.age} • Last test: {patient.lastTest}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold text-foreground">{patient.score}/100</div>
                        <div className={`text-sm px-2 py-1 rounded-full text-xs font-medium ${
                          patient.status === 'normal' ? 'bg-success/10 text-success' :
                          patient.status === 'concern' ? 'bg-warning/10 text-warning' :
                          'bg-destructive/10 text-destructive'
                        }`}>
                          {patient.status === 'normal' ? 'Normal' : 
                           patient.status === 'concern' ? 'Monitor' : 'Flagged'}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}