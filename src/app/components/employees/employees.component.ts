import { DecimalPipe } from "@angular/common";
import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { Observable } from "rxjs";
import {
  NgbdSortableHeader,
  SortEvent,
} from "src/app/directives/sortable.directive";

import { EmployeeInterface } from "../../interfaces/employee.interface";
import { EmployeesService } from "../../services/employees.service";

/**
 * Angular decorator
 */
@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.scss"],
  providers: [EmployeesService, DecimalPipe],
})
export class EmployeesComponent implements OnInit {
  /**
   * Employee
   */
  employees$: Observable<EmployeeInterface[]>;
  total$: Observable<number>;

  /**
   * Input Values
   */
  newEmployee: EmployeeInterface;

  /**
   * Validation Button
   */
  validationButton: boolean;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  /**
   * @param employeeService
   */
  constructor(public service: EmployeesService) {
    this.employees$ = service.employees$;
    this.total$ = service.total$;
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  ngOnInit(): void {
    this.service.getAllEmployees();
    console.log(this.employees$)
  }

  handleSubmit = () => {

    const inputName = (<HTMLInputElement>document.querySelector("#inputName")).value;
    const inputLastName = (<HTMLInputElement>document.querySelector("#inputLastName")).value;
    const inputBirthday = Number((<HTMLInputElement>document.querySelector("#inputBirthday")).value);
    
    this.newEmployee = {
      id: '',
      name: inputName,
      last_name: inputLastName,
      birthday: inputBirthday
    };
    this.service.createNewEmployee(this.newEmployee)
    .subscribe(employee => {
    })
  };
}
