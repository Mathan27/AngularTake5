import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './theme/shared/shared.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import {NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { ToggleFullScreenDirective } from './theme/shared/full-screen/toggle-full-screen';
import {TinymceModule} from 'angular2-tinymce';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import {TagInputModule} from 'ngx-chips';
/* Menu Items */
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { LeadsComponent } from './pages/leads/leads.component';
import { AgentsComponent } from './pages/agents/agents.component';
import { LeadComponent } from './pages/lead/lead.component';
import {CustomFormsModule} from 'ng2-validation';
import {NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';
import {SelectModule} from 'ng-select';
import { BannersComponent } from './pages/banners/banners.component';
import { LendersComponent } from './pages/lenders/lenders.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule } from '@ionic/angular';
import { JwtModule } from '@auth0/angular-jwt';
// import { GlobalService } from './services/global.service';
import {ToastyModule} from 'ng2-toasty';
import { ViewagentComponent } from './pages/viewagent/viewagent.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
//import {AmazingTimePickerModule} from 'amazing-time-picker';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddproductComponent } from './pages/addproduct/addproduct.component';
import { ViewproductComponent } from './pages/viewproduct/viewproduct.component';
import { CategoryComponent } from './pages/category/category.component';
import { AdditemsComponent } from './pages/additems/additems.component';
import { UpdateproductComponent } from './pages/updateproduct/updateproduct.component';
import { NillComponent } from './pages/nill/nill.component';
import { AddsubitemComponent } from './pages/addsubitem/addsubitem.component';
import { UpdatesubitemComponent } from './pages/updatesubitem/updatesubitem.component';
import { RouterModule, Routes } from '@angular/router';
import { AddcategoryComponent } from './pages/addcategory/addcategory.component';
import { EditcategoryComponent } from './pages/editcategory/editcategory.component';
import { UsersComponent } from './pages/users/users.component';
import { AdduserComponent } from './pages/adduser/adduser.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ViewuserComponent } from './pages/viewuser/viewuser.component';
import { VieworderComponent } from './pages/vieworder/vieworder.component';
import { EdititemsComponent } from './pages/edititems/edititems.component';
import { OffersComponent } from './pages/offers/offers.component';
import { EditofferComponent } from './pages/editoffer/editoffer.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';

export function jwtTokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ConfigurationComponent,
    ToggleFullScreenDirective,
    LeadsComponent,
    AgentsComponent,
    LeadComponent,
    BannersComponent,
    LendersComponent,
    DashboardComponent,
    LoginComponent,
    ViewagentComponent,
    SettingsComponent,
    ProductsComponent,
    AddproductComponent,
    ViewproductComponent,
    CategoryComponent,
    AdditemsComponent,
    UpdateproductComponent,
    NillComponent,
    AddsubitemComponent,
    UpdatesubitemComponent,
    AddcategoryComponent,
    EditcategoryComponent,
    UsersComponent,
    AdduserComponent,
    OrdersComponent,
    ViewuserComponent,
    VieworderComponent,
    EdititemsComponent,
    OffersComponent,
    EditofferComponent,
    NotificationsComponent
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter

      }
    }),
    // RouterModule.forRoot([{ path: "welcome", component: AddprojectComponent }], { useHash: true }),
    RouterModule.forRoot([{ path: 'products' , component: ProductsComponent}], { useHash: true }),
    IonicModule.forRoot({mode: 'ios'}),
    IonicStorageModule.forRoot(),
    ToastyModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    FormsModule,
    DataTablesModule,
    TagInputModule,
    TinymceModule,
    CustomFormsModule,
    NgbProgressbarModule ,
    SelectModule,
    FileUploadModule,
    NgbAccordionModule,
    NgbCollapseModule,
   // AmazingTimePickerModule,
    NgbDatepickerModule,
    CommonModule,
    NgxSkeletonLoaderModule,

     ],
  providers: [NavigationItem],
  bootstrap: [AppComponent]
})
export class AppModule { }
