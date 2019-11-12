import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DepartmentDetailService } from '../../shared/department-detail.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styles: []
})
export class DepartmentDetailComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DepartmentDetailComponent>,
    private service: DepartmentDetailService, private toastr: ToastrService) { }

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

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      Id: 0,
      Name: '',
      CreatedDate: null,
      ModifiedDate: null,
      CreatedBy: '',
      ModifiedBy: ''
    }
  }

  onDepartmentDetailSubmit(form: NgForm) {
    //form.value
    if (this.service.formData.Id == 0)
      this.insertRecord(form);

    else
      // update
      this.updateRecord(form);

  }
  insertRecord(form: NgForm) {
    //console.log(this.data);
    this.service.postDepartmentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Department detail registerd');
        this.service.refreshList();
        this.dialogRef.close();
      },
      err => {
        console.log(err);
      }
    )
  }
  updateRecord(form: NgForm) {
    this.service.putDepartmenDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Department detail registerd');
        this.service.refreshList();
        this.dialogRef.close();
      },
      err => {
        console.log(err);
      }
    )
  }

}
