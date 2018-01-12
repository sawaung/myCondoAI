import { Injectable, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { Users, CondoInfoDetail } from '../../shared/interfaces';
//import { localStorage } from 'nativescript-localstorage';
//import { SecureStorage } from "nativescript-secure-storage";
import * as localStorage from "application-settings";
import { ObservableArray } from "tns-core-modules/data/observable-array";

@Injectable()

export class GlobalStorageService implements OnInit {

    userInfo: Users;
    bookedUserInfo: Users;
    userId = '';
    facilityId = '';
    private _navItemSource = new BehaviorSubject<Users>(null);
    navItem$ =this._navItemSource.asObservable();

    
    constructor() {
        
        this.userId = '';
        this.facilityId = '';
    }

    ngOnInit() {
    }
    // service command
    changeNav(number) {
      this._navItemSource.next(number);
    }

    setCondominiumId(condoId: any): any {
        localStorage.setString('myCondominiumId', condoId);
        //this.myStorage.
        //this.localStorage.set({key: 'myCondominiumId', value: condoId});
    }

    getCondominiumId(): any {
        return localStorage.getString('myCondominiumId');
    }

    setApplicationId(appId: any): any {
        localStorage.setString('applicationId', appId);
   }

   getApplicationId(): any {
       return localStorage.getString('applicationId');
   }

    setSecretKey(secretKey: any): any {
        localStorage.setString('secretKey', secretKey);
    }

    getSecretKey(): any {
        return localStorage.getString('secretKey');
    }

    setCurrentUserId(userId: string) {
        localStorage.setString('myUserid', userId);
    }

    getCurrentUserId() {
        return localStorage.getString('myUserid');
    }

    setTokenKey(tokenKey: any) {
        localStorage.setString('myTokenKey', tokenKey);
    }

    getTokenKey() {
        return localStorage.getString('myTokenKey');
    }

    setBatchNumber(number: any) {
        localStorage.setString('myBatchNumber', number);
    }

    getBatchNumber() {
        return localStorage.getString('myBatchNumber');
    }

    setCurrentCondoInfo(condoInfo: CondoInfoDetail) {
        if (condoInfo === undefined) {
            localStorage.remove('CurrentCondoInfo');
        } else {
            localStorage.setString('CurrentCondoInfo', JSON.stringify(condoInfo));
        }
    }

    getCondoInfo() {
        return localStorage.getString('CurrentCondoInfo');
    }

    setCurrentUserInfo(uInfo: Users) {
        this.userInfo = uInfo;
        if (uInfo === undefined) {
            localStorage.remove('CurrentUserInfo');
        }else {
            localStorage.setString('CurrentUserInfo', JSON.stringify(uInfo));
        }
        this._navItemSource.next(this.userInfo);
    }

    getCurrentUserInfo(): Users {
        if (localStorage.getString('CurrentUserInfo')) {
            return <Users>JSON.parse(localStorage.getString('CurrentUserInfo'));
        }else {
            return null;
        }
    }

    setBookedUserId(userId: string) {
        localStorage.setString('SelectedUserId', userId);
        // console.log(this.userId, this.facilityId);
    }

    getUserId() {
        this.userId =localStorage.getString('SelectedUserId');
        return this.userId;
        // returnlocalStorage.retrieve('SelectedUserId');
    }

    setBookedFacilityId(facilityId: any) {
       localStorage.setString('SelectedFacilityId', facilityId);
    }

    getFacilityId() {
       this.facilityId =localStorage.getString('SelectedFacilityId');
        return this.facilityId;
        // returnlocalStorage.retrieve('SelectedFacilityId');
    }

    setSaveKeyword(key,value){
        localStorage.setString(key,value);
       
    }

    getSaveKeyword(key){
        return localStorage.getString(key);
    }

    setPermission(key,value){
        localStorage.setString(key,value);
    }
    getPermission(key){
        return localStorage.getString(key);
    }

    setUserDao(key:string,value:string){
        try {
            localStorage.setString(key, value);
        } catch (e) {
            console.log(e);
        }
    }

    getUserDao(key:string){      
        return localStorage.getString(key);
    }

    
    setFacilityGroupId(fgid: any) {
        
        localStorage.setString('myFacilityGroupId', fgid);
    }

    getFacilityGroupId(): any {
        return localStorage.getString('myFacilityGroupId');
    }
    
}
