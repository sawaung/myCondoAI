import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {LoginComponent} from "./login/login.component";
import {ChooseAccountComponent} from "./login/choose_account.component"

const routes: Routes = [
    { path: "login", component: LoginComponent },
    //{ path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "", component: ChooseAccountComponent },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: 'myfeed', loadChildren: './myFeed/module/myfeed.module#MyFeedModule' },
    { path: 'myfacility', loadChildren: './myFacility/module/myfacility.module#MyFacilityModule' },
    { path: "browse", loadChildren: "./browse/browse.module#BrowseModule" },
    { path: "search", loadChildren: "./search/search.module#SearchModule" },
    { path: "featured", loadChildren: "./featured/featured.module#FeaturedModule" },
{ path: "settings", loadChildren: "./settings/settings.module#SettingsModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
