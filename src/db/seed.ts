import { Department, Professor, Student, Course } from '../types';
import { DEPARTMENT_NAMES } from '../constants/departments';
import { LAST_NAMES, FIRST_NAMES } from '../constants/names';
import { COURSE_NAMES_BY_DEPARTMENT } from '../constants/courses';
import { DAYS, PERIODS } from '../constants/schedule';
import { createDepartment } from '../repositories/departmentRepository';
import { createProfessor } from '../repositories/professorRepository';
import { createStudent } from '../repositories/studentRepository';
import { createCourse } from '../repositories/courseRepository';

function generateName(index: number): string {
  const lastNameIndex = index % LAST_NAMES.length;
  const firstNameIndex = Math.floor(index / LAST_NAMES.length) % FIRST_NAMES.length;
  return `${LAST_NAMES[lastNameIndex]}${FIRST_NAMES[firstNameIndex]}`;
}

function generateCredits(index: number): number {
  const pattern = index % 10;
  if (pattern < 1) {
    return 1;
  }
  if (pattern < 4) {
    return 2;
  }
  return 3;
}

function generateCapacity(index: number): number {
  return 20 + (index % 31);
}

function generateSchedule(courseIndex: number, credits: number, usedSlots: Set<string>): string[] {
  const slotCount = credits === 1 ? 1 : 2;
  const schedule: string[] = [];
  const availableSlots: string[] = [];

  for (const day of DAYS) {
    for (const period of PERIODS) {
      const slot = `${day}_${period}`;
      if (!usedSlots.has(slot)) {
        availableSlots.push(slot);
      }
    }
  }

  let slotIndex = courseIndex;
  for (let i = 0; i < slotCount && availableSlots.length > 0; i++) {
    const selectedIndex = slotIndex % availableSlots.length;
    const selectedSlot = availableSlots.splice(selectedIndex, 1)[0];
    schedule.push(selectedSlot);
    usedSlots.add(selectedSlot);
    slotIndex = slotIndex * 7 + 3;
  }

  return schedule;
}

function seedDepartments(): Department[] {
  const departments: Department[] = [];

  for (let i = 0; i < DEPARTMENT_NAMES.length; i++) {
    const department: Department = {
      id: i + 1,
      name: DEPARTMENT_NAMES[i],
    };
    createDepartment(department);
    departments.push(department);
  }

  return departments;
}

function seedProfessors(departments: Department[]): Professor[] {
  const professors: Professor[] = [];
  let professorId = 1;

  for (const department of departments) {
    for (let i = 0; i < 10; i++) {
      const professor: Professor = {
        id: professorId,
        name: generateName(professorId),
        departmentId: department.id,
      };
      createProfessor(professor);
      professors.push(professor);
      professorId++;
    }
  }

  return professors;
}

function seedStudents(departments: Department[]): Student[] {
  const students: Student[] = [];
  let studentId = 1;

  for (const department of departments) {
    for (let i = 0; i < 1000; i++) {
      const student: Student = {
        id: studentId,
        name: generateName(studentId),
        departmentId: department.id,
        grade: (i % 4) + 1,
      };
      createStudent(student);
      students.push(student);
      studentId++;
    }
  }

  return students;
}

function seedCourses(professors: Professor[], departments: Department[]): Course[] {
  const courses: Course[] = [];
  let courseId = 1;

  for (const professor of professors) {
    const department = departments.find(d => d.id === professor.departmentId);
    if (!department) {
      continue;
    }

    const courseNames = COURSE_NAMES_BY_DEPARTMENT[department.name];
    if (!courseNames) {
      continue;
    }

    const usedSlots = new Set<string>();

    for (let i = 0; i < 5; i++) {
      const credits = generateCredits(courseId);
      const schedule = generateSchedule(courseId, credits, usedSlots);

      const course: Course = {
        id: courseId,
        name: `${courseNames[i % courseNames.length]} ${Math.floor(i / courseNames.length) + 1}`,
        professorId: professor.id,
        departmentId: department.id,
        credits,
        capacity: generateCapacity(courseId),
        enrolled: 0,
        schedule,
      };
      createCourse(course);
      courses.push(course);
      courseId++;
    }
  }

  return courses;
}

export function seed(options?: { silent?: boolean }): void {
  const departments = seedDepartments();
  const professors = seedProfessors(departments);
  seedStudents(departments);
  seedCourses(professors, departments);

  if (!options?.silent) {
    console.log('Seed 완료:');
    console.log(`- 학과: ${departments.length}개`);
    console.log(`- 교수: ${professors.length}명`);
    console.log(`- 학생: 10,000명`);
    console.log(`- 강좌: 500개`);
  }
}
