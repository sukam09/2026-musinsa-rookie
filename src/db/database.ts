import { Department, Professor, Student, Course, Enrollment } from '../types';

class Database {
  private static instance: Database;

  public departments: Map<number, Department> = new Map();
  public professors: Map<number, Professor> = new Map();
  public students: Map<number, Student> = new Map();
  public courses: Map<number, Course> = new Map();
  public enrollments: Map<number, Enrollment> = new Map();

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public clear(): void {
    this.departments.clear();
    this.professors.clear();
    this.students.clear();
    this.courses.clear();
    this.enrollments.clear();
  }
}

export const db = Database.getInstance();
