"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var myfacility_service_1 = require("../services/myfacility.service");
var myfacility_component_1 = require("../../myFacility/components/myfacility/myfacility.component");
//import { MyFeedsComponent } from '../../myFeed/components/myfeeds.component';
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var shared_module_1 = require("../../shared/shared.module");
var routes = [
    { path: '', component: myfacility_component_1.MyFacilityComponent },
];
var MyFacilityModule = /** @class */ (function () {
    function MyFacilityModule() {
    }
    MyFacilityModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(routes),
            ],
            declarations: [
                myfacility_component_1.MyFacilityComponent,
            ],
            entryComponents: [],
            providers: [
                myfacility_service_1.MyFacilityService
            ],
        })
    ], MyFacilityModule);
    return MyFacilityModule;
}());
exports.MyFacilityModule = MyFacilityModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlmYWNpbGl0eS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteWZhY2lsaXR5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUV6QywwQ0FBdUQ7QUFDdkQscUVBQW1FO0FBQ25FLG9HQUFrRztBQUNsRywrRUFBK0U7QUFDL0UsZ0ZBQThFO0FBQzlFLDREQUEwRDtBQUcxRCxJQUFNLE1BQU0sR0FBVztJQUV0QixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLDBDQUFtQixFQUFFO0NBRzVDLENBQUM7QUFtQkY7SUFBQTtJQUFnQyxDQUFDO0lBQXBCLGdCQUFnQjtRQWpCNUIsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLHdDQUFrQjtnQkFDbEIsNEJBQVk7Z0JBQ1oscUJBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2FBQzlCO1lBRUQsWUFBWSxFQUFFO2dCQUNaLDBDQUFtQjthQUNwQjtZQUVELGVBQWUsRUFBRSxFQUFFO1lBRW5CLFNBQVMsRUFBRTtnQkFDVCxzQ0FBaUI7YUFDbEI7U0FDRixDQUFDO09BQ1csZ0JBQWdCLENBQUk7SUFBRCx1QkFBQztDQUFBLEFBQWpDLElBQWlDO0FBQXBCLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgTXlGYWNpbGl0eVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9teWZhY2lsaXR5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNeUZhY2lsaXR5Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbXlGYWNpbGl0eS9jb21wb25lbnRzL215ZmFjaWxpdHkvbXlmYWNpbGl0eS5jb21wb25lbnQnO1xyXG4vL2ltcG9ydCB7IE15RmVlZHNDb21wb25lbnQgfSBmcm9tICcuLi8uLi9teUZlZWQvY29tcG9uZW50cy9teWZlZWRzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvbGlzdHZpZXcvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuXHJcbiB7IHBhdGg6ICcnLCBjb21wb25lbnQ6IE15RmFjaWxpdHlDb21wb25lbnQgfSxcclxuICAvL3sgcGF0aDogJycsIGNvbXBvbmVudDogTXlGZWVkc0NvbXBvbmVudCB9LFxyXG5cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgU2hhcmVkTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcyksXHJcbiAgXSxcclxuXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBNeUZhY2lsaXR5Q29tcG9uZW50LFxyXG4gIF0sXHJcblxyXG4gIGVudHJ5Q29tcG9uZW50czogW10sXHJcblxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgTXlGYWNpbGl0eVNlcnZpY2VcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXlGYWNpbGl0eU1vZHVsZSB7IH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19