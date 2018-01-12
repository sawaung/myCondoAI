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
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var router_2 = require("nativescript-angular/router");
var Sqlite = require("nativescript-sqlite");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, dataService, routerExtensions, globalStorageService, page) {
        // var nativeColor = new color.Color("#0000ff").android;
        // var window = app.android.startActivity.getWindow();
        // this.page.actionBarHidden = true;
        // window.setStatusBarColor(nativeColor);
        this.router = router;
        this.dataService = dataService;
        this.routerExtensions = routerExtensions;
        this.globalStorageService = globalStorageService;
        this.page = page;
        this.userList = [];
        if (this.globalStorageService.getUserDao('0') !== undefined) {
            this.userList = JSON.parse(this.globalStorageService.getUserDao('0'));
            console.log("user list length " + this.userList.length);
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
        //this.page.statusBarStyle = "dark";
        if (platform_1.isIOS) {
        }
        else {
            //let decorView = app.android.startActivity.getWindow().getDecorView();
            //decorView.setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
            app.android.startActivity.getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
            //var activity = app.android.startActivity;
            //var nativeColor = new color.Color("#0000ff").android;
            //var window = app.android.startActivity.getWindow();
            //window.setStatusBarColor(nativeColor);
            //console.log("class name " + activity.getActionBar().isShowing());
            // activity.getActionBar().setTitle("test");
        }
        this.page.actionBarHidden = true;
        //this.page.androidStatusBarBackground = new Color("#0000ff");
        this.userLogin = new interfaces_1.Users();
        //app.android.startActivity.getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
    };
    LoginComponent.prototype.ngAfterViewInit = function () {
        var parentView = this.container.nativeElement;
        this.txtUserName = parentView.getViewById("username");
        this.txtPassword = parentView.getViewById("password");
        this.chkAlwaysRemember = parentView.getViewById("chkAlwaysRemember");
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
                try {
                    var user_1 = JSON.parse(JSON.stringify(res.result[0]), _this.dataService.reviver);
                    if (_this.chkAlwaysRemember.checked) {
                        if (user_1 != null) {
                            var itemToRemove = _this.userList.filter(function (item) { return item.UserId == user_1.UserId; });
                            if (itemToRemove.length == 0) {
                                console.log("save to DB ");
                                _this.userList.push(user_1);
                                //console.log("converting " + JSON.stringify(this.userList));
                                _this.globalStorageService.setUserDao('0', JSON.stringify(_this.userList));
                                //console.log("get user Dao --> " + this.globalStorageService.getUserDao('0'));
                            }
                        }
                        else {
                            console.log("user object null");
                        }
                    }
                    else {
                        console.log("remove from DB " + _this.userList.length);
                        if (_this.userList.length > 0) {
                            // console.log("remove from DB ");
                            // this.userList.splice(this.userList.indexOf(user),1);
                            // this.userList.forEach(element => {
                            //   console.log("FullName -> " + element.FullName);
                            // });
                            // this.globalStorageService.setUserDao('0', JSON.stringify(this.userList));
                            var itemToRemove = _this.userList.filter(function (item) { return item.UserId == user_1.UserId; });
                            console.log("remove user" + JSON.stringify(itemToRemove));
                            var i = _this.userList.indexOf(itemToRemove[0]);
                            console.log("index of user " + i);
                            _this.userList.splice(i, 1);
                            _this.globalStorageService.setUserDao('0', JSON.stringify(_this.userList));
                        }
                    }
                }
                catch (e) {
                    console.log(e);
                }
                _this.dataService.getUserRoleByUserId(_this.globalStorageService.getCurrentUserId())
                    .subscribe(function (res1) {
                    loader.hide();
                    //this.roles = res1.result;
                    _this.globalStorageService.setPermission('1', JSON.stringify(res1.result));
                    console.log("role permission --> " + _this.globalStorageService.getPermission('1'));
                    //this.condoInfo = res1.result[0];
                    //this.globalStorageService.setCurrentCondoInfo(this.condoInfo);
                });
                //this.router.navigate(['/myfeed']);
                _this.routerExtensions.navigate(["/myfeed"], {
                    transition: {
                        name: "fade"
                    },
                    clearHistory: true,
                });
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
            router_2.RouterExtensions,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUN6QyxtREFBNkM7QUFDN0MsZ0VBQThEO0FBQzlELCtFQUE2RTtBQUM3RSxpQ0FBbUM7QUFDbkMscUNBQWlDO0FBQ2pDLGdDQUErQjtBQUUvQixpRkFBa0U7QUFRbEUsc0RBQTZEO0FBRzdELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBRSxxQkFBcUIsQ0FBRSxDQUFDO0FBVTlDO0lBbUJFLHdCQUFvQixNQUFjLEVBQ3hCLFdBQXdCLEVBQ3hCLGdCQUFrQyxFQUNsQyxvQkFBMEMsRUFDMUMsSUFBVTtRQUVoQix3REFBd0Q7UUFDeEQsc0RBQXNEO1FBQ3RELG9DQUFvQztRQUNwQyx5Q0FBeUM7UUFUekIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUN4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQU9oQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN0RSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDekQsQ0FBQztJQUNMLENBQUM7SUFHRCxpQ0FBUSxHQUFSO1FBQ0Usb0NB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QkFBQztBQUFELENBQUMsQUFuR0QsSUFtR0M7QUFuR1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVXNlcnMgfSBmcm9tICcuLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2xvYmFsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc3RvcmUvZ2xvYmFsc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIGFwcCBmcm9tICdhcHBsaWNhdGlvbic7XG5pbXBvcnQgeyBpc0lPUyB9IGZyb20gJ3BsYXRmb3JtJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xuaW1wb3J0IHsgTG9hZGluZ0luZGljYXRvciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcbmltcG9ydCB7IFdlYlZpZXcsIExvYWRFdmVudERhdGEgfSBmcm9tIFwidWkvd2ViLXZpZXdcIjtcbmltcG9ydCB7IFdlYlZpZXdJbnRlcmZhY2UgfSBmcm9tICduYXRpdmVzY3JpcHQtd2Vidmlldy1pbnRlcmZhY2UnO1xuaW1wb3J0IHtUZXh0RmllbGQgfSBmcm9tICd1aS90ZXh0LWZpZWxkJztcbmltcG9ydCB7U3RhY2tMYXlvdXR9IGZyb20gJ3VpL2xheW91dHMvc3RhY2stbGF5b3V0JztcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgIFJvbGUgfSBmcm9tICcuLi9teUZlZWQvbW9kZWwvbXlmZWVkLm1vZGVsJztcbmltcG9ydCB7IENoZWNrQm94IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWNoZWNrYm94JztcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0ICogYXMgY29sb3IgZnJvbSBcImNvbG9yXCI7XG5cbnZhciBTcWxpdGUgPSByZXF1aXJlKCBcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIiApO1xuZGVjbGFyZSB2YXIgYW5kcm9pZDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWxvZ2luJyxcbiAgdGVtcGxhdGVVcmw6ICdsb2dpbi9sb2dpbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydsb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzJ11cbn0pXG5cblxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICByb2xlczogYW55O1xuICB1c2VyTG9naW46IFVzZXJzO1xuICBlcnJvck1lc3NhZ2U6IGFueTtcbiAgY29uZG9JbmZvOiBDb25kb0luZm9EZXRhaWw7XG4gXG4gIGFwcGxpY2F0aW9uSWQ6IHN0cmluZztcbiAgc2VjcmV0S2V5OiBzdHJpbmc7XG4gIHB1YmxpYyBodG1sU3RyaW5nOiBzdHJpbmc7XG4gIHB1YmxpYyB3ZWJ2aWV3OiBXZWJWaWV3O1xuICBwdWJsaWMgb1dlYlZpZXdJbnRlcmZhY2U6V2ViVmlld0ludGVyZmFjZTtcbiAgdHh0VXNlck5hbWU6VGV4dEZpZWxkO1xuICB0eHRQYXNzd29yZDpUZXh0RmllbGQ7XG4gIHVzZXJMaXN0OlVzZXJzW107XG4gIGNoa0Fsd2F5c1JlbWVtYmVyOkNoZWNrQm94O1xuXG4gIC8vQFZpZXdDaGlsZChcIndlYlZpZXdcIikgd2ViVmlld1JlZjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImNvbnRhaW5lclwiKSBjb250YWluZXI6IEVsZW1lbnRSZWY7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHByaXZhdGUgZ2xvYmFsU3RvcmFnZVNlcnZpY2U6IEdsb2JhbFN0b3JhZ2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSkge1xuXG4gICAgICAvLyB2YXIgbmF0aXZlQ29sb3IgPSBuZXcgY29sb3IuQ29sb3IoXCIjMDAwMGZmXCIpLmFuZHJvaWQ7XG4gICAgICAvLyB2YXIgd2luZG93ID0gYXBwLmFuZHJvaWQuc3RhcnRBY3Rpdml0eS5nZXRXaW5kb3coKTtcbiAgICAgIC8vIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgICAgLy8gd2luZG93LnNldFN0YXR1c0JhckNvbG9yKG5hdGl2ZUNvbG9yKTtcblxuICAgICAgdGhpcy51c2VyTGlzdCA9IFtdO1xuICAgICAgaWYgKHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0VXNlckRhbygnMCcpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy51c2VyTGlzdCA9IEpTT04ucGFyc2UodGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRVc2VyRGFvKCcwJykpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInVzZXIgbGlzdCBsZW5ndGggXCIgKyB0aGlzLnVzZXJMaXN0Lmxlbmd0aClcbiAgICAgIH1cbiAgfVxuICBcblxuICBuZ09uSW5pdCgpIHtcbiAgICAvL3RoaXMucGFnZS5zdGF0dXNCYXJTdHlsZSA9IFwiZGFya1wiO1xuXG4gICAgaWYoaXNJT1Mpe1xuICAgICBcbiAgICB9ZWxzZXtcbiAgICAgIC8vbGV0IGRlY29yVmlldyA9IGFwcC5hbmRyb2lkLnN0YXJ0QWN0aXZpdHkuZ2V0V2luZG93KCkuZ2V0RGVjb3JWaWV3KCk7XG4gICAgICAvL2RlY29yVmlldy5zZXRTeXN0ZW1VaVZpc2liaWxpdHkoYW5kcm9pZC52aWV3LlZpZXcuU1lTVEVNX1VJX0ZMQUdfTElHSFRfU1RBVFVTX0JBUik7XG4gICAgICBcbiAgICAgIGFwcC5hbmRyb2lkLnN0YXJ0QWN0aXZpdHkuZ2V0V2luZG93KCkuc2V0U29mdElucHV0TW9kZShhbmRyb2lkLnZpZXcuV2luZG93TWFuYWdlci5MYXlvdXRQYXJhbXMuU09GVF9JTlBVVF9BREpVU1RfUEFOKTtcbiAgICAgIC8vdmFyIGFjdGl2aXR5ID0gYXBwLmFuZHJvaWQuc3RhcnRBY3Rpdml0eTtcbiAgICAgIC8vdmFyIG5hdGl2ZUNvbG9yID0gbmV3IGNvbG9yLkNvbG9yKFwiIzAwMDBmZlwiKS5hbmRyb2lkO1xuICAgICAgLy92YXIgd2luZG93ID0gYXBwLmFuZHJvaWQuc3RhcnRBY3Rpdml0eS5nZXRXaW5kb3coKTtcbiAgICAgIC8vd2luZG93LnNldFN0YXR1c0JhckNvbG9yKG5hdGl2ZUNvbG9yKTtcbiAgICAgIC8vY29uc29sZS5sb2coXCJjbGFzcyBuYW1lIFwiICsgYWN0aXZpdHkuZ2V0QWN0aW9uQmFyKCkuaXNTaG93aW5nKCkpO1xuICAgICAvLyBhY3Rpdml0eS5nZXRBY3Rpb25CYXIoKS5zZXRUaXRsZShcInRlc3RcIik7XG5cbiAgICB9XG5cbiAgIFxuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIC8vdGhpcy5wYWdlLmFuZHJvaWRTdGF0dXNCYXJCYWNrZ3JvdW5kID0gbmV3IENvbG9yKFwiIzAwMDBmZlwiKTtcbiAgICB0aGlzLnVzZXJMb2dpbiA9IG5ldyBVc2VycygpO1xuXG4gICAgLy9hcHAuYW5kcm9pZC5zdGFydEFjdGl2aXR5LmdldFdpbmRvdygpLnNldFNvZnRJbnB1dE1vZGUoYW5kcm9pZC52aWV3LldpbmRvd01hbmFnZXIuTGF5b3V0UGFyYW1zLlNPRlRfSU5QVVRfQURKVVNUX1JFU0laRSk7XG5cbiAgfVxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgbGV0IHBhcmVudFZpZXcgPTxTdGFja0xheW91dD50aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMudHh0VXNlck5hbWUgPSA8VGV4dEZpZWxkPiBwYXJlbnRWaWV3LmdldFZpZXdCeUlkKFwidXNlcm5hbWVcIik7XG4gICAgdGhpcy50eHRQYXNzd29yZCA9IDxUZXh0RmllbGQ+IHBhcmVudFZpZXcuZ2V0Vmlld0J5SWQoXCJwYXNzd29yZFwiKTtcbiAgICB0aGlzLmNoa0Fsd2F5c1JlbWVtYmVyID0gPENoZWNrQm94PiBwYXJlbnRWaWV3LmdldFZpZXdCeUlkKFwiY2hrQWx3YXlzUmVtZW1iZXJcIik7XG5cbiAgICAvKnRoaXMud2VidmlldyA9IHRoaXMud2ViVmlld1JlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMub1dlYlZpZXdJbnRlcmZhY2UgPSBuZXcgV2ViVmlld0ludGVyZmFjZSh0aGlzLndlYnZpZXcsIFwifi9zdW1tZXJfbm90ZS9pbmRleC5odG1sXCIpO1xuICAgIHRoaXMud2Vidmlldy5vbignbG9hZEZpbmlzaGVkJywgKGFyZ3MpID0+IHtcbiAgICAgIGlmICghYXJncy5lcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9hZCBmaW5pc2hlZFwiICk7XG4gICAgICB9XG4gIH0pOyovXG5cbiAgfVxuXG4gIFVzZXJMb2dpbigpIHtcbiAgICBpZih0aGlzLnR4dFVzZXJOYW1lLnRleHQudG9TdHJpbmcoKSA9PSBcIlwiKXtcbiAgICAgIGFsZXJ0KFwiUGxlYXNlIGVudGVyIHVzZXJuYW1lIVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9ZWxzZSBpZih0aGlzLnR4dFBhc3N3b3JkLnRleHQudG9TdHJpbmcoKSA9PSBcIlwiKXtcbiAgICAgIGFsZXJ0KFwiUGxlYXNlIGVudGVyIHBhc3N3b3JkIVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG5cbiAgICAvLyBvcHRpb25hbCBvcHRpb25zXG4gICAgLy8gYW5kcm9pZCBhbmQgaW9zIGhhdmUgc29tZSBwbGF0Zm9ybSBzcGVjaWZpYyBvcHRpb25zXG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBtZXNzYWdlOiAnTG9hZGluZy4uLicsXG4gICAgICBwcm9ncmVzczogMC42NSxcbiAgICAgIGFuZHJvaWQ6IHtcbiAgICAgICAgaW5kZXRlcm1pbmF0ZTogdHJ1ZSxcbiAgICAgICAgY2FuY2VsYWJsZTogZmFsc2UsXG4gICAgICAgIG1heDogMTAwLFxuICAgICAgICBwcm9ncmVzc051bWJlckZvcm1hdDogXCIlMWQvJTJkXCIsXG4gICAgICAgIHByb2dyZXNzUGVyY2VudEZvcm1hdDogMC41MyxcbiAgICAgICAgcHJvZ3Jlc3NTdHlsZTogMSxcbiAgICAgICAgc2Vjb25kYXJ5UHJvZ3Jlc3M6IDFcbiAgICAgIH0sXG4gICAgICAvKmlvczoge1xuICAgICAgICBkZXRhaWxzOiBcIkFkZGl0aW9uYWwgZGV0YWlsIG5vdGUhXCIsXG4gICAgICAgIG1hcmdpbjogMTAsXG4gICAgICAgIGRpbUJhY2tncm91bmQ6IHRydWUsXG4gICAgICAgIGNvbG9yOiBcIiM0QjlFRDZcIiwgLy8gY29sb3Igb2YgaW5kaWNhdG9yIGFuZCBsYWJlbHNcbiAgICAgICAgLy8gYmFja2dyb3VuZCBib3ggYXJvdW5kIGluZGljYXRvclxuICAgICAgICAvLyBoaWRlQmV6ZWwgd2lsbCBvdmVycmlkZSB0aGlzIGlmIHRydWVcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInllbGxvd1wiLFxuICAgICAgICBoaWRlQmV6ZWw6IHRydWUsIC8vIGRlZmF1bHQgZmFsc2UsIGNhbiBoaWRlIHRoZSBzdXJyb3VuZGluZyBiZXplbFxuICAgICAgICB2aWV3OiBVSVZpZXcsIC8vIFRhcmdldCB2aWV3IHRvIHNob3cgb24gdG9wIG9mIChEZWZhdWx0cyB0byBlbnRpcmUgd2luZG93KVxuICAgICAgICBtb2RlOiBNQlByb2dyZXNzSFVETW9kZURldGVybWluYXRlLy8gc2VlIGlPUyBzcGVjaWZpYyBvcHRpb25zIGJlbG93XG4gICAgICB9Ki9cbiAgICB9O1xuXG4gICAgbG9hZGVyLnNob3cob3B0aW9ucyk7IC8vIG9wdGlvbnMgaXMgb3B0aW9uYWxcblxuICAgIHRoaXMudXNlckxvZ2luLlNlY3JldF9LZXkgPSB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldFNlY3JldEtleSgpO1xuICAgIHRoaXMudXNlckxvZ2luLkFwcGxpY2F0aW9uX0lkID0gdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRBcHBsaWNhdGlvbklkKCk7XG4gICAgY29uc29sZS5sb2coXCJ1c2VyTE9naW4gXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnVzZXJMb2dpbikpO1xuXG4gICAgdGhpcy5kYXRhU2VydmljZS51c2VyTG9naW4odGhpcy51c2VyTG9naW4pXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29kZSBcIiArIHJlcy5yZXNwb25zZS5jb2RlKTtcbiAgICAgICAgaWYgKHJlcy5yZXNwb25zZS5jb2RlID09IFwiMjAwXCIpIHtcblxuICAgICAgICAgIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2Uuc2V0VG9rZW5LZXkocmVzLnJlc3VsdFswXS5Ub2tlbktleSk7XG4gICAgICAgICAgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5zZXRDb25kb21pbml1bUlkKHJlcy5yZXN1bHRbMF0uQ29uZG9taW5pdW1fSWQpO1xuICAgICAgICAgIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2Uuc2V0Q3VycmVudFVzZXJJZChyZXMucmVzdWx0WzBdLlVzZXJJZCk7XG4gICAgICAgICAgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5zZXRCYXRjaE51bWJlcihyZXMucmVzdWx0WzBdLkJhdGNoTm8pO1xuICAgICAgICAgIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2Uuc2V0Q3VycmVudFVzZXJJbmZvKHJlcy5yZXN1bHRbMF0pO1xuICAgICAgICAgIFxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgdXNlcjogVXNlcnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlcy5yZXN1bHRbMF0pLCB0aGlzLmRhdGFTZXJ2aWNlLnJldml2ZXIpO1xuICAgICAgICAgICAgaWYodGhpcy5jaGtBbHdheXNSZW1lbWJlci5jaGVja2VkKXtcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgaWYgKHVzZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtVG9SZW1vdmUgPSB0aGlzLnVzZXJMaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0uVXNlcklkID09IHVzZXIuVXNlcklkKTtcbiAgICAgICAgICAgICAgICBpZihpdGVtVG9SZW1vdmUubGVuZ3RoID09IDApe1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzYXZlIHRvIERCIFwiKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMudXNlckxpc3QucHVzaCh1c2VyKTtcbiAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjb252ZXJ0aW5nIFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy51c2VyTGlzdCkpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5zZXRVc2VyRGFvKCcwJywgSlNPTi5zdHJpbmdpZnkodGhpcy51c2VyTGlzdCkpO1xuICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImdldCB1c2VyIERhbyAtLT4gXCIgKyB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldFVzZXJEYW8oJzAnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXNlciBvYmplY3QgbnVsbFwiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVtb3ZlIGZyb20gREIgXCIgKyB0aGlzLnVzZXJMaXN0Lmxlbmd0aCk7XG4gICAgICAgICAgICAgIGlmKHRoaXMudXNlckxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVtb3ZlIGZyb20gREIgXCIpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMudXNlckxpc3Quc3BsaWNlKHRoaXMudXNlckxpc3QuaW5kZXhPZih1c2VyKSwxKTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnVzZXJMaXN0LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcIkZ1bGxOYW1lIC0+IFwiICsgZWxlbWVudC5GdWxsTmFtZSk7XG4gICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5zZXRVc2VyRGFvKCcwJywgSlNPTi5zdHJpbmdpZnkodGhpcy51c2VyTGlzdCkpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1Ub1JlbW92ZSA9IHRoaXMudXNlckxpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS5Vc2VySWQgPT0gdXNlci5Vc2VySWQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVtb3ZlIHVzZXJcIiArIEpTT04uc3RyaW5naWZ5KGl0ZW1Ub1JlbW92ZSkpO1xuICAgICAgICAgICAgICAgIGxldCBpID0gdGhpcy51c2VyTGlzdC5pbmRleE9mKGl0ZW1Ub1JlbW92ZVswXSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbmRleCBvZiB1c2VyIFwiICsgaSk7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMudXNlckxpc3Quc3BsaWNlKGksMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5zZXRVc2VyRGFvKCcwJywgSlNPTi5zdHJpbmdpZnkodGhpcy51c2VyTGlzdCkpO1xuICAgICAgICAgICAgICB9XG5cblxuICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5nZXRVc2VyUm9sZUJ5VXNlcklkKHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0Q3VycmVudFVzZXJJZCgpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXMxID0+IHtcbiAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgLy90aGlzLnJvbGVzID0gcmVzMS5yZXN1bHQ7XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2Uuc2V0UGVybWlzc2lvbignMScsSlNPTi5zdHJpbmdpZnkocmVzMS5yZXN1bHQpKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicm9sZSBwZXJtaXNzaW9uIC0tPiBcIiArIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0UGVybWlzc2lvbignMScpKTtcblxuICAgICAgICAgICAgICAvL3RoaXMuY29uZG9JbmZvID0gcmVzMS5yZXN1bHRbMF07XG4gICAgICAgICAgICAgIC8vdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5zZXRDdXJyZW50Q29uZG9JbmZvKHRoaXMuY29uZG9JbmZvKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbXlmZWVkJ10pO1xuXG4gICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9teWZlZWRcIl0sIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcImZhZGVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFySGlzdG9yeTogdHJ1ZSxcbiAgICAgICAgICBcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHJlcy5yZXNwb25zZS5jb2RlO1xuICAgICAgICAgIHRoaXMudXNlckxvZ2luLlVzZXJfTmFtZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0sIGVycm9yID0+IHsgbG9hZGVyLmhpZGUoKSwgYWxlcnQoXCJDYW4ndCBjb25uZWN0IHRvIHNlcnZlciFcIikgfSk7XG4gIH1cblxuICBjYW5jZWxMb2dpbigpIHtcblxuICAgIHRoaXMudXNlckxvZ2luLlBhc3N3b3JkID0gbnVsbDtcbiAgICB0aGlzLnVzZXJMb2dpbi5Vc2VyX05hbWUgPSBudWxsO1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gbnVsbDtcblxuICB9XG5cbiAgZ2V0Q29udGVudCgpIHtcbiAgICAgdGhpcy5vV2ViVmlld0ludGVyZmFjZS5jYWxsSlNGdW5jdGlvbignaGVsbG8nLG51bGwsKG9TZWxlY3RlZExhbmcpID0+IHtcbiAgICAgIGFsZXJ0KGAke29TZWxlY3RlZExhbmd9YCk7XG4gICAgfSk7IFxuICAgICBcbiAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBDb25kb0luZm9EZXRhaWwge1xuICBDb25kb21pbml1bV9JZDogYW55O1xuICBSZXF1ZXN0X0lkOiBhbnk7XG4gIENvbmRvbWluaXVtX05hbWU6IHN0cmluZztcbiAgTUNTVF9ObzogbnVtYmVyO1xuICBNYWludGVuYW5jZUZ1bmRBY2NvdW50OiBzdHJpbmc7XG4gIFRPUF9EYXk6IG51bWJlcjtcbiAgVE9QX01vbnRoOiBudW1iZXI7XG4gIFRPUF9ZZWFyOiBudW1iZXI7XG4gIFRlbnVyZTogc3RyaW5nO1xuICBEaXN0cmljdF9JZDogYW55O1xuICBOb19PZl9Vbml0OiBudW1iZXI7XG4gIFNpdGVBcmVhOiBudW1iZXI7XG4gIENvdW50cnlfSWQ6IGFueTtcbiAgUG9zdGFsX0NvZGU6IG51bWJlcjtcbiAgQWRkcmVzczogc3RyaW5nO1xuICBDdXJyZW50X1dlYnNpdGVfQWRkcmVzczogc3RyaW5nO1xuICBNeUNvbmRvX1dlYnNpdGVfQWRkcmVzczogc3RyaW5nO1xuICBSZXByZXNlbnRpbmc6IHN0cmluZztcbiAgQ29udGFjdF9QZXJzb246IHN0cmluZztcbiAgU2FsdXRhdGlvbjogc3RyaW5nO1xuICBEZXNpZ25hdGlvbjogc3RyaW5nO1xuICBDb250YWN0X05vOiBzdHJpbmc7XG4gIENvbnRhY3RfTW9iaWxlX05vOiBzdHJpbmc7XG4gIENvbnRhY3RfRW1haWw6IHN0cmluZztcbiAgTWFuYWdpbmdfQWdlbnRfSWQ6IGFueTtcbiAgTWFuYWdpbmdfQWdlbnRfTmFtZTogc3RyaW5nO1xuICBBZ2VudF9IZWFkX09mZmljZV9BZGRyZXNzOiBzdHJpbmc7XG4gIEFnZW50X1Bob25lOiBzdHJpbmc7XG4gIEFnZW50X0ZheDogc3RyaW5nO1xuICBNQV9Qcm9qZWN0X01hbmFnZXI6IHN0cmluZztcbiAgTUFfTW9iaWxlOiBzdHJpbmc7XG4gIE1BX0VtYWlsOiBzdHJpbmc7XG4gIERldmVsb3Blcl9JZDogYW55O1xuICBEZXZlbG9wZXJfTmFtZTogc3RyaW5nO1xuICBEZXZlbG9wZXJfSGVhZF9PZmZpY2VfQWRkcmVzczogc3RyaW5nO1xuICBEZXZlbG9wZXJfUGhvbmU6IHN0cmluZztcbiAgRGV2ZWxvcGVyX0ZheDogc3RyaW5nO1xuICBEZXZfUHJvamVjdF9NYW5hZ2VyOiBzdHJpbmc7XG4gIERldl9Nb2JpbGU6IHN0cmluZztcbiAgRGV2X0VtYWlsOiBzdHJpbmc7XG4gIERhdGVfRm9ybWF0OiBzdHJpbmc7XG4gIEN1cnJlbmN5X0lkOiBhbnk7XG4gIElzQXV0b0dlbmVyYXRlX1JlY2VpdmVfTm86IGJvb2xlYW47XG4gIFJlY2VpdmVfUHJlZml4OiBzdHJpbmc7XG4gIFJlY2VpdmVfTm9fVHlwZTogc3RyaW5nO1xuICBJc0F1dG9HZW5lcmF0ZV9SZWZ1bmRfTm86IGJvb2xlYW47XG4gIFJlZnVuZF9QcmVmaXg6IHN0cmluZztcbiAgUmVmdW5kX05vX1R5cGU6IHN0cmluZztcbiAgQ29uZG9taW5pdW1fUHJlZml4OiBzdHJpbmc7XG4gIENvbmRvbWluaXVtSW1hZ2U6IHN0cmluZztcbiAgQ29uZG9taW5pdW1JbWFnZV9UeXBlOiBzdHJpbmc7XG4gIGlzQWN0aXZlOiBib29sZWFuO1xuICBFeHBpcmVPbjogRGF0ZTtcbiAgTGF1bmNoT246IERhdGU7XG4gIFNpdGVNYXA6IHN0cmluZztcbiAgU2l0ZU1hcF9GaWxlVHlwZTogc3RyaW5nO1xuICBMb2NhdGlvbk1hcDogc3RyaW5nO1xuICBMb2NhdG9pbk1hcFR5cGU6IHN0cmluZztcbiAgQWJvdXRVczogc3RyaW5nO1xuICBQcm9qZWN0X1NwZWNpZmljYXRpb246IHN0cmluZztcbiAgUHJvamVjdF9TcGVjaWZpY2F0aW9uX0ZpbGVUeXBlOiBzdHJpbmc7XG4gIEN1cnJlbnRCb29raW5nTm86IG51bWJlcjtcbiAgQ3VycmVudFBheW1lbnRObzogbnVtYmVyO1xuICBDdXJyZW50UmVmdW5kTm86IG51bWJlcjtcbiAgQ29uZG9NYW5hZ2VyOiBzdHJpbmc7XG4gIENvbmRvTWFuYWdlcl9TYWx1dGF0aW9uOiBzdHJpbmc7XG4gIENvbmRvTWFuYWdlcl9OaWNrbmFtZTogc3RyaW5nO1xuICBDb25kb01hbmFnZXJfTW9iaWxlOiBzdHJpbmc7XG4gIENvbmRvTWFuYWdlcl9FbWFpbDogc3RyaW5nO1xuICBDdXJyZW50X0luaXRpYWxfRmVlX0lkOiBhbnk7XG4gIE1PX0VtYWlsOiBzdHJpbmc7XG4gIE1PX1Bob25lOiBzdHJpbmc7XG4gIE1PX0ZheDogc3RyaW5nO1xuICBNT19HdWFyZEhvdXNlOiBzdHJpbmc7XG4gIE1PX09wZXJhdGluZ19Ib3Vyczogc3RyaW5nO1xuICBpc01vbmRheU9mZjogYm9vbGVhbjtcbiAgaXNUdWVzZGF5T2ZmOiBib29sZWFuO1xuICBpc1dlZG5lc2RheU9mZjogYm9vbGVhbjtcbiAgaXNUaHVyc2RheU9mZjogYm9vbGVhbjtcbiAgaXNGcmlkYXlPZmY6IGJvb2xlYW47XG4gIGlzU2F0dXJkYXlPZmY6IGJvb2xlYW47XG4gIGlzU3VuZGF5T2ZmOiBib29sZWFuO1xuICBUZW1wbGF0ZU5hbWU6IHN0cmluZztcbiAgVGhlbWU6IHN0cmluZztcbiAgVGhlbWVJZDogYW55O1xuICBpc0RhdGFFbnRyeTogYm9vbGVhbjtcbiAgU2l0ZV9UaXRsZTogc3RyaW5nO1xuICBFbnF1aXJ5X0VtYWlsOiBzdHJpbmc7XG4gIFNlbmRpbmdfRnJvbV9FbWFpbDogc3RyaW5nO1xuICBEaXN0cmljdF9OYW1lOiBzdHJpbmc7XG4gIE1heF9TdG9yZXk6IG51bWJlcjtcbiAgTWluX1N0b3JleTogbnVtYmVyO1xuICBUb3RhbFVuaXRDb3VudDogbnVtYmVyO1xuICBUb3RhbEJsb2NrQ291bnQ6IG51bWJlcjtcbiAgQ3JlYXRlZF9CeTogc3RyaW5nO1xuICBDcmVhdGVkX09uOiBEYXRlO1xuICBMYXN0X1VwZGF0ZWRfQnk6IHN0cmluZztcbiAgTGFzdF9VcGRhdGVkX09uOiBEYXRlO1xufSJdfQ==