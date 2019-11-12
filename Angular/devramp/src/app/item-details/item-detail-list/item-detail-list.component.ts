import { Component, OnInit } from '@angular/core';
import { ItemDetailService } from '../../shared/item-detail.service';
import { ItemDetail } from '../../shared/item-detail.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ItemDetailComponent } from '../item-detail/item-detail.component';

@Component({
  selector: 'app-item-detail-list',
  templateUrl: './item-detail-list.component.html',
  styles: []
})
export class ItemDetailListComponent implements OnInit {
  imageUrl: string = "http://localhost:51383/Images/";
  constructor(private service: ItemDetailService, private toastr: ToastrService, private dialog: MatDialog) { }
  
  ngOnInit() {
   // this.service.formData.Id = null;
    this.service.refreshList();
  }
 /* populateForm(pd: ItemDetail) {
    //this.service.formData = pd;
    this.service.formData = Object.assign({},pd);
  } */
  onDelete(Id) {
    if (confirm('Are you sure you want to delete this record?')) {
    this.service.deleteItemDetail(Id)
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
    this.dialog.open(ItemDetailComponent, dialogConfig);
  }
}
