import { FileText, Download, Calendar, Filter, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const classPerformanceData = [
  { class: '10-A', average: 85 },
  { class: '10-B', average: 82 },
  { class: '9-A', average: 78 },
  { class: '9-B', average: 80 },
  { class: '8-A', average: 76 },
  { class: '8-B', average: 74 },
];

const reportTemplates = [
  {
    id: 1,
    title: 'Student Progress Report',
    description: 'Comprehensive report showing individual student performance across all subjects',
    icon: FileText,
    color: 'blue',
  },
  {
    id: 2,
    title: 'Class Performance Summary',
    description: 'Overview of class-wide performance metrics and statistics',
    icon: BarChart3,
    color: 'green',
  },
  {
    id: 3,
    title: 'Subject-wise Analysis',
    description: 'Detailed analysis of performance in each subject',
    icon: PieChart,
    color: 'purple',
  },
  {
    id: 4,
    title: 'Attendance Report',
    description: 'Student attendance records and patterns',
    icon: Calendar,
    color: 'orange',
  },
  {
    id: 5,
    title: 'Grade Distribution',
    description: 'Statistical breakdown of grade distribution',
    icon: TrendingUp,
    color: 'pink',
  },
  {
    id: 6,
    title: 'Assessment Results',
    description: 'Results from recent exams and assessments',
    icon: FileText,
    color: 'indigo',
  },
];

const recentReports = [
  { id: 1, name: 'Class 10-A Mid-Term Report', date: '2025-11-08', type: 'Class Report', status: 'Ready' },
  { id: 2, name: 'October Attendance Summary', date: '2025-11-01', type: 'Attendance', status: 'Ready' },
  { id: 3, name: 'Mathematics Performance Analysis', date: '2025-10-25', type: 'Subject Analysis', status: 'Ready' },
  { id: 4, name: 'Student Progress - Emma Wilson', date: '2025-10-20', type: 'Student Report', status: 'Ready' },
];

export function ReportsPage() {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200',
      pink: 'bg-pink-50 text-pink-600 border-pink-200',
      indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl text-[#1E293B] mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Generate comprehensive reports and analyze performance data</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Reports Generated</div>
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl text-[#1E293B]">247</div>
          <div className="text-xs text-gray-500 mt-1">This semester</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Average Performance</div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl text-[#1E293B]">82.4%</div>
          <div className="text-xs text-green-600 mt-1">+3.2% from last term</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Data Points</div>
            <BarChart3 className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-3xl text-[#1E293B]">12.5K</div>
          <div className="text-xs text-gray-500 mt-1">Across all assessments</div>
        </div>
      </div>

      {/* Class Performance Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg text-[#1E293B]">Class Performance Overview</h2>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm">
            <Download className="w-4 h-4" />
            Export Chart
          </button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={classPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="class" stroke="#64748B" />
            <YAxis stroke="#64748B" />
            <Tooltip />
            <Bar dataKey="average" radius={[8, 8, 0, 0]}>
              {classPerformanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.average >= 80 ? '#22C55E' : '#2563EB'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Report Templates */}
      <div className="mb-6">
        <h2 className="text-xl text-[#1E293B] mb-4">Generate New Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <div
                key={template.id}
                className={`rounded-xl p-6 border-2 hover:shadow-lg transition-all cursor-pointer ${getColorClasses(
                  template.color
                )}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon className="w-8 h-8" />
                  <button className="px-3 py-1 bg-white rounded-lg text-xs hover:shadow transition-all">
                    Generate
                  </button>
                </div>
                <h3 className="text-sm mb-2">{template.title}</h3>
                <p className="text-xs opacity-75">{template.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-[#1E293B]">Recent Reports</h2>
            <div className="flex gap-2">
              <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentReports.map((report) => (
            <div
              key={report.id}
              className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-[#1E293B]">{report.name}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {report.type} • Generated on {new Date(report.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  {report.status}
                </span>
                <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
