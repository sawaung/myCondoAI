"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var myfeed_model_1 = require("../model/myfeed.model");
var myfeed_service_1 = require("../services/myfeed.service");
require("nativescript-localstorage");
var globalstorage_service_1 = require("../../shared/store/globalstorage.service");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var Timer = require("tns-core-modules/timer");
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var MyFeedFilterResultComponent = /** @class */ (function () {
    function MyFeedFilterResultComponent(router, route, routerExtensions, feedService, globalStorageService) {
        this.router = router;
        this.route = route;
        this.routerExtensions = routerExtensions;
        this.feedService = feedService;
        this.globalStorageService = globalStorageService;
        this.isLoading = false;
        this.feedFilterInfo = new myfeed_model_1.FeedFilter();
        this.newsFeedList = new observable_array_1.ObservableArray();
        MyFeedFilterResultComponent_1.myFeedFilterResultComponent = this;
    }
    MyFeedFilterResultComponent_1 = MyFeedFilterResultComponent;
    MyFeedFilterResultComponent.prototype.ngOnInit = function () {
        this.initialize();
        this.loadFeedList();
    };
    MyFeedFilterResultComponent.prototype.ngAfterViewInit = function () {
        this.radListView = this.radListViewRef.nativeElement;
    };
    MyFeedFilterResultComponent.prototype.onNavBtnTap = function () {
        this.routerExtensions.backToPreviousPage();
    };
    MyFeedFilterResultComponent.prototype.initialize = function () {
        this.feedFilterInfo.Feed_Category_Id = null;
        this.feedFilterInfo.FeedType_Id = null;
        this.feedFilterInfo.Title = null;
        this.feedFilterInfo.SearchKeyword = this.searchKeyword;
        this.feedFilterInfo.Posted_Date_From = null;
        this.feedFilterInfo.Posted_Date_To = null;
        this.feedFilterInfo.Created_From = null;
        this.feedFilterInfo.Created_To = null;
        this.feedFilterInfo.Cursor_Index = null;
        this.feedFilterInfo.Get_Next = false;
        this.feedFilterInfo.Page_Size = 10;
        this.feedFilterInfo.Post_Status = true;
        this.feedFilterInfo.UnPost_Status = false;
        this.feedFilterInfo.isBlocked = false;
    };
    MyFeedFilterResultComponent.prototype.loadFeedList = function () {
        var _this = this;
        this.busy = this.feedService.getNewsfeedlist(this.feedFilterInfo.Feed_Category_Id, this.feedFilterInfo.FeedType_Id, this.feedFilterInfo.Title, this.feedFilterInfo.SearchKeyword, this.feedFilterInfo.Posted_Date_From, this.feedFilterInfo.Posted_Date_To, this.feedFilterInfo.Created_From, this.feedFilterInfo.Created_To, this.feedFilterInfo.Cursor_Index, this.feedFilterInfo.Get_Next, this.feedFilterInfo.Page_Size, this.feedFilterInfo.Post_Status, this.feedFilterInfo.UnPost_Status, this.feedFilterInfo.isBlocked)
            .subscribe(function (res) {
            _this.isLoading = false;
            var feedList = Array();
            res.result.forEach(function (feed) {
                feedList.push(feed);
            });
            _this.newsFeedList.push(feedList);
            console.log("loadFeedList --> " + JSON.stringify(res));
        });
    };
    MyFeedFilterResultComponent.prototype.onLoadMoreItemsRequested = function (args) {
        var that = new WeakRef(this);
        var listView = args.object;
        var arrLength = that.get().newsFeedList.length;
        Timer.setTimeout(function () {
            that.get().loadMoreFeeds();
            listView.notifyLoadOnDemandFinished();
        }, 1000);
        //}
        args.returnValue = true;
    };
    MyFeedFilterResultComponent.prototype.onItemTap = function (args) {
        var selectedIndex = args.index;
        var feed = this.newsFeedList.getItem(selectedIndex);
        var navigationExtras = {
            queryParams: {
                "CallerClass": "MyFeedSearchComponent",
                "SelectedPosition": selectedIndex,
            }
        };
        this.router.navigate(["/myfeed/" + feed.Feed_Id + "/view"], navigationExtras); //route to feed_detail(1)
    };
    MyFeedFilterResultComponent.prototype.loadMoreFeeds = function () {
        if (this.newsFeedList.length > 0) {
            this.feedFilterInfo.Cursor_Index = this.newsFeedList.getItem(this.newsFeedList.length - 1).Feed_Id;
            this.feedFilterInfo.Get_Next = false;
        }
        this.loadFeedList();
    };
    MyFeedFilterResultComponent.prototype.getInnerHtml = function (desc) {
        var dot = '';
        var rtn = desc.replace(/<\/?[^>]+>/ig, " ");
        rtn = rtn.replace("\n", "");
        rtn = rtn.replace("&nbsp;", "");
        if (rtn.length > 100) {
            dot = '.....';
        }
        rtn = rtn.substring(0, 100);
        if (rtn.length > 0) {
            return rtn + dot;
        }
        else {
            return '';
        }
    };
    MyFeedFilterResultComponent.prototype.updateMyFeedsUI = function (feed, isFeedUpdateOrCreate, position) {
        var _this = this;
        console.log("feed " + JSON.stringify(feed));
        console.log("update my feedList " + isFeedUpdateOrCreate + " position " + position);
        if (isFeedUpdateOrCreate == "new") {
            this.newsFeedList.unshift(feed);
            this.radListView.refresh();
            //alert("Feed successfully created!");
        }
        else if (isFeedUpdateOrCreate == "update") {
            //this.newsFeedList.splice(position, 1);// 1, 1
            //this.newsFeedList.splice(position,0,feed);//1,feed
            //this.newsFeedList.notify;
            this.newsFeedList.getItem(position).Feed_Category_Id = feed.Feed_Category_Id;
            this.newsFeedList.getItem(position).Feed_Category_Name = feed.Feed_Category_Name;
            this.newsFeedList.getItem(position).FeedType_Id = feed.FeedType_Id;
            this.newsFeedList.getItem(position).Feed_Type_Name = feed.Feed_Type_Name;
            this.newsFeedList.getItem(position).Title = feed.Title;
            this.newsFeedList.getItem(position).Description = feed.Description;
            this.newsFeedList.getItem(position).Posted_Date = feed.Posted_Date;
            this.newsFeedList.getItem(position).Post_Status = feed.Post_Status;
            this.newsFeedList.getItem(position).Last_Updated_By = feed.Last_Updated_By;
            this.newsFeedList.getItem(position).Last_Updated_On = feed.Last_Updated_On;
            this.newsFeedList.getItem(position).status = feed.status;
            this.newsFeedList.getItem(position).MC_Feed_Files = feed.MC_Feed_Files;
            //alert("Feed successfully updated!");
        }
        else if (isFeedUpdateOrCreate == "UNPOST" || isFeedUpdateOrCreate == "ARCHIVE") {
            try {
                console.log("unpost myFeeds");
                setTimeout(function () {
                    var i = _this.newsFeedList.indexOf(_this.newsFeedList.getItem(position));
                    _this.newsFeedList.splice(i, 1);
                    //alert("Feed successfully unposted!");                     
                    console.log("remove " + position);
                }, 2000);
            }
            catch (e) {
                console.log(e);
            }
        }
        else if (isFeedUpdateOrCreate == "NOTIFY") {
            alert("Feeds successfully notified!");
        }
    };
    MyFeedFilterResultComponent.getMyFeedsSearchObject = function () {
        return MyFeedFilterResultComponent_1.myFeedFilterResultComponent;
    };
    __decorate([
        core_1.ViewChild("radListView"),
        __metadata("design:type", core_1.ElementRef)
    ], MyFeedFilterResultComponent.prototype, "radListViewRef", void 0);
    MyFeedFilterResultComponent = MyFeedFilterResultComponent_1 = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-myfeedfilter-result',
            templateUrl: 'myfeedfilter-result.html',
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, router_2.RouterExtensions, myfeed_service_1.MyFeedService, globalstorage_service_1.GlobalStorageService])
    ], MyFeedFilterResultComponent);
    return MyFeedFilterResultComponent;
    var MyFeedFilterResultComponent_1;
}());
exports.MyFeedFilterResultComponent = MyFeedFilterResultComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlmZWVkZmlsdGVyLXJlc3VsdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteWZlZWRmaWx0ZXItcmVzdWx0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3RTtBQUN4RSwwQ0FBeUU7QUFDekUsc0RBQTZEO0FBRTdELHNEQUFrRztBQUNsRyw2REFBMkQ7QUFVM0QsT0FBTyxDQUFFLDJCQUEyQixDQUFFLENBQUM7QUFDdkMsa0ZBQStFO0FBQy9FLDJFQUF5RTtBQUt6RSw4Q0FBZ0Q7QUFDaEQsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztBQVdsRjtJQWNJLHFDQUFvQixNQUFjLEVBQVMsS0FBcUIsRUFBUyxnQkFBa0MsRUFBUyxXQUF5QixFQUFVLG9CQUF5QztRQUE1SyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWM7UUFBVSx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBWGhNLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFJM0IsbUJBQWMsR0FBZSxJQUFJLHlCQUFVLEVBQUUsQ0FBQztRQVExQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUssa0NBQWUsRUFBbUIsQ0FBQztRQUM1RCw2QkFBMkIsQ0FBQywyQkFBMkIsR0FBRyxJQUFJLENBQUM7SUFDbkUsQ0FBQztvQ0FqQlEsMkJBQTJCO0lBbUJwQyw4Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBR0QscURBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQWdCLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDO0lBRXRFLENBQUM7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QUVNLGtEQUFzQixHQUE3QjtRQUNJLE1BQU0sQ0FBQyw2QkFBMkIsQ0FBQywyQkFBMkIsQ0FBQztJQUNuRSxDQUFDO0lBekt5QjtRQUF6QixnQkFBUyxDQUFDLGFBQWEsQ0FBQztrQ0FBaUIsaUJBQVU7dUVBQUM7SUFiNUMsMkJBQTJCO1FBUHZDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxXQUFXLEVBQUUsMEJBQTBCO1NBRTFDLENBQUM7eUNBZ0I4QixlQUFNLEVBQWdCLHVCQUFjLEVBQTJCLHlCQUFnQixFQUFxQiw4QkFBYSxFQUErQiw0Q0FBb0I7T0FkdkwsMkJBQTJCLENBdUx2QztJQUFELGtDQUFDOztDQUFBLEFBdkxELElBdUxDO0FBdkxZLGtFQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBPbkluaXQsRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSxOYXZpZ2F0aW9uRXh0cmFzfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZlZWRJbmZvcm1hdGlvbiwgRmVlZFR5cGUsIEZlZWRDYXRlZ29yeSwgRmVlZEZpbHRlciwgUm9sZSB9IGZyb20gJy4uL21vZGVsL215ZmVlZC5tb2RlbCc7XG5pbXBvcnQgeyBNeUZlZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbXlmZWVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tbW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy9jb21tb24uc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL2NvbmZpZy5zZXJ2aWNlJztcblxuaW1wb3J0IHsgVmFsdWVMaXN0IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcbmltcG9ydCB7IERyb3BEb3duIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd24vZHJvcC1kb3duXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcbmltcG9ydCB7IERyb3BEb3duVmFsdWVQYWlyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xucmVxdWlyZSggXCJuYXRpdmVzY3JpcHQtbG9jYWxzdG9yYWdlXCIgKTtcbmltcG9ydCB7IEdsb2JhbFN0b3JhZ2VTZXJ2aWNlfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RvcmUvZ2xvYmFsc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcbmltcG9ydCB7IGlzSU9TfSBmcm9tIFwicGxhdGZvcm1cIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCB7UmFkTGlzdFZpZXcsTGlzdFZpZXdMaW5lYXJMYXlvdXQsIExpc3RWaWV3RXZlbnREYXRhLCBMaXN0Vmlld0xvYWRPbkRlbWFuZE1vZGV9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL2xpc3R2aWV3XCI7XG5pbXBvcnQgKiBhcyBUaW1lciBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy90aW1lclwiO1xudmFyIExvYWRpbmdJbmRpY2F0b3IgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCIpLkxvYWRpbmdJbmRpY2F0b3I7XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnYXBwLW15ZmVlZGZpbHRlci1yZXN1bHQnLFxuICAgIHRlbXBsYXRlVXJsOiAnbXlmZWVkZmlsdGVyLXJlc3VsdC5odG1sJyxcbiAgICAvL3N0eWxlVXJsczogWycuL215ZmVlZHNlYXJjaC5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBNeUZlZWRGaWx0ZXJSZXN1bHRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgYnVzeTogU3Vic2NyaXB0aW9uO1xuICAgIGlzTG9hZGluZzogQm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgc2VhcmNoS2V5d29yZDpzdHJpbmc7XG4gICAgbmV3c0ZlZWRMaXN0OiBPYnNlcnZhYmxlQXJyYXk8RmVlZEluZm9ybWF0aW9uPjtcbiAgICBmZWVkRmlsdGVySW5mbzogRmVlZEZpbHRlciA9IG5ldyBGZWVkRmlsdGVyKCk7XG5cbiAgICByYWRMaXN0VmlldzpSYWRMaXN0VmlldztcbiAgICBzdGF0aWMgbXlGZWVkRmlsdGVyUmVzdWx0Q29tcG9uZW50Ok15RmVlZEZpbHRlclJlc3VsdENvbXBvbmVudDtcblxuICAgIC8vQFZpZXdDaGlsZChcInBhZ2VcIikgcGFnZVJlZjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwicmFkTGlzdFZpZXdcIikgcmFkTGlzdFZpZXdSZWY6IEVsZW1lbnRSZWY7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMscHJpdmF0ZSBmZWVkU2VydmljZTpNeUZlZWRTZXJ2aWNlLCBwcml2YXRlIGdsb2JhbFN0b3JhZ2VTZXJ2aWNlOkdsb2JhbFN0b3JhZ2VTZXJ2aWNlKXsgXG4gICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0ID0gbmV3ICBPYnNlcnZhYmxlQXJyYXk8RmVlZEluZm9ybWF0aW9uPigpO1xuICAgICAgICBNeUZlZWRGaWx0ZXJSZXN1bHRDb21wb25lbnQubXlGZWVkRmlsdGVyUmVzdWx0Q29tcG9uZW50ID0gdGhpcztcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpe1xuICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICAgICAgdGhpcy5sb2FkRmVlZExpc3QoKTtcbiAgICB9XG5cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5yYWRMaXN0VmlldyA9IDxSYWRMaXN0Vmlldz50aGlzLnJhZExpc3RWaWV3UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgXG4gICAgfVxuXG4gICAgb25OYXZCdG5UYXAoKXtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuICAgIH1cbiAgXG5cbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkZlZWRfQ2F0ZWdvcnlfSWQgPSBudWxsO1xuICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkZlZWRUeXBlX0lkID0gbnVsbDtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5UaXRsZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uU2VhcmNoS2V5d29yZCA9IHRoaXMuc2VhcmNoS2V5d29yZDtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5Qb3N0ZWRfRGF0ZV9Gcm9tID0gbnVsbDtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5Qb3N0ZWRfRGF0ZV9UbyA9IG51bGw7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uQ3JlYXRlZF9Gcm9tID0gbnVsbDtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5DcmVhdGVkX1RvID0gbnVsbDtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5DdXJzb3JfSW5kZXggPSBudWxsO1xuICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkdldF9OZXh0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uUGFnZV9TaXplID0gMTA7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uUG9zdF9TdGF0dXMgPSB0cnVlO1xuICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlVuUG9zdF9TdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5pc0Jsb2NrZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBsb2FkRmVlZExpc3QoKSB7XG4gICAgICAgIHRoaXMuYnVzeSA9IHRoaXMuZmVlZFNlcnZpY2UuZ2V0TmV3c2ZlZWRsaXN0KHRoaXMuZmVlZEZpbHRlckluZm8uRmVlZF9DYXRlZ29yeV9JZCwgXG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkZlZWRUeXBlX0lkLFxuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5UaXRsZSwgXG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlNlYXJjaEtleXdvcmQsIFxuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5Qb3N0ZWRfRGF0ZV9Gcm9tLCBcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uUG9zdGVkX0RhdGVfVG8sIFxuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5DcmVhdGVkX0Zyb20sIFxuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5DcmVhdGVkX1RvLCBcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uQ3Vyc29yX0luZGV4LCBcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uR2V0X05leHQsIFxuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5QYWdlX1NpemUsIFxuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5Qb3N0X1N0YXR1cywgXG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlVuUG9zdF9TdGF0dXMsIFxuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5pc0Jsb2NrZWQpXG5cbiAgICAgICAgICAgXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTsgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIGZlZWRMaXN0ID0gQXJyYXk8RmVlZEluZm9ybWF0aW9uPigpOyAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmVzLnJlc3VsdC5mb3JFYWNoKGZlZWQgPT4ge1xuICAgICAgICAgICAgICAgICAgIGZlZWRMaXN0LnB1c2goPEZlZWRJbmZvcm1hdGlvbj5mZWVkKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LnB1c2goZmVlZExpc3QpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9hZEZlZWRMaXN0IC0tPiBcIiArIEpTT04uc3RyaW5naWZ5KHJlcykpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uTG9hZE1vcmVJdGVtc1JlcXVlc3RlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xuICAgICAgICB2YXIgdGhhdCA9IG5ldyBXZWFrUmVmKHRoaXMpO1xuICAgICAgICB2YXIgbGlzdFZpZXc6IFJhZExpc3RWaWV3ID0gYXJncy5vYmplY3Q7XG4gICAgICAgIGxldCBhcnJMZW5ndGggPSB0aGF0LmdldCgpLm5ld3NGZWVkTGlzdC5sZW5ndGg7XG5cbiAgICAgICAgVGltZXIuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGF0LmdldCgpLmxvYWRNb3JlRmVlZHMoKTtcbiAgICAgICAgICAgIGxpc3RWaWV3Lm5vdGlmeUxvYWRPbkRlbWFuZEZpbmlzaGVkKCk7XG4gICAgICAgICAgIFxuICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgLy99XG4gICAgICAgIGFyZ3MucmV0dXJuVmFsdWUgPSB0cnVlO1xuICAgIH1cblxuXG4gICAgb25JdGVtVGFwKGFyZ3MpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkSW5kZXg6bnVtYmVyID0gPG51bWJlcj5hcmdzLmluZGV4O1xuICAgICAgICB2YXIgZmVlZCA9IHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0oc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBcIkNhbGxlckNsYXNzXCIgOiBcIk15RmVlZFNlYXJjaENvbXBvbmVudFwiLFxuICAgICAgICAgICAgICAgIFwiU2VsZWN0ZWRQb3NpdGlvblwiIDogc2VsZWN0ZWRJbmRleCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL215ZmVlZC9cIisgZmVlZC5GZWVkX0lkKyBcIi92aWV3XCJdLG5hdmlnYXRpb25FeHRyYXMpIC8vcm91dGUgdG8gZmVlZF9kZXRhaWwoMSlcbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cblxuICAgIGxvYWRNb3JlRmVlZHMoKSB7XG4gICAgICAgIGlmICh0aGlzLm5ld3NGZWVkTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkN1cnNvcl9JbmRleCA9IHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0odGhpcy5uZXdzRmVlZExpc3QubGVuZ3RoIC0gMSkuRmVlZF9JZDtcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uR2V0X05leHQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvYWRGZWVkTGlzdCgpO1xuICAgIH1cblxuICAgIGdldElubmVySHRtbChkZXNjOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGRvdCA9ICcnOyAgICAgICAgXG4gICAgICAgIHZhciBydG4gPSBkZXNjLnJlcGxhY2UoLzxcXC8/W14+XSs+L2lnLCBcIiBcIik7XG4gICAgICAgIHJ0biA9IHJ0bi5yZXBsYWNlKFwiXFxuXCIsXCJcIik7XG4gICAgICAgIHJ0biA9IHJ0bi5yZXBsYWNlKFwiJm5ic3A7XCIsXCJcIik7XG4gICAgICAgIFxuICAgICAgICBpZiAocnRuLmxlbmd0aCA+IDEwMCkgeyBkb3QgPSAnLi4uLi4nOyB9XG4gICAgICAgICAgICBcbiAgICAgICAgcnRuID0gcnRuLnN1YnN0cmluZygwLCAxMDApO1xuICAgICAgICBpZiAocnRuLmxlbmd0aCA+MCkgeyByZXR1cm4gcnRuICsgZG90OyB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlTXlGZWVkc1VJKGZlZWQ6IEZlZWRJbmZvcm1hdGlvbixpc0ZlZWRVcGRhdGVPckNyZWF0ZTpzdHJpbmcscG9zaXRpb246bnVtYmVyKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJmZWVkIFwiICsgSlNPTi5zdHJpbmdpZnkoZmVlZCkpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInVwZGF0ZSBteSBmZWVkTGlzdCBcIiArIGlzRmVlZFVwZGF0ZU9yQ3JlYXRlICsgXCIgcG9zaXRpb24gXCIgKyBwb3NpdGlvbik7XG4gICAgICAgIGlmKGlzRmVlZFVwZGF0ZU9yQ3JlYXRlID09IFwibmV3XCIpe1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QudW5zaGlmdChmZWVkKTtcbiAgICAgICAgICAgIHRoaXMucmFkTGlzdFZpZXcucmVmcmVzaCgpO1xuICAgICAgICAgICAgLy9hbGVydChcIkZlZWQgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQhXCIpO1xuICAgICAgICB9ZWxzZSBpZihpc0ZlZWRVcGRhdGVPckNyZWF0ZSA9PSBcInVwZGF0ZVwiKXtcbiAgICAgICAgICAgIC8vdGhpcy5uZXdzRmVlZExpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTsvLyAxLCAxXG4gICAgICAgICAgICAvL3RoaXMubmV3c0ZlZWRMaXN0LnNwbGljZShwb3NpdGlvbiwwLGZlZWQpOy8vMSxmZWVkXG4gICAgICAgICAgICAvL3RoaXMubmV3c0ZlZWRMaXN0Lm5vdGlmeTtcblxuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuRmVlZF9DYXRlZ29yeV9JZCA9IGZlZWQuRmVlZF9DYXRlZ29yeV9JZDtcbiAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0ocG9zaXRpb24pLkZlZWRfQ2F0ZWdvcnlfTmFtZSA9IGZlZWQuRmVlZF9DYXRlZ29yeV9OYW1lO1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuRmVlZFR5cGVfSWQgPSBmZWVkLkZlZWRUeXBlX0lkO1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuRmVlZF9UeXBlX05hbWUgPSBmZWVkLkZlZWRfVHlwZV9OYW1lO1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuVGl0bGUgPSBmZWVkLlRpdGxlO1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuRGVzY3JpcHRpb24gPSBmZWVkLkRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuUG9zdGVkX0RhdGUgPSBmZWVkLlBvc3RlZF9EYXRlO1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuUG9zdF9TdGF0dXMgPSBmZWVkLlBvc3RfU3RhdHVzO1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuTGFzdF9VcGRhdGVkX0J5ID0gZmVlZC5MYXN0X1VwZGF0ZWRfQnk7XG4gICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKHBvc2l0aW9uKS5MYXN0X1VwZGF0ZWRfT24gPSBmZWVkLkxhc3RfVXBkYXRlZF9PbjtcbiAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0ocG9zaXRpb24pLnN0YXR1cyA9IGZlZWQuc3RhdHVzO1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuTUNfRmVlZF9GaWxlcyA9IGZlZWQuTUNfRmVlZF9GaWxlcztcblxuICAgICAgICAgICAgLy9hbGVydChcIkZlZWQgc3VjY2Vzc2Z1bGx5IHVwZGF0ZWQhXCIpO1xuXG4gICAgICAgIH1lbHNlIGlmKGlzRmVlZFVwZGF0ZU9yQ3JlYXRlID09IFwiVU5QT1NUXCIgfHwgaXNGZWVkVXBkYXRlT3JDcmVhdGUgPT0gXCJBUkNISVZFXCIpe1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidW5wb3N0IG15RmVlZHNcIik7IFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IHRoaXMubmV3c0ZlZWRMaXN0LmluZGV4T2YodGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LnNwbGljZShpLDEpO1xuICAgICAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiRmVlZCBzdWNjZXNzZnVsbHkgdW5wb3N0ZWQhXCIpOyAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlbW92ZSBcIiArIHBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB9LCAyMDAwKTtcblxuICAgICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgfVxuICBcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgaWYoaXNGZWVkVXBkYXRlT3JDcmVhdGUgPT0gXCJOT1RJRllcIil7XG4gICAgICAgICAgICBhbGVydChcIkZlZWRzIHN1Y2Nlc3NmdWxseSBub3RpZmllZCFcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0TXlGZWVkc1NlYXJjaE9iamVjdCgpe1xuICAgICAgICByZXR1cm4gTXlGZWVkRmlsdGVyUmVzdWx0Q29tcG9uZW50Lm15RmVlZEZpbHRlclJlc3VsdENvbXBvbmVudDtcbiAgICB9XG59XG5cblxuIl19