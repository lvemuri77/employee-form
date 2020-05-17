import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Employee} from '../models/employee.model';
import {Department} from '../models/department.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {EmployeeService} from './employee.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

	@ViewChild('employeeForm',{static:true}) createEmployeeForm!: NgForm;

	panelTitle: string;
	employee: Employee;
	
	datePickerConfig: Partial<BsDatepickerConfig>;

	previewPhoto = false;
	departments: Department [] = [
		{id:1, name: 'Help Desk'},
		{id:2, name: 'HR'},
		{id:3, name: 'IT'},
		{id:4, name: 'Payroll'}
	]
  constructor( private _employeeService: EmployeeService,
  				private _router: Router,
  				private _route: ActivatedRoute) 
  { 
  	this.datePickerConfig= Object.assign({}, {containerClass: 'theme-dark-blue'});
  }
  togglePhotoPreview() {
  		this.previewPhoto = !this.previewPhoto ;
  }
  ngOnInit() {
  	 this._route.paramMap.subscribe(paramaterMap => {
  	 	const id = +paramaterMap.get('id');

  	 	this.getEmployee(id);
  	 })
  }


  saveEmployee(empForm: NgForm): void {
  	const newEmployee: Employee = Object.assign({},this.employee);
  	this._employeeService.save(newEmployee);
  	empForm.reset();
  	this._router.navigate(['list']);
  }

  public getEmployee(id: number) {
  	if (id === 0) {
  		this.employee = <Employee>{};

		this.panelTitle='Create Employee';
		this.createEmployeeForm.reset();
	}
		
	else {
		this.panelTitle='Edit Employee';
		this.employee = Object.assign({},this._employeeService.getEmployee(id));
	}
  	}
  



}
