import { Component, OnInit, Renderer2, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MovementDetailService } from '../../shared/movement-detail.service';
import { ToastrService } from 'ngx-toastr';
import { PutupDetail } from '../../shared/putup-detail.model';
import { StaffDetail } from '../../shared/staff-detail.model';
import { PutupDetailService } from '../../shared/putup-detail.service';
import { StaffDetailService } from '../../shared/staff-detail.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-movement-detail',
  templateUrl: './movement-detail.component.html',
  styles: []
})
export class MovementDetailComponent implements OnInit {
  // PutUp dropdown validation
  @Output() putUpSelected = new EventEmitter(); // <-- define output parameter

  submitEnabledOnPutUp: boolean = false;
 
  onPutUpChange(putUpSelected) {
    this.putUpSelected.emit(putUpSelected); // <-- emit when a putup selected
    // console.log(unitSelected);
    if (putUpSelected == null || putUpSelected == "null") {
      this.submitEnabledOnPutUp = false;

    } else {
      this.submitEnabledOnPutUp = true;
    }
  }
  // Staff dropdown validation
  @Output() staffSelected = new EventEmitter(); // <-- define output parameter
  submitEnabledOnStaff: boolean = false;
  onStaffChange(staffSelected) {
    this.staffSelected.emit(staffSelected); // <-- emit when a unit selected
    // console.log(unitSelected);
    if (staffSelected == null || staffSelected == "null")
      this.submitEnabledOnStaff = false;
    else
      this.submitEnabledOnStaff = true;
  }

  // Populate PutUp && Staff DDL
  putUpList: PutupDetail[];
  staffList: StaffDetail[];
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<MovementDetailComponent>,
    private service: MovementDetailService,
    private putUpDetailService: PutupDetailService,
    private staffDetailService: StaffDetailService,
    private toastr: ToastrService,
    private ren: Renderer2) {
    let el = document.getElementsByClassName('mat-dialog-container').item(0);
    ren.setStyle(el, 'overflow-y', 'scroll')
  }

  ngOnInit() {
    this.putUpDetailService.getPutUpList().then(res => this.putUpList = res as PutupDetail[]);
    this.staffDetailService.getStaffList().then(res => this.staffList = res as StaffDetail[]);
    this.dialogRef.updateSize('50%', '80%');

    if (this.data.itemIndex == null) {//console.log('reset')
      this.resetForm();
    } else {
      console.log('no reset form');
      // while updating keep submit btn enabled responsible for 2 ddl(PutUp, Staff)
      this.submitEnabledOnPutUp = true;
      this.submitEnabledOnStaff = true;
      // this.populateForm(pd);
      // this.formData = Object.assign({}, this.data.itemIndex);
      //  pd = ;
      this.service.formData = Object.assign({}, this.data.itemIndex);
      console.log(this.service.formData);
    }
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      Id: 0,
      PutUpId: null,
      StaffId: null,
      Name: '',
      SeqNo: '',
      Comments: '',
      ReceiveData: '',
      ActionDate: null,
      CreatedDate: null,
      ModifiedDate: null,
      CreatedBy: '',
      ModifiedBy: ''
    }
  }


  onMovementDetailSubmit(form: NgForm) {
    //form.value
    if (this.service.formData.Id == 0)
      this.insertRecord(form);

    else
      // update
      this.updateRecord(form);

  }
  insertRecord(form: NgForm) {
    //console.log(this.data);
    this.service.postMovementDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Movement detail registerd');
        this.service.refreshList();
        this.dialogRef.close();
      },
      err => {
        console.log(err);
      }
    )
  }
  updateRecord(form: NgForm) {
    this.service.putMovementDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Movement detail registerd');
        this.service.refreshList();
        this.dialogRef.close();
      },
      err => {
        console.log(err);
      }
    )
  }
}
