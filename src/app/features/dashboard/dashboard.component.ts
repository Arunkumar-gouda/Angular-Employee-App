import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  private readonly employeeService = inject(EmployeeService);
  readonly employees = this.employeeService.employees;
  readonly totalEmployees = computed(() => this.employees().length);
  readonly departmentCount = computed(() =>
    new Set(this.employees().map((employee) => employee.department)).size
  );
  readonly averageSalary = computed(() => {
    const employees = this.employees();
    return employees.length
      ? employees.reduce((total, employee) => total + employee.salary, 0) / employees.length
      : 0;
  });
}
