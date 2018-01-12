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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlmZWVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15ZmVlZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFFekMsMENBQXVEO0FBR3ZELDZDQUE2QztBQUM3QyxpREFBaUQ7QUFFakQsNkRBQTJEO0FBQzNELGdHQUFnRztBQUNoRywrRUFBNkU7QUFDN0UsNkVBQTJFO0FBQzNFLHlGQUF1RjtBQUN2RixnRkFBOEU7QUFDOUUsNERBQTBEO0FBQzFELHlGQUF1RjtBQUN2RixnRUFBb0Y7QUFDcEYseUZBQXVGO0FBQ3ZGLHFHQUFtRztBQUNuRyw0R0FBaUc7QUFDakcsb0RBQXFFO0FBQ3JFLG9HQUFvRztBQUdwRyxJQUFNLE1BQU0sR0FBVztJQUNyQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLG9DQUFnQixFQUFFO0lBQ3pDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsOENBQXFCLEVBQUU7SUFDdEQsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxrQ0FBZSxFQUFFO0lBQzVDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsa0NBQWUsRUFBRTtJQUMzQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLDhDQUFxQixFQUFFO0lBQ3BELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsOENBQXFCLEVBQUU7SUFDcEQsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSwwREFBMkIsRUFBRTtDQUVoRSxDQUFDO0FBNEJGO0lBQUE7SUFBNEIsQ0FBQztJQUFoQixZQUFZO1FBMUJ4QixlQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1Asd0NBQWtCO2dCQUNsQiwrQkFBdUI7Z0JBQ3ZCLDRCQUFZO2dCQUNaLHNDQUE0QjtnQkFDNUIscUJBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2FBQzlCO1lBRUQsWUFBWSxFQUFFO2dCQUNaLG9DQUFnQjtnQkFDaEIsa0NBQWUsRUFBQyxpREFBa0I7Z0JBQ2xDLDhDQUFxQjtnQkFDckIsOENBQXFCO2dCQUNyQiw4Q0FBcUI7Z0JBQ3JCLDBEQUEyQjthQUM1QjtZQUVELFNBQVMsRUFBRTtnQkFDVCw4QkFBYTthQUNkO1lBRUQsZUFBZSxFQUFFLENBQUMsaURBQWtCLENBQUM7U0FFdEMsQ0FBQztPQUVXLFlBQVksQ0FBSTtJQUFELG1CQUFDO0NBQUEsQUFBN0IsSUFBNkI7QUFBaEIsb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbi8vaW1wb3J0IHsgTWF0ZXJpYWxNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG4vL2ltcG9ydCB7IEJ1c3lNb2R1bGUgfSBmcm9tICdhbmd1bGFyMi1idXN5JztcclxuLy9pbXBvcnQgeyBNb21lbnRNb2R1bGUgfSBmcm9tICdhbmd1bGFyMi1tb21lbnQnO1xyXG5cclxuaW1wb3J0IHsgTXlGZWVkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL215ZmVlZC5zZXJ2aWNlJztcclxuLy9pbXBvcnQgeyBTdW1tZXJOb3RlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbXlGZWVkL2NvbXBvbmVudHMvc3VtbWVybm90ZS9zdW1tZXJub3RlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE15RmVlZHNDb21wb25lbnQgfSBmcm9tICcuLi8uLi9teUZlZWQvY29tcG9uZW50cy9teWZlZWRzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE15RmVlZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL215RmVlZC9jb21wb25lbnRzL215ZmVlZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNeUZlZWREZXRhaWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi9teUZlZWQvY29tcG9uZW50cy9teWZlZWRkZXRhaWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlXCI7XHJcbmltcG9ydCB7IE15RmVlZEZpbHRlckNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9teUZlZWQvY29tcG9uZW50cy9teWZlZWRmaWx0ZXIuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9saXN0dmlldy9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IE15RmVlZFNlYXJjaENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9teUZlZWQvY29tcG9uZW50cy9teWZlZWRzZWFyY2guY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE15RmVlZEZpbHRlclJlc3VsdENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9teUZlZWQvY29tcG9uZW50cy9teWZlZWRmaWx0ZXJyZXN1bHQuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IG15ZmVlZENyZWF0ZURpYWxvZyB9IGZyb20gXCIuLi8uLi9teUZlZWQvY29tcG9uZW50cy9kaWFsb2cvbXlmZWVkQ3JlYXRlRGlhbG9nLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xyXG4vL2ltcG9ydCB7IEZlZWRJbWFnZU1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbXlGZWVkL2NvbXBvbmVudHMvZGlhbG9nL2ZlZWRpbWFnZW1vZGFsLmNvbXBvbmVudCc7XHJcblxyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAgeyBwYXRoOiAnJywgY29tcG9uZW50OiBNeUZlZWRzQ29tcG9uZW50IH0sXHJcbiAgeyBwYXRoOiAnOmlkL3ZpZXcnLCBjb21wb25lbnQ6IE15RmVlZERldGFpbENvbXBvbmVudCB9LFxyXG4gIHsgcGF0aDogJ2VkaXQnLCBjb21wb25lbnQ6IE15RmVlZENvbXBvbmVudCB9LFxyXG4gIHsgcGF0aDogJ25ldycsIGNvbXBvbmVudDogTXlGZWVkQ29tcG9uZW50IH0sXHJcbiAgeyBwYXRoOiAnZmlsdGVyJywgY29tcG9uZW50OiBNeUZlZWRGaWx0ZXJDb21wb25lbnQgfSxcclxuICB7IHBhdGg6ICdzZWFyY2gnLCBjb21wb25lbnQ6IE15RmVlZFNlYXJjaENvbXBvbmVudCB9LFxyXG4gIHsgcGF0aDogJ2ZpdGVycmVzdWx0JywgY29tcG9uZW50OiBNeUZlZWRGaWx0ZXJSZXN1bHRDb21wb25lbnQgfSxcclxuXHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgU2hhcmVkTW9kdWxlLFxyXG4gICAgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSxcclxuICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXHJcbiAgXSxcclxuXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBNeUZlZWRzQ29tcG9uZW50LFxyXG4gICAgTXlGZWVkQ29tcG9uZW50LG15ZmVlZENyZWF0ZURpYWxvZyxcclxuICAgIE15RmVlZERldGFpbENvbXBvbmVudCxcclxuICAgIE15RmVlZEZpbHRlckNvbXBvbmVudCxcclxuICAgIE15RmVlZFNlYXJjaENvbXBvbmVudCxcclxuICAgIE15RmVlZEZpbHRlclJlc3VsdENvbXBvbmVudFxyXG4gIF0sXHJcblxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgTXlGZWVkU2VydmljZVxyXG4gIF0sXHJcblxyXG4gIGVudHJ5Q29tcG9uZW50czogW215ZmVlZENyZWF0ZURpYWxvZ10sXHJcblxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE15RmVlZE1vZHVsZSB7IH1cclxuIl19