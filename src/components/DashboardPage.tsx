import { useState } from 'react';
import { KPICard } from './KPICard';
import { ChartsSection } from './ChartsSection';
import { StudentTable } from './StudentTable';
import { StudentDetailsModal } from './StudentDetailsModal';
import { AddMarksModal } from './AddMarksModal';
import { Users, TrendingUp, Award, AlertCircle } from 'lucide-react';

interface Student {
  rollNo: string;
  name: string;
  subject: string;
  assessment: string;
  marks: number;
  grade: string;
  remarks: string;
}

export function DashboardPage() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddMarksModal, setShowAddMarksModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-[#1E293B] mb-2">Welcome, Dr. Sarah Johnson</h1>
        <p className="text-gray-600">Here's an overview of your students' academic performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Total Students"
          value="168"
          icon={Users}
          color="text-blue-600"
          bgColor="bg-blue-50"
          trend="+12 this semester"
        />
        <KPICard
          title="Average GPA"
          value="3.42"
          icon={TrendingUp}
          color="text-green-600"
          bgColor="bg-green-50"
          trend="+0.15 from last term"
        />
        <KPICard
          title="Highest Score"
          value="98%"
          icon={Award}
          color="text-purple-600"
          bgColor="bg-purple-50"
          trend="Emma Wilson - CS301"
        />
        <KPICard
          title="At Risk Students"
          value="8"
          icon={AlertCircle}
          color="text-orange-600"
          bgColor="bg-orange-50"
          trend="GPA below 2.0"
        />
      </div>

      {/* Charts Section */}
      <ChartsSection />

      {/* Student Table */}
      <StudentTable
        onViewStudent={(student) => setSelectedStudent(student)}
        onAddMarks={() => setShowAddMarksModal(true)}
      />

      {/* Modals */}
      <StudentDetailsModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
      <AddMarksModal
        isOpen={showAddMarksModal}
        onClose={() => setShowAddMarksModal(false)}
      />
    </div>
  );
}
