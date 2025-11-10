import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Mail, Phone, UserCircle, Filter } from 'lucide-react';

interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  major: string;
  year: string;
  gpa: number;
  credits: number;
  address: string;
  enrollmentStatus: string;
}

const mockStudents: Student[] = [
  { id: '1', studentId: 'STU2023001', name: 'Emma Wilson', email: 'emma.wilson@university.edu', phone: '+1 555-0101', major: 'Computer Science', year: 'Junior', gpa: 3.8, credits: 90, address: '123 Oak Street', enrollmentStatus: 'Active' },
  { id: '2', studentId: 'STU2023002', name: 'James Smith', email: 'james.smith@university.edu', phone: '+1 555-0103', major: 'Computer Science', year: 'Sophomore', gpa: 3.2, credits: 60, address: '456 Pine Avenue', enrollmentStatus: 'Active' },
  { id: '3', studentId: 'STU2023003', name: 'Olivia Brown', email: 'olivia.brown@university.edu', phone: '+1 555-0105', major: 'Mathematics', year: 'Senior', gpa: 3.9, credits: 110, address: '789 Elm Road', enrollmentStatus: 'Active' },
  { id: '4', studentId: 'STU2023004', name: 'Noah Davis', email: 'noah.davis@university.edu', phone: '+1 555-0107', major: 'Physics', year: 'Junior', gpa: 3.5, credits: 85, address: '321 Maple Drive', enrollmentStatus: 'Active' },
  { id: '5', studentId: 'STU2023005', name: 'Ava Martinez', email: 'ava.martinez@university.edu', phone: '+1 555-0109', major: 'Business', year: 'Sophomore', gpa: 3.6, credits: 55, address: '654 Cedar Lane', enrollmentStatus: 'Active' },
  { id: '6', studentId: 'STU2023006', name: 'Liam Johnson', email: 'liam.johnson@university.edu', phone: '+1 555-0111', major: 'Engineering', year: 'Freshman', gpa: 2.8, credits: 28, address: '987 Birch Court', enrollmentStatus: 'Active' },
];

export function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMajor, setFilterMajor] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterMajor === 'all' || student.major === filterMajor;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl text-[#1E293B] mb-2">Students Management</h1>
        <p className="text-gray-600">Manage student information and records</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-600">Total Students</div>
          <div className="text-2xl text-[#1E293B] mt-1">168</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-600">Average GPA</div>
          <div className="text-2xl text-[#1E293B] mt-1">3.42</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-600">Active Enrollment</div>
          <div className="text-2xl text-[#1E293B] mt-1">165</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-600">New This Semester</div>
          <div className="text-2xl text-[#22C55E] mt-1">+12</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-gray-200">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 flex gap-4 w-full sm:w-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterMajor}
                onChange={(e) => setFilterMajor(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Majors</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Business">Business</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Student
            </button>
          </div>
        </div>

        {/* Students Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <UserCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-[#1E293B]">{student.name}</div>
                      <div className="text-xs text-gray-500">{student.studentId}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-red-50 rounded">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Mail className="w-3 h-3" />
                    {student.email}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Phone className="w-3 h-3" />
                    {student.phone}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    {student.major} • {student.year}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-gray-500">GPA:</div>
                    <div className={`text-sm ${
                      student.gpa >= 3.5 ? 'text-green-600' :
                      student.gpa >= 3.0 ? 'text-blue-600' :
                      student.gpa >= 2.0 ? 'text-orange-600' :
                      'text-red-600'
                    }`}>
                      {student.gpa.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Student Modal (simplified) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl text-[#1E293B]">Add New Student</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="col-span-2 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Student ID (e.g., STU2023001)"
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select Major</option>
                  <option>Computer Science</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Business</option>
                  <option>Engineering</option>
                </select>
                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select Year</option>
                  <option>Freshman</option>
                  <option>Sophomore</option>
                  <option>Junior</option>
                  <option>Senior</option>
                </select>
                <input
                  type="number"
                  step="0.01"
                  placeholder="GPA (0.00 - 4.00)"
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Address"
                  rows={3}
                  className="col-span-2 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
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
                  Add Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
