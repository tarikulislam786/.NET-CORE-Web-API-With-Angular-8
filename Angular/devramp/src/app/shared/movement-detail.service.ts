import { Injectable } from '@angular/core';
import { MovementDetail } from './movement-detail.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MovementDetailService {
  formData: MovementDetail;
  readonly rootUrl = 'http://localhost:51383';
  list: MovementDetail[];
  constructor(private http: HttpClient) { }
  postMovementDetail() {
    //console.log(this.formData);
    return this.http.post(this.rootUrl + '/api/MovementDetail', this.formData);
  }
  putMovementDetail() {
    console.log(this.formData);
    return this.http.put(this.rootUrl + '/api/MovementDetail/' + this.formData.Id, this.formData);
  }
  deleteMovementDetail(Id) {
    return this.http.delete(this.rootUrl + '/api/MovementDetail/' + Id);
  }
  refreshList() {
    this.http.get(this.rootUrl + '/api/MovementDetail')
      .toPromise()
      .then(res => this.list = res as MovementDetail[]);
  }
  /*getMovementDetilList() {
    return this.http.get(this.rootUrl + '/api/MovementDetail').toPromise();
  }*/
}
