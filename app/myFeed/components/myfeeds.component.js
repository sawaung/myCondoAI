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
        alert(this.IsAccess('ADD_FEED'));
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
        // alert(_return);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlmZWVkcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteWZlZWRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnSDtBQUVoSCwwQ0FBeUU7QUFHekUsbUNBQW1DO0FBRW5DLHNEQUFrRztBQUNsRyw2REFBMkQ7QUFDM0Qsb0VBQWtFO0FBQ2xFLGtGQUFnRjtBQUVoRixvRUFBb0U7QUFDcEUsNkRBQThGO0FBQzlGLGtFQUFnRjtBQUVoRixzREFBNkQ7QUFJN0QsOENBQWdEO0FBQ2hELElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7QUFFbEYsMkVBQXlFO0FBV3pFO0lBc0JRLDBCQUFtQixLQUFxQixFQUM3QixNQUFjLEVBQ2QsV0FBMEIsRUFDekIsZ0JBQWtDLEVBQ2xDLG9CQUEwQyxFQUMzQyxhQUE0QjtRQUxwQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUM3QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWU7UUFDekIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzNDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBdEIzQyxtQkFBYyxHQUFlLElBQUkseUJBQVUsRUFBRSxDQUFDO1FBQzlDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsbUJBQWMsR0FBVyxLQUFLLENBQUM7UUFFL0IsV0FBTSxHQUFVLElBQUksQ0FBQztRQUNyQixhQUFRLEdBQVcsS0FBSyxDQUFDO1FBQ3pCLGtCQUFhLEdBQVUsQ0FBQyxDQUFDLENBQUM7UUFpQmQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGtDQUFlLEVBQW1CLENBQUM7UUFDM0Q7Ozs7O1dBS0c7UUFFSCxrQkFBZ0IsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7SUFDNUMsQ0FBQzt5QkFyQ0Qs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QztJQUM3QyxDQUFDO0lBM1JnQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBa0IsZ0NBQXNCOzZEQUFDO0lBaEJwRCxnQkFBZ0I7UUFQNUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsZ0JBQWdCO1lBQzdCLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1NBQ3pDLENBQUM7eUNBd0JnQyx1QkFBYztZQUNyQixlQUFNO1lBQ0QsOEJBQWE7WUFDUCx5QkFBZ0I7WUFDWiw0Q0FBb0I7WUFDNUIsOEJBQWE7T0EzQmxDLGdCQUFnQixDQThTNUI7SUFBRCx1QkFBQzs7Q0FBQSxBQTlTRCxJQThTQztBQTlTWSw0Q0FBZ0I7QUFnVDdCO0lBQ0ksa0JBQW1CLEVBQVUsRUFBUyxJQUFZO1FBQS9CLE9BQUUsR0FBRixFQUFFLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO0lBQUksQ0FBQztJQUMzRCxlQUFDO0FBQUQsQ0FBQyxBQUZELElBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgT25Jbml0LCBPbkRlc3Ryb3ksIEVsZW1lbnRSZWYsSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybCwgU2FmZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSxOYXZpZ2F0aW9uRXh0cmFzfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbi8vaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbmltcG9ydCB7IEZlZWRJbmZvcm1hdGlvbiwgRmVlZFR5cGUsIEZlZWRDYXRlZ29yeSwgRmVlZEZpbHRlciwgUm9sZSB9IGZyb20gJy4uL21vZGVsL215ZmVlZC5tb2RlbCc7XG5pbXBvcnQgeyBNeUZlZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbXlmZWVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tbW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy9jb21tb24uc2VydmljZSc7XG5pbXBvcnQgeyBHbG9iYWxTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zdG9yZS9nbG9iYWxzdG9yYWdlLnNlcnZpY2UnO1xuXG4vL2ltcG9ydCB7IERpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMvZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyXCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBjb25zdGFudCB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdXRpbHMvY29uc3RhbnRcIjtcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgaXNJT1N9IGZyb20gXCJwbGF0Zm9ybVwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHtSYWRMaXN0VmlldyxMaXN0Vmlld0xpbmVhckxheW91dCwgTGlzdFZpZXdFdmVudERhdGEsIExpc3RWaWV3TG9hZE9uRGVtYW5kTW9kZX0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvbGlzdHZpZXdcIjtcbmltcG9ydCAqIGFzIFRpbWVyIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3RpbWVyXCI7XG52YXIgTG9hZGluZ0luZGljYXRvciA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIikuTG9hZGluZ0luZGljYXRvcjtcbmltcG9ydCAqIGFzIGh0bWxWaWV3TW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2h0bWwtdmlld1wiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnYXBwLW15ZmVlZHMnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9teWZlZWRzLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL215ZmVlZHMuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgTXlGZWVkc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBidXN5OiBTdWJzY3JpcHRpb247XG4gICAgcm9sZTpSb2xlW107XG4gICAgc3RhdGljIG15RmVlZHNDb21wb25lbnQ6TXlGZWVkc0NvbXBvbmVudDtcbiAgICBuZXdzRmVlZExpc3Q6T2JzZXJ2YWJsZUFycmF5PEZlZWRJbmZvcm1hdGlvbj47XG4gICAgZmVlZEZpbHRlckluZm86IEZlZWRGaWx0ZXIgPSBuZXcgRmVlZEZpbHRlcigpO1xuICAgIGlzTG9hZGluZzogQm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzQ3JlYXRlQWNjZXNzOkJvb2xlYW4gPSBmYWxzZTtcbiAgICByYWRMaXN0VmlldzpSYWRMaXN0VmlldztcbiAgICBpbml0VUk6Ym9vbGVhbj0gdHJ1ZTtcbiAgICB1cGRhdGVVSTpib29sZWFuID0gZmFsc2U7XG4gICAgc2VsZWN0ZWRJbmRleDpudW1iZXIgPSAtMTtcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogVXNlIHRoZSBAVmlld0NoaWxkIGRlY29yYXRvciB0byBnZXQgYSByZWZlcmVuY2UgdG8gdGhlIGRyYXdlciBjb21wb25lbnQuXG4gICAgKiBJdCBpcyB1c2VkIGluIHRoZSBcIm9uRHJhd2VyQnV0dG9uVGFwXCIgZnVuY3Rpb24gYmVsb3cgdG8gbWFuaXB1bGF0ZSB0aGUgZHJhd2VyLlxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG4gICAgLy9AVmlld0NoaWxkKFwicGFnZVwiKSBjb250YWluZXI6IEVsZW1lbnRSZWY7XG4gICAgXG4gICAgICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcbiAgICAgIFxuXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgICAgICBwdWJsaWMgcm91dGVyOiBSb3V0ZXIsIFxuICAgICAgICAgICAgcHVibGljIGZlZWRTZXJ2aWNlOiBNeUZlZWRTZXJ2aWNlLFxuICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICAgICAgcHJpdmF0ZSBnbG9iYWxTdG9yYWdlU2VydmljZTogR2xvYmFsU3RvcmFnZVNlcnZpY2UsXG4gICAgICAgICAgICBwdWJsaWMgY29tbW9uU2VydmljZTogQ29tbW9uU2VydmljZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxGZWVkSW5mb3JtYXRpb24+KCk7XG4gICAgICAgICAgICAgICAgLyp0aGlzLm15SXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm15SXRlbXMucHVzaChuZXcgRGF0YUl0ZW0oaSwgXCJkYXRhIGl0ZW0gXCIgKyBpKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnRlciA9IGk7XG4gICAgICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgICAgICBNeUZlZWRzQ29tcG9uZW50Lm15RmVlZHNDb21wb25lbnQgPSB0aGlzO1xuICAgICAgICAgICAgIH1cblxuXG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBzaWRlRHJhd2VyVHJhbnNpdGlvbiBwcm9wZXJ0eSB0byBjaGFuZ2UgdGhlIG9wZW4vY2xvc2UgYW5pbWF0aW9uIG9mIHRoZSBkcmF3ZXIuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgIG5nT25Jbml0KCl7XG4gICAgICAgICAgICAvL2lmKHRoaXMuaW5pdFVJID09IHRydWUpe1xuICAgICAgICAgICAgICAgIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFNsaWRlSW5PblRvcFRyYW5zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGUgPSBKU09OLnBhcnNlKHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0UGVybWlzc2lvbignMScpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ3JlYXRlQWNjZXNzID0gdGhpcy5Jc0FjY2VzcygnQUREX0ZFRUQnKTtcbiAgICAgICAgICAgICAgICBhbGVydCh0aGlzLklzQWNjZXNzKCdBRERfRkVFRCcpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRGZWVkTGlzdCgpO1xuICAgICAgICAgICAgLy8gICAgY29uc29sZS5sb2coJ29uIGluaXQgMScpO1xuICAgICAgICAgICAvLyB9ZWxzZXtcbiAgICAgICAgICAgIC8vICAgIHRoaXMubmV3c0ZlZWRMaXN0ID0gdGhpcy5uZXdzRmVlZExpc3Q7XG4gICAgICAgICAgICAvLyAgICBjb25zb2xlLmxvZygnb24gaW5pdCAyJyk7XG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ29uIGluaXQnKTtcbiAgICAgICAgICAgIC8vY29uc3RhbnQuc2V0UHJldmlvdXNPYmplY3QoPE9iamVjdD50aGlzLm15ZmVlZHMpO1xuICAgICAgICB9XG4gICAgICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgICAgdmFyIGRyYXdlciA9IHRoaXMuZHJhd2VyQ29tcG9uZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLnJhZExpc3RWaWV3ID0gZHJhd2VyLmdldFZpZXdCeUlkKFwicmFkTGlzdFZpZXdcIik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIG5nT25EZXN0cm95KCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnb24gZGVzdHJveScpO1xuICAgICAgICB9XG4gICAgICAgIGdldCBzaWRlRHJhd2VyVHJhbnNpdGlvbigpOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xuICAgICAgICAqIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gVXNlIHRoZSBzaG93RHJhd2VyKCkgZnVuY3Rpb24gdG8gb3BlbiB0aGUgYXBwIGRyYXdlciBzZWN0aW9uLlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uRmVlZF9DYXRlZ29yeV9JZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkZlZWRUeXBlX0lkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uVGl0bGUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5TZWFyY2hLZXl3b3JkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uUG9zdGVkX0RhdGVfRnJvbSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlBvc3RlZF9EYXRlX1RvID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uQ3JlYXRlZF9Gcm9tID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uQ3JlYXRlZF9UbyA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkN1cnNvcl9JbmRleCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkdldF9OZXh0ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlBhZ2VfU2l6ZSA9IDk7XG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlBvc3RfU3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uVW5Qb3N0X1N0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5pc0Jsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvYWRGZWVkTGlzdCgpIHtcbiAgICAgICAgICAgIGlmKHRoaXMubmV3c0ZlZWRMaXN0Lmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYnVzeSA9IHRoaXMuZmVlZFNlcnZpY2UuZ2V0TmV3c2ZlZWRsaXN0KHRoaXMuZmVlZEZpbHRlckluZm8uRmVlZF9DYXRlZ29yeV9JZCwgXG4gICAgICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5GZWVkVHlwZV9JZCxcbiAgICAgICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlRpdGxlLCBcbiAgICAgICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlNlYXJjaEtleXdvcmQsIFxuICAgICAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uUG9zdGVkX0RhdGVfRnJvbSwgXG4gICAgICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5Qb3N0ZWRfRGF0ZV9UbywgXG4gICAgICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5DcmVhdGVkX0Zyb20sIFxuICAgICAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uQ3JlYXRlZF9UbywgXG4gICAgICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5DdXJzb3JfSW5kZXgsIFxuICAgICAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uR2V0X05leHQsIFxuICAgICAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uUGFnZV9TaXplLCBcbiAgICAgICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlBvc3RfU3RhdHVzLCBcbiAgICAgICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlVuUG9zdF9TdGF0dXMsIFxuICAgICAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uaXNCbG9ja2VkKVxuXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubmV3c0ZlZWRMaXN0Lmxlbmd0aCA8IDEpeyB0aGlzLmlzTG9hZGluZyA9IGZhbHNlOyB9XG4gICAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZlZWRGaWx0ZXJJbmZvLkN1cnNvcl9JbmRleCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QucHVzaChyZXMucmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0ID0gdGhpcy5uZXdzRmVlZExpc3QuY29uY2F0KHJlcy5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9hZEZlZWRMaXN0IC0tPiBcIiArIEpTT04uc3RyaW5naWZ5KHJlcykpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBmZWVkTGlzdCA9IEFycmF5PEZlZWRJbmZvcm1hdGlvbj4oKTsgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXMucmVzdWx0LmZvckVhY2goZmVlZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgIGZlZWRMaXN0LnB1c2goPEZlZWRJbmZvcm1hdGlvbj5mZWVkKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QucHVzaChmZWVkTGlzdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBJc0FjY2Vzcyhyb2xlOiBzdHJpbmcpIHtcbiAgICAgICAgICAgLy8gYWxlcnQodGhpcy5jb21tb25TZXJ2aWNlLklzQWNjZXNzKHRoaXMucm9sZSxyb2xlKSk7XG4gICAgICAgICAgIGxldCBfcmV0dXJuID0gdGhpcy5jb21tb25TZXJ2aWNlLklzQWNjZXNzKHRoaXMucm9sZSwgcm9sZSk7XG4gICAgICAgICAgLy8gYWxlcnQoX3JldHVybik7XG4gICAgICAgICAgICByZXR1cm4gX3JldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgb25Mb2FkTW9yZUl0ZW1zUmVxdWVzdGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IG5ldyBXZWFrUmVmKHRoaXMpO1xuICAgICAgICAgICAgdmFyIGxpc3RWaWV3OiBSYWRMaXN0VmlldyA9IGFyZ3Mub2JqZWN0O1xuICAgICAgICAgICAgbGV0IGFyckxlbmd0aCA9IHRoYXQuZ2V0KCkubmV3c0ZlZWRMaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIC8vdmFyIHNQb3NpdGlvbiA9IHBhcnNlSW50KGxpc3RWaWV3LnNjcm9sbFBvc2l0aW9uKTtcbiAgICAgICAgICAgIC8vYWxlcnQoXCJwb3MgXCIgKyBzUG9zaXRpb24pO1xuICAgICAgICAgICAgLy9pZihzUG9zaXRpb24gPT0gYXJyTGVuZ3RoIC0gMil7XG4gICAgICAgICAgICBUaW1lci5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvL2xldCBmZWVkOkZlZWQgPSB0aGF0LmdldCgpLmFyckZlZWRMaXN0LmdldEl0ZW0oYXJyTGVuZ3RoLTEpO1xuICAgICAgICAgICAgICAgIC8vdGhhdC5nZXQoKS5nZXRGZWVkTGlzdChmZWVkLkZlZWRfSWQpO1xuICAgICAgICAgICAgICAgIHRoYXQuZ2V0KCkubG9hZE1vcmVGZWVkcygpO1xuICAgICAgICAgICAgICAgIGxpc3RWaWV3Lm5vdGlmeUxvYWRPbkRlbWFuZEZpbmlzaGVkKCk7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICBhcmdzLnJldHVyblZhbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uSXRlbVRhcChhcmdzKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRJbmRleDpudW1iZXIgPSA8bnVtYmVyPmFyZ3MuaW5kZXg7XG4gICAgICAgICAgICB2YXIgZmVlZCA9IHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0oc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgICAgICBsZXQgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgICAgICAgICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICAvL1wiRmVlZFwiIDogSlNPTi5zdHJpbmdpZnkoZmVlZCksXG4gICAgICAgICAgICAgICAgICAgIFwiQ2FsbGVyQ2xhc3NcIiA6IFwiTXlGZWVkc0NvbXBvbmVudFwiLFxuICAgICAgICAgICAgICAgICAgICBcIlNlbGVjdGVkUG9zaXRpb25cIiA6IHNlbGVjdGVkSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIC8vXCJDb25kb21pbml1bV9JZFwiOiBmZWVkLkNvbmRvbWluaXVtX0lkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9teWZlZWQvXCIrIGZlZWQuRmVlZF9JZCsgXCIvdmlld1wiXSxuYXZpZ2F0aW9uRXh0cmFzKSAvL3JvdXRlIHRvIGZlZWRfZGV0YWlsKDEpXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgLy90aGlzLnVwZGF0ZU15RmVlZHNVSShudWxsLFwiVU5QT1NUXCIsc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBvbkl0ZW1TZWxlY3RlZChhcmdzKXtcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZEluZGV4ID0gYXJncy5pbmRleDtcbiAgICAgICAgICAgIC8vYWxlcnQoXCJzZWxlY3RlZCBpbmRleCBcIiArIHNlbGVjdGVkSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9hZE1vcmVGZWVkcygpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5ld3NGZWVkTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5DdXJzb3JfSW5kZXggPSB0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKHRoaXMubmV3c0ZlZWRMaXN0Lmxlbmd0aCAtIDEpLkZlZWRfSWQ7ICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uR2V0X05leHQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubG9hZEZlZWRMaXN0KCk7XG4gICAgICAgIH1cbiAgICAgICBcbiAgICAgICAgZmFiVGFwKCl7ICAgXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbXlmZWVkL25ld1wiXSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRJbm5lckh0bWwoZGVzYzogc3RyaW5nKSB7XG5cbiAgICAgICAgICAgIC8qY29uc3QgdG1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICAgICAgICB0bXAuaW5uZXJIVE1MID0gZGVzYztcbiAgICAgICAgICAgIGxldCBydG4gPSB0bXAudGV4dENvbnRlbnQgfHwgdG1wLmlubmVyVGV4dCB8fCAnJzsqL1xuICAgICAgICAgICAgbGV0IGRvdCA9ICcnO1xuXG4gICAgICAgICAgICB2YXIgcnRuID0gZGVzYy5yZXBsYWNlKC88XFwvP1tePl0rPi9pZywgXCIgXCIpO1xuICAgICAgICAgICAgcnRuID0gcnRuLnJlcGxhY2UoXCJcXG5cIixcIlwiKTtcbiAgICAgICAgICAgIHJ0biA9IHJ0bi5yZXBsYWNlKFwiJm5ic3A7XCIsXCJcIik7XG5cbiAgICAgICAgICAgIGlmIChydG4ubGVuZ3RoID4gMTAwKSB7IGRvdCA9ICcuLi4uLic7IH1cbiAgICBcbiAgICAgICAgICAgIHJ0biA9IHJ0bi5zdWJzdHJpbmcoMCwgMTAwKTtcbiAgICAgICAgICAgIGlmIChydG4ubGVuZ3RoID4wKSB7IHJldHVybiBydG4gKyBkb3Q7IH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb25TZWFyY2hGZWVkKCl7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbXlmZWVkL3NlYXJjaFwiXSk7XG4gICAgICAgIH1cbiAgICAgICAgb25GaWx0ZXJGZWVkKCl7XG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL215ZmVlZC9maWx0ZXJcIl0pO1xuICAgICAgICAgIC8vdGhpcy5yZWZyZXNoVUkoKTtcbiAgICAgICAgfVxuXG5cblxuICAgICAgICB1cGRhdGVNeUZlZWRzVUkoZmVlZDogRmVlZEluZm9ybWF0aW9uLGlzRmVlZFVwZGF0ZU9yQ3JlYXRlOnN0cmluZyxwb3NpdGlvbjpudW1iZXIpe1xuICAgICAgICAgICAgLy9hbGVydChcInVwZGF0ZSBteSBmZWVkTElzdFwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmVlZCBcIiArIEpTT04uc3RyaW5naWZ5KGZlZWQpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXBkYXRlIG15IGZlZWRMaXN0IFwiICsgaXNGZWVkVXBkYXRlT3JDcmVhdGUgKyBcIiBwb3NpdGlvbiBcIiArIHBvc2l0aW9uKTtcbiAgICAgICAgICAgIGlmKGlzRmVlZFVwZGF0ZU9yQ3JlYXRlID09IFwibmV3XCIpe1xuICAgICAgICAgICAgICAgIC8vYWxlcnQoXCJ1cGRhdGUgbXkgZmVlZExJc3RcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QudW5zaGlmdChmZWVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJhZExpc3RWaWV3LnJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiRmVlZCBzdWNjZXNzZnVsbHkgY3JlYXRlZCFcIik7XG4gICAgICAgICAgICAgICAgLy90aGlzLm5ld3NGZWVkTGlzdC5ub3RpZnk7XG4gICAgICAgICAgICB9ZWxzZSBpZihpc0ZlZWRVcGRhdGVPckNyZWF0ZSA9PSBcInVwZGF0ZVwiKXtcbiAgICAgICAgICAgICAgICAvL3RoaXMubmV3c0ZlZWRMaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7Ly8gMSwgMVxuICAgICAgICAgICAgICAgIC8vdGhpcy5uZXdzRmVlZExpc3Quc3BsaWNlKHBvc2l0aW9uLDAsZmVlZCk7Ly8xLGZlZWRcbiAgICAgICAgICAgICAgICAvL3RoaXMubmV3c0ZlZWRMaXN0Lm5vdGlmeTtcblxuICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0ocG9zaXRpb24pLkZlZWRfQ2F0ZWdvcnlfSWQgPSBmZWVkLkZlZWRfQ2F0ZWdvcnlfSWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuRmVlZF9DYXRlZ29yeV9OYW1lID0gZmVlZC5GZWVkX0NhdGVnb3J5X05hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuRmVlZFR5cGVfSWQgPSBmZWVkLkZlZWRUeXBlX0lkO1xuICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0ocG9zaXRpb24pLkZlZWRfVHlwZV9OYW1lID0gZmVlZC5GZWVkX1R5cGVfTmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKHBvc2l0aW9uKS5UaXRsZSA9IGZlZWQuVGl0bGU7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuRGVzY3JpcHRpb24gPSBmZWVkLkRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0ocG9zaXRpb24pLlBvc3RlZF9EYXRlID0gZmVlZC5Qb3N0ZWRfRGF0ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKHBvc2l0aW9uKS5Qb3N0X1N0YXR1cyA9IGZlZWQuUG9zdF9TdGF0dXM7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuTGFzdF9VcGRhdGVkX0J5ID0gZmVlZC5MYXN0X1VwZGF0ZWRfQnk7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuTGFzdF9VcGRhdGVkX09uID0gZmVlZC5MYXN0X1VwZGF0ZWRfT247XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuc3RhdHVzID0gZmVlZC5zdGF0dXM7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuTUNfRmVlZF9GaWxlcyA9IGZlZWQuTUNfRmVlZF9GaWxlcztcblxuICAgICAgICAgICAgICAgIC8vYWxlcnQoXCJGZWVkIHN1Y2Nlc3NmdWxseSB1cGRhdGVkIVwiKTtcblxuICAgICAgICAgICAgfWVsc2UgaWYoaXNGZWVkVXBkYXRlT3JDcmVhdGUgPT0gXCJVTlBPU1RcIiB8fCBpc0ZlZWRVcGRhdGVPckNyZWF0ZSA9PSBcIkFSQ0hJVkVcIil7XG4gICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBwb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidW5wb3N0IG15RmVlZHNcIik7XG4gICAgICAgICAgICAgICAgICAgIC8qbGV0IHRlbXBGZWVkTGlzdDpPYnNlcnZhYmxlQXJyYXk8RmVlZEluZm9ybWF0aW9uPiAgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEZlZWRJbmZvcm1hdGlvbj4oKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaTwgdGhpcy5uZXdzRmVlZExpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEZlZWRMaXN0LnNldEl0ZW0oaSx0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKGkpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL3RlbXBGZWVkTGlzdC5zcGxpY2UocG9zaXRpb24sMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxGZWVkSW5mb3JtYXRpb24+KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0ID0gdGVtcEZlZWRMaXN0O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvKnRoaXMubmV3c0ZlZWRMaXN0LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlbGVtZW50LlRpdGxlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7Ki9cblxuICAgICAgICAgICAgICAgICAgICAvKmlmKHRoaXMucmFkTGlzdFZpZXcgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxpc3R2aWV3IHJlZnJlc2hcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJhZExpc3RWaWV3LnJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsaXN0dmlldyBpcyBudWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIH0gICovICAgXG4gICAgXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSB0aGlzLm5ld3NGZWVkTGlzdC5pbmRleE9mKHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0ocG9zaXRpb24pKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3Quc3BsaWNlKGksMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiRmVlZCBzdWNjZXNzZnVsbHkgdW5wb3N0ZWQhXCIpOyAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZW1vdmUgXCIgKyBwb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuXG4gICAgICAgICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxzZSBpZihpc0ZlZWRVcGRhdGVPckNyZWF0ZSA9PSBcIk5PVElGWVwiKXtcbiAgICAgICAgICAgICAgICBhbGVydChcIkZlZWRzIHN1Y2Nlc3NmdWxseSBub3RpZmllZCFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgZ2V0TXlGZWVkc09iamVjdCgpe1xuICAgICAgICAgICAgcmV0dXJuIE15RmVlZHNDb21wb25lbnQubXlGZWVkc0NvbXBvbmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vZXZlbnQgbGlzdGVuXG59XG5cbmNsYXNzIERhdGFJdGVtIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IG51bWJlciwgcHVibGljIG5hbWU6IHN0cmluZykgeyB9XG59XG4iXX0=