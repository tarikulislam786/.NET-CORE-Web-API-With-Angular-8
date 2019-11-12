import { Component, OnInit } from '@angular/core';

import { MovementDetailService } from '../../shared/movement-detail.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MovementDetailComponent } from '../movement-detail/movement-detail.component';
@Component({
  selector: 'app-movement-detail-list',
  templateUrl: './movement-detail-list.component.html',
  styles: []
})
export class MovementDetailListComponent implements OnInit {

  constructor(private service: MovementDetailService, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit() {
    this.service.refreshList();
  }

  onDelete(Id) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.service.deleteMovementDetail(Id)
        .subscribe(res => {
          this.service.refreshList();
          this.toastr.warning('Deleted successfully', 'Movement detail register');
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
    this.dialog.open(MovementDetailComponent, dialogConfig);
  }
}
