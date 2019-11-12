import { Component, OnInit } from '@angular/core';
import { DepartmentDetailService } from '../../shared/department-detail.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DepartmentDetailComponent } from '../department-detail/department-detail.component';

@Component({
  selector: 'app-department-detail-list',
  templateUrl: './department-detail-list.component.html',
  styles: []
})
export class DepartmentDetailListComponent implements OnInit {

  constructor(private service: DepartmentDetailService, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit() {
    this.service.refreshList();
  }
  onDelete(Id) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.service.deleteDepartmenDetail(Id)
        .subscribe(res => {
          this.service.refreshList();
          this.toastr.warning('Deleted successfully', 'Department detail register');
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
    this.dialog.open(DepartmentDetailComponent, dialogConfig);
  }

}
