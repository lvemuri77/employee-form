import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class EmployeeService {
	public listEmployees: Employee[] = [
	{
      id: 1,
      name: 'Mark',
      gender: 'Male',
      contactPreference: 'Email',
      email: 'mark@pragimtech.com',
      dateOfBirth: new Date('10/25/1988'),
      department: '3',
      isActive: true,
      photoPath: 'assets/images/mark.png',
      password:null,
      confirmPassword:null
    },
    {
      id: 2,
      name: 'Mary',
      gender: 'Female',
      contactPreference: 'Phone',
      phoneNumber: 2345978640,
      dateOfBirth: new Date('11/20/1979'),
      department: '2',
      isActive: true,
      photoPath: 'assets/images/mary.png',
      password:null,
      confirmPassword:null
    },
    {
      id: 3,
      name: 'John',
      gender: 'Male',
      contactPreference: 'Phone',
      phoneNumber: 5432978640,
      dateOfBirth: new Date('3/25/1976'),
      department: '3',
      isActive: false,
      photoPath: 'assets/images/john.png',
      password:null,
      confirmPassword:null
    },
	];

	getEmployees(): Observable<Employee[]> {
    return of(this.listEmployees).pipe(delay(500));
}

  getEmployee(id: number): Employee {
    return this.listEmployees.find(e => e.id === id);
  }

	save(employee:Employee) {
    if(employee.id === null) {
      const maxid= this.listEmployees.reduce(function (e1,e2) {
        return (e1.id > e2.id) ?e1 : e2;
      }).id;
      employee.id = maxid + 1;
      this.listEmployees.push(employee);
    } else {
      const foundIndex = this.listEmployees.findIndex(e => e.id === employee.id);
      this.listEmployees[foundIndex] = employee;
    }
	}

  deleteEmployee(id : number) {
      const i = this.listEmployees.findIndex(e => e.id === id);
        if (i !== -1 ) {
          this.listEmployees.splice(i,1);
        }
        
      }
    }
