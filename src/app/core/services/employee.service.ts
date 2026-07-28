import { Injectable, signal } from '@angular/core';
import { Employee, EmployeeInput } from '../models/employee.model';

const STORAGE_KEY = 'staffspace-employees';
const STARTER_EMPLOYEES: Employee[] = [
  { id: 1, name: 'Olivia Martin', email: 'olivia.martin@example.com', department: 'Design', salary: 78000 },
  { id: 2, name: 'Jackson Lee', email: 'jackson.lee@example.com', department: 'Engineering', salary: 96000 },
  { id: 3, name: 'Sophia Brown', email: 'sophia.brown@example.com', department: 'Marketing', salary: 72000 },
  { id: 4, name: 'Noah Wilson', email: 'noah.wilson@example.com', department: 'Finance', salary: 85000 }
];

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly employeeState = signal<Employee[]>(this.loadEmployees());
  readonly employees = this.employeeState.asReadonly();

  getById(id: number): Employee | undefined {
    return this.employeeState().find((employee) => employee.id === id);
  }

  add(employee: EmployeeInput): Employee {
    const nextId = Math.max(0, ...this.employeeState().map((item) => item.id)) + 1;
    const created = { id: nextId, ...employee };
    this.save([...this.employeeState(), created]);
    return created;
  }

  update(id: number, employee: EmployeeInput): boolean {
    if (!this.getById(id)) return false;
    this.save(this.employeeState().map((item) => item.id === id ? { id, ...employee } : item));
    return true;
  }

  delete(id: number): void {
    this.save(this.employeeState().filter((employee) => employee.id !== id));
  }

  private loadEmployees(): Employee[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) as Employee[] : STARTER_EMPLOYEES;
    } catch {
      return STARTER_EMPLOYEES;
    }
  }

  private save(employees: Employee[]): void {
    this.employeeState.set(employees);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }
}
