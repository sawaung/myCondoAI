import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Return, Patch, CondoMaterialInfo, Users } from '../interfaces';
import { ConfigService } from '../utils/config.service';
import { GlobalStorageService} from '../store/globalstorage.service';


@Injectable()

export class DataService {

    baseUrl = '';
    condoId: any = '';
    userId = '';
    batchNo: any = '';
    strFilePathUrl = '';

    constructor(private http: Http,
        private configService: ConfigService,
        private globalStorageService:GlobalStorageService) {

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

    userLogin(_userLogin: Users): Observable<Return> {
         //this.localStorage.get({key:  'myApplicationId'}).then(value =>{_userLogin.Application_Id = value});
        // this.localStorage.get({key:  'mySecretKey'}).then(value =>{_userLogin.Secret_Key = value});
       // this.localStorage.get({key:  'mySecretKey'}).then(value => this.secretKey = value);
    
        //console.log("appId " + this.applicationId);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log((this.baseUrl + 'MC_Account/Login'));

        return this.http.post(this.baseUrl + 'MC_Account/Login', JSON.stringify(_userLogin), { headers: headers })
            .map((res: Response) => {
                console.log("userLogin --> " +  JSON.stringify(res));
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);
    }

    public getUserRole(modulename: string): Observable<Return> {

        const headers = new Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'role/' + modulename, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);
    }

    public getUserRoleByUserId(usrId: string): Observable<Return> {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Application_Id", this.globalStorageService.getApplicationId());
        headers.append("TokenKey", this.globalStorageService.getTokenKey());
        headers.append("Secret_Key", this.globalStorageService.getSecretKey());
        this.addHeader(headers);
        console.log("url =>" + this.baseUrl + 'role/' + usrId);
        return this.http.get(this.baseUrl + 'role/' + usrId, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }

    getUserPermission(): Observable<Return> {

        const headers = new Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'role/myuser', { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);
    }

    public getCurrentUser(): Observable<Return> {

        const headers = new Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'users', { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }


    /* Start myCondosg Functions */

    getCondolist(): Observable<Return> {

        const headers = new Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'mymember', { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }

    getCondoFactSheet(condoId: any): Observable<Return> {

        const headers = new Headers();
        this.addHeader(headers);
        console.log("getCondoFactSheet --> " + this.baseUrl + 'myCondos/' + condoId + '/factsheet');
        return this.http.get(this.baseUrl + 'myCondos/' + condoId + '/factsheet', { headers: headers })
            .map((res: Response) => {
                console.log("getCondoFactSheet --> " +  JSON.stringify(res));
                return JSON.parse(res.text(), this.reviver);    
            })
            .catch(this.handleError);

    }

    getBlockLayoutPlanFiles(condoId: any): Observable<Return> {

        const headers = new Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'myCondos/' + condoId + '/blocklayoutfiles', { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }

    getUnitCategoryNameRange(condoId: any): Observable<Return> {

        const headers = new Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'myCondos/' + condoId + '/unitrange', { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }

    // For showing Bookable and unBookable facilities in myFacility tab

    getFacility(condoId: any, isBookable: boolean): Observable<Return> {

        const headers = new Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'myCondos/' + condoId + '/facilitygroup?isBookable=' + isBookable, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }



    // For showing facilitylist in FactSheet

    getFacilityList(condoId: any): Observable<Return> {

        const headers = new Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'myCondos/' + condoId + '/facilities', { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }

    getMaterial(condoId: any, materialType: number): Observable<Return> {

        const headers = new Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'myCondos/' + condoId + '/condomaterials?MaterialType=' + materialType, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }

    saveCondoFile(fdata: FormData, condoId: any): Observable<Return> {

        const headers = new Headers();
        this.addHeader_notJson(headers);
        return this.http.post(this.baseUrl + 'mycondos/' + this.condoId + '/developmentfile', fdata, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }

    deleteCondoFile(fId: any): Observable<Return> {

        const headers = new Headers();
        this.addHeader_notJson(headers);
        return this.http.delete(this.baseUrl + 'mycondos/' + this.condoId + '/developmentfiles/' + fId, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }

    saveMaterial(condoMaterial: CondoMaterialInfo): Observable<Return> {

        const headers = new Headers();
        this.addHeader(headers);
        condoMaterial.Condominium_Id = this.condoId;
        return this.http.post(this.baseUrl + 'condomaterial/', JSON.stringify(condoMaterial), { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }

    deleteMaterial(mId: any): Observable<Return> {

        const headers = new Headers();
        this.addHeader(headers);
        return this.http.delete(this.baseUrl + 'condomaterial/?id=' + mId, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }

    updateMaterial(patch: Patch): Observable<Return> {

        let pts: Patch[];
        pts = [patch];
        const headers = new Headers();
        this.addHeader(headers);
        return this.http.patch(this.baseUrl + 'condomaterial/' + patch.Id, JSON.stringify(pts), { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }

    saveMaterialImages(fdata: FormData, materialId: any) {

        const headers = new Headers();
        this.addHeader_notJson(headers);
        return this.http.post(this.baseUrl + 'condomaterialfile/?CondoId=' + this.condoId + '&Materialid=' + materialId, fdata, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }

    saveNewBlockLayoutPlan(fdata: FormData): Observable<Return> {

        const headers = new Headers();
        this.addHeader_notJson(headers);
        return this.http.post(this.baseUrl + 'mycondos/' + this.condoId + '/blocklayoutfile', fdata, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }

    updateBlockLayoutPlanFiles(fdata: FormData, BId: any) {

        const headers = new Headers();
        this.addHeader_notJson(headers);
        return this.http.put(this.baseUrl + 'mycondos/' + this.condoId + '/blocklayoutfile/' + BId, fdata, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }

    updateBlockLayoutPlanDescription(patch: Patch, Id: any) {

        let pts: Patch[];
        pts = [patch];
        const headers = new Headers();
        this.addHeader(headers);
        return this.http.patch(this.baseUrl + 'mycondos/' + this.condoId + '/blocklayout/' + Id, JSON.stringify(pts), { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }

    deleteBlockLayout(BId: any) {

        const headers = new Headers();
        this.addHeader(headers);
        return this.http.delete(this.baseUrl + 'myCondos/' + this.condoId + '/blocklayoutfile/' + BId, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }

    deleteMaterialImage(fId: any) {

        const headers = new Headers();
        this.addHeader(headers);
        return this.http.delete(this.baseUrl + 'condomaterialfile/?id=' + fId, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }

    getBlock(condoId: any): Observable<Return> {

        const headers = new Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'myCondos/' + condoId + '/blockdetails', { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }

    getUnit(condoId: any): Observable<Return> {

        const headers = new Headers();
        this.addHeader(headers);
        return this.http.get(this.baseUrl + 'myCondos/' + condoId + '/rooms', { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }
    /* End Of myCondosg Functions */


    /* For Common Use Functions */

    public addHeader_notJson(headers: Headers) {

        // headers.append('Application_Id', this.localStorage.retrieve('myApplicationId'));
        // headers.append('TokenKey', this.localStorage.retrieve('myTokenKey'));
        // headers.append('Secret_Key', this.localStorage.retrieve('mySecretKey'));
        // this.condoId = this.localStorage.retrieve('myCondominiumId');
        // this.userId = this.localStorage.retrieve('myUserid');
        // this.batchNo = this.localStorage.retrieve('myBatchNumber');
    }

    public addHeader(headers: Headers) {

        // headers.append('Content-Type', 'application/json');
        // headers.append('Application_Id', this.localStorage.retrieve('myApplicationId'));
        // headers.append('TokenKey', this.localStorage.retrieve('myTokenKey'));
        // headers.append('Secret_Key', this.localStorage.retrieve('mySecretKey'));
        // this.condoId = this.localStorage.retrieve('myCondominiumId');
        // this.userId = this.localStorage.retrieve('myUserid');
        // this.batchNo = this.localStorage.retrieve('myBatchNumber');

    }

    public handleError(error: any) {

        const applicationError = error.headers.get('Application-Error');
        const serverError = error.json();
        let modelStateErrors = '';

        if (!serverError.type) {
            for (const key in serverError) {
                if (serverError[key]) {
                    modelStateErrors += serverError[key] + '\n';
                }
            }
        }
        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
        return Observable.throw(applicationError || modelStateErrors || 'Server error');

    }

    public reviver(key, value) {

        if (typeof value === 'string') {
            const a = /^\d{4}[-]\d{2}[-]\d{2}[T]/.exec(value);
            if (a) {
                return new Date(value.replace('T', ' ') + 'Z');
            }
        }

        return value;

    }

    savetempfile(filedata: FormData, parentId: any): Observable<Return> {

        const headers = new Headers();
        this.addHeader_notJson(headers);
        return this.http.post(this.baseUrl + 'myFileUpload/' + parentId, filedata, { headers: headers })
            .map((res: Response) => {
                return JSON.parse(res.text(), this.reviver);
            })
            .catch(this.handleError);

    }

}

