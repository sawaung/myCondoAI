import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Return, Patch } from '../../shared/interfaces';
import { Booking, BookingCancellationObject, MyCreditTopUp, BankListInfo, BookingDetail, BookingMaps } from '../model/myfacility.model';
import { ConfigService } from '../../shared/utils/config.service';
import { DataService } from '../../shared/services/data.service';
import { GlobalStorageService } from '../../shared/store/globalstorage.service';

import { Users } from '../../shared/interfaces';

@Injectable()
export class MyFacilityService {

    baseUrl = '';
    strFilePathUrl = '';

    constructor(public http: Http,
        public configService: ConfigService,
        public dataService: DataService,
        public globalStorageService: GlobalStorageService,) {

        this.baseUrl = configService.getApiURI();
    }

    /* Start myFacilityBooking Functions */

    getBookingFacilityList(selectedDate: any): Observable<Return> {

        const headers = new Headers();
        this.dataService.addHeader(headers);
        const sdate = JSON.stringify(selectedDate).replace('"', '').replace('"', '').replace('Z', '');
        return this.http.get(this.baseUrl + 'myBooking?val_SelectedDate=' + sdate, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    getBookingCalendar(fcId: any, userId: any): Observable<Return> {

        const headers = new Headers();
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'myBooking/?val_FacilityId=' + fcId + '&val_UserId=' + userId, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    getUserBookingList(): Observable<Return> {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        //this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'myCondos/' + this.globalStorageService.getCondominiumId() + '/getAllActiveResidentWithRoomId', { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    getTotalTimeSlot(fcId: any, selectedDate: any): Observable<Return> {

        const headers = new Headers();
        this.dataService.addHeader(headers);
        let sdate = JSON.stringify(selectedDate).replace('"', '').replace('"', '').replace('Z', '');
        sdate = sdate.substring(0, 10);
        return this.http.get(this.baseUrl + 'myBooking/get_total_time_slot?val_FacilityId=' + fcId + '&val_SelectedDate=' + sdate, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    getBookingDetail(fcId: any, selectedDate: any, userId: any, tpdId: any): Observable<Return> {

        const headers = new Headers();
        this.dataService.addHeader(headers);
        let sdate = JSON.stringify(selectedDate).replace('"', '').replace('"', '').replace('Z', '');
        sdate = sdate.substring(0, 10);
        return this.http.get(this.baseUrl + 'myBooking/get_booking_detail?val_FacilityId=' + fcId + '&val_SelectedDate=' + sdate + '&val_UserId=' + userId + '&val_TPDId=' + tpdId, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    getBookingList(userId: any, cs: number): Observable<Return> {

        const headers = new Headers();
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'mybooking/get_mybooking?val_UserId=' + userId + '&val_CurrentState=' + cs, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    getFacilityGroupID(): Observable<Return> {

        const headers = new Headers();
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'myBooking?val_SelectedDate=2017/02/17', { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    getBookingMap(fgid: string): Observable<Return> {

        const headers = new Headers();
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'mybooking/get_booking_maps?val_FGGroupId=' + fgid, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    proceedBooking(_bookingInfo: Booking): Observable<Return> {

        const headers = new Headers();
        this.dataService.addHeader(headers);
        return this.http.post(this.baseUrl + 'myBooking/', JSON.stringify(_bookingInfo), { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    getBookingPayment(bId: any): Observable<Return> {

        const headers = new Headers();
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'mybooking/' + bId, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    confirmBooking(bId: any, _bookingPaymentInfo: Booking): Observable<Return> {

        const headers = new Headers();
        this.dataService.addHeader(headers);
        return this.http.post(this.baseUrl + 'myBooking/' + bId + '/make_payment', JSON.stringify(_bookingPaymentInfo), { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    confirmBookingWithPayPal(_bookingPaymentInfo: Booking): Observable<Return> {
                const headers = new Headers();
                this.dataService.addHeader(headers);
                return this.http.post(this.baseUrl + 'mybooking/' + _bookingPaymentInfo.Booking_Id + '/paypalpayment', JSON.stringify(_bookingPaymentInfo), { headers: headers })
                    .map((res: Response) => {
                        return JSON.parse(res.text(), this.dataService.reviver);
                    })
                    .catch(this.dataService.handleError);
            }

    getBookingCancellationInfo(bId: any): Observable<Return> {

        const headers = new Headers();
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'mybooking/' + bId + '/bookingcancellationinfo', { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    cancelBooking(bId: any, _bookingCancellatinInfo: BookingCancellationObject): Observable<Return> {

        const headers = new Headers();
        this.dataService.addHeader(headers);
        return this.http.post(this.baseUrl + 'mybooking/' + bId + '/bookingcancellation', JSON.stringify(_bookingCancellatinInfo), { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    getCashBalance(userId: any): Observable<Return> {

        const headers = new Headers();
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'mycredit/' + userId + '/availablecashbalance', { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    getChequeList(userId: any, date: Date): Observable<Return> {

        const headers = new Headers();
        this.dataService.addHeader(headers);
        const sdate = JSON.stringify(date).replace('"', '').replace('"', '').replace('Z', '');
        return this.http.get(this.baseUrl + 'mycredit/' + userId + '/availablechequelist?ActionDate=' + sdate, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    /* Start TopUp Functions */
    getBankList(): Observable<Return> {

        const headers = new Headers();
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'mycredit/banklist', { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    proceedTopUp(uId: any, _myCreditNewCollection: MyCreditTopUp[]): Observable<Return> {

        const headers = new Headers();
        this.dataService.addHeader(headers);
        console.log(JSON.stringify(_myCreditNewCollection));
        return this.http.post(this.baseUrl + 'mycredit/' + uId + '/topup', JSON.stringify(_myCreditNewCollection), { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    addBankInfo(_allBankListInfo: BankListInfo): Observable<Return> {

        const headers = new Headers();
        this.dataService.addHeader(headers);
        return this.http.post(this.baseUrl + 'mycredit/bankinfo', JSON.stringify(_allBankListInfo), { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

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

    getFacilityGroups(condoId: any, isBookable: any): Observable<Return> {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        return this.http.get(this.baseUrl + 'myCondos/' + condoId + '/FacilityGroups/?isBookable=' + isBookable, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

}

