import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
//import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserComponent } from './user/user.component';

//import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { UserService } from './shared/user.service';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemDetailComponent } from './item-details/item-detail/item-detail.component';
import { ItemDetailListComponent } from './item-details/item-detail-list/item-detail-list.component';
import { ItemDetailService } from './shared/item-detail.service';
import { UnitDetailService } from './shared/unit-detail.service';
import { PutupDetailService } from './shared/putup-detail.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { PutupDetailsComponent } from './putup-details/putup-details.component';
import { PutupDetailComponent } from './putup-details/putup-detail/putup-detail.component';
import { PutupDetailListComponent } from './putup-details/putup-detail-list/putup-detail-list.component';
import { UnitDetailsComponent } from './unit-details/unit-details.component';
import { UnitDetailComponent } from './unit-details/unit-detail/unit-detail.component';
import { UnitDetailListComponent } from './unit-details/unit-detail-list/unit-detail-list.component';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { DepartmentDetailComponent } from './department-details/department-detail/department-detail.component';
import { DepartmentDetailListComponent } from './department-details/department-detail-list/department-detail-list.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';
import { StaffDetailComponent } from './staff-details/staff-detail/staff-detail.component';
import { StaffDetailListComponent } from './staff-details/staff-detail-list/staff-detail-list.component';
import { DepartmentDetailService } from './shared/department-detail.service';
import { StaffDetailService } from './shared/staff-detail.service';
import { MovementDetailsComponent } from './movement-details/movement-details.component';
import { MovementDetailComponent } from './movement-details/movement-detail/movement-detail.component';
import { MovementDetailListComponent } from './movement-details/movement-detail-list/movement-detail-list.component';
import { MovementDetailService } from './shared/movement-detail.service';
import { CalculationDetailService } from './shared/calculation-detail.service';
import { CalculationDetailsComponent } from './calculation-details/calculation-details.component';
import { CalculationDetailComponent } from './calculation-details/calculation-detail/calculation-detail.component';
import { CalculationDetailListComponent } from './calculation-details/calculation-detail-list/calculation-detail-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalculationDetailsComponent,
    CalculationDetailComponent,
    CalculationDetailListComponent,
    SignUpComponent,
    SignInComponent,
    UserComponent,
    
    AdminPanelComponent,
    ForbiddenComponent,
    ItemDetailsComponent,
    ItemDetailComponent,
    ItemDetailListComponent,
    PutupDetailsComponent,
    PutupDetailComponent,
    PutupDetailListComponent,
    UnitDetailsComponent,
    UnitDetailComponent,
    UnitDetailListComponent,
    DepartmentDetailsComponent,
    DepartmentDetailComponent,
    DepartmentDetailListComponent,
    StaffDetailsComponent,
    StaffDetailComponent,
    StaffDetailListComponent,
    MovementDetailsComponent,
    MovementDetailComponent,
    MovementDetailListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule
    //RouterModule.forRoot(appRoutes)
  ],
  /* If use the commented providers, then cannot login .. dont know why */
  providers: [UserService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },ItemDetailService,
    PutupDetailService,
    UnitDetailService,
    DepartmentDetailService,
    StaffDetailService,
    MovementDetailService,
    CalculationDetailService
  ],
  // providers: [UserService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
