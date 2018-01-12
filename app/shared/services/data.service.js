"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/of");
var config_service_1 = require("../utils/config.service");
var globalstorage_service_1 = require("../store/globalstorage.service");
var DataService = /** @class */ (function () {
    function DataService(http, configService, globalStorageService) {
        this.http = http;
        this.configService = configService;
        this.globalStorageService = globalStorageService;
        this.baseUrl = '';
        this.condoId = '';
        this.userId = '';
        this.batchNo = '';
        this.strFilePathUrl = '';
        console.log("Before ");
        //this.localStorage.set({key: 'myApplicationId', value: '563D9F88-BF46-4102-8916-DCAEE320382F'});
        //this.localStorage.set({key: 'mySecretKey', value: 'abc333'});
        // this.localStorage.get({key:  'myApplicationId'}).then(value => console.log("appId -> " +value));
        //this.localStorage.get({key:  'mySecretKey'}).then(value => this.secretKey = value);
        globalStorageService.setApplicationId('563D9F88-BF46-4102-8916-DCAEE320382F');
        globalStorageService.setSecretKey('abc333');
        this.baseUrl = configService.getApiURI();
        this.strFilePathUrl = configService.getFilePathURI();
    }
    /* User Login Function Start */
    DataService.prototype.userLogin = function (_userLogin) {
        //this.localStorage.get({key:  'myApplicationId'}).then(value =>{_userLogin.Application_Id = value});
        // this.localStorage.get({key:  'mySecretKey'}).then(value =>{_userLogin.Secret_Key = value});
        // this.localStorage.get({key:  'mySecretKey'}).then(value => this.secretKey = value);
        var _this = this;
        //console.log("appId " + this.applicationId);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        console.log((this.baseUrl + 'MC_Account/Login'));
        return this.http.post(this.baseUrl + 'MC_Account/Login', JSON.stringify(_userLogin), { headers: headers })
            .map(function (res) {
            console.log("userLogin --> " + JSON.stringify(res));
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.getUserRole = function (modulename) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'role/' + modulename, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.getUserRoleByUserId = function (usrId) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        this.addHeader(headers);
        console.log("url =>" + this.baseUrl + 'role/' + usrId);
        return this.http.get(this.baseUrl + 'role/' + usrId, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.getUserPermission = function () {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'role/myuser', { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.getCurrentUser = function () {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'users', { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    /* Start myCondosg Functions */
    DataService.prototype.getCondolist = function () {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'mymember', { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.getCondoFactSheet = function (condoId) {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader(headers);
        console.log("getCondoFactSheet --> " + this.baseUrl + 'myCondos/' + condoId + '/factsheet');
        return this.http.get(this.baseUrl + 'myCondos/' + condoId + '/factsheet', { headers: headers })
            .map(function (res) {
            console.log("getCondoFactSheet --> " + JSON.stringify(res));
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.getBlockLayoutPlanFiles = function (condoId) {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'myCondos/' + condoId + '/blocklayoutfiles', { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.getUnitCategoryNameRange = function (condoId) {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'myCondos/' + condoId + '/unitrange', { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    // For showing Bookable and unBookable facilities in myFacility tab
    DataService.prototype.getFacility = function (condoId, isBookable) {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'myCondos/' + condoId + '/facilitygroup?isBookable=' + isBookable, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    // For showing facilitylist in FactSheet
    DataService.prototype.getFacilityList = function (condoId) {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'myCondos/' + condoId + '/facilities', { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.getMaterial = function (condoId, materialType) {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'myCondos/' + condoId + '/condomaterials?MaterialType=' + materialType, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.saveCondoFile = function (fdata, condoId) {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader_notJson(headers);
        return this.http.post(this.baseUrl + 'mycondos/' + this.condoId + '/developmentfile', fdata, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.deleteCondoFile = function (fId) {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader_notJson(headers);
        return this.http.delete(this.baseUrl + 'mycondos/' + this.condoId + '/developmentfiles/' + fId, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.saveMaterial = function (condoMaterial) {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader(headers);
        condoMaterial.Condominium_Id = this.condoId;
        return this.http.post(this.baseUrl + 'condomaterial/', JSON.stringify(condoMaterial), { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.deleteMaterial = function (mId) {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader(headers);
        return this.http.delete(this.baseUrl + 'condomaterial/?id=' + mId, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.updateMaterial = function (patch) {
        var _this = this;
        var pts;
        pts = [patch];
        var headers = new http_1.Headers();
        this.addHeader(headers);
        return this.http.patch(this.baseUrl + 'condomaterial/' + patch.Id, JSON.stringify(pts), { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.saveMaterialImages = function (fdata, materialId) {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader_notJson(headers);
        return this.http.post(this.baseUrl + 'condomaterialfile/?CondoId=' + this.condoId + '&Materialid=' + materialId, fdata, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.saveNewBlockLayoutPlan = function (fdata) {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader_notJson(headers);
        return this.http.post(this.baseUrl + 'mycondos/' + this.condoId + '/blocklayoutfile', fdata, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.updateBlockLayoutPlanFiles = function (fdata, BId) {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader_notJson(headers);
        return this.http.put(this.baseUrl + 'mycondos/' + this.condoId + '/blocklayoutfile/' + BId, fdata, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.updateBlockLayoutPlanDescription = function (patch, Id) {
        var _this = this;
        var pts;
        pts = [patch];
        var headers = new http_1.Headers();
        this.addHeader(headers);
        return this.http.patch(this.baseUrl + 'mycondos/' + this.condoId + '/blocklayout/' + Id, JSON.stringify(pts), { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.deleteBlockLayout = function (BId) {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader(headers);
        return this.http.delete(this.baseUrl + 'myCondos/' + this.condoId + '/blocklayoutfile/' + BId, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.deleteMaterialImage = function (fId) {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader(headers);
        return this.http.delete(this.baseUrl + 'condomaterialfile/?id=' + fId, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.getBlock = function (condoId) {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'myCondos/' + condoId + '/blockdetails', { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService.prototype.getUnit = function (condoId) {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'myCondos/' + condoId + '/rooms', { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    /* End Of myCondosg Functions */
    /* For Common Use Functions */
    DataService.prototype.addHeader_notJson = function (headers) {
        // headers.append('Application_Id', this.localStorage.retrieve('myApplicationId'));
        // headers.append('TokenKey', this.localStorage.retrieve('myTokenKey'));
        // headers.append('Secret_Key', this.localStorage.retrieve('mySecretKey'));
        // this.condoId = this.localStorage.retrieve('myCondominiumId');
        // this.userId = this.localStorage.retrieve('myUserid');
        // this.batchNo = this.localStorage.retrieve('myBatchNumber');
    };
    DataService.prototype.addHeader = function (headers) {
        //  headers.append("Content-Type", "application/json");
        //  headers.append("Application_Id", this.globalStorageService.getApplicationId());
        //  headers.append("TokenKey", this.globalStorageService.getTokenKey());
        //  headers.append("Secret_Key", this.globalStorageService.getSecretKey());
    };
    DataService.prototype.handleError = function (error) {
        var applicationError = error.headers.get('Application-Error');
        var serverError = error.json();
        var modelStateErrors = '';
        if (!serverError.type) {
            for (var key in serverError) {
                if (serverError[key]) {
                    modelStateErrors += serverError[key] + '\n';
                }
            }
        }
        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
        return Observable_1.Observable.throw(applicationError || modelStateErrors || 'Server error');
    };
    DataService.prototype.reviver = function (key, value) {
        if (typeof value === 'string') {
            var a = /^\d{4}[-]\d{2}[-]\d{2}[T]/.exec(value);
            if (a) {
                return new Date(value.replace('T', ' ') + 'Z');
            }
        }
        return value;
    };
    DataService.prototype.savetempfile = function (filedata, parentId) {
        var _this = this;
        var headers = new http_1.Headers();
        this.addHeader_notJson(headers);
        return this.http.post(this.baseUrl + 'myFileUpload/' + parentId, filedata, { headers: headers })
            .map(function (res) {
            return JSON.parse(res.text(), _this.reviver);
        })
            .catch(this.handleError);
    };
    DataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            config_service_1.ConfigService,
            globalstorage_service_1.GlobalStorageService])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RTtBQUN4RSw4Q0FBNkM7QUFDN0MsaUNBQStCO0FBQy9CLG1DQUFpQztBQUNqQyxrQ0FBZ0M7QUFFaEMsMERBQXdEO0FBQ3hELHdFQUFxRTtBQUtyRTtJQVFJLHFCQUFvQixJQUFVLEVBQ2xCLGFBQTRCLEVBQzVCLG9CQUF5QztRQUZqQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ2xCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFSckQsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFlBQU8sR0FBUSxFQUFFLENBQUM7UUFDbEIsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLFlBQU8sR0FBUSxFQUFFLENBQUM7UUFDbEIsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFNaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV2QixpR0FBaUc7UUFDakcsK0RBQStEO1FBRWhFLG1HQUFtRztRQUNsRyxxRkFBcUY7UUFFckYsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUM5RSxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDekQsQ0FBQztJQUVELCtCQUErQjtJQUUvQiwrQkFBUyxHQUFULFVBQVUsVUFBaUI7UUFDdEIscUdBQXFHO1FBQ3RHLDhGQUE4RjtRQUMvRixzRkFBc0Y7UUFIekYsaUJBZ0JDO1FBWEcsNkNBQTZDO1FBQzdDLElBQU0sT0FBTyxHQUFHLElBQUks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QyxPQUFPLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRWpDLENBQUM7SUF2YVEsV0FBVztRQUZ2QixpQkFBVSxFQUFFO3lDQVVpQixXQUFJO1lBQ0gsOEJBQWE7WUFDUCw0Q0FBb0I7T0FWNUMsV0FBVyxDQXlhdkI7SUFBRCxrQkFBQztDQUFBLEFBemFELElBeWFDO0FBemFZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSwgSGVhZGVycywgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jYXRjaCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9vZic7XHJcbmltcG9ydCB7IFJldHVybiwgUGF0Y2gsIENvbmRvTWF0ZXJpYWxJbmZvLCBVc2VycyB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vdXRpbHMvY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHbG9iYWxTdG9yYWdlU2VydmljZX0gZnJvbSAnLi4vc3RvcmUvZ2xvYmFsc3RvcmFnZS5zZXJ2aWNlJztcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcblxyXG5leHBvcnQgY2xhc3MgRGF0YVNlcnZpY2Uge1xyXG5cclxuICAgIGJhc2VVcmwgPSAnJztcclxuICAgIGNvbmRvSWQ6IGFueSA9ICcnO1xyXG4gICAgdXNlcklkID0gJyc7XHJcbiAgICBiYXRjaE5vOiBhbnkgPSAnJztcclxuICAgIHN0ckZpbGVQYXRoVXJsID0gJyc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLFxyXG4gICAgICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGdsb2JhbFN0b3JhZ2VTZXJ2aWNlOkdsb2JhbFN0b3JhZ2VTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQmVmb3JlIFwiKTsgICAgXHJcblxyXG4gICAgICAgIC8vdGhpcy5sb2NhbFN0b3JhZ2Uuc2V0KHtrZXk6ICdteUFwcGxpY2F0aW9uSWQnLCB2YWx1ZTogJzU2M0Q5Rjg4LUJGNDYtNDEwMi04OTE2LURDQUVFMzIwMzgyRid9KTtcclxuICAgICAgICAvL3RoaXMubG9jYWxTdG9yYWdlLnNldCh7a2V5OiAnbXlTZWNyZXRLZXknLCB2YWx1ZTogJ2FiYzMzMyd9KTtcclxuXHJcbiAgICAgICAvLyB0aGlzLmxvY2FsU3RvcmFnZS5nZXQoe2tleTogICdteUFwcGxpY2F0aW9uSWQnfSkudGhlbih2YWx1ZSA9PiBjb25zb2xlLmxvZyhcImFwcElkIC0+IFwiICt2YWx1ZSkpO1xyXG4gICAgICAgIC8vdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0KHtrZXk6ICAnbXlTZWNyZXRLZXknfSkudGhlbih2YWx1ZSA9PiB0aGlzLnNlY3JldEtleSA9IHZhbHVlKTtcclxuXHJcbiAgICAgICAgZ2xvYmFsU3RvcmFnZVNlcnZpY2Uuc2V0QXBwbGljYXRpb25JZCgnNTYzRDlGODgtQkY0Ni00MTAyLTg5MTYtRENBRUUzMjAzODJGJyk7XHJcbiAgICAgICAgZ2xvYmFsU3RvcmFnZVNlcnZpY2Uuc2V0U2VjcmV0S2V5KCdhYmMzMzMnKTtcclxuXHJcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gY29uZmlnU2VydmljZS5nZXRBcGlVUkkoKTtcclxuICAgICAgICB0aGlzLnN0ckZpbGVQYXRoVXJsID0gY29uZmlnU2VydmljZS5nZXRGaWxlUGF0aFVSSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIFVzZXIgTG9naW4gRnVuY3Rpb24gU3RhcnQgKi9cclxuXHJcbiAgICB1c2VyTG9naW4oX3VzZXJMb2dpbjogVXNlcnMpOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG4gICAgICAgICAvL3RoaXMubG9jYWxTdG9yYWdlLmdldCh7a2V5OiAgJ215QXBwbGljYXRpb25JZCd9KS50aGVuKHZhbHVlID0+e191c2VyTG9naW4uQXBwbGljYXRpb25fSWQgPSB2YWx1ZX0pO1xyXG4gICAgICAgIC8vIHRoaXMubG9jYWxTdG9yYWdlLmdldCh7a2V5OiAgJ215U2VjcmV0S2V5J30pLnRoZW4odmFsdWUgPT57X3VzZXJMb2dpbi5TZWNyZXRfS2V5ID0gdmFsdWV9KTtcclxuICAgICAgIC8vIHRoaXMubG9jYWxTdG9yYWdlLmdldCh7a2V5OiAgJ215U2VjcmV0S2V5J30pLnRoZW4odmFsdWUgPT4gdGhpcy5zZWNyZXRLZXkgPSB2YWx1ZSk7XHJcbiAgICBcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiYXBwSWQgXCIgKyB0aGlzLmFwcGxpY2F0aW9uSWQpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCh0aGlzLmJhc2VVcmwgKyAnTUNfQWNjb3VudC9Mb2dpbicpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZVVybCArICdNQ19BY2NvdW50L0xvZ2luJywgSlNPTi5zdHJpbmdpZnkoX3VzZXJMb2dpbiksIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXJMb2dpbiAtLT4gXCIgKyAgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFVzZXJSb2xlKG1vZHVsZW5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkFwcGxpY2F0aW9uX0lkXCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0QXBwbGljYXRpb25JZCgpKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIlRva2VuS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0VG9rZW5LZXkoKSk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJTZWNyZXRfS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0U2VjcmV0S2V5KCkpO1xyXG4gICAgICAgIHRoaXMuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZVVybCArICdyb2xlLycgKyBtb2R1bGVuYW1lLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzLnRleHQoKSwgdGhpcy5yZXZpdmVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRVc2VyUm9sZUJ5VXNlcklkKHVzcklkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG5cclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJBcHBsaWNhdGlvbl9JZFwiLCB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldEFwcGxpY2F0aW9uSWQoKSk7XHJcbiAgICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiVG9rZW5LZXlcIiwgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRUb2tlbktleSgpKTtcclxuICAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJTZWNyZXRfS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0U2VjcmV0S2V5KCkpO1xyXG4gICAgICAgICB0aGlzLmFkZEhlYWRlcihoZWFkZXJzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInVybCA9PlwiICsgdGhpcy5iYXNlVXJsICsgJ3JvbGUvJyArIHVzcklkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VVcmwgKyAncm9sZS8nICsgdXNySWQsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJQZXJtaXNzaW9uKCk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIHRoaXMuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZVVybCArICdyb2xlL215dXNlcicsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEN1cnJlbnRVc2VyKCk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIHRoaXMuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZVVybCArICd1c2VycycsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKiBTdGFydCBteUNvbmRvc2cgRnVuY3Rpb25zICovXHJcblxyXG4gICAgZ2V0Q29uZG9saXN0KCk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIHRoaXMuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZVVybCArICdteW1lbWJlcicsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldENvbmRvRmFjdFNoZWV0KGNvbmRvSWQ6IGFueSk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIHRoaXMuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0Q29uZG9GYWN0U2hlZXQgLS0+IFwiICsgdGhpcy5iYXNlVXJsICsgJ215Q29uZG9zLycgKyBjb25kb0lkICsgJy9mYWN0c2hlZXQnKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VVcmwgKyAnbXlDb25kb3MvJyArIGNvbmRvSWQgKyAnL2ZhY3RzaGVldCcsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdldENvbmRvRmFjdFNoZWV0IC0tPiBcIiArICBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCksIHRoaXMucmV2aXZlcik7ICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldEJsb2NrTGF5b3V0UGxhbkZpbGVzKGNvbmRvSWQ6IGFueSk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIHRoaXMuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZVVybCArICdteUNvbmRvcy8nICsgY29uZG9JZCArICcvYmxvY2tsYXlvdXRmaWxlcycsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldFVuaXRDYXRlZ29yeU5hbWVSYW5nZShjb25kb0lkOiBhbnkpOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG5cclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICB0aGlzLmFkZEhlYWRlcihoZWFkZXJzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VVcmwgKyAnbXlDb25kb3MvJyArIGNvbmRvSWQgKyAnL3VuaXRyYW5nZScsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIEZvciBzaG93aW5nIEJvb2thYmxlIGFuZCB1bkJvb2thYmxlIGZhY2lsaXRpZXMgaW4gbXlGYWNpbGl0eSB0YWJcclxuXHJcbiAgICBnZXRGYWNpbGl0eShjb25kb0lkOiBhbnksIGlzQm9va2FibGU6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG5cclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICB0aGlzLmFkZEhlYWRlcihoZWFkZXJzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VVcmwgKyAnbXlDb25kb3MvJyArIGNvbmRvSWQgKyAnL2ZhY2lsaXR5Z3JvdXA/aXNCb29rYWJsZT0nICsgaXNCb29rYWJsZSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCksIHRoaXMucmV2aXZlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvLyBGb3Igc2hvd2luZyBmYWNpbGl0eWxpc3QgaW4gRmFjdFNoZWV0XHJcblxyXG4gICAgZ2V0RmFjaWxpdHlMaXN0KGNvbmRvSWQ6IGFueSk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIHRoaXMuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZVVybCArICdteUNvbmRvcy8nICsgY29uZG9JZCArICcvZmFjaWxpdGllcycsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldE1hdGVyaWFsKGNvbmRvSWQ6IGFueSwgbWF0ZXJpYWxUeXBlOiBudW1iZXIpOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG5cclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICB0aGlzLmFkZEhlYWRlcihoZWFkZXJzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VVcmwgKyAnbXlDb25kb3MvJyArIGNvbmRvSWQgKyAnL2NvbmRvbWF0ZXJpYWxzP01hdGVyaWFsVHlwZT0nICsgbWF0ZXJpYWxUeXBlLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzLnRleHQoKSwgdGhpcy5yZXZpdmVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzYXZlQ29uZG9GaWxlKGZkYXRhOiBGb3JtRGF0YSwgY29uZG9JZDogYW55KTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgdGhpcy5hZGRIZWFkZXJfbm90SnNvbihoZWFkZXJzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlVXJsICsgJ215Y29uZG9zLycgKyB0aGlzLmNvbmRvSWQgKyAnL2RldmVsb3BtZW50ZmlsZScsIGZkYXRhLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzLnRleHQoKSwgdGhpcy5yZXZpdmVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVDb25kb0ZpbGUoZklkOiBhbnkpOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG5cclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICB0aGlzLmFkZEhlYWRlcl9ub3RKc29uKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKHRoaXMuYmFzZVVybCArICdteWNvbmRvcy8nICsgdGhpcy5jb25kb0lkICsgJy9kZXZlbG9wbWVudGZpbGVzLycgKyBmSWQsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNhdmVNYXRlcmlhbChjb25kb01hdGVyaWFsOiBDb25kb01hdGVyaWFsSW5mbyk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIHRoaXMuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIGNvbmRvTWF0ZXJpYWwuQ29uZG9taW5pdW1fSWQgPSB0aGlzLmNvbmRvSWQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZVVybCArICdjb25kb21hdGVyaWFsLycsIEpTT04uc3RyaW5naWZ5KGNvbmRvTWF0ZXJpYWwpLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzLnRleHQoKSwgdGhpcy5yZXZpdmVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVNYXRlcmlhbChtSWQ6IGFueSk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIHRoaXMuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKHRoaXMuYmFzZVVybCArICdjb25kb21hdGVyaWFsLz9pZD0nICsgbUlkLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzLnRleHQoKSwgdGhpcy5yZXZpdmVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVNYXRlcmlhbChwYXRjaDogUGF0Y2gpOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG5cclxuICAgICAgICBsZXQgcHRzOiBQYXRjaFtdO1xyXG4gICAgICAgIHB0cyA9IFtwYXRjaF07XHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgdGhpcy5hZGRIZWFkZXIoaGVhZGVycyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wYXRjaCh0aGlzLmJhc2VVcmwgKyAnY29uZG9tYXRlcmlhbC8nICsgcGF0Y2guSWQsIEpTT04uc3RyaW5naWZ5KHB0cyksIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNhdmVNYXRlcmlhbEltYWdlcyhmZGF0YTogRm9ybURhdGEsIG1hdGVyaWFsSWQ6IGFueSkge1xyXG5cclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICB0aGlzLmFkZEhlYWRlcl9ub3RKc29uKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VVcmwgKyAnY29uZG9tYXRlcmlhbGZpbGUvP0NvbmRvSWQ9JyArIHRoaXMuY29uZG9JZCArICcmTWF0ZXJpYWxpZD0nICsgbWF0ZXJpYWxJZCwgZmRhdGEsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNhdmVOZXdCbG9ja0xheW91dFBsYW4oZmRhdGE6IEZvcm1EYXRhKTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgdGhpcy5hZGRIZWFkZXJfbm90SnNvbihoZWFkZXJzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlVXJsICsgJ215Y29uZG9zLycgKyB0aGlzLmNvbmRvSWQgKyAnL2Jsb2NrbGF5b3V0ZmlsZScsIGZkYXRhLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzLnRleHQoKSwgdGhpcy5yZXZpdmVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVCbG9ja0xheW91dFBsYW5GaWxlcyhmZGF0YTogRm9ybURhdGEsIEJJZDogYW55KSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIHRoaXMuYWRkSGVhZGVyX25vdEpzb24oaGVhZGVycyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5iYXNlVXJsICsgJ215Y29uZG9zLycgKyB0aGlzLmNvbmRvSWQgKyAnL2Jsb2NrbGF5b3V0ZmlsZS8nICsgQklkLCBmZGF0YSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCksIHRoaXMucmV2aXZlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQmxvY2tMYXlvdXRQbGFuRGVzY3JpcHRpb24ocGF0Y2g6IFBhdGNoLCBJZDogYW55KSB7XHJcblxyXG4gICAgICAgIGxldCBwdHM6IFBhdGNoW107XHJcbiAgICAgICAgcHRzID0gW3BhdGNoXTtcclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICB0aGlzLmFkZEhlYWRlcihoZWFkZXJzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBhdGNoKHRoaXMuYmFzZVVybCArICdteWNvbmRvcy8nICsgdGhpcy5jb25kb0lkICsgJy9ibG9ja2xheW91dC8nICsgSWQsIEpTT04uc3RyaW5naWZ5KHB0cyksIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUJsb2NrTGF5b3V0KEJJZDogYW55KSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIHRoaXMuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKHRoaXMuYmFzZVVybCArICdteUNvbmRvcy8nICsgdGhpcy5jb25kb0lkICsgJy9ibG9ja2xheW91dGZpbGUvJyArIEJJZCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCksIHRoaXMucmV2aXZlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlTWF0ZXJpYWxJbWFnZShmSWQ6IGFueSkge1xyXG5cclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICB0aGlzLmFkZEhlYWRlcihoZWFkZXJzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZSh0aGlzLmJhc2VVcmwgKyAnY29uZG9tYXRlcmlhbGZpbGUvP2lkPScgKyBmSWQsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXMudGV4dCgpLCB0aGlzLnJldml2ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldEJsb2NrKGNvbmRvSWQ6IGFueSk6IE9ic2VydmFibGU8UmV0dXJuPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIHRoaXMuYWRkSGVhZGVyKGhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZVVybCArICdteUNvbmRvcy8nICsgY29uZG9JZCArICcvYmxvY2tkZXRhaWxzJywgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCksIHRoaXMucmV2aXZlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VW5pdChjb25kb0lkOiBhbnkpOiBPYnNlcnZhYmxlPFJldHVybj4ge1xyXG5cclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICB0aGlzLmFkZEhlYWRlcihoZWFkZXJzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VVcmwgKyAnbXlDb25kb3MvJyArIGNvbmRvSWQgKyAnL3Jvb21zJywgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcy50ZXh0KCksIHRoaXMucmV2aXZlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuXHJcbiAgICB9XHJcbiAgICAvKiBFbmQgT2YgbXlDb25kb3NnIEZ1bmN0aW9ucyAqL1xyXG5cclxuXHJcbiAgICAvKiBGb3IgQ29tbW9uIFVzZSBGdW5jdGlvbnMgKi9cclxuXHJcbiAgICBwdWJsaWMgYWRkSGVhZGVyX25vdEpzb24oaGVhZGVyczogSGVhZGVycykge1xyXG5cclxuICAgICAgICAvLyBoZWFkZXJzLmFwcGVuZCgnQXBwbGljYXRpb25fSWQnLCB0aGlzLmxvY2FsU3RvcmFnZS5yZXRyaWV2ZSgnbXlBcHBsaWNhdGlvbklkJykpO1xyXG4gICAgICAgIC8vIGhlYWRlcnMuYXBwZW5kKCdUb2tlbktleScsIHRoaXMubG9jYWxTdG9yYWdlLnJldHJpZXZlKCdteVRva2VuS2V5JykpO1xyXG4gICAgICAgIC8vIGhlYWRlcnMuYXBwZW5kKCdTZWNyZXRfS2V5JywgdGhpcy5sb2NhbFN0b3JhZ2UucmV0cmlldmUoJ215U2VjcmV0S2V5JykpO1xyXG4gICAgICAgIC8vIHRoaXMuY29uZG9JZCA9IHRoaXMubG9jYWxTdG9yYWdlLnJldHJpZXZlKCdteUNvbmRvbWluaXVtSWQnKTtcclxuICAgICAgICAvLyB0aGlzLnVzZXJJZCA9IHRoaXMubG9jYWxTdG9yYWdlLnJldHJpZXZlKCdteVVzZXJpZCcpO1xyXG4gICAgICAgIC8vIHRoaXMuYmF0Y2hObyA9IHRoaXMubG9jYWxTdG9yYWdlLnJldHJpZXZlKCdteUJhdGNoTnVtYmVyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEhlYWRlcihoZWFkZXJzKSB7XHJcblxyXG4gICAgICAgIC8vICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgICAgLy8gIGhlYWRlcnMuYXBwZW5kKFwiQXBwbGljYXRpb25fSWRcIiwgdGhpcy5nbG9iYWxTdG9yYWdlU2VydmljZS5nZXRBcHBsaWNhdGlvbklkKCkpO1xyXG4gICAgICAgIC8vICBoZWFkZXJzLmFwcGVuZChcIlRva2VuS2V5XCIsIHRoaXMuZ2xvYmFsU3RvcmFnZVNlcnZpY2UuZ2V0VG9rZW5LZXkoKSk7XHJcbiAgICAgICAgLy8gIGhlYWRlcnMuYXBwZW5kKFwiU2VjcmV0X0tleVwiLCB0aGlzLmdsb2JhbFN0b3JhZ2VTZXJ2aWNlLmdldFNlY3JldEtleSgpKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpIHtcclxuXHJcbiAgICAgICAgY29uc3QgYXBwbGljYXRpb25FcnJvciA9IGVycm9yLmhlYWRlcnMuZ2V0KCdBcHBsaWNhdGlvbi1FcnJvcicpO1xyXG4gICAgICAgIGNvbnN0IHNlcnZlckVycm9yID0gZXJyb3IuanNvbigpO1xyXG4gICAgICAgIGxldCBtb2RlbFN0YXRlRXJyb3JzID0gJyc7XHJcblxyXG4gICAgICAgIGlmICghc2VydmVyRXJyb3IudHlwZSkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBzZXJ2ZXJFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlcnZlckVycm9yW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbFN0YXRlRXJyb3JzICs9IHNlcnZlckVycm9yW2tleV0gKyAnXFxuJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBtb2RlbFN0YXRlRXJyb3JzID0gbW9kZWxTdGF0ZUVycm9ycyA9ICcnID8gbnVsbCA6IG1vZGVsU3RhdGVFcnJvcnM7XHJcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coYXBwbGljYXRpb25FcnJvciB8fCBtb2RlbFN0YXRlRXJyb3JzIHx8ICdTZXJ2ZXIgZXJyb3InKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJldml2ZXIoa2V5LCB2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBjb25zdCBhID0gL15cXGR7NH1bLV1cXGR7Mn1bLV1cXGR7Mn1bVF0vLmV4ZWModmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAoYSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlLnJlcGxhY2UoJ1QnLCAnICcpICsgJ1onKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzYXZldGVtcGZpbGUoZmlsZWRhdGE6IEZvcm1EYXRhLCBwYXJlbnRJZDogYW55KTogT2JzZXJ2YWJsZTxSZXR1cm4+IHtcclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgdGhpcy5hZGRIZWFkZXJfbm90SnNvbihoZWFkZXJzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlVXJsICsgJ215RmlsZVVwbG9hZC8nICsgcGFyZW50SWQsIGZpbGVkYXRhLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzLnRleHQoKSwgdGhpcy5yZXZpdmVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==