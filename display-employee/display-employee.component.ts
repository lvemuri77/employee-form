import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Employee } from '../../models/employee.model';
import {ActivatedRoute,Router} from '@angular/router';
import { EmployeeService } from '.././employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
	public selectedEmployeeId;
	
	@Input() employee: Employee;
	@Input() searchTerm: string;

	constructor(private _route: ActivatedRoute,
		          private _router: Router,
              private _employeeService: EmployeeService) { }

	ngOnInit() {
		this.selectedEmployeeId= this._route.snapshot.paramMap.get('id');
	}


  	viewEmployee() {
      this._router.navigate(['/employees', this.employee.id], {
        queryParams: {'searchTerm':this.searchTerm}
      });
  	}

  	editEmployee() {
      this._router.navigate(['/edit', this.employee.id]);
  	}

    deleteEmployee() {
      this._employeeService.deleteEmployee(this.employee.id);
    }
}
