import { useState } from 'react';
import { Plus, Calendar, BookOpen, Users, Edit, Trash2, CheckCircle, Clock } from 'lucide-react';

interface Assessment {
  id: string;
  title: string;
  subject: string;
  type: string;
  course: string;
  totalMarks: number;
  date: string;
  duration: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  studentsCount: number;
  submittedCount: number;
}

const mockAssessments: Assessment[] = [
  { id: '1', title: 'Mid-Term Examination', subject: 'Data Structures', type: 'Exam', course: 'CS301', totalMarks: 100, date: '2025-11-15', duration: '2 hours', status: 'upcoming', studentsCount: 45, submittedCount: 0 },
  { id: '2', title: 'Algorithm Analysis Quiz', subject: 'Data Structures', type: 'Quiz', course: 'CS301', totalMarks: 20, date: '2025-11-12', duration: '30 mins', status: 'ongoing', studentsCount: 45, submittedCount: 32 },
  { id: '3', title: 'Research Paper', subject: 'English Composition', type: 'Assignment', course: 'ENG102', totalMarks: 50, date: '2025-11-08', duration: 'N/A', status: 'completed', studentsCount: 30, submittedCount: 30 },
  { id: '4', title: 'Database Design Project', subject: 'Database Systems', type: 'Project', course: 'CS402', totalMarks: 100, date: '2025-11-20', duration: 'N/A', status: 'upcoming', studentsCount: 35, submittedCount: 0 },
  { id: '5', title: 'Calculus Problem Set', subject: 'Calculus II', type: 'Quiz', course: 'MATH201', totalMarks: 25, date: '2025-11-11', duration: '45 mins', status: 'completed', studentsCount: 38, submittedCount: 36 },
  { id: '6', title: 'Final Exam Review', subject: 'Physics', type: 'Practice Test', course: 'PHYS201', totalMarks: 100, date: '2025-11-18', duration: '2.5 hours', status: 'upcoming', studentsCount: 42, submittedCount: 0 },
];

export function AssessmentsPage() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredAssessments = mockAssessments.filter((assessment) => {
    if (filterStatus === 'all') return true;
    return assessment.status === filterStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Exam':
        return '📝';
      case 'Quiz':
        return '❓';
      case 'Assignment':
        return '📄';
      case 'Project':
        return '🎯';
      default:
        return '📋';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl text-[#1E293B] mb-2">Assessments</h1>
        <p className="text-gray-600">Create and manage all assessments, exams, and assignments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-600">Total Assessments</div>
          <div className="text-2xl text-[#1E293B] mt-1">24</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="text-sm text-blue-700">Upcoming</div>
          <div className="text-2xl text-blue-600 mt-1">8</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <div className="text-sm text-yellow-700">Ongoing</div>
          <div className="text-2xl text-yellow-600 mt-1">3</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="text-sm text-green-700">Completed</div>
          <div className="text-2xl text-green-600 mt-1">13</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'all'
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('upcoming')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'upcoming'
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilterStatus('ongoing')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'ongoing'
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'completed'
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Assessment
          </button>
        </div>
      </div>

      {/* Assessments List */}
      <div className="space-y-4">
        {filteredAssessments.map((assessment) => (
          <div
            key={assessment.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-2xl">{getTypeIcon(assessment.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg text-[#1E293B]">{assessment.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(assessment.status)}`}>
                        {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <BookOpen className="w-4 h-4" />
                        {assessment.subject}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(assessment.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        {assessment.duration}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        {assessment.course}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Submission Progress</span>
                      <span className="text-xs text-gray-900">
                        {assessment.submittedCount}/{assessment.studentsCount}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#2563EB] h-2 rounded-full transition-all"
                        style={{
                          width: `${(assessment.submittedCount / assessment.studentsCount) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-900">
                    {assessment.totalMarks} marks
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex lg:flex-col gap-2">
                <button className="flex-1 lg:flex-none px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="flex-1 lg:flex-none px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Assessment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl text-[#1E293B]">Create New Assessment</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Assessment Title"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select Course</option>
                    <option>CS301 - Data Structures</option>
                    <option>MATH201 - Calculus II</option>
                    <option>ENG102 - English Composition</option>
                    <option>PHYS201 - Physics</option>
                    <option>CS402 - Database Systems</option>
                  </select>
                  <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Assessment Type</option>
                    <option>Exam</option>
                    <option>Quiz</option>
                    <option>Assignment</option>
                    <option>Project</option>
                  </select>
                  <input
                    type="date"
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g., 2 hours)"
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Total Marks"
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Weight % (e.g., 20)"
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <textarea
                  placeholder="Description (optional)"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Create Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
