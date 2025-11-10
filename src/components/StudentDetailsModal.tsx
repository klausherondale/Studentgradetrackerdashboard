import { X, Mail, Phone, MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Student {
  rollNo: string;
  name: string;
  subject: string;
  assessment: string;
  marks: number;
  grade: string;
  remarks: string;
}

interface StudentDetailsModalProps {
  student: Student | null;
  onClose: () => void;
}

const performanceData = [
  { test: 'Test 1', score: 85 },
  { test: 'Test 2', score: 88 },
  { test: 'Test 3', score: 82 },
  { test: 'Test 4', score: 90 },
  { test: 'Test 5', score: 92 },
];

const subjectScores = [
  { subject: 'Mathematics', score: 92, grade: 'A' },
  { subject: 'Science', score: 88, grade: 'A' },
  { subject: 'English', score: 95, grade: 'A' },
  { subject: 'History', score: 85, grade: 'A' },
  { subject: 'Geography', score: 78, grade: 'B' },
];

export function StudentDetailsModal({ student, onClose }: StudentDetailsModalProps) {
  if (!student) return null;

  const overallAverage = (subjectScores.reduce((sum, s) => sum + s.score, 0) / subjectScores.length).toFixed(1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl text-[#1E293B]">{student.name}</h2>
            <p className="text-sm text-gray-500">Roll No: {student.rollNo}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Student Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Overall Average</div>
              <div className="text-3xl text-[#2563EB]">{overallAverage}%</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Total Subjects</div>
              <div className="text-3xl text-[#22C55E]">{subjectScores.length}</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Class Rank</div>
              <div className="text-3xl text-purple-600">3rd</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-sm text-gray-600 mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{student.name.toLowerCase().replace(' ', '.')}@school.edu</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">Class 10-A</span>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <h3 className="text-sm text-[#1E293B] mb-4">Performance Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="test" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={{ fill: '#2563EB', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Subject-wise Performance */}
          <div>
            <h3 className="text-sm text-[#1E293B] mb-4">Subject-wise Performance</h3>
            <div className="space-y-3">
              {subjectScores.map((subject) => (
                <div key={subject.subject} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">{subject.subject}</span>
                      <span className="text-sm text-gray-900">{subject.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#2563EB] h-2 rounded-full transition-all"
                        style={{ width: `${subject.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    subject.grade === 'A' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {subject.grade}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
}
