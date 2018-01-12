"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var myfeed_service_1 = require("../services/myfeed.service");
var common_service_1 = require("../../shared/utils/common.service");
var globalstorage_service_1 = require("../../shared/store/globalstorage.service");
var dialogs = require("ui/dialogs");
var myfeeds_component_1 = require("../../myFeed/components/myfeeds.component");
var myfeedsearch_component_1 = require("../../myFeed/components/myfeedsearch.component");
var myfeedfilterresult_component_1 = require("../../myFeed/components/myfeedfilterresult.component");
//import { DialogService } from '../../shared/utils/dialog.service';
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var timer = require("timer");
var MyFeedDetailComponent = /** @class */ (function () {
    function MyFeedDetailComponent(router, route, routerExtensions, feedService, commonService, globalStorageService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.routerExtensions = routerExtensions;
        this.feedService = feedService;
        this.commonService = commonService;
        this.globalStorageService = globalStorageService;
        this.isLoading = false;
        this.isUpdateFeedDetail = false;
        this.route.queryParams.subscribe(function (params) {
            _this.selectedPosition = params['SelectedPosition'];
            _this.callerClass = params['CallerClass'];
            //alert("selected index " + this.selectedPosition)
            //var myFeed : Feed = JSON.parse(params["Feed"]);
            // console.log("Feed_Id " + params['id'] );
            //this.getFeedDetail(myFeed.Feed_Id);
        });
        MyFeedDetailComponent_1.myFeedDetailComponent = this;
    }
    MyFeedDetailComponent_1 = MyFeedDetailComponent;
    MyFeedDetailComponent.prototype.ngOnInit = function () {
        this.ngAfterViewInit();
        console.log("init");
        this.role = JSON.parse(this.globalStorageService.getPermission('1'));
        this.checkPermission();
        this.loadFeedInfo();
        //this.getHeight();
    };
    MyFeedDetailComponent.prototype.ngAfterViewInit = function () {
        console.log("view init");
        var myContainer = this.container.nativeElement;
        if (myContainer != null) {
            console.log("myContainer not null");
        }
        else {
            console.log("myContainer is null");
        }
        this.webViewTemp = myContainer.getViewById("myWebViewTemp");
        this.webViewDescription = myContainer.getViewById("myWebView");
        if (this.webViewTemp != null) {
            console.log("web view not null");
        }
        else {
            console.log("webview null null");
        }
        if (this.webViewDescription != null) {
            console.log("web view not null");
        }
        else {
            console.log("webview null null");
        }
    };
    MyFeedDetailComponent.prototype.checkPermission = function () {
        this.EDIT_FEED = this.IsAccess('EDIT_FEED');
    };
    MyFeedDetailComponent.prototype.IsAccess = function (role) {
        // alert(this.commonService.IsAccess(this.role,role));
        var _return = this.commonService.IsAccess(this.role, role);
        return _return;
    };
    MyFeedDetailComponent.prototype.getWebViewHeight = function () {
        var height = this.webViewTemp.getMeasuredHeight();
        console.log("webview height " + height);
        return height;
    };
    MyFeedDetailComponent.prototype.loadFeedInfo = function () {
        var _this = this;
        this.isLoading = true;
        this.feedId = this.route.snapshot.params['id'];
        console.log("Feed_Id --> " + this.feedId);
        this.busy = this.feedService.getfeedDetail(this.feedId)
            .subscribe(function (res) {
            console.log("getFeedDetail --> " + JSON.stringify(res));
            _this.isLoading = false;
            _this.feedInfoDetail = res.result[0];
            _this.getHeight();
            _this.description = "<style>body {background-color: #ffffff;font-size:14px; color:#000000;font-family: 'Roboto';} img{display: inline;height: auto;max-width: 100%;}</style>" + _this.feedInfoDetail.Description;
            if (_this.isUpdateFeedDetail == true) {
                if (_this.callerClass == "MyFeedsComponent") {
                    myfeeds_component_1.MyFeedsComponent.getMyFeedsObject().updateMyFeedsUI(_this.feedInfoDetail, "update", _this.selectedPosition);
                }
                else if (_this.callerClass == "MyFeedSearchComponent") {
                    myfeedsearch_component_1.MyFeedSearchComponent.getMyFeedsSearchObject().updateMyFeedsUI(_this.feedInfoDetail, "update", _this.selectedPosition);
                }
                else if (_this.callerClass == "MyFeedFilterResultComponent") {
                    myfeedfilterresult_component_1.MyFeedFilterResultComponent.getMyFeedsFilterResultObject().updateMyFeedsUI(_this.feedInfoDetail, "update", _this.selectedPosition);
                }
            }
        }, function (error) { alert("Can't connect to server!"); });
    };
    MyFeedDetailComponent.prototype.getHeight = function () {
        console.log("size of list ===> " + this.feedInfoDetail.MC_Feed_Files.length);
        this.radListViewHeight = this.feedInfoDetail.MC_Feed_Files.length > 2 ? ((this.feedInfoDetail.MC_Feed_Files.length % 2) + (this.feedInfoDetail.MC_Feed_Files.length / 2)) * 150 : 150;
        console.log("list height -> " + this.radListViewHeight);
        return this.radListViewHeight;
    };
    MyFeedDetailComponent.prototype.onNavBtnTap = function () {
        this.routerExtensions.backToPreviousPage();
    };
    MyFeedDetailComponent.prototype.onEditFeed = function () {
        var navigationExtras = {
            queryParams: {
                "Feed": JSON.stringify(this.feedInfoDetail)
            }
        };
        this.router.navigate(["/myfeed/edit"], navigationExtras);
    };
    MyFeedDetailComponent.prototype.changeFeedStatus = function (feedId, status) {
        var _this = this;
        console.log("feedId - " + feedId + " / status " + status);
        dialogs.confirm('Are you sure you want to ' + status + '?')
            .then(function (res) {
            console.log("return status " + res);
            _this.confirmResult = res;
            if (_this.confirmResult !== undefined && _this.confirmResult == true) {
                var loader = new nativescript_loading_indicator_1.LoadingIndicator();
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
                    }
                };
                loader.show(options);
                _this.feedService.changeFeedStatus(feedId, status)
                    .subscribe(function (res1) {
                    loader.hide();
                    console.log("changeFeedStatus --> " + JSON.stringify(res1));
                    _this.onNavBtnTap();
                    if (res1.response.code == "200") {
                        setTimeout(function () {
                            if (_this.callerClass == "MyFeedsComponent") {
                                myfeeds_component_1.MyFeedsComponent.getMyFeedsObject().updateMyFeedsUI(null, status, _this.selectedPosition);
                            }
                            else if (_this.callerClass == "MyFeedSearchComponent") {
                                myfeedsearch_component_1.MyFeedSearchComponent.getMyFeedsSearchObject().updateMyFeedsUI(null, status, _this.selectedPosition);
                            }
                            else if (_this.callerClass == "MyFeedFilterResultComponent") {
                                myfeedfilterresult_component_1.MyFeedFilterResultComponent.getMyFeedsFilterResultObject().updateMyFeedsUI(null, status, _this.selectedPosition);
                            }
                        }, 500);
                        //alert('Feed Information has been' + ' ' + status + ' ' + 'successfully.');
                        //event raise
                        //this.router.navigate(['/myfeed']);
                    }
                    else {
                        alert(res1.response.message);
                    }
                    //this.router.navigate(['/myfeed'])                           
                }, function (error) {
                    //loader.hide();
                    alert('Feed Information' + ' has not been ' + status + ' ' + 'successfully. Please try again.');
                });
            }
        });
    };
    MyFeedDetailComponent.prototype.updateFeedDetailUI = function (feed) {
        // alert("update my feedLIst");
        // console.log("feed " + JSON.stringify(feed));
        if (feed != null) {
            this.isUpdateFeedDetail = true;
            this.ngOnInit();
        }
        //this.feedInfoDetail = new FeedInformation();
        //this.feedInfoDetail = feed;
        //this.ngOnInit();
    };
    MyFeedDetailComponent.getMyFeedDetailObject = function () {
        return MyFeedDetailComponent_1.myFeedDetailComponent;
    };
    __decorate([
        core_1.ViewChild("container"),
        __metadata("design:type", core_1.ElementRef)
    ], MyFeedDetailComponent.prototype, "container", void 0);
    MyFeedDetailComponent = MyFeedDetailComponent_1 = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-myfeeddetail',
            templateUrl: 'myfeeddetail.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, router_2.RouterExtensions, myfeed_service_1.MyFeedService,
            common_service_1.CommonService, globalstorage_service_1.GlobalStorageService])
    ], MyFeedDetailComponent);
    return MyFeedDetailComponent;
    var MyFeedDetailComponent_1;
}());
exports.MyFeedDetailComponent = MyFeedDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlmZWVkZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15ZmVlZGRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0U7QUFDeEUsMENBQXlFO0FBQ3pFLHNEQUE2RDtBQU03RCw2REFBMkQ7QUFFM0Qsb0VBQWtFO0FBQ2xFLGtGQUFnRjtBQUNoRixvQ0FBc0M7QUFDdEMsK0VBQTJFO0FBQzNFLHlGQUFxRjtBQUNyRixxR0FBaUc7QUFDakcsb0VBQW9FO0FBQ3BFLGlGQUFrRTtBQU1sRSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFTN0I7SUFvQkksK0JBQW9CLE1BQWMsRUFBUyxLQUFxQixFQUFTLGdCQUFrQyxFQUFTLFdBQXlCLEVBQ3JJLGFBQTJCLEVBQVMsb0JBQXlDO1FBRHJGLGlCQVlDO1FBWm1CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQUNySSxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUFTLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFoQnJGLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFJM0IsdUJBQWtCLEdBQVcsS0FBSyxDQUFDO1FBYy9CLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDbkMsS0FBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ25ELEtBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3pDLGtEQUFrRDtZQUNsRCxpREFBaUQ7WUFDbEQsMkNBQTJDO1lBQzFDLHFDQUFxQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNILHVCQUFxQixDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztJQUN2RCxDQUFDOzhCQWhDUSxxQkFBcUI7SUFrQzlCLHdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsbUJBQW1CO0lBQ3ZCLENBQUM7SUFFRCwrQ0FBZSxHQUFmO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QixJQUFJLFdBQVcsR0FBUSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztRQUNwRCxFQUFFLENBQUEsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUFBLElBQUksQ0FBQSxDQUFDO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQVUsZUFBZSxDQUFDLENBQUM7UUFFckUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQVUsV0FBVyxDQUFDLENBQUM7UUFFeEUsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBRyxJQUFLLENBQUMsQ0FBQSxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBQUEsSUFBSSxDQUFBLENBQUM7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDckMsQ0FBQztRQUNELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBQUEsSUFBSSxDQUFBLENBQUM7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDckMsQ0FBQztJQUNMLENBQUM7SUFFRCwrQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCx3Q0FBUSxHQUFSLFVBQVMsSUFBWTtRQUNqQixzREFBc0Q7UUFDdEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxnREFBZ0IsR0FBaEI7UUFDRyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2pCLENBQUM7SUFFRiw0Q0FBWSxHQUFaO1FBQUEsaUJBd0JDO1FBdkJHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDbEQsU0FBUyxDQUFDLFVBQUEsR0FBRztZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hELEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsS0FBSSxDQUFDLFdBQVcsR0FBRyx5SkFBeUosR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQztZQUUvTSxFQUFFLENBQUEsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztnQkFDaEMsRUFBRSxDQUFBLENBQUMsS0FBSSxDQUFDLFdBQVcsSUFBSSxrQkFBa0IsQ0FBQyxDQUFBLENBQUM7b0JBQ3ZDLG9DQUFnQixDQUFDLGdCQUFnQixFQUFFLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyxjQUFjLEVBQUMsUUFBUSxFQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUM1RyxDQUFDO2dCQUFBLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxLQUFJLENBQUMsV0FBVyxJQUFJLHVCQUF1QixDQUFDLENBQUEsQ0FBQztvQkFDbEQsOENBQXFCLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLGNBQWMsRUFBQyxRQUFRLEVBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3ZILENBQUM7Z0JBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxXQUFXLElBQUksNkJBQTZCLENBQUMsQ0FBQSxDQUFDO29CQUN4RCwwREFBMkIsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLGVBQWUsQ0FBQyxLQUFJLENBQUMsY0FBYyxFQUFDLFFBQVEsRUFBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDbkksQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDLEVBQUMsVUFBQSxLQUFLLElBQUssS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQztJQUd4RCxDQUFDO0lBRUQseUNBQVMsR0FBVDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDdEwsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFFRCwyQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELDBDQUFVLEdBQVY7UUFDSSxJQUFJLGdCQUFnQixHQUFxQjtZQUNyQyxXQUFXLEVBQUU7Z0JBQ1QsTUFBTSxFQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQzthQUMvQztTQUNKLENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELGdEQUFnQixHQUFoQixVQUFpQixNQUFXLEVBQUUsTUFBYztRQUE1QyxpQkF5REM7UUF4REcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsTUFBTSxHQUFHLFlBQVksR0FBRyxNQUFNLENBQUMsQ0FBQztRQUUxRCxPQUFPLENBQUMsT0FBTyxDQUFDLDJCQUEyQixHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUM7YUFDdEQsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDcEMsS0FBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7WUFDekIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLGFBQWEsS0FBSyxTQUFTLElBQUksS0FBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNqRSxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7Z0JBQ3BDLElBQUksT0FBTyxHQUFHO29CQUNWLE9BQU8sRUFBRSxZQUFZO29CQUNyQixRQUFRLEVBQUUsSUFBSTtvQkFDZCxPQUFPLEVBQUU7d0JBQ1AsYUFBYSxFQUFFLElBQUk7d0JBQ25CLFVBQVUsRUFBRSxLQUFLO3dCQUNqQixHQUFHLEVBQUUsR0FBRzt3QkFDUixvQkFBb0IsRUFBRSxTQUFTO3dCQUMvQixxQkFBcUIsRUFBRSxJQUFJO3dCQUMzQixhQUFhLEVBQUUsQ0FBQzt3QkFDaEIsaUJBQWlCLEVBQUUsQ0FBQztxQkFDckI7aUJBQ0osQ0FBQTtnQkFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUVyQixLQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7cUJBQzVDLFNBQVMsQ0FBQyxVQUFBLElBQUk7b0JBQ1gsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUM1RCxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ25CLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFBLENBQUM7d0JBQzVCLFVBQVUsQ0FBQzs0QkFDUCxFQUFFLENBQUEsQ0FBQyxLQUFJLENBQUMsV0FBVyxJQUFJLGtCQUFrQixDQUFDLENBQUEsQ0FBQztnQ0FDdkMsb0NBQWdCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs0QkFDM0YsQ0FBQzs0QkFBQSxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsS0FBSSxDQUFDLFdBQVcsSUFBSSx1QkFBdUIsQ0FBQyxDQUFBLENBQUM7Z0NBQ2xELDhDQUFxQixDQUFDLHNCQUFzQixFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7NEJBQ3RHLENBQUM7NEJBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxXQUFXLElBQUksNkJBQTZCLENBQUMsQ0FBQSxDQUFDO2dDQUN4RCwwREFBMkIsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOzRCQUNsSCxDQUFDO3dCQUNMLENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQzt3QkFDUCw0RUFBNEU7d0JBRTVFLGFBQWE7d0JBQ2Isb0NBQW9DO29CQUN4QyxDQUFDO29CQUFBLElBQUksQ0FBQSxDQUFDO3dCQUNGLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNqQyxDQUFDO29CQUNELDhEQUE4RDtnQkFFbEUsQ0FBQyxFQUNELFVBQUEsS0FBSztvQkFDRCxnQkFBZ0I7b0JBQ2hCLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxnQkFBZ0IsR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLGlDQUFpQyxDQUFDLENBQUM7Z0JBQ3BHLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQztRQUVMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUdELGtEQUFrQixHQUFsQixVQUFtQixJQUFxQjtRQUNyQywrQkFBK0I7UUFDL0IsK0NBQStDO1FBRTlDLEVBQUUsQ0FBQSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ2IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFcEIsQ0FBQztRQUNELDhDQUE4QztRQUM5Qyw2QkFBNkI7UUFDN0Isa0JBQWtCO0lBRXRCLENBQUM7SUFFTSwyQ0FBcUIsR0FBNUI7UUFDSSxNQUFNLENBQUMsdUJBQXFCLENBQUMscUJBQXFCLENBQUM7SUFDdkQsQ0FBQztJQTVMdUI7UUFBdkIsZ0JBQVMsQ0FBQyxXQUFXLENBQUM7a0NBQVksaUJBQVU7NERBQUM7SUFuQnJDLHFCQUFxQjtRQVBqQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLG1CQUFtQjtTQUNuQyxDQUFDO3lDQXVCOEIsZUFBTSxFQUFnQix1QkFBYyxFQUEyQix5QkFBZ0IsRUFBcUIsOEJBQWE7WUFDdkgsOEJBQWEsRUFBOEIsNENBQW9CO09BckI1RSxxQkFBcUIsQ0FnTmpDO0lBQUQsNEJBQUM7O0NBQUEsQUFoTkQsSUFnTkM7QUFoTlksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIE9uSW5pdCxFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUsTmF2aWdhdGlvbkV4dHJhc30gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsLCBTYWZlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEZlZWRJbmZvcm1hdGlvbiwgRmVlZFR5cGUsIEZlZWRDYXRlZ29yeSwgRmVlZEZpbHRlciwgUm9sZSB9IGZyb20gJy4uL21vZGVsL215ZmVlZC5tb2RlbCc7XHJcbmltcG9ydCB7IE15RmVlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9teWZlZWQuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMvY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb21tb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL2NvbW1vbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR2xvYmFsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RvcmUvZ2xvYmFsc3RvcmFnZS5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQge015RmVlZHNDb21wb25lbnR9IGZyb20gXCIuLi8uLi9teUZlZWQvY29tcG9uZW50cy9teWZlZWRzLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQge015RmVlZFNlYXJjaENvbXBvbmVudH0gZnJvbSBcIi4uLy4uL215RmVlZC9jb21wb25lbnRzL215ZmVlZHNlYXJjaC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtNeUZlZWRGaWx0ZXJSZXN1bHRDb21wb25lbnR9IGZyb20gXCIuLi8uLi9teUZlZWQvY29tcG9uZW50cy9teWZlZWRmaWx0ZXJyZXN1bHQuY29tcG9uZW50XCI7XHJcbi8vaW1wb3J0IHsgRGlhbG9nU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy9kaWFsb2cuc2VydmljZSc7XHJcbmltcG9ydCB7IExvYWRpbmdJbmRpY2F0b3IgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XHJcbmltcG9ydCB7IFdlYlZpZXcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3dlYi12aWV3L3dlYi12aWV3JztcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZWRpdGFibGUtdGV4dC1iYXNlL2VkaXRhYmxlLXRleHQtYmFzZSc7XHJcbmltcG9ydCB7IEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlL3NyYy9tZXRhZGF0YS9saWZlY3ljbGVfaG9va3MnO1xyXG5cclxuXHJcbnZhciB0aW1lciA9IHJlcXVpcmUoXCJ0aW1lclwiKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiAnYXBwLW15ZmVlZGRldGFpbCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ215ZmVlZGRldGFpbC5odG1sJ1xyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBNeUZlZWREZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gICAgYnVzeTogU3Vic2NyaXB0aW9uO1xyXG4gICAgZmVlZElkOiBhbnk7XHJcbiAgICBmZWVkSW5mb0RldGFpbDogRmVlZEluZm9ybWF0aW9uO1xyXG4gICAgaXNMb2FkaW5nOiBCb29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIHJhZExpc3RWaWV3SGVpZ2h0Om51bWJlcjtcclxuICAgIHN0YXRpYyBteUZlZWREZXRhaWxDb21wb25lbnQ6TXlGZWVkRGV0YWlsQ29tcG9uZW50O1xyXG4gICAgaXNVcGRhdGVGZWVkRGV0YWlsOkJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNlbGVjdGVkUG9zaXRpb246bnVtYmVyO1xyXG4gICAgcm9sZTpSb2xlW107XHJcbiAgICBjb25maXJtUmVzdWx0OiBib29sZWFuO1xyXG4gICAgY2FsbGVyQ2xhc3M6c3RyaW5nO1xyXG5cclxuICAgIEVESVRfRkVFRDpCb29sZWFuO1xyXG4gICAgd2ViVmlld0Rlc2NyaXB0aW9uOldlYlZpZXc7XHJcbiAgICB3ZWJWaWV3VGVtcDpXZWJWaWV3O1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoXCJjb250YWluZXJcIikgY29udGFpbmVyOiBFbGVtZW50UmVmO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMscHJpdmF0ZSBmZWVkU2VydmljZTpNeUZlZWRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21tb25TZXJ2aWNlOkNvbW1vblNlcnZpY2UscHJpdmF0ZSBnbG9iYWxTdG9yYWdlU2VydmljZTpHbG9iYWxTdG9yYWdlU2VydmljZSl7IFxyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBvc2l0aW9uID0gcGFyYW1zWydTZWxlY3RlZFBvc2l0aW9uJ107XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGVyQ2xhc3MgPSBwYXJhbXNbJ0NhbGxlckNsYXNzJ107XHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCJzZWxlY3RlZCBpbmRleCBcIiArIHRoaXMuc2VsZWN0ZWRQb3NpdGlvbilcclxuICAgICAgICAgICAgLy92YXIgbXlGZWVkIDogRmVlZCA9IEpTT04ucGFyc2UocGFyYW1zW1wiRmVlZFwiXSk7XHJcbiAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJGZWVkX0lkIFwiICsgcGFyYW1zWydpZCddICk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5nZXRGZWVkRGV0YWlsKG15RmVlZC5GZWVkX0lkKTtcclxuICAgICAgICB9KTsgIFxyXG4gICAgICAgIE15RmVlZERldGFpbENvbXBvbmVudC5teUZlZWREZXRhaWxDb21wb25lbnQgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCl7XHJcbiAgICAgICAgdGhpcy5uZ0FmdGVyVmlld0luaXQoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImluaXRcIik7XHJcbiAgICAgICAgdGhpcy5yb2xlID0gSlNPTi5wYXJzZSh0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldFBlcm1pc3Npb24oJzEnKSk7XHJcbiAgICAgICAgdGhpcy5jaGVja1Blcm1pc3Npb24oKTtcclxuICAgICAgICB0aGlzLmxvYWRGZWVkSW5mbygpO1xyXG4gICAgICAgIC8vdGhpcy5nZXRIZWlnaHQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidmlldyBpbml0XCIpO1xyXG4gICAgICAgIHZhciBteUNvbnRhaW5lcjpWaWV3ID0gdGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudDtcclxuICAgICAgICBpZihteUNvbnRhaW5lciAhPSBudWxsKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJteUNvbnRhaW5lciBub3QgbnVsbFwiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJteUNvbnRhaW5lciBpcyBudWxsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLndlYlZpZXdUZW1wID0gbXlDb250YWluZXIuZ2V0Vmlld0J5SWQ8V2ViVmlldz4oXCJteVdlYlZpZXdUZW1wXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMud2ViVmlld0Rlc2NyaXB0aW9uID0gbXlDb250YWluZXIuZ2V0Vmlld0J5SWQ8V2ViVmlldz4oXCJteVdlYlZpZXdcIik7XHJcblxyXG4gICAgICAgIGlmKHRoaXMud2ViVmlld1RlbXAgIT1udWxsICl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid2ViIHZpZXcgbm90IG51bGxcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid2VidmlldyBudWxsIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMud2ViVmlld0Rlc2NyaXB0aW9uICE9IG51bGwpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIndlYiB2aWV3IG5vdCBudWxsXCIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIndlYnZpZXcgbnVsbCBudWxsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja1Blcm1pc3Npb24oKXtcclxuICAgICAgICB0aGlzLkVESVRfRkVFRCA9IHRoaXMuSXNBY2Nlc3MoJ0VESVRfRkVFRCcpO1xyXG4gICAgfVxyXG5cclxuICAgIElzQWNjZXNzKHJvbGU6IHN0cmluZykge1xyXG4gICAgICAgIC8vIGFsZXJ0KHRoaXMuY29tbW9uU2VydmljZS5Jc0FjY2Vzcyh0aGlzLnJvbGUscm9sZSkpO1xyXG4gICAgICAgIGxldCBfcmV0dXJuID0gdGhpcy5jb21tb25TZXJ2aWNlLklzQWNjZXNzKHRoaXMucm9sZSwgcm9sZSk7XHJcbiAgICAgICAgcmV0dXJuIF9yZXR1cm47XHJcbiAgICAgfVxyXG5cclxuICAgICBnZXRXZWJWaWV3SGVpZ2h0KCk6YW55e1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSB0aGlzLndlYlZpZXdUZW1wLmdldE1lYXN1cmVkSGVpZ2h0KCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ3ZWJ2aWV3IGhlaWdodCBcIiArIGhlaWdodCk7XHJcbiAgICAgICAgcmV0dXJuIGhlaWdodDtcclxuICAgICB9XHJcblxyXG4gICAgbG9hZEZlZWRJbmZvKCkge1xyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZlZWRJZCA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zWydpZCddO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmVlZF9JZCAtLT4gXCIgKyB0aGlzLmZlZWRJZCApO1xyXG4gICAgICAgIHRoaXMuYnVzeSA9IHRoaXMuZmVlZFNlcnZpY2UuZ2V0ZmVlZERldGFpbCh0aGlzLmZlZWRJZClcclxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXRGZWVkRGV0YWlsIC0tPiBcIiArIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmVlZEluZm9EZXRhaWwgPSByZXMucmVzdWx0WzBdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRIZWlnaHQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBcIjxzdHlsZT5ib2R5IHtiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO2ZvbnQtc2l6ZToxNHB4OyBjb2xvcjojMDAwMDAwO2ZvbnQtZmFtaWx5OiAnUm9ib3RvJzt9IGltZ3tkaXNwbGF5OiBpbmxpbmU7aGVpZ2h0OiBhdXRvO21heC13aWR0aDogMTAwJTt9PC9zdHlsZT5cIiArIHRoaXMuZmVlZEluZm9EZXRhaWwuRGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc1VwZGF0ZUZlZWREZXRhaWwgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jYWxsZXJDbGFzcyA9PSBcIk15RmVlZHNDb21wb25lbnRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE15RmVlZHNDb21wb25lbnQuZ2V0TXlGZWVkc09iamVjdCgpLnVwZGF0ZU15RmVlZHNVSSh0aGlzLmZlZWRJbmZvRGV0YWlsLFwidXBkYXRlXCIsdGhpcy5zZWxlY3RlZFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmNhbGxlckNsYXNzID09IFwiTXlGZWVkU2VhcmNoQ29tcG9uZW50XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNeUZlZWRTZWFyY2hDb21wb25lbnQuZ2V0TXlGZWVkc1NlYXJjaE9iamVjdCgpLnVwZGF0ZU15RmVlZHNVSSh0aGlzLmZlZWRJbmZvRGV0YWlsLFwidXBkYXRlXCIsdGhpcy5zZWxlY3RlZFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmNhbGxlckNsYXNzID09IFwiTXlGZWVkRmlsdGVyUmVzdWx0Q29tcG9uZW50XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNeUZlZWRGaWx0ZXJSZXN1bHRDb21wb25lbnQuZ2V0TXlGZWVkc0ZpbHRlclJlc3VsdE9iamVjdCgpLnVwZGF0ZU15RmVlZHNVSSh0aGlzLmZlZWRJbmZvRGV0YWlsLFwidXBkYXRlXCIsdGhpcy5zZWxlY3RlZFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sZXJyb3IgPT4ge2FsZXJ0KFwiQ2FuJ3QgY29ubmVjdCB0byBzZXJ2ZXIhXCIpfSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldEhlaWdodCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2l6ZSBvZiBsaXN0ID09PT4gXCIgKyB0aGlzLmZlZWRJbmZvRGV0YWlsLk1DX0ZlZWRfRmlsZXMubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLnJhZExpc3RWaWV3SGVpZ2h0ID0gdGhpcy5mZWVkSW5mb0RldGFpbC5NQ19GZWVkX0ZpbGVzLmxlbmd0aCA+IDIgPyAoKHRoaXMuZmVlZEluZm9EZXRhaWwuTUNfRmVlZF9GaWxlcy5sZW5ndGggJSAyKSArICh0aGlzLmZlZWRJbmZvRGV0YWlsLk1DX0ZlZWRfRmlsZXMubGVuZ3RoIC8gMikpICogMTUwIDogMTUwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibGlzdCBoZWlnaHQgLT4gXCIgKyB0aGlzLnJhZExpc3RWaWV3SGVpZ2h0KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5yYWRMaXN0Vmlld0hlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBvbk5hdkJ0blRhcCgpe1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVkaXRGZWVkKCl7ICAgXHJcbiAgICAgICAgbGV0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBcIkZlZWRcIiA6IEpTT04uc3RyaW5naWZ5KHRoaXMuZmVlZEluZm9EZXRhaWwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbXlmZWVkL2VkaXRcIl0sbmF2aWdhdGlvbkV4dHJhcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlRmVlZFN0YXR1cyhmZWVkSWQ6IGFueSwgc3RhdHVzOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImZlZWRJZCAtIFwiICsgZmVlZElkICsgXCIgLyBzdGF0dXMgXCIgKyBzdGF0dXMpO1xyXG5cclxuICAgICAgICBkaWFsb2dzLmNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byAnICsgc3RhdHVzICsgJz8nKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXR1cm4gc3RhdHVzIFwiICsgcmVzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybVJlc3VsdCA9IHJlcztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpcm1SZXN1bHQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpcm1SZXN1bHQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnTG9hZGluZy4uLicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiAwLjY1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmRyb2lkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc051bWJlckZvcm1hdDogXCIlMWQvJTJkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NQZXJjZW50Rm9ybWF0OiAwLjUzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzU3R5bGU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5UHJvZ3Jlc3M6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsb2FkZXIuc2hvdyhvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmVlZFNlcnZpY2UuY2hhbmdlRmVlZFN0YXR1cyhmZWVkSWQsIHN0YXR1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShyZXMxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNoYW5nZUZlZWRTdGF0dXMgLS0+IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5hdkJ0blRhcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzMS5yZXNwb25zZS5jb2RlID09IFwiMjAwXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmNhbGxlckNsYXNzID09IFwiTXlGZWVkc0NvbXBvbmVudFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE15RmVlZHNDb21wb25lbnQuZ2V0TXlGZWVkc09iamVjdCgpLnVwZGF0ZU15RmVlZHNVSShudWxsLHN0YXR1cyx0aGlzLnNlbGVjdGVkUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmNhbGxlckNsYXNzID09IFwiTXlGZWVkU2VhcmNoQ29tcG9uZW50XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTXlGZWVkU2VhcmNoQ29tcG9uZW50LmdldE15RmVlZHNTZWFyY2hPYmplY3QoKS51cGRhdGVNeUZlZWRzVUkobnVsbCxzdGF0dXMsdGhpcy5zZWxlY3RlZFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5jYWxsZXJDbGFzcyA9PSBcIk15RmVlZEZpbHRlclJlc3VsdENvbXBvbmVudFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE15RmVlZEZpbHRlclJlc3VsdENvbXBvbmVudC5nZXRNeUZlZWRzRmlsdGVyUmVzdWx0T2JqZWN0KCkudXBkYXRlTXlGZWVkc1VJKG51bGwsc3RhdHVzLHRoaXMuc2VsZWN0ZWRQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LDUwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hbGVydCgnRmVlZCBJbmZvcm1hdGlvbiBoYXMgYmVlbicgKyAnICcgKyBzdGF0dXMgKyAnICcgKyAnc3VjY2Vzc2Z1bGx5LicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ldmVudCByYWlzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbXlmZWVkJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzMS5yZXNwb25zZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbXlmZWVkJ10pICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbG9hZGVyLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdGZWVkIEluZm9ybWF0aW9uJyArICcgaGFzIG5vdCBiZWVuICcgKyBzdGF0dXMgKyAnICcgKyAnc3VjY2Vzc2Z1bGx5LiBQbGVhc2UgdHJ5IGFnYWluLicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB1cGRhdGVGZWVkRGV0YWlsVUkoZmVlZDogRmVlZEluZm9ybWF0aW9uKXtcclxuICAgICAgIC8vIGFsZXJ0KFwidXBkYXRlIG15IGZlZWRMSXN0XCIpO1xyXG4gICAgICAgLy8gY29uc29sZS5sb2coXCJmZWVkIFwiICsgSlNPTi5zdHJpbmdpZnkoZmVlZCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGZlZWQgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuaXNVcGRhdGVGZWVkRGV0YWlsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5uZ09uSW5pdCgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLmZlZWRJbmZvRGV0YWlsID0gbmV3IEZlZWRJbmZvcm1hdGlvbigpO1xyXG4gICAgICAgIC8vdGhpcy5mZWVkSW5mb0RldGFpbCA9IGZlZWQ7XHJcbiAgICAgICAgLy90aGlzLm5nT25Jbml0KCk7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0TXlGZWVkRGV0YWlsT2JqZWN0KCl7XHJcbiAgICAgICAgcmV0dXJuIE15RmVlZERldGFpbENvbXBvbmVudC5teUZlZWREZXRhaWxDb21wb25lbnQ7XHJcbiAgICB9XHJcbn1cclxuIl19