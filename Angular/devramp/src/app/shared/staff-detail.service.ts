import { Injectable } from '@angular/core';
import { StaffDetail } from './staff-detail.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StaffDetailService {

  formData: StaffDetail;
  readonly rootUrl = 'http://localhost:51383';
  list: StaffDetail[];
  constructor(private http: HttpClient) { }
  postStaffDetail() {
    //console.log(this.formData);
    return this.http.post(this.rootUrl + '/api/Staff', this.formData);
  }
  putStaffDetail() {
    return this.http.put(this.rootUrl + '/api/Staff/' + this.formData.Id, this.formData);
  }
  deleteStaffDetail(Id) {
    return this.http.delete(this.rootUrl + '/api/Staff/' + Id);
  }
  refreshList() {
    this.http.get(this.rootUrl + '/api/Staff')
      .toPromise()
      .then(res => this.list = res as StaffDetail[]);
  }
  getStaffList() {
    return this.http.get(this.rootUrl + '/api/Staff').toPromise();
  }
}
