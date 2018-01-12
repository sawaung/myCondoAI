"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var myfeed_model_1 = require("../model/myfeed.model");
var myfeed_service_1 = require("../services/myfeed.service");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var interfaces_1 = require("../../shared/interfaces");
var common_1 = require("@angular/common");
//import { DialogService } from '../../shared/utils/dialog.service';
var MyFeedFilterComponent = /** @class */ (function () {
    function MyFeedFilterComponent(router, route, routerExtensions, feedService) {
        this.router = router;
        this.route = route;
        this.routerExtensions = routerExtensions;
        this.feedService = feedService;
        this.dataSourceFeedType = new nativescript_drop_down_1.ValueList();
        this.dataSourceFeedCategory = new nativescript_drop_down_1.ValueList();
        this.feedFilterInfo = new myfeed_model_1.FeedFilter();
        this.isLoading = false;
    }
    MyFeedFilterComponent_1 = MyFeedFilterComponent;
    MyFeedFilterComponent.prototype.ngOnInit = function () {
        this.searchKeyword = "";
        this.initialize();
        this.init();
    };
    MyFeedFilterComponent.prototype.initialize = function () {
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
        this.feedFilterInfo.Page_Size = 10;
        this.feedFilterInfo.Post_Status = true;
        this.feedFilterInfo.UnPost_Status = false;
        this.feedFilterInfo.isBlocked = false;
    };
    MyFeedFilterComponent.prototype.init = function () {
        //this.feedInfoDetail = new FeedInformation();
        //this.feedInfoDetail.Feed_Group = 1;
        //this.feedInfoDetail.Feed_Id = this.feedId;
        //this.feedInfoDetail = this.route.snapshot.params['id'];
        var _this = this;
        this.isLoading = true;
        this.feedService.getfeedType()
            .subscribe(function (res) {
            console.log("getFeedType -> " + JSON.stringify(res));
            _this.feedType = res.result;
            try {
                var dropDownValuePair;
                dropDownValuePair = new interfaces_1.DropDownValuePair();
                dropDownValuePair.value = "0";
                dropDownValuePair.display = "ALL";
                _this.dataSourceFeedType.push(dropDownValuePair);
                _this.feedType.map(function (v) {
                    dropDownValuePair = new interfaces_1.DropDownValuePair();
                    dropDownValuePair.value = v.FeedType_Id;
                    dropDownValuePair.display = v.FeedType_Name;
                    _this.dataSourceFeedType.push(dropDownValuePair);
                    //this.arrFeedType.push(v.FeedType_Name)
                });
                _this.dropDownFeedType.items = _this.dataSourceFeedType;
                _this.dropDownFeedType.selectedIndex = 0;
            }
            catch (e) {
                console.log(e);
            }
        });
        this.feedService.getfeedCategory()
            .subscribe(function (res) {
            _this.isLoading = false;
            _this.feedCategory = res.result;
            try {
                var dropDownValuePair;
                dropDownValuePair = new interfaces_1.DropDownValuePair();
                dropDownValuePair.value = "0";
                dropDownValuePair.display = "ALL";
                _this.dataSourceFeedCategory.push(dropDownValuePair);
                _this.feedCategory.map(function (v) {
                    dropDownValuePair = new interfaces_1.DropDownValuePair();
                    dropDownValuePair.value = v.Feed_Category_Id;
                    dropDownValuePair.display = v.Feed_Category_Name;
                    _this.dataSourceFeedCategory.push(dropDownValuePair);
                });
                _this.dropDownFeedCategory.items = _this.dataSourceFeedCategory;
                _this.dropDownFeedCategory.selectedIndex = 0;
            }
            catch (e) {
                console.log(e);
            }
        });
    };
    MyFeedFilterComponent.prototype.ngAfterViewInit = function () {
        this.page = this.pageRef.nativeElement;
        this.dropDownFeedType = this.page.getViewById("dropDownFeedType");
        this.dropDownFeedCategory = this.page.getViewById("dropDownFeedCategory");
        this.chkPost = this.page.getViewById("chkPost");
        this.chkUnpost = this.page.getViewById("chkUnpost");
        this.chkArchive = this.page.getViewById("chkArchive");
    };
    MyFeedFilterComponent.prototype.onNavBtnTap = function () {
        this.routerExtensions.backToPreviousPage();
    };
    MyFeedFilterComponent.prototype.onchangeFeedType = function (args) {
        var selectedValue = this.dataSourceFeedType.getValue(this.dropDownFeedType.selectedIndex);
        if (selectedValue.toString() != "0") {
            MyFeedFilterComponent_1.feedTypeId = selectedValue.toString();
        }
        console.log("selectedValue " + selectedValue);
        console.log("Drop Down selected index changed from " + args.oldIndex + " to " + args.newIndex);
    };
    MyFeedFilterComponent.prototype.onchangeFeedCategory = function (args) {
        var selectedValue = this.dataSourceFeedCategory.getValue(this.dropDownFeedCategory.selectedIndex);
        MyFeedFilterComponent_1.feedCategoryId = selectedValue.toString();
        console.log("selectedValue " + selectedValue);
        console.log("Drop Down selected index changed from " + args.oldIndex + " to " + args.newIndex);
    };
    MyFeedFilterComponent.prototype.onopen = function () {
    };
    MyFeedFilterComponent.prototype.onclose = function () {
    };
    MyFeedFilterComponent.prototype.onSearch = function () {
        this.feedFilterInfo.Feed_Category_Id = MyFeedFilterComponent_1.feedCategoryId;
        this.feedFilterInfo.FeedType_Id = MyFeedFilterComponent_1.feedTypeId;
        this.feedFilterInfo.UnPost_Status = this.chkUnpost.checked;
        this.feedFilterInfo.Post_Status = this.chkPost.checked;
        this.feedFilterInfo.isBlocked = this.chkArchive.checked;
        console.log("feedDetail --> " + JSON.stringify(this.feedFilterInfo));
        var navigationExtras = {
            queryParams: {
                "FeedFilterInfo": JSON.stringify(this.feedFilterInfo),
            }
        };
        this.router.navigate(["/myfeed/fiterresult"], navigationExtras);
    };
    MyFeedFilterComponent.prototype.callDatePicker = function (para) {
        var _this = this;
        var ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
        var picker = new ModalPicker();
        picker.pickDate({
            title: "Select Your Birthday",
            theme: "light",
            maxDate: new Date(new Date().getFullYear(), 11, 31)
        }).then(function (result) {
            console.log("Date is: " + result.day + "-" + result.month + "-" + result.year);
            var _day = result.day;
            if (_day.toString().length < 2) {
                _day = "0" + _day;
            }
            var strDate = new Date(result.year + "-" + result.month + "-" + _day + "T00:00:00");
            var datePipe = new common_1.DatePipe("en-US");
            var _date = datePipe.transform(strDate, 'dd MMM yyyy');
            ;
            if (para == "postedFrom") {
                _this.feedFilterInfo.Posted_Date_From = strDate;
                _this.postedDateFrom = _date;
            }
            else if (para == "postedTo") {
                _this.feedFilterInfo.Posted_Date_To = strDate;
                _this.postedDateTo = _date;
            }
            else if (para == "createdFrom") {
                _this.feedFilterInfo.Created_From = strDate;
                _this.createdDateFrom = _date;
            }
            else if (para == "createdTo") {
                _this.feedFilterInfo.Created_To = strDate;
                _this.createdDateTo = _date;
            }
        }).catch(function (error) {
            console.log("Error: " + error);
        });
    };
    MyFeedFilterComponent.feedCategoryId = "";
    MyFeedFilterComponent.feedTypeId = "";
    __decorate([
        core_1.ViewChild("page"),
        __metadata("design:type", core_1.ElementRef)
    ], MyFeedFilterComponent.prototype, "pageRef", void 0);
    MyFeedFilterComponent = MyFeedFilterComponent_1 = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-myfeedfilter',
            templateUrl: 'myfeedfilter.html',
            styleUrls: ['./myfeedfilter.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, router_2.RouterExtensions, myfeed_service_1.MyFeedService])
    ], MyFeedFilterComponent);
    return MyFeedFilterComponent;
    var MyFeedFilterComponent_1;
}());
exports.MyFeedFilterComponent = MyFeedFilterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlmZWVkZmlsdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15ZmVlZGZpbHRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsMENBQTJFO0FBQzNFLHNEQUErRDtBQUUvRCxzREFBa0c7QUFDbEcsNkRBQTJEO0FBSTNELGlFQUFtRDtBQUluRCxzREFBNEQ7QUFDNUQsMENBQTJDO0FBRzNDLG9FQUFvRTtBQVNwRTtJQXdCSSwrQkFBb0IsTUFBYyxFQUFVLEtBQXFCLEVBQVUsZ0JBQWtDLEVBQVUsV0FBMEI7UUFBN0gsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFlO1FBaEJqSix1QkFBa0IsR0FBRyxJQUFJLGtDQUFTLEVBQXFCLENBQUM7UUFDeEQsMkJBQXNCLEdBQUcsSUFBSSxrQ0FBUyxFQUFxQixDQUFDO1FBQzVELG1CQUFjLEdBQWUsSUFBSSx5QkFBVSxFQUFFLENBQUM7UUFFOUMsY0FBUyxHQUFZLEtBQUssQ0FBQztJQWMzQixDQUFDOzhCQTFCUSxxQkFBcUI7SUE0QjlCLHdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCwwQ0FBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDNUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsR0FBRyxJ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QUFZLEdBQUcsS0FBSyxDQUFDO1lBQzlCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLEtBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztnQkFDM0MsS0FBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7WUFDakMsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsS0FBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO2dCQUN6QyxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMvQixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsS0FBSztZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTFMTSxvQ0FBYyxHQUFVLEVBQUUsQ0FBQztJQUMzQixnQ0FBVSxHQUFVLEVBQUUsQ0FBQztJQU9YO1FBQWxCLGdCQUFTLENBQUMsTUFBTSxDQUFDO2tDQUFVLGlCQUFVOzBEQUFDO0lBdkI5QixxQkFBcUI7UUFQakMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFdBQVcsRUFBRSxtQkFBbUI7WUFDaEMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7U0FDOUMsQ0FBQzt5Q0EwQjhCLGVBQU0sRUFBaUIsdUJBQWMsRUFBNEIseUJBQWdCLEVBQXVCLDhCQUFhO09BeEJ4SSxxQkFBcUIsQ0EwTWpDO0lBQUQsNEJBQUM7O0NBQUEsQUExTUQsSUEwTUM7QUExTVksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIE9uSW5pdCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSwgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGZWVkSW5mb3JtYXRpb24sIEZlZWRUeXBlLCBGZWVkQ2F0ZWdvcnksIEZlZWRGaWx0ZXIsIFJvbGUgfSBmcm9tICcuLi9tb2RlbC9teWZlZWQubW9kZWwnO1xuaW1wb3J0IHsgTXlGZWVkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL215ZmVlZC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbW1vblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMvY29tbW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy9jb25maWcuc2VydmljZSc7XG5cbmltcG9ydCB7IFZhbHVlTGlzdCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XG5pbXBvcnQgeyBEcm9wRG93biB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2Ryb3AtZG93blwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XG5pbXBvcnQgeyBEcm9wRG93blZhbHVlUGFpciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENoZWNrQm94IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWNoZWNrYm94JztcblxuLy9pbXBvcnQgeyBEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL2RpYWxvZy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2FwcC1teWZlZWRmaWx0ZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnbXlmZWVkZmlsdGVyLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL215ZmVlZGZpbHRlci5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBNeUZlZWRGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgZmVlZFR5cGU6IEFycmF5PEZlZWRUeXBlPjtcbiAgICBmZWVkQ2F0ZWdvcnk6IEFycmF5PEZlZWRDYXRlZ29yeT47XG4gICAgcGFnZTogUGFnZTtcblxuICAgIGRyb3BEb3duRmVlZFR5cGU6IERyb3BEb3duO1xuICAgIGRyb3BEb3duRmVlZENhdGVnb3J5OiBEcm9wRG93bjtcbiAgICBkYXRhU291cmNlRmVlZFR5cGUgPSBuZXcgVmFsdWVMaXN0PERyb3BEb3duVmFsdWVQYWlyPigpO1xuICAgIGRhdGFTb3VyY2VGZWVkQ2F0ZWdvcnkgPSBuZXcgVmFsdWVMaXN0PERyb3BEb3duVmFsdWVQYWlyPigpO1xuICAgIGZlZWRGaWx0ZXJJbmZvOiBGZWVkRmlsdGVyID0gbmV3IEZlZWRGaWx0ZXIoKTtcblxuICAgIGlzTG9hZGluZzogQm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgc2VhcmNoS2V5d29yZDpzdHJpbmc7XG4gICAgc3RhdGljIGZlZWRDYXRlZ29yeUlkOnN0cmluZyA9IFwiXCI7XG4gICAgc3RhdGljIGZlZWRUeXBlSWQ6c3RyaW5nID0gXCJcIjtcbiAgICBwb3N0ZWREYXRlRnJvbTpzdHJpbmc7cG9zdGVkRGF0ZVRvOnN0cmluZztcbiAgICBwb3N0U3RhdHVzOnN0cmluZzsgdW5wb3N0U3RhdHVzOnN0cmluZzsgYmxvY2s6c3RyaW5nO1xuICAgIGNyZWF0ZWREYXRlRnJvbTpzdHJpbmc7Y3JlYXRlZERhdGVUbzpzdHJpbmc7XG4gICAgY2hrUG9zdDpDaGVja0JveDtjaGtVbnBvc3Q6Q2hlY2tCb3g7Y2hrQXJjaGl2ZTpDaGVja0JveDtcblxuXG4gICAgQFZpZXdDaGlsZChcInBhZ2VcIikgcGFnZVJlZjogRWxlbWVudFJlZjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIGZlZWRTZXJ2aWNlOiBNeUZlZWRTZXJ2aWNlKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hLZXl3b3JkID0gXCJcIjtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uRmVlZF9DYXRlZ29yeV9JZCA9IG51bGw7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uRmVlZFR5cGVfSWQgPSBudWxsO1xuICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlRpdGxlID0gbnVsbDtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5TZWFyY2hLZXl3b3JkID0gbnVsbDtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5Qb3N0ZWRfRGF0ZV9Gcm9tID0gbnVsbDtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5Qb3N0ZWRfRGF0ZV9UbyA9IG51bGw7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uQ3JlYXRlZF9Gcm9tID0gbnVsbDtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5DcmVhdGVkX1RvID0gbnVsbDtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5DdXJzb3JfSW5kZXggPSBudWxsO1xuICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLkdldF9OZXh0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uUGFnZV9TaXplID0gMTA7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uUG9zdF9TdGF0dXMgPSB0cnVlO1xuICAgICAgICB0aGlzLmZlZWRGaWx0ZXJJbmZvLlVuUG9zdF9TdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5pc0Jsb2NrZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICAvL3RoaXMuZmVlZEluZm9EZXRhaWwgPSBuZXcgRmVlZEluZm9ybWF0aW9uKCk7XG4gICAgICAgIC8vdGhpcy5mZWVkSW5mb0RldGFpbC5GZWVkX0dyb3VwID0gMTtcbiAgICAgICAgLy90aGlzLmZlZWRJbmZvRGV0YWlsLkZlZWRfSWQgPSB0aGlzLmZlZWRJZDtcbiAgICAgICAgLy90aGlzLmZlZWRJbmZvRGV0YWlsID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ2lkJ107XG5cblxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG5cblxuICAgICAgICB0aGlzLmZlZWRTZXJ2aWNlLmdldGZlZWRUeXBlKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdldEZlZWRUeXBlIC0+IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzKSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZlZWRUeXBlID0gcmVzLnJlc3VsdDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZHJvcERvd25WYWx1ZVBhaXI7XG4gICAgICAgICAgICAgICAgICAgIGRyb3BEb3duVmFsdWVQYWlyID0gbmV3IERyb3BEb3duVmFsdWVQYWlyKCk7XG4gICAgICAgICAgICAgICAgICAgIGRyb3BEb3duVmFsdWVQYWlyLnZhbHVlID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgICAgIGRyb3BEb3duVmFsdWVQYWlyLmRpc3BsYXkgPSBcIkFMTFwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2VGZWVkVHlwZS5wdXNoKGRyb3BEb3duVmFsdWVQYWlyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mZWVkVHlwZS5tYXAoKHYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BEb3duVmFsdWVQYWlyID0gbmV3IERyb3BEb3duVmFsdWVQYWlyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wRG93blZhbHVlUGFpci52YWx1ZSA9IHYuRmVlZFR5cGVfSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wRG93blZhbHVlUGFpci5kaXNwbGF5ID0gdi5GZWVkVHlwZV9OYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlRmVlZFR5cGUucHVzaChkcm9wRG93blZhbHVlUGFpcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuYXJyRmVlZFR5cGUucHVzaCh2LkZlZWRUeXBlX05hbWUpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3BEb3duRmVlZFR5cGUuaXRlbXMgPSB0aGlzLmRhdGFTb3VyY2VGZWVkVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wRG93bkZlZWRUeXBlLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mZWVkU2VydmljZS5nZXRmZWVkQ2F0ZWdvcnkoKVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5mZWVkQ2F0ZWdvcnkgPSByZXMucmVzdWx0O1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkcm9wRG93blZhbHVlUGFpcjtcbiAgICAgICAgICAgICAgICAgICAgZHJvcERvd25WYWx1ZVBhaXIgPSBuZXcgRHJvcERvd25WYWx1ZVBhaXIoKTtcbiAgICAgICAgICAgICAgICAgICAgZHJvcERvd25WYWx1ZVBhaXIudmFsdWUgPSBcIjBcIjtcbiAgICAgICAgICAgICAgICAgICAgZHJvcERvd25WYWx1ZVBhaXIuZGlzcGxheSA9IFwiQUxMXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZUZlZWRDYXRlZ29yeS5wdXNoKGRyb3BEb3duVmFsdWVQYWlyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mZWVkQ2F0ZWdvcnkubWFwKCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wRG93blZhbHVlUGFpciA9IG5ldyBEcm9wRG93blZhbHVlUGFpcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcERvd25WYWx1ZVBhaXIudmFsdWUgPSB2LkZlZWRfQ2F0ZWdvcnlfSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wRG93blZhbHVlUGFpci5kaXNwbGF5ID0gdi5GZWVkX0NhdGVnb3J5X05hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2VGZWVkQ2F0ZWdvcnkucHVzaChkcm9wRG93blZhbHVlUGFpcik7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcERvd25GZWVkQ2F0ZWdvcnkuaXRlbXMgPSB0aGlzLmRhdGFTb3VyY2VGZWVkQ2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcERvd25GZWVkQ2F0ZWdvcnkuc2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnBhZ2UgPSB0aGlzLnBhZ2VSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5kcm9wRG93bkZlZWRUeXBlID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkPERyb3BEb3duPihcImRyb3BEb3duRmVlZFR5cGVcIik7XG4gICAgICAgIHRoaXMuZHJvcERvd25GZWVkQ2F0ZWdvcnkgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQ8RHJvcERvd24+KFwiZHJvcERvd25GZWVkQ2F0ZWdvcnlcIik7XG5cbiAgICAgICAgdGhpcy5jaGtQb3N0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkPENoZWNrQm94PihcImNoa1Bvc3RcIik7XG4gICAgICAgIHRoaXMuY2hrVW5wb3N0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkPENoZWNrQm94PihcImNoa1VucG9zdFwiKTtcbiAgICAgICAgdGhpcy5jaGtBcmNoaXZlID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkPENoZWNrQm94PihcImNoa0FyY2hpdmVcIik7XG5cbiAgICB9XG5cbiAgICBvbk5hdkJ0blRhcCgpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuICAgIH1cblxuICAgIG9uY2hhbmdlRmVlZFR5cGUoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkVmFsdWUgPSB0aGlzLmRhdGFTb3VyY2VGZWVkVHlwZS5nZXRWYWx1ZSh0aGlzLmRyb3BEb3duRmVlZFR5cGUuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIGlmKHNlbGVjdGVkVmFsdWUudG9TdHJpbmcoKSAhPSBcIjBcIil7XG4gICAgICAgICAgICBNeUZlZWRGaWx0ZXJDb21wb25lbnQuZmVlZFR5cGVJZCA9IHNlbGVjdGVkVmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbGVjdGVkVmFsdWUgXCIgKyBzZWxlY3RlZFZhbHVlKTtcbiAgICAgICAgY29uc29sZS5sb2coYERyb3AgRG93biBzZWxlY3RlZCBpbmRleCBjaGFuZ2VkIGZyb20gJHthcmdzLm9sZEluZGV4fSB0byAke2FyZ3MubmV3SW5kZXh9YCk7XG4gICAgfVxuICAgIG9uY2hhbmdlRmVlZENhdGVnb3J5KGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZFZhbHVlID0gdGhpcy5kYXRhU291cmNlRmVlZENhdGVnb3J5LmdldFZhbHVlKHRoaXMuZHJvcERvd25GZWVkQ2F0ZWdvcnkuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIE15RmVlZEZpbHRlckNvbXBvbmVudC5mZWVkQ2F0ZWdvcnlJZCA9IHNlbGVjdGVkVmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJzZWxlY3RlZFZhbHVlIFwiICsgc2VsZWN0ZWRWYWx1ZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBEcm9wIERvd24gc2VsZWN0ZWQgaW5kZXggY2hhbmdlZCBmcm9tICR7YXJncy5vbGRJbmRleH0gdG8gJHthcmdzLm5ld0luZGV4fWApO1xuICAgIH1cbiAgICBvbm9wZW4oKSB7XG5cbiAgICB9XG4gICAgb25jbG9zZSgpIHtcblxuICAgIH1cblxuICAgIG9uU2VhcmNoKCl7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uRmVlZF9DYXRlZ29yeV9JZCA9IE15RmVlZEZpbHRlckNvbXBvbmVudC5mZWVkQ2F0ZWdvcnlJZDtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5GZWVkVHlwZV9JZCA9IE15RmVlZEZpbHRlckNvbXBvbmVudC5mZWVkVHlwZUlkO1xuXG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uVW5Qb3N0X1N0YXR1cyA9IHRoaXMuY2hrVW5wb3N0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uUG9zdF9TdGF0dXMgPSB0aGlzLmNoa1Bvc3QuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5pc0Jsb2NrZWQgPSB0aGlzLmNoa0FyY2hpdmUuY2hlY2tlZDtcbiAgICAgICAgY29uc29sZS5sb2coXCJmZWVkRGV0YWlsIC0tPiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuZmVlZEZpbHRlckluZm8pKTtcblxuICAgICAgICBsZXQgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgXCJGZWVkRmlsdGVySW5mb1wiIDogSlNPTi5zdHJpbmdpZnkodGhpcy5mZWVkRmlsdGVySW5mbyksXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cblxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbXlmZWVkL2ZpdGVycmVzdWx0XCJdLG5hdmlnYXRpb25FeHRyYXMpO1xuICAgIH1cblxuICAgIGNhbGxEYXRlUGlja2VyKHBhcmEpIHtcblxuICAgICAgICBjb25zdCBNb2RhbFBpY2tlciA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtbW9kYWwtZGF0ZXRpbWVwaWNrZXJcIikuTW9kYWxEYXRldGltZXBpY2tlcjtcbiAgICAgICAgY29uc3QgcGlja2VyID0gbmV3IE1vZGFsUGlja2VyKCk7XG4gICAgICAgIHBpY2tlci5waWNrRGF0ZSh7XG4gICAgICAgICAgICB0aXRsZTogXCJTZWxlY3QgWW91ciBCaXJ0aGRheVwiLFxuICAgICAgICAgICAgdGhlbWU6IFwibGlnaHRcIixcbiAgICAgICAgICAgIG1heERhdGU6IG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSwgMTEsIDMxKVxuICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF0ZSBpczogXCIgKyByZXN1bHQuZGF5ICsgXCItXCIgKyByZXN1bHQubW9udGggKyBcIi1cIiArIHJlc3VsdC55ZWFyKTtcbiAgICAgICAgICAgIHZhciBfZGF5OiBzdHJpbmcgPSByZXN1bHQuZGF5O1xuICAgICAgICAgICAgaWYgKF9kYXkudG9TdHJpbmcoKS5sZW5ndGggPCAyKSB7IF9kYXkgPSBcIjBcIiArIF9kYXk7IH1cbiAgICAgICAgICAgIHZhciBzdHJEYXRlID0gbmV3IERhdGUocmVzdWx0LnllYXIgKyBcIi1cIiArIHJlc3VsdC5tb250aCArIFwiLVwiICsgX2RheSArIFwiVDAwOjAwOjAwXCIpO1xuICAgICAgICAgICAgdmFyIGRhdGVQaXBlID0gbmV3IERhdGVQaXBlKFwiZW4tVVNcIik7XG4gICAgICAgICAgICBsZXQgX2RhdGU6IGFueSA9IGRhdGVQaXBlLnRyYW5zZm9ybShzdHJEYXRlLCAnZGQgTU1NIHl5eXknKTs7XG4gICAgICAgICAgICBpZiAocGFyYSA9PSBcInBvc3RlZEZyb21cIikge1xuICAgICAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uUG9zdGVkX0RhdGVfRnJvbSA9IHN0ckRhdGU7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3N0ZWREYXRlRnJvbSA9IF9kYXRlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhID09IFwicG9zdGVkVG9cIikge1xuICAgICAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uUG9zdGVkX0RhdGVfVG8gPSBzdHJEYXRlO1xuICAgICAgICAgICAgICAgIHRoaXMucG9zdGVkRGF0ZVRvID0gX2RhdGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmEgPT0gXCJjcmVhdGVkRnJvbVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZWVkRmlsdGVySW5mby5DcmVhdGVkX0Zyb20gPSBzdHJEYXRlO1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlZERhdGVGcm9tID0gX2RhdGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmEgPT0gXCJjcmVhdGVkVG9cIikge1xuICAgICAgICAgICAgICAgIHRoaXMuZmVlZEZpbHRlckluZm8uQ3JlYXRlZF9UbyA9IHN0ckRhdGU7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVkRGF0ZVRvID0gX2RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==