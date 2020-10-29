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
  employees: EmployeeInterface[];

  /**
   * Pagination variables
   */
  page = 1;
  pageSize = 10;
  collectionSize;

  /**
   * @param employeeService
   */
  constructor(private employeeService: EmployeesService) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees = () => {
    this.employeeService.getAllEmployees().then((res) => {
      this.employees = res;
      this.collectionSize = this.employees.length;
      this.refreshEmployees()
    });
  };

  refreshEmployees = () => {
    this.employees = this.employees
      .map((employee, index) => ({ id: index + 1, ...employee }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  };
}
