import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Employee } from '../../core/models/employee.model';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent {
  private readonly employeeService = inject(EmployeeService);
  readonly searchTerm = signal('');
  readonly employees = computed(() => {
    const query = this.searchTerm().trim().toLowerCase();
    return this.employeeService.employees().filter((employee) =>
      !query || [employee.name, employee.email, employee.department].some((value) => value.toLowerCase().includes(query))
    );
  });
  readonly totalEmployees = computed(() => this.employeeService.employees().length);
  employeeToDelete: Employee | null = null;

  setSearchTerm(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  requestDelete(employee: Employee): void {
    this.employeeToDelete = employee;
  }

  cancelDelete(): void {
    this.employeeToDelete = null;
  }

  confirmDelete(): void {
    if (this.employeeToDelete) this.employeeService.delete(this.employeeToDelete.id);
    this.employeeToDelete = null;
  }
}
