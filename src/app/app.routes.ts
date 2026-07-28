import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'employees' },
  {
    path: 'employees',
    loadComponent: () => import('./features/employee-list/employee-list.component').then((m) => m.EmployeeListComponent),
    title: 'Employees | StaffSpace'
  },
  {
    path: 'employees/add',
    loadComponent: () => import('./features/employee-form/employee-form.component').then((m) => m.EmployeeFormComponent),
    title: 'Add Employee | StaffSpace'
  },
  {
    path: 'employees/:id/edit',
    loadComponent: () => import('./features/employee-form/employee-form.component').then((m) => m.EmployeeFormComponent),
    title: 'Edit Employee | StaffSpace'
  },
  { path: '**', redirectTo: 'employees' }
];
