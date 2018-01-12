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
var MyFeedSearchComponent = /** @class */ (function () {
    function MyFeedSearchComponent(router, route, routerExtensions, feedService, globalStorageService) {
        this.router = router;
        this.route = route;
        this.routerExtensions = routerExtensions;
        this.feedService = feedService;
        this.globalStorageService = globalStorageService;
        this.isLoading = false;
        this.feedFilterInfo = new myfeed_model_1.FeedFilter();
        this.showSearchSuggestion = false;
        this.showSearchResult = false;
        this.newsFeedList = new observable_array_1.ObservableArray();
        MyFeedSearchComponent_1.myFeedSearchComponent = this;
    }
    MyFeedSearchComponent_1 = MyFeedSearchComponent;
    MyFeedSearchComponent.prototype.ngOnInit = function () {
        this.searchHistoryList = new observable_array_1.ObservableArray();
        this.matchSearchKeyworkList = new observable_array_1.ObservableArray();
        // alert(localStorage.getItem('Another Plugin'));
        //alert(this.globalStorageService.getSaveKeyword('0'));
        var str = this.globalStorageService.getSaveKeyword('0');
        console.log("history --> " + str);
        if (str != null) {
            str = str.substring(1, str.length - 1);
            var myArray = str.split(",");
            this.searchHistoryList.push(myArray);
            /*console.log("searchKeywordLIst ==> " + JSON.stringify(myArray));
            console.log("length of list --> " + this.searchHistoryList.length);
            if(this.searchHistoryList.length > 0){
                for(var i = 0; i< this.searchHistoryList.length; i++){
                    console.log(this.searchHistoryList.getItem(i));
                  
                }
            }*/
            this.matchSearchKeyworkList = this.searchHistoryList;
        }
        //this.initialize();
        //this.loadFeedList();
        alert(this.isLoading);
    };
    MyFeedSearchComponent.prototype.ngAfterViewInit = function () {
        this.radListView = this.radListViewRef.nativeElement;
    };
    MyFeedSearchComponent.prototype.onNavBtnTap = function () {
        this.routerExtensions.backToPreviousPage();
    };
    MyFeedSearchComponent.prototype.onSaveSearchKeyword = function () {
        /*console.log("saving");
        //localStorage.setItem('Another Plugin', 'By Master Technology');
  
        this.searchKeywordList.push("a");
        this.searchKeywordList.push("b");
        this.searchKeywordList.push("c");
        this.searchKeywordList.push("d");

        this.globalStorageService.setSaveKeyword('0', JSON.stringify(this.searchKeywordList.toString()));
        //console.log("saved keyword " + JSON.stringify(stringify(this.searchKeywordList)));   */
        var _this = this;
        var arr = this.matchSearchKeyworkList.filter(function (str) { return str == _this.searchKeyword; });
        if (arr.length == 0) {
            this.searchHistoryList.push(this.searchKeyword);
            //this.matchSearchKeyworkList.push(this.searchKeyword);
            this.globalStorageService.setSaveKeyword('0', JSON.stringify(this.searchHistoryList.toString()));
            this.isLoading = true;
            this.showSearchSuggestion = false;
            this.newsFeedList = new observable_array_1.ObservableArray();
            alert(this.searchKeyword);
            this.initialize();
            this.loadFeedList();
        }
    };
    MyFeedSearchComponent.prototype.onTextChange = function (args) {
        this.showSearchSuggestion = true;
        this.showSearchResult = false;
        var textField = args.object;
        this.searchKeyword = textField.text.toLocaleLowerCase();
        this.searchInList();
    };
    MyFeedSearchComponent.prototype.searchInList = function () {
        var _this = this;
        if (this.searchHistoryList.length > 0) {
            for (var i = 0; i < this.searchHistoryList.length; i++) {
                console.log(this.searchHistoryList.getItem(i));
            }
        }
        this.matchSearchKeyworkList = this.searchHistoryList;
        var arrMatchList = this.matchSearchKeyworkList.filter(function (str) { return str.includes(_this.searchKeyword); });
        this.matchSearchKeyworkList = new observable_array_1.ObservableArray();
        this.matchSearchKeyworkList.push(arrMatchList);
    };
    /*
      var color_1 = require("color");

        var page;
        function navigatingTo(args) {
            page = args.object;
            var color = new color_1.Color("#CECECE");
            var textField = page.getViewById("textfield");
            if (page.android) {
                textField.android.setHintTextColor(color.android);
            }
            else if(page.ios){
                var placeholder = textField.ios.valueForKey("placeholderLabel");
                placeholder.textColor = color.ios;
            }
        }
        exports.navigatingTo = navigatingTo;
     */
    MyFeedSearchComponent.prototype.initialize = function () {
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
    MyFeedSearchComponent.prototype.loadFeedList = function () {
        var _this = this;
        this.busy = this.feedService.getNewsfeedlist(this.feedFilterInfo.Feed_Category_Id, this.feedFilterInfo.FeedType_Id, this.feedFilterInfo.Title, this.feedFilterInfo.SearchKeyword, this.feedFilterInfo.Posted_Date_From, this.feedFilterInfo.Posted_Date_To, this.feedFilterInfo.Created_From, this.feedFilterInfo.Created_To, this.feedFilterInfo.Cursor_Index, this.feedFilterInfo.Get_Next, this.feedFilterInfo.Page_Size, this.feedFilterInfo.Post_Status, this.feedFilterInfo.UnPost_Status, this.feedFilterInfo.isBlocked)
            .subscribe(function (res) {
            _this.isLoading = false;
            var feedList = Array();
            res.result.forEach(function (feed) {
                feedList.push(feed);
            });
            _this.newsFeedList.push(feedList);
            if (_this.newsFeedList.length > 0) {
                _this.showSearchResult = true;
            }
            console.log("loadFeedList --> " + JSON.stringify(res));
        });
    };
    MyFeedSearchComponent.prototype.onLoadMoreItemsRequested = function (args) {
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
    MyFeedSearchComponent.prototype.onItemTap = function (args) {
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
    MyFeedSearchComponent.prototype.onSearchHistoryItemTap = function (args) {
        var selectedIndex = args.index;
        var search_keyword = this.matchSearchKeyworkList.getItem(selectedIndex);
        this.searchKeyword = search_keyword;
        this.isLoading = true;
        this.showSearchSuggestion = false;
        this.newsFeedList = new observable_array_1.ObservableArray();
        this.initialize();
        this.loadFeedList();
    };
    MyFeedSearchComponent.prototype.loadMoreFeeds = function () {
        if (this.newsFeedList.length > 0) {
            this.feedFilterInfo.Cursor_Index = this.newsFeedList.getItem(this.newsFeedList.length - 1).Feed_Id;
            this.feedFilterInfo.Get_Next = false;
        }
        this.loadFeedList();
    };
    MyFeedSearchComponent.prototype.getInnerHtml = function (desc) {
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
    MyFeedSearchComponent.prototype.updateMyFeedsUI = function (feed, isFeedUpdateOrCreate, position) {
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
    MyFeedSearchComponent.getMyFeedsSearchObject = function () {
        return MyFeedSearchComponent_1.myFeedSearchComponent;
    };
    __decorate([
        core_1.ViewChild("radListView"),
        __metadata("design:type", core_1.ElementRef)
    ], MyFeedSearchComponent.prototype, "radListViewRef", void 0);
    MyFeedSearchComponent = MyFeedSearchComponent_1 = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-myfeedsearch',
            templateUrl: 'myfeedsearch.html',
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, router_2.RouterExtensions, myfeed_service_1.MyFeedService, globalstorage_service_1.GlobalStorageService])
    ], MyFeedSearchComponent);
    return MyFeedSearchComponent;
    var MyFeedSearchComponent_1;
}());
exports.MyFeedSearchComponent = MyFeedSearchComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlmZWVkc2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15ZmVlZHNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0U7QUFDeEUsMENBQXlFO0FBQ3pFLHNEQUE2RDtBQUU3RCxzREFBa0c7QUFDbEcsNkRBQTJEO0FBVTNELE9BQU8sQ0FBRSwyQkFBMkIsQ0FBRSxDQUFDO0FBQ3ZDLGtGQUErRTtBQUMvRSwyRUFBeUU7QUFLekUsOENBQWdEO0FBQ2hELElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7QUFXbEY7SUFnQkksK0JBQW9CLE1BQWMsRUFBUyxLQUFxQixFQUFTLGdCQUFrQyxFQUFTLFdBQXlCLEVBQVUsb0JBQXlDO1FBQTVLLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQUFVLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFiaE0sY0FBUyxHQUFZLEtBQUssQ0FBQztRQUszQixtQkFBYyxHQUFlLElBQUkseUJBQVUsRUFBRSxDQUFDO1FBQzlDLHlCQUFvQixHQUFXLEtBQUssQ0FBQztRQUNyQyxxQkFBZ0IsR0FBVyxLQUFLLENBQUM7UUFPN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFLLGtDQUFlLEVBQW1CLENBQUM7UUFDNUQsdUJBQXFCLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO0lBQ3ZELENBQUM7OEJBbkJRLHFCQUFxQjtJQXFCOUIsd0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGtDQUFlLEVBQVUsQ0FBQztRQUN2RCxJQUFJLENBQUMsc0JBQXNCLEdBQUUsSUFBSSxrQ0FBZSxFQUFVLENBQUM7UUFFNUQsaURBQWlEO1FB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QUMxQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLDRDQUFzQixHQUE3QjtRQUNJLE1BQU0sQ0FBQyx1QkFBcUIsQ0FBQyxxQkFBcUIsQ0FBQztJQUN2RCxDQUFDO0lBMVN5QjtRQUF6QixnQkFBUyxDQUFDLGFBQWEsQ0FBQztrQ0FBaUIsaUJBQVU7aUVBQUM7SUFmNUMscUJBQXFCO1FBUGpDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixXQUFXLEVBQUUsbUJBQW1CO1NBRW5DLENBQUM7eUNBa0I4QixlQUFNLEVBQWdCLHVCQUFjLEVBQTJCLHlCQUFnQixFQUFxQiw4QkFBYSxFQUErQiw0Q0FBb0I7T0FoQnZMLHFCQUFxQixDQTBUakM7SUFBRCw0QkFBQzs7Q0FBQSxBQTFURCxJQTBUQztBQTFUWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgT25Jbml0LEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUsTmF2aWdhdGlvbkV4dHJhc30gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGZWVkSW5mb3JtYXRpb24sIEZlZWRUeXBlLCBGZWVkQ2F0ZWdvcnksIEZlZWRGaWx0ZXIsIFJvbGUgfSBmcm9tICcuLi9tb2RlbC9teWZlZWQubW9kZWwnO1xuaW1wb3J0IHsgTXlGZWVkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL215ZmVlZC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbW1vblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMvY29tbW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy9jb25maWcuc2VydmljZSc7XG5cbmltcG9ydCB7IFZhbHVlTGlzdCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XG5pbXBvcnQgeyBEcm9wRG93biB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2Ryb3AtZG93blwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XG5pbXBvcnQgeyBEcm9wRG93blZhbHVlUGFpciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbnJlcXVpcmUoIFwibmF0aXZlc2NyaXB0LWxvY2Fsc3RvcmFnZVwiICk7XG5pbXBvcnQgeyBHbG9iYWxTdG9yYWdlU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0b3JlL2dsb2JhbHN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBpc0lPU30gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5pbXBvcnQge1JhZExpc3RWaWV3LExpc3RWaWV3TGluZWFyTGF5b3V0LCBMaXN0Vmlld0V2ZW50RGF0YSwgTGlzdFZpZXdMb2FkT25EZW1hbmRNb2RlfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9saXN0dmlld1wiO1xuaW1wb3J0ICogYXMgVGltZXIgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdGltZXJcIjtcbnZhciBMb2FkaW5nSW5kaWNhdG9yID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiKS5Mb2FkaW5nSW5kaWNhdG9yO1xuXG5cblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2FwcC1teWZlZWRzZWFyY2gnLFxuICAgIHRlbXBsYXRlVXJsOiAnbXlmZWVkc2VhcmNoLmh0bWwnLFxuICAgIC8vc3R5bGVVcmxzOiBbJy4vbXlmZWVkc2VhcmNoLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIE15RmVlZFNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBidXN5OiBTdWJzY3JpcHRpb247XG4gICAgaXNMb2FkaW5nOiBCb29sZWFuID0gZmFsc2U7XG4gICAgc2VhcmNoSGlzdG9yeUxpc3Q6T2JzZXJ2YWJsZUFycmF5PHN0cmluZz47XG4gICAgbWF0Y2hTZWFyY2hLZXl3b3JrTGlzdDpPYnNlcnZhYmxlQXJyYXk8c3RyaW5nPjtcbiAgICBzZWFyY2hLZXl3b3JkOnN0cmluZztcbiAgICBuZXdzRmVlZExpc3Q6IE9ic2VydmFibGVBcnJheTxGZWVkSW5mb3JtYXRpb24+O1xuICAgIGZlZWRGaWx0ZXJJbmZvOiBGZWVkRmlsdGVyID0gbmV3IEZlZWRGaWx0ZXIoKTtcbiAgICBzaG93U2VhcmNoU3VnZ2VzdGlvbjpib29sZWFuID0gZmFsc2U7XG4gICAgc2hvd1NlYXJjaFJlc3VsdDpib29sZWFuID0gZmFsc2U7XG4gICAgcmFkTGlzdFZpZXc6UmFkTGlzdFZpZXc7XG4gICAgc3RhdGljIG15RmVlZFNlYXJjaENvbXBvbmVudDpNeUZlZWRTZWFyY2hDb21wb25lbnQ7XG5cbiAgICAvL0BWaWV3Q2hpbGQoXCJwYWdlXCIpIHBhZ2VSZWY6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcInJhZExpc3RWaWV3XCIpIHJhZExpc3RWaWV3UmVmOiBFbGVtZW50UmVmO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIscHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUscHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLHByaXZhdGUgZmVlZFNlcnZpY2U6TXlGZWVkU2VydmljZSwgcHJpdmF0ZSBnbG9iYWxTdG9yYWdlU2VydmljZTpHbG9iYWxTdG9yYWdlU2VydmljZSl7IFxuICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdCA9IG5ldyAgT2JzZXJ2YWJsZUFycmF5PEZlZWRJbmZvcm1hdGlvbj4oKTtcbiAgICAgICAgTXlGZWVkU2VhcmNoQ29tcG9uZW50Lm15RmVlZFNlYXJjaENvbXBvbmVudCA9IHRoaXM7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKXtcbiAgICAgICAgdGhpcy5zZWFyY2hIaXN0b3J5TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8c3RyaW5nPigpO1xuICAgICAgICB0aGlzLm1hdGNoU2VhcmNoS2V5d29ya0xpc3Q9IG5ldyBPYnNlcnZhYmxlQXJyYXk8c3RyaW5nPigpO1xuICAgICAgIFxuICAgICAgIC8vIGFsZXJ0KGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdBbm90aGVyIFBsdWdpbicpKTtcbiAgICAgICAvL2FsZXJ0KHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0U2F2ZUtleXdvcmQoJzAnKSk7XG4gICAgICAgIGxldCBzdHIgPSB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldFNhdmVLZXl3b3JkKCcwJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGlzdG9yeSAtLT4gXCIgKyBzdHIpO1xuICAgICAgICBpZihzdHIgIT0gbnVsbCl7XG4gICAgICAgICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDEsc3RyLmxlbmd0aC0xKTtcbiAgICAgICAgICAgIGxldCBteUFycmF5ID0gc3RyLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoSGlzdG9yeUxpc3QucHVzaChteUFycmF5KVxuICAgICAgICAgICAgLypjb25zb2xlLmxvZyhcInNlYXJjaEtleXdvcmRMSXN0ID09PiBcIiArIEpTT04uc3RyaW5naWZ5KG15QXJyYXkpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGVuZ3RoIG9mIGxpc3QgLS0+IFwiICsgdGhpcy5zZWFyY2hIaXN0b3J5TGlzdC5sZW5ndGgpO1xuICAgICAgICAgICAgaWYodGhpcy5zZWFyY2hIaXN0b3J5TGlzdC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpPCB0aGlzLnNlYXJjaEhpc3RvcnlMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zZWFyY2hIaXN0b3J5TGlzdC5nZXRJdGVtKGkpKTtcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0qL1xuXG4gICAgICAgICAgICB0aGlzLm1hdGNoU2VhcmNoS2V5d29ya0xpc3QgPSB0aGlzLnNlYXJjaEhpc3RvcnlMaXN0O1xuXG4gICAgICAgIH1cblxuICAgICAgICAvL3RoaXMuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAvL3RoaXMubG9hZEZlZWRMaXN0KCk7XG4gICAgICAgIGFsZXJ0KHRoaXMuaXNMb2FkaW5nKTtcbiAgICB9XG5cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5yYWRMaXN0VmlldyA9IDxSYWRMaXN0Vmlldz50aGlzLnJhZExpc3RWaWV3UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgXG4gICAgfVxuXG4gICAgb25OYXZCdG5UYXAoKXtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuICAgIH1cbiAgXG4gICAgb25TYXZlU2VhcmNoS2V5d29yZCgpe1xuICAgICAgICAvKmNvbnNvbGUubG9nKFwic2F2aW5nXCIpO1xuICAgICAgICAvL2xvY2FsU3RvcmFnZS5zZXRJdGVtKCdBbm90aGVyIFBsdWdpbicsICdCeSBNYXN0ZXIgVGVjaG5vbG9neScpO1xuICBcbiAgICAgICAgdGhpcy5zZWFyY2hLZXl3b3JkTGlzdC5wdXNoKFwiYVwiKTtcbiAgICAgICAgdGhpcy5zZWFyY2hLZXl3b3JkTGlzdC5wdXNoKFwiYlwiKTtcbiAgICAgICAgdGhpcy5zZWFyY2hLZXl3b3JkTGlzdC5wdXNoKFwiY1wiKTtcbiAgICAgICAgdGhpcy5zZWFyY2hLZXl3b3JkTGlzdC5wdXNoKFwiZFwiKTtcblxuICAgICAgICB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLnNldFNhdmVLZXl3b3JkKCcwJywgSlNPTi5zdHJpbmdpZnkodGhpcy5zZWFyY2hLZXl3b3JkTGlzdC50b1N0cmluZygpKSk7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJzYXZlZCBrZXl3b3JkIFwiICsgSlNPTi5zdHJpbmdpZnkoc3RyaW5naWZ5KHRoaXMuc2VhcmNoS2V5d29yZExpc3QpKSk7ICAgKi9cblxuICAgICAgICB2YXIgYXJyID0gdGhpcy5tYXRjaFNlYXJjaEtleXdvcmtMaXN0LmZpbHRlcihzdHIgPT4gc3RyID09IHRoaXMuc2VhcmNoS2V5d29yZCk7XG4gICAgICAgIGlmKGFyci5sZW5ndGggPT0gMCl7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaEhpc3RvcnlMaXN0LnB1c2godGhpcy5zZWFyY2hLZXl3b3JkKTtcbiAgICAgICAgICAgIC8vdGhpcy5tYXRjaFNlYXJjaEtleXdvcmtMaXN0LnB1c2godGhpcy5zZWFyY2hLZXl3b3JkKTtcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2Uuc2V0U2F2ZUtleXdvcmQoJzAnLCBKU09OLnN0cmluZ2lmeSh0aGlzLnNlYXJjaEhpc3RvcnlMaXN0LnRvU3RyaW5nKCkpKTtcblxuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zaG93U2VhcmNoU3VnZ2VzdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEZlZWRJbmZvcm1hdGlvbj4oKTtcbiAgICAgICAgICAgIGFsZXJ0KHRoaXMuc2VhcmNoS2V5d29yZCk7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICAgICAgICAgIHRoaXMubG9hZEZlZWRMaXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5zaG93U2VhcmNoU3VnZ2VzdGlvbiA9IHRydWU7XG4gICAgICAgIHRoaXMuc2hvd1NlYXJjaFJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBsZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5zZWFyY2hLZXl3b3JkID0gdGV4dEZpZWxkLnRleHQudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy5zZWFyY2hJbkxpc3QoKTtcbiAgICB9XG5cbiAgICBzZWFyY2hJbkxpc3QoKXtcbiAgICAgICAgaWYodGhpcy5zZWFyY2hIaXN0b3J5TGlzdC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGk8IHRoaXMuc2VhcmNoSGlzdG9yeUxpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2VhcmNoSGlzdG9yeUxpc3QuZ2V0SXRlbShpKSk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubWF0Y2hTZWFyY2hLZXl3b3JrTGlzdCA9IHRoaXMuc2VhcmNoSGlzdG9yeUxpc3Q7XG4gICAgICAgIHZhciBhcnJNYXRjaExpc3QgPSB0aGlzLm1hdGNoU2VhcmNoS2V5d29ya0xpc3QuZmlsdGVyKHN0ciA9PiBzdHIuaW5jbHVkZXModGhpcy5zZWFyY2hLZXl3b3JkKSk7XG4gICAgICAgIHRoaXMubWF0Y2hTZWFyY2hLZXl3b3JrTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8c3RyaW5nPigpO1xuICAgICAgICB0aGlzLm1hdGNoU2VhcmNoS2V5d29ya0xpc3QucHVzaChhcnJNYXRjaExpc3QpO1xuICAgIH1cbiAgICAvKiBcbiAgICAgIHZhciBjb2xvcl8xID0gcmVxdWlyZShcImNvbG9yXCIpO1xuXG4gICAgICAgIHZhciBwYWdlO1xuICAgICAgICBmdW5jdGlvbiBuYXZpZ2F0aW5nVG8oYXJncykge1xuICAgICAgICAgICAgcGFnZSA9IGFyZ3Mub2JqZWN0O1xuICAgICAgICAgICAgdmFyIGNvbG9yID0gbmV3IGNvbG9yXzEuQ29sb3IoXCIjQ0VDRUNFXCIpO1xuICAgICAgICAgICAgdmFyIHRleHRGaWVsZCA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJ0ZXh0ZmllbGRcIik7XG4gICAgICAgICAgICBpZiAocGFnZS5hbmRyb2lkKSB7XG4gICAgICAgICAgICAgICAgdGV4dEZpZWxkLmFuZHJvaWQuc2V0SGludFRleHRDb2xvcihjb2xvci5hbmRyb2lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYocGFnZS5pb3Mpe1xuICAgICAgICAgICAgICAgIHZhciBwbGFjZWhvbGRlciA9IHRleHRGaWVsZC5pb3MudmFsdWVGb3JLZXkoXCJwbGFjZWhvbGRlckxhYmVsXCIpO1xuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyLnRleHRDb2xvciA9IGNvbG9yLmlvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBleHBvcnRzLm5hdmlnYXRpbmdUbyA9IG5hdmlnYXRpbmdUbztcbiAgICAgKi9cblxuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uRmVlZF9DYXRlZ29yeV9JZCA9IG51bGw7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uRmVlZFR5cGVfSWQgPSBudWxsO1xuICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlRpdGxlID0gbnVsbDtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5TZWFyY2hLZXl3b3JkID0gdGhpcy5zZWFyY2hLZXl3b3JkO1xuICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlBvc3RlZF9EYXRlX0Zyb20gPSBudWxsO1xuICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlBvc3RlZF9EYXRlX1RvID0gbnVsbDtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5DcmVhdGVkX0Zyb20gPSBudWxsO1xuICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkNyZWF0ZWRfVG8gPSBudWxsO1xuICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkN1cnNvcl9JbmRleCA9IG51bGw7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uR2V0X05leHQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5QYWdlX1NpemUgPSAxMDtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5Qb3N0X1N0YXR1cyA9IHRydWU7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uVW5Qb3N0X1N0YXR1cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLmlzQmxvY2tlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGxvYWRGZWVkTGlzdCgpIHtcbiAgICAgICAgdGhpcy5idXN5ID0gdGhpcy5mZWVkU2VydmljZS5nZXROZXdzZmVlZGxpc3QodGhpcy5mZWVkRmlsdGVySW5mby5GZWVkX0NhdGVnb3J5X0lkLCBcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uRmVlZFR5cGVfSWQsXG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlRpdGxlLCBcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uU2VhcmNoS2V5d29yZCwgXG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlBvc3RlZF9EYXRlX0Zyb20sIFxuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5Qb3N0ZWRfRGF0ZV9UbywgXG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkNyZWF0ZWRfRnJvbSwgXG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkNyZWF0ZWRfVG8sIFxuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5DdXJzb3JfSW5kZXgsIFxuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5HZXRfTmV4dCwgXG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlBhZ2VfU2l6ZSwgXG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlBvc3RfU3RhdHVzLCBcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uVW5Qb3N0X1N0YXR1cywgXG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLmlzQmxvY2tlZClcblxuICAgICAgICAgICBcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlOyBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgZmVlZExpc3QgPSBBcnJheTxGZWVkSW5mb3JtYXRpb24+KCk7ICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXMucmVzdWx0LmZvckVhY2goZmVlZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgZmVlZExpc3QucHVzaCg8RmVlZEluZm9ybWF0aW9uPmZlZWQpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QucHVzaChmZWVkTGlzdCk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5uZXdzRmVlZExpc3QubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlYXJjaFJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2FkRmVlZExpc3QgLS0+IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzKSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25Mb2FkTW9yZUl0ZW1zUmVxdWVzdGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgICAgIHZhciB0aGF0ID0gbmV3IFdlYWtSZWYodGhpcyk7XG4gICAgICAgIHZhciBsaXN0VmlldzogUmFkTGlzdFZpZXcgPSBhcmdzLm9iamVjdDtcbiAgICAgICAgbGV0IGFyckxlbmd0aCA9IHRoYXQuZ2V0KCkubmV3c0ZlZWRMaXN0Lmxlbmd0aDtcblxuICAgICAgICBUaW1lci5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoYXQuZ2V0KCkubG9hZE1vcmVGZWVkcygpO1xuICAgICAgICAgICAgbGlzdFZpZXcubm90aWZ5TG9hZE9uRGVtYW5kRmluaXNoZWQoKTtcbiAgICAgICAgICAgXG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgICAvL31cbiAgICAgICAgYXJncy5yZXR1cm5WYWx1ZSA9IHRydWU7XG4gICAgfVxuXG5cbiAgICBvbkl0ZW1UYXAoYXJncykge1xuICAgICAgICBsZXQgc2VsZWN0ZWRJbmRleDpudW1iZXIgPSA8bnVtYmVyPmFyZ3MuaW5kZXg7XG4gICAgICAgIHZhciBmZWVkID0gdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShzZWxlY3RlZEluZGV4KTtcbiAgICAgICAgbGV0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICAgICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICAgICAgICAgIFwiQ2FsbGVyQ2xhc3NcIiA6IFwiTXlGZWVkU2VhcmNoQ29tcG9uZW50XCIsXG4gICAgICAgICAgICAgICAgXCJTZWxlY3RlZFBvc2l0aW9uXCIgOiBzZWxlY3RlZEluZGV4LFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbXlmZWVkL1wiKyBmZWVkLkZlZWRfSWQrIFwiL3ZpZXdcIl0sbmF2aWdhdGlvbkV4dHJhcykgLy9yb3V0ZSB0byBmZWVkX2RldGFpbCgxKVxuICAgICAgICBcbiAgICAgICAgXG4gICAgfVxuICAgIG9uU2VhcmNoSGlzdG9yeUl0ZW1UYXAoYXJncykgeyBcbiAgICAgICAgdmFyIHNlbGVjdGVkSW5kZXggPSBhcmdzLmluZGV4OyAgIFxuICAgICAgICB2YXIgc2VhcmNoX2tleXdvcmQgPSB0aGlzLm1hdGNoU2VhcmNoS2V5d29ya0xpc3QuZ2V0SXRlbShzZWxlY3RlZEluZGV4KTtcbiAgICAgICAgdGhpcy5zZWFyY2hLZXl3b3JkID0gc2VhcmNoX2tleXdvcmRcblxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuc2hvd1NlYXJjaFN1Z2dlc3Rpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEZlZWRJbmZvcm1hdGlvbj4oKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgICAgIHRoaXMubG9hZEZlZWRMaXN0KCk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGxvYWRNb3JlRmVlZHMoKSB7XG4gICAgICAgIGlmICh0aGlzLm5ld3NGZWVkTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkN1cnNvcl9JbmRleCA9IHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0odGhpcy5uZXdzRmVlZExpc3QubGVuZ3RoIC0gMSkuRmVlZF9JZDtcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uR2V0X05leHQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvYWRGZWVkTGlzdCgpO1xuICAgIH1cblxuICAgIGdldElubmVySHRtbChkZXNjOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGRvdCA9ICcnOyAgICAgICAgXG4gICAgICAgIHZhciBydG4gPSBkZXNjLnJlcGxhY2UoLzxcXC8/W14+XSs+L2lnLCBcIiBcIik7XG4gICAgICAgIHJ0biA9IHJ0bi5yZXBsYWNlKFwiXFxuXCIsXCJcIik7XG4gICAgICAgIHJ0biA9IHJ0bi5yZXBsYWNlKFwiJm5ic3A7XCIsXCJcIik7XG4gICAgICAgIFxuICAgICAgICBpZiAocnRuLmxlbmd0aCA+IDEwMCkgeyBkb3QgPSAnLi4uLi4nOyB9XG4gICAgICAgICAgICBcbiAgICAgICAgcnRuID0gcnRuLnN1YnN0cmluZygwLCAxMDApO1xuICAgICAgICBpZiAocnRuLmxlbmd0aCA+MCkgeyByZXR1cm4gcnRuICsgZG90OyB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlTXlGZWVkc1VJKGZlZWQ6IEZlZWRJbmZvcm1hdGlvbixpc0ZlZWRVcGRhdGVPckNyZWF0ZTpzdHJpbmcscG9zaXRpb246bnVtYmVyKXtcbiAgICAgICAgLy9hbGVydChcInVwZGF0ZSBteSBmZWVkTElzdFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJmZWVkIFwiICsgSlNPTi5zdHJpbmdpZnkoZmVlZCkpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInVwZGF0ZSBteSBmZWVkTGlzdCBcIiArIGlzRmVlZFVwZGF0ZU9yQ3JlYXRlICsgXCIgcG9zaXRpb24gXCIgKyBwb3NpdGlvbik7XG4gICAgICAgIGlmKGlzRmVlZFVwZGF0ZU9yQ3JlYXRlID09IFwibmV3XCIpe1xuICAgICAgICAgICAgLy9hbGVydChcInVwZGF0ZSBteSBmZWVkTElzdFwiKTtcbiAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LnVuc2hpZnQoZmVlZCk7XG4gICAgICAgICAgICB0aGlzLnJhZExpc3RWaWV3LnJlZnJlc2goKTtcbiAgICAgICAgICAgIC8vYWxlcnQoXCJGZWVkIHN1Y2Nlc3NmdWxseSBjcmVhdGVkIVwiKTtcbiAgICAgICAgICAgIC8vdGhpcy5uZXdzRmVlZExpc3Qubm90aWZ5O1xuICAgICAgICB9ZWxzZSBpZihpc0ZlZWRVcGRhdGVPckNyZWF0ZSA9PSBcInVwZGF0ZVwiKXtcbiAgICAgICAgICAgIC8vdGhpcy5uZXdzRmVlZExpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTsvLyAxLCAxXG4gICAgICAgICAgICAvL3RoaXMubmV3c0ZlZWRMaXN0LnNwbGljZShwb3NpdGlvbiwwLGZlZWQpOy8vMSxmZWVkXG4gICAgICAgICAgICAvL3RoaXMubmV3c0ZlZWRMaXN0Lm5vdGlmeTtcblxuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuRmVlZF9DYXRlZ29yeV9JZCA9IGZlZWQuRmVlZF9DYXRlZ29yeV9JZDtcbiAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0ocG9zaXRpb24pLkZlZWRfQ2F0ZWdvcnlfTmFtZSA9IGZlZWQuRmVlZF9DYXRlZ29yeV9OYW1lO1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuRmVlZFR5cGVfSWQgPSBmZWVkLkZlZWRUeXBlX0lkO1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuRmVlZF9UeXBlX05hbWUgPSBmZWVkLkZlZWRfVHlwZV9OYW1lO1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuVGl0bGUgPSBmZWVkLlRpdGxlO1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuRGVzY3JpcHRpb24gPSBmZWVkLkRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuUG9zdGVkX0RhdGUgPSBmZWVkLlBvc3RlZF9EYXRlO1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuUG9zdF9TdGF0dXMgPSBmZWVkLlBvc3RfU3RhdHVzO1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuTGFzdF9VcGRhdGVkX0J5ID0gZmVlZC5MYXN0X1VwZGF0ZWRfQnk7XG4gICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKHBvc2l0aW9uKS5MYXN0X1VwZGF0ZWRfT24gPSBmZWVkLkxhc3RfVXBkYXRlZF9PbjtcbiAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0ocG9zaXRpb24pLnN0YXR1cyA9IGZlZWQuc3RhdHVzO1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuTUNfRmVlZF9GaWxlcyA9IGZlZWQuTUNfRmVlZF9GaWxlcztcblxuICAgICAgICAgICAgLy9hbGVydChcIkZlZWQgc3VjY2Vzc2Z1bGx5IHVwZGF0ZWQhXCIpO1xuXG4gICAgICAgIH1lbHNlIGlmKGlzRmVlZFVwZGF0ZU9yQ3JlYXRlID09IFwiVU5QT1NUXCIgfHwgaXNGZWVkVXBkYXRlT3JDcmVhdGUgPT0gXCJBUkNISVZFXCIpe1xuICAgICAgICAgICAgdHJ5e1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1bnBvc3QgbXlGZWVkc1wiKTtcbiAgICAgICAgICAgICAgICAvKmxldCB0ZW1wRmVlZExpc3Q6T2JzZXJ2YWJsZUFycmF5PEZlZWRJbmZvcm1hdGlvbj4gID0gbmV3IE9ic2VydmFibGVBcnJheTxGZWVkSW5mb3JtYXRpb24+KCk7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaTwgdGhpcy5uZXdzRmVlZExpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICB0ZW1wRmVlZExpc3Quc2V0SXRlbShpLHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0oaSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL3RlbXBGZWVkTGlzdC5zcGxpY2UocG9zaXRpb24sMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEZlZWRJbmZvcm1hdGlvbj4oKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdCA9IHRlbXBGZWVkTGlzdDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8qdGhpcy5uZXdzRmVlZExpc3QuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbWVudC5UaXRsZSk7XG4gICAgICAgICAgICAgICAgfSk7Ki9cblxuICAgICAgICAgICAgICAgIC8qaWYodGhpcy5yYWRMaXN0VmlldyAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsaXN0dmlldyByZWZyZXNoXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJhZExpc3RWaWV3LnJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGlzdHZpZXcgaXMgbnVsbFwiKVxuICAgICAgICAgICAgICAgIH0gICovICAgXG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSB0aGlzLm5ld3NGZWVkTGlzdC5pbmRleE9mKHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0ocG9zaXRpb24pKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdC5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICAgICAgLy9hbGVydChcIkZlZWQgc3VjY2Vzc2Z1bGx5IHVucG9zdGVkIVwiKTsgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZW1vdmUgXCIgKyBwb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgfSwgMjAwMCk7XG5cbiAgICAgICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH1cbiAgXG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmKGlzRmVlZFVwZGF0ZU9yQ3JlYXRlID09IFwiTk9USUZZXCIpe1xuICAgICAgICAgICAgYWxlcnQoXCJGZWVkcyBzdWNjZXNzZnVsbHkgbm90aWZpZWQhXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldE15RmVlZHNTZWFyY2hPYmplY3QoKXtcbiAgICAgICAgcmV0dXJuIE15RmVlZFNlYXJjaENvbXBvbmVudC5teUZlZWRTZWFyY2hDb21wb25lbnQ7XG4gICAgfVxufVxuXG5cbiJdfQ==