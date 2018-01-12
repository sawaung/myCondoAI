"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var globalstorage_service_1 = require("../shared/store/globalstorage.service");
var page_1 = require("ui/page");
var color_1 = require("tns-core-modules/color");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var router_1 = require("nativescript-angular/router");
var router_2 = require("@angular/router");
var ChooseAccountComponent = /** @class */ (function () {
    function ChooseAccountComponent(router, route, routerExtensions, globalStorageService, page) {
        this.router = router;
        this.route = route;
        this.routerExtensions = routerExtensions;
        this.globalStorageService = globalStorageService;
        this.page = page;
    }
    ChooseAccountComponent.prototype.ngOnInit = function () {
        this.page.androidStatusBarBackground = new color_1.Color("#97519A");
        this.page.actionBarHidden = true;
        this.userList = [];
        this.userList = JSON.parse(this.globalStorageService.getUserDao('0'));
        if (this.userList.length > 0) {
            this.userList.forEach(function (element) {
                console.log("FullName -> " + element.FullName);
            });
        }
        else {
            this.routerExtensions.navigate(["/login"], {
                transition: {
                    name: "fade"
                },
                clearHistory: true,
            });
        }
    };
    ChooseAccountComponent.prototype.ngAfterViewInit = function () {
    };
    ChooseAccountComponent.prototype.addAnAccount = function () {
        this.router.navigate(['/login']);
    };
    ChooseAccountComponent.prototype.onItemTap = function (args) {
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
        loader.show();
        var selectedIndex = args.index;
        var user = this.userList[selectedIndex];
        this.globalStorageService.setTokenKey(user.TokenKey);
        this.globalStorageService.setCondominiumId(user.Condominium_Id);
        this.globalStorageService.setCurrentUserId(user.UserId);
        this.globalStorageService.setBatchNumber(user.BatchNo);
        this.globalStorageService.setCurrentUserInfo(user);
        loader.hide();
        this.router.navigate(["/myfeed"]); //route to feed_detail(1)
        //this.updateMyFeedsUI(null,"UNPOST",selectedIndex);
    };
    ChooseAccountComponent.prototype.onNavBtnTap = function () {
        this.routerExtensions.back();
    };
    ChooseAccountComponent.prototype.onRemoveAccount = function (userId) {
        //var fileToRemove = this.feedInfoDetail.MC_Feed_Files.filter(file => file.File_Id == fileId);
        var itemToRemove = this.userList.filter(function (user) { return user.UserId == userId; });
        console.log("file to remove " + JSON.stringify(itemToRemove));
        var i = this.userList.indexOf(itemToRemove[0]);
        console.log("index of file " + i);
        this.userList.splice(i, 1);
        this.globalStorageService.setUserDao('0', JSON.stringify(this.userList));
    };
    ChooseAccountComponent = __decorate([
        core_1.Component({
            selector: 'app-choose-account',
            template: "\n  <StackLayout #container>\n\n  <Image id=\"logo\" src=\"res://ic_logo\" stretch=\"none\" horizontalAlignment=\"center\"></Image>\n\n    <Label class=\"header Roboto-Regular\" text=\"Choose An Account\" class=\"m-l-10 m-b-10\"></Label>\n\n    <RadListView id = \"radListView\" [items]=\"userList\"  (itemTap)=\"onItemTap($event)\"  (itemSelected)=\"onItemSelected($event)\">\n        <ListViewLinearLayout tkListViewLayout scrollDirection=\"Vertical\" itemInsertAnimation=\"Default\" itemDeleteAnimation=\"Slide\"></ListViewLinearLayout>      \n        <ng-template tkListItemTemplate let-item=\"item\" let-i=\"index\" let-odd=\"odd\">\n                    <GridLayout class = \"cardview m-x-10 m-y-5\" rows=\"*\" columns= \"*,*\">   \n                        <StackLayout orientation=\"vertical\" row=\"0\" col=\"0\" class = \"m-t-5\"  width=\"170\">\n                          <Label class=\"header Roboto-Regular\" [text]=\"item.FullName\" class = \"m-l-5\"></Label>\n                          <Label class=\"header Roboto-Regular\" [text]=\"item.UserId\" class = \"m-l-5\"></Label>\n                        </StackLayout>  \n                        <StackLayout  horizontalAlignment=\"right\" orientation=\"vertical\" row=\"0\" col=\"1\" class = \"m-t-5 m-l-10\" width=\"40\">\n                          <Image src=\"res://ic_image_remove\" width = \"20\" height = \"20\" horizontalAlignment=\"right\" (tap) = \"onRemoveAccount(item.UserId)\"></Image>                                         \n                      </StackLayout>  \n                    </GridLayout>              \n        </ng-template>\n    </RadListView>\n\n    <Button text=\"Add An Account\" autocapitalizationType=\"none\" (tap)=\"addAnAccount()\" verticalAlignment=\"bottom\"></Button>\n  </StackLayout>\n          \n  ",
            styleUrls: ['login/login.component.css']
        }),
        __metadata("design:paramtypes", [router_2.Router, router_2.ActivatedRoute, router_1.RouterExtensions, globalstorage_service_1.GlobalStorageService, page_1.Page])
    ], ChooseAccountComponent);
    return ChooseAccountComponent;
}());
exports.ChooseAccountComponent = ChooseAccountComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvb3NlX2FjY291bnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hvb3NlX2FjY291bnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXVGO0FBR3ZGLCtFQUE2RTtBQUc3RSxnQ0FBK0I7QUFDL0IsZ0RBQStDO0FBQy9DLGlGQUFrRTtBQU9sRSxzREFBNkQ7QUFDN0QsMENBQXlFO0FBaUN6RTtJQUdFLGdDQUFvQixNQUFjLEVBQVMsS0FBcUIsRUFBUyxnQkFBa0MsRUFBUyxvQkFBeUMsRUFBUyxJQUFVO1FBQTVKLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBUyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUVoTCxDQUFDO0lBR0QseUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxhQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBRWpDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFckUsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBRSxDQUFDLENBQUEsQ0FBQztZQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87Z0JBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqRCxDQUFDLENBQUMs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QUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBM0ZVLHNCQUFzQjtRQS9CbEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsUUFBUSxFQUFFLDB3REF5QlQ7WUFDRCxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztTQUN6QyxDQUFDO3lDQUs0QixlQUFNLEVBQWdCLHVCQUFjLEVBQTJCLHlCQUFnQixFQUE4Qiw0Q0FBb0IsRUFBZSxXQUFJO09BSHJLLHNCQUFzQixDQTZGbEM7SUFBRCw2QkFBQztDQUFBLEFBN0ZELElBNkZDO0FBN0ZZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXNlcnMgfSBmcm9tICcuLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2xvYmFsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc3RvcmUvZ2xvYmFsc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIGFwcCBmcm9tICdhcHBsaWNhdGlvbic7XG5pbXBvcnQgeyBpc0lPUyB9IGZyb20gJ3BsYXRmb3JtJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xuaW1wb3J0IHsgTG9hZGluZ0luZGljYXRvciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcbmltcG9ydCB7IFdlYlZpZXcsIExvYWRFdmVudERhdGEgfSBmcm9tIFwidWkvd2ViLXZpZXdcIjtcbmltcG9ydCB7IFdlYlZpZXdJbnRlcmZhY2UgfSBmcm9tICduYXRpdmVzY3JpcHQtd2Vidmlldy1pbnRlcmZhY2UnO1xuaW1wb3J0IHtUZXh0RmllbGQgfSBmcm9tICd1aS90ZXh0LWZpZWxkJztcbmltcG9ydCB7U3RhY2tMYXlvdXR9IGZyb20gJ3VpL2xheW91dHMvc3RhY2stbGF5b3V0JztcbmltcG9ydCB7ICBSb2xlIH0gZnJvbSAnLi4vbXlGZWVkL21vZGVsL215ZmVlZC5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSxOYXZpZ2F0aW9uRXh0cmFzfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtY2hvb3NlLWFjY291bnQnLFxuICB0ZW1wbGF0ZTogYFxuICA8U3RhY2tMYXlvdXQgI2NvbnRhaW5lcj5cblxuICA8SW1hZ2UgaWQ9XCJsb2dvXCIgc3JjPVwicmVzOi8vaWNfbG9nb1wiIHN0cmV0Y2g9XCJub25lXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiPjwvSW1hZ2U+XG5cbiAgICA8TGFiZWwgY2xhc3M9XCJoZWFkZXIgUm9ib3RvLVJlZ3VsYXJcIiB0ZXh0PVwiQ2hvb3NlIEFuIEFjY291bnRcIiBjbGFzcz1cIm0tbC0xMCBtLWItMTBcIj48L0xhYmVsPlxuXG4gICAgPFJhZExpc3RWaWV3IGlkID0gXCJyYWRMaXN0Vmlld1wiIFtpdGVtc109XCJ1c2VyTGlzdFwiICAoaXRlbVRhcCk9XCJvbkl0ZW1UYXAoJGV2ZW50KVwiICAoaXRlbVNlbGVjdGVkKT1cIm9uSXRlbVNlbGVjdGVkKCRldmVudClcIj5cbiAgICAgICAgPExpc3RWaWV3TGluZWFyTGF5b3V0IHRrTGlzdFZpZXdMYXlvdXQgc2Nyb2xsRGlyZWN0aW9uPVwiVmVydGljYWxcIiBpdGVtSW5zZXJ0QW5pbWF0aW9uPVwiRGVmYXVsdFwiIGl0ZW1EZWxldGVBbmltYXRpb249XCJTbGlkZVwiPjwvTGlzdFZpZXdMaW5lYXJMYXlvdXQ+ICAgICAgXG4gICAgICAgIDxuZy10ZW1wbGF0ZSB0a0xpc3RJdGVtVGVtcGxhdGUgbGV0LWl0ZW09XCJpdGVtXCIgbGV0LWk9XCJpbmRleFwiIGxldC1vZGQ9XCJvZGRcIj5cbiAgICAgICAgICAgICAgICAgICAgPEdyaWRMYXlvdXQgY2xhc3MgPSBcImNhcmR2aWV3IG0teC0xMCBtLXktNVwiIHJvd3M9XCIqXCIgY29sdW1ucz0gXCIqLCpcIj4gICBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgcm93PVwiMFwiIGNvbD1cIjBcIiBjbGFzcyA9IFwibS10LTVcIiAgd2lkdGg9XCIxNzBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIGNsYXNzPVwiaGVhZGVyIFJvYm90by1SZWd1bGFyXCIgW3RleHRdPVwiaXRlbS5GdWxsTmFtZVwiIGNsYXNzID0gXCJtLWwtNVwiPjwvTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCBjbGFzcz1cImhlYWRlciBSb2JvdG8tUmVndWxhclwiIFt0ZXh0XT1cIml0ZW0uVXNlcklkXCIgY2xhc3MgPSBcIm0tbC01XCI+PC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+ICBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCAgaG9yaXpvbnRhbEFsaWdubWVudD1cInJpZ2h0XCIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIHJvdz1cIjBcIiBjb2w9XCIxXCIgY2xhc3MgPSBcIm0tdC01IG0tbC0xMFwiIHdpZHRoPVwiNDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIHNyYz1cInJlczovL2ljX2ltYWdlX3JlbW92ZVwiIHdpZHRoID0gXCIyMFwiIGhlaWdodCA9IFwiMjBcIiBob3Jpem9udGFsQWxpZ25tZW50PVwicmlnaHRcIiAodGFwKSA9IFwib25SZW1vdmVBY2NvdW50KGl0ZW0uVXNlcklkKVwiPjwvSW1hZ2U+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PiAgXG4gICAgICAgICAgICAgICAgICAgIDwvR3JpZExheW91dD4gICAgICAgICAgICAgIFxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvUmFkTGlzdFZpZXc+XG5cbiAgICA8QnV0dG9uIHRleHQ9XCJBZGQgQW4gQWNjb3VudFwiIGF1dG9jYXBpdGFsaXphdGlvblR5cGU9XCJub25lXCIgKHRhcCk9XCJhZGRBbkFjY291bnQoKVwiIHZlcnRpY2FsQWxpZ25tZW50PVwiYm90dG9tXCI+PC9CdXR0b24+XG4gIDwvU3RhY2tMYXlvdXQ+XG4gICAgICAgICAgXG4gIGAsXG4gIHN0eWxlVXJsczogWydsb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBDaG9vc2VBY2NvdW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LEFmdGVyVmlld0luaXQge1xuICB1c2VyTGlzdDpVc2Vyc1tdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIscHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUscHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLHByaXZhdGUgZ2xvYmFsU3RvcmFnZVNlcnZpY2U6R2xvYmFsU3RvcmFnZVNlcnZpY2UscHJpdmF0ZSBwYWdlOiBQYWdlKXsgXG5cbiAgfVxuICBcblxuICBuZ09uSW5pdCgpe1xuICAgIHRoaXMucGFnZS5hbmRyb2lkU3RhdHVzQmFyQmFja2dyb3VuZCA9IG5ldyBDb2xvcihcIiM5NzUxOUFcIik7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG5cbiAgICB0aGlzLnVzZXJMaXN0ID0gW107XG5cbiAgIHRoaXMudXNlckxpc3QgPSBKU09OLnBhcnNlKHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0VXNlckRhbygnMCcpKTtcblxuICAgIGlmKHRoaXMudXNlckxpc3QubGVuZ3RoID4gMCApe1xuICAgICAgIHRoaXMudXNlckxpc3QuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgIGNvbnNvbGUubG9nKFwiRnVsbE5hbWUgLT4gXCIgKyBlbGVtZW50LkZ1bGxOYW1lKTtcbiAgICAgICB9KTtcblxuICAgIH1lbHNleyAgXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9sb2dpblwiXSwge1xuICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgIG5hbWU6IFwiZmFkZVwiXG4gICAgICB9LFxuICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlLFxuICAgIFxuICAgIH0pO1xuICAgIH1cbiAgfVxuICBuZ0FmdGVyVmlld0luaXQoKXtcblxuICB9XG5cbiAgYWRkQW5BY2NvdW50KCl7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XG4gIH1cblxuICBvbkl0ZW1UYXAoYXJncykge1xuICAgIHZhciBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuICAgIFxuICAgIC8vIG9wdGlvbmFsIG9wdGlvbnNcbiAgICAvLyBhbmRyb2lkIGFuZCBpb3MgaGF2ZSBzb21lIHBsYXRmb3JtIHNwZWNpZmljIG9wdGlvbnNcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIG1lc3NhZ2U6ICdMb2FkaW5nLi4uJyxcbiAgICAgIHByb2dyZXNzOiAwLjY1LFxuICAgICAgYW5kcm9pZDoge1xuICAgICAgICBpbmRldGVybWluYXRlOiB0cnVlLFxuICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgICAgbWF4OiAxMDAsXG4gICAgICAgIHByb2dyZXNzTnVtYmVyRm9ybWF0OiBcIiUxZC8lMmRcIixcbiAgICAgICAgcHJvZ3Jlc3NQZXJjZW50Rm9ybWF0OiAwLjUzLFxuICAgICAgICBwcm9ncmVzc1N0eWxlOiAxLFxuICAgICAgICBzZWNvbmRhcnlQcm9ncmVzczogMVxuICAgICAgfSxcbiAgICB9XG5cbiAgICBsb2FkZXIuc2hvdygpO1xuXG4gICAgbGV0IHNlbGVjdGVkSW5kZXg6bnVtYmVyID0gPG51bWJlcj5hcmdzLmluZGV4O1xuICAgIGxldCB1c2VyOlVzZXJzID0gdGhpcy51c2VyTGlzdFtzZWxlY3RlZEluZGV4XTtcblxuICAgIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2Uuc2V0VG9rZW5LZXkodXNlci5Ub2tlbktleSk7XG4gICAgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5zZXRDb25kb21pbml1bUlkKHVzZXIuQ29uZG9taW5pdW1fSWQpO1xuICAgIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2Uuc2V0Q3VycmVudFVzZXJJZCh1c2VyLlVzZXJJZCk7XG4gICAgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5zZXRCYXRjaE51bWJlcih1c2VyLkJhdGNoTm8pO1xuICAgIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2Uuc2V0Q3VycmVudFVzZXJJbmZvKHVzZXIpO1xuXG5cblxuICAgIGxvYWRlci5oaWRlKCk7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL215ZmVlZFwiXSkgLy9yb3V0ZSB0byBmZWVkX2RldGFpbCgxKVxuICAgIFxuXG4gICAgLy90aGlzLnVwZGF0ZU15RmVlZHNVSShudWxsLFwiVU5QT1NUXCIsc2VsZWN0ZWRJbmRleCk7XG4gIH1cblxuICBvbk5hdkJ0blRhcCgpe1xuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gIH1cblxuICBvblJlbW92ZUFjY291bnQodXNlcklkKXtcbiAgICAgLy92YXIgZmlsZVRvUmVtb3ZlID0gdGhpcy5mZWVkSW5mb0RldGFpbC5NQ19GZWVkX0ZpbGVzLmZpbHRlcihmaWxlID0+IGZpbGUuRmlsZV9JZCA9PSBmaWxlSWQpO1xuICAgICB2YXIgaXRlbVRvUmVtb3ZlID0gdGhpcy51c2VyTGlzdC5maWx0ZXIodXNlciA9PiB1c2VyLlVzZXJJZCA9PSB1c2VySWQpO1xuICAgICBjb25zb2xlLmxvZyhcImZpbGUgdG8gcmVtb3ZlIFwiICsgSlNPTi5zdHJpbmdpZnkoaXRlbVRvUmVtb3ZlKSk7XG4gICAgIGxldCBpID0gdGhpcy51c2VyTGlzdC5pbmRleE9mKGl0ZW1Ub1JlbW92ZVswXSk7XG4gICAgIGNvbnNvbGUubG9nKFwiaW5kZXggb2YgZmlsZSBcIiArIGkpO1xuXG4gICAgIHRoaXMudXNlckxpc3Quc3BsaWNlKGksMSk7XG4gICAgIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2Uuc2V0VXNlckRhbygnMCcsIEpTT04uc3RyaW5naWZ5KHRoaXMudXNlckxpc3QpKTtcbiAgfVxuXG59Il19