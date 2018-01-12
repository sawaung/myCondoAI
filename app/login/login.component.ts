import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../shared/interfaces';
import { DataService } from '../shared/services/data.service';
import { GlobalStorageService } from '../shared/store/globalstorage.service';
import * as app from 'application';
import { isIOS } from 'platform';
import { Page } from "ui/page";
import { Color } from "tns-core-modules/color";
import { LoadingIndicator } from "nativescript-loading-indicator";
import { WebView, LoadEventData } from "ui/web-view";
import { WebViewInterface } from 'nativescript-webview-interface';
import {TextField } from 'ui/text-field';
import {StackLayout} from 'ui/layouts/stack-layout';

import {  Role } from '../myFeed/model/myfeed.model';


declare var android;

@Component({
  selector: 'app-login',
  templateUrl: 'login/login.component.html',
  styleUrls: ['login/login.component.css']
})


export class LoginComponent implements OnInit {

  roles: any;
  userLogin: Users;
  errorMessage: any;
  condoInfo: CondoInfoDetail;

  applicationId: string;
  secretKey: string;
  public htmlString: string;
  public webview: WebView;
  public oWebViewInterface:WebViewInterface;
  txtUserName:TextField;
  txtPassword:TextField;

  //@ViewChild("webView") webViewRef: ElementRef;
  @ViewChild("container") container: ElementRef;
  constructor(private router: Router,
    private dataService: DataService,
    private globalStorageService: GlobalStorageService,
    private page: Page) {
    
  }

  ngOnInit() {
    //this.page.statusBarStyle = "dark";
    if(isIOS){
     
    }else{
      //let decorView = app.android.startActivity.getWindow().getDecorView();
      //decorView.setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
      app.android.startActivity.getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
    }
    this.page.androidStatusBarBackground = new Color("#97519A");
    this.page.actionBarHidden = true;
    this.userLogin = new Users();

    //app.android.startActivity.getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);

  }
  ngAfterViewInit() {
    let parentView =<StackLayout>this.container.nativeElement;
    this.txtUserName = <TextField> parentView.getViewById("username");
    this.txtPassword = <TextField> parentView.getViewById("password");
    

    /*this.webview = this.webViewRef.nativeElement;
    this.oWebViewInterface = new WebViewInterface(this.webview, "~/summer_note/index.html");
    this.webview.on('loadFinished', (args) => {
      if (!args.error) {
          console.log("load finished" );
      }
  });*/

  }

  UserLogin() {
    if(this.txtUserName.text.toString() == ""){
      alert("Please enter username!");
      return;
    }else if(this.txtPassword.text.toString() == ""){
      alert("Please enter password!");
      return;
    }
    var loader = new LoadingIndicator();

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
      /*ios: {
        details: "Additional detail note!",
        margin: 10,
        dimBackground: true,
        color: "#4B9ED6", // color of indicator and labels
        // background box around indicator
        // hideBezel will override this if true
        backgroundColor: "yellow",
        hideBezel: true, // default false, can hide the surrounding bezel
        view: UIView, // Target view to show on top of (Defaults to entire window)
        mode: MBProgressHUDModeDeterminate// see iOS specific options below
      }*/
    };

    loader.show(options); // options is optional

    this.userLogin.Secret_Key = this.globalStorageService.getSecretKey();
    this.userLogin.Application_Id = this.globalStorageService.getApplicationId();
    console.log("userLOgin " + JSON.stringify(this.userLogin));

