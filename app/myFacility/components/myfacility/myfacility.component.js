"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var globalstorage_service_1 = require("../../../shared/store/globalstorage.service");
var common_service_1 = require("../../../shared/utils/common.service");
var router_1 = require("@angular/router");
var data_service_1 = require("../../../shared/services/data.service");
var myfacility_service_1 = require("../../services/myfacility.service");
var interfaces_1 = require("../../../shared/interfaces");
var MyFacilityComponent = /** @class */ (function () {
    function MyFacilityComponent(route, router, dataService, facilityService, commonService, globalStorageService) {
        this.route = route;
        this.router = router;
        this.dataService = dataService;
        this.facilityService = facilityService;
        this.commonService = commonService;
        this.globalStorageService = globalStorageService;
        this.selectedUserId = '';
    }
    MyFacilityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        this.dataService.getUserRole('myfacility')
            .subscribe(function (res1) {
            _this.role = res1.result;
            _this.globalStorageService.setPermission('myFacility', JSON.stringify(res1.result));
            console.log("role permission --> " + _this.globalStorageService.getPermission('myFacility'));
        });
        this.currentuserInfo = this.globalStorageService.getCurrentUserInfo();
        this.facilityService.getUserBookingList()
            .subscribe(function (res2) {
            console.log("userList --> " + JSON.stringify(res2.result));
            _this.userList = res2.result;
            if (_this.userList.filter(function (item) { return (item.UserId === _this.currentuserInfo.UserId); }).length > 0) {
                _this.selectedUserId = _this.currentuserInfo.UserId;
            }
            else { }
            _this.setSelectedUserInfo(_this.selectedUserId);
            _this.loadFacilityGroup(_this.getSelectedUserId());
        });
    };
    MyFacilityComponent.prototype.setSelectedUserInfo = function (uid) {
        this.globalStorageService.setBookedUserId('');
        this.selecteduserInfo = null;
        for (var _i = 0, _a = this.userList; _i < _a.length; _i++) {
            var u = _a[_i];
            if (u.UserId === uid) {
                this.selecteduserInfo = new interfaces_1.Users();
                this.selecteduserInfo.UserId = u.UserId;
                this.selecteduserInfo.FullName = u.FullName;
                this.globalStorageService.setBookedUserId(this.selecteduserInfo.UserId); //save selected userInfo
            }
        }
    };
    MyFacilityComponent.prototype.loadFacilityGroup = function (userId) {
        var _this = this;
        this.busy = this.facilityService.getFacilityGroups(this.globalStorageService.getCondominiumId(), true)
            .subscribe(function (res) {
            console.log("facilityList --> " + JSON.stringify(res.result));
            _this.collFacilityGroup = res.result;
            if (_this.collFacilityGroup) {
                _this.selectedFacilityId = _this.collFacilityGroup[0].Facility_Group_Id;
            }
            if (_this.globalStorageService.getFacilityGroupId()) {
                _this.selectedFacilityId = _this.globalStorageService.getFacilityGroupId();
            }
            // this.globalStorageService.setBookedFacilityId(this.selectedfacilityInfo.Facility_Id);
            _this.bindSelectedFacility();
            //this.bindSelectedCalendar(userId);
        });
        console.log("loadfacilityGroup finish");
    };
    MyFacilityComponent.prototype.getSelectedUserId = function () {
        if (this.selecteduserInfo) {
            console.log("selectedUserInfo " + this.selecteduserInfo.UserId);
            return this.selecteduserInfo.UserId;
        }
        return '';
    };
    /* Facility dropdown index changed */
    MyFacilityComponent.prototype.bindSelectedFacility = function () {
        for (var _i = 0, _a = this.collFacilityGroup; _i < _a.length; _i++) {
            var fg = _a[_i];
            if (fg.Facility_Group_Id == this.selectedFacilityId) {
                this.selectedFacilityGroup = fg;
            }
        }
        //this.bindSelectedCalendar(this.getSelectedUserId());
    };
    Object.defineProperty(MyFacilityComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    MyFacilityComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], MyFacilityComponent.prototype, "drawerComponent", void 0);
    MyFacilityComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-myfacility',
            templateUrl: './myfacility.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router, data_service_1.DataService,
            myfacility_service_1.MyFacilityService,
            common_service_1.CommonService,
            globalstorage_service_1.GlobalStorageService])
    ], MyFacilityComponent);
    return MyFacilityComponent;
}());
exports.MyFacilityComponent = MyFacilityComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlmYWNpbGl0eS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteWZhY2lsaXR5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCw2REFBOEY7QUFDOUYsa0VBQWdGO0FBR2hGLHFGQUFtRjtBQUNuRix1RUFBcUU7QUFDckUsMENBQTJFO0FBRTNFLHNFQUFvRTtBQUNwRSx3RUFBc0U7QUFDdEUseURBQXlEO0FBWXpEO0lBaUJFLDZCQUFvQixLQUFxQixFQUMvQixNQUFjLEVBQVUsV0FBd0IsRUFDakQsZUFBa0MsRUFDakMsYUFBNEIsRUFDNUIsb0JBQTBDO1FBSmhDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQy9CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUNqRCxvQkFBZSxHQUFmLGVBQWUsQ0FBbUI7UUFDakMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQWhCcEQsbUJBQWMsR0FBRyxFQUFFLENBQUM7SUFpQmhCLENBQUM7SUFJTCxzQ0FBUSxHQUFSO1FBQUEsaUJBd0JDO1FBdkJDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLG1DQUFzQixFQUFFLENBQUM7UUFDMUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO2FBQ3ZDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDYixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDeEIsS0FBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNuRixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixHQUFHLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsWUFBWSxD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LFFBQVEsQ0FBQztrQ0FBa0IsZ0NBQXNCO2dFQUFDO0lBaEJsRCxtQkFBbUI7UUFQL0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFdBQVcsRUFBRSxtQkFBbUI7U0FDakMsQ0FBQzt5Q0FvQjJCLHVCQUFjO1lBQ3ZCLGVBQU0sRUFBdUIsMEJBQVc7WUFDaEMsc0NBQWlCO1lBQ2xCLDhCQUFhO1lBQ04sNENBQW9CO09BckJ6QyxtQkFBbUIsQ0E0Ry9CO0lBQUQsMEJBQUM7Q0FBQSxBQTVHRCxJQTRHQztBQTVHWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IERyYXdlclRyYW5zaXRpb25CYXNlLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlclwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xuaW1wb3J0IHsgaXNJT1MgfSBmcm9tIFwicGxhdGZvcm1cIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IEdsb2JhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3N0b3JlL2dsb2JhbHN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBDb21tb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3V0aWxzL2NvbW1vbi5zZXJ2aWNlJztcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUsIE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2RhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBNeUZhY2lsaXR5U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL215ZmFjaWxpdHkuc2VydmljZSc7XG5pbXBvcnQgeyBSb2xlLCBVc2VycyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmFjaWxpdHlMaXN0LCBGYWNpbGl0eUdyb3VwLCBGZWUsIEZhY2lsaXR5R3JvdXBGaWxlLCBCb29raW5nQ2FsZW5kYXIsIFRvdGFsVGltZVNsb3QsIEJvb2tpbmcsIEJvb2tpbmdEZXRhaWwsIENhbmNlbEJvb2tpbmdDb25maXJtLCBCb29raW5nTWFwcywgQm9va2luZ0NhbmNlbGxhdGlvbk9iamVjdCwgQ2hlcXVlQmFsYW5jZUluZm8sIEZhY2lsaXR5IH0gZnJvbSAnLi4vLi4vbW9kZWwvbXlmYWNpbGl0eS5tb2RlbCc7XG5cblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYXBwLW15ZmFjaWxpdHknLFxuICB0ZW1wbGF0ZVVybDogJy4vbXlmYWNpbGl0eS5odG1sJ1xufSlcblxuXG5leHBvcnQgY2xhc3MgTXlGYWNpbGl0eUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcm9sZTogUm9sZVtdO1xuICBjdXJyZW50dXNlckluZm86IFVzZXJzO1xuICB1c2VyTGlzdDogVXNlcnNbXTtcbiAgc2VsZWN0ZWRVc2VySWQgPSAnJztcbiAgc2VsZWN0ZWR1c2VySW5mbzogVXNlcnM7XG4gIGJ1c3k6IFN1YnNjcmlwdGlvbjtcblxuICBjb2xsRmFjaWxpdHlHcm91cDogRmFjaWxpdHlHcm91cFtdO1xuICBzZWxlY3RlZEZhY2lsaXR5R3JvdXA6IEZhY2lsaXR5R3JvdXA7XG5cbiAgc2VsZWN0ZWRGYWNpbGl0eUlkOiBhbnk7XG5cbiAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xuXG4gIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICBwdWJsaWMgZmFjaWxpdHlTZXJ2aWNlOiBNeUZhY2lsaXR5U2VydmljZSxcbiAgICBwcml2YXRlIGNvbW1vblNlcnZpY2U6IENvbW1vblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBnbG9iYWxTdG9yYWdlU2VydmljZTogR2xvYmFsU3RvcmFnZVNlcnZpY2UsXG4gICkgeyB9XG5cblxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFNsaWRlSW5PblRvcFRyYW5zaXRpb24oKTtcbiAgICB0aGlzLmRhdGFTZXJ2aWNlLmdldFVzZXJSb2xlKCdteWZhY2lsaXR5JylcbiAgICAgIC5zdWJzY3JpYmUocmVzMSA9PiB7XG4gICAgICAgIHRoaXMucm9sZSA9IHJlczEucmVzdWx0O1xuICAgICAgICB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLnNldFBlcm1pc3Npb24oJ215RmFjaWxpdHknLCBKU09OLnN0cmluZ2lmeShyZXMxLnJlc3VsdCkpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInJvbGUgcGVybWlzc2lvbiAtLT4gXCIgKyB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldFBlcm1pc3Npb24oJ215RmFjaWxpdHknKSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5jdXJyZW50dXNlckluZm8gPSB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldEN1cnJlbnRVc2VySW5mbygpO1xuXG4gICAgdGhpcy5mYWNpbGl0eVNlcnZpY2UuZ2V0VXNlckJvb2tpbmdMaXN0KClcbiAgICAgIC5zdWJzY3JpYmUocmVzMiA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidXNlckxpc3QgLS0+IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzMi5yZXN1bHQpKTtcbiAgICAgICAgdGhpcy51c2VyTGlzdCA9IHJlczIucmVzdWx0O1xuICAgIFxuICAgICAgICBpZiAodGhpcy51c2VyTGlzdC5maWx0ZXIoKGl0ZW0pID0+IChpdGVtLlVzZXJJZCA9PT0gdGhpcy5jdXJyZW50dXNlckluZm8uVXNlcklkKSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRVc2VySWQgPSB0aGlzLmN1cnJlbnR1c2VySW5mby5Vc2VySWQ7XG4gICAgICAgIH0gZWxzZSB7IH1cbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZFVzZXJJbmZvKHRoaXMuc2VsZWN0ZWRVc2VySWQpO1xuICAgICAgICB0aGlzLmxvYWRGYWNpbGl0eUdyb3VwKHRoaXMuZ2V0U2VsZWN0ZWRVc2VySWQoKSk7XG4gICAgICB9KTtcblxuXG4gIH1cblxuICBzZXRTZWxlY3RlZFVzZXJJbmZvKHVpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5zZXRCb29rZWRVc2VySWQoJycpO1xuICAgIHRoaXMuc2VsZWN0ZWR1c2VySW5mbyA9IG51bGw7XG4gICAgZm9yIChjb25zdCB1IG9mIHRoaXMudXNlckxpc3QpIHtcbiAgICAgIGlmICh1LlVzZXJJZCA9PT0gdWlkKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWR1c2VySW5mbyA9IG5ldyBVc2VycygpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkdXNlckluZm8uVXNlcklkID0gdS5Vc2VySWQ7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWR1c2VySW5mby5GdWxsTmFtZSA9IHUuRnVsbE5hbWU7XG4gICAgICAgIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2Uuc2V0Qm9va2VkVXNlcklkKHRoaXMuc2VsZWN0ZWR1c2VySW5mby5Vc2VySWQpOy8vc2F2ZSBzZWxlY3RlZCB1c2VySW5mb1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxvYWRGYWNpbGl0eUdyb3VwKHVzZXJJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5idXN5ID0gdGhpcy5mYWNpbGl0eVNlcnZpY2UuZ2V0RmFjaWxpdHlHcm91cHModGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRDb25kb21pbml1bUlkKCksIHRydWUpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmFjaWxpdHlMaXN0IC0tPiBcIiArIEpTT04uc3RyaW5naWZ5KHJlcy5yZXN1bHQpKTtcbiAgICAgICAgdGhpcy5jb2xsRmFjaWxpdHlHcm91cCA9IHJlcy5yZXN1bHQ7XG4gICAgICAgIGlmICh0aGlzLmNvbGxGYWNpbGl0eUdyb3VwKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEZhY2lsaXR5SWQgPSB0aGlzLmNvbGxGYWNpbGl0eUdyb3VwWzBdLkZhY2lsaXR5X0dyb3VwX0lkO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldEZhY2lsaXR5R3JvdXBJZCgpKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEZhY2lsaXR5SWQgPSB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldEZhY2lsaXR5R3JvdXBJZCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2Uuc2V0Qm9va2VkRmFjaWxpdHlJZCh0aGlzLnNlbGVjdGVkZmFjaWxpdHlJbmZvLkZhY2lsaXR5X0lkKTtcbiAgICAgICAgdGhpcy5iaW5kU2VsZWN0ZWRGYWNpbGl0eSgpO1xuICAgICAgICAvL3RoaXMuYmluZFNlbGVjdGVkQ2FsZW5kYXIodXNlcklkKTtcbiAgICAgIH0pO1xuICAgICAgY29uc29sZS5sb2coXCJsb2FkZmFjaWxpdHlHcm91cCBmaW5pc2hcIik7XG4gIH1cblxuICBnZXRTZWxlY3RlZFVzZXJJZCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkdXNlckluZm8pIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2VsZWN0ZWRVc2VySW5mbyBcIiArIHRoaXMuc2VsZWN0ZWR1c2VySW5mby5Vc2VySWQpO1xuICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWR1c2VySW5mby5Vc2VySWQ7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIC8qIEZhY2lsaXR5IGRyb3Bkb3duIGluZGV4IGNoYW5nZWQgKi9cbiAgYmluZFNlbGVjdGVkRmFjaWxpdHkoKSB7XG4gICAgZm9yIChsZXQgZmcgb2YgdGhpcy5jb2xsRmFjaWxpdHlHcm91cCkge1xuICAgICAgaWYgKGZnLkZhY2lsaXR5X0dyb3VwX0lkID09IHRoaXMuc2VsZWN0ZWRGYWNpbGl0eUlkKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRGYWNpbGl0eUdyb3VwID0gZmc7XG4gICAgICB9XG4gICAgfVxuICAgIC8vdGhpcy5iaW5kU2VsZWN0ZWRDYWxlbmRhcih0aGlzLmdldFNlbGVjdGVkVXNlcklkKCkpO1xuICB9XG4gIGdldCBzaWRlRHJhd2VyVHJhbnNpdGlvbigpOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XG4gICAgcmV0dXJuIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uO1xuICB9XG5cblxuICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgfVxufVxuXG4iXX0=