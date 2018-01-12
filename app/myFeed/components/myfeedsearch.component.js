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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlmZWVkc2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15ZmVlZHNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0U7QUFDeEUsMENBQXlFO0FBQ3pFLHNEQUE2RDtBQUU3RCxzREFBa0c7QUFDbEcsNkRBQTJEO0FBVTNELE9BQU8sQ0FBRSwyQkFBMkIsQ0FBRSxDQUFDO0FBQ3ZDLGtGQUErRTtBQUMvRSwyRUFBeUU7QUFLekUsOENBQWdEO0FBQ2hELElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7QUFXbEY7SUFnQkksK0JBQW9CLE1BQWMsRUFBUyxLQUFxQixFQUFTLGdCQUFrQyxFQUFTLFdBQXlCLEVBQVUsb0JBQXlDO1FBQTVLLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQUFVLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFiaE0sY0FBUyxHQUFZLEtBQUssQ0FBQztRQUszQixtQkFBYyxHQUFlLElBQUkseUJBQVUsRUFBRSxDQUFDO1FBQzlDLHlCQUFvQixHQUFXLEtBQUssQ0FBQztRQUNyQyxxQkFBZ0IsR0FBVyxLQUFLLENBQUM7UUFPN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFLLGtDQUFlLEVBQW1CLENBQUM7UUFDNUQsdUJBQXFCLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO0lBQ3ZELENBQUM7OEJBbkJRLHFCQUFxQjtJQXFCOUIsd0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGtDQUFlLEVBQVUsQ0FBQztRQUN2RCxJQUFJLENBQUMsc0JBQXNCLEdBQUUsSUFBSSxrQ0FBZSxFQUFVLENBQUM7UUFFNUQsaURBQWlEO1FB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QUMxQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLDRDQUFzQixHQUE3QjtRQUNJLE1BQU0sQ0FBQyx1QkFBcUIsQ0FBQyxxQkFBcUIsQ0FBQztJQUN2RCxDQUFDO0lBMVN5QjtRQUF6QixnQkFBUyxDQUFDLGFBQWEsQ0FBQztrQ0FBaUIsaUJBQVU7aUVBQUM7SUFmNUMscUJBQXFCO1FBUGpDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixXQUFXLEVBQUUsbUJBQW1CO1NBRW5DLENBQUM7eUNBa0I4QixlQUFNLEVBQWdCLHVCQUFjLEVBQTJCLHlCQUFnQixFQUFxQiw4QkFBYSxFQUErQiw0Q0FBb0I7T0FoQnZMLHFCQUFxQixDQTBUakM7SUFBRCw0QkFBQzs7Q0FBQSxBQTFURCxJQTBUQztBQTFUWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgT25Jbml0LEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUsTmF2aWdhdGlvbkV4dHJhc30gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGZWVkSW5mb3JtYXRpb24sIEZlZWRUeXBlLCBGZWVkQ2F0ZWdvcnksIEZlZWRGaWx0ZXIsIFJvbGUgfSBmcm9tICcuLi9tb2RlbC9teWZlZWQubW9kZWwnO1xuaW1wb3J0IHsgTXlGZWVkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL215ZmVlZC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbW1vblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMvY29tbW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy9jb25maWcuc2VydmljZSc7XG5cbmltcG9ydCB7IFZhbHVlTGlzdCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XG5pbXBvcnQgeyBEcm9wRG93biB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2Ryb3AtZG93blwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XG5pbXBvcnQgeyBEcm9wRG93blZhbHVlUGFpciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbnJlcXVpcmUoIFwibmF0aXZlc2NyaXB0LWxvY2Fsc3RvcmFnZVwiICk7XG5pbXBvcnQgeyBHbG9iYWxTdG9yYWdlU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0b3JlL2dsb2JhbHN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBpc0lPU30gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5pbXBvcnQge1JhZExpc3RWaWV3LExpc3RWaWV3TGluZWFyTGF5b3V0LCBMaXN0Vmlld0V2ZW50RGF0YSwgTGlzdFZpZXdMb2FkT25EZW1hbmRNb2RlfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9saXN0dmlld1wiO1xuaW1wb3J0ICogYXMgVGltZXIgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdGltZXJcIjtcbnZhciBMb2FkaW5nSW5kaWNhdG9yID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiKS5Mb2FkaW5nSW5kaWNhdG9yO1xuXG5cblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2FwcC1teWZlZWRzZWFyY2gnLFxuICAgIHRlbXBsYXRlVXJsOiAnbXlmZWVkc2VhcmNoLmh0bWwnLFxuICAgIC8vc3R5bGVVcmxzOiBbJy4vbXlmZWVkc2VhcmNoLmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgTXlGZWVkU2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGJ1c3k6IFN1YnNjcmlwdGlvbjtcbiAgICBpc0xvYWRpbmc6IEJvb2xlYW4gPSBmYWxzZTtcbiAgICBzZWFyY2hIaXN0b3J5TGlzdDpPYnNlcnZhYmxlQXJyYXk8c3RyaW5nPjtcbiAgICBtYXRjaFNlYXJjaEtleXdvcmtMaXN0Ok9ic2VydmFibGVBcnJheTxzdHJpbmc+O1xuICAgIHNlYXJjaEtleXdvcmQ6c3RyaW5nO1xuICAgIG5ld3NGZWVkTGlzdDogT2JzZXJ2YWJsZUFycmF5PEZlZWRJbmZvcm1hdGlvbj47XG4gICAgZmVlZEZpbHRlckluZm86IEZlZWRGaWx0ZXIgPSBuZXcgRmVlZEZpbHRlcigpO1xuICAgIHNob3dTZWFyY2hTdWdnZXN0aW9uOmJvb2xlYW4gPSBmYWxzZTtcbiAgICBzaG93U2VhcmNoUmVzdWx0OmJvb2xlYW4gPSBmYWxzZTtcbiAgICByYWRMaXN0VmlldzpSYWRMaXN0VmlldztcbiAgICBzdGF0aWMgbXlGZWVkU2VhcmNoQ29tcG9uZW50Ok15RmVlZFNlYXJjaENvbXBvbmVudDtcblxuICAgIC8vQFZpZXdDaGlsZChcInBhZ2VcIikgcGFnZVJlZjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwicmFkTGlzdFZpZXdcIikgcmFkTGlzdFZpZXdSZWY6IEVsZW1lbnRSZWY7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMscHJpdmF0ZSBmZWVkU2VydmljZTpNeUZlZWRTZXJ2aWNlLCBwcml2YXRlIGdsb2JhbFN0b3JhZ2VTZXJ2aWNlOkdsb2JhbFN0b3JhZ2VTZXJ2aWNlKXsgXG4gICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0ID0gbmV3ICBPYnNlcnZhYmxlQXJyYXk8RmVlZEluZm9ybWF0aW9uPigpO1xuICAgICAgICBNeUZlZWRTZWFyY2hDb21wb25lbnQubXlGZWVkU2VhcmNoQ29tcG9uZW50ID0gdGhpcztcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpe1xuICAgICAgICB0aGlzLnNlYXJjaEhpc3RvcnlMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxzdHJpbmc+KCk7XG4gICAgICAgIHRoaXMubWF0Y2hTZWFyY2hLZXl3b3JrTGlzdD0gbmV3IE9ic2VydmFibGVBcnJheTxzdHJpbmc+KCk7XG4gICAgICAgXG4gICAgICAgLy8gYWxlcnQobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0Fub3RoZXIgUGx1Z2luJykpO1xuICAgICAgIC8vYWxlcnQodGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRTYXZlS2V5d29yZCgnMCcpKTtcbiAgICAgICAgbGV0IHN0ciA9IHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0U2F2ZUtleXdvcmQoJzAnKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJoaXN0b3J5IC0tPiBcIiArIHN0cik7XG4gICAgICAgIGlmKHN0ciAhPSBudWxsKXtcbiAgICAgICAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMSxzdHIubGVuZ3RoLTEpO1xuICAgICAgICAgICAgbGV0IG15QXJyYXkgPSBzdHIuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hIaXN0b3J5TGlzdC5wdXNoKG15QXJyYXkpXG4gICAgICAgICAgICAvKmNvbnNvbGUubG9nKFwic2VhcmNoS2V5d29yZExJc3QgPT0+IFwiICsgSlNPTi5zdHJpbmdpZnkobXlBcnJheSkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJsZW5ndGggb2YgbGlzdCAtLT4gXCIgKyB0aGlzLnNlYXJjaEhpc3RvcnlMaXN0Lmxlbmd0aCk7XG4gICAgICAgICAgICBpZih0aGlzLnNlYXJjaEhpc3RvcnlMaXN0Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGk8IHRoaXMuc2VhcmNoSGlzdG9yeUxpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNlYXJjaEhpc3RvcnlMaXN0LmdldEl0ZW0oaSkpO1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgIHRoaXMubWF0Y2hTZWFyY2hLZXl3b3JrTGlzdCA9IHRoaXMuc2VhcmNoSGlzdG9yeUxpc3Q7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vdGhpcy5pbml0aWFsaXplKCk7XG4gICAgICAgIC8vdGhpcy5sb2FkRmVlZExpc3QoKTtcbiAgICAgICAgYWxlcnQodGhpcy5pc0xvYWRpbmcpO1xuICAgIH1cblxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnJhZExpc3RWaWV3ID0gPFJhZExpc3RWaWV3PnRoaXMucmFkTGlzdFZpZXdSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICBcbiAgICB9XG5cbiAgICBvbk5hdkJ0blRhcCgpe1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XG4gICAgfVxuICBcbiAgICBvblNhdmVTZWFyY2hLZXl3b3JkKCl7XG4gICAgICAgIC8qY29uc29sZS5sb2coXCJzYXZpbmdcIik7XG4gICAgICAgIC8vbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0Fub3RoZXIgUGx1Z2luJywgJ0J5IE1hc3RlciBUZWNobm9sb2d5Jyk7XG4gIFxuICAgICAgICB0aGlzLnNlYXJjaEtleXdvcmRMaXN0LnB1c2goXCJhXCIpO1xuICAgICAgICB0aGlzLnNlYXJjaEtleXdvcmRMaXN0LnB1c2goXCJiXCIpO1xuICAgICAgICB0aGlzLnNlYXJjaEtleXdvcmRMaXN0LnB1c2goXCJjXCIpO1xuICAgICAgICB0aGlzLnNlYXJjaEtleXdvcmRMaXN0LnB1c2goXCJkXCIpO1xuXG4gICAgICAgIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2Uuc2V0U2F2ZUtleXdvcmQoJzAnLCBKU09OLnN0cmluZ2lmeSh0aGlzLnNlYXJjaEtleXdvcmRMaXN0LnRvU3RyaW5nKCkpKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInNhdmVkIGtleXdvcmQgXCIgKyBKU09OLnN0cmluZ2lmeShzdHJpbmdpZnkodGhpcy5zZWFyY2hLZXl3b3JkTGlzdCkpKTsgICAqL1xuXG4gICAgICAgIHZhciBhcnIgPSB0aGlzLm1hdGNoU2VhcmNoS2V5d29ya0xpc3QuZmlsdGVyKHN0ciA9PiBzdHIgPT0gdGhpcy5zZWFyY2hLZXl3b3JkKTtcbiAgICAgICAgaWYoYXJyLmxlbmd0aCA9PSAwKXtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoSGlzdG9yeUxpc3QucHVzaCh0aGlzLnNlYXJjaEtleXdvcmQpO1xuICAgICAgICAgICAgLy90aGlzLm1hdGNoU2VhcmNoS2V5d29ya0xpc3QucHVzaCh0aGlzLnNlYXJjaEtleXdvcmQpO1xuICAgICAgICAgICAgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5zZXRTYXZlS2V5d29yZCgnMCcsIEpTT04uc3RyaW5naWZ5KHRoaXMuc2VhcmNoSGlzdG9yeUxpc3QudG9TdHJpbmcoKSkpO1xuXG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNob3dTZWFyY2hTdWdnZXN0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8RmVlZEluZm9ybWF0aW9uPigpO1xuICAgICAgICAgICAgYWxlcnQodGhpcy5zZWFyY2hLZXl3b3JkKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAgdGhpcy5sb2FkRmVlZExpc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvblRleHRDaGFuZ2UoYXJncykge1xuICAgICAgICB0aGlzLnNob3dTZWFyY2hTdWdnZXN0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zaG93U2VhcmNoUmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLnNlYXJjaEtleXdvcmQgPSB0ZXh0RmllbGQudGV4dC50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICB0aGlzLnNlYXJjaEluTGlzdCgpO1xuICAgIH1cblxuICAgIHNlYXJjaEluTGlzdCgpe1xuICAgICAgICBpZih0aGlzLnNlYXJjaEhpc3RvcnlMaXN0Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaTwgdGhpcy5zZWFyY2hIaXN0b3J5TGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zZWFyY2hIaXN0b3J5TGlzdC5nZXRJdGVtKGkpKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXRjaFNlYXJjaEtleXdvcmtMaXN0ID0gdGhpcy5zZWFyY2hIaXN0b3J5TGlzdDtcbiAgICAgICAgdmFyIGFyck1hdGNoTGlzdCA9IHRoaXMubWF0Y2hTZWFyY2hLZXl3b3JrTGlzdC5maWx0ZXIoc3RyID0+IHN0ci5pbmNsdWRlcyh0aGlzLnNlYXJjaEtleXdvcmQpKTtcbiAgICAgICAgdGhpcy5tYXRjaFNlYXJjaEtleXdvcmtMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxzdHJpbmc+KCk7XG4gICAgICAgIHRoaXMubWF0Y2hTZWFyY2hLZXl3b3JrTGlzdC5wdXNoKGFyck1hdGNoTGlzdCk7XG4gICAgfVxuICAgIC8qIFxuICAgICAgdmFyIGNvbG9yXzEgPSByZXF1aXJlKFwiY29sb3JcIik7XG5cbiAgICAgICAgdmFyIHBhZ2U7XG4gICAgICAgIGZ1bmN0aW9uIG5hdmlnYXRpbmdUbyhhcmdzKSB7XG4gICAgICAgICAgICBwYWdlID0gYXJncy5vYmplY3Q7XG4gICAgICAgICAgICB2YXIgY29sb3IgPSBuZXcgY29sb3JfMS5Db2xvcihcIiNDRUNFQ0VcIik7XG4gICAgICAgICAgICB2YXIgdGV4dEZpZWxkID0gcGFnZS5nZXRWaWV3QnlJZChcInRleHRmaWVsZFwiKTtcbiAgICAgICAgICAgIGlmIChwYWdlLmFuZHJvaWQpIHtcbiAgICAgICAgICAgICAgICB0ZXh0RmllbGQuYW5kcm9pZC5zZXRIaW50VGV4dENvbG9yKGNvbG9yLmFuZHJvaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihwYWdlLmlvcyl7XG4gICAgICAgICAgICAgICAgdmFyIHBsYWNlaG9sZGVyID0gdGV4dEZpZWxkLmlvcy52YWx1ZUZvcktleShcInBsYWNlaG9sZGVyTGFiZWxcIik7XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXIudGV4dENvbG9yID0gY29sb3IuaW9zO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGV4cG9ydHMubmF2aWdhdGluZ1RvID0gbmF2aWdhdGluZ1RvO1xuICAgICAqL1xuXG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5GZWVkX0NhdGVnb3J5X0lkID0gbnVsbDtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5GZWVkVHlwZV9JZCA9IG51bGw7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uVGl0bGUgPSBudWxsO1xuICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlNlYXJjaEtleXdvcmQgPSB0aGlzLnNlYXJjaEtleXdvcmQ7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uUG9zdGVkX0RhdGVfRnJvbSA9IG51bGw7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uUG9zdGVkX0RhdGVfVG8gPSBudWxsO1xuICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkNyZWF0ZWRfRnJvbSA9IG51bGw7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uQ3JlYXRlZF9UbyA9IG51bGw7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uQ3Vyc29yX0luZGV4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5HZXRfTmV4dCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlBhZ2VfU2l6ZSA9IDEwO1xuICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlBvc3RfU3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5VblBvc3RfU3RhdHVzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uaXNCbG9ja2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbG9hZEZlZWRMaXN0KCkge1xuICAgICAgICB0aGlzLmJ1c3kgPSB0aGlzLmZlZWRTZXJ2aWNlLmdldE5ld3NmZWVkbGlzdCh0aGlzLmZlZWRGaWx0ZXJJbmZvLkZlZWRfQ2F0ZWdvcnlfSWQsIFxuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5GZWVkVHlwZV9JZCxcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uVGl0bGUsIFxuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5TZWFyY2hLZXl3b3JkLCBcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uUG9zdGVkX0RhdGVfRnJvbSwgXG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlBvc3RlZF9EYXRlX1RvLCBcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uQ3JlYXRlZF9Gcm9tLCBcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uQ3JlYXRlZF9UbywgXG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkN1cnNvcl9JbmRleCwgXG4gICAgICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkdldF9OZXh0LCBcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uUGFnZV9TaXplLCBcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uUG9zdF9TdGF0dXMsIFxuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5VblBvc3RfU3RhdHVzLCBcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uaXNCbG9ja2VkKVxuXG4gICAgICAgICAgIFxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7IFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBmZWVkTGlzdCA9IEFycmF5PEZlZWRJbmZvcm1hdGlvbj4oKTsgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJlcy5yZXN1bHQuZm9yRWFjaChmZWVkID0+IHtcbiAgICAgICAgICAgICAgICAgICBmZWVkTGlzdC5wdXNoKDxGZWVkSW5mb3JtYXRpb24+ZmVlZCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdC5wdXNoKGZlZWRMaXN0KTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLm5ld3NGZWVkTGlzdC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93U2VhcmNoUmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvYWRGZWVkTGlzdCAtLT4gXCIgKyBKU09OLnN0cmluZ2lmeShyZXMpKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkxvYWRNb3JlSXRlbXNSZXF1ZXN0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcbiAgICAgICAgdmFyIHRoYXQgPSBuZXcgV2Vha1JlZih0aGlzKTtcbiAgICAgICAgdmFyIGxpc3RWaWV3OiBSYWRMaXN0VmlldyA9IGFyZ3Mub2JqZWN0O1xuICAgICAgICBsZXQgYXJyTGVuZ3RoID0gdGhhdC5nZXQoKS5uZXdzRmVlZExpc3QubGVuZ3RoO1xuXG4gICAgICAgIFRpbWVyLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhhdC5nZXQoKS5sb2FkTW9yZUZlZWRzKCk7XG4gICAgICAgICAgICBsaXN0Vmlldy5ub3RpZnlMb2FkT25EZW1hbmRGaW5pc2hlZCgpO1xuICAgICAgICAgICBcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIC8vfVxuICAgICAgICBhcmdzLnJldHVyblZhbHVlID0gdHJ1ZTtcbiAgICB9XG5cblxuICAgIG9uSXRlbVRhcChhcmdzKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZEluZGV4Om51bWJlciA9IDxudW1iZXI+YXJncy5pbmRleDtcbiAgICAgICAgdmFyIGZlZWQgPSB0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKHNlbGVjdGVkSW5kZXgpO1xuICAgICAgICBsZXQgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgXCJDYWxsZXJDbGFzc1wiIDogXCJNeUZlZWRTZWFyY2hDb21wb25lbnRcIixcbiAgICAgICAgICAgICAgICBcIlNlbGVjdGVkUG9zaXRpb25cIiA6IHNlbGVjdGVkSW5kZXgsXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9teWZlZWQvXCIrIGZlZWQuRmVlZF9JZCsgXCIvdmlld1wiXSxuYXZpZ2F0aW9uRXh0cmFzKSAvL3JvdXRlIHRvIGZlZWRfZGV0YWlsKDEpXG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG4gICAgb25TZWFyY2hIaXN0b3J5SXRlbVRhcChhcmdzKSB7IFxuICAgICAgICB2YXIgc2VsZWN0ZWRJbmRleCA9IGFyZ3MuaW5kZXg7ICAgXG4gICAgICAgIHZhciBzZWFyY2hfa2V5d29yZCA9IHRoaXMubWF0Y2hTZWFyY2hLZXl3b3JrTGlzdC5nZXRJdGVtKHNlbGVjdGVkSW5kZXgpO1xuICAgICAgICB0aGlzLnNlYXJjaEtleXdvcmQgPSBzZWFyY2hfa2V5d29yZFxuXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zaG93U2VhcmNoU3VnZ2VzdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8RmVlZEluZm9ybWF0aW9uPigpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICAgICAgdGhpcy5sb2FkRmVlZExpc3QoKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgbG9hZE1vcmVGZWVkcygpIHtcbiAgICAgICAgaWYgKHRoaXMubmV3c0ZlZWRMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uQ3Vyc29yX0luZGV4ID0gdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbSh0aGlzLm5ld3NGZWVkTGlzdC5sZW5ndGggLSAxKS5GZWVkX0lkO1xuICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5HZXRfTmV4dCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9hZEZlZWRMaXN0KCk7XG4gICAgfVxuXG4gICAgZ2V0SW5uZXJIdG1sKGRlc2M6IHN0cmluZykge1xuICAgICAgICBsZXQgZG90ID0gJyc7ICAgICAgICBcbiAgICAgICAgdmFyIHJ0biA9IGRlc2MucmVwbGFjZSgvPFxcLz9bXj5dKz4vaWcsIFwiIFwiKTtcbiAgICAgICAgcnRuID0gcnRuLnJlcGxhY2UoXCJcXG5cIixcIlwiKTtcbiAgICAgICAgcnRuID0gcnRuLnJlcGxhY2UoXCImbmJzcDtcIixcIlwiKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChydG4ubGVuZ3RoID4gMTAwKSB7IGRvdCA9ICcuLi4uLic7IH1cbiAgICAgICAgICAgIFxuICAgICAgICBydG4gPSBydG4uc3Vic3RyaW5nKDAsIDEwMCk7XG4gICAgICAgIGlmIChydG4ubGVuZ3RoID4wKSB7IHJldHVybiBydG4gKyBkb3Q7IH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVNeUZlZWRzVUkoZmVlZDogRmVlZEluZm9ybWF0aW9uLGlzRmVlZFVwZGF0ZU9yQ3JlYXRlOnN0cmluZyxwb3NpdGlvbjpudW1iZXIpe1xuICAgICAgICAvL2FsZXJ0KFwidXBkYXRlIG15IGZlZWRMSXN0XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImZlZWQgXCIgKyBKU09OLnN0cmluZ2lmeShmZWVkKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidXBkYXRlIG15IGZlZWRMaXN0IFwiICsgaXNGZWVkVXBkYXRlT3JDcmVhdGUgKyBcIiBwb3NpdGlvbiBcIiArIHBvc2l0aW9uKTtcbiAgICAgICAgaWYoaXNGZWVkVXBkYXRlT3JDcmVhdGUgPT0gXCJuZXdcIil7XG4gICAgICAgICAgICAvL2FsZXJ0KFwidXBkYXRlIG15IGZlZWRMSXN0XCIpO1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QudW5zaGlmdChmZWVkKTtcbiAgICAgICAgICAgIHRoaXMucmFkTGlzdFZpZXcucmVmcmVzaCgpO1xuICAgICAgICAgICAgLy9hbGVydChcIkZlZWQgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQhXCIpO1xuICAgICAgICAgICAgLy90aGlzLm5ld3NGZWVkTGlzdC5ub3RpZnk7XG4gICAgICAgIH1lbHNlIGlmKGlzRmVlZFVwZGF0ZU9yQ3JlYXRlID09IFwidXBkYXRlXCIpe1xuICAgICAgICAgICAgLy90aGlzLm5ld3NGZWVkTGlzdC5zcGxpY2UocG9zaXRpb24sIDEpOy8vIDEsIDFcbiAgICAgICAgICAgIC8vdGhpcy5uZXdzRmVlZExpc3Quc3BsaWNlKHBvc2l0aW9uLDAsZmVlZCk7Ly8xLGZlZWRcbiAgICAgICAgICAgIC8vdGhpcy5uZXdzRmVlZExpc3Qubm90aWZ5O1xuXG4gICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKHBvc2l0aW9uKS5GZWVkX0NhdGVnb3J5X0lkID0gZmVlZC5GZWVkX0NhdGVnb3J5X0lkO1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuRmVlZF9DYXRlZ29yeV9OYW1lID0gZmVlZC5GZWVkX0NhdGVnb3J5X05hbWU7XG4gICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKHBvc2l0aW9uKS5GZWVkVHlwZV9JZCA9IGZlZWQuRmVlZFR5cGVfSWQ7XG4gICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKHBvc2l0aW9uKS5GZWVkX1R5cGVfTmFtZSA9IGZlZWQuRmVlZF9UeXBlX05hbWU7XG4gICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKHBvc2l0aW9uKS5UaXRsZSA9IGZlZWQuVGl0bGU7XG4gICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKHBvc2l0aW9uKS5EZXNjcmlwdGlvbiA9IGZlZWQuRGVzY3JpcHRpb247XG4gICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKHBvc2l0aW9uKS5Qb3N0ZWRfRGF0ZSA9IGZlZWQuUG9zdGVkX0RhdGU7XG4gICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKHBvc2l0aW9uKS5Qb3N0X1N0YXR1cyA9IGZlZWQuUG9zdF9TdGF0dXM7XG4gICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKHBvc2l0aW9uKS5MYXN0X1VwZGF0ZWRfQnkgPSBmZWVkLkxhc3RfVXBkYXRlZF9CeTtcbiAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LmdldEl0ZW0ocG9zaXRpb24pLkxhc3RfVXBkYXRlZF9PbiA9IGZlZWQuTGFzdF9VcGRhdGVkX09uO1xuICAgICAgICAgICAgdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuc3RhdHVzID0gZmVlZC5zdGF0dXM7XG4gICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdC5nZXRJdGVtKHBvc2l0aW9uKS5NQ19GZWVkX0ZpbGVzID0gZmVlZC5NQ19GZWVkX0ZpbGVzO1xuXG4gICAgICAgICAgICAvL2FsZXJ0KFwiRmVlZCBzdWNjZXNzZnVsbHkgdXBkYXRlZCFcIik7XG5cbiAgICAgICAgfWVsc2UgaWYoaXNGZWVkVXBkYXRlT3JDcmVhdGUgPT0gXCJVTlBPU1RcIiB8fCBpc0ZlZWRVcGRhdGVPckNyZWF0ZSA9PSBcIkFSQ0hJVkVcIil7XG4gICAgICAgICAgICB0cnl7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVucG9zdCBteUZlZWRzXCIpO1xuICAgICAgICAgICAgICAgIC8qbGV0IHRlbXBGZWVkTGlzdDpPYnNlcnZhYmxlQXJyYXk8RmVlZEluZm9ybWF0aW9uPiAgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEZlZWRJbmZvcm1hdGlvbj4oKTtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpPCB0aGlzLm5ld3NGZWVkTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBGZWVkTGlzdC5zZXRJdGVtKGksdGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vdGVtcEZlZWRMaXN0LnNwbGljZShwb3NpdGlvbiwxKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld3NGZWVkTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8RmVlZEluZm9ybWF0aW9uPigpO1xuICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0ID0gdGVtcEZlZWRMaXN0O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLyp0aGlzLm5ld3NGZWVkTGlzdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlbGVtZW50LlRpdGxlKTtcbiAgICAgICAgICAgICAgICB9KTsqL1xuXG4gICAgICAgICAgICAgICAgLyppZih0aGlzLnJhZExpc3RWaWV3ICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxpc3R2aWV3IHJlZnJlc2hcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFkTGlzdFZpZXcucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsaXN0dmlldyBpcyBudWxsXCIpXG4gICAgICAgICAgICAgICAgfSAgKi8gICBcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IHRoaXMubmV3c0ZlZWRMaXN0LmluZGV4T2YodGhpcy5uZXdzRmVlZExpc3QuZ2V0SXRlbShwb3NpdGlvbikpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV3c0ZlZWRMaXN0LnNwbGljZShpLDEpO1xuICAgICAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiRmVlZCBzdWNjZXNzZnVsbHkgdW5wb3N0ZWQhXCIpOyAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlbW92ZSBcIiArIHBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB9LCAyMDAwKTtcblxuICAgICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgfVxuICBcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgaWYoaXNGZWVkVXBkYXRlT3JDcmVhdGUgPT0gXCJOT1RJRllcIil7XG4gICAgICAgICAgICBhbGVydChcIkZlZWRzIHN1Y2Nlc3NmdWxseSBub3RpZmllZCFcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0TXlGZWVkc1NlYXJjaE9iamVjdCgpe1xuICAgICAgICByZXR1cm4gTXlGZWVkU2VhcmNoQ29tcG9uZW50Lm15RmVlZFNlYXJjaENvbXBvbmVudDtcbiAgICB9XG59XG5cblxuIl19