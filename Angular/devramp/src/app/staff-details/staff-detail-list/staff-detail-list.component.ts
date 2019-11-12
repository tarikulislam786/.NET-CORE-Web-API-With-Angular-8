import { Component, OnInit } from '@angular/core';

import { StaffDetailService } from '../../shared/staff-detail.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { StaffDetailComponent } from '../staff-detail/staff-detail.component';
@Component({
  selector: 'app-staff-detail-list',
  templateUrl: './staff-detail-list.component.html',
  styles: []
})
export class StaffDetailListComponent implements OnInit {
  constructor(private service: StaffDetailService, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit() {
    this.service.refreshList();
  }

  onDelete(Id) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.service.deleteStaffDetail(Id)
        .subscribe(res => {
          this.service.refreshList();
          this.toastr.warning('Deleted successfully', 'Staff detail register');
        }, err => {
          console.log(err);
        }
        )
    }

  }
  AddOrEditItem(itemIndex, Id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { itemIndex, Id }
    this.dialog.open(StaffDetailComponent, dialogConfig);
    
  }

}
