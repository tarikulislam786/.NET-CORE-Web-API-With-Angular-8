import { Component, OnInit } from '@angular/core';
import { PutupDetailService } from '../../shared/putup-detail.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { PutupDetailComponent } from '../putup-detail/putup-detail.component';
@Component({
  selector: 'app-putup-detail-list',
  templateUrl: './putup-detail-list.component.html',
  styles: []
})
export class PutupDetailListComponent implements OnInit {

  constructor(private service: PutupDetailService, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit() {
    this.service.refreshList();
  }

  onDelete(Id) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.service.deletePutUpDetail(Id)
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
    this.dialog.open(PutupDetailComponent, dialogConfig);
  }
}
