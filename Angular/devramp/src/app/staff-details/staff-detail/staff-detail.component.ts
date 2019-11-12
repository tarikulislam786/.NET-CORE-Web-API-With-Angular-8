import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UnitDetail } from 'src/app/shared/unit-detail.model';
import { UnitDetailService } from 'src/app/shared/unit-detail.service';
import { NgForm } from '@angular/forms';
import { DepartmentDetail } from 'src/app/shared/department-detail.model';
import { DepartmentDetailService } from 'src/app/shared/department-detail.service';
import { StaffDetailService } from 'src/app/shared/staff-detail.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styles: []
})
export class StaffDetailComponent implements OnInit {

  // Unit dropdown validation
  @Output() unitSelected = new EventEmitter(); // <-- define output parameter
 
  submitEnabledOnUnit: boolean = false;
  
  onUnitChange(unitSelected) {
    this.unitSelected.emit(unitSelected); // <-- emit when a unit selected
   // console.log(unitSelected);
    if (unitSelected == null || unitSelected == "null") {
      this.submitEnabledOnUnit = false;
      
    } else {
      this.submitEnabledOnUnit = true;
    }
  }
  // Department dropdown validation
  @Output() departmentSelected = new EventEmitter(); // <-- define output parameter
  submitEnabledOnDepartment: boolean = false;
  onDepartmentChange(departmentSelected) {
    this.departmentSelected.emit(departmentSelected); // <-- emit when a unit selected
    // console.log(unitSelected);
    if (departmentSelected == null || departmentSelected == "null")
      this.submitEnabledOnDepartment = false;
    else
      this.submitEnabledOnDepartment = true;
  }

  // Populate Unit && Department DDL
  unitList: UnitDetail[];
  departmentList: DepartmentDetail[];
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<StaffDetailComponent>,
    private service: StaffDetailService,
    private unitDetailservice: UnitDetailService,
    private departmentDetailService: DepartmentDetailService,
    
    private toastr: ToastrService) { }

  ngOnInit() {
    //this.service.formData.UnitId = 0;
    this.unitDetailservice.getUnitList().then(res => this.unitList = res as UnitDetail[]);
    this.departmentDetailService.getDepartmentList().then(res => this.departmentList = res as DepartmentDetail[]);
    if (this.data.itemIndex == null) {//console.log('reset')
      this.resetForm();
    } else {
      console.log('no reset form');
      // while updating keep submit btn enabled responsible for 2 ddl(unit, department)
      this.submitEnabledOnUnit = true;
      this.submitEnabledOnDepartment = true;
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
      UnitId: null,
      DepartmentId: null,
      Name: '',
      CreatedDate: null,
      ModifiedDate: null,
      CreatedBy: '',
      ModifiedBy: ''
    }
  }
  onStaffDetailSubmit(form: NgForm) {
    //form.value
    if (this.service.formData.Id == 0)
      this.insertRecord(form);

    else
      // update
      this.updateRecord(form);

  }
  insertRecord(form: NgForm) {
    //console.log(this.data);
    this.service.postStaffDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Staff detail registerd');
        this.service.refreshList();
        this.dialogRef.close();
      },
      err => {
        console.log(err);
      }
    )
  }
  updateRecord(form: NgForm) {
    this.service.putStaffDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Staff detail registerd');
        this.service.refreshList();
        this.dialogRef.close();
      },
      err => {
        console.log(err);
      }
    )
  }


}
