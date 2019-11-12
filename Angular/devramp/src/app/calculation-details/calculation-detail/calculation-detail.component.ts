import { Component, OnInit, Inject } from '@angular/core';
import { CalculationDetail } from '../../shared/calculation-detail.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalculationDetailService } from '../../shared/calculation-detail.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-calculation-detail',
  templateUrl: './calculation-detail.component.html',
  styles: []
})
export class CalculationDetailComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<CalculationDetailComponent>,
    private service: CalculationDetailService,
    private toastr: ToastrService) { }
  //  calculationList: CalculationDetail[];
  

  ngOnInit() {
    if (this.data.itemIndex == null) {//console.log('reset')
      this.resetForm();
    } else {
      console.log('no reset form');
      // while updating keep submit btn enabled responsible for 2 ddl(unit, department)
     // this.submitEnabledOnUnit = true;
    //  this.submitEnabledOnDepartment = true;
      // this.populateForm(pd);
      // this.formData = Object.assign({}, this.data.itemIndex);
      //  pd = ;
      this.service.formData = Object.assign({}, this.data.itemIndex);
      //console.log(this.service.formData);
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      Id: 0,
      EmployeeId: 0,
      Num1: 0,
      Num2: 0,
      Sum:0,
      CreatedDate: null,
      ModifiedDate: null,
      CreatedBy: '',
      ModifiedBy: ''
    }
  }

  onCalculationDetailSubmit(form: NgForm) {
    //form.value
    if (this.service.formData.Id == 0)
      this.insertUpdateRecord(form);

    else
      // update
      this.insertUpdateRecord(form);

  }
  insertUpdateRecord(form: NgForm) {
    //console.log(this.data);
    this.service.postCalculationDetail().subscribe(
     /* res => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Calculation detail registerd');
        this.service.refreshList();
        this.dialogRef.close();
      },*/
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Calculation detail registerd');
        this.service.refreshList();
        this.dialogRef.close();
      },
      err => {
        console.log(err);
      }
    )
  }
}
