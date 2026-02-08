export interface Department {
  id: number;
  name: string;
}

export interface Professor {
  id: number;
  name: string;
  departmentId: number;
}

export interface Student {
  id: number;
  name: string;
  departmentId: number;
  grade: number;
}

export interface Course {
  id: number;
  name: string;
  professorId: number;
  departmentId: number;
  credits: number;
  capacity: number;
  enrolled: number;
  schedule: string[];
}

export interface Enrollment {
  id: number;
  studentId: number;
  courseId: number;
  enrolledAt: Date;
}
