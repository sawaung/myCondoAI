import { Component, ViewChild, OnInit, Input, Output, EventEmitter,ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
import {RouterExtensions} from "nativescript-angular/router";

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

import { FeedInformation, FeedType, FeedCategory, FeedFile, TemporaryFile, Role } from '../model/myfeed.model';
import { MyFeedService } from '../services/myfeed.service';
import { ConfigService } from '../../shared/utils/config.service';
import { CommonService } from '../../shared/utils/common.service';
import { DropDownValuePair } from '../../shared/interfaces';
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { WebViewInterface } from 'nativescript-webview-interface';
import { WebView, LoadEventData } from "ui/web-view";
import { ScrollView } from "ui/scroll-view";
import { isIOS } from 'platform';
import * as app from 'application';
import { ValueList } from "nativescript-drop-down";
import { DropDown } from "nativescript-drop-down/drop-down";
import { Page } from "ui/page";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import * as imagepicker from "nativescript-imagepicker";
import * as fileSystem from "file-system";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { LoadingIndicator } from "nativescript-loading-indicator";
import { Return} from "../../shared/interfaces";
import { DataService } from '../../shared/services/data.service';
import { ios } from 'tns-core-modules/ui/styling/font';
import * as dialogs from "ui/dialogs";
import { ViewContainerRef } from "@angular/core";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { myfeedCreateDialog } from "../../myFeed/components/dialog/myfeedCreateDialog.component";
import {Response as myResponse} from "../../shared/interfaces"
import {MyFeedsComponent} from "../../myFeed/components/myfeeds.component";
import {MyFeedDetailComponent} from "../../myFeed/components/myfeeddetail.component";

declare var android;
declare var org;
@Component({
    moduleId: module.id,
    selector: 'app-myfeed',
    templateUrl: 'myfeed.html',
    styleUrls: ['./myfeed.component.css']
})

export class MyFeedComponent implements OnInit {
    feedInfoDetail: FeedInformation;
    public oWebViewInterface:WebViewInterface;
    public webview: WebView;
    scrollView: ScrollView ;
    feedId: any;
    feedType:Array<FeedType>;
    feedCategory:Array<FeedCategory>;
    page:Page;
    arrFeedType = Array<String>();
    isLoading: Boolean = false;
    radListViewHeight:number;

    dropDownFeedType:DropDown;
    dropDownFeedCategory:DropDown;
    dataSourceFeedType = new ValueList<DropDownValuePair>();  
    dataSourceFeedCategory = new ValueList<DropDownValuePair>();  

    fileParentId:string = "";
    arrFeedFileList: ObservableArray<FeedFile>;
    arrFeedFileToUploadList: ObservableArray<FeedFile>;
    feedFileUploaded:number = 0;

    loader:any;
    options:any;
    createOrUpdate:string;
    static feedCategoryId:string = ""; static feedTypeId:string = "";

    public result: string;
    @ViewChild("page") pageRef: ElementRef;
    @ViewChild("webView") webViewRef: ElementRef;
    //@ViewChild("scrollview") scrollViewRef: ElementRef;
    constructor(private router: Router,private route: ActivatedRoute,private routerExtensions: RouterExtensions,
         public dataService: DataService,
         private feedService:MyFeedService,
         public commonService: CommonService,
         private modalService: ModalDialogService,
         private viewContainerRef: ViewContainerRef){ 
        /*if(this.route.url == '/myfeed/new' ) {

        }*/
        this.loader = new LoadingIndicator();      
            // optional options
            // android and ios have some platform specific options
        this.options = {
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

        this.arrFeedFileList = new ObservableArray<FeedFile>();
        this.arrFeedFileToUploadList = new ObservableArray<FeedFile>();

        let f:FeedFile = new FeedFile();
        f.Feed_Id= "8736851b-128f-4c74-97e9-63e9581a70ee";
        f.File_Id = "9f1216b1-97d8-4aa1-9a9b-bb00300fe5fe";
        f.Condominium_Id= "8e3919ce-3bd8-4528-bd9a-4127aea09414";
        f.File_Name= "download (3).jpg";
        f.File_Path= "8e3919ce-3bd8-4528-bd9a-4127aea09414/Services/1aded8d4-8452-4642-832c-91131c793827.jpg";
        f.File_Type= "image/jpeg";
        f.Actual_File_Path= "http://192.168.100.254:8062/8e3919ce-3bd8-4528-bd9a-4127aea09414/Services/1aded8d4-8452-4642-832c-91131c793827.jpg";
        f.Small_File_Path= "file:///Users/mycondo/Library/Developer/CoreSimulator/Devices/AD5BE23A-FF2E-424A-ADF2-DBF4E302E46E/data/Media/DCIM/100APPLE/IMG_0002.JPG";
        f.Parent_Id= "00000000-0000-0000-0000-000000000000";
        

        console.log("read url " + this.route.url["_value"][0]["path"]);
        if(this.route.url["_value"][0]["path"] == "edit"){
            this.route.queryParams.subscribe(params => {    
                this.feedInfoDetail = JSON.parse(params["Feed"]);
                this.arrFeedFileList.push(this.feedInfoDetail.MC_Feed_Files);

                if(this.feedInfoDetail != null ){
                    if(this.feedInfoDetail.MC_Feed_Files.length > 0){
                        this.fileParentId = this.feedInfoDetail.MC_Feed_Files[0].Parent_Id;
                    }

                    this.createOrUpdate = "update";
                    MyFeedComponent.feedTypeId = this.feedInfoDetail.FeedType_Id;
                    MyFeedComponent.feedCategoryId = this.feedInfoDetail.Feed_Category_Id;
                    //alert(this.createOrUpdate);
                    console.log("myFeed Description -1 " + this.feedInfoDetail.Description);
                }
                
                console.log("Feed -->" + JSON.stringify(this.feedInfoDetail));
            });  
        }else if(this.route.url["_value"][0]["path"] == "new"){
            this.feedInfoDetail = new FeedInformation();
            this.feedInfoDetail.Title = "";
            this.createOrUpdate = "new";      
            //alert(this.createOrUpdate);     
            //this.arrFeedFileList.push(f);

        }
    }    
    
    private _sideDrawerTransition: DrawerTransitionBase;
    ngOnInit() { 
        
        this.init();
        this.getHeight();
        if(isIOS){
           // this.init();
           console.log("operation system - IOS");
        }else{
            console.log("operation system - ANDROID");
             //let decorView = app.android.startActivity.getWindow().getDecorView();
             //decorView.setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
             //app.android.startActivity.getWindow().clearFlags(android.view.WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
            // this.init();
             app.android.startActivity.getWindow().addFlags(android.view.WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
             app.android.startActivity.getWindow().clearFlags(android.view.WindowManager.LayoutParams.FLAG_FULLSCREEN);
             app.android.startActivity.getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN | android.view.WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN);
        }
        
         
    }
  
    public showDialog() {
        
        if(MyFeedComponent.feedCategoryId == "" || MyFeedComponent.feedCategoryId == "0"){
            alert("Please select feed category!");
            return;
        }else if(MyFeedComponent.feedTypeId == "" || MyFeedComponent.feedTypeId == "0"){
            alert("Please select feed type!")
            return;
        }else if( this.feedInfoDetail.Title == ""){
            alert("Please enter feed title!")
            return;
        }else{
            if(this.createOrUpdate == "new"){
                let options: ModalDialogOptions = {
                    viewContainerRef: this.viewContainerRef
                };
            
                this.modalService.showModal(myfeedCreateDialog, options)
                .then((dialogResult: string) => { 
                    if(dialogResult == "save_as_draft"){
                        this.feedInfoDetail.Feed_Id ='00000000-0000-0000-0000-000000000000';
                        this.feedInfoDetail.status = "draft";
                        this.createOrUpdateFeed();
                    }else if(dialogResult == "post_and_notify"){
                        this.feedInfoDetail.Feed_Id ='00000000-0000-0000-0000-000000000000';
                        this.feedInfoDetail.status = "notify";
                        this.createOrUpdateFeed();
                    }else if(dialogResult == "post"){
                        this.feedInfoDetail.Feed_Id ='00000000-0000-0000-0000-000000000000';
                        this.feedInfoDetail.status = "post";
                        this.createOrUpdateFeed();
                    }
                });
            }else if(this.createOrUpdate == "update"){
                this.feedInfoDetail.Feed_Id = this.feedInfoDetail.Feed_Id;
                this.feedInfoDetail.Post_Status = this.feedInfoDetail.Post_Status;
                this.createOrUpdateFeed();
            }
        }
    }
    createOrUpdateFeed(){
        try{
            //if(this.createOrUpdate == "new"){
            //    this.feedInfoDetail.Feed_Id ='00000000-0000-0000-0000-000000000000';
                //this.feedInfoDetail.Post_Status = true;
            //}
            //this.feedInfoDetail.Condominium_Id= this.commonService.getCondoId;
            //console.log("feed category id --> " + MyFeedComponent.feedCategoryId);
            this.feedInfoDetail.Feed_Category_Id = MyFeedComponent.feedCategoryId;
            this.feedInfoDetail.FeedType_Id= MyFeedComponent.feedTypeId;
            
            //this.feedInfoDetail.Posted_By = "TT-CONDOMANAGER"; //posted creator
            // this.feedInfoDetail.Posted_Date = new Date(Date.now().toString());        //posted created date
            //this.feedInfoDetail.isBlocked = false;  //this feed is not blocked all user can see if it is posted
            //this.feedInfoDetail.Created_By = "TT-CONDOMANAGER";
            //this.feedInfoDetail.Last_Updated_By = "TT-CONDOMANAGER";
            this.feedInfoDetail.Feed_Group = 1;


            var fileList = Array<FeedFile>();                 
            this.arrFeedFileList.forEach(feed => {
               fileList.push(<FeedFile>feed);
            })
            this.feedInfoDetail.MC_Feed_Files = fileList;   

            this.oWebViewInterface.callJSFunction('getDescription',null,(para) => {
                // console.log( "webview hieght " +  this.webview.height);
                 //alert(`${oSelectedLang}`);
                 this.feedInfoDetail.Description = "";
                 if(para != null){
                    this.feedInfoDetail.Description = para;
                 }
                 //console.log("getDescription --> " + para);
                 this.saveFeedInformation(); 
             });
            

            
        }catch(e){
            console.log(e);
        }
        
        //this.feedInfoDetail.EventStartDateTime = new Date("1900-01-01 00:00:00.000");
       // this.feedInfoDetail.EventEndDateTime = new Date("1900-01-01 00:00:00.000");
        //this.feedInfoDetail.IsShowEndDateTime = false;
        //this.feedInfoDetail.EventPlace = "";
        //console.log("feed create --> " + JSON.stringify(this.feedInfoDetail));
        //console.log("retrieve date --> " + Date.now().toString());
    }


    saveFeedInformation() {
        if (this.createOrUpdate == "new") {// save feed
            console.log("saveFeedInformation --> " + JSON.stringify(this.feedInfoDetail));

            this.feedService.saveFeedInfo(this.feedInfoDetail)
                .subscribe(res => {
                    //this.commonService.showMessage(res, 'Feed information has been saved successfully.');
                    console.log("saveFeedInformation --> " + JSON.stringify(res));
                   
                    //let response:myResponse = JSON.parse(res.response.,this.dataService.reviver);
                    
                    if(res.response.code == "200"){
                        alert(res.response.message);
                        if(res.result[0] != null){
                            let feed:FeedInformation = res.result[0];
                            this.onNavBtnTap();

                            setTimeout(() => {
                                MyFeedsComponent.getMyFeedsObject().updateMyFeedsUI(feed,"new",null);
                            }, 1500);
                        }
                    }else{
                        alert(res.response.message);
                    }
                },
                error => {
                });

            //this.router.navigate(['/myfeed']);
        } else if (this.createOrUpdate == "update") {
            
            this.feedService.updatefeedInfo(this.feedInfoDetail)
                .subscribe(res => {
                    console.log("updateFeedInformation --> " + JSON.stringify(res));
                    //this.commonService.showMessage(res, 'Feed Information has been updated successfully.');
                    if(res.response.code == "200"){
                        alert(res.response.message);
                        //MyFeedDetailComponent.getMyFeedDetailObject().updateFeedDetailUI(this.feedInfoDetail);
                    }else{
                        alert(res.response.message);
                    }
                },
                error => {
                });
            //this.router.navigate(['/myfeed']);
        }
    }

    init(){
        //this.feedInfoDetail.Feed_Group = 1;=
        //this.feedInfoDetail.Feed_Id = this.feedId;
        //this.feedInfoDetail = this.route.snapshot.params['id'];

        console.log("init");
        this.isLoading = true;
        this.feedService.getfeedType()
            .subscribe(res => {
                //console.log("getFeedType -> " + JSON.stringify(res));
                this.isLoading = false;
                this.feedType = res.result;                 
                try{ 
                    var dropDownValuePair;  
                    dropDownValuePair = new DropDownValuePair();
                    dropDownValuePair.value = "0";
                    dropDownValuePair.display = "All";   
                    this.dataSourceFeedType.push(dropDownValuePair);      
                    let currentSelectedFeedType_Id:number;   
                    let index: number = 0;          
                    this.feedType.map((v) => {
                            dropDownValuePair = new DropDownValuePair();
                            dropDownValuePair.value =  v.FeedType_Id;

                            dropDownValuePair.display = v.FeedType_Name;
                            this.dataSourceFeedType.push(dropDownValuePair);
                            index ++;
                            if(v.FeedType_Id == this.feedInfoDetail.FeedType_Id){
                                currentSelectedFeedType_Id = index;
                            }
                            //this.arrFeedType.push(v.FeedType_Name)
                        }
                    );
                
                    this.dropDownFeedType.items = this.dataSourceFeedType; 
                    if(this.createOrUpdate == "new"){
                        this.dropDownFeedType.selectedIndex = 0;
                    }else if(this.createOrUpdate == "update"){
                        this.dropDownFeedType.selectedIndex = currentSelectedFeedType_Id;
                    }
                } catch(e){
                    console.log(e);
                }
            });
        this.feedService.getfeedCategory()
            .subscribe(res => {
               
                //console.log("getFeedCategory -> " + JSON.stringify(res));
                this.feedCategory = res.result;
                try{ 
                    var dropDownValuePair;  
                    dropDownValuePair = new DropDownValuePair();
                    dropDownValuePair.value = "0";
                    dropDownValuePair.display = "All";   
                    this.dataSourceFeedCategory.push(dropDownValuePair); 
                    let currentSelectedFeedCategory_Id:number;   
                    let index: number = 0;            
                    this.feedCategory.map((v) => {
                            dropDownValuePair = new DropDownValuePair();
                            dropDownValuePair.value =  v.Feed_Category_Id;
                            dropDownValuePair.display = v.Feed_Category_Name;
                            this.dataSourceFeedCategory.push(dropDownValuePair);

                            index ++;
                            if(v.Feed_Category_Id == this.feedInfoDetail.Feed_Category_Id){
                                currentSelectedFeedCategory_Id = index;
                            }
                            //this.arrFeedType.push(v.FeedType_Name)
                        }
                    );

                    this.dropDownFeedCategory.items = this.dataSourceFeedCategory; 
                    if(this.createOrUpdate == "new"){
                        this.dropDownFeedCategory.selectedIndex = 0;
                    }else if(this.createOrUpdate == "update"){
                        this.dropDownFeedCategory.selectedIndex = currentSelectedFeedCategory_Id;
                    }
                } catch(e){
                    console.log(e);
                    this.isLoading = false;
                }
            });
    }

    
    ngAfterViewInit() {
        console.log("view init");
        this.webview = this.webViewRef.nativeElement;
        //this.scrollView = this.scrollViewRef.nativeElement;
        this.page = this.pageRef.nativeElement;

        this.dropDownFeedType = this.page.getViewById<DropDown>("dropDownFeedType");
        this.dropDownFeedCategory = this.page.getViewById<DropDown>("dropDownFeedCategory");
       
        //this.webview.android.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT));
        this.oWebViewInterface = new WebViewInterface(this.webview, "~/summer_note/index.html");
       
       
       
        //this.webview.android.setLayoutParams(new android.view.WindowManager.LayoutParams(android.view.WindowManager.LayoutParams.MATCH_PARENT,
        //    android.view.WindowManager.LayoutParams.WRAP_CONTENT));
        
        this.webview.on('loadFinished', (args) => {
          if (!args.error) {
            
            if(!isIOS){
                var _webSetting = android.webkit.WebSettings;
        
              console.log("load finished" + "webview hieght " +  this.webview.height);
              _webSetting = this.webview.android.getSettings();
              _webSetting.setLayoutAlgorithm(android.webkit.WebSettings.LayoutAlgorithm.NORMAL);          
              //this.webview.android.setLayoutParams(new org.nativescript.widgets.CommonLayoutParams());    
              this.webview.android.getSettings().setBuiltInZoomControls(false);
              this.webview.android.getSettings().setDisplayZoomControls(false);

                var vc = this.webview.android.getLayoutParams();
                vc.height = android.view.ViewGroup.LayoutParams.WRAP_CONTENT;
                this.webview.android.setLayoutParams(vc);
            }
               
              this.insertDescription();
             
              //this.listenWebViewEvents();
             
             console.log("is loaded loaed");
             
          }
        
        });
        
      }

    onchangeFeedType(args: SelectedIndexChangedEventData) {
        let selectedValue = this.dataSourceFeedType.getValue(this.dropDownFeedType.selectedIndex);      
        MyFeedComponent.feedTypeId = selectedValue.toString();
        
        console.log("selectedValue " + selectedValue.toString());
        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
    }
    onchangeFeedCategory(args: SelectedIndexChangedEventData) {
        let selectedValue = this.dataSourceFeedCategory.getValue(this.dropDownFeedCategory.selectedIndex);

         MyFeedComponent.feedCategoryId = selectedValue.toString();
        console.log("feed category Id " + selectedValue);
        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
    }
    onopen(){

    }
    onclose(){

    }

    onNavBtnTap(){
        this.routerExtensions.backToPreviousPage();
    }   
    
    getDescription():any {
        this.oWebViewInterface.callJSFunction('getDescription',null,(para) => {
           // console.log( "webview hieght " +  this.webview.height);
            //alert(`${oSelectedLang}`);
            console.log("myDri --> " + para);
            return para;
        });
        
        /*this.oWebViewInterface.callJSFunction('documentHeight',null,(para) => {
            console.log( "body hieght " + para);
        });*/
    }
    insertDescription() {
        this.oWebViewInterface.callJSFunction('insertDescription',this.feedInfoDetail.Description);
    }

    getHeight(){
        //if(this.arrFeedFileList.length > 0){
        this.radListViewHeight = this.arrFeedFileList.length > 2 ? ((this.arrFeedFileList.length % 2) + (this.arrFeedFileList.length / 2)) * 150 : 150;
       // }else{
        //if(this.arrFeedFileList.length < 1){
        //    this.radListViewHeight = 0;
        //}
        console.log("list height -> " + this.radListViewHeight);
        return this.radListViewHeight;
    }
    onImageTap(feed:FeedInformation){
        alert("index " + feed.Feed_Id);
    }



    onImageRemoveTap(fileId){
        //var fileToRemove = this.feedInfoDetail.MC_Feed_Files.filter(file => file.File_Id == fileId);
        var fileToRemove = this.arrFeedFileList.filter(file => file.File_Id == fileId);
        console.log("file to remove " + JSON.stringify(fileToRemove));
        let i = this.arrFeedFileList.indexOf(fileToRemove[0]);
        console.log("index of file " + i);

        this.arrFeedFileList.splice(i,1);
        this.getHeight();
        //this.arrFeedFileList.notify;

    }

    listenWebViewEvents(){  
        // handles language selectionChange event.
        this.oWebViewInterface.on('webviewChanged', (height) => {

            /*console.log("webview change " + height);
            console.log("webview change " + height);
            var vc = this.webview.android.getLayoutParams();
            vc.width=vc.width;
            var reduceSize = vc.height - height;
            console.log("webview height " + vc.height + " - " + height + " = "+ reduceSize );
            var changeSize=vc.height - reduceSize;
            vc.height = height + 200;
            console.log("changes height " + vc.height +" - "+ reduceSize +" = "+ changeSize);
           
            
    
            this.webview.android.setLayoutParams(vc);*/

            var vc = this.webview.android.getLayoutParams();
            vc.height = android.view.ViewGroup.LayoutParams.WRAP_CONTENT;
            this.webview.android.setLayoutParams(vc);

            /*this.webview.android.setLayoutParams(
                new android.widget.AbsoluteLayout.LayoutParams
                    (android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                    android.view.ViewGroup.LayoutParams.WRAP_CONTENT),
                    0,0
                
                );
             */
                //this.webview.android.reload();

            //var params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.FILL_PARENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT); 
        
            //this.webview.android.setLayoutParams(params);
        });
    
        
    }

    onClickUploadImage(){
        let myFeedComponent:MyFeedComponent = this;
        let filePath:string = "";
        let context = imagepicker.create({
            mode: "multiple" // use "multiple" for multiple selection
        });
        context
        .authorize()
        .then(function() {
            return context.present();
        })
        .then((selection) => {
            myFeedComponent.arrFeedFileToUploadList = new ObservableArray<FeedFile>();
            selection.forEach(function(selected) {
                filePath = selected.fileUri;
                if(isIOS){
                    filePath = filePath.substring(7,filePath.length);
                }
                console.log("----------------");
                console.log("uri: " + filePath); 
                
                let feedFile: FeedFile = myFeedComponent.getMcFeedFile(filePath);
                myFeedComponent.arrFeedFileToUploadList.push(feedFile);
                //this.arrFeedFileList.push(feedFile);
            });
        }).then(()=>{
           
            console.log(" feed file size ---> " + this.arrFeedFileToUploadList.length);

            if(this.arrFeedFileToUploadList.length > 0){
                this.uploadMultipleFiles(this.arrFeedFileToUploadList.getItem(0).File_Path); 
            }
            //this.arrFeedFileList.push(feedFile);
        }).catch(function (e) {
            // process error
        }); 
    }

    uploadMultipleFiles(filePath:string){
        if(this.fileParentId == "" || this.fileParentId == "00000000-0000-0000-0000-000000000000"){
            this.fileParentId = this.commonService.NewGuid();
        }
        console.log("file parent id -> " + this.fileParentId);
        //var file = imageSource.fromFile(filePath);   
        let myDataService = this.dataService;
        let myFeedComponent:MyFeedComponent = this;
        if(!this.loader.show()){
            this.loader.show(this.options); // options is optional
        }
        let server_return:Return;
        var task = this.feedService.uploadFile(this.fileParentId,filePath);      
       

        task.on("progress", logEvent);
        task.on("error", logEvent);
        task.on("complete", logEvent);
        task.on("responded", uploadComplete);
             
        function logEvent(e) {
            try{
                console.log("event name " + e.eventName);
                if(e.eventName == "error"){
                    this.loader.hide();
                    alert("Can't connect to server!");
                    return;
                }
            }
            catch(e){
                alert("Error in uploading to server!")
            }
        }
       
        let position = this.feedFileUploaded;

        function uploadComplete(completeEvent) {
            //console.log("complete " + completeEvent.response.getBodyAsString());
            try{
                //var str = '{"result":[{"Parent_Id":"36e49234-39d4-4522-b15d-6d179453cb77","File_Id":"caa622f4-c9f8-4e6a-a82b-9dafa71e8832","Condominium_Id":"00000000-0000-0000-0000-000000000000","File_Name":"bg.jpg","File_Size":0,"File_Path":"8e3919ce-3bd8-4528-bd9a-4127aea09414/Temp_File/d8d0463c-f052-400d-bb02-325dd257940d.jpg","Archive":false,"Created_On":"0001-01-01T00:00:00","Last_Updated_On":"0001-01-01T00:00:00"}],"response":{"code":"200","message":"Save Successfully!","target":"Temp_File"}}';
                let res = JSON.parse(completeEvent.data)
                console.log("responded --> " + JSON.stringify(res));

                server_return = JSON.parse(completeEvent.data);
                if(server_return.response.code == "200"){
                   
                    let myFile:FeedFile = <FeedFile>server_return.result[0];
                    console.log("result --> " + JSON.stringify(myFile));
                    myFeedComponent.update_arrFeedFileToUploadList(myFile,position);
                }
            }catch(e){
                console.log("error ---> " + e);
            }
            //this.feedFileUploaded++;

            console.log(" ---- > " + myFeedComponent.feedFileUploaded + " - " + myFeedComponent.arrFeedFileToUploadList.length);
            if(myFeedComponent.feedFileUploaded == myFeedComponent.arrFeedFileToUploadList.length-1){
                myFeedComponent.loader.hide();
                console.log("finish upload  ---> ");
    
                //myFeedComponent.arrFeedFileList = myFeedComponent.arrFeedFileToUploadList;
                //myFeedComponent.arrFeedFileList.notify;

                myFeedComponent.refreshImage();
                
                console.log("arrFeedFileList size --> " + myFeedComponent.arrFeedFileList.length);
                myFeedComponent.arrFeedFileList.forEach(element => {
                    console.log("arrFeedFileList --- element " + JSON.stringify(element));
                });
            }else{
                myFeedComponent.feedFileUploaded++;
                myFeedComponent.uploadMultipleFiles(myFeedComponent.arrFeedFileToUploadList.getItem(myFeedComponent.feedFileUploaded).File_Path);
            }
        }   
    }


    update_arrFeedFileToUploadList(feedFile:FeedFile,position){
        console.log("result --> " + JSON.stringify(feedFile) + " - "+ position);
        //this.arrFeedFileToUploadList.setItem(position,feedFile); 
        this.arrFeedFileToUploadList.getItem(position).File_Id = feedFile.File_Id;
        this.arrFeedFileToUploadList.getItem(position).Parent_Id = feedFile.Parent_Id;
        console.log("--------------feedFileList"+ this.arrFeedFileToUploadList.length +" ==========> "+ JSON.stringify(this.arrFeedFileToUploadList.getItem(0)));
        
    }
    getMcFeedFile(path:string){ //Ghm
        try{
        console.log("feed file path -> " + path);

        let feed_files = new FeedFile();
        let file = fileSystem.File.fromPath(path);
        feed_files.File_Id = "00000000-0000-0000-0000-000000000000";
        feed_files.File_Name = file.name;
        feed_files.File_Type = file.extension;
        feed_files.File_Path = file.path;
        feed_files.Small_File_Path =  "file://" + file.path;
        feed_files.Parent_Id = this.fileParentId;

        console.log("feed_files -> " + JSON.stringify(feed_files));

        return feed_files;
        }catch(e){
            console.log("Exception --> " + e);
        }
    }

    refreshImage(){
        this.arrFeedFileToUploadList.forEach(element => {
            this.arrFeedFileList.push(element);
            this.arrFeedFileList.notify;
            this.getHeight();
        });
        
    }



    createFeedDialog(){
        dialogs.prompt({
            title: "Your title",
            message: "Your message",
            okButtonText: "Your button text",
            cancelButtonText: "Cancel text",
            neutralButtonText: "Neutral text",
            defaultText: "Default text",
            inputType: dialogs.inputType.password
        }).then(r => {
            console.log("Dialog result: " + r.result + ", text: " + r.text);
        });
    }
   
}









