"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var http_1 = require("nativescript-angular/http");
var forms_1 = require("nativescript-angular/forms");
var data_service_1 = require("./shared/services/data.service");
var config_service_1 = require("./shared/utils/config.service");
var common_service_1 = require("./shared/utils/common.service");
var globalstorage_service_1 = require("./shared/store/globalstorage.service");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var login_component_1 = require("./login/login.component");
var choose_account_component_1 = require("./login/choose_account.component");
var angular_1 = require("nativescript-pro-ui/listview/angular");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("Fab", function () { return require("nativescript-floatingactionbutton").Fab; });
element_registry_1.registerElement("DropDown", function () { return require("nativescript-drop-down/drop-down").DropDown; });
//registerElement("CheckBox", () => require("nativescript-checkbox/angular").CheckBox);
//import * as elementRegistryModule from 'nativescript-angular/element-registry';
//elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);
var angular_2 = require("nativescript-checkbox/angular");
var float_btn_component_1 = require("./shared/floating-action-button/float-btn.component");
var angular_3 = require("nativescript-pro-ui/calendar/angular");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule,
                http_1.NativeScriptHttpModule,
                app_routing_module_1.AppRoutingModule,
                angular_1.NativeScriptUIListViewModule,
                angular_3.NativeScriptUICalendarModule,
                angular_2.TNSCheckBoxModule
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                choose_account_component_1.ChooseAccountComponent,
                float_btn_component_1.FloatBtnComponent
            ],
            providers: [
                { provide: core_1.NgModuleFactoryLoader, useClass: router_1.NSModuleFactoryLoader },
                config_service_1.ConfigService,
                data_service_1.DataService,
                common_service_1.CommonService,
                globalstorage_service_1.GlobalStorageService,
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Y7QUFDbEYsZ0ZBQThFO0FBQzlFLHNEQUFvRTtBQUNwRSxrREFBbUU7QUFDbkUsb0RBQXFFO0FBR3JFLCtEQUE2RDtBQUM3RCxnRUFBOEQ7QUFDOUQsZ0VBQThEO0FBQzlELDhFQUE0RTtBQUU1RSwyREFBd0Q7QUFDeEQsaURBQStDO0FBQy9DLDJEQUF5RDtBQUN6RCw2RUFBMEU7QUFDMUUsZ0VBQW9GO0FBQ3BGLDBFQUF3RTtBQUN4RSxrQ0FBZSxDQUFDLEtBQUssRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsR0FBRyxFQUFoRCxDQUFnRCxDQUFDLENBQUM7QUFDL0Usa0NBQWUsQ0FBQyxVQUFVLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLFFBQVEsRUFBcEQsQ0FBb0QsQ0FBQyxDQUFDO0FBQ3hGLHVGQUF1RjtBQUN2RixpRkFBaUY7QUFDakYscUdBQXFHO0FBQ3JHLHlEQUFrRTtBQUNsRSwyRkFBd0Y7QUFDeEYsZ0VBQW9GO0FBbUNwRjtJQUFBO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBakNyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLCtCQUF1QjtnQkFDdkIsNkJBQXNCO2dCQUN0QixxQ0FBZ0I7Z0JBQ2hCLHNDQUE0QjtnQkFDNUIsc0NBQTRCO2dCQUM1QiwyQkFBaUI7YUFFcEI7WUFFRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1osZ0NBQWM7Z0JBQ2QsaURBQXNCO2dCQUN0Qix1Q0FBaUI7YUFDcEI7WUFFRCxTQUFTLEVBQUU7Z0JBQ1AsRUFBRSxPQUFPLEVBQUUsNEJBQXFCLEVBQUUsUUFBUSxFQUFFLDhCQUFxQixFQUFFO2dCQUNuRSw4QkFBYTtnQkFDYiwwQkFBVztnQkFDWCw4QkFBYTtnQkFDYiw0Q0FBb0I7YUFDdkI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IE5TTW9kdWxlRmFjdG9yeUxvYWRlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcblxuXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3NlcnZpY2VzL2RhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvdXRpbHMvY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tbW9uU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3V0aWxzL2NvbW1vbi5zZXJ2aWNlJztcbmltcG9ydCB7IEdsb2JhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc3RvcmUvZ2xvYmFsc3RvcmFnZS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC1yb3V0aW5nLm1vZHVsZVwiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tIFwiLi9sb2dpbi9sb2dpbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IENob29zZUFjY291bnRDb21wb25lbnQgfSBmcm9tIFwiLi9sb2dpbi9jaG9vc2VfYWNjb3VudC5jb21wb25lbnRcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9saXN0dmlldy9hbmd1bGFyXCI7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xucmVnaXN0ZXJFbGVtZW50KFwiRmFiXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZmxvYXRpbmdhY3Rpb25idXR0b25cIikuRmFiKTtcbnJlZ2lzdGVyRWxlbWVudChcIkRyb3BEb3duXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2Ryb3AtZG93blwiKS5Ecm9wRG93bik7XG4vL3JlZ2lzdGVyRWxlbWVudChcIkNoZWNrQm94XCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtY2hlY2tib3gvYW5ndWxhclwiKS5DaGVja0JveCk7XG4vL2ltcG9ydCAqIGFzIGVsZW1lbnRSZWdpc3RyeU1vZHVsZSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5Jztcbi8vZWxlbWVudFJlZ2lzdHJ5TW9kdWxlLnJlZ2lzdGVyRWxlbWVudChcIkNhcmRWaWV3XCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtY2FyZHZpZXdcIikuQ2FyZFZpZXcpO1xuaW1wb3J0IHsgVE5TQ2hlY2tCb3hNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtY2hlY2tib3gvYW5ndWxhcic7XG5pbXBvcnQgeyBGbG9hdEJ0bkNvbXBvbmVudCB9IGZyb20gJy4vc2hhcmVkL2Zsb2F0aW5nLWFjdGlvbi1idXR0b24vZmxvYXQtYnRuLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUNhbGVuZGFyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvY2FsZW5kYXIvYW5ndWxhclwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGJvb3RzdHJhcDogW1xuICAgICAgICBBcHBDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSxcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlDYWxlbmRhck1vZHVsZSxcbiAgICAgICAgVE5TQ2hlY2tCb3hNb2R1bGVcbiAgICAgICAgXG4gICAgXSxcblxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBcHBDb21wb25lbnQsXG4gICAgICAgIExvZ2luQ29tcG9uZW50LFxuICAgICAgICBDaG9vc2VBY2NvdW50Q29tcG9uZW50LFxuICAgICAgICBGbG9hdEJ0bkNvbXBvbmVudFxuICAgIF0sXG5cbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIHVzZUNsYXNzOiBOU01vZHVsZUZhY3RvcnlMb2FkZXIgfSxcbiAgICAgICAgQ29uZmlnU2VydmljZSxcbiAgICAgICAgRGF0YVNlcnZpY2UsXG4gICAgICAgIENvbW1vblNlcnZpY2UsXG4gICAgICAgIEdsb2JhbFN0b3JhZ2VTZXJ2aWNlLFxuICAgIF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=