    this.dataService.userLogin(this.userLogin)
      .subscribe(res => {
       
        console.log("code " + res.response.code);
        if (res.response.code == "200") {

          this.globalStorageService.setTokenKey(res.result[0].TokenKey);
          this.globalStorageService.setCondominiumId(res.result[0].Condominium_Id);
          this.globalStorageService.setCurrentUserId(res.result[0].UserId);
          this.globalStorageService.setBatchNumber(res.result[0].BatchNo);
          this.globalStorageService.setCurrentUserInfo(res.result[0]);

          this.dataService.getUserRoleByUserId(this.globalStorageService.getCurrentUserId())
            .subscribe(res1 => {
              loader.hide();
              //this.roles = res1.result;
             
              this.globalStorageService.setPermission('1',JSON.stringify(res1.result));
              
              console.log("role permission --> " + this.globalStorageService.getPermission('1'));

              //this.condoInfo = res1.result[0];
              //this.globalStorageService.setCurrentCondoInfo(this.condoInfo);
            });
          this.router.navigate(['/myfeed']);
        } else {
          this.errorMessage = res.response.code;
          this.userLogin.User_Name = null;
        }
      }, error => { loader.hide(), alert("Can't connect to server!") });
  }

  cancelLogin() {

    this.userLogin.Password = null;
    this.userLogin.User_Name = null;
    this.errorMessage = null;

  }

  getContent() {
     this.oWebViewInterface.callJSFunction('hello',null,(oSelectedLang) => {
      alert(`${oSelectedLang}`);
    }); 
     
  }

}

export class CondoInfoDetail {
  Condominium_Id: any;
  Request_Id: any;
  Condominium_Name: string;
  MCST_No: number;
  MaintenanceFundAccount: string;
  TOP_Day: number;
  TOP_Month: number;
  TOP_Year: number;
  Tenure: string;
  District_Id: any;
  No_Of_Unit: number;
  SiteArea: number;
  Country_Id: any;
  Postal_Code: number;
  Address: string;
  Current_Website_Address: string;
  MyCondo_Website_Address: string;
  Representing: string;
  Contact_Person: string;
  Salutation: string;
  Designation: string;
  Contact_No: string;
  Contact_Mobile_No: string;
  Contact_Email: string;
  Managing_Agent_Id: any;
  Managing_Agent_Name: string;
  Agent_Head_Office_Address: string;
  Agent_Phone: string;
  Agent_Fax: string;
  MA_Project_Manager: string;
  MA_Mobile: string;
  MA_Email: string;
  Developer_Id: any;
  Developer_Name: string;
  Developer_Head_Office_Address: string;
  Developer_Phone: string;
  Developer_Fax: string;
  Dev_Project_Manager: string;
  Dev_Mobile: string;
  Dev_Email: string;
  Date_Format: string;
  Currency_Id: any;
  IsAutoGenerate_Receive_No: boolean;
  Receive_Prefix: string;
  Receive_No_Type: string;
  IsAutoGenerate_Refund_No: boolean;
  Refund_Prefix: string;
  Refund_No_Type: string;
  Condominium_Prefix: string;
  CondominiumImage: string;
  CondominiumImage_Type: string;
  isActive: boolean;
  ExpireOn: Date;
  LaunchOn: Date;
  SiteMap: string;
  SiteMap_FileType: string;
  LocationMap: string;
  LocatoinMapType: string;
  AboutUs: string;
  Project_Specification: string;
  Project_Specification_FileType: string;
  CurrentBookingNo: number;
  CurrentPaymentNo: number;
  CurrentRefundNo: number;
  CondoManager: string;
  CondoManager_Salutation: string;
  CondoManager_Nickname: string;
  CondoManager_Mobile: string;
  CondoManager_Email: string;
  Current_Initial_Fee_Id: any;
  MO_Email: string;
  MO_Phone: string;
  MO_Fax: string;
  MO_GuardHouse: string;
  MO_Operating_Hours: string;
  isMondayOff: boolean;
  isTuesdayOff: boolean;
  isWednesdayOff: boolean;
  isThursdayOff: boolean;
  isFridayOff: boolean;
  isSaturdayOff: boolean;
  isSundayOff: boolean;
  TemplateName: string;
  Theme: string;
  ThemeId: any;
  isDataEntry: boolean;
  Site_Title: string;
  Enquiry_Email: string;
  Sending_From_Email: string;
  District_Name: string;
  Max_Storey: number;
  Min_Storey: number;
  TotalUnitCount: number;
  TotalBlockCount: number;
  Created_By: string;
  Created_On: Date;
  Last_Updated_By: string;
  Last_Updated_On: Date;
}