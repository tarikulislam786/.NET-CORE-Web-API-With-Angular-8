import { Injectable } from '@angular/core';
import { DepartmentDetail } from './department-detail.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DepartmentDetailService {

  formData: DepartmentDetail;
  readonly rootUrl = 'http://localhost:51383';
  list: DepartmentDetail[];
  constructor(private http: HttpClient) { }
  postDepartmentDetail() {
    //console.log(this.formData);
    return this.http.post(this.rootUrl + '/api/Department', this.formData);
  }
  putDepartmenDetail() {
    return this.http.put(this.rootUrl + '/api/Department/' + this.formData.Id, this.formData);
  }
  deleteDepartmenDetail(Id) {
    return this.http.delete(this.rootUrl + '/api/Department/' + Id);
  }
  refreshList() {
    this.http.get(this.rootUrl + '/api/Department')
      .toPromise()
      .then(res => this.list = res as DepartmentDetail[]);
  }
  getDepartmentList() {
    return this.http.get(this.rootUrl + '/api/Department').toPromise();
  }
}
