import { Component, OnInit } from '@angular/core';
import { CalculationDetailService } from '../../shared/calculation-detail.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CalculationDetailComponent } from '../calculation-detail/calculation-detail.component';

@Component({
  selector: 'app-calculation-detail-list',
  templateUrl: './calculation-detail-list.component.html',
  styles: []
})
export class CalculationDetailListComponent implements OnInit {

  constructor(private service: CalculationDetailService, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit() {
    this.service.refreshList();
  }
  onDelete(Id) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.service.deleteCalculationDetail(Id)
        .subscribe(res => {
          this.service.refreshList();
          this.toastr.warning('Deleted successfully', 'Calculation detail register');
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
    this.dialog.open(CalculationDetailComponent, dialogConfig);

  }
}
