import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';
import { LeadsComponent } from './pages/leads/leads.component';
import { AgentsComponent } from './pages/agents/agents.component';
import { LeadComponent } from './pages/lead/lead.component';
import { OffersComponent } from './pages/offers/offers.component';
import { BannersComponent } from './pages/banners/banners.component';
import { LendersComponent } from './pages/lenders/lenders.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ViewagentComponent } from './pages/viewagent/viewagent.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddproductComponent } from './pages/addproduct/addproduct.component';
import { ViewproductComponent } from './pages/viewproduct/viewproduct.component';
import { CategoryComponent } from './pages/category/category.component';
import { AddcategoryComponent } from './pages/addcategory/addcategory.component';
import { EditcategoryComponent } from './pages/editcategory/editcategory.component';
import { UsersComponent } from './pages/users/users.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { EdititemsComponent } from './pages/edititems/edititems.component';
import { EditofferComponent } from './pages/editoffer/editoffer.component';
import { ViewuserComponent } from './pages/viewuser/viewuser.component';
import { VieworderComponent } from './pages/vieworder/vieworder.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AdduserComponent } from './pages/adduser/adduser.component';
import { AdditemsComponent } from './pages/additems/additems.component';
import { AddsubitemComponent } from './pages/addsubitem/addsubitem.component';
import { UpdatesubitemComponent } from './pages/updatesubitem/updatesubitem.component';
import { UpdateproductComponent } from './pages/updateproduct/updateproduct.component';
import { NillComponent } from './pages/nill/nill.component';
import {  AuthGuardService as AuthGuard } from './services/auth-guard.service';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]

      },{
        path: 'offers',
        component: OffersComponent,
        canActivate: [AuthGuard]

      },
      {
        path: 'viewagent/:id',
        component: ViewagentComponent,
        canActivate: [AuthGuard]
        },
        {
        path: 'vieworder/:id',
        component: VieworderComponent,
        canActivate: [AuthGuard]
        },
        {
        path: 'viewuser/:id',
        component: ViewuserComponent,
        canActivate: [AuthGuard]
        },
        {
        path: 'edititems/:id',
        component: EdititemsComponent,
        canActivate: [AuthGuard]
        },
        {
        path: 'editoffer/:id',
        component: EditofferComponent,
        canActivate: [AuthGuard]
        },
         {
        path: 'nill',
        component: NillComponent,
        canActivate: [AuthGuard]
        },
       {
        path: 'leads',
        component: LeadsComponent,
        canActivate: [AuthGuard]

      },
       {
        path: 'notifications',
        component: NotificationsComponent,
        canActivate: [AuthGuard]

      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthGuard]

      },
        {
        path: 'agents',
        component: AgentsComponent,
        canActivate: [AuthGuard]

      }, 
       {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard]

      },
      {
        path: 'adduser',
        component: AdduserComponent,
        canActivate: [AuthGuard]

      },
         {
        path: 'category',
        component: CategoryComponent,
        canActivate: [AuthGuard]

      },
        {
        path: 'addcategory',
        component: AddcategoryComponent,
        canActivate: [AuthGuard]

      },
       {
        path: 'editcategory/:id',
        component: EditcategoryComponent,
        canActivate: [AuthGuard]

      },
        {
        path: 'additems',
        component: AdditemsComponent,
        canActivate: [AuthGuard]

      }, 
         {
        path: 'addsubitems/:id',
        component: AddsubitemComponent,
        canActivate: [AuthGuard]

      }, 
          {
        path: 'updatesubitems/:id',
        component: UpdatesubitemComponent,
        canActivate: [AuthGuard]

      }, 
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuard]

      },  
        {
        path: 'addproducts',
        component: AddproductComponent,
        canActivate: [AuthGuard]

      },
       {
        path: 'lead/:id',
        component: LeadComponent,
        canActivate: [AuthGuard]

      },
       {
        path: 'product/:id',
        component: UpdateproductComponent,
        canActivate: [AuthGuard]

      },
       {
        path: 'banners',
        component: BannersComponent
      },
      {
        path: 'lenders',
        component: LendersComponent,
        canActivate: [AuthGuard]

      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard]

      },
      {
        path: 'sample-page',
        loadChildren: () => import('./demo/pages/sample-page/sample-page.module').then(module => module.SamplePageModule)
      },
      {
        path: '',
        loadChildren: () => import('./demo/pages/sample-page/sample-page.module').then(module => module.SamplePageModule)
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
