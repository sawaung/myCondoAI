"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var config_service_1 = require("../../shared/utils/config.service");
var data_service_1 = require("../../shared/services/data.service");
var globalstorage_service_1 = require("../../shared/store/globalstorage.service");
var MyFacilityService = /** @class */ (function () {
    function MyFacilityService(http, configService, dataService, globalStorageService) {
        this.http = http;
        this.configService = configService;
        this.dataService = dataService;
        this.globalStorageService = globalStorageService;
        this.baseUrl = '';
        this.strFilePathUrl = '';
        this.baseUrl = configService.getApiURI();
    }
    /* Start myFacilityBooking Functions */
    MyFacilityService.prototype.getBookingFacilityList = function (selectedDate) {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        var sdate = JSON.stringify(selectedDate).replace('"', '').replace('"', '').replace('Z', '');
        return this.http.get(this.baseUrl + 'myBooking?val_SelectedDate=' + sdate, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFacilityService.prototype.getBookingCalendar = function (fcId, userId) {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'myBooking/?val_FacilityId=' + fcId + '&val_UserId=' + userId, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFacilityService.prototype.getUserBookingList = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        //this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'myCondos/' + this.globalStorageService.getCondominiumId() + '/getAllActiveResidentWithRoomId', { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFacilityService.prototype.getTotalTimeSlot = function (fcId, selectedDate) {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        var sdate = JSON.stringify(selectedDate).replace('"', '').replace('"', '').replace('Z', '');
        sdate = sdate.substring(0, 10);
        return this.http.get(this.baseUrl + 'myBooking/get_total_time_slot?val_FacilityId=' + fcId + '&val_SelectedDate=' + sdate, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFacilityService.prototype.getBookingDetail = function (fcId, selectedDate, userId, tpdId) {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        var sdate = JSON.stringify(selectedDate).replace('"', '').replace('"', '').replace('Z', '');
        sdate = sdate.substring(0, 10);
        return this.http.get(this.baseUrl + 'myBooking/get_booking_detail?val_FacilityId=' + fcId + '&val_SelectedDate=' + sdate + '&val_UserId=' + userId + '&val_TPDId=' + tpdId, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFacilityService.prototype.getBookingList = function (userId, cs) {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'mybooking/get_mybooking?val_UserId=' + userId + '&val_CurrentState=' + cs, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFacilityService.prototype.getFacilityGroupID = function () {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'myBooking?val_SelectedDate=2017/02/17', { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFacilityService.prototype.getBookingMap = function (fgid) {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'mybooking/get_booking_maps?val_FGGroupId=' + fgid, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFacilityService.prototype.proceedBooking = function (_bookingInfo) {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        return this.http.post(this.baseUrl + 'myBooking/', JSON.stringify(_bookingInfo), { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFacilityService.prototype.getBookingPayment = function (bId) {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'mybooking/' + bId, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFacilityService.prototype.confirmBooking = function (bId, _bookingPaymentInfo) {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        return this.http.post(this.baseUrl + 'myBooking/' + bId + '/make_payment', JSON.stringify(_bookingPaymentInfo), { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFacilityService.prototype.confirmBookingWithPayPal = function (_bookingPaymentInfo) {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        return this.http.post(this.baseUrl + 'mybooking/' + _bookingPaymentInfo.Booking_Id + '/paypalpayment', JSON.stringify(_bookingPaymentInfo), { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFacilityService.prototype.getBookingCancellationInfo = function (bId) {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'mybooking/' + bId + '/bookingcancellationinfo', { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFacilityService.prototype.cancelBooking = function (bId, _bookingCancellatinInfo) {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        return this.http.post(this.baseUrl + 'mybooking/' + bId + '/bookingcancellation', JSON.stringify(_bookingCancellatinInfo), { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFacilityService.prototype.getCashBalance = function (userId) {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'mycredit/' + userId + '/availablecashbalance', { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFacilityService.prototype.getChequeList = function (userId, date) {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        var sdate = JSON.stringify(date).replace('"', '').replace('"', '').replace('Z', '');
        return this.http.get(this.baseUrl + 'mycredit/' + userId + '/availablechequelist?ActionDate=' + sdate, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    /* Start TopUp Functions */
    MyFacilityService.prototype.getBankList = function () {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'mycredit/banklist', { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFacilityService.prototype.proceedTopUp = function (uId, _myCreditNewCollection) {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        console.log(JSON.stringify(_myCreditNewCollection));
        return this.http.post(this.baseUrl + 'mycredit/' + uId + '/topup', JSON.stringify(_myCreditNewCollection), { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFacilityService.prototype.addBankInfo = function (_allBankListInfo) {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        return this.http.post(this.baseUrl + 'mycredit/bankinfo', JSON.stringify(_allBankListInfo), { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    /* Dialog Function Start */
    /*public bookingNotAllowModal(_isSuccess: boolean, message: string): Observable<boolean> {
        let dialogRef: MdDialogRef<BookingNotAllowComponent>;
        dialogRef = this.dialog.open(BookingNotAllowComponent);
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance._isSuccess = _isSuccess;
        return dialogRef.afterClosed();
    }

    public bookingDetailModal(bookFacilitiesRight: boolean, _bookingDetail: BookingDetail): Observable<boolean> {
        let dialogRef: MdDialogRef<BookingDetailModalComponent>;
        dialogRef = this.dialog.open(BookingDetailModalComponent);

        dialogRef.componentInstance._bookingDetail = _bookingDetail;
        dialogRef.componentInstance.bookFacilitiesRight = bookFacilitiesRight;

        return dialogRef.afterClosed();
    }

    public bookingProceedModal(confirmBookingRight: boolean, _bookingInfo: Booking): Observable<boolean> {
        let dialogRef: MdDialogRef<ConfirmBookingModalComponent>;
        dialogRef = this.dialog.open(ConfirmBookingModalComponent);

        dialogRef.componentInstance._bookingInfo = _bookingInfo;
        dialogRef.componentInstance.confirmBookingRight = confirmBookingRight;

        return dialogRef.afterClosed();
    }

    public userlistModal(_userList: Users[]): Observable<string> {
        let dialogRef: MdDialogRef<UserListModalComponent>;
        dialogRef = this.dialog.open(UserListModalComponent);

        dialogRef.componentInstance._userList = _userList;
        return dialogRef.afterClosed();
    }

    public pmapModal(_bookingmap: BookingMaps[]): Observable<boolean> {

        let dialogRef: MdDialogRef<PMapModalComponent>;
        dialogRef = this.dialog.open(PMapModalComponent);

        dialogRef.componentInstance._bookingmap = _bookingmap;

        return dialogRef.afterClosed();
    }*/
    MyFacilityService.prototype.getFacilityGroups = function (condoId, isBookable) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        return this.http.get(this.baseUrl + 'myCondos/' + condoId + '/FacilityGroups/?isBookable=' + isBookable, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFacilityService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            config_service_1.ConfigService,
            data_service_1.DataService,
            globalstorage_service_1.GlobalStorageService])
    ], MyFacilityService);
    return MyFacilityService;
}());
exports.MyFacilityService = MyFacilityService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlmYWNpbGl0eS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXlmYWNpbGl0eS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RTtBQUt4RSxvRUFBa0U7QUFDbEUsbUVBQWlFO0FBQ2pFLGtGQUFnRjtBQUtoRjtJQUtJLDJCQUFtQixJQUFVLEVBQ2xCLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ3hCLG9CQUEwQztRQUhsQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ2xCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFOckQsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBT2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCx1Q0FBdUM7SUFFdkMsa0RBQXNCLEdBQXRCLFVBQXVCLFlBQWlCO1FBQXhDLGlCQVVDO1FBUkcsSUFBTSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlGLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLDZCQUE2QixHQUFHLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUMz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LE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBQy9FLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsR0FBRyxPQUFPLEdBQUcsOEJBQThCLEdBQUcsVUFBVSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ3pILEdBQUcsQ0FBQyxVQUFDLEdBQWE7WUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1RCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBdFNRLGlCQUFpQjtRQUQ3QixpQkFBVSxFQUFFO3lDQU1nQixXQUFJO1lBQ0gsOEJBQWE7WUFDZiwwQkFBVztZQUNGLDRDQUFvQjtPQVI1QyxpQkFBaUIsQ0F3UzdCO0lBQUQsd0JBQUM7Q0FBQSxBQXhTRCxJQXdTQztBQXhTWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlLCBIZWFkZXJzLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuXHJcbmltcG9ydCB7IFJldHVybiwgUGF0Y2ggfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEJvb2tpbmcsIEJvb2tpbmdDYW5jZWxsYXRpb25PYmplY3QsIE15Q3JlZGl0VG9wVXAsIEJhbmtMaXN0SW5mbywgQm9va2luZ0RldGFpbCwgQm9va2luZ01hcHMgfSBmcm9tICcuLi9tb2RlbC9teWZhY2lsaXR5Lm1vZGVsJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2RhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IEdsb2JhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0b3JlL2dsb2JhbHN0b3JhZ2Uuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBVc2VycyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE15RmFjaWxpdHlTZXJ2aWNlIHtcclxuXHJcbiAgICBiYXNlVXJsID0gJyc7XHJcbiAgICBzdHJGaWxlUGF0aFVybCA9ICcnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwLFxyXG4gICAgICAgIHB1YmxpYyBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXHJcbiAgICAgICAgcHVibGljIGdsb2JhbFN0b3JhZ2VTZXJ2aWNlOiBHbG9iYWxTdG9yYWdlU2VydmljZSwpIHtcclxuXHJcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gY29uZmlnU2VydmljZS5nZXRBcGlVUkkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBTdGFydCBteUZhY2lsaXR5Qm9va2luZyBGdW5jdGlvbnMgKi9cclxuXHJcbiAgICBnZXRCb29raW5nRmFjaWxpdHlMaXN0KHNlbGVjdGVkRGF0ZTogYW55KTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5hZGRIZWFkZXIoaGVhZGVycyk7XHJcbiAgICAgICAgY29uc3Qgc2RhdGUgPSBKU09OLnN0cmluZ2lmeShzZWxlY3RlZERhdGUpLnJlcGxhY2UoJ1wiJywgJycpLnJlcGxhY2UoJ1wiJywgJycpLnJlcGxhY2UoJ1onLCAnJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlVXJsICsgJ215Qm9va2luZz92YWxfU2VsZWN0ZWREYXRlPScgKyBzZGF0ZSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCksIHRoaXMuZGF0YVNlcnZpY2UucmV2aXZlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmRhdGFTZXJ2aWNlLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRCb29raW5nQ2FsZW5kYXIoZmNJZDogYW55LCB1c2VySWQ6IGFueSk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZVVybCArICdteUJvb2tpbmcvP3ZhbF9GYWNpbGl0eUlkPScgKyBmY0lkICsgJyZ2YWxfVXNlcklkPScgKyB1c2VySWQsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLmRhdGFTZXJ2aWNlLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlckJvb2tpbmdMaXN0KCk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkFwcGxpY2F0aW9uX0lkXCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0QXBwbGljYXRpb25JZCgpKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIlRva2VuS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0VG9rZW5LZXkoKSk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJTZWNyZXRfS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0U2VjcmV0S2V5KCkpO1xyXG4gICAgICAgIC8vdGhpcy5kYXRhU2VydmljZS5hZGRIZWFkZXIoaGVhZGVycyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlVXJsICsgJ215Q29uZG9zLycgKyB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldENvbmRvbWluaXVtSWQoKSArICcvZ2V0QWxsQWN0aXZlUmVzaWRlbnRXaXRoUm9vbUlkJywgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCksIHRoaXMuZGF0YVNlcnZpY2UucmV2aXZlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmRhdGFTZXJ2aWNlLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUb3RhbFRpbWVTbG90KGZjSWQ6IGFueSwgc2VsZWN0ZWREYXRlOiBhbnkpOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG5cclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmFkZEhlYWRlcihoZWFkZXJzKTtcclxuICAgICAgICBsZXQgc2RhdGUgPSBKU09OLnN0cmluZ2lmeShzZWxlY3RlZERhdGUpLnJlcGxhY2UoJ1wiJywgJycpLnJlcGxhY2UoJ1wiJywgJycpLnJlcGxhY2UoJ1onLCAnJyk7XHJcbiAgICAgICAgc2RhdGUgPSBzZGF0ZS5zdWJzdHJpbmcoMCwgMTApO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZVVybCArICdteUJvb2tpbmcvZ2V0X3RvdGFsX3RpbWVfc2xvdD92YWxfRmFjaWxpdHlJZD0nICsgZmNJZCArICcmdmFsX1NlbGVjdGVkRGF0ZT0nICsgc2RhdGUsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLmRhdGFTZXJ2aWNlLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Qm9va2luZ0RldGFpbChmY0lkOiBhbnksIHNlbGVjdGVkRGF0ZTogYW55LCB1c2VySWQ6IGFueSwgdHBkSWQ6IGFueSk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIGxldCBzZGF0ZSA9IEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkRGF0ZSkucmVwbGFjZSgnXCInLCAnJykucmVwbGFjZSgnXCInLCAnJykucmVwbGFjZSgnWicsICcnKTtcclxuICAgICAgICBzZGF0ZSA9IHNkYXRlLnN1YnN0cmluZygwLCAxMCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlVXJsICsgJ215Qm9va2luZy9nZXRfYm9va2luZ19kZXRhaWw/dmFsX0ZhY2lsaXR5SWQ9JyArIGZjSWQgKyAnJnZhbF9TZWxlY3RlZERhdGU9JyArIHNkYXRlICsgJyZ2YWxfVXNlcklkPScgKyB1c2VySWQgKyAnJnZhbF9UUERJZD0nICsgdHBkSWQsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLmRhdGFTZXJ2aWNlLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Qm9va2luZ0xpc3QodXNlcklkOiBhbnksIGNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG5cclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmFkZEhlYWRlcihoZWFkZXJzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VVcmwgKyAnbXlib29raW5nL2dldF9teWJvb2tpbmc/dmFsX1VzZXJJZD0nICsgdXNlcklkICsgJyZ2YWxfQ3VycmVudFN0YXRlPScgKyBjcywgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCksIHRoaXMuZGF0YVNlcnZpY2UucmV2aXZlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmRhdGFTZXJ2aWNlLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGYWNpbGl0eUdyb3VwSUQoKTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5hZGRIZWFkZXIoaGVhZGVycyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlVXJsICsgJ215Qm9va2luZz92YWxfU2VsZWN0ZWREYXRlPTIwMTcvMDIvMTcnLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzLnRleHQoKSwgdGhpcy5kYXRhU2VydmljZS5yZXZpdmVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuZGF0YVNlcnZpY2UuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEJvb2tpbmdNYXAoZmdpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5hZGRIZWFkZXIoaGVhZGVycyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlVXJsICsgJ215Ym9va2luZy9nZXRfYm9va2luZ19tYXBzP3ZhbF9GR0dyb3VwSWQ9JyArIGZnaWQsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLmRhdGFTZXJ2aWNlLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2VlZEJvb2tpbmcoX2Jvb2tpbmdJbmZvOiBCb29raW5nKTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5hZGRIZWFkZXIoaGVhZGVycyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZVVybCArICdteUJvb2tpbmcvJywgSlNPTi5zdHJpbmdpZnkoX2Jvb2tpbmdJbmZvKSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCksIHRoaXMuZGF0YVNlcnZpY2UucmV2aXZlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmRhdGFTZXJ2aWNlLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRCb29raW5nUGF5bWVudChiSWQ6IGFueSk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZVVybCArICdteWJvb2tpbmcvJyArIGJJZCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCksIHRoaXMuZGF0YVNlcnZpY2UucmV2aXZlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmRhdGFTZXJ2aWNlLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25maXJtQm9va2luZyhiSWQ6IGFueSwgX2Jvb2tpbmdQYXltZW50SW5mbzogQm9va2luZyk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VVcmwgKyAnbXlCb29raW5nLycgKyBiSWQgKyAnL21ha2VfcGF5bWVudCcsIEpTT04uc3RyaW5naWZ5KF9ib29raW5nUGF5bWVudEluZm8pLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzLnRleHQoKSwgdGhpcy5kYXRhU2VydmljZS5yZXZpdmVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuZGF0YVNlcnZpY2UuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbmZpcm1Cb29raW5nV2l0aFBheVBhbChfYm9va2luZ1BheW1lbnRJbmZvOiBCb29raW5nKTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5hZGRIZWFkZXIoaGVhZGVycyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlVXJsICsgJ215Ym9va2luZy8nICsgX2Jvb2tpbmdQYXltZW50SW5mby5Cb29raW5nX0lkICsgJy9wYXlwYWxwYXltZW50JywgSlNPTi5zdHJpbmdpZnkoX2Jvb2tpbmdQYXltZW50SW5mbyksIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzLnRleHQoKSwgdGhpcy5kYXRhU2VydmljZS5yZXZpdmVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCh0aGlzLmRhdGFTZXJ2aWNlLmhhbmRsZUVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgIGdldEJvb2tpbmdDYW5jZWxsYXRpb25JbmZvKGJJZDogYW55KTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5hZGRIZWFkZXIoaGVhZGVycyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlVXJsICsgJ215Ym9va2luZy8nICsgYklkICsgJy9ib29raW5nY2FuY2VsbGF0aW9uaW5mbycsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLmRhdGFTZXJ2aWNlLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgY2FuY2VsQm9va2luZyhiSWQ6IGFueSwgX2Jvb2tpbmdDYW5jZWxsYXRpbkluZm86IEJvb2tpbmdDYW5jZWxsYXRpb25PYmplY3QpOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG5cclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmFkZEhlYWRlcihoZWFkZXJzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlVXJsICsgJ215Ym9va2luZy8nICsgYklkICsgJy9ib29raW5nY2FuY2VsbGF0aW9uJywgSlNPTi5zdHJpbmdpZnkoX2Jvb2tpbmdDYW5jZWxsYXRpbkluZm8pLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzLnRleHQoKSwgdGhpcy5kYXRhU2VydmljZS5yZXZpdmVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuZGF0YVNlcnZpY2UuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENhc2hCYWxhbmNlKHVzZXJJZDogYW55KTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5hZGRIZWFkZXIoaGVhZGVycyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlVXJsICsgJ215Y3JlZGl0LycgKyB1c2VySWQgKyAnL2F2YWlsYWJsZWNhc2hiYWxhbmNlJywgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCksIHRoaXMuZGF0YVNlcnZpY2UucmV2aXZlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmRhdGFTZXJ2aWNlLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGVxdWVMaXN0KHVzZXJJZDogYW55LCBkYXRlOiBEYXRlKTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5hZGRIZWFkZXIoaGVhZGVycyk7XHJcbiAgICAgICAgY29uc3Qgc2RhdGUgPSBKU09OLnN0cmluZ2lmeShkYXRlKS5yZXBsYWNlKCdcIicsICcnKS5yZXBsYWNlKCdcIicsICcnKS5yZXBsYWNlKCdaJywgJycpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZVVybCArICdteWNyZWRpdC8nICsgdXNlcklkICsgJy9hdmFpbGFibGVjaGVxdWVsaXN0P0FjdGlvbkRhdGU9JyArIHNkYXRlLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzLnRleHQoKSwgdGhpcy5kYXRhU2VydmljZS5yZXZpdmVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuZGF0YVNlcnZpY2UuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIFN0YXJ0IFRvcFVwIEZ1bmN0aW9ucyAqL1xyXG4gICAgZ2V0QmFua0xpc3QoKTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5hZGRIZWFkZXIoaGVhZGVycyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlVXJsICsgJ215Y3JlZGl0L2JhbmtsaXN0JywgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCksIHRoaXMuZGF0YVNlcnZpY2UucmV2aXZlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmRhdGFTZXJ2aWNlLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm9jZWVkVG9wVXAodUlkOiBhbnksIF9teUNyZWRpdE5ld0NvbGxlY3Rpb246IE15Q3JlZGl0VG9wVXBbXSk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KF9teUNyZWRpdE5ld0NvbGxlY3Rpb24pKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlVXJsICsgJ215Y3JlZGl0LycgKyB1SWQgKyAnL3RvcHVwJywgSlNPTi5zdHJpbmdpZnkoX215Q3JlZGl0TmV3Q29sbGVjdGlvbiksIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLmRhdGFTZXJ2aWNlLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQmFua0luZm8oX2FsbEJhbmtMaXN0SW5mbzogQmFua0xpc3RJbmZvKTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5hZGRIZWFkZXIoaGVhZGVycyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZVVybCArICdteWNyZWRpdC9iYW5raW5mbycsIEpTT04uc3RyaW5naWZ5KF9hbGxCYW5rTGlzdEluZm8pLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzLnRleHQoKSwgdGhpcy5kYXRhU2VydmljZS5yZXZpdmVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuZGF0YVNlcnZpY2UuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIERpYWxvZyBGdW5jdGlvbiBTdGFydCAqL1xyXG5cclxuICAgIC8qcHVibGljIGJvb2tpbmdOb3RBbGxvd01vZGFsKF9pc1N1Y2Nlc3M6IGJvb2xlYW4sIG1lc3NhZ2U6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xyXG4gICAgICAgIGxldCBkaWFsb2dSZWY6IE1kRGlhbG9nUmVmPEJvb2tpbmdOb3RBbGxvd0NvbXBvbmVudD47XHJcbiAgICAgICAgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihCb29raW5nTm90QWxsb3dDb21wb25lbnQpO1xyXG4gICAgICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5tZXNzYWdlID0gbWVzc2FnZTtcclxuICAgICAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuX2lzU3VjY2VzcyA9IF9pc1N1Y2Nlc3M7XHJcbiAgICAgICAgcmV0dXJuIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBib29raW5nRGV0YWlsTW9kYWwoYm9va0ZhY2lsaXRpZXNSaWdodDogYm9vbGVhbiwgX2Jvb2tpbmdEZXRhaWw6IEJvb2tpbmdEZXRhaWwpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgICAgICBsZXQgZGlhbG9nUmVmOiBNZERpYWxvZ1JlZjxCb29raW5nRGV0YWlsTW9kYWxDb21wb25lbnQ+O1xyXG4gICAgICAgIGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oQm9va2luZ0RldGFpbE1vZGFsQ29tcG9uZW50KTtcclxuXHJcbiAgICAgICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLl9ib29raW5nRGV0YWlsID0gX2Jvb2tpbmdEZXRhaWw7XHJcbiAgICAgICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmJvb2tGYWNpbGl0aWVzUmlnaHQgPSBib29rRmFjaWxpdGllc1JpZ2h0O1xyXG5cclxuICAgICAgICByZXR1cm4gZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGJvb2tpbmdQcm9jZWVkTW9kYWwoY29uZmlybUJvb2tpbmdSaWdodDogYm9vbGVhbiwgX2Jvb2tpbmdJbmZvOiBCb29raW5nKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICAgICAgbGV0IGRpYWxvZ1JlZjogTWREaWFsb2dSZWY8Q29uZmlybUJvb2tpbmdNb2RhbENvbXBvbmVudD47XHJcbiAgICAgICAgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihDb25maXJtQm9va2luZ01vZGFsQ29tcG9uZW50KTtcclxuXHJcbiAgICAgICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLl9ib29raW5nSW5mbyA9IF9ib29raW5nSW5mbztcclxuICAgICAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuY29uZmlybUJvb2tpbmdSaWdodCA9IGNvbmZpcm1Cb29raW5nUmlnaHQ7XHJcblxyXG4gICAgICAgIHJldHVybiBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXNlcmxpc3RNb2RhbChfdXNlckxpc3Q6IFVzZXJzW10pOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG4gICAgICAgIGxldCBkaWFsb2dSZWY6IE1kRGlhbG9nUmVmPFVzZXJMaXN0TW9kYWxDb21wb25lbnQ+O1xyXG4gICAgICAgIGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oVXNlckxpc3RNb2RhbENvbXBvbmVudCk7XHJcblxyXG4gICAgICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5fdXNlckxpc3QgPSBfdXNlckxpc3Q7XHJcbiAgICAgICAgcmV0dXJuIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwbWFwTW9kYWwoX2Jvb2tpbmdtYXA6IEJvb2tpbmdNYXBzW10pOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuXHJcbiAgICAgICAgbGV0IGRpYWxvZ1JlZjogTWREaWFsb2dSZWY8UE1hcE1vZGFsQ29tcG9uZW50PjtcclxuICAgICAgICBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKFBNYXBNb2RhbENvbXBvbmVudCk7XHJcblxyXG4gICAgICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5fYm9va2luZ21hcCA9IF9ib29raW5nbWFwO1xyXG5cclxuICAgICAgICByZXR1cm4gZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCk7XHJcbiAgICB9Ki9cclxuXHJcbiAgICBnZXRGYWNpbGl0eUdyb3Vwcyhjb25kb0lkOiBhbnksIGlzQm9va2FibGU6IGFueSk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQXBwbGljYXRpb25fSWRcIiwgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRBcHBsaWNhdGlvbklkKCkpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiVG9rZW5LZXlcIiwgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRUb2tlbktleSgpKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIlNlY3JldF9LZXlcIiwgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRTZWNyZXRLZXkoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlVXJsICsgJ215Q29uZG9zLycgKyBjb25kb0lkICsgJy9GYWNpbGl0eUdyb3Vwcy8/aXNCb29rYWJsZT0nICsgaXNCb29rYWJsZSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCksIHRoaXMuZGF0YVNlcnZpY2UucmV2aXZlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmRhdGFTZXJ2aWNlLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==