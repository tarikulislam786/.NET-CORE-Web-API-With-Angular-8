import { Injectable } from '@angular/core';
import { UnitDetail } from './unit-detail.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UnitDetailService {

  formData: UnitDetail;
  readonly rootUrl = 'http://localhost:51383';
  list: UnitDetail[];
  constructor(private http: HttpClient) { }
  postUnitDetail() {
    //console.log(this.formData);
    return this.http.post(this.rootUrl + '/api/Unit', this.formData);
  }
  putUnitDetail() {
    return this.http.put(this.rootUrl + '/api/Unit/' + this.formData.Id, this.formData);
  }
  deleteUnitDetail(Id) {
    return this.http.delete(this.rootUrl + '/api/Unit/' + Id);
  }
  refreshList() {
    this.http.get(this.rootUrl + '/api/Unit')
      .toPromise()
      .then(res => this.list = res as UnitDetail[]);
  }

  getUnitList() {
    return this.http.get(this.rootUrl + '/api/Unit').toPromise();
  }
}
