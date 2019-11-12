import { Injectable } from '@angular/core';
import { CalculationDetail } from './calculation-detail.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalculationDetailService {

  formData: CalculationDetail;
  readonly rootUrl = 'http://localhost:51383';
  list: CalculationDetail[];
  constructor(private http: HttpClient) { }

  postCalculationDetail() {
    //console.log(this.formData);
    return this.http.post(this.rootUrl + '/api/Calculation', this.formData);
  }
  putCalculationDetail() {
    return this.http.put(this.rootUrl + '/api/Calculation/' + this.formData.Id, this.formData);
  }
  deleteCalculationDetail(Id) {
    return this.http.delete(this.rootUrl + '/api/Calculation/' + Id);
  }
  refreshList() {
    this.http.get(this.rootUrl + '/api/Calculation')
      .toPromise()
      .then(res => this.list = res as CalculationDetail[]);
  }
  //getStaffList() {
  //  return this.http.get(this.rootUrl + '/api/Calculation').toPromise();
  //}
}
