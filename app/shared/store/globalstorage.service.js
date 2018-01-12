"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
//import { localStorage } from 'nativescript-localstorage';
//import { SecureStorage } from "nativescript-secure-storage";
var localStorage = require("application-settings");
var GlobalStorageService = /** @class */ (function () {
    function GlobalStorageService() {
        this.userId = '';
        this.facilityId = '';
        this._navItemSource = new BehaviorSubject_1.BehaviorSubject(null);
        this.navItem$ = this._navItemSource.asObservable();
        this.userId = '';
        this.facilityId = '';
    }
    GlobalStorageService.prototype.ngOnInit = function () {
    };
    // service command
    GlobalStorageService.prototype.changeNav = function (number) {
        this._navItemSource.next(number);
    };
    GlobalStorageService.prototype.setCondominiumId = function (condoId) {
        localStorage.setString('myCondominiumId', condoId);
        //this.myStorage.
        //this.localStorage.set({key: 'myCondominiumId', value: condoId});
    };
    GlobalStorageService.prototype.getCondominiumId = function () {
        return localStorage.getString('myCondominiumId');
    };
    GlobalStorageService.prototype.setApplicationId = function (appId) {
        localStorage.setString('applicationId', appId);
    };
    GlobalStorageService.prototype.getApplicationId = function () {
        return localStorage.getString('applicationId');
    };
    GlobalStorageService.prototype.setSecretKey = function (secretKey) {
        localStorage.setString('secretKey', secretKey);
    };
    GlobalStorageService.prototype.getSecretKey = function () {
        return localStorage.getString('secretKey');
    };
    GlobalStorageService.prototype.setCurrentUserId = function (userId) {
        localStorage.setString('myUserid', userId);
    };
    GlobalStorageService.prototype.getCurrentUserId = function () {
        return localStorage.getString('myUserid');
    };
    GlobalStorageService.prototype.setTokenKey = function (tokenKey) {
        localStorage.setString('myTokenKey', tokenKey);
    };
    GlobalStorageService.prototype.getTokenKey = function () {
        return localStorage.getString('myTokenKey');
    };
    GlobalStorageService.prototype.setBatchNumber = function (number) {
        localStorage.setString('myBatchNumber', number);
    };
    GlobalStorageService.prototype.getBatchNumber = function () {
        return localStorage.getString('myBatchNumber');
    };
    GlobalStorageService.prototype.setCurrentCondoInfo = function (condoInfo) {
        if (condoInfo === undefined) {
            localStorage.remove('CurrentCondoInfo');
        }
        else {
            localStorage.setString('CurrentCondoInfo', JSON.stringify(condoInfo));
        }
    };
    GlobalStorageService.prototype.getCondoInfo = function () {
        return localStorage.getString('CurrentCondoInfo');
    };
    GlobalStorageService.prototype.setCurrentUserInfo = function (uInfo) {
        this.userInfo = uInfo;
        if (uInfo === undefined) {
            localStorage.remove('CurrentUserInfo');
        }
        else {
            localStorage.setString('CurrentUserInfo', JSON.stringify(uInfo));
        }
        this._navItemSource.next(this.userInfo);
    };
    GlobalStorageService.prototype.getCurrentUserInfo = function () {
        if (localStorage.getString('CurrentUserInfo')) {
            return JSON.parse(localStorage.getString('CurrentUserInfo'));
        }
        else {
            return null;
        }
    };
    GlobalStorageService.prototype.setBookedUserId = function (userId) {
        localStorage.setString('SelectedUserId', userId);
        // console.log(this.userId, this.facilityId);
    };
    GlobalStorageService.prototype.getUserId = function () {
        this.userId = localStorage.getString('SelectedUserId');
        return this.userId;
        // returnlocalStorage.retrieve('SelectedUserId');
    };
    GlobalStorageService.prototype.setBookedFacilityId = function (facilityId) {
        localStorage.setString('SelectedFacilityId', facilityId);
    };
    GlobalStorageService.prototype.getFacilityId = function () {
        this.facilityId = localStorage.getString('SelectedFacilityId');
        return this.facilityId;
        // returnlocalStorage.retrieve('SelectedFacilityId');
    };
    GlobalStorageService.prototype.setSaveKeyword = function (key, value) {
        localStorage.setString(key, value);
    };
    GlobalStorageService.prototype.getSaveKeyword = function (key) {
        return localStorage.getString(key);
    };
    GlobalStorageService.prototype.setPermission = function (key, value) {
        localStorage.setString(key, value);
    };
    GlobalStorageService.prototype.getPermission = function (key) {
        return localStorage.getString(key);
    };
    GlobalStorageService.prototype.setUserDao = function (key, value) {
        try {
            localStorage.setString(key, value);
        }
        catch (e) {
            console.log(e);
        }
    };
    GlobalStorageService.prototype.getUserDao = function (key) {
        return localStorage.getString(key);
    };
    GlobalStorageService.prototype.setFacilityGroupId = function (fgid) {
        localStorage.setString('myFacilityGroupId', fgid);
    };
    GlobalStorageService.prototype.getFacilityGroupId = function () {
        return localStorage.getString('myFacilityGroupId');
    };
    GlobalStorageService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], GlobalStorageService);
    return GlobalStorageService;
}());
exports.GlobalStorageService = GlobalStorageService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2xvYmFsc3RvcmFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW1EO0FBQ25ELHdEQUFxRDtBQUdyRCwyREFBMkQ7QUFDM0QsOERBQThEO0FBQzlELG1EQUFxRDtBQUtyRDtJQVVJO1FBTkEsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDUixtQkFBYyxHQUFHLElBQUksaUNBQWUsQ0FBUSxJQUFJLENBQUMsQ0FBQztRQUMxRCxhQUFRLEdBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUt6QyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsdUNBQVEsR0FBUjtJQUNBLENBQUM7SUFDRCxrQkFBa0I7SUFDbEIsd0NBQVMsR0FBVCxVQUFVLE1BQU07UUFDZCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsK0NBQWdCLEdBQWhCLFVBQWlCLE9BQVk7UUFDekIsWUFBWSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuRCxpQkFBaUI7UUFDakIsa0VBQWtFO0lBQ3RFLENBQUM7SUFFRCwrQ0FBZ0IsR0FBaEI7UUFDSSxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCwrQ0FBZ0IsR0FBaEIsVUFBaUIsS0FBVTtRQUN2QixZQUFZLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsK0NBQWdCLEdBQWhCO1FBQ0ksTUFBTSxDQUFDLFlBQVksQ0FBQyxTQUFTLENB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Q2pCLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFHRCxpREFBa0IsR0FBbEIsVUFBbUIsSUFBUztRQUV4QixZQUFZLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxpREFBa0IsR0FBbEI7UUFDSSxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFoS1Esb0JBQW9CO1FBRmhDLGlCQUFVLEVBQUU7O09BRUEsb0JBQW9CLENBa0toQztJQUFELDJCQUFDO0NBQUEsQUFsS0QsSUFrS0M7QUFsS1ksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0fSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XHJcblxyXG5pbXBvcnQgeyBVc2VycywgQ29uZG9JbmZvRGV0YWlsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xyXG4vL2ltcG9ydCB7IGxvY2FsU3RvcmFnZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1sb2NhbHN0b3JhZ2UnO1xyXG4vL2ltcG9ydCB7IFNlY3VyZVN0b3JhZ2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXNlY3VyZS1zdG9yYWdlXCI7XHJcbmltcG9ydCAqIGFzIGxvY2FsU3RvcmFnZSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcblxyXG5leHBvcnQgY2xhc3MgR2xvYmFsU3RvcmFnZVNlcnZpY2UgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHVzZXJJbmZvOiBVc2VycztcclxuICAgIGJvb2tlZFVzZXJJbmZvOiBVc2VycztcclxuICAgIHVzZXJJZCA9ICcnO1xyXG4gICAgZmFjaWxpdHlJZCA9ICcnO1xyXG4gICAgcHJpdmF0ZSBfbmF2SXRlbVNvdXJjZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VXNlcnM+KG51bGwpO1xyXG4gICAgbmF2SXRlbSQgPXRoaXMuX25hdkl0ZW1Tb3VyY2UuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnVzZXJJZCA9ICcnO1xyXG4gICAgICAgIHRoaXMuZmFjaWxpdHlJZCA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgfVxyXG4gICAgLy8gc2VydmljZSBjb21tYW5kXHJcbiAgICBjaGFuZ2VOYXYobnVtYmVyKSB7XHJcbiAgICAgIHRoaXMuX25hdkl0ZW1Tb3VyY2UubmV4dChudW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENvbmRvbWluaXVtSWQoY29uZG9JZDogYW55KTogYW55IHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0U3RyaW5nKCdteUNvbmRvbWluaXVtSWQnLCBjb25kb0lkKTtcclxuICAgICAgICAvL3RoaXMubXlTdG9yYWdlLlxyXG4gICAgICAgIC8vdGhpcy5sb2NhbFN0b3JhZ2Uuc2V0KHtrZXk6ICdteUNvbmRvbWluaXVtSWQnLCB2YWx1ZTogY29uZG9JZH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvbmRvbWluaXVtSWQoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldFN0cmluZygnbXlDb25kb21pbml1bUlkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QXBwbGljYXRpb25JZChhcHBJZDogYW55KTogYW55IHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0U3RyaW5nKCdhcHBsaWNhdGlvbklkJywgYXBwSWQpO1xyXG4gICB9XHJcblxyXG4gICBnZXRBcHBsaWNhdGlvbklkKCk6IGFueSB7XHJcbiAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldFN0cmluZygnYXBwbGljYXRpb25JZCcpO1xyXG4gICB9XHJcblxyXG4gICAgc2V0U2VjcmV0S2V5KHNlY3JldEtleTogYW55KTogYW55IHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0U3RyaW5nKCdzZWNyZXRLZXknLCBzZWNyZXRLZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNlY3JldEtleSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0U3RyaW5nKCdzZWNyZXRLZXknKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDdXJyZW50VXNlcklkKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldFN0cmluZygnbXlVc2VyaWQnLCB1c2VySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1cnJlbnRVc2VySWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRTdHJpbmcoJ215VXNlcmlkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VG9rZW5LZXkodG9rZW5LZXk6IGFueSkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRTdHJpbmcoJ215VG9rZW5LZXknLCB0b2tlbktleSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG9rZW5LZXkoKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRTdHJpbmcoJ215VG9rZW5LZXknKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRCYXRjaE51bWJlcihudW1iZXI6IGFueSkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRTdHJpbmcoJ215QmF0Y2hOdW1iZXInLCBudW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEJhdGNoTnVtYmVyKCkge1xyXG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0U3RyaW5nKCdteUJhdGNoTnVtYmVyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q3VycmVudENvbmRvSW5mbyhjb25kb0luZm86IENvbmRvSW5mb0RldGFpbCkge1xyXG4gICAgICAgIGlmIChjb25kb0luZm8gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlKCdDdXJyZW50Q29uZG9JbmZvJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldFN0cmluZygnQ3VycmVudENvbmRvSW5mbycsIEpTT04uc3RyaW5naWZ5KGNvbmRvSW5mbykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRDb25kb0luZm8oKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRTdHJpbmcoJ0N1cnJlbnRDb25kb0luZm8nKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDdXJyZW50VXNlckluZm8odUluZm86IFVzZXJzKSB7XHJcbiAgICAgICAgdGhpcy51c2VySW5mbyA9IHVJbmZvO1xyXG4gICAgICAgIGlmICh1SW5mbyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmUoJ0N1cnJlbnRVc2VySW5mbycpO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldFN0cmluZygnQ3VycmVudFVzZXJJbmZvJywgSlNPTi5zdHJpbmdpZnkodUluZm8pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbmF2SXRlbVNvdXJjZS5uZXh0KHRoaXMudXNlckluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1cnJlbnRVc2VySW5mbygpOiBVc2VycyB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRTdHJpbmcoJ0N1cnJlbnRVc2VySW5mbycpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8VXNlcnM+SlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0U3RyaW5nKCdDdXJyZW50VXNlckluZm8nKSk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Qm9va2VkVXNlcklkKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldFN0cmluZygnU2VsZWN0ZWRVc2VySWQnLCB1c2VySWQpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudXNlcklkLCB0aGlzLmZhY2lsaXR5SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJJZCgpIHtcclxuICAgICAgICB0aGlzLnVzZXJJZCA9bG9jYWxTdG9yYWdlLmdldFN0cmluZygnU2VsZWN0ZWRVc2VySWQnKTtcclxuICAgICAgICByZXR1cm4gdGhpcy51c2VySWQ7XHJcbiAgICAgICAgLy8gcmV0dXJubG9jYWxTdG9yYWdlLnJldHJpZXZlKCdTZWxlY3RlZFVzZXJJZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEJvb2tlZEZhY2lsaXR5SWQoZmFjaWxpdHlJZDogYW55KSB7XHJcbiAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0U3RyaW5nKCdTZWxlY3RlZEZhY2lsaXR5SWQnLCBmYWNpbGl0eUlkKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGYWNpbGl0eUlkKCkge1xyXG4gICAgICAgdGhpcy5mYWNpbGl0eUlkID1sb2NhbFN0b3JhZ2UuZ2V0U3RyaW5nKCdTZWxlY3RlZEZhY2lsaXR5SWQnKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5mYWNpbGl0eUlkO1xyXG4gICAgICAgIC8vIHJldHVybmxvY2FsU3RvcmFnZS5yZXRyaWV2ZSgnU2VsZWN0ZWRGYWNpbGl0eUlkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2F2ZUtleXdvcmQoa2V5LHZhbHVlKXtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0U3RyaW5nKGtleSx2YWx1ZSk7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRTYXZlS2V5d29yZChrZXkpe1xyXG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0U3RyaW5nKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGVybWlzc2lvbihrZXksdmFsdWUpe1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRTdHJpbmcoa2V5LHZhbHVlKTtcclxuICAgIH1cclxuICAgIGdldFBlcm1pc3Npb24oa2V5KXtcclxuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldFN0cmluZyhrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFVzZXJEYW8oa2V5OnN0cmluZyx2YWx1ZTpzdHJpbmcpe1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRTdHJpbmcoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlckRhbyhrZXk6c3RyaW5nKXsgICAgICBcclxuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldFN0cmluZyhrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0RmFjaWxpdHlHcm91cElkKGZnaWQ6IGFueSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRTdHJpbmcoJ215RmFjaWxpdHlHcm91cElkJywgZmdpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RmFjaWxpdHlHcm91cElkKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRTdHJpbmcoJ215RmFjaWxpdHlHcm91cElkJyk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iXX0=