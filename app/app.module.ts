import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NSModuleFactoryLoader } from "nativescript-angular/router";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";


import { DataService } from './shared/services/data.service';
import { ConfigService } from './shared/utils/config.service';
import { CommonService } from './shared/utils/common.service';
import { GlobalStorageService } from './shared/store/globalstorage.service';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { ChooseAccountComponent } from "./login/choose_account.component";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { registerElement } from "nativescript-angular/element-registry";
registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);
registerElement("DropDown", () => require("nativescript-drop-down/drop-down").DropDown);
//registerElement("CheckBox", () => require("nativescript-checkbox/angular").CheckBox);
//import * as elementRegistryModule from 'nativescript-angular/element-registry';
//elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import { FloatBtnComponent } from './shared/floating-action-button/float-btn.component';
import { NativeScriptUICalendarModule } from "nativescript-pro-ui/calendar/angular";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        AppRoutingModule,
        NativeScriptUIListViewModule,
        NativeScriptUICalendarModule,
        TNSCheckBoxModule
        
    ],

    declarations: [
        AppComponent,
        LoginComponent,
        ChooseAccountComponent,
        FloatBtnComponent
    ],

    providers: [
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader },
        ConfigService,
        DataService,
        CommonService,
        GlobalStorageService,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
