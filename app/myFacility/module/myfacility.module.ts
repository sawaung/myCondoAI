import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MyFacilityService } from '../services/myfacility.service';
import { MyFacilityComponent } from '../../myFacility/components/myfacility/myfacility.component';
//import { MyFeedsComponent } from '../../myFeed/components/myfeeds.component';
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { SharedModule } from "../../shared/shared.module";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
const routes: Routes = [

 { path: '', component: MyFacilityComponent },
  //{ path: '', component: MyFeedsComponent },

];

@NgModule({
  imports: [
    NativeScriptModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],

  declarations: [
    MyFacilityComponent,
  ],

  entryComponents: [],

  providers: [
    MyFacilityService
  ],
})
export class MyFacilityModule { }






