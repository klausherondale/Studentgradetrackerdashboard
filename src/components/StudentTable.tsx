import { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Eye, Edit } from 'lucide-react';

interface Student {
  rollNo: string;
  name: string;
  subject: string;
  assessment: string;
  marks: number;
  grade: string;
  remarks: string;
}

const mockStudents: Student[] = [
  { rollNo: '001', name: 'Emma Wilson', subject: 'Mathematics', assessment: 'Mid-Term Exam', marks: 92, grade: 'A', remarks: 'Excellent' },
  { rollNo: '002', name: 'James Smith', subject: 'Science', assessment: 'Quiz 1', marks: 78, grade: 'B', remarks: 'Good' },
  { rollNo: '003', name: 'Olivia Brown', subject: 'English', assessment: 'Essay', marks: 95, grade: 'A', remarks: 'Outstanding' },
  { rollNo: '004', name: 'Noah Davis', subject: 'History', assessment: 'Project', marks: 82, grade: 'B', remarks: 'Good' },
  { rollNo: '005', name: 'Ava Martinez', subject: 'Geography', assessment: 'Mid-Term Exam', marks: 88, grade: 'A', remarks: 'Very Good' },
  { rollNo: '006', name: 'Liam Johnson', subject: 'Mathematics', assessment: 'Quiz 2', marks: 65, grade: 'C', remarks: 'Needs Improvement' },
  { rollNo: '007', name: 'Sophia Garcia', subject: 'Science', assessment: 'Lab Report', marks: 91, grade: 'A', remarks: 'Excellent' },
  { rollNo: '008', name: 'Mason Rodriguez', subject: 'English', assessment: 'Mid-Term Exam', marks: 76, grade: 'B', remarks: 'Satisfactory' },
];

interface StudentTableProps {
  onViewStudent: (student: Student) => void;
  onAddMarks: () => void;
}

export function StudentTable({ onViewStudent, onAddMarks }: StudentTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.includes(searchTerm);
    const matchesFilter = filterSubject === 'all' || student.subject === filterSubject;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'bg-green-100 text-green-800';
      case 'B':
        return 'bg-blue-100 text-blue-800';
      case 'C':
        return 'bg-yellow-100 text-yellow-800';
      case 'D':
        return 'bg-orange-100 text-orange-800';
      case 'F':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-[#1E293B]">Student Performance</h3>
          <button
            onClick={onAddMarks}
            className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Marks
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or roll no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="History">History</option>
              <option value="Geography">Geography</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-600">Roll No</th>
              <th className="px-6 py-3 text-left text-xs text-gray-600">Name</th>
              <th className="px-6 py-3 text-left text-xs text-gray-600">Subject</th>
              <th className="px-6 py-3 text-left text-xs text-gray-600">Assessment</th>
              <th className="px-6 py-3 text-left text-xs text-gray-600">Marks</th>
              <th className="px-6 py-3 text-left text-xs text-gray-600">Grade</th>
              <th className="px-6 py-3 text-left text-xs text-gray-600">Remarks</th>
              <th className="px-6 py-3 text-left text-xs text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedStudents.map((student) => (
              <tr key={student.rollNo} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{student.rollNo}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{student.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.subject}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.assessment}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{student.marks}/100</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getGradeColor(student.grade)}`}>
                    {student.grade}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.remarks}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onViewStudent(student)}
                      className="p-1 hover:bg-blue-50 rounded text-blue-600 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 hover:bg-gray-100 rounded text-gray-600 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredStudents.length)} of {filteredStudents.length} results
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                currentPage === page
                  ? 'bg-[#2563EB] text-white'
                  : 'border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
