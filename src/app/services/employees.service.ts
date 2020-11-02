import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { debounceTime, delay, switchMap, tap } from "rxjs/operators";

import { EmployeeInterface } from "../interfaces/employee.interface";
import { SortColumn, SortDirection } from "../directives/sortable.directive";

interface SearchResult {
  employees: EmployeeInterface[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(
  employees: EmployeeInterface[],
  column: SortColumn,
  direction: string
): EmployeeInterface[] {
  if (direction === "" || column === "") {
    return employees;
  } else {
    return [...employees].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === "asc" ? res : -res;
    });
  }
}

function matches(employee: EmployeeInterface, term: string) {
  return (
    employee.name.toLowerCase().includes(term.toLowerCase()) ||
    employee.last_name.toLowerCase().includes(term.toLowerCase()) ||
    employee.birthday.toString().includes(term.toString())
  );
}

@Injectable({
  providedIn: "root",
})
export class EmployeesService {
  data: EmployeeInterface[];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _employees$ = new BehaviorSubject<EmployeeInterface[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: "",
    sortColumn: "",
    sortDirection: "",
  };

  constructor(private http: HttpClient) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._employees$.next(result.employees);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get employees$() {
    return this._employees$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {
      sortColumn,
      sortDirection,
      pageSize,
      page,
      searchTerm,
    } = this._state;

    // 1. sort
    let employees = sort(this.data, sortColumn, sortDirection);

    // 2. filter
    employees = employees.filter((employee) => {
      return matches(employee, searchTerm);
    });
    const total = employees.length;

    // 3. paginate
    employees = employees.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({ employees, total });
  }

  async getAllEmployees() {
    const res = await this.http
      .get(
        "https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/diego"
      )
      .toPromise();
    return this.data = res["data"].employees;
  }

  createNewEmployee(employee: EmployeeInterface) {
    return this.http.post("https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/diego", employee);
  }
}
