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
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const gradeOverTimeData = [
  { month: 'Jan', average: 78 },
  { month: 'Feb', average: 82 },
  { month: 'Mar', average: 79 },
  { month: 'Apr', average: 85 },
  { month: 'May', average: 88 },
  { month: 'Jun', average: 86 },
];

const subjectPerformanceData = [
  { subject: 'Math', average: 85 },
  { subject: 'Science', average: 78 },
  { subject: 'English', average: 92 },
  { subject: 'History', average: 81 },
  { subject: 'Geography', average: 76 },
];

const gradeDistributionData = [
  { grade: 'A', count: 45 },
  { grade: 'B', count: 68 },
  { grade: 'C', count: 32 },
  { grade: 'D', count: 15 },
  { grade: 'F', count: 8 },
];

const COLORS = ['#22C55E', '#2563EB', '#F59E0B', '#F97316', '#EF4444'];

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Line Chart - Average Grades Over Time */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 lg:col-span-2">
        <h3 className="text-lg text-[#1E293B] mb-4">Average Grades Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={gradeOverTimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" stroke="#64748B" />
            <YAxis stroke="#64748B" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="average"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ fill: '#2563EB', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart - Grade Distribution */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg text-[#1E293B] mb-4">Grade Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={gradeDistributionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ grade, percent }) => `${grade}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {gradeDistributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - Performance by Subject */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 lg:col-span-3">
        <h3 className="text-lg text-[#1E293B] mb-4">Performance by Subject</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={subjectPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="subject" stroke="#64748B" />
            <YAxis stroke="#64748B" />
            <Tooltip />
            <Legend />
            <Bar dataKey="average" fill="#2563EB" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
