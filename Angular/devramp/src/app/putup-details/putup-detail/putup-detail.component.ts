import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PutupDetailService } from '../../shared/putup-detail.service';
import { PutupDetail } from '../../shared/putup-detail.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-putup-detail',
  templateUrl: './putup-detail.component.html',
  styles: []
})
export class PutupDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<PutupDetailComponent>,
    private service: PutupDetailService, private toastr: ToastrService,
    private ren: Renderer2) {
    let el = document.getElementsByClassName('mat-dialog-container').item(0);
    ren.setStyle(el, 'overflow-y', 'scroll')
  }
  
  ngOnInit() {
    this.dialogRef.updateSize('50%', '80%');
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
      Subject: '',
      Description: '',
      ReferenceNumber: '',
      ReceiveType: 0,
      VisitorName: '',
      VisitorMobileNumber: 0,
      VisitorMobileEmail: '',
      SendTo: '',
      SendingToUnitName: '',
      PutUpDate: null,
      BarCode: '',
      Status: 0,
      CreatedDate: null,
      ModifiedDate: null,
      CreatedBy: '',
      ModifiedBy: ''
    }

  }
  onPutUpDetailSubmit(form: NgForm) {
    //form.value
    if (this.service.formData.Id == 0)
      this.insertRecord(form);

    else
      // update
      this.updateRecord(form);

  }
    updateRecord(form: NgForm) {
      this.service.putUpDetail().subscribe(
        res => {
          this.resetForm(form);
          this.toastr.success('Submitted successfully', 'Item detail registerd');
          this.service.refreshList();
          this.dialogRef.close();
        },
        err => {
          console.log(err);
        }
      )
    }
    insertRecord(form: NgForm) {
      //console.log(this.data);
      this.service.postPutUpDetail().subscribe(
        res => {
          this.resetForm(form);
          this.toastr.success('Submitted successfully', 'Put up detail registerd');
          this.service.refreshList();
          this.dialogRef.close();
        },
        err => {
          console.log(err);
        }
      )
  }

}
