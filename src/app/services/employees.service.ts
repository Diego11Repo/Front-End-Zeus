import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class EmployeesService {
  constructor(private http: HttpClient) {}

  async getAllEmployees() {
    const res = await this.http.get(
      "https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/donald"
    )
      .toPromise();
    const data = res['data'];
    return data.employees;
  };
}
