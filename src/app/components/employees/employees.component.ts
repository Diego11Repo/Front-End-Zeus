import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/directives/sortable.directive';

import { EmployeeInterface } from "../../interfaces/employee.interface";
import { EmployeesService } from "../../services/employees.service";

/**
 * Angular decorator
 */
@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.scss"],
  providers: [EmployeesService, DecimalPipe]
})
export class EmployeesComponent implements OnInit {
  /**
   * Employee
   */
  employees$: Observable<EmployeeInterface[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  /**
   * @param employeeService
   */
  constructor(public service: EmployeesService) { 
    this.employees$ = service.employees$;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent) {
    this.headers.forEach( header => {
      if(header.sortable !== column) {
        header.direction = ''
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  ngOnInit(): void {}
}
