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
        console.log("header ==> " + JSON.stringify(headers));
        console.log("url " + this.baseUrl + 'myFeeds/' + feedInfo.Feed_Id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlmZWVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteWZlZWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBd0U7QUFPeEUsb0dBQW9HO0FBR3BHLG9FQUFrRTtBQUNsRSxtRUFBaUU7QUFDakUsa0ZBQWdGO0FBRWhGLHFEQUF1RDtBQUN2RCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBSzdDO0lBS0ksdUJBQW1CLElBQVUsRUFDbEIsYUFBNEIsRUFDNUIsV0FBd0I7UUFDL0Isa0RBQWtEO1FBQzNDLG9CQUEwQztRQUNqRCx5QkFBeUI7O1FBTFYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNsQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUV4Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBUHJELFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQVVoQixJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRU0sNkNBQXFCLEdBQTVCO1FBQUEsaUJBUUM7UUFQRyxJQUFNLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ3ZFLEdBQUcsQ0FBQyxVQUFDLEdBQWE7WUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSSxDQUFDLFdBQVcs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Riw0RkFBNEY7UUFFN0YsdUJBQXVCO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLElBQUksTUFBTSxHQUFHO1lBQ1QsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRTtTQUNqRSxDQUFDO1FBR0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ1o7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFnQk87SUFFZixDQUFDO0lBdFVRLGFBQWE7UUFGekIsaUJBQVUsRUFBRTt5Q0FPZ0IsV0FBSTtZQUNILDhCQUFhO1lBQ2YsMEJBQVc7WUFFRiw0Q0FBb0I7WUFDakQseUJBQXlCOztPQVZwQixhQUFhLENBZ1Z6QjtJQUFELG9CQUFDO0NBQUEsQUFoVkQsSUFnVkM7QUFoVlksc0NBQWE7QUFrVjFCO0lBQUE7SUFFQSxDQUFDO0lBQUQsaUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSwgSGVhZGVycywgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuLy9pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlLCBTZXNzaW9uU3RvcmFnZVNlcnZpY2UgfSBmcm9tICduZzItd2Vic3RvcmFnZSc7XHJcbi8vaW1wb3J0IHsgTWREaWFsb2dSZWYsIE1kRGlhbG9nLCBNZERpYWxvZ0NvbmZpZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcblxyXG5pbXBvcnQgeyBSZXR1cm4sIFBhdGNoLCBVc2VycyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRmVlZEluZm9ybWF0aW9uIH0gZnJvbSAnLi4vbW9kZWwvbXlmZWVkLm1vZGVsJztcclxuLy9pbXBvcnQgeyBGZWVkSW1hZ2VNb2RhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uL215RmVlZC9jb21wb25lbnRzL2RpYWxvZy9mZWVkaW1hZ2Vtb2RhbC5jb21wb25lbnQnO1xyXG5cclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMvY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHbG9iYWxTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zdG9yZS9nbG9iYWxzdG9yYWdlLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0ICogYXMgYmdIdHRwIGZyb20gXCJuYXRpdmVzY3JpcHQtYmFja2dyb3VuZC1odHRwXCI7XHJcbnZhciBzZXNzaW9uID0gYmdIdHRwLnNlc3Npb24oXCJpbWFnZS11cGxvYWRcIik7XHJcbmltcG9ydCAqIGFzIGZpbGVTeXN0ZW0gZnJvbSBcImZpbGUtc3lzdGVtXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcblxyXG5leHBvcnQgY2xhc3MgTXlGZWVkU2VydmljZSB7XHJcblxyXG4gICAgYmFzZVVybCA9ICcnO1xyXG4gICAgc3RyRmlsZVBhdGhVcmwgPSAnJztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cDogSHR0cCxcclxuICAgICAgICBwdWJsaWMgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcclxuICAgICAgICBwdWJsaWMgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxyXG4gICAgICAgIC8vcHVibGljIGxvY2FsU3RvcmFnZVNlcnZpY2U6IExvY2FsU3RvcmFnZVNlcnZpY2UsXHJcbiAgICAgICAgcHVibGljIGdsb2JhbFN0b3JhZ2VTZXJ2aWNlOiBHbG9iYWxTdG9yYWdlU2VydmljZVxyXG4gICAgICAgIC8vcHVibGljIGRpYWxvZzogTWREaWFsb2dcclxuICAgICkge1xyXG5cclxuICAgICAgICB0aGlzLmJhc2VVcmwgPSBjb25maWdTZXJ2aWNlLmdldEFwaVVSSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXROZXdzRmVlZFBlcm1pc3Npb24oKTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmFkZEhlYWRlcihoZWFkZXJzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VVcmwgKyAncm9sZS9uZXdzX2ZlZWRzJywgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCksIHRoaXMuZGF0YVNlcnZpY2UucmV2aXZlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmRhdGFTZXJ2aWNlLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TmV3c2ZlZWRsaXN0KGZjSWQ6IGFueSwgZnRJZDogYW55LCB0aXRsZTogc3RyaW5nLCBzZWFyY2g6IHN0cmluZywgcGRhdGVGcm9tOiBEYXRlLCBwZGF0ZVRvOiBEYXRlLCBjZGF0ZUZyb206IERhdGUsIGNkYXRlVG86IERhdGUsIGN1cnNvckluZGV4OiBhbnksIGdldE5leHQ6IGJvb2xlYW4sIHBhZ2VTaXplOiBudW1iZXIsIHBvc3Q6IGJvb2xlYW4sIHVucG9zdDogYm9vbGVhbiwgaXNibG9ja2VkOiBib29sZWFuKTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJBcHBsaWNhdGlvbl9JZFwiLCB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldEFwcGxpY2F0aW9uSWQoKSk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJUb2tlbktleVwiLCB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldFRva2VuS2V5KCkpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiU2VjcmV0X0tleVwiLCB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldFNlY3JldEtleSgpKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJoZWFkZXIgLT4gXCIgKyB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldEFwcGxpY2F0aW9uSWQoKSArIFwiIDwtLS0+IFwiXHJcbiAgICAgICAgKyB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldFRva2VuS2V5KCkgKyBcIiA8LS0tPiBcIlxyXG4gICAgICAgICsgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRTZWNyZXRLZXkoKSk7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG5cclxuICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmJhc2VVcmwgKyAnbXlGZWVkcz9GZWVkX0dyb3VwPTEmQ29uZG9taW5pdW1fSWQ9JyArIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0Q29uZG9taW5pdW1JZCgpO1xyXG5cclxuICAgICAgICBpZiAoZmNJZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHVybCArPSAnJkZlZWRfQ2F0ZWdvcnlfSWQ9JyArIGZjSWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZnRJZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHVybCArPSAnJkZlZWRUeXBlX0lkPScgKyBmdElkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRpdGxlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdXJsICs9ICcmVGl0bGU9JyArIGVuY29kZVVSSUNvbXBvbmVudCh0aXRsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VhcmNoICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdXJsICs9ICcmU2VhcmNoS2V5d29yZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHNlYXJjaCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGRhdGVGcm9tICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdXJsICs9ICcmUG9zdGVkX0RhdGVfRnJvbT0nICsgSlNPTi5zdHJpbmdpZnkocGRhdGVGcm9tKS5yZXBsYWNlKCdcIicsICcnKS5yZXBsYWNlKCdcIicsICcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwZGF0ZVRvICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdXJsICs9ICcmUG9zdGVkX0RhdGVfVG89JyArIEpTT04uc3RyaW5naWZ5KHBkYXRlVG8pLnJlcGxhY2UoJ1wiJywgJycpLnJlcGxhY2UoJ1wiJywgJycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNkYXRlRnJvbSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHVybCArPSAnJkNyZWF0ZWRfT25fRnJvbT0nICsgSlNPTi5zdHJpbmdpZnkoY2RhdGVGcm9tKS5yZXBsYWNlKCdcIicsICcnKS5yZXBsYWNlKCdcIicsICcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjZGF0ZVRvICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdXJsICs9ICcmQ3JlYXRlZF9Pbl9Ubz0nICsgSlNPTi5zdHJpbmdpZnkoY2RhdGVUbykucmVwbGFjZSgnXCInLCAnJykucmVwbGFjZSgnXCInLCAnJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY3Vyc29ySW5kZXggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB1cmwgKz0gJyZDdXJzb3JfSW5kZXg9JyArIGN1cnNvckluZGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGdldE5leHQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB1cmwgKz0gJyZHZXRfTmV4dD0nICsgZ2V0TmV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYWdlU2l6ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHVybCArPSAnJlBhZ2VfU2l6ZT0nICsgcGFnZVNpemU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocG9zdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHVybCArPSAnJlBvc3RfU3RhdHVzPScgKyBwb3N0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHVucG9zdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHVybCArPSAnJlVuUG9zdF9TdGF0dXM9JyArIHVucG9zdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc2Jsb2NrZWQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB1cmwgKz0gJyZpc0Jsb2NrZWQ9JyArIGlzYmxvY2tlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0TmV3c2ZlZWRsaXN0IHVybCAtLT4gXCIgKyB1cmwpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCkpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldGZlZWREZXRhaWwoZmVlZElkOiBhbnkpOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkFwcGxpY2F0aW9uX0lkXCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0QXBwbGljYXRpb25JZCgpKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIlRva2VuS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0VG9rZW5LZXkoKSk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJTZWNyZXRfS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0U2VjcmV0S2V5KCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZVVybCArICdteUZlZWRzLycgKyBmZWVkSWQsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuZGF0YVNlcnZpY2UuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRmZWVkVHlwZSgpOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkFwcGxpY2F0aW9uX0lkXCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0QXBwbGljYXRpb25JZCgpKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIlRva2VuS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0VG9rZW5LZXkoKSk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJTZWNyZXRfS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0U2VjcmV0S2V5KCkpO1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZVVybCArICdteUNvbmRvcy8nICsgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRDb25kb21pbml1bUlkKCkgKyAnL0ZlZWRUeXBlcycsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLmRhdGFTZXJ2aWNlLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldGZlZWRDYXRlZ29yeSgpOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkFwcGxpY2F0aW9uX0lkXCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0QXBwbGljYXRpb25JZCgpKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIlRva2VuS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0VG9rZW5LZXkoKSk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJTZWNyZXRfS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0U2VjcmV0S2V5KCkpO1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZVVybCArICdteUNvbmRvcy8nICsgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRDb25kb21pbml1bUlkKCkgKyAnL0ZlZWRDYXRlZ29yaWVzJywgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCksIHRoaXMuZGF0YVNlcnZpY2UucmV2aXZlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmRhdGFTZXJ2aWNlLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2F2ZXRlbXBmaWxlKGZpbGVkYXRhOiBGb3JtRGF0YSwgcGFyZW50SWQ6IGFueSk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5hZGRIZWFkZXJfbm90SnNvbihoZWFkZXJzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlVXJsICsgJ215RmlsZVVwbG9hZC8nICsgcGFyZW50SWQsIGZpbGVkYXRhLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzLnRleHQoKSwgdGhpcy5kYXRhU2VydmljZS5yZXZpdmVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuZGF0YVNlcnZpY2UuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzYXZldGVzdHRlbXBmaWxlKCk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBjb25zdCB0ZXN0ID0gJyc7XHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCduYW1lJywgJ215Y29uZG8gbmF0aXZlc2NyaXB0Jyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KCdodHRwOi8vMTkyLjE2OC4xMDAuMjE2OjgwOS9hcGkvbXlGaWxlVXBsb2FkL3Rlc3RpbmcnLCBmb3JtRGF0YSlcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQocmVzLnRleHQoKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLmRhdGFTZXJ2aWNlLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNhdmVGZWVkSW5mbyhmZWVkSW5mbzogRmVlZEluZm9ybWF0aW9uKTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuICAgICAgICBmZWVkSW5mby5Db25kb21pbml1bV9JZCA9IHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0Q29uZG9taW5pdW1JZCgpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkFwcGxpY2F0aW9uX0lkXCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0QXBwbGljYXRpb25JZCgpKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIlRva2VuS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0VG9rZW5LZXkoKSk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJTZWNyZXRfS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0U2VjcmV0S2V5KCkpO1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VVcmwgKyAnL215RmVlZHMnLCBKU09OLnN0cmluZ2lmeShmZWVkSW5mbyksIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLmRhdGFTZXJ2aWNlLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZWZlZWRJbmZvKGZlZWRJbmZvOiBGZWVkSW5mb3JtYXRpb24pOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkFwcGxpY2F0aW9uX0lkXCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0QXBwbGljYXRpb25JZCgpKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIlRva2VuS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0VG9rZW5LZXkoKSk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJTZWNyZXRfS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0U2VjcmV0S2V5KCkpO1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcImhlYWRlciA9PT4gXCIgKyBKU09OLnN0cmluZ2lmeShoZWFkZXJzKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ1cmwgXCIgKyB0aGlzLmJhc2VVcmwgKyAnbXlGZWVkcy8nICsgZmVlZEluZm8uRmVlZF9JZCApO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHRoaXMuYmFzZVVybCArICdteUZlZWRzLycgKyBmZWVkSW5mby5GZWVkX0lkLCBKU09OLnN0cmluZ2lmeShmZWVkSW5mbyksIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLmRhdGFTZXJ2aWNlLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvcik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGFuZ2VGZWVkU3RhdHVzKGZlZWRJZDogYW55LCBzdGF0dXM6IHN0cmluZyk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQXBwbGljYXRpb25fSWRcIiwgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRBcHBsaWNhdGlvbklkKCkpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiVG9rZW5LZXlcIiwgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRUb2tlbktleSgpKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIlNlY3JldF9LZXlcIiwgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRTZWNyZXRLZXkoKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5hZGRIZWFkZXIoaGVhZGVycyk7XHJcbiAgICAgICAgY29uc3QgZmVlZFN0YXR1cyA9IG5ldyBGZWVkU3RhdHVzKCk7XHJcbiAgICAgICAgZmVlZFN0YXR1cy5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wYXRjaCh0aGlzLmJhc2VVcmwgKyAnbXlGZWVkcy8/aWQ9JyArIGZlZWRJZCwgSlNPTi5zdHJpbmdpZnkoZmVlZFN0YXR1cyksIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLmRhdGFTZXJ2aWNlLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvcik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVGZWVkU3RhdHVzKGZlZWRJbmZvOiBGZWVkSW5mb3JtYXRpb24pOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG4gICAgICAgIGZlZWRJbmZvLkNvbmRvbWluaXVtX0lkID0gdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRDb25kb21pbml1bUlkKCk7XHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5hZGRIZWFkZXIoaGVhZGVycyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZVVybCArICcvbXlGZWVkcycsIEpTT04uc3RyaW5naWZ5KGZlZWRJbmZvKSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCksIHRoaXMuZGF0YVNlcnZpY2UucmV2aXZlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmRhdGFTZXJ2aWNlLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VXBsb2FkZWRJbWFnZXNJbkdhbGxlcnkoKTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmFkZEhlYWRlcihoZWFkZXJzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VVcmwgKyAnbXlGaWxlVXBsb2FkLycgKyB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldENvbmRvbWluaXVtSWQoKSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCksIHRoaXMuZGF0YVNlcnZpY2UucmV2aXZlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmRhdGFTZXJ2aWNlLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2F2ZUltYWdlc0luR2FsbGVyeShmZGF0YTogRm9ybURhdGEpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkSGVhZGVyX25vdEpzb24oaGVhZGVycyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZVVybCArICdteUltYWdlVXBsb2FkLycgKyB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldENvbmRvbWluaXVtSWQoKSwgZmRhdGEsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLmRhdGFTZXJ2aWNlLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlbGV0ZUltYWdlc0luR2FsbGVyeShpbWdGaWxlUGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmFkZEhlYWRlcihoZWFkZXJzKTtcclxuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICdGaWxlUGF0aCc6IGltZ0ZpbGVQYXRoXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoe1xyXG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKHRoaXMuYmFzZVVybCArICdteUZpbGVVcGxvYWQnLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLmRhdGFTZXJ2aWNlLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgdXBsb2FkRmlsZShwYXJlbnRJZDpTdHJpbmcsdXJpOnN0cmluZyl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IF9yZXNwb25zZTpzdHJpbmcgPSBcInByZXBhcmUgdG8gcmVzcG9uc2VcIjtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coX3Jlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIC8vaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQXBwbGljYXRpb25fSWRcIiwgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRBcHBsaWNhdGlvbklkKCkpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiVG9rZW5LZXlcIiwgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRUb2tlbktleSgpKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIlNlY3JldF9LZXlcIiwgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRTZWNyZXRLZXkoKSk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJjb250ZW50LXR5cGVcIiwgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIpO1xyXG5cclxuICAgICAgICB2YXIgcmVxdWVzdCA9IHtcclxuICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xOTIuMTY4LjEwMC4yNTQ6ODAxMy9hcGkvbXlGaWxlVXBsb2FkL1wiICsgcGFyZW50SWQsXHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcIkFwcGxpY2F0aW9uX0lkXCI6IHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0QXBwbGljYXRpb25JZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiVG9rZW5rZXlcIjogdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRUb2tlbktleSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiU2VjcmV0X0tleVwiOiB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldFNlY3JldEtleSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJGaWxlLU5hbWVcIjogXCJiZy5qcGdcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgYW5kcm9pZERpc3BsYXlOb3RpZmljYXRpb25Qcm9ncmVzczpmYWxzZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgIC8vdmFyIHRhc2sgPSBzZXNzaW9uLnVwbG9hZEZpbGUoXCIvc3RvcmFnZS9lbXVsYXRlZC8wL1BpY3R1cmVzL1NjcmVlbnNob3RzL2JnLmpwZ1wiLCByZXF1ZXN0KTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAvLyB1cmkgPSBcImZpbGU6Ly9cIit1cmk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVxdWVzdCB1cmkgXCIgKyB1cmkpO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gW1xyXG4gICAgICAgICAgICAgICAgeyBuYW1lOiBcImZpbGVUb1VwbG9hZFwiLCBmaWxlbmFtZTogdXJpLCBtaW1lVHlwZTogJ2ltYWdlL2pwZycgfVxyXG4gICAgICAgICAgICBdO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVxdWVzdCBcIik7XHJcbiAgICAgICAgICAgIHZhciB0YXNrID0gc2Vzc2lvbi5tdWx0aXBhcnRVcGxvYWQocGFyYW1zLCByZXF1ZXN0KTsgICAgXHJcbiAgICAgICAgICAgIHJldHVybiB0YXNrO1xyXG4gICAgICAgICAgICAvKnRhc2sub24oXCJwcm9ncmVzc1wiLCBsb2dFdmVudCk7XHJcbiAgICAgICAgICAgIHRhc2sub24oXCJlcnJvclwiLCBsb2dFdmVudCk7XHJcbiAgICAgICAgICAgIHRhc2sub24oXCJjb21wbGV0ZVwiLCB1cGxvYWRDb21wbGV0ZSk7XHJcbiAgICAgICAgICAgIHRhc2sub24oXCJyZXNwb25kZWRcIiwgKGUpPT4ge2xldCByZXMgPSBKU09OLnBhcnNlKGUuZGF0YSlcclxuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3BvbmRlZCAtLT4gXCIgKyBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmdW5jdGlvbiBsb2dFdmVudChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImV2ZW50IG5hbWUgXCIgKyBlLmV2ZW50TmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHVwbG9hZENvbXBsZXRlKGNvbXBsZXRlRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29tcGxldGUgXCIgKyBKU09OLnN0cmluZ2lmeShjb21wbGV0ZUV2ZW50KSk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZ2V0Qm9keSBcIiArIEpTT04uc3RyaW5naWZ5KGNvbXBsZXRlRXZlbnQucmVzcG9uc2UpKTtcclxuICAgICAgICAgICAgICAgIC8vX3Jlc3BvbnNlID0gY29tcGxldGVFdmVudC5yZXNwb25zZS5nZXRCb2R5QXNTdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIC8vcmV0dXJuIF9yZXNwb25zZTtcclxuICAgICAgICAgICAgfSAgICAqLyAgICAgICAgIFxyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLypwdWJsaWMgZmVlZEltYWdlTW9kYWwoc3RyRmlsZVBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xyXG4gICAgICAgIGxldCBkaWFsb2dSZWY6IE1kRGlhbG9nUmVmPEZlZWRJbWFnZU1vZGFsQ29tcG9uZW50PjtcclxuICAgICAgICBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEZlZWRJbWFnZU1vZGFsQ29tcG9uZW50KTtcclxuXHJcbiAgICAgICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnN0ckZpbGVQYXRoID0gc3RyRmlsZVBhdGg7XHJcbiAgICAgICAgcmV0dXJuIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpO1xyXG4gICAgfSovXHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRmVlZFN0YXR1cyB7XHJcbiAgICBzdGF0dXM6IHN0cmluZztcclxufVxyXG5cclxuIl19