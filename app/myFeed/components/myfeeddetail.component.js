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
        this.role = JSON.parse(this.globalStorageService.getPermission('1'));
        this.checkPermission();
        this.loadFeedInfo();
        //this.getHeight();
    };
    MyFeedDetailComponent.prototype.checkPermission = function () {
        this.EDIT_FEED = this.IsAccess('EDIT_FEED');
    };
    MyFeedDetailComponent.prototype.IsAccess = function (role) {
        // alert(this.commonService.IsAccess(this.role,role));
        var _return = this.commonService.IsAccess(this.role, role);
        return _return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlmZWVkZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15ZmVlZGRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0U7QUFDeEUsMENBQXlFO0FBQ3pFLHNEQUE2RDtBQU03RCw2REFBMkQ7QUFFM0Qsb0VBQWtFO0FBQ2xFLGtGQUFnRjtBQUNoRixvQ0FBc0M7QUFDdEMsK0VBQTJFO0FBQzNFLHlGQUFxRjtBQUNyRixxR0FBaUc7QUFDakcsb0VBQW9FO0FBQ3BFLGlGQUFrRTtBQUVsRSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFRN0I7SUFrQkksK0JBQW9CLE1BQWMsRUFBUyxLQUFxQixFQUFTLGdCQUFrQyxFQUFTLFdBQXlCLEVBQ3JJLGFBQTJCLEVBQVMsb0JBQXlDO1FBRHJGLGlCQVlDO1FBWm1CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQUNySSxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUFTLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFkckYsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUkzQix1QkFBa0IsR0FBVyxLQUFLLENBQUM7UUFZL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUNuQyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbkQsS0FBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDekMsa0RBQWtEO1lBQ2xELGlEQUFpRDtZQUNsRCwyQ0FBMkM7WUFDMUMscUNBQXFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsdUJBQXFCLENBQUMscUJB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RUFBRSxDQUFBLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDYixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1lBQy9CLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVwQixDQUFDO1FBQ0QsOENBQThDO1FBQzlDLDZCQUE2QjtRQUM3QixrQkFBa0I7SUFFdEIsQ0FBQztJQUVNLDJDQUFxQixHQUE1QjtRQUNJLE1BQU0sQ0FBQyx1QkFBcUIsQ0FBQyxxQkFBcUIsQ0FBQztJQUN2RCxDQUFDO0lBM0p1QjtRQUF2QixnQkFBUyxDQUFDLFdBQVcsQ0FBQztrQ0FBWSxpQkFBVTs0REFBQztJQWpCckMscUJBQXFCO1FBTmpDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixXQUFXLEVBQUUsbUJBQW1CO1NBQ25DLENBQUM7eUNBb0I4QixlQUFNLEVBQWdCLHVCQUFjLEVBQTJCLHlCQUFnQixFQUFxQiw4QkFBYTtZQUN2SCw4QkFBYSxFQUE4Qiw0Q0FBb0I7T0FuQjVFLHFCQUFxQixDQTZLakM7SUFBRCw0QkFBQzs7Q0FBQSxBQTdLRCxJQTZLQztBQTdLWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgT25Jbml0LEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSxOYXZpZ2F0aW9uRXh0cmFzfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmwsIFNhZmVVcmwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgRmVlZEluZm9ybWF0aW9uLCBGZWVkVHlwZSwgRmVlZENhdGVnb3J5LCBGZWVkRmlsdGVyLCBSb2xlIH0gZnJvbSAnLi4vbW9kZWwvbXlmZWVkLm1vZGVsJztcclxuaW1wb3J0IHsgTXlGZWVkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL215ZmVlZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbW1vblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMvY29tbW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHbG9iYWxTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zdG9yZS9nbG9iYWxzdG9yYWdlLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7TXlGZWVkc0NvbXBvbmVudH0gZnJvbSBcIi4uLy4uL215RmVlZC9jb21wb25lbnRzL215ZmVlZHMuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7TXlGZWVkU2VhcmNoQ29tcG9uZW50fSBmcm9tIFwiLi4vLi4vbXlGZWVkL2NvbXBvbmVudHMvbXlmZWVkc2VhcmNoLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQge015RmVlZEZpbHRlclJlc3VsdENvbXBvbmVudH0gZnJvbSBcIi4uLy4uL215RmVlZC9jb21wb25lbnRzL215ZmVlZGZpbHRlcnJlc3VsdC5jb21wb25lbnRcIjtcclxuLy9pbXBvcnQgeyBEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL2RpYWxvZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTG9hZGluZ0luZGljYXRvciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcclxuXHJcbnZhciB0aW1lciA9IHJlcXVpcmUoXCJ0aW1lclwiKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiAnYXBwLW15ZmVlZGRldGFpbCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ215ZmVlZGRldGFpbC5odG1sJ1xyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE15RmVlZERldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgYnVzeTogU3Vic2NyaXB0aW9uO1xyXG4gICAgZmVlZElkOiBhbnk7XHJcbiAgICBmZWVkSW5mb0RldGFpbDogRmVlZEluZm9ybWF0aW9uO1xyXG4gICAgaXNMb2FkaW5nOiBCb29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIHJhZExpc3RWaWV3SGVpZ2h0Om51bWJlcjtcclxuICAgIHN0YXRpYyBteUZlZWREZXRhaWxDb21wb25lbnQ6TXlGZWVkRGV0YWlsQ29tcG9uZW50O1xyXG4gICAgaXNVcGRhdGVGZWVkRGV0YWlsOkJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNlbGVjdGVkUG9zaXRpb246bnVtYmVyO1xyXG4gICAgcm9sZTpSb2xlW107XHJcbiAgICBjb25maXJtUmVzdWx0OiBib29sZWFuO1xyXG4gICAgY2FsbGVyQ2xhc3M6c3RyaW5nO1xyXG5cclxuICAgIEVESVRfRkVFRDpCb29sZWFuO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoXCJjb250YWluZXJcIikgY29udGFpbmVyOiBFbGVtZW50UmVmO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMscHJpdmF0ZSBmZWVkU2VydmljZTpNeUZlZWRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21tb25TZXJ2aWNlOkNvbW1vblNlcnZpY2UscHJpdmF0ZSBnbG9iYWxTdG9yYWdlU2VydmljZTpHbG9iYWxTdG9yYWdlU2VydmljZSl7IFxyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBvc2l0aW9uID0gcGFyYW1zWydTZWxlY3RlZFBvc2l0aW9uJ107XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGVyQ2xhc3MgPSBwYXJhbXNbJ0NhbGxlckNsYXNzJ107XHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCJzZWxlY3RlZCBpbmRleCBcIiArIHRoaXMuc2VsZWN0ZWRQb3NpdGlvbilcclxuICAgICAgICAgICAgLy92YXIgbXlGZWVkIDogRmVlZCA9IEpTT04ucGFyc2UocGFyYW1zW1wiRmVlZFwiXSk7XHJcbiAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJGZWVkX0lkIFwiICsgcGFyYW1zWydpZCddICk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5nZXRGZWVkRGV0YWlsKG15RmVlZC5GZWVkX0lkKTtcclxuICAgICAgICB9KTsgIFxyXG4gICAgICAgIE15RmVlZERldGFpbENvbXBvbmVudC5teUZlZWREZXRhaWxDb21wb25lbnQgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCl7XHJcbiAgICAgICAgdGhpcy5yb2xlID0gSlNPTi5wYXJzZSh0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldFBlcm1pc3Npb24oJzEnKSk7XHJcbiAgICAgICAgdGhpcy5jaGVja1Blcm1pc3Npb24oKTtcclxuICAgICAgICB0aGlzLmxvYWRGZWVkSW5mbygpO1xyXG4gICAgICAgIC8vdGhpcy5nZXRIZWlnaHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja1Blcm1pc3Npb24oKXtcclxuICAgICAgICB0aGlzLkVESVRfRkVFRCA9IHRoaXMuSXNBY2Nlc3MoJ0VESVRfRkVFRCcpO1xyXG4gICAgfVxyXG5cclxuICAgIElzQWNjZXNzKHJvbGU6IHN0cmluZykge1xyXG4gICAgICAgIC8vIGFsZXJ0KHRoaXMuY29tbW9uU2VydmljZS5Jc0FjY2Vzcyh0aGlzLnJvbGUscm9sZSkpO1xyXG4gICAgICAgIGxldCBfcmV0dXJuID0gdGhpcy5jb21tb25TZXJ2aWNlLklzQWNjZXNzKHRoaXMucm9sZSwgcm9sZSk7XHJcbiAgICAgICAgcmV0dXJuIF9yZXR1cm47XHJcbiAgICAgfVxyXG5cclxuICAgIGxvYWRGZWVkSW5mbygpIHtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mZWVkSWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1snaWQnXTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkZlZWRfSWQgLS0+IFwiICsgdGhpcy5mZWVkSWQgKTtcclxuICAgICAgICB0aGlzLmJ1c3kgPSB0aGlzLmZlZWRTZXJ2aWNlLmdldGZlZWREZXRhaWwodGhpcy5mZWVkSWQpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0RmVlZERldGFpbCAtLT4gXCIgKyBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZlZWRJbmZvRGV0YWlsID0gcmVzLnJlc3VsdFswXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCI8c3R5bGU+Ym9keSB7YmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtmb250LXNpemU6MTRweDsgY29sb3I6IzAwMDAwMDtmb250LWZhbWlseTogJ1JvYm90byc7fSBpbWd7ZGlzcGxheTogaW5saW5lO2hlaWdodDogYXV0bzttYXgtd2lkdGg6IDEwMCU7fTwvc3R5bGU+XCIgKyB0aGlzLmZlZWRJbmZvRGV0YWlsLkRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNVcGRhdGVGZWVkRGV0YWlsID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2FsbGVyQ2xhc3MgPT0gXCJNeUZlZWRzQ29tcG9uZW50XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNeUZlZWRzQ29tcG9uZW50LmdldE15RmVlZHNPYmplY3QoKS51cGRhdGVNeUZlZWRzVUkodGhpcy5mZWVkSW5mb0RldGFpbCxcInVwZGF0ZVwiLHRoaXMuc2VsZWN0ZWRQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5jYWxsZXJDbGFzcyA9PSBcIk15RmVlZFNlYXJjaENvbXBvbmVudFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTXlGZWVkU2VhcmNoQ29tcG9uZW50LmdldE15RmVlZHNTZWFyY2hPYmplY3QoKS51cGRhdGVNeUZlZWRzVUkodGhpcy5mZWVkSW5mb0RldGFpbCxcInVwZGF0ZVwiLHRoaXMuc2VsZWN0ZWRQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5jYWxsZXJDbGFzcyA9PSBcIk15RmVlZEZpbHRlclJlc3VsdENvbXBvbmVudFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTXlGZWVkRmlsdGVyUmVzdWx0Q29tcG9uZW50LmdldE15RmVlZHNGaWx0ZXJSZXN1bHRPYmplY3QoKS51cGRhdGVNeUZlZWRzVUkodGhpcy5mZWVkSW5mb0RldGFpbCxcInVwZGF0ZVwiLHRoaXMuc2VsZWN0ZWRQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LGVycm9yID0+IHthbGVydChcIkNhbid0IGNvbm5lY3QgdG8gc2VydmVyIVwiKX0pOyBcclxuICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVpZ2h0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzaXplIG9mIGxpc3QgPT09PiBcIiArIHRoaXMuZmVlZEluZm9EZXRhaWwuTUNfRmVlZF9GaWxlcy5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMucmFkTGlzdFZpZXdIZWlnaHQgPSB0aGlzLmZlZWRJbmZvRGV0YWlsLk1DX0ZlZWRfRmlsZXMubGVuZ3RoID4gMiA/ICgodGhpcy5mZWVkSW5mb0RldGFpbC5NQ19GZWVkX0ZpbGVzLmxlbmd0aCAlIDIpICsgKHRoaXMuZmVlZEluZm9EZXRhaWwuTUNfRmVlZF9GaWxlcy5sZW5ndGggLyAyKSkgKiAxNTAgOiAxNTA7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJsaXN0IGhlaWdodCAtPiBcIiArIHRoaXMucmFkTGlzdFZpZXdIZWlnaHQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJhZExpc3RWaWV3SGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIG9uTmF2QnRuVGFwKCl7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRWRpdEZlZWQoKXsgICBcclxuICAgICAgICBsZXQgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcclxuICAgICAgICAgICAgcXVlcnlQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIFwiRmVlZFwiIDogSlNPTi5zdHJpbmdpZnkodGhpcy5mZWVkSW5mb0RldGFpbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9teWZlZWQvZWRpdFwiXSxuYXZpZ2F0aW9uRXh0cmFzKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VGZWVkU3RhdHVzKGZlZWRJZDogYW55LCBzdGF0dXM6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmVlZElkIC0gXCIgKyBmZWVkSWQgKyBcIiAvIHN0YXR1cyBcIiArIHN0YXR1cyk7XHJcblxyXG4gICAgICAgIGRpYWxvZ3MuY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvICcgKyBzdGF0dXMgKyAnPycpXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJldHVybiBzdGF0dXMgXCIgKyByZXMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maXJtUmVzdWx0ID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlybVJlc3VsdCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlybVJlc3VsdCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdMb2FkaW5nLi4uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IDAuNjUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuZHJvaWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRldGVybWluYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1heDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzTnVtYmVyRm9ybWF0OiBcIiUxZC8lMmRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc1BlcmNlbnRGb3JtYXQ6IDAuNTMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NTdHlsZTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlQcm9ncmVzczogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRlci5zaG93KG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mZWVkU2VydmljZS5jaGFuZ2VGZWVkU3RhdHVzKGZlZWRJZCwgc3RhdHVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHJlczEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hhbmdlRmVlZFN0YXR1cyAtLT4gXCIgKyBKU09OLnN0cmluZ2lmeShyZXMxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTmF2QnRuVGFwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXMxLnJlc3BvbnNlLmNvZGUgPT0gXCIyMDBcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2FsbGVyQ2xhc3MgPT0gXCJNeUZlZWRzQ29tcG9uZW50XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTXlGZWVkc0NvbXBvbmVudC5nZXRNeUZlZWRzT2JqZWN0KCkudXBkYXRlTXlGZWVkc1VJKG51bGwsc3RhdHVzLHRoaXMuc2VsZWN0ZWRQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuY2FsbGVyQ2xhc3MgPT0gXCJNeUZlZWRTZWFyY2hDb21wb25lbnRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNeUZlZWRTZWFyY2hDb21wb25lbnQuZ2V0TXlGZWVkc1NlYXJjaE9iamVjdCgpLnVwZGF0ZU15RmVlZHNVSShudWxsLHN0YXR1cyx0aGlzLnNlbGVjdGVkUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmNhbGxlckNsYXNzID09IFwiTXlGZWVkRmlsdGVyUmVzdWx0Q29tcG9uZW50XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTXlGZWVkRmlsdGVyUmVzdWx0Q29tcG9uZW50LmdldE15RmVlZHNGaWx0ZXJSZXN1bHRPYmplY3QoKS51cGRhdGVNeUZlZWRzVUkobnVsbCxzdGF0dXMsdGhpcy5zZWxlY3RlZFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2FsZXJ0KCdGZWVkIEluZm9ybWF0aW9uIGhhcyBiZWVuJyArICcgJyArIHN0YXR1cyArICcgJyArICdzdWNjZXNzZnVsbHkuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2V2ZW50IHJhaXNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9teWZlZWQnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChyZXMxLnJlc3BvbnNlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9teWZlZWQnXSkgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sb2FkZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0ZlZWQgSW5mb3JtYXRpb24nICsgJyBoYXMgbm90IGJlZW4gJyArIHN0YXR1cyArICcgJyArICdzdWNjZXNzZnVsbHkuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHVwZGF0ZUZlZWREZXRhaWxVSShmZWVkOiBGZWVkSW5mb3JtYXRpb24pe1xyXG4gICAgICAgLy8gYWxlcnQoXCJ1cGRhdGUgbXkgZmVlZExJc3RcIik7XHJcbiAgICAgICAvLyBjb25zb2xlLmxvZyhcImZlZWQgXCIgKyBKU09OLnN0cmluZ2lmeShmZWVkKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoZmVlZCAhPSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5pc1VwZGF0ZUZlZWREZXRhaWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5nT25Jbml0KCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMuZmVlZEluZm9EZXRhaWwgPSBuZXcgRmVlZEluZm9ybWF0aW9uKCk7XHJcbiAgICAgICAgLy90aGlzLmZlZWRJbmZvRGV0YWlsID0gZmVlZDtcclxuICAgICAgICAvL3RoaXMubmdPbkluaXQoKTtcclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRNeUZlZWREZXRhaWxPYmplY3QoKXtcclxuICAgICAgICByZXR1cm4gTXlGZWVkRGV0YWlsQ29tcG9uZW50Lm15RmVlZERldGFpbENvbXBvbmVudDtcclxuICAgIH1cclxufVxyXG4iXX0=