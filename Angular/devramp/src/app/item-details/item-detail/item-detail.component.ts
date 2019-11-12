import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ItemDetailService } from '../../shared/item-detail.service';
import { ItemDetail } from '../../shared/item-detail.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styles: []
})
export class ItemDetailComponent implements OnInit {
 // formData: ItemDetail;
  defaultImageUrl: string = "/assets/img/default-upload.jpg";
  imageUrl: string = "http://localhost:51383/Images/";
  fileToUpload: File = null;
  constructor(
  @Inject(MAT_DIALOG_DATA) public data,
  public dialogRef:MatDialogRef<ItemDetailComponent> ,
  private service: ItemDetailService, private toastr: ToastrService) { }

  ngOnInit() {
    
    if (this.data.itemIndex == null) {//console.log('reset')
      this.resetForm();
    } else {
       console.log('no reset')
     // this.populateForm(pd);
      // this.formData = Object.assign({}, this.data.itemIndex);
    //  pd = ;
      this.service.formData = Object.assign({}, this.data.itemIndex);
    }
    
  }
  // file upload
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    // show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.defaultImageUrl = event.target.result;
      if (this.service.formData.Photo != '')
        this.defaultImageUrl = event.target.result;
      //  this.service.formData.Photo = '';
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  resetForm(form?: NgForm) {
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      Id:0,
      Name: '',
      Photo: '',
      PhotoFile: '',
      Price: 0,
      CreatedDate:null,
      ModifiedDate: null,
      CreatedBy:'',
      ModifiedBy:''
    }
  }
  onItemDetailSubmit(Name, PhotoFile, Price, Photo) {
    //form.value
    //if (files.length === 0) {
    //  return;
    //}
    //let fileToUpload = <File>files[0];
    //const formData = new FormData();
    //formData.append('Photo', fileToUpload, fileToUpload.name);
    //formData.append('Name', Name);
    //formData.append('Price', Price);
    //if (this.service.formData.Id == 0)
    //  this.insertRecord(form);

    //else
    //  // update
    //  this.updateRecord(form);
    if (this.service.formData.Id == 0) { // insert operation
      this.service.postItemDetail(Name.value, this.fileToUpload, Price.value, Photo.value).subscribe(
        res => {
          // this.resetForm(form);
          this.service.formData.Name = null;
          //PhotoFile.value = null;
          this.service.formData.PhotoFile = null;
          this.service.formData.Photo = null;
          this.service.formData.Price = null;
          this.defaultImageUrl = "/assets/img/default-upload.jpg";
          this.toastr.success('Submitted successfully', 'Item detail registerd');
          this.service.refreshList();
          this.dialogRef.close();
        },
        err => {
          console.log(err);
        }
      )
    } else { // update operation
      // this.service.putItemDetail(Name.value, this.fileToUpload, Price.value).subscribe(
      this.service.postItemDetail(Name.value, this.fileToUpload, Price.value, Photo.value).subscribe(
        res => {
          //console.log(this.service.formData.PhotoFile);
          //console.log(this.service.formData.Photo);
          // this.resetForm(form);
          this.service.formData.Name = null;
          //PhotoFile.value = null;
          this.service.formData.PhotoFile = null;
          this.service.formData.Photo = null;
          this.service.formData.Price = null;
          this.defaultImageUrl = "/assets/img/default-upload.jpg";
          this.toastr.success('Submitted successfully', 'Item detail registerd');
          this.service.refreshList();
          this.dialogRef.close();
        },
        err => {
          console.log(err);
        }
      )
    }
  }
  //insertRecord(form: NgForm) {
  //  //console.log(this.data);
  //  this.service.postItemDetail(Name.value, Photo, Price).subscribe(
  //    res => {
  //      this.resetForm(form);
  //      this.toastr.success('Submitted successfully', 'Item detail registerd');
  //      this.service.refreshList();
  //      this.dialogRef.close();
  //    },
  //    err => {
  //      console.log(err);
  //    }
  //  )
  //}
  //updateRecord(form: NgForm) {
  //  this.service.putItemDetail().subscribe(
  //    res => {
  //      this.resetForm(form);
  //      this.toastr.success('Submitted successfully', 'Item detail registerd');
  //      this.service.refreshList();
  //      this.dialogRef.close();
  //    },
  //    err => {
  //      console.log(err);
  //    }
  //  )
  //}

   
}
