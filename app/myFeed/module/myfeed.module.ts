import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
//import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { BusyModule } from 'angular2-busy';
//import { MomentModule } from 'angular2-moment';

import { MyFeedService } from '../services/myfeed.service';
//import { SummerNoteComponent } from '../../myFeed/components/summernote/summernote.component';
import { MyFeedsComponent } from '../../myFeed/components/myfeeds.component';
import { MyFeedComponent } from '../../myFeed/components/myfeed.component';
import { MyFeedDetailComponent } from '../../myFeed/components/myfeeddetail.component';
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { SharedModule } from "../../shared/shared.module";
import { MyFeedFilterComponent } from "../../myFeed/components/myfeedfilter.component";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { MyFeedSearchComponent } from "../../myFeed/components/myfeedsearch.component";
import { MyFeedFilterResultComponent } from "../../myFeed/components/myfeedfilterresult.component";
import { myfeedCreateDialog } from "../../myFeed/components/dialog/myfeedCreateDialog.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
//import { FeedImageModalComponent } from '../../myFeed/components/dialog/feedimagemodal.component';
import { NativeScriptUICalendarModule } from "nativescript-pro-ui/calendar/angular";

const routes: Routes = [
  { path: '', component: MyFeedsComponent },
  { path: ':id/view', component: MyFeedDetailComponent },
  { path: 'edit', component: MyFeedComponent },
  { path: 'new', component: MyFeedComponent },
  { path: 'filter', component: MyFeedFilterComponent },
  { path: 'search', component: MyFeedSearchComponent },
  { path: 'fiterresult', component: MyFeedFilterResultComponent },


];

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    SharedModule,
    NativeScriptUIListViewModule,
    NativeScriptUICalendarModule,
    RouterModule.forChild(routes)
  ],

  declarations: [
    MyFeedsComponent,
    MyFeedComponent,myfeedCreateDialog,
    MyFeedDetailComponent,
    MyFeedFilterComponent,
    MyFeedSearchComponent,
    MyFeedFilterResultComponent
  ],

  providers: [
    MyFeedService
  ],

  entryComponents: [myfeedCreateDialog],

})

export class MyFeedModule { }
