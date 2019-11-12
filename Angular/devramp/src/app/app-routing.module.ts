import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemDetailComponent } from './item-details/item-detail/item-detail.component';
import { PutupDetailsComponent } from './putup-details/putup-details.component';
import { PutupDetailComponent } from './putup-details/putup-detail/putup-detail.component';
import { UnitDetailsComponent } from './unit-details/unit-details.component';
import { UnitDetailComponent } from './unit-details/unit-detail/unit-detail.component';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { DepartmentDetailComponent } from './department-details/department-detail/department-detail.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';
import { StaffDetailComponent } from './staff-details/staff-detail/staff-detail.component';
import { MovementDetailsComponent } from './movement-details/movement-details.component';
import { MovementDetailComponent } from './movement-details/movement-detail/movement-detail.component';
import { CalculationDetailsComponent } from './calculation-details/calculation-details.component';
import { CalculationDetailComponent } from './calculation-details/calculation-detail/calculation-detail.component';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //{ path: '', redirectTo: '/items', pathMatch: 'full' },
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'item-details', component: ItemDetailsComponent, canActivate: [AuthGuard] },
  { path: 'item-details/item', component: ItemDetailComponent, canActivate: [AuthGuard] },

  { path: 'putup-details', component: PutupDetailsComponent, canActivate: [AuthGuard] },
  { path: 'putup-details/item', component: PutupDetailComponent, canActivate: [AuthGuard] },

  { path: 'unit-details', component: UnitDetailsComponent, canActivate: [AuthGuard] },
  { path: 'unit-details/item', component: UnitDetailComponent, canActivate: [AuthGuard] },

  { path: 'department-details', component: DepartmentDetailsComponent, canActivate: [AuthGuard] },
  { path: 'department-details/item', component: DepartmentDetailComponent, canActivate: [AuthGuard] },

  { path: 'staff-details', component: StaffDetailsComponent, canActivate: [AuthGuard] },
  { path: 'staff-details/item', component: StaffDetailComponent, canActivate: [AuthGuard] },

  { path: 'movement-details', component: MovementDetailsComponent, canActivate: [AuthGuard] },
  { path: 'movement-details/item', component: MovementDetailComponent, canActivate: [AuthGuard] },
  /* {
     path: 'item', children: [
       { path: '', component: ItemComponent, canActivate: [AuthGuard] },
       { path: 'edit/:id', component: ItemComponent, canActivate: [AuthGuard] }
     ]
   },*/
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'adminpanel', component: AdminPanelComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'calculation-details', component: CalculationDetailsComponent, canActivate: [AuthGuard] },
  { path: 'calculation-details/item', component: CalculationDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
