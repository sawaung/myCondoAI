import { Component, ViewChild, OnInit,ElementRef } from '@angular/core';
import { Router, ActivatedRoute,NavigationExtras} from '@angular/router';
import {RouterExtensions} from "nativescript-angular/router";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { Subscription } from 'rxjs';

import { FeedInformation, FeedType, FeedCategory, FeedFilter, Role } from '../model/myfeed.model';
import { MyFeedService } from '../services/myfeed.service';
import { ConfigService } from '../../shared/utils/config.service';
import { CommonService } from '../../shared/utils/common.service';
import { GlobalStorageService } from '../../shared/store/globalstorage.service';
import * as dialogs from "ui/dialogs";
import {MyFeedsComponent} from "../../myFeed/components/myfeeds.component";
import {MyFeedSearchComponent} from "../../myFeed/components/myfeedsearch.component";
import {MyFeedFilterResultComponent} from "../../myFeed/components/myfeedfilterresult.component";
//import { DialogService } from '../../shared/utils/dialog.service';
import { LoadingIndicator } from "nativescript-loading-indicator";

var timer = require("timer");

@Component({
    moduleId: module.id,
    selector: 'app-myfeeddetail',
    templateUrl: 'myfeeddetail.html'
})

export class MyFeedDetailComponent implements OnInit {

    busy: Subscription;
    feedId: any;
    feedInfoDetail: FeedInformation;
    isLoading: Boolean = false;
    public description: string;
    radListViewHeight:number;
    static myFeedDetailComponent:MyFeedDetailComponent;
    isUpdateFeedDetail:Boolean = false;
    selectedPosition:number;
    role:Role[];
    confirmResult: boolean;
    callerClass:string;

    EDIT_FEED:Boolean;

    @ViewChild("container") container: ElementRef;
    constructor(private router: Router,private route: ActivatedRoute,private routerExtensions: RouterExtensions,private feedService:MyFeedService,
    private commonService:CommonService,private globalStorageService:GlobalStorageService){ 
       
        this.route.queryParams.subscribe(params => {
            this.selectedPosition = params['SelectedPosition'];
            this.callerClass = params['CallerClass'];
            //alert("selected index " + this.selectedPosition)
            //var myFeed : Feed = JSON.parse(params["Feed"]);
           // console.log("Feed_Id " + params['id'] );
            //this.getFeedDetail(myFeed.Feed_Id);
        });  
        MyFeedDetailComponent.myFeedDetailComponent = this;
    }

    ngOnInit(){
        this.role = JSON.parse(this.globalStorageService.getPermission('1'));
        this.checkPermission();
        this.loadFeedInfo();
        //this.getHeight();
    }

    checkPermission(){
        this.EDIT_FEED = this.IsAccess('EDIT_FEED');
    }

    IsAccess(role: string) {
        // alert(this.commonService.IsAccess(this.role,role));
        let _return = this.commonService.IsAccess(this.role, role);
        return _return;
     }

    loadFeedInfo() {
        this.isLoading = true;
        this.feedId = this.route.snapshot.params['id'];
        console.log("Feed_Id --> " + this.feedId );
        this.busy = this.feedService.getfeedDetail(this.feedId)
            .subscribe(res => {
                console.log("getFeedDetail --> " + JSON.stringify(res));
                this.isLoading = false;
                this.feedInfoDetail = res.result[0];
                this.getHeight();
                this.description = "<style>body {background-color: #ffffff;font-size:14px; color:#000000;font-family: 'Roboto';} img{display: inline;height: auto;max-width: 100%;}</style>" + this.feedInfoDetail.Description;
            
                if(this.isUpdateFeedDetail == true){
                    if(this.callerClass == "MyFeedsComponent"){
                        MyFeedsComponent.getMyFeedsObject().updateMyFeedsUI(this.feedInfoDetail,"update",this.selectedPosition);
                    }else if(this.callerClass == "MyFeedSearchComponent"){
                        MyFeedSearchComponent.getMyFeedsSearchObject().updateMyFeedsUI(this.feedInfoDetail,"update",this.selectedPosition);
                    }else if(this.callerClass == "MyFeedFilterResultComponent"){
                        MyFeedFilterResultComponent.getMyFeedsFilterResultObject().updateMyFeedsUI(this.feedInfoDetail,"update",this.selectedPosition);
                    }
                }
            },error => {alert("Can't connect to server!")}); 
            
    }

    getHeight(){
        console.log("size of list ===> " + this.feedInfoDetail.MC_Feed_Files.length);
        this.radListViewHeight = this.feedInfoDetail.MC_Feed_Files.length > 2 ? ((this.feedInfoDetail.MC_Feed_Files.length % 2) + (this.feedInfoDetail.MC_Feed_Files.length / 2)) * 150 : 150;
        console.log("list height -> " + this.radListViewHeight);
        return this.radListViewHeight;
    }

    onNavBtnTap(){
        this.routerExtensions.backToPreviousPage();
    }

    onEditFeed(){   
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "Feed" : JSON.stringify(this.feedInfoDetail)
            }
        };

        this.router.navigate(["/myfeed/edit"],navigationExtras);
    }

    changeFeedStatus(feedId: any, status: string) {
        console.log("feedId - " + feedId + " / status " + status);

        dialogs.confirm('Are you sure you want to ' + status + '?')
            .then(res => {
                console.log("return status " + res);
                this.confirmResult = res;
                if (this.confirmResult !== undefined && this.confirmResult == true) {
                    var loader = new LoadingIndicator();
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
                        }
                    }
                    
                    loader.show(options);
                            
                    this.feedService.changeFeedStatus(feedId, status)
                        .subscribe(res1 => {
                            loader.hide();
                            console.log("changeFeedStatus --> " + JSON.stringify(res1));
                            this.onNavBtnTap();
                            if(res1.response.code == "200"){
                                setTimeout(() => {
                                    if(this.callerClass == "MyFeedsComponent"){
                                        MyFeedsComponent.getMyFeedsObject().updateMyFeedsUI(null,status,this.selectedPosition);
                                    }else if(this.callerClass == "MyFeedSearchComponent"){
                                        MyFeedSearchComponent.getMyFeedsSearchObject().updateMyFeedsUI(null,status,this.selectedPosition);
                                    }else if(this.callerClass == "MyFeedFilterResultComponent"){
                                        MyFeedFilterResultComponent.getMyFeedsFilterResultObject().updateMyFeedsUI(null,status,this.selectedPosition);
                                    }
                                },500);
                                //alert('Feed Information has been' + ' ' + status + ' ' + 'successfully.');
                               
                                //event raise
                                //this.router.navigate(['/myfeed']);
                            }else{
                                alert(res1.response.message);
                            }
                            //this.router.navigate(['/myfeed'])                           
                          
                        },
                        error => {
                            //loader.hide();
                            alert('Feed Information' + ' has not been ' + status + ' ' + 'successfully. Please try again.');
                        });
                }

            });
    }


    updateFeedDetailUI(feed: FeedInformation){
       // alert("update my feedLIst");
       // console.log("feed " + JSON.stringify(feed));
        
        if(feed != null){
            this.isUpdateFeedDetail = true;
            this.ngOnInit();

        }
        //this.feedInfoDetail = new FeedInformation();
        //this.feedInfoDetail = feed;
        //this.ngOnInit();
       
    }

    static getMyFeedDetailObject(){
        return MyFeedDetailComponent.myFeedDetailComponent;
    }
}
