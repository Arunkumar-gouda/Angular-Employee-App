import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
    service = TestBed.inject(EmployeeService);
  });

  it('provides starter employees', () => {
    expect(service.employees().length).toBe(4);
  });

  it('adds, updates, and deletes an employee', () => {
    const employee = service.add({
      name: 'Avery Johnson',
      email: 'avery@example.com',
      department: 'Engineering',
      salary: 90000
    });

    expect(service.getById(employee.id)?.name).toBe('Avery Johnson');
    expect(service.update(employee.id, { ...employee, name: 'Avery Smith' })).toBeTrue();
    expect(service.getById(employee.id)?.name).toBe('Avery Smith');

    service.delete(employee.id);
    expect(service.getById(employee.id)).toBeUndefined();
  });
});
