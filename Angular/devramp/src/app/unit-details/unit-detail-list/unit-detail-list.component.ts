import { Component, OnInit } from '@angular/core';

import { UnitDetailService } from '../../shared/unit-detail.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { UnitDetailComponent } from '../unit-detail/unit-detail.component';


@Component({
  selector: 'app-unit-detail-list',
  templateUrl: './unit-detail-list.component.html',
  styles: []
})
export class UnitDetailListComponent implements OnInit {

  constructor(private service: UnitDetailService, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit() {
    this.service.refreshList();
  }
  onDelete(Id) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.service.deleteUnitDetail(Id)
        .subscribe(res => {
          this.service.refreshList();
          this.toastr.warning('Deleted successfully', 'Item detail register');
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
    this.dialog.open(UnitDetailComponent, dialogConfig);
  }
}
