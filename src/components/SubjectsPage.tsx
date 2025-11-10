import { useState } from 'react';
import { Plus, Edit, Trash2, BookOpen, Award, Clock, X } from 'lucide-react';

interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  department: string;
  semester: string;
  instructor: string;
  enrolledStudents: number;
  capacity: number;
  schedule: string;
}

const mockSubjects: Subject[] = [
  { id: '1', code: 'CS301', name: 'Data Structures & Algorithms', credits: 4, department: 'Computer Science', semester: 'Fall 2025', instructor: 'Dr. Sarah Johnson', enrolledStudents: 45, capacity: 50, schedule: 'Mon/Wed 10:00-11:30' },
  { id: '2', code: 'MATH201', name: 'Calculus II', credits: 3, department: 'Mathematics', semester: 'Fall 2025', instructor: 'Dr. Michael Chen', enrolledStudents: 38, capacity: 40, schedule: 'Tue/Thu 14:00-15:30' },
  { id: '3', code: 'ENG102', name: 'English Composition', credits: 3, department: 'English', semester: 'Fall 2025', instructor: 'Prof. Emily Davis', enrolledStudents: 30, capacity: 35, schedule: 'Mon/Wed 13:00-14:30' },
  { id: '4', code: 'PHYS201', name: 'Physics for Engineers', credits: 4, department: 'Physics', semester: 'Fall 2025', instructor: 'Dr. Robert Taylor', enrolledStudents: 42, capacity: 45, schedule: 'Tue/Thu 09:00-10:30' },
  { id: '5', code: 'CS402', name: 'Database Management Systems', credits: 3, department: 'Computer Science', semester: 'Fall 2025', instructor: 'Dr. Sarah Johnson', enrolledStudents: 35, capacity: 40, schedule: 'Wed/Fri 11:00-12:30' },
  { id: '6', code: 'BUS301', name: 'Business Ethics', credits: 3, department: 'Business', semester: 'Fall 2025', instructor: 'Prof. Amanda White', enrolledStudents: 28, capacity: 30, schedule: 'Mon/Wed 15:00-16:30' },
];

export function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    credits: '',
    department: '',
    semester: 'Fall 2025',
    instructor: '',
    capacity: '',
    schedule: '',
  });

  const departments = ['Computer Science', 'Mathematics', 'English', 'Physics', 'Business', 'Engineering'];

  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || subject.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
  const totalEnrolled = subjects.reduce((sum, subject) => sum + subject.enrolledStudents, 0);

  const handleOpenAddModal = () => {
    setFormData({
      code: '',
      name: '',
      credits: '',
      department: '',
      semester: 'Fall 2025',
      instructor: '',
      capacity: '',
      schedule: '',
    });
    setEditingSubject(null);
    setShowAddModal(true);
  };

  const handleOpenEditModal = (subject: Subject) => {
    setFormData({
      code: subject.code,
      name: subject.name,
      credits: subject.credits.toString(),
      department: subject.department,
      semester: subject.semester,
      instructor: subject.instructor,
      capacity: subject.capacity.toString(),
      schedule: subject.schedule,
    });
    setEditingSubject(subject);
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSubject) {
      // Update existing subject
      setSubjects(subjects.map(s => 
        s.id === editingSubject.id 
          ? { ...editingSubject, ...formData, credits: parseInt(formData.credits), capacity: parseInt(formData.capacity) }
          : s
      ));
    } else {
      // Add new subject
      const newSubject: Subject = {
        id: Date.now().toString(),
        code: formData.code,
        name: formData.name,
        credits: parseInt(formData.credits),
        department: formData.department,
        semester: formData.semester,
        instructor: formData.instructor,
        enrolledStudents: 0,
        capacity: parseInt(formData.capacity),
        schedule: formData.schedule,
      };
      setSubjects([...subjects, newSubject]);
    }
    
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this subject?')) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl text-[#1E293B] mb-2">Subjects & Courses</h1>
        <p className="text-gray-600">Manage university courses and credit hours</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Total Subjects</div>
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl text-[#1E293B]">{subjects.length}</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Total Credits</div>
            <Award className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl text-[#1E293B]">{totalCredits}</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Total Enrolled</div>
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl text-[#1E293B]">{totalEnrolled}</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Departments</div>
            <BookOpen className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-2xl text-[#1E293B]">{departments.length}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-gray-200">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 flex gap-4 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search subjects or course codes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Subject
            </button>
          </div>
        </div>

        {/* Subjects Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Course Code</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Course Name</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Credits</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Department</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Instructor</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Enrollment</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Schedule</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSubjects.map((subject) => (
                <tr key={subject.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm text-[#1E293B]">{subject.code}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{subject.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-900">{subject.credits}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{subject.department}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{subject.instructor}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-[100px]">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(subject.enrolledStudents / subject.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-600">
                        {subject.enrolledStudents}/{subject.capacity}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-gray-600">{subject.schedule}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenEditModal(subject)}
                        className="p-1 hover:bg-blue-50 rounded text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(subject.id)}
                        className="p-1 hover:bg-red-50 rounded text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Subject Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl text-[#1E293B]">
                {editingSubject ? 'Edit Subject' : 'Add New Subject'}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Course Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="e.g., CS301"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Credits <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="6"
                      value={formData.credits}
                      onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                      placeholder="e.g., 3"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Course Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Data Structures & Algorithms"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Semester <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.semester}
                      onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="Fall 2025">Fall 2025</option>
                      <option value="Spring 2026">Spring 2026</option>
                      <option value="Summer 2026">Summer 2026</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Instructor <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    placeholder="e.g., Dr. Sarah Johnson"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Class Capacity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      placeholder="e.g., 50"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Schedule <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.schedule}
                      onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                      placeholder="e.g., Mon/Wed 10:00-11:30"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingSubject ? 'Update Subject' : 'Add Subject'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
