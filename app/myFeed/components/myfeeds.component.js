"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
//import * as moment from 'moment';
var myfeed_model_1 = require("../model/myfeed.model");
var myfeed_service_1 = require("../services/myfeed.service");
var common_service_1 = require("../../shared/utils/common.service");
var globalstorage_service_1 = require("../../shared/store/globalstorage.service");
//import { DialogService } from '../../shared/utils/dialog.service';
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var router_2 = require("nativescript-angular/router");
var Timer = require("tns-core-modules/timer");
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var observable_array_1 = require("tns-core-modules/data/observable-array");
var MyFeedsComponent = /** @class */ (function () {
    function MyFeedsComponent(route, router, feedService, routerExtensions, globalStorageService, commonService) {
        this.route = route;
        this.router = router;
        this.feedService = feedService;
        this.routerExtensions = routerExtensions;
        this.globalStorageService = globalStorageService;
        this.commonService = commonService;
        this.feedFilterInfo = new myfeed_model_1.FeedFilter();
        this.isLoading = false;
        this.isCreateAccess = false;
        this.initUI = true;
        this.updateUI = false;
        this.selectedIndex = -1;
        this.newsFeedList = new observable_array_1.ObservableArray();
        /*this.myItems = [];
        this.counter = 0;
        for (var i = 0; i < 50; i++) {
            this.myItems.push(new DataItem(i, "data item " + i));
            this.counter = i;
        }*/
        MyFeedsComponent_1.myFeedsComponent = this;
    }
    MyFeedsComponent_1 = MyFeedsComponent;
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    MyFeedsComponent.prototype.ngOnInit = function () {
        //if(this.initUI == true){
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        this.role = JSON.parse(this.globalStorageService.getPermission('1'));
        this.isCreateAccess = this.IsAccess('ADD_FEED');
        this.initialize();
        this.loadFeedList();
        //    console.log('on init 1');
        // }else{
        //    this.newsFeedList = this.newsFeedList;
        //    console.log('on init 2');
        //}
        //console.log('on init');
        //constant.setPreviousObject(<Object>this.myfeeds);
    };
    MyFeedsComponent.prototype.ngAfterViewInit = function () {
        var drawer = this.drawerComponent.nativeElement;
        this.radListView = drawer.getViewById("radListView");
    };
    MyFeedsComponent.prototype.ngOnDestroy = function () {
        console.log('on destroy');
    };
    Object.defineProperty(MyFeedsComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    MyFeedsComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    MyFeedsComponent.prototype.initialize = function () {
        this.feedFilterInfo.Feed_Category_Id = null;
        this.feedFilterInfo.FeedType_Id = null;
        this.feedFilterInfo.Title = null;
        this.feedFilterInfo.SearchKeyword = null;
        this.feedFilterInfo.Posted_Date_From = null;
        this.feedFilterInfo.Posted_Date_To = null;
        this.feedFilterInfo.Created_From = null;
        this.feedFilterInfo.Created_To = null;
        this.feedFilterInfo.Cursor_Index = null;
        this.feedFilterInfo.Get_Next = false;
        this.feedFilterInfo.Page_Size = 9;
        this.feedFilterInfo.Post_Status = true;
        this.feedFilterInfo.UnPost_Status = false;
        this.feedFilterInfo.isBlocked = false;
    };
    MyFeedsComponent.prototype.loadFeedList = function () {
        var _this = this;
        if (this.newsFeedList.length < 1) {
            this.isLoading = true;
        }
        this.busy = this.feedService.getNewsfeedlist(this.feedFilterInfo.Feed_Category_Id, this.feedFilterInfo.FeedType_Id, this.feedFilterInfo.Title, this.feedFilterInfo.SearchKeyword, this.feedFilterInfo.Posted_Date_From, this.feedFilterInfo.Posted_Date_To, this.feedFilterInfo.Created_From, this.feedFilterInfo.Created_To, this.feedFilterInfo.Cursor_Index, this.feedFilterInfo.Get_Next, this.feedFilterInfo.Page_Size, this.feedFilterInfo.Post_Status, this.feedFilterInfo.UnPost_Status, this.feedFilterInfo.isBlocked)
            .subscribe(function (res) {
            if (_this.newsFeedList.length < 1) {
                _this.isLoading = false;
            }
            /*
           
            if (this.feedFilterInfo.Cursor_Index === null) {
                this.newsFeedList.push(res.result);
            } else {
                this.newsFeedList = this.newsFeedList.concat(res.result);
            }*/
            console.log("loadFeedList --> " + JSON.stringify(res));
            var feedList = Array();
            res.result.forEach(function (feed) {
                feedList.push(feed);
            });
            _this.newsFeedList.push(feedList);
        });
    };
    MyFeedsComponent.prototype.IsAccess = function (role) {
        // alert(this.commonService.IsAccess(this.role,role));
        var _return = this.commonService.IsAccess(this.role, role);
        //alert(_return);
        return _return;
    };
    MyFeedsComponent.prototype.onLoadMoreItemsRequested = function (args) {
        var that = new WeakRef(this);
        var listView = args.object;
        var arrLength = that.get().newsFeedList.length;
        //var sPosition = parseInt(listView.scrollPosition);
        //alert("pos " + sPosition);
        //if(sPosition == arrLength - 2){
        Timer.setTimeout(function () {
            //let feed:Feed = that.get().arrFeedList.getItem(arrLength-1);
            //that.get().getFeedList(feed.Feed_Id);
            that.get().loadMoreFeeds();
            listView.notifyLoadOnDemandFinished();
        }, 1000);
        //}
        args.returnValue = true;
    };
    MyFeedsComponent.prototype.onItemTap = function (args) {
        var selectedIndex = args.index;
        var feed = this.newsFeedList.getItem(selectedIndex);
        var navigationExtras = {
            queryParams: {
                //"Feed" : JSON.stringify(feed),
                "CallerClass": "MyFeedsComponent",
                "SelectedPosition": selectedIndex,
            }
        };
        this.router.navigate(["/myfeed/" + feed.Feed_Id + "/view"], navigationExtras); //route to feed_detail(1)
        //this.updateMyFeedsUI(null,"UNPOST",selectedIndex);
    };
    MyFeedsComponent.prototype.onItemSelected = function (args) {
        var selectedIndex = args.index;
        //alert("selected index " + selectedIndex);
    };
    MyFeedsComponent.prototype.loadMoreFeeds = function () {
        if (this.newsFeedList.length > 0) {
            this.feedFilterInfo.Cursor_Index = this.newsFeedList.getItem(this.newsFeedList.length - 1).Feed_Id;
            this.feedFilterInfo.Get_Next = false;
        }
        this.loadFeedList();
    };
    MyFeedsComponent.prototype.fabTap = function () {
        this.router.navigate(["/myfeed/new"]);
    };
    MyFeedsComponent.prototype.getInnerHtml = function (desc) {
        /*const tmp = document.createElement('DIV');
        tmp.innerHTML = desc;
        let rtn = tmp.textContent || tmp.innerText || '';*/
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
    MyFeedsComponent.prototype.onSearchFeed = function () {
        this.router.navigate(["/myfeed/search"]);
    };
    MyFeedsComponent.prototype.onFilterFeed = function () {
        this.router.navigate(["/myfeed/filter"]);
        //this.refreshUI();
    };
    MyFeedsComponent.prototype.updateMyFeedsUI = function (feed, isFeedUpdateOrCreate, position) {
        var _this = this;
        //alert("update my feedLIst");
        console.log("feed " + JSON.stringify(feed));
        console.log("update my feedList " + isFeedUpdateOrCreate + " position " + position);
        if (isFeedUpdateOrCreate == "new") {
            //alert("update my feedLIst");
            this.newsFeedList.unshift(feed);
            this.radListView.refresh();
            //alert("Feed successfully created!");
            //this.newsFeedList.notify;
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
                this.selectedIndex = position;
                console.log("unpost myFeeds");
                /*let tempFeedList:ObservableArray<FeedInformation>  = new ObservableArray<FeedInformation>();
                for(var i = 0; i< this.newsFeedList.length; i++){
                    tempFeedList.setItem(i,this.newsFeedList.getItem(i));
                }
                //tempFeedList.splice(position,1);
                this.newsFeedList = new ObservableArray<FeedInformation>();
                this.newsFeedList = tempFeedList;
            
                /*this.newsFeedList.forEach(element => {
                    console.log(element.Title);
                });*/
                /*if(this.radListView != null){
                    console.log("listview refresh");
                    this.radListView.refresh();
                } else{
                    console.log("listview is null")
                }  */
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
    MyFeedsComponent.getMyFeedsObject = function () {
        return MyFeedsComponent_1.myFeedsComponent;
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], MyFeedsComponent.prototype, "drawerComponent", void 0);
    MyFeedsComponent = MyFeedsComponent_1 = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-myfeeds',
            templateUrl: './myfeeds.html',
            styleUrls: ['./myfeeds.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            myfeed_service_1.MyFeedService,
            router_2.RouterExtensions,
            globalstorage_service_1.GlobalStorageService,
            common_service_1.CommonService])
    ], MyFeedsComponent);
    return MyFeedsComponent;
    var MyFeedsComponent_1;
}());
exports.MyFeedsComponent = MyFeedsComponent;
var DataItem = /** @class */ (function () {
    function DataItem(id, name) {
        this.id = id;
        this.name = name;
    }
    return DataItem;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlmZWVkcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteWZlZWRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnSDtBQUVoSCwwQ0FBeUU7QUFHekUsbUNBQW1DO0FBRW5DLHNEQUFrRztBQUNsRyw2REFBMkQ7QUFDM0Qsb0VBQWtFO0FBQ2xFLGtGQUFnRjtBQUVoRixvRUFBb0U7QUFDcEUsNkRBQThGO0FBQzlGLGtFQUFnRjtBQUVoRixzREFBNkQ7QUFJN0QsOENBQWdEO0FBQ2hELElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7QUFFbEYsMkVBQXlFO0FBV3pFO0lBc0JRLDBCQUFtQixLQUFxQixFQUM3QixNQUFjLEVBQ2QsV0FBMEIsRUFDekIsZ0JBQWtDLEVBQ2xDLG9CQUEwQyxFQUMzQyxhQUE0QjtRQUxwQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUM3QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWU7UUFDekIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzNDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBdEIzQyxtQkFBYyxHQUFlLElBQUkseUJBQVUsRUFBRSxDQUFDO1FBQzlDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsbUJBQWMsR0FBVyxLQUFLLENBQUM7UUFFL0IsV0FBTSxHQUFVLElBQUksQ0FBQztRQUNyQixhQUFRLEdBQVcsS0FBSyxDQUFDO1FBQ3pCLGtCQUFhLEdBQVUsQ0FBQyxDQUFDLENBQUM7UUFpQmQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGtDQUFlLEVBQW1CLENBQUM7UUFDM0Q7Ozs7O1dBS0c7UUFFSCxrQkFBZ0IsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7SUFDNUMsQ0FBQzt5QkFyQ0Qs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QUFzQjs2REFBQztJQWhCcEQsZ0JBQWdCO1FBUDVCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLGdCQUFnQjtZQUM3QixTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztTQUN6QyxDQUFDO3lDQXdCZ0MsdUJBQWM7WUFDckIsZUFBTTtZQUNELDhCQUFhO1lBQ1AseUJBQWdCO1lBQ1osNENBQW9CO1lBQzVCLDhCQUFhO09BM0JsQyxnQkFBZ0IsQ0E2UzVCO0lBQUQsdUJBQUM7O0NBQUEsQUE3U0QsSUE2U0M7QUE3U1ksNENBQWdCO0FBK1M3QjtJQUNJLGtCQUFtQixFQUFVLEVBQVMsSUFBWTtRQUEvQixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtJQUFJLENBQUM7SUFDM0QsZUFBQztBQUFELENBQUMsQUFGRCxJQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIE9uSW5pdCwgT25EZXN0cm95LCBFbGVtZW50UmVmLElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmwsIFNhZmVVcmwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUsTmF2aWdhdGlvbkV4dHJhc30gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG4vL2ltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5pbXBvcnQgeyBGZWVkSW5mb3JtYXRpb24sIEZlZWRUeXBlLCBGZWVkQ2F0ZWdvcnksIEZlZWRGaWx0ZXIsIFJvbGUgfSBmcm9tICcuLi9tb2RlbC9teWZlZWQubW9kZWwnO1xuaW1wb3J0IHsgTXlGZWVkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL215ZmVlZC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbW1vblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMvY29tbW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2xvYmFsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RvcmUvZ2xvYmFsc3RvcmFnZS5zZXJ2aWNlJztcblxuLy9pbXBvcnQgeyBEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL2RpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IERyYXdlclRyYW5zaXRpb25CYXNlLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlclwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xuaW1wb3J0IHsgY29uc3RhbnQgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3V0aWxzL2NvbnN0YW50XCI7XG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IGlzSU9TfSBmcm9tIFwicGxhdGZvcm1cIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCB7UmFkTGlzdFZpZXcsTGlzdFZpZXdMaW5lYXJMYXlvdXQsIExpc3RWaWV3RXZlbnREYXRhLCBMaXN0Vmlld0xvYWRPbkRlbWFuZE1vZGV9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL2xpc3R2aWV3XCI7XG5pbXBvcnQgKiBhcyBUaW1lciBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy90aW1lclwiO1xudmFyIExvYWRpbmdJbmRpY2F0b3IgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCIpLkxvYWRpbmdJbmRpY2F0b3I7XG5pbXBvcnQgKiBhcyBodG1sVmlld01vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9odG1sLXZpZXdcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuXG5cblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2FwcC1teWZlZWRzJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbXlmZWVkcy5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9teWZlZWRzLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIE15RmVlZHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgYnVzeTogU3Vic2NyaXB0aW9uO1xuICAgIHJvbGU6Um9sZVtdO1xuICAgIHN0YXRpYyBteUZlZWRzQ29tcG9uZW50Ok15RmVlZHNDb21wb25lbnQ7XG4gICAgbmV3c0ZlZWRMaXN0Ok9ic2VydmFibGVBcnJheTxGZWVkSW5mb3JtYXRpb24+O1xuICAgIGZlZWRGaWx0ZXJJbmZvOiBGZWVkRmlsdGVyID0gbmV3IEZlZWRGaWx0ZXIoKTtcbiAgICBpc0xvYWRpbmc6IEJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc0NyZWF0ZUFjY2VzczpCb29sZWFuID0gZmFsc2U7XG4gICAgcmFkTGlzdFZpZXc6UmFkTGlzdFZpZXc7XG4gICAgaW5pdFVJOmJvb2xlYW49IHRydWU7XG4gICAgdXBkYXRlVUk6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIHNlbGVjdGVkSW5kZXg6bnVtYmVyID0gLTE7XG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFVzZSB0aGUgQFZpZXdDaGlsZCBkZWNvcmF0b3IgdG8gZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBkcmF3ZXIgY29tcG9uZW50LlxuICAgICogSXQgaXMgdXNlZCBpbiB0aGUgXCJvbkRyYXdlckJ1dHRvblRhcFwiIGZ1bmN0aW9uIGJlbG93IHRvIG1hbmlwdWxhdGUgdGhlIGRyYXdlci5cbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuICAgIC8vQFZpZXdDaGlsZChcInBhZ2VcIikgY29udGFpbmVyOiBFbGVtZW50UmVmO1xuICAgIFxuICAgICAgICBwcml2YXRlIF9zaWRlRHJhd2VyVHJhbnNpdGlvbjogRHJhd2VyVHJhbnNpdGlvbkJhc2U7XG4gICAgICBcblxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICAgICAgcHVibGljIHJvdXRlcjogUm91dGVyLCBcbiAgICAgICAgICAgIHB1YmxpYyBmZWVkU2VydmljZTogTXlGZWVkU2VydmljZSxcbiAgICAgICAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgICAgIHByaXZhdGUgZ2xvYmFsU3RvcmFnZVNlcnZpY2U6IEdsb2JhbFN0b3JhZ2VTZXJ2aWNlLFxuICAgICAgICAgICAgcHVibGljIGNvbW1vblNlcnZpY2U6IENvbW1vblNlcnZpY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8RmVlZEluZm9ybWF0aW9uPigpO1xuICAgICAgICAgICAgICAgIC8qdGhpcy5teUl0ZW1zID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudGVyID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDUwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teUl0ZW1zLnB1c2gobmV3IERhdGFJdGVtKGksIFwiZGF0YSBpdGVtIFwiICsgaSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50ZXIgPSBpO1xuICAgICAgICAgICAgICAgIH0qL1xuXG4gICAgICAgICAgICAgICAgTXlGZWVkc0NvbXBvbmVudC5teUZlZWRzQ29tcG9uZW50ID0gdGhpcztcbiAgICAgICAgICAgICB9XG5cblxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgc2lkZURyYXdlclRyYW5zaXRpb24gcHJvcGVydHkgdG8gY2hhbmdlIHRoZSBvcGVuL2Nsb3NlIGFuaW1hdGlvbiBvZiB0aGUgZHJhd2VyLlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICBuZ09uSW5pdCgpe1xuICAgICAgICAgICAgLy9pZih0aGlzLmluaXRVSSA9PSB0cnVlKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlID0gSlNPTi5wYXJzZSh0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldFBlcm1pc3Npb24oJzEnKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0NyZWF0ZUFjY2VzcyA9IHRoaXMuSXNBY2Nlc3MoJ0FERF9GRUVEJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkRmVlZExpc3QoKTtcbiAgICAgICAgICAgIC8vICAgIGNvbnNvbGUubG9nKCdvbiBpbml0IDEnKTtcbiAgICAgICAgICAgLy8gfWVsc2V7XG4gICAgICAgICAgICAvLyAgICB0aGlzLm5ld3NGZWVkTGlzdCA9IHRoaXMubmV3c0ZlZWRMaXN0O1xuICAgICAgICAgICAgLy8gICAgY29uc29sZS5sb2coJ29uIGluaXQgMicpO1xuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdvbiBpbml0Jyk7XG4gICAgICAgICAgICAvL2NvbnN0YW50LnNldFByZXZpb3VzT2JqZWN0KDxPYmplY3Q+dGhpcy5teWZlZWRzKTtcbiAgICAgICAgfVxuICAgICAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgICAgIHZhciBkcmF3ZXIgPSB0aGlzLmRyYXdlckNvbXBvbmVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5yYWRMaXN0VmlldyA9IGRyYXdlci5nZXRWaWV3QnlJZChcInJhZExpc3RWaWV3XCIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBuZ09uRGVzdHJveSgpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ29uIGRlc3Ryb3knKTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgc2lkZURyYXdlclRyYW5zaXRpb24oKTogRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogQWNjb3JkaW5nIHRvIGd1aWRlbGluZXMsIGlmIHlvdSBoYXZlIGEgZHJhd2VyIG9uIHlvdXIgcGFnZSwgeW91IHNob3VsZCBhbHdheXNcbiAgICAgICAgKiBoYXZlIGEgYnV0dG9uIHRoYXQgb3BlbnMgaXQuIFVzZSB0aGUgc2hvd0RyYXdlcigpIGZ1bmN0aW9uIHRvIG9wZW4gdGhlIGFwcCBkcmF3ZXIgc2VjdGlvbi5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkZlZWRfQ2F0ZWdvcnlfSWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5GZWVkVHlwZV9JZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlRpdGxlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uU2VhcmNoS2V5d29yZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlBvc3RlZF9EYXRlX0Zyb20gPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5Qb3N0ZWRfRGF0ZV9UbyA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkNyZWF0ZWRfRnJvbSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkNyZWF0ZWRfVG8gPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5DdXJzb3JfSW5kZXggPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5HZXRfTmV4dCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5QYWdlX1NpemUgPSA5O1xuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5Qb3N0X1N0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlVuUG9zdF9TdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uaXNCbG9ja2VkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsb2FkRmVlZExpc3QoKSB7XG4gICAgICAgICAgICBpZih0aGlzLm5ld3NGZWVkTGlzdC5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmJ1c3kgPSB0aGlzLmZlZWRTZXJ2aWNlLmdldE5ld3NmZWVkbGlzdCh0aGlzLmZlZWRGaWx0ZXJJbmZvLkZlZWRfQ2F0ZWdvcnlfSWQsIFxuICAgICAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uRmVlZFR5cGVfSWQsXG4gICAgICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5UaXRsZSwgXG4gICAgICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5TZWFyY2hLZXl3b3JkLCBcbiAgICAgICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlBvc3RlZF9EYXRlX0Zyb20sIFxuICAgICAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uUG9zdGVkX0RhdGVfVG8sIFxuICAgICAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uQ3JlYXRlZF9Gcm9tLCBcbiAgICAgICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkNyZWF0ZWRfVG8sIFxuICAgICAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uQ3Vyc29yX0luZGV4LCBcbiAgICAgICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkdldF9OZXh0LCBcbiAgICAgICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlBhZ2VfU2l6ZSwgXG4gICAgICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5Qb3N0X1N0YXR1cywgXG4gICAgICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5VblBvc3RfU3RhdHVzLCBcbiAgICAgICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLmlzQmxvY2tlZClcblxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLm5ld3NGZWVkTGlzdC5sZW5ndGggPCAxKXsgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTsgfVxuICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mZWVkRmlsdGVySW5mby5DdXJzb3JfSW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LnB1c2gocmVzLnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdCA9IHRoaXMubmV3c0ZlZWRMaXN0LmNvbmNhdChyZXMucmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvYWRGZWVkTGlzdCAtLT4gXCIgKyBKU09OLnN0cmluZ2lmeShyZXMpKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZmVlZExpc3QgPSBBcnJheTxGZWVkSW5mb3JtYXRpb24+KCk7ICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmVzLnJlc3VsdC5mb3JFYWNoKGZlZWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICBmZWVkTGlzdC5wdXNoKDxGZWVkSW5mb3JtYXRpb24+ZmVlZCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LnB1c2goZmVlZExpc3QpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgSXNBY2Nlc3Mocm9sZTogc3RyaW5nKSB7XG4gICAgICAgICAgIC8vIGFsZXJ0KHRoaXMuY29tbW9uU2VydmljZS5Jc0FjY2Vzcyh0aGlzLnJvbGUscm9sZSkpO1xuICAgICAgICAgICBsZXQgX3JldHVybiA9IHRoaXMuY29tbW9uU2VydmljZS5Jc0FjY2Vzcyh0aGlzLnJvbGUsIHJvbGUpO1xuICAgICAgICAgICAvL2FsZXJ0KF9yZXR1cm4pO1xuICAgICAgICAgICAgcmV0dXJuIF9yZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgcHVibGljIG9uTG9hZE1vcmVJdGVtc1JlcXVlc3RlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xuICAgICAgICAgICAgdmFyIHRoYXQgPSBuZXcgV2Vha1JlZih0aGlzKTtcbiAgICAgICAgICAgIHZhciBsaXN0VmlldzogUmFkTGlzdFZpZXcgPSBhcmdzLm9iamVjdDtcbiAgICAgICAgICAgIGxldCBhcnJMZW5ndGggPSB0aGF0LmdldCgpLm5ld3NGZWVkTGlzdC5sZW5ndGg7XG4gICAgICAgICAgICAvL3ZhciBzUG9zaXRpb24gPSBwYXJzZUludChsaXN0Vmlldy5zY3JvbGxQb3NpdGlvbik7XG4gICAgICAgICAgICAvL2FsZXJ0KFwicG9zIFwiICsgc1Bvc2l0aW9uKTtcbiAgICAgICAgICAgIC8vaWYoc1Bvc2l0aW9uID09IGFyckxlbmd0aCAtIDIpe1xuICAgICAgICAgICAgVGltZXIuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy9sZXQgZmVlZDpGZWVkID0gdGhhdC5nZXQoKS5hcnJGZWVkTGlzdC5nZXRJdGVtKGFyckxlbmd0aC0xKTtcbiAgICAgICAgICAgICAgICAvL3RoYXQuZ2V0KCkuZ2V0RmVlZExpc3QoZmVlZC5GZWVkX0lkKTtcbiAgICAgICAgICAgICAgICB0aGF0LmdldCgpLmxvYWRNb3JlRmVlZHMoKTtcbiAgICAgICAgICAgICAgICBsaXN0Vmlldy5ub3RpZnlMb2FkT25EZW1hbmRGaW5pc2hlZCgpO1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgYXJncy5yZXR1cm5WYWx1ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBvbkl0ZW1UYXAoYXJncykge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkSW5kZXg6bnVtYmVyID0gPG51bWJlcj5hcmdzLmluZGV4O1xuICAgICAgICAgICAgdmFyIGZlZWQgPSB0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKHNlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgbGV0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICAgICAgICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgLy9cIkZlZWRcIiA6IEpTT04uc3RyaW5naWZ5KGZlZWQpLFxuICAgICAgICAgICAgICAgICAgICBcIkNhbGxlckNsYXNzXCIgOiBcIk15RmVlZHNDb21wb25lbnRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJTZWxlY3RlZFBvc2l0aW9uXCIgOiBzZWxlY3RlZEluZGV4LFxuICAgICAgICAgICAgICAgICAgICAvL1wiQ29uZG9taW5pdW1fSWRcIjogZmVlZC5Db25kb21pbml1bV9JZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbXlmZWVkL1wiKyBmZWVkLkZlZWRfSWQrIFwiL3ZpZXdcIl0sbmF2aWdhdGlvbkV4dHJhcykgLy9yb3V0ZSB0byBmZWVkX2RldGFpbCgxKVxuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIC8vdGhpcy51cGRhdGVNeUZlZWRzVUkobnVsbCxcIlVOUE9TVFwiLHNlbGVjdGVkSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgb25JdGVtU2VsZWN0ZWQoYXJncyl7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRJbmRleCA9IGFyZ3MuaW5kZXg7XG4gICAgICAgICAgICAvL2FsZXJ0KFwic2VsZWN0ZWQgaW5kZXggXCIgKyBzZWxlY3RlZEluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvYWRNb3JlRmVlZHMoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5uZXdzRmVlZExpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uQ3Vyc29yX0luZGV4ID0gdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbSh0aGlzLm5ld3NGZWVkTGlzdC5sZW5ndGggLSAxKS5GZWVkX0lkOyAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkdldF9OZXh0ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxvYWRGZWVkTGlzdCgpO1xuICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIGZhYlRhcCgpeyAgIFxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL215ZmVlZC9uZXdcIl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0SW5uZXJIdG1sKGRlc2M6IHN0cmluZykge1xuXG4gICAgICAgICAgICAvKmNvbnN0IHRtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgICAgICAgICAgdG1wLmlubmVySFRNTCA9IGRlc2M7XG4gICAgICAgICAgICBsZXQgcnRuID0gdG1wLnRleHRDb250ZW50IHx8IHRtcC5pbm5lclRleHQgfHwgJyc7Ki9cbiAgICAgICAgICAgIGxldCBkb3QgPSAnJztcblxuICAgICAgICAgICAgdmFyIHJ0biA9IGRlc2MucmVwbGFjZSgvPFxcLz9bXj5dKz4vaWcsIFwiIFwiKTtcbiAgICAgICAgICAgIHJ0biA9IHJ0bi5yZXBsYWNlKFwiXFxuXCIsXCJcIik7XG4gICAgICAgICAgICBydG4gPSBydG4ucmVwbGFjZShcIiZuYnNwO1wiLFwiXCIpO1xuXG4gICAgICAgICAgICBpZiAocnRuLmxlbmd0aCA+IDEwMCkgeyBkb3QgPSAnLi4uLi4nOyB9XG4gICAgXG4gICAgICAgICAgICBydG4gPSBydG4uc3Vic3RyaW5nKDAsIDEwMCk7XG4gICAgICAgICAgICBpZiAocnRuLmxlbmd0aCA+MCkgeyByZXR1cm4gcnRuICsgZG90OyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9uU2VhcmNoRmVlZCgpe1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL215ZmVlZC9zZWFyY2hcIl0pO1xuICAgICAgICB9XG4gICAgICAgIG9uRmlsdGVyRmVlZCgpe1xuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9teWZlZWQvZmlsdGVyXCJdKTtcbiAgICAgICAgICAvL3RoaXMucmVmcmVzaFVJKCk7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgdXBkYXRlTXlGZWVkc1VJKGZlZWQ6IEZlZWRJbmZvcm1hdGlvbixpc0ZlZWRVcGRhdGVPckNyZWF0ZTpzdHJpbmcscG9zaXRpb246bnVtYmVyKXtcbiAgICAgICAgICAgIC8vYWxlcnQoXCJ1cGRhdGUgbXkgZmVlZExJc3RcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZlZWQgXCIgKyBKU09OLnN0cmluZ2lmeShmZWVkKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInVwZGF0ZSBteSBmZWVkTGlzdCBcIiArIGlzRmVlZFVwZGF0ZU9yQ3JlYXRlICsgXCIgcG9zaXRpb24gXCIgKyBwb3NpdGlvbik7XG4gICAgICAgICAgICBpZihpc0ZlZWRVcGRhdGVPckNyZWF0ZSA9PSBcIm5ld1wiKXtcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwidXBkYXRlIG15IGZlZWRMSXN0XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LnVuc2hpZnQoZmVlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yYWRMaXN0Vmlldy5yZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgLy9hbGVydChcIkZlZWQgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQhXCIpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5uZXdzRmVlZExpc3Qubm90aWZ5O1xuICAgICAgICAgICAgfWVsc2UgaWYoaXNGZWVkVXBkYXRlT3JDcmVhdGUgPT0gXCJ1cGRhdGVcIil7XG4gICAgICAgICAgICAgICAgLy90aGlzLm5ld3NGZWVkTGlzdC5zcGxpY2UocG9zaXRpb24sIDEpOy8vIDEsIDFcbiAgICAgICAgICAgICAgICAvL3RoaXMubmV3c0ZlZWRMaXN0LnNwbGljZShwb3NpdGlvbiwwLGZlZWQpOy8vMSxmZWVkXG4gICAgICAgICAgICAgICAgLy90aGlzLm5ld3NGZWVkTGlzdC5ub3RpZnk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKHBvc2l0aW9uKS5GZWVkX0NhdGVnb3J5X0lkID0gZmVlZC5GZWVkX0NhdGVnb3J5X0lkO1xuICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0ocG9zaXRpb24pLkZlZWRfQ2F0ZWdvcnlfTmFtZSA9IGZlZWQuRmVlZF9DYXRlZ29yeV9OYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0ocG9zaXRpb24pLkZlZWRUeXBlX0lkID0gZmVlZC5GZWVkVHlwZV9JZDtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKHBvc2l0aW9uKS5GZWVkX1R5cGVfTmFtZSA9IGZlZWQuRmVlZF9UeXBlX05hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuVGl0bGUgPSBmZWVkLlRpdGxlO1xuICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0ocG9zaXRpb24pLkRlc2NyaXB0aW9uID0gZmVlZC5EZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKHBvc2l0aW9uKS5Qb3N0ZWRfRGF0ZSA9IGZlZWQuUG9zdGVkX0RhdGU7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuUG9zdF9TdGF0dXMgPSBmZWVkLlBvc3RfU3RhdHVzO1xuICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0ocG9zaXRpb24pLkxhc3RfVXBkYXRlZF9CeSA9IGZlZWQuTGFzdF9VcGRhdGVkX0J5O1xuICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0ocG9zaXRpb24pLkxhc3RfVXBkYXRlZF9PbiA9IGZlZWQuTGFzdF9VcGRhdGVkX09uO1xuICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0ocG9zaXRpb24pLnN0YXR1cyA9IGZlZWQuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0ocG9zaXRpb24pLk1DX0ZlZWRfRmlsZXMgPSBmZWVkLk1DX0ZlZWRfRmlsZXM7XG5cbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiRmVlZCBzdWNjZXNzZnVsbHkgdXBkYXRlZCFcIik7XG5cbiAgICAgICAgICAgIH1lbHNlIGlmKGlzRmVlZFVwZGF0ZU9yQ3JlYXRlID09IFwiVU5QT1NUXCIgfHwgaXNGZWVkVXBkYXRlT3JDcmVhdGUgPT0gXCJBUkNISVZFXCIpe1xuICAgICAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVucG9zdCBteUZlZWRzXCIpO1xuICAgICAgICAgICAgICAgICAgICAvKmxldCB0ZW1wRmVlZExpc3Q6T2JzZXJ2YWJsZUFycmF5PEZlZWRJbmZvcm1hdGlvbj4gID0gbmV3IE9ic2VydmFibGVBcnJheTxGZWVkSW5mb3JtYXRpb24+KCk7XG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGk8IHRoaXMubmV3c0ZlZWRMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBGZWVkTGlzdC5zZXRJdGVtKGksdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShpKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy90ZW1wRmVlZExpc3Quc3BsaWNlKHBvc2l0aW9uLDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8RmVlZEluZm9ybWF0aW9uPigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdCA9IHRlbXBGZWVkTGlzdDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLyp0aGlzLm5ld3NGZWVkTGlzdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbWVudC5UaXRsZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pOyovXG5cbiAgICAgICAgICAgICAgICAgICAgLyppZih0aGlzLnJhZExpc3RWaWV3ICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsaXN0dmlldyByZWZyZXNoXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yYWRMaXN0Vmlldy5yZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGlzdHZpZXcgaXMgbnVsbFwiKVxuICAgICAgICAgICAgICAgICAgICB9ICAqLyAgIFxuICAgIFxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpID0gdGhpcy5uZXdzRmVlZExpc3QuaW5kZXhPZih0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKHBvc2l0aW9uKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LnNwbGljZShpLDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9hbGVydChcIkZlZWQgc3VjY2Vzc2Z1bGx5IHVucG9zdGVkIVwiKTsgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVtb3ZlIFwiICsgcG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcblxuICAgICAgICAgICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsc2UgaWYoaXNGZWVkVXBkYXRlT3JDcmVhdGUgPT0gXCJOT1RJRllcIil7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGZWVkcyBzdWNjZXNzZnVsbHkgbm90aWZpZWQhXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIGdldE15RmVlZHNPYmplY3QoKXtcbiAgICAgICAgICAgIHJldHVybiBNeUZlZWRzQ29tcG9uZW50Lm15RmVlZHNDb21wb25lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL2V2ZW50IGxpc3RlblxufVxuXG5jbGFzcyBEYXRhSXRlbSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGlkOiBudW1iZXIsIHB1YmxpYyBuYW1lOiBzdHJpbmcpIHsgfVxufVxuIl19