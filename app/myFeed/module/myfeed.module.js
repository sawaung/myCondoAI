"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
//import { BusyModule } from 'angular2-busy';
//import { MomentModule } from 'angular2-moment';
var myfeed_service_1 = require("../services/myfeed.service");
//import { SummerNoteComponent } from '../../myFeed/components/summernote/summernote.component';
var myfeeds_component_1 = require("../../myFeed/components/myfeeds.component");
var myfeed_component_1 = require("../../myFeed/components/myfeed.component");
var myfeeddetail_component_1 = require("../../myFeed/components/myfeeddetail.component");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var shared_module_1 = require("../../shared/shared.module");
var myfeedfilter_component_1 = require("../../myFeed/components/myfeedfilter.component");
var angular_1 = require("nativescript-pro-ui/listview/angular");
var myfeedsearch_component_1 = require("../../myFeed/components/myfeedsearch.component");
var myfeedfilterresult_component_1 = require("../../myFeed/components/myfeedfilterresult.component");
var myfeedCreateDialog_component_1 = require("../../myFeed/components/dialog/myfeedCreateDialog.component");
var forms_1 = require("nativescript-angular/forms");
//import { FeedImageModalComponent } from '../../myFeed/components/dialog/feedimagemodal.component';
var angular_2 = require("nativescript-pro-ui/calendar/angular");
var routes = [
    { path: '', component: myfeeds_component_1.MyFeedsComponent },
    { path: ':id/view', component: myfeeddetail_component_1.MyFeedDetailComponent },
    { path: 'edit', component: myfeed_component_1.MyFeedComponent },
    { path: 'new', component: myfeed_component_1.MyFeedComponent },
    { path: 'filter', component: myfeedfilter_component_1.MyFeedFilterComponent },
    { path: 'search', component: myfeedsearch_component_1.MyFeedSearchComponent },
    { path: 'fiterresult', component: myfeedfilterresult_component_1.MyFeedFilterResultComponent },
];
var MyFeedModule = /** @class */ (function () {
    function MyFeedModule() {
    }
    MyFeedModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule,
                shared_module_1.SharedModule,
                angular_1.NativeScriptUIListViewModule,
                angular_2.NativeScriptUICalendarModule,
                router_1.RouterModule.forChild(routes)
            ],
            declarations: [
                myfeeds_component_1.MyFeedsComponent,
                myfeed_component_1.MyFeedComponent, myfeedCreateDialog_component_1.myfeedCreateDialog,
                myfeeddetail_component_1.MyFeedDetailComponent,
                myfeedfilter_component_1.MyFeedFilterComponent,
                myfeedsearch_component_1.MyFeedSearchComponent,
                myfeedfilterresult_component_1.MyFeedFilterResultComponent
            ],
            providers: [
                myfeed_service_1.MyFeedService
            ],
            entryComponents: [myfeedCreateDialog_component_1.myfeedCreateDialog],
        })
    ], MyFeedModule);
    return MyFeedModule;
}());
exports.MyFeedModule = MyFeedModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlmZWVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15ZmVlZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFFekMsMENBQXVEO0FBR3ZELDZDQUE2QztBQUM3QyxpREFBaUQ7QUFFakQsNkRBQTJEO0FBQzNELGdHQUFnRztBQUNoRywrRUFBNkU7QUFDN0UsNkVBQTJFO0FBQzNFLHlGQUF1RjtBQUN2RixnRkFBOEU7QUFDOUUsNERBQTBEO0FBQzFELHlGQUF1RjtBQUN2RixnRUFBb0Y7QUFDcEYseUZBQXVGO0FBQ3ZGLHFHQUFtRztBQUNuRyw0R0FBaUc7QUFDakcsb0RBQXFFO0FBQ3JFLG9HQUFvRztBQUNwRyxnRUFBb0Y7QUFFcEYsSUFBTSxNQUFNLEdBQVc7SUFDckIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxvQ0FBZ0IsRUFBRTtJQUN6QyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLDhDQUFxQixFQUFFO0lBQ3RELEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsa0NBQWUsRUFBRTtJQUM1QyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLGtDQUFlLEVBQUU7SUFDM0MsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSw4Q0FBcUIsRUFBRTtJQUNwRCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLDhDQUFxQixFQUFFO0lBQ3BELEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsMERBQTJCLEVBQUU7Q0FHaEUsQ0FBQztBQTZCRjtJQUFBO0lBQTRCLENBQUM7SUFBaEIsWUFBWTtRQTNCeEIsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLHdDQUFrQjtnQkFDbEIsK0JBQXVCO2dCQUN2Qiw0QkFBWTtnQkFDWixzQ0FBNEI7Z0JBQzVCLHNDQUE0QjtnQkFDNUIscUJBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2FBQzlCO1lBRUQsWUFBWSxFQUFFO2dCQUNaLG9DQUFnQjtnQkFDaEIsa0NBQWUsRUFBQyxpREFBa0I7Z0JBQ2xDLDhDQUFxQjtnQkFDckIsOENBQXFCO2dCQUNyQiw4Q0FBcUI7Z0JBQ3JCLDBEQUEyQjthQUM1QjtZQUVELFNBQVMsRUFBRTtnQkFDVCw4QkFBYTthQUNkO1lBRUQsZUFBZSxFQUFFLENBQUMsaURBQWtCLENBQUM7U0FFdEMsQ0FBQztPQUVXLFlBQVksQ0FBSTtJQUFELG1CQUFDO0NBQUEsQUFBN0IsSUFBNkI7QUFBaEIsb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbi8vaW1wb3J0IHsgTWF0ZXJpYWxNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG4vL2ltcG9ydCB7IEJ1c3lNb2R1bGUgfSBmcm9tICdhbmd1bGFyMi1idXN5JztcclxuLy9pbXBvcnQgeyBNb21lbnRNb2R1bGUgfSBmcm9tICdhbmd1bGFyMi1tb21lbnQnO1xyXG5cclxuaW1wb3J0IHsgTXlGZWVkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL215ZmVlZC5zZXJ2aWNlJztcclxuLy9pbXBvcnQgeyBTdW1tZXJOb3RlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbXlGZWVkL2NvbXBvbmVudHMvc3VtbWVybm90ZS9zdW1tZXJub3RlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE15RmVlZHNDb21wb25lbnQgfSBmcm9tICcuLi8uLi9teUZlZWQvY29tcG9uZW50cy9teWZlZWRzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE15RmVlZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL215RmVlZC9jb21wb25lbnRzL215ZmVlZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNeUZlZWREZXRhaWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi9teUZlZWQvY29tcG9uZW50cy9teWZlZWRkZXRhaWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlXCI7XHJcbmltcG9ydCB7IE15RmVlZEZpbHRlckNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9teUZlZWQvY29tcG9uZW50cy9teWZlZWRmaWx0ZXIuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9saXN0dmlldy9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IE15RmVlZFNlYXJjaENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9teUZlZWQvY29tcG9uZW50cy9teWZlZWRzZWFyY2guY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE15RmVlZEZpbHRlclJlc3VsdENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9teUZlZWQvY29tcG9uZW50cy9teWZlZWRmaWx0ZXJyZXN1bHQuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IG15ZmVlZENyZWF0ZURpYWxvZyB9IGZyb20gXCIuLi8uLi9teUZlZWQvY29tcG9uZW50cy9kaWFsb2cvbXlmZWVkQ3JlYXRlRGlhbG9nLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xyXG4vL2ltcG9ydCB7IEZlZWRJbWFnZU1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbXlGZWVkL2NvbXBvbmVudHMvZGlhbG9nL2ZlZWRpbWFnZW1vZGFsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJQ2FsZW5kYXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9jYWxlbmRhci9hbmd1bGFyXCI7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICB7IHBhdGg6ICcnLCBjb21wb25lbnQ6IE15RmVlZHNDb21wb25lbnQgfSxcclxuICB7IHBhdGg6ICc6aWQvdmlldycsIGNvbXBvbmVudDogTXlGZWVkRGV0YWlsQ29tcG9uZW50IH0sXHJcbiAgeyBwYXRoOiAnZWRpdCcsIGNvbXBvbmVudDogTXlGZWVkQ29tcG9uZW50IH0sXHJcbiAgeyBwYXRoOiAnbmV3JywgY29tcG9uZW50OiBNeUZlZWRDb21wb25lbnQgfSxcclxuICB7IHBhdGg6ICdmaWx0ZXInLCBjb21wb25lbnQ6IE15RmVlZEZpbHRlckNvbXBvbmVudCB9LFxyXG4gIHsgcGF0aDogJ3NlYXJjaCcsIGNvbXBvbmVudDogTXlGZWVkU2VhcmNoQ29tcG9uZW50IH0sXHJcbiAgeyBwYXRoOiAnZml0ZXJyZXN1bHQnLCBjb21wb25lbnQ6IE15RmVlZEZpbHRlclJlc3VsdENvbXBvbmVudCB9LFxyXG5cclxuXHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgU2hhcmVkTW9kdWxlLFxyXG4gICAgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSxcclxuICAgIE5hdGl2ZVNjcmlwdFVJQ2FsZW5kYXJNb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKVxyXG4gIF0sXHJcblxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTXlGZWVkc0NvbXBvbmVudCxcclxuICAgIE15RmVlZENvbXBvbmVudCxteWZlZWRDcmVhdGVEaWFsb2csXHJcbiAgICBNeUZlZWREZXRhaWxDb21wb25lbnQsXHJcbiAgICBNeUZlZWRGaWx0ZXJDb21wb25lbnQsXHJcbiAgICBNeUZlZWRTZWFyY2hDb21wb25lbnQsXHJcbiAgICBNeUZlZWRGaWx0ZXJSZXN1bHRDb21wb25lbnRcclxuICBdLFxyXG5cclxuICBwcm92aWRlcnM6IFtcclxuICAgIE15RmVlZFNlcnZpY2VcclxuICBdLFxyXG5cclxuICBlbnRyeUNvbXBvbmVudHM6IFtteWZlZWRDcmVhdGVEaWFsb2ddLFxyXG5cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBNeUZlZWRNb2R1bGUgeyB9XHJcbiJdfQ==