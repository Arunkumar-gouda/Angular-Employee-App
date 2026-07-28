import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly employeeService = inject(EmployeeService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  employeeId: number | null = null;
  readonly departments = ['Engineering', 'Design', 'Marketing', 'Finance', 'Human Resources', 'Sales', 'Operations'];
  readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    department: ['', Validators.required],
    salary: [0, [Validators.required, Validators.min(1)]]
  });

  get isEditing(): boolean { return this.employeeId !== null; }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (Number.isInteger(id) && id > 0) {
      const employee = this.employeeService.getById(id);
      if (!employee) { void this.router.navigate(['/employees']); return; }
      this.employeeId = id;
      this.form.patchValue(employee);
    }
  }

  isInvalid(controlName: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    if (this.employeeId === null) this.employeeService.add(this.form.getRawValue());
    else this.employeeService.update(this.employeeId, this.form.getRawValue());
    void this.router.navigate(['/employees']);
  }
}
