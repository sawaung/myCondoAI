"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
//import { FeedImageModalComponent } from '../../myFeed/components/dialog/feedimagemodal.component';
var config_service_1 = require("../../shared/utils/config.service");
var data_service_1 = require("../../shared/services/data.service");
var globalstorage_service_1 = require("../../shared/store/globalstorage.service");
var bgHttp = require("nativescript-background-http");
var session = bgHttp.session("image-upload");
var MyFeedService = /** @class */ (function () {
    function MyFeedService(http, configService, dataService, 
        //public localStorageService: LocalStorageService,
        globalStorageService
        //public dialog: MdDialog
    ) {
        this.http = http;
        this.configService = configService;
        this.dataService = dataService;
        this.globalStorageService = globalStorageService;
        this.baseUrl = '';
        this.strFilePathUrl = '';
        this.baseUrl = configService.getApiURI();
    }
    MyFeedService.prototype.getNewsFeedPermission = function () {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'role/news_feeds', { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFeedService.prototype.getNewsfeedlist = function (fcId, ftId, title, search, pdateFrom, pdateTo, cdateFrom, cdateTo, cursorIndex, getNext, pageSize, post, unpost, isblocked) {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        console.log("header -> " + this.globalStorageService.getApplicationId() + " <---> "
            + this.globalStorageService.getTokenKey() + " <---> "
            + this.globalStorageService.getSecretKey());
        this.dataService.addHeader(headers);
        var url = this.baseUrl + 'myFeeds?Feed_Group=1&Condominium_Id=' + this.globalStorageService.getCondominiumId();
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
            .map(function (res) {
            return JSON.parse(res.text());
        })
            .catch(this.dataService.handleError);
    };
    MyFeedService.prototype.getfeedDetail = function (feedId) {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'myFeeds/' + feedId, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text());
        })
            .catch(this.dataService.handleError);
    };
    MyFeedService.prototype.getfeedType = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'myCondos/' + this.globalStorageService.getCondominiumId() + '/FeedTypes', { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFeedService.prototype.getfeedCategory = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'myCondos/' + this.globalStorageService.getCondominiumId() + '/FeedCategories', { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFeedService.prototype.savetempfile = function (filedata, parentId) {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader_notJson(headers);
        return this.http.post(this.baseUrl + 'myFileUpload/' + parentId, filedata, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFeedService.prototype.savetesttempfile = function () {
        var _this = this;
        var formData = new FormData();
        var test = '';
        formData.append('name', 'mycondo nativescript');
        return this.http.post('http://192.168.100.216:809/api/myFileUpload/testing', formData)
            .map(function (res) {
            alert(res.text());
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFeedService.prototype.saveFeedInfo = function (feedInfo) {
        var _this = this;
        feedInfo.Condominium_Id = this.globalStorageService.getCondominiumId();
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        this.dataService.addHeader(headers);
        return this.http.post(this.baseUrl + '/myFeeds', JSON.stringify(feedInfo), { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFeedService.prototype.updatefeedInfo = function (feedInfo) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        this.dataService.addHeader(headers);
        // console.log("header ==> " + JSON.stringify(headers));
        // console.log("url " + this.baseUrl + 'myFeeds/' + feedInfo.Feed_Id );
        return this.http.put(this.baseUrl + 'myFeeds/' + feedInfo.Feed_Id, JSON.stringify(feedInfo), { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFeedService.prototype.changeFeedStatus = function (feedId, status) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        this.dataService.addHeader(headers);
        var feedStatus = new FeedStatus();
        feedStatus.status = status;
        return this.http.patch(this.baseUrl + 'myFeeds/?id=' + feedId, JSON.stringify(feedStatus), { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFeedService.prototype.createFeedStatus = function (feedInfo) {
        var _this = this;
        feedInfo.Condominium_Id = this.globalStorageService.getCondominiumId();
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        return this.http.post(this.baseUrl + '/myFeeds', JSON.stringify(feedInfo), { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFeedService.prototype.getUploadedImagesInGallery = function () {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        return this.http.get(this.baseUrl + 'myFileUpload/' + this.globalStorageService.getCondominiumId(), { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFeedService.prototype.saveImagesInGallery = function (fdata) {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader_notJson(headers);
        return this.http.post(this.baseUrl + 'myImageUpload/' + this.globalStorageService.getCondominiumId(), fdata, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFeedService.prototype.deleteImagesInGallery = function (imgFilePath) {
        var _this = this;
        var headers = new http_1.Headers();
        this.dataService.addHeader(headers);
        var body = JSON.stringify({
            'FilePath': imgFilePath
        });
        var options = new http_1.RequestOptions({
            headers: headers,
            body: JSON.stringify(body)
        });
        return this.http.delete(this.baseUrl + 'myFileUpload', options)
            .map(function (res) {
            return JSON.parse(res.text(), _this.dataService.reviver);
        })
            .catch(this.dataService.handleError);
    };
    MyFeedService.prototype.uploadFile = function (parentId, uri) {
        var _response = "prepare to response";
        var headers = new http_1.Headers();
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
            androidDisplayNotificationProgress: false
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
    };
    MyFeedService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            config_service_1.ConfigService,
            data_service_1.DataService,
            globalstorage_service_1.GlobalStorageService
            //public dialog: MdDialog
        ])
    ], MyFeedService);
    return MyFeedService;
}());
exports.MyFeedService = MyFeedService;
var FeedStatus = /** @class */ (function () {
    function FeedStatus() {
    }
    return FeedStatus;
}());
exports.FeedStatus = FeedStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlmZWVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteWZlZWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBd0U7QUFPeEUsb0dBQW9HO0FBR3BHLG9FQUFrRTtBQUNsRSxtRUFBaUU7QUFDakUsa0ZBQWdGO0FBRWhGLHFEQUF1RDtBQUN2RCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBSzdDO0lBS0ksdUJBQW1CLElBQVUsRUFDbEIsYUFBNEIsRUFDNUIsV0FBd0I7UUFDL0Isa0RBQWtEO1FBQzNDLG9CQUEwQztRQUNqRCx5QkFBeUI7O1FBTFYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNsQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUV4Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBUHJELFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQVVoQixJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRU0sNkNBQXFCLEdBQTVCO1FBQUEsaUJBUUM7UUFQRyxJQUFNLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ3ZFLEdBQUcsQ0FBQyxVQUFDLEdBQWE7WUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSSxDQUFDLFdBQVcs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QUUsUUFBUSxFQUFFLFdBQVcsRUFBRTtTQUNqRSxDQUFDO1FBR0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ1o7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFnQk87SUFFZixDQUFDO0lBdFVRLGFBQWE7UUFGekIsaUJBQVUsRUFBRTt5Q0FPZ0IsV0FBSTtZQUNILDhCQUFhO1lBQ2YsMEJBQVc7WUFFRiw0Q0FBb0I7WUFDakQseUJBQXlCOztPQVZwQixhQUFhLENBZ1Z6QjtJQUFELG9CQUFDO0NBQUEsQUFoVkQsSUFnVkM7QUFoVlksc0NBQWE7QUFrVjFCO0lBQUE7SUFFQSxDQUFDO0lBQUQsaUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSwgSGVhZGVycywgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuLy9pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlLCBTZXNzaW9uU3RvcmFnZVNlcnZpY2UgfSBmcm9tICduZzItd2Vic3RvcmFnZSc7XHJcbi8vaW1wb3J0IHsgTWREaWFsb2dSZWYsIE1kRGlhbG9nLCBNZERpYWxvZ0NvbmZpZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcblxyXG5pbXBvcnQgeyBSZXR1cm4sIFBhdGNoLCBVc2VycyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRmVlZEluZm9ybWF0aW9uIH0gZnJvbSAnLi4vbW9kZWwvbXlmZWVkLm1vZGVsJztcclxuLy9pbXBvcnQgeyBGZWVkSW1hZ2VNb2RhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uL215RmVlZC9jb21wb25lbnRzL2RpYWxvZy9mZWVkaW1hZ2Vtb2RhbC5jb21wb25lbnQnO1xyXG5cclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMvY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHbG9iYWxTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zdG9yZS9nbG9iYWxzdG9yYWdlLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0ICogYXMgYmdIdHRwIGZyb20gXCJuYXRpdmVzY3JpcHQtYmFja2dyb3VuZC1odHRwXCI7XHJcbnZhciBzZXNzaW9uID0gYmdIdHRwLnNlc3Npb24oXCJpbWFnZS11cGxvYWRcIik7XHJcbmltcG9ydCAqIGFzIGZpbGVTeXN0ZW0gZnJvbSBcImZpbGUtc3lzdGVtXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcblxyXG5leHBvcnQgY2xhc3MgTXlGZWVkU2VydmljZSB7XHJcblxyXG4gICAgYmFzZVVybCA9ICcnO1xyXG4gICAgc3RyRmlsZVBhdGhVcmwgPSAnJztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cDogSHR0cCxcclxuICAgICAgICBwdWJsaWMgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcclxuICAgICAgICBwdWJsaWMgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxyXG4gICAgICAgIC8vcHVibGljIGxvY2FsU3RvcmFnZVNlcnZpY2U6IExvY2FsU3RvcmFnZVNlcnZpY2UsXHJcbiAgICAgICAgcHVibGljIGdsb2JhbFN0b3JhZ2VTZXJ2aWNlOiBHbG9iYWxTdG9yYWdlU2VydmljZVxyXG4gICAgICAgIC8vcHVibGljIGRpYWxvZzogTWREaWFsb2dcclxuICAgICkge1xyXG5cclxuICAgICAgICB0aGlzLmJhc2VVcmwgPSBjb25maWdTZXJ2aWNlLmdldEFwaVVSSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXROZXdzRmVlZFBlcm1pc3Npb24oKTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmFkZEhlYWRlcihoZWFkZXJzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VVcmwgKyAncm9sZS9uZXdzX2ZlZWRzJywgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCksIHRoaXMuZGF0YVNlcnZpY2UucmV2aXZlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmRhdGFTZXJ2aWNlLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TmV3c2ZlZWRsaXN0KGZjSWQ6IGFueSwgZnRJZDogYW55LCB0aXRsZTogc3RyaW5nLCBzZWFyY2g6IHN0cmluZywgcGRhdGVGcm9tOiBEYXRlLCBwZGF0ZVRvOiBEYXRlLCBjZGF0ZUZyb206IERhdGUsIGNkYXRlVG86IERhdGUsIGN1cnNvckluZGV4OiBhbnksIGdldE5leHQ6IGJvb2xlYW4sIHBhZ2VTaXplOiBudW1iZXIsIHBvc3Q6IGJvb2xlYW4sIHVucG9zdDogYm9vbGVhbiwgaXNibG9ja2VkOiBib29sZWFuKTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJBcHBsaWNhdGlvbl9JZFwiLCB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldEFwcGxpY2F0aW9uSWQoKSk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJUb2tlbktleVwiLCB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldFRva2VuS2V5KCkpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiU2VjcmV0X0tleVwiLCB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldFNlY3JldEtleSgpKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJoZWFkZXIgLT4gXCIgKyB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldEFwcGxpY2F0aW9uSWQoKSArIFwiIDwtLS0+IFwiXHJcbiAgICAgICAgKyB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldFRva2VuS2V5KCkgKyBcIiA8LS0tPiBcIlxyXG4gICAgICAgICsgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRTZWNyZXRLZXkoKSk7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG5cclxuICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmJhc2VVcmwgKyAnbXlGZWVkcz9GZWVkX0dyb3VwPTEmQ29uZG9taW5pdW1fSWQ9JyArIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0Q29uZG9taW5pdW1JZCgpO1xyXG5cclxuICAgICAgICBpZiAoZmNJZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHVybCArPSAnJkZlZWRfQ2F0ZWdvcnlfSWQ9JyArIGZjSWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZnRJZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHVybCArPSAnJkZlZWRUeXBlX0lkPScgKyBmdElkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRpdGxlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdXJsICs9ICcmVGl0bGU9JyArIGVuY29kZVVSSUNvbXBvbmVudCh0aXRsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VhcmNoICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdXJsICs9ICcmU2VhcmNoS2V5d29yZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHNlYXJjaCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGRhdGVGcm9tICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdXJsICs9ICcmUG9zdGVkX0RhdGVfRnJvbT0nICsgSlNPTi5zdHJpbmdpZnkocGRhdGVGcm9tKS5yZXBsYWNlKCdcIicsICcnKS5yZXBsYWNlKCdcIicsICcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwZGF0ZVRvICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdXJsICs9ICcmUG9zdGVkX0RhdGVfVG89JyArIEpTT04uc3RyaW5naWZ5KHBkYXRlVG8pLnJlcGxhY2UoJ1wiJywgJycpLnJlcGxhY2UoJ1wiJywgJycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNkYXRlRnJvbSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHVybCArPSAnJkNyZWF0ZWRfT25fRnJvbT0nICsgSlNPTi5zdHJpbmdpZnkoY2RhdGVGcm9tKS5yZXBsYWNlKCdcIicsICcnKS5yZXBsYWNlKCdcIicsICcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjZGF0ZVRvICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdXJsICs9ICcmQ3JlYXRlZF9Pbl9Ubz0nICsgSlNPTi5zdHJpbmdpZnkoY2RhdGVUbykucmVwbGFjZSgnXCInLCAnJykucmVwbGFjZSgnXCInLCAnJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY3Vyc29ySW5kZXggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB1cmwgKz0gJyZDdXJzb3JfSW5kZXg9JyArIGN1cnNvckluZGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGdldE5leHQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB1cmwgKz0gJyZHZXRfTmV4dD0nICsgZ2V0TmV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYWdlU2l6ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHVybCArPSAnJlBhZ2VfU2l6ZT0nICsgcGFnZVNpemU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocG9zdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHVybCArPSAnJlBvc3RfU3RhdHVzPScgKyBwb3N0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHVucG9zdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHVybCArPSAnJlVuUG9zdF9TdGF0dXM9JyArIHVucG9zdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc2Jsb2NrZWQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB1cmwgKz0gJyZpc0Jsb2NrZWQ9JyArIGlzYmxvY2tlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0TmV3c2ZlZWRsaXN0IHVybCAtLT4gXCIgKyB1cmwpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCkpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldGZlZWREZXRhaWwoZmVlZElkOiBhbnkpOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkFwcGxpY2F0aW9uX0lkXCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0QXBwbGljYXRpb25JZCgpKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIlRva2VuS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0VG9rZW5LZXkoKSk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJTZWNyZXRfS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0U2VjcmV0S2V5KCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZVVybCArICdteUZlZWRzLycgKyBmZWVkSWQsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuZGF0YVNlcnZpY2UuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRmZWVkVHlwZSgpOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkFwcGxpY2F0aW9uX0lkXCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0QXBwbGljYXRpb25JZCgpKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIlRva2VuS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0VG9rZW5LZXkoKSk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJTZWNyZXRfS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0U2VjcmV0S2V5KCkpO1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZVVybCArICdteUNvbmRvcy8nICsgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRDb25kb21pbml1bUlkKCkgKyAnL0ZlZWRUeXBlcycsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLmRhdGFTZXJ2aWNlLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldGZlZWRDYXRlZ29yeSgpOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkFwcGxpY2F0aW9uX0lkXCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0QXBwbGljYXRpb25JZCgpKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIlRva2VuS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0VG9rZW5LZXkoKSk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJTZWNyZXRfS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0U2VjcmV0S2V5KCkpO1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZVVybCArICdteUNvbmRvcy8nICsgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRDb25kb21pbml1bUlkKCkgKyAnL0ZlZWRDYXRlZ29yaWVzJywgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCksIHRoaXMuZGF0YVNlcnZpY2UucmV2aXZlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmRhdGFTZXJ2aWNlLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2F2ZXRlbXBmaWxlKGZpbGVkYXRhOiBGb3JtRGF0YSwgcGFyZW50SWQ6IGFueSk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5hZGRIZWFkZXJfbm90SnNvbihoZWFkZXJzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlVXJsICsgJ215RmlsZVVwbG9hZC8nICsgcGFyZW50SWQsIGZpbGVkYXRhLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzLnRleHQoKSwgdGhpcy5kYXRhU2VydmljZS5yZXZpdmVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuZGF0YVNlcnZpY2UuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzYXZldGVzdHRlbXBmaWxlKCk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBjb25zdCB0ZXN0ID0gJyc7XHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCduYW1lJywgJ215Y29uZG8gbmF0aXZlc2NyaXB0Jyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KCdodHRwOi8vMTkyLjE2OC4xMDAuMjE2OjgwOS9hcGkvbXlGaWxlVXBsb2FkL3Rlc3RpbmcnLCBmb3JtRGF0YSlcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQocmVzLnRleHQoKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLmRhdGFTZXJ2aWNlLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNhdmVGZWVkSW5mbyhmZWVkSW5mbzogRmVlZEluZm9ybWF0aW9uKTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuICAgICAgICBmZWVkSW5mby5Db25kb21pbml1bV9JZCA9IHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0Q29uZG9taW5pdW1JZCgpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkFwcGxpY2F0aW9uX0lkXCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0QXBwbGljYXRpb25JZCgpKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIlRva2VuS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0VG9rZW5LZXkoKSk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJTZWNyZXRfS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0U2VjcmV0S2V5KCkpO1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VVcmwgKyAnL215RmVlZHMnLCBKU09OLnN0cmluZ2lmeShmZWVkSW5mbyksIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLmRhdGFTZXJ2aWNlLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZWZlZWRJbmZvKGZlZWRJbmZvOiBGZWVkSW5mb3JtYXRpb24pOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkFwcGxpY2F0aW9uX0lkXCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0QXBwbGljYXRpb25JZCgpKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIlRva2VuS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0VG9rZW5LZXkoKSk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJTZWNyZXRfS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0U2VjcmV0S2V5KCkpO1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG5cclxuICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGVhZGVyID09PiBcIiArIEpTT04uc3RyaW5naWZ5KGhlYWRlcnMpKTtcclxuICAgICAgIC8vIGNvbnNvbGUubG9nKFwidXJsIFwiICsgdGhpcy5iYXNlVXJsICsgJ215RmVlZHMvJyArIGZlZWRJbmZvLkZlZWRfSWQgKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh0aGlzLmJhc2VVcmwgKyAnbXlGZWVkcy8nICsgZmVlZEluZm8uRmVlZF9JZCwgSlNPTi5zdHJpbmdpZnkoZmVlZEluZm8pLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzLnRleHQoKSwgdGhpcy5kYXRhU2VydmljZS5yZXZpdmVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuZGF0YVNlcnZpY2UuaGFuZGxlRXJyb3IpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hhbmdlRmVlZFN0YXR1cyhmZWVkSWQ6IGFueSwgc3RhdHVzOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkFwcGxpY2F0aW9uX0lkXCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0QXBwbGljYXRpb25JZCgpKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIlRva2VuS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0VG9rZW5LZXkoKSk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJTZWNyZXRfS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0U2VjcmV0S2V5KCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIGNvbnN0IGZlZWRTdGF0dXMgPSBuZXcgRmVlZFN0YXR1cygpO1xyXG4gICAgICAgIGZlZWRTdGF0dXMuc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucGF0Y2godGhpcy5iYXNlVXJsICsgJ215RmVlZHMvP2lkPScgKyBmZWVkSWQsIEpTT04uc3RyaW5naWZ5KGZlZWRTdGF0dXMpLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzLnRleHQoKSwgdGhpcy5kYXRhU2VydmljZS5yZXZpdmVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuZGF0YVNlcnZpY2UuaGFuZGxlRXJyb3IpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlRmVlZFN0YXR1cyhmZWVkSW5mbzogRmVlZEluZm9ybWF0aW9uKTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuICAgICAgICBmZWVkSW5mby5Db25kb21pbml1bV9JZCA9IHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0Q29uZG9taW5pdW1JZCgpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VVcmwgKyAnL215RmVlZHMnLCBKU09OLnN0cmluZ2lmeShmZWVkSW5mbyksIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLmRhdGFTZXJ2aWNlLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFVwbG9hZGVkSW1hZ2VzSW5HYWxsZXJ5KCk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5hZGRIZWFkZXIoaGVhZGVycyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlVXJsICsgJ215RmlsZVVwbG9hZC8nICsgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRDb25kb21pbml1bUlkKCksIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLmRhdGFTZXJ2aWNlLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNhdmVJbWFnZXNJbkdhbGxlcnkoZmRhdGE6IEZvcm1EYXRhKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmFkZEhlYWRlcl9ub3RKc29uKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VVcmwgKyAnbXlJbWFnZVVwbG9hZC8nICsgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRDb25kb21pbml1bUlkKCksIGZkYXRhLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzLnRleHQoKSwgdGhpcy5kYXRhU2VydmljZS5yZXZpdmVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuZGF0YVNlcnZpY2UuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxldGVJbWFnZXNJbkdhbGxlcnkoaW1nRmlsZVBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5hZGRIZWFkZXIoaGVhZGVycyk7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAnRmlsZVBhdGgnOiBpbWdGaWxlUGF0aFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHtcclxuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZSh0aGlzLmJhc2VVcmwgKyAnbXlGaWxlVXBsb2FkJywgb3B0aW9ucylcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzLnRleHQoKSwgdGhpcy5kYXRhU2VydmljZS5yZXZpdmVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuZGF0YVNlcnZpY2UuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwbG9hZEZpbGUocGFyZW50SWQ6U3RyaW5nLHVyaTpzdHJpbmcpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBfcmVzcG9uc2U6c3RyaW5nID0gXCJwcmVwYXJlIHRvIHJlc3BvbnNlXCI7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAvL2hlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkFwcGxpY2F0aW9uX0lkXCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0QXBwbGljYXRpb25JZCgpKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIlRva2VuS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0VG9rZW5LZXkoKSk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJTZWNyZXRfS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0U2VjcmV0S2V5KCkpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiY29udGVudC10eXBlXCIsIFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiKTtcclxuXHJcbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XHJcbiAgICAgICAgICAgIHVybDogXCJodHRwOi8vMTkyLjE2OC4xMDAuMjU0OjgwMTMvYXBpL215RmlsZVVwbG9hZC9cIiArIHBhcmVudElkLFxyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJBcHBsaWNhdGlvbl9JZFwiOiB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldEFwcGxpY2F0aW9uSWQoKSxcclxuICAgICAgICAgICAgICAgICAgICBcIlRva2Vua2V5XCI6IHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0VG9rZW5LZXkoKSxcclxuICAgICAgICAgICAgICAgICAgICBcIlNlY3JldF9LZXlcIjogdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRTZWNyZXRLZXkoKSxcclxuICAgICAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiRmlsZS1OYW1lXCI6IFwiYmcuanBnXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcclxuICAgICAgICAgICAgICAgIGFuZHJvaWREaXNwbGF5Tm90aWZpY2F0aW9uUHJvZ3Jlc3M6ZmFsc2VcclxuICAgICAgICAgICAgfTtcclxuICAgICAgIFxyXG4gICAgICAgICAgICAvL3ZhciB0YXNrID0gc2Vzc2lvbi51cGxvYWRGaWxlKFwiL3N0b3JhZ2UvZW11bGF0ZWQvMC9QaWN0dXJlcy9TY3JlZW5zaG90cy9iZy5qcGdcIiwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgLy8gdXJpID0gXCJmaWxlOi8vXCIrdXJpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlcXVlc3QgdXJpIFwiICsgdXJpKTtcclxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IFtcclxuICAgICAgICAgICAgICAgIHsgbmFtZTogXCJmaWxlVG9VcGxvYWRcIiwgZmlsZW5hbWU6IHVyaSwgbWltZVR5cGU6ICdpbWFnZS9qcGcnIH1cclxuICAgICAgICAgICAgXTtcclxuXHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlcXVlc3QgXCIpO1xyXG4gICAgICAgICAgICB2YXIgdGFzayA9IHNlc3Npb24ubXVsdGlwYXJ0VXBsb2FkKHBhcmFtcywgcmVxdWVzdCk7ICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gdGFzaztcclxuICAgICAgICAgICAgLyp0YXNrLm9uKFwicHJvZ3Jlc3NcIiwgbG9nRXZlbnQpO1xyXG4gICAgICAgICAgICB0YXNrLm9uKFwiZXJyb3JcIiwgbG9nRXZlbnQpO1xyXG4gICAgICAgICAgICB0YXNrLm9uKFwiY29tcGxldGVcIiwgdXBsb2FkQ29tcGxldGUpO1xyXG4gICAgICAgICAgICB0YXNrLm9uKFwicmVzcG9uZGVkXCIsIChlKT0+IHtsZXQgcmVzID0gSlNPTi5wYXJzZShlLmRhdGEpXHJcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNwb25kZWQgLS0+IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgZnVuY3Rpb24gbG9nRXZlbnQoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJldmVudCBuYW1lIFwiICsgZS5ldmVudE5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB1cGxvYWRDb21wbGV0ZShjb21wbGV0ZUV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbXBsZXRlIFwiICsgSlNPTi5zdHJpbmdpZnkoY29tcGxldGVFdmVudCkpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImdldEJvZHkgXCIgKyBKU09OLnN0cmluZ2lmeShjb21wbGV0ZUV2ZW50LnJlc3BvbnNlKSk7XHJcbiAgICAgICAgICAgICAgICAvL19yZXNwb25zZSA9IGNvbXBsZXRlRXZlbnQucmVzcG9uc2UuZ2V0Qm9keUFzU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAvL3JldHVybiBfcmVzcG9uc2U7XHJcbiAgICAgICAgICAgIH0gICAgKi8gICAgICAgICBcclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qcHVibGljIGZlZWRJbWFnZU1vZGFsKHN0ckZpbGVQYXRoOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgICAgICBsZXQgZGlhbG9nUmVmOiBNZERpYWxvZ1JlZjxGZWVkSW1hZ2VNb2RhbENvbXBvbmVudD47XHJcbiAgICAgICAgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihGZWVkSW1hZ2VNb2RhbENvbXBvbmVudCk7XHJcblxyXG4gICAgICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5zdHJGaWxlUGF0aCA9IHN0ckZpbGVQYXRoO1xyXG4gICAgICAgIHJldHVybiBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKTtcclxuICAgIH0qL1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZlZWRTdGF0dXMge1xyXG4gICAgc3RhdHVzOiBzdHJpbmc7XHJcbn1cclxuXHJcbiJdfQ==