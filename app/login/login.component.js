"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var interfaces_1 = require("../shared/interfaces");
var data_service_1 = require("../shared/services/data.service");
var globalstorage_service_1 = require("../shared/store/globalstorage.service");
var app = require("application");
var platform_1 = require("platform");
var page_1 = require("ui/page");
var color_1 = require("tns-core-modules/color");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, dataService, globalStorageService, page) {
        this.router = router;
        this.dataService = dataService;
        this.globalStorageService = globalStorageService;
        this.page = page;
    }
    LoginComponent.prototype.ngOnInit = function () {
        //this.page.statusBarStyle = "dark";
        if (platform_1.isIOS) {
        }
        else {
            //let decorView = app.android.startActivity.getWindow().getDecorView();
            //decorView.setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
            app.android.startActivity.getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
        }
        this.page.androidStatusBarBackground = new color_1.Color("#97519A");
        this.page.actionBarHidden = true;
        this.userLogin = new interfaces_1.Users();
        //app.android.startActivity.getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
    };
    LoginComponent.prototype.ngAfterViewInit = function () {
        var parentView = this.container.nativeElement;
        this.txtUserName = parentView.getViewById("username");
        this.txtPassword = parentView.getViewById("password");
        /*this.webview = this.webViewRef.nativeElement;
        this.oWebViewInterface = new WebViewInterface(this.webview, "~/summer_note/index.html");
        this.webview.on('loadFinished', (args) => {
          if (!args.error) {
              console.log("load finished" );
          }
      });*/
    };
    LoginComponent.prototype.UserLogin = function () {
        var _this = this;
        if (this.txtUserName.text.toString() == "") {
            alert("Please enter username!");
            return;
        }
        else if (this.txtPassword.text.toString() == "") {
            alert("Please enter password!");
            return;
        }
        var loader = new nativescript_loading_indicator_1.LoadingIndicator();
        // optional options
        // android and ios have some platform specific options
        var options = {
            message: 'Loading...',
            progress: 0.65,
            android: {
                indeterminate: true,
                cancelable: false,
                max: 100,
                progressNumberFormat: "%1d/%2d",
                progressPercentFormat: 0.53,
                progressStyle: 1,
                secondaryProgress: 1
            },
        };
        loader.show(options); // options is optional
        this.userLogin.Secret_Key = this.globalStorageService.getSecretKey();
        this.userLogin.Application_Id = this.globalStorageService.getApplicationId();
        console.log("userLOgin " + JSON.stringify(this.userLogin));
        this.dataService.userLogin(this.userLogin)
            .subscribe(function (res) {
            console.log("code " + res.response.code);
            if (res.response.code == "200") {
                _this.globalStorageService.setTokenKey(res.result[0].TokenKey);
                _this.globalStorageService.setCondominiumId(res.result[0].Condominium_Id);
                _this.globalStorageService.setCurrentUserId(res.result[0].UserId);
                _this.globalStorageService.setBatchNumber(res.result[0].BatchNo);
                _this.globalStorageService.setCurrentUserInfo(res.result[0]);
                _this.dataService.getUserRoleByUserId(_this.globalStorageService.getCurrentUserId())
                    .subscribe(function (res1) {
                    loader.hide();
                    //this.roles = res1.result;
                    _this.globalStorageService.setPermission('1', JSON.stringify(res1.result));
                    console.log("role permission --> " + _this.globalStorageService.getPermission('1'));
                    //this.condoInfo = res1.result[0];
                    //this.globalStorageService.setCurrentCondoInfo(this.condoInfo);
                });
                _this.router.navigate(['/myfeed']);
            }
            else {
                _this.errorMessage = res.response.code;
                _this.userLogin.User_Name = null;
            }
        }, function (error) { loader.hide(), alert("Can't connect to server!"); });
    };
    LoginComponent.prototype.cancelLogin = function () {
        this.userLogin.Password = null;
        this.userLogin.User_Name = null;
        this.errorMessage = null;
    };
    LoginComponent.prototype.getContent = function () {
        this.oWebViewInterface.callJSFunction('hello', null, function (oSelectedLang) {
            alert("" + oSelectedLang);
        });
    };
    __decorate([
        core_1.ViewChild("container"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "container", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: 'login/login.component.html',
            styleUrls: ['login/login.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            data_service_1.DataService,
            globalstorage_service_1.GlobalStorageService,
            page_1.Page])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
var CondoInfoDetail = /** @class */ (function () {
    function CondoInfoDetail() {
    }
    return CondoInfoDetail;
}());
exports.CondoInfoDetail = CondoInfoDetail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUN6QyxtREFBNkM7QUFDN0MsZ0VBQThEO0FBQzlELCtFQUE2RTtBQUM3RSxpQ0FBbUM7QUFDbkMscUNBQWlDO0FBQ2pDLGdDQUErQjtBQUMvQixnREFBK0M7QUFDL0MsaUZBQWtFO0FBa0JsRTtJQWlCRSx3QkFBb0IsTUFBYyxFQUN4QixXQUF3QixFQUN4QixvQkFBMEMsRUFDMUMsSUFBVTtRQUhBLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxTQUFJLEdBQUosSUFBSSxDQUFNO0lBRXBCLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0Usb0NBQW9DO1FBQ3BDLEVBQUUsQ0FBQSxDQUFDLGdCQUFLLENBQUMsQ0FBQSxDQUFDO1FBRVYsQ0FBQztRQUFBLElBQUksQ0FBQSxDQUFDO1lBQ0osdUVBQXVFO1lBQ3ZFLHFGQUFxRjtZQUNyRixHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN4SCxDQUFDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLGFBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGtCQUFLLEVBQUUsQ0FBQztRQUU3QiwySEFBMkg7SUFFN0gsQ0FBQztJQUNELHdDQUFlLEdBQWY7UUFDRSxJQUFJLFVBQVUsR0FB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LElBQUksRUFBQyxVQUFDLGFBQWE7WUFDaEUsS0FBSyxDQUFDLEtBQUcsYUFBZSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDO0lBakl1QjtRQUF2QixnQkFBUyxDQUFDLFdBQVcsQ0FBQztrQ0FBWSxpQkFBVTtxREFBQztJQWhCbkMsY0FBYztRQVAxQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztTQUN6QyxDQUFDO3lDQW9CNEIsZUFBTTtZQUNYLDBCQUFXO1lBQ0YsNENBQW9CO1lBQ3BDLFdBQUk7T0FwQlQsY0FBYyxDQW1KMUI7SUFBRCxxQkFBQztDQUFBLEFBbkpELElBbUpDO0FBbkpZLHdDQUFjO0FBcUozQjtJQUFBO0lBbUdBLENBQUM7SUFBRCxzQkFBQztBQUFELENBQUMsQUFuR0QsSUFtR0M7QUFuR1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVXNlcnMgfSBmcm9tICcuLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2xvYmFsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc3RvcmUvZ2xvYmFsc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIGFwcCBmcm9tICdhcHBsaWNhdGlvbic7XG5pbXBvcnQgeyBpc0lPUyB9IGZyb20gJ3BsYXRmb3JtJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xuaW1wb3J0IHsgTG9hZGluZ0luZGljYXRvciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcbmltcG9ydCB7IFdlYlZpZXcsIExvYWRFdmVudERhdGEgfSBmcm9tIFwidWkvd2ViLXZpZXdcIjtcbmltcG9ydCB7IFdlYlZpZXdJbnRlcmZhY2UgfSBmcm9tICduYXRpdmVzY3JpcHQtd2Vidmlldy1pbnRlcmZhY2UnO1xuaW1wb3J0IHtUZXh0RmllbGQgfSBmcm9tICd1aS90ZXh0LWZpZWxkJztcbmltcG9ydCB7U3RhY2tMYXlvdXR9IGZyb20gJ3VpL2xheW91dHMvc3RhY2stbGF5b3V0JztcblxuaW1wb3J0IHsgIFJvbGUgfSBmcm9tICcuLi9teUZlZWQvbW9kZWwvbXlmZWVkLm1vZGVsJztcblxuXG5kZWNsYXJlIHZhciBhbmRyb2lkO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbG9naW4nLFxuICB0ZW1wbGF0ZVVybDogJ2xvZ2luL2xvZ2luLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2xvZ2luL2xvZ2luLmNvbXBvbmVudC5jc3MnXVxufSlcblxuXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHJvbGVzOiBhbnk7XG4gIHVzZXJMb2dpbjogVXNlcnM7XG4gIGVycm9yTWVzc2FnZTogYW55O1xuICBjb25kb0luZm86IENvbmRvSW5mb0RldGFpbDtcblxuICBhcHBsaWNhdGlvbklkOiBzdHJpbmc7XG4gIHNlY3JldEtleTogc3RyaW5nO1xuICBwdWJsaWMgaHRtbFN0cmluZzogc3RyaW5nO1xuICBwdWJsaWMgd2VidmlldzogV2ViVmlldztcbiAgcHVibGljIG9XZWJWaWV3SW50ZXJmYWNlOldlYlZpZXdJbnRlcmZhY2U7XG4gIHR4dFVzZXJOYW1lOlRleHRGaWVsZDtcbiAgdHh0UGFzc3dvcmQ6VGV4dEZpZWxkO1xuXG4gIC8vQFZpZXdDaGlsZChcIndlYlZpZXdcIikgd2ViVmlld1JlZjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImNvbnRhaW5lclwiKSBjb250YWluZXI6IEVsZW1lbnRSZWY7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBnbG9iYWxTdG9yYWdlU2VydmljZTogR2xvYmFsU3RvcmFnZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvL3RoaXMucGFnZS5zdGF0dXNCYXJTdHlsZSA9IFwiZGFya1wiO1xuICAgIGlmKGlzSU9TKXtcbiAgICAgXG4gICAgfWVsc2V7XG4gICAgICAvL2xldCBkZWNvclZpZXcgPSBhcHAuYW5kcm9pZC5zdGFydEFjdGl2aXR5LmdldFdpbmRvdygpLmdldERlY29yVmlldygpO1xuICAgICAgLy9kZWNvclZpZXcuc2V0U3lzdGVtVWlWaXNpYmlsaXR5KGFuZHJvaWQudmlldy5WaWV3LlNZU1RFTV9VSV9GTEFHX0xJR0hUX1NUQVRVU19CQVIpO1xuICAgICAgYXBwLmFuZHJvaWQuc3RhcnRBY3Rpdml0eS5nZXRXaW5kb3coKS5zZXRTb2Z0SW5wdXRNb2RlKGFuZHJvaWQudmlldy5XaW5kb3dNYW5hZ2VyLkxheW91dFBhcmFtcy5TT0ZUX0lOUFVUX0FESlVTVF9QQU4pO1xuICAgIH1cbiAgICB0aGlzLnBhZ2UuYW5kcm9pZFN0YXR1c0JhckJhY2tncm91bmQgPSBuZXcgQ29sb3IoXCIjOTc1MTlBXCIpO1xuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIHRoaXMudXNlckxvZ2luID0gbmV3IFVzZXJzKCk7XG5cbiAgICAvL2FwcC5hbmRyb2lkLnN0YXJ0QWN0aXZpdHkuZ2V0V2luZG93KCkuc2V0U29mdElucHV0TW9kZShhbmRyb2lkLnZpZXcuV2luZG93TWFuYWdlci5MYXlvdXRQYXJhbXMuU09GVF9JTlBVVF9BREpVU1RfUkVTSVpFKTtcblxuICB9XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBsZXQgcGFyZW50VmlldyA9PFN0YWNrTGF5b3V0PnRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy50eHRVc2VyTmFtZSA9IDxUZXh0RmllbGQ+IHBhcmVudFZpZXcuZ2V0Vmlld0J5SWQoXCJ1c2VybmFtZVwiKTtcbiAgICB0aGlzLnR4dFBhc3N3b3JkID0gPFRleHRGaWVsZD4gcGFyZW50Vmlldy5nZXRWaWV3QnlJZChcInBhc3N3b3JkXCIpO1xuICAgIFxuXG4gICAgLyp0aGlzLndlYnZpZXcgPSB0aGlzLndlYlZpZXdSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLm9XZWJWaWV3SW50ZXJmYWNlID0gbmV3IFdlYlZpZXdJbnRlcmZhY2UodGhpcy53ZWJ2aWV3LCBcIn4vc3VtbWVyX25vdGUvaW5kZXguaHRtbFwiKTtcbiAgICB0aGlzLndlYnZpZXcub24oJ2xvYWRGaW5pc2hlZCcsIChhcmdzKSA9PiB7XG4gICAgICBpZiAoIWFyZ3MuZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImxvYWQgZmluaXNoZWRcIiApO1xuICAgICAgfVxuICB9KTsqL1xuXG4gIH1cblxuICBVc2VyTG9naW4oKSB7XG4gICAgaWYodGhpcy50eHRVc2VyTmFtZS50ZXh0LnRvU3RyaW5nKCkgPT0gXCJcIil7XG4gICAgICBhbGVydChcIlBsZWFzZSBlbnRlciB1c2VybmFtZSFcIik7XG4gICAgICByZXR1cm47XG4gICAgfWVsc2UgaWYodGhpcy50eHRQYXNzd29yZC50ZXh0LnRvU3RyaW5nKCkgPT0gXCJcIil7XG4gICAgICBhbGVydChcIlBsZWFzZSBlbnRlciBwYXNzd29yZCFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuXG4gICAgLy8gb3B0aW9uYWwgb3B0aW9uc1xuICAgIC8vIGFuZHJvaWQgYW5kIGlvcyBoYXZlIHNvbWUgcGxhdGZvcm0gc3BlY2lmaWMgb3B0aW9uc1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgbWVzc2FnZTogJ0xvYWRpbmcuLi4nLFxuICAgICAgcHJvZ3Jlc3M6IDAuNjUsXG4gICAgICBhbmRyb2lkOiB7XG4gICAgICAgIGluZGV0ZXJtaW5hdGU6IHRydWUsXG4gICAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgICBtYXg6IDEwMCxcbiAgICAgICAgcHJvZ3Jlc3NOdW1iZXJGb3JtYXQ6IFwiJTFkLyUyZFwiLFxuICAgICAgICBwcm9ncmVzc1BlcmNlbnRGb3JtYXQ6IDAuNTMsXG4gICAgICAgIHByb2dyZXNzU3R5bGU6IDEsXG4gICAgICAgIHNlY29uZGFyeVByb2dyZXNzOiAxXG4gICAgICB9LFxuICAgICAgLyppb3M6IHtcbiAgICAgICAgZGV0YWlsczogXCJBZGRpdGlvbmFsIGRldGFpbCBub3RlIVwiLFxuICAgICAgICBtYXJnaW46IDEwLFxuICAgICAgICBkaW1CYWNrZ3JvdW5kOiB0cnVlLFxuICAgICAgICBjb2xvcjogXCIjNEI5RUQ2XCIsIC8vIGNvbG9yIG9mIGluZGljYXRvciBhbmQgbGFiZWxzXG4gICAgICAgIC8vIGJhY2tncm91bmQgYm94IGFyb3VuZCBpbmRpY2F0b3JcbiAgICAgICAgLy8gaGlkZUJlemVsIHdpbGwgb3ZlcnJpZGUgdGhpcyBpZiB0cnVlXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJ5ZWxsb3dcIixcbiAgICAgICAgaGlkZUJlemVsOiB0cnVlLCAvLyBkZWZhdWx0IGZhbHNlLCBjYW4gaGlkZSB0aGUgc3Vycm91bmRpbmcgYmV6ZWxcbiAgICAgICAgdmlldzogVUlWaWV3LCAvLyBUYXJnZXQgdmlldyB0byBzaG93IG9uIHRvcCBvZiAoRGVmYXVsdHMgdG8gZW50aXJlIHdpbmRvdylcbiAgICAgICAgbW9kZTogTUJQcm9ncmVzc0hVRE1vZGVEZXRlcm1pbmF0ZS8vIHNlZSBpT1Mgc3BlY2lmaWMgb3B0aW9ucyBiZWxvd1xuICAgICAgfSovXG4gICAgfTtcblxuICAgIGxvYWRlci5zaG93KG9wdGlvbnMpOyAvLyBvcHRpb25zIGlzIG9wdGlvbmFsXG5cbiAgICB0aGlzLnVzZXJMb2dpbi5TZWNyZXRfS2V5ID0gdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRTZWNyZXRLZXkoKTtcbiAgICB0aGlzLnVzZXJMb2dpbi5BcHBsaWNhdGlvbl9JZCA9IHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0QXBwbGljYXRpb25JZCgpO1xuICAgIGNvbnNvbGUubG9nKFwidXNlckxPZ2luIFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy51c2VyTG9naW4pKTtcblxuICAgIHRoaXMuZGF0YVNlcnZpY2UudXNlckxvZ2luKHRoaXMudXNlckxvZ2luKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhcImNvZGUgXCIgKyByZXMucmVzcG9uc2UuY29kZSk7XG4gICAgICAgIGlmIChyZXMucmVzcG9uc2UuY29kZSA9PSBcIjIwMFwiKSB7XG5cbiAgICAgICAgICB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLnNldFRva2VuS2V5KHJlcy5yZXN1bHRbMF0uVG9rZW5LZXkpO1xuICAgICAgICAgIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2Uuc2V0Q29uZG9taW5pdW1JZChyZXMucmVzdWx0WzBdLkNvbmRvbWluaXVtX0lkKTtcbiAgICAgICAgICB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLnNldEN1cnJlbnRVc2VySWQocmVzLnJlc3VsdFswXS5Vc2VySWQpO1xuICAgICAgICAgIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2Uuc2V0QmF0Y2hOdW1iZXIocmVzLnJlc3VsdFswXS5CYXRjaE5vKTtcbiAgICAgICAgICB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLnNldEN1cnJlbnRVc2VySW5mbyhyZXMucmVzdWx0WzBdKTtcblxuICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuZ2V0VXNlclJvbGVCeVVzZXJJZCh0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldEN1cnJlbnRVc2VySWQoKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzMSA9PiB7XG4gICAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICAgIC8vdGhpcy5yb2xlcyA9IHJlczEucmVzdWx0O1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLnNldFBlcm1pc3Npb24oJzEnLEpTT04uc3RyaW5naWZ5KHJlczEucmVzdWx0KSk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJvbGUgcGVybWlzc2lvbiAtLT4gXCIgKyB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldFBlcm1pc3Npb24oJzEnKSk7XG5cbiAgICAgICAgICAgICAgLy90aGlzLmNvbmRvSW5mbyA9IHJlczEucmVzdWx0WzBdO1xuICAgICAgICAgICAgICAvL3RoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2Uuc2V0Q3VycmVudENvbmRvSW5mbyh0aGlzLmNvbmRvSW5mbyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9teWZlZWQnXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSByZXMucmVzcG9uc2UuY29kZTtcbiAgICAgICAgICB0aGlzLnVzZXJMb2dpbi5Vc2VyX05hbWUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9LCBlcnJvciA9PiB7IGxvYWRlci5oaWRlKCksIGFsZXJ0KFwiQ2FuJ3QgY29ubmVjdCB0byBzZXJ2ZXIhXCIpIH0pO1xuICB9XG5cbiAgY2FuY2VsTG9naW4oKSB7XG5cbiAgICB0aGlzLnVzZXJMb2dpbi5QYXNzd29yZCA9IG51bGw7XG4gICAgdGhpcy51c2VyTG9naW4uVXNlcl9OYW1lID0gbnVsbDtcbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9IG51bGw7XG5cbiAgfVxuXG4gIGdldENvbnRlbnQoKSB7XG4gICAgIHRoaXMub1dlYlZpZXdJbnRlcmZhY2UuY2FsbEpTRnVuY3Rpb24oJ2hlbGxvJyxudWxsLChvU2VsZWN0ZWRMYW5nKSA9PiB7XG4gICAgICBhbGVydChgJHtvU2VsZWN0ZWRMYW5nfWApO1xuICAgIH0pOyBcbiAgICAgXG4gIH1cblxufVxuXG5leHBvcnQgY2xhc3MgQ29uZG9JbmZvRGV0YWlsIHtcbiAgQ29uZG9taW5pdW1fSWQ6IGFueTtcbiAgUmVxdWVzdF9JZDogYW55O1xuICBDb25kb21pbml1bV9OYW1lOiBzdHJpbmc7XG4gIE1DU1RfTm86IG51bWJlcjtcbiAgTWFpbnRlbmFuY2VGdW5kQWNjb3VudDogc3RyaW5nO1xuICBUT1BfRGF5OiBudW1iZXI7XG4gIFRPUF9Nb250aDogbnVtYmVyO1xuICBUT1BfWWVhcjogbnVtYmVyO1xuICBUZW51cmU6IHN0cmluZztcbiAgRGlzdHJpY3RfSWQ6IGFueTtcbiAgTm9fT2ZfVW5pdDogbnVtYmVyO1xuICBTaXRlQXJlYTogbnVtYmVyO1xuICBDb3VudHJ5X0lkOiBhbnk7XG4gIFBvc3RhbF9Db2RlOiBudW1iZXI7XG4gIEFkZHJlc3M6IHN0cmluZztcbiAgQ3VycmVudF9XZWJzaXRlX0FkZHJlc3M6IHN0cmluZztcbiAgTXlDb25kb19XZWJzaXRlX0FkZHJlc3M6IHN0cmluZztcbiAgUmVwcmVzZW50aW5nOiBzdHJpbmc7XG4gIENvbnRhY3RfUGVyc29uOiBzdHJpbmc7XG4gIFNhbHV0YXRpb246IHN0cmluZztcbiAgRGVzaWduYXRpb246IHN0cmluZztcbiAgQ29udGFjdF9Obzogc3RyaW5nO1xuICBDb250YWN0X01vYmlsZV9Obzogc3RyaW5nO1xuICBDb250YWN0X0VtYWlsOiBzdHJpbmc7XG4gIE1hbmFnaW5nX0FnZW50X0lkOiBhbnk7XG4gIE1hbmFnaW5nX0FnZW50X05hbWU6IHN0cmluZztcbiAgQWdlbnRfSGVhZF9PZmZpY2VfQWRkcmVzczogc3RyaW5nO1xuICBBZ2VudF9QaG9uZTogc3RyaW5nO1xuICBBZ2VudF9GYXg6IHN0cmluZztcbiAgTUFfUHJvamVjdF9NYW5hZ2VyOiBzdHJpbmc7XG4gIE1BX01vYmlsZTogc3RyaW5nO1xuICBNQV9FbWFpbDogc3RyaW5nO1xuICBEZXZlbG9wZXJfSWQ6IGFueTtcbiAgRGV2ZWxvcGVyX05hbWU6IHN0cmluZztcbiAgRGV2ZWxvcGVyX0hlYWRfT2ZmaWNlX0FkZHJlc3M6IHN0cmluZztcbiAgRGV2ZWxvcGVyX1Bob25lOiBzdHJpbmc7XG4gIERldmVsb3Blcl9GYXg6IHN0cmluZztcbiAgRGV2X1Byb2plY3RfTWFuYWdlcjogc3RyaW5nO1xuICBEZXZfTW9iaWxlOiBzdHJpbmc7XG4gIERldl9FbWFpbDogc3RyaW5nO1xuICBEYXRlX0Zvcm1hdDogc3RyaW5nO1xuICBDdXJyZW5jeV9JZDogYW55O1xuICBJc0F1dG9HZW5lcmF0ZV9SZWNlaXZlX05vOiBib29sZWFuO1xuICBSZWNlaXZlX1ByZWZpeDogc3RyaW5nO1xuICBSZWNlaXZlX05vX1R5cGU6IHN0cmluZztcbiAgSXNBdXRvR2VuZXJhdGVfUmVmdW5kX05vOiBib29sZWFuO1xuICBSZWZ1bmRfUHJlZml4OiBzdHJpbmc7XG4gIFJlZnVuZF9Ob19UeXBlOiBzdHJpbmc7XG4gIENvbmRvbWluaXVtX1ByZWZpeDogc3RyaW5nO1xuICBDb25kb21pbml1bUltYWdlOiBzdHJpbmc7XG4gIENvbmRvbWluaXVtSW1hZ2VfVHlwZTogc3RyaW5nO1xuICBpc0FjdGl2ZTogYm9vbGVhbjtcbiAgRXhwaXJlT246IERhdGU7XG4gIExhdW5jaE9uOiBEYXRlO1xuICBTaXRlTWFwOiBzdHJpbmc7XG4gIFNpdGVNYXBfRmlsZVR5cGU6IHN0cmluZztcbiAgTG9jYXRpb25NYXA6IHN0cmluZztcbiAgTG9jYXRvaW5NYXBUeXBlOiBzdHJpbmc7XG4gIEFib3V0VXM6IHN0cmluZztcbiAgUHJvamVjdF9TcGVjaWZpY2F0aW9uOiBzdHJpbmc7XG4gIFByb2plY3RfU3BlY2lmaWNhdGlvbl9GaWxlVHlwZTogc3RyaW5nO1xuICBDdXJyZW50Qm9va2luZ05vOiBudW1iZXI7XG4gIEN1cnJlbnRQYXltZW50Tm86IG51bWJlcjtcbiAgQ3VycmVudFJlZnVuZE5vOiBudW1iZXI7XG4gIENvbmRvTWFuYWdlcjogc3RyaW5nO1xuICBDb25kb01hbmFnZXJfU2FsdXRhdGlvbjogc3RyaW5nO1xuICBDb25kb01hbmFnZXJfTmlja25hbWU6IHN0cmluZztcbiAgQ29uZG9NYW5hZ2VyX01vYmlsZTogc3RyaW5nO1xuICBDb25kb01hbmFnZXJfRW1haWw6IHN0cmluZztcbiAgQ3VycmVudF9Jbml0aWFsX0ZlZV9JZDogYW55O1xuICBNT19FbWFpbDogc3RyaW5nO1xuICBNT19QaG9uZTogc3RyaW5nO1xuICBNT19GYXg6IHN0cmluZztcbiAgTU9fR3VhcmRIb3VzZTogc3RyaW5nO1xuICBNT19PcGVyYXRpbmdfSG91cnM6IHN0cmluZztcbiAgaXNNb25kYXlPZmY6IGJvb2xlYW47XG4gIGlzVHVlc2RheU9mZjogYm9vbGVhbjtcbiAgaXNXZWRuZXNkYXlPZmY6IGJvb2xlYW47XG4gIGlzVGh1cnNkYXlPZmY6IGJvb2xlYW47XG4gIGlzRnJpZGF5T2ZmOiBib29sZWFuO1xuICBpc1NhdHVyZGF5T2ZmOiBib29sZWFuO1xuICBpc1N1bmRheU9mZjogYm9vbGVhbjtcbiAgVGVtcGxhdGVOYW1lOiBzdHJpbmc7XG4gIFRoZW1lOiBzdHJpbmc7XG4gIFRoZW1lSWQ6IGFueTtcbiAgaXNEYXRhRW50cnk6IGJvb2xlYW47XG4gIFNpdGVfVGl0bGU6IHN0cmluZztcbiAgRW5xdWlyeV9FbWFpbDogc3RyaW5nO1xuICBTZW5kaW5nX0Zyb21fRW1haWw6IHN0cmluZztcbiAgRGlzdHJpY3RfTmFtZTogc3RyaW5nO1xuICBNYXhfU3RvcmV5OiBudW1iZXI7XG4gIE1pbl9TdG9yZXk6IG51bWJlcjtcbiAgVG90YWxVbml0Q291bnQ6IG51bWJlcjtcbiAgVG90YWxCbG9ja0NvdW50OiBudW1iZXI7XG4gIENyZWF0ZWRfQnk6IHN0cmluZztcbiAgQ3JlYXRlZF9PbjogRGF0ZTtcbiAgTGFzdF9VcGRhdGVkX0J5OiBzdHJpbmc7XG4gIExhc3RfVXBkYXRlZF9PbjogRGF0ZTtcbn0iXX0=