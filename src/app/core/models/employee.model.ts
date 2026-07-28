export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
}

export type EmployeeInput = Omit<Employee, 'id'>;
