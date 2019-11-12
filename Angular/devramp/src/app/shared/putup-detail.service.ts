import { Injectable } from '@angular/core';
import { PutupDetail } from './putup-detail.model';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class PutupDetailService {

  formData: PutupDetail;
  readonly rootUrl = 'http://localhost:51383';
  list: PutupDetail[];
  constructor(private http: HttpClient) { }
  postPutUpDetail() {
    console.log(this.formData);
    return this.http.post(this.rootUrl + '/api/PutUp', this.formData);
  }
  putUpDetail() {
    return this.http.put(this.rootUrl + '/api/PutUp/' + this.formData.Id, this.formData);
  }
  deletePutUpDetail(Id) {
    return this.http.delete(this.rootUrl + '/api/PutUp/' + Id);
  }
  refreshList() {
    this.http.get(this.rootUrl + '/api/PutUp')
      .toPromise()
      .then(res => this.list = res as PutupDetail[]);
  }

  getPutUpList() {
    return this.http.get(this.rootUrl + '/api/PutUp').toPromise();
  }
}
