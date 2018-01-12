import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';
//import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Return, Patch, Users } from '../../shared/interfaces';
import { FeedInformation } from '../model/myfeed.model';
//import { FeedImageModalComponent } from '../../myFeed/components/dialog/feedimagemodal.component';


import { ConfigService } from '../../shared/utils/config.service';
import { DataService } from '../../shared/services/data.service';
import { GlobalStorageService } from '../../shared/store/globalstorage.service';

import * as bgHttp from "nativescript-background-http";
var session = bgHttp.session("image-upload");
import * as fileSystem from "file-system";

@Injectable()

export class MyFeedService {

    baseUrl = '';
    strFilePathUrl = '';

    constructor(public http: Http,
        public configService: ConfigService,
        public dataService: DataService,
        //public localStorageService: LocalStorageService,
        public globalStorageService: GlobalStorageService
        //public dialog: MdDialog
    ) {

        this.baseUrl = configService.getApiURI();
    }

    public getNewsFeedPermission(): Observable<Return> {
        const headers = new Headers();
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'role/news_feeds', { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    public getNewsfeedlist(fcId: any, ftId: any, title: string, search: string, pdateFrom: Date, pdateTo: Date, cdateFrom: Date, cdateTo: Date, cursorIndex: any, getNext: boolean, pageSize: number, post: boolean, unpost: boolean, isblocked: boolean): Observable<Return> {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());

        console.log("header -> " + this.globalStorageService.getApplicationId() + " <---> "
        + this.globalStorageService.getTokenKey() + " <---> "
        + this.globalStorageService.getSecretKey());

        this.dataService.addHeader(headers);

        let url: string = this.baseUrl + 'myFeeds?Feed_Group=1&Condominium_Id=' + this.globalStorageService.getCondominiumId();

        if (fcId != null) {
            url += '&Feed_Category_Id=' + fcId;
        }

        if (ftId != null) {
            url += '&FeedType_Id=' + ftId;
        }

        if (title != null) {
            url += '&Title=' + encodeURIComponent(title);
        }

        if (search != null) {
            url += '&SearchKeyword=' + encodeURIComponent(search);
        }

        if (pdateFrom != null) {
            url += '&Posted_Date_From=' + JSON.stringify(pdateFrom).replace('"', '').replace('"', '');
        }

        if (pdateTo != null) {
            url += '&Posted_Date_To=' + JSON.stringify(pdateTo).replace('"', '').replace('"', '');
        }

        if (cdateFrom != null) {
            url += '&Created_On_From=' + JSON.stringify(cdateFrom).replace('"', '').replace('"', '');
        }

        if (cdateTo != null) {
            url += '&Created_On_To=' + JSON.stringify(cdateTo).replace('"', '').replace('"', '');
        }

        if (cursorIndex != null) {
            url += '&Cursor_Index=' + cursorIndex;
        }

        if (getNext != null) {
            url += '&Get_Next=' + getNext;
        }

        if (pageSize != null) {
            url += '&Page_Size=' + pageSize;
        }

        if (post != null) {
            url += '&Post_Status=' + post;
        }

        if (unpost != null) {
            url += '&UnPost_Status=' + unpost;
        }

        if (isblocked != null) {
            url += '&isBlocked=' + isblocked;
        }

        console.log("getNewsfeedlist url --> " + url);
        return this.http.get(url, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text());
            })
            .catch(this.dataService.handleError);
    }

    public getfeedDetail(feedId: any): Observable<Return> {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'myFeeds/' + feedId, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text());
            })
            .catch(this.dataService.handleError);
    }

    public getfeedType(): Observable<Return> {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'myCondos/' + this.globalStorageService.getCondominiumId() + '/FeedTypes', { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    public getfeedCategory(): Observable<Return> {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'myCondos/' + this.globalStorageService.getCondominiumId() + '/FeedCategories', { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    public savetempfile(filedata: FormData, parentId: any): Observable<Return> {
        const headers = new Headers();
        this.dataService.addHeader_notJson(headers);
        return this.http.post(this.baseUrl + 'myFileUpload/' + parentId, filedata, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    public savetesttempfile(): Observable<Return> {
        const formData = new FormData();
        const test = '';
        formData.append('name', 'mycondo nativescript');
        return this.http.post('http://192.168.100.216:809/api/myFileUpload/testing', formData)
            .map((res: Response) => {
                alert(res.text());
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    public saveFeedInfo(feedInfo: FeedInformation): Observable<Return> {
        feedInfo.Condominium_Id = this.globalStorageService.getCondominiumId();
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        this.dataService.addHeader(headers);
        return this.http.post(this.baseUrl + '/myFeeds', JSON.stringify(feedInfo), { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    public updatefeedInfo(feedInfo: FeedInformation): Observable<Return> {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        this.dataService.addHeader(headers);

       // console.log("header ==> " + JSON.stringify(headers));
       // console.log("url " + this.baseUrl + 'myFeeds/' + feedInfo.Feed_Id );
        return this.http.put(this.baseUrl + 'myFeeds/' + feedInfo.Feed_Id, JSON.stringify(feedInfo), { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);

    }

    public changeFeedStatus(feedId: any, status: string): Observable<Return> {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        
        this.dataService.addHeader(headers);
        const feedStatus = new FeedStatus();
        feedStatus.status = status;
        return this.http.patch(this.baseUrl + 'myFeeds/?id=' + feedId, JSON.stringify(feedStatus), { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);

    }

    public createFeedStatus(feedInfo: FeedInformation): Observable<Return> {
        feedInfo.Condominium_Id = this.globalStorageService.getCondominiumId();
        const headers = new Headers();
        this.dataService.addHeader(headers);
        return this.http.post(this.baseUrl + '/myFeeds', JSON.stringify(feedInfo), { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    public getUploadedImagesInGallery(): Observable<Return> {
        const headers = new Headers();
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'myFileUpload/' + this.globalStorageService.getCondominiumId(), { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    public saveImagesInGallery(fdata: FormData): Observable<string> {
        const headers = new Headers();
        this.dataService.addHeader_notJson(headers);
        return this.http.post(this.baseUrl + 'myImageUpload/' + this.globalStorageService.getCondominiumId(), fdata, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    public deleteImagesInGallery(imgFilePath: string): Observable<Return> {
        const headers = new Headers();
        this.dataService.addHeader(headers);
        const body = JSON.stringify(
            {
                'FilePath': imgFilePath
            }
        );
        const options = new RequestOptions({
            headers: headers,
            body: JSON.stringify(body)
        });
        return this.http.delete(this.baseUrl + 'myFileUpload', options)
            .map((res: Response) => {
                return JSON.parse(res.text(), this.dataService.reviver);
            })
            .catch(this.dataService.handleError);
    }

    uploadFile(parentId:String,uri:string){
        
        let _response:string = "prepare to response";
        let headers = new Headers();
        console.log(_response);
                //headers.append("Content-Type", "multipart/form-data");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        headers.append("content-type", "multipart/form-data");

        var request = {
            url: "http://192.168.100.254:8013/api/myFileUpload/" + parentId,
            method: "POST",
            headers: {
                    "Application_Id": this.globalStorageService.getApplicationId(),
                    "Tokenkey": this.globalStorageService.getTokenKey(),
                    "Secret_Key": this.globalStorageService.getSecretKey(),
                    'content-type': 'multipart/form-data',
                    "File-Name": "bg.jpg"
                },
                description: "",
                androidDisplayNotificationProgress:false
            };
       
            //var task = session.uploadFile("/storage/emulated/0/Pictures/Screenshots/bg.jpg", request);
           
           // uri = "file://"+uri;
            console.log("request uri " + uri);
            var params = [
                { name: "fileToUpload", filename: uri, mimeType: 'image/jpg' }
            ];


            console.log("request ");
            var task = session.multipartUpload(params, request);    
            return task;
            /*task.on("progress", logEvent);
            task.on("error", logEvent);
            task.on("complete", uploadComplete);
            task.on("responded", (e)=> {let res = JSON.parse(e.data)
                 console.log("responded --> " + JSON.stringify(res));
             });
                 
            function logEvent(e) {
                console.log("event name " + e.eventName);
            }

            function uploadComplete(completeEvent) {
                console.log("complete " + JSON.stringify(completeEvent));
                //console.log("getBody " + JSON.stringify(completeEvent.response));
                //_response = completeEvent.response.getBodyAsString();
                //return _response;
            }    */         
       
    }

    /*public feedImageModal(strFilePath: string): Observable<boolean> {
        let dialogRef: MdDialogRef<FeedImageModalComponent>;
        dialogRef = this.dialog.open(FeedImageModalComponent);

        dialogRef.componentInstance.strFilePath = strFilePath;
        return dialogRef.afterClosed();
    }*/

}

export class FeedStatus {
    status: string;
}

