import { X } from 'lucide-react';
import { useState } from 'react';

interface AddMarksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddMarksModal({ isOpen, onClose }: AddMarksModalProps) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    student: '',
    subject: '',
    assessment: '',
    marks: '',
    maxMarks: '100',
    remarks: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl text-[#1E293B]">Add Student Marks</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Student Selection */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Student <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.student}
                onChange={(e) => setFormData({ ...formData, student: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a student</option>
                <option value="001">Emma Wilson (001)</option>
                <option value="002">James Smith (002)</option>
                <option value="003">Olivia Brown (003)</option>
                <option value="004">Noah Davis (004)</option>
                <option value="005">Ava Martinez (005)</option>
              </select>
            </div>

            {/* Subject Selection */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a subject</option>
                <option value="mathematics">Mathematics</option>
                <option value="science">Science</option>
                <option value="english">English</option>
                <option value="history">History</option>
                <option value="geography">Geography</option>
              </select>
            </div>

            {/* Assessment Type */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Assessment Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.assessment}
                onChange={(e) => setFormData({ ...formData, assessment: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select assessment type</option>
                <option value="quiz">Quiz</option>
                <option value="midterm">Mid-Term Exam</option>
                <option value="final">Final Exam</option>
                <option value="project">Project</option>
                <option value="assignment">Assignment</option>
                <option value="presentation">Presentation</option>
              </select>
            </div>

            {/* Marks Input */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Marks Obtained <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max={formData.maxMarks}
                  value={formData.marks}
                  onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 85"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Maximum Marks <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.maxMarks}
                  onChange={(e) => setFormData({ ...formData, maxMarks: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Remarks (Optional)
              </label>
              <textarea
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
                placeholder="Add any remarks or comments..."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Marks
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
