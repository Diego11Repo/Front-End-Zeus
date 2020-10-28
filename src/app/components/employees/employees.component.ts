import { Component, OnInit } from "@angular/core";
import { EmployeeInterface } from "src/app/interfaces/employee.interface";

import { EmployeesService } from "../../services/employees.service";

/**
 * Angular decorator
 */
@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.scss"],
})
export class EmployeesComponent implements OnInit {
  /**
   * Employee
   */
  employees: EmployeeInterface;

  /**
   * @param employeeService
   */
  constructor(private employeeService: EmployeesService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees = () => {
    this.employeeService.getAllEmployees()
    .then( res => {
      this.employees = res;
    });
  };
}
