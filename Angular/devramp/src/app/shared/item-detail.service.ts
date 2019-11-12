import { Injectable, Output, EventEmitter } from '@angular/core';
import { ItemDetail } from './item-detail.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
}
//import { ItemDetailService } from '../../shared/item-detail.service';
@Injectable({
  providedIn: 'root'
})
export class ItemDetailService {
  formData: ItemDetail;
  readonly rootUrl = 'http://localhost:51383';
  list: ItemDetail[];
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private http: HttpClient) { }

  postItemDetail(Name: string, fileToUpload, Price, Photo: string) {
    const endpoint = this.rootUrl + '/api/ItemDetail/';
    const formData: FormData = new FormData();
    formData.append('Id', this.formData.Id.toString());
    formData.append('Name', Name);
    formData.append('Price', Price);
    //if ()
      if (fileToUpload != null) {
        formData.append('PhotoFile', fileToUpload, fileToUpload.name);
        formData.append('Photo', Photo);
      }
      
    
    else
      formData.append('Photo', Photo);
    return this.http.post(endpoint, formData);
   
  }

 // postItemDetail() {        
  //  //console.log(this.formData);
    
  //  return this.http.post(this.rootUrl + '/api/ItemDetail', this.formData);
  //}
  putItemDetail(Name: string, fileToUpload: File, Price) {
    return this.http.put(this.rootUrl + '/api/ItemDetail/' + this.formData.Id, this.formData);
  }
  deleteItemDetail(Id) {
    return this.http.delete(this.rootUrl + '/api/ItemDetail/' + Id);
  }
  refreshList() {
    this.http.get(this.rootUrl + '/api/ItemDetail')
      .toPromise()
      .then(res => this.list = res as ItemDetail[]);
  }
}
