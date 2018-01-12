import { Component, ViewChild, OnInit,ElementRef } from '@angular/core';
import { Router, ActivatedRoute,NavigationExtras} from '@angular/router';
import {RouterExtensions} from "nativescript-angular/router";
import { Subscription } from 'rxjs';
import { FeedInformation, FeedType, FeedCategory, FeedFilter, Role } from '../model/myfeed.model';
import { MyFeedService } from '../services/myfeed.service';
import { CommonService } from '../../shared/utils/common.service';
import { ConfigService } from '../../shared/utils/config.service';

import { ValueList } from "nativescript-drop-down";
import { DropDown } from "nativescript-drop-down/drop-down";
import { Page } from "ui/page";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { DropDownValuePair } from '../../shared/interfaces';
import { DatePipe } from '@angular/common';
require( "nativescript-localstorage" );
import { GlobalStorageService} from '../../shared/store/globalstorage.service';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { TextField } from "ui/text-field";
import { isIOS} from "platform";
import * as app from "application";
import {RadListView,ListViewLinearLayout, ListViewEventData, ListViewLoadOnDemandMode} from "nativescript-pro-ui/listview";
import * as Timer from "tns-core-modules/timer";
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
import { DataService } from '../../shared/services/data.service';



@Component({
    moduleId: module.id,
    selector: 'app-myfeedfilterresult',
    templateUrl: 'myfeedfilterresult.html',
    //styleUrls: ['./myfeedsearch.component.css']
})


export class MyFeedFilterResultComponent implements OnInit {

    busy: Subscription;
    isLoading: Boolean = false;

    searchKeyword:string;
    newsFeedList: ObservableArray<FeedInformation>;
    feedFilterInfo: FeedFilter = new FeedFilter();
    para:FeedFilter = new FeedFilter();

    radListView:RadListView;
    static myFeedFilterResultComponent:MyFeedFilterResultComponent;
    

    //@ViewChild("page") pageRef: ElementRef;
    @ViewChild("radListView") radListViewRef: ElementRef;
    constructor(private router: Router,private route: ActivatedRoute,private dataService:DataService,private routerExtensions: RouterExtensions,private feedService:MyFeedService, private globalStorageService:GlobalStorageService){ 
        this.newsFeedList = new  ObservableArray<FeedInformation>();
        MyFeedFilterResultComponent.myFeedFilterResultComponent = this;

        this.route.queryParams.subscribe(params => {
        
            this.para = JSON.parse(params["FeedFilterInfo"]);
            console.log("Feed_Id " + this.para.SearchKeyword);
           
        });  
 
    }

    ngOnInit(){
        this.initialize();
        this.loadFeedList();
    }


    ngAfterViewInit() {
        this.radListView = <RadListView>this.radListViewRef.nativeElement;
       
    }

    onNavBtnTap(){
        this.routerExtensions.backToPreviousPage();
    }
  

    initialize() {
        if(this.para.Feed_Category_Id == ""){
            this.feedFilterInfo.Feed_Category_Id = null ;
        }else{
            this.feedFilterInfo.Feed_Category_Id = this.para.Feed_Category_Id ;
        }
        if(this.para.FeedType_Id == ""){
            this.feedFilterInfo.FeedType_Id = null ;
        }else{
            this.feedFilterInfo.FeedType_Id = this.para.FeedType_Id ;
        }
       
        this.feedFilterInfo.Title = null;
        this.feedFilterInfo.SearchKeyword = this.para.SearchKeyword;
        this.feedFilterInfo.Posted_Date_From = this.para.Posted_Date_From;
        this.feedFilterInfo.Posted_Date_To =this.para.Posted_Date_To;
        this.feedFilterInfo.Created_From = this.para.Created_From;
        this.feedFilterInfo.Created_To = this.para.Created_To;
        this.feedFilterInfo.Cursor_Index = null;
        this.feedFilterInfo.Get_Next = false;
        this.feedFilterInfo.Page_Size = 10;
        this.feedFilterInfo.Post_Status = this.para.Post_Status;
        this.feedFilterInfo.UnPost_Status = this.para.UnPost_Status;
        this.feedFilterInfo.isBlocked = this.para.isBlocked;
    }

    loadFeedList() {
        this.busy = this.feedService.getNewsfeedlist(this.feedFilterInfo.Feed_Category_Id, 
            this.feedFilterInfo.FeedType_Id,
            this.feedFilterInfo.Title, 
            this.feedFilterInfo.SearchKeyword, 
            this.feedFilterInfo.Posted_Date_From, 
            this.feedFilterInfo.Posted_Date_To, 
            this.feedFilterInfo.Created_From, 
            this.feedFilterInfo.Created_To, 
            this.feedFilterInfo.Cursor_Index, 
            this.feedFilterInfo.Get_Next, 
            this.feedFilterInfo.Page_Size, 
            this.feedFilterInfo.Post_Status, 
            this.feedFilterInfo.UnPost_Status, 
            this.feedFilterInfo.isBlocked)

           
            .subscribe(res => {
                this.isLoading = false; 
                
                var feedList = Array<FeedInformation>();                 
                res.result.forEach(feed => {
                   feedList.push(<FeedInformation>feed);
                })
                this.newsFeedList.push(feedList);
                console.log("loadFeedList --> " + JSON.stringify(res));
            });
    }

    public onLoadMoreItemsRequested(args: ListViewEventData) {
        var that = new WeakRef(this);
        var listView: RadListView = args.object;
        let arrLength = that.get().newsFeedList.length;

        Timer.setTimeout(function () {
            that.get().loadMoreFeeds();
            listView.notifyLoadOnDemandFinished();
           
        }, 1000);
        //}
        args.returnValue = true;
    }


    onItemTap(args) {
        let selectedIndex:number = <number>args.index;
        var feed = this.newsFeedList.getItem(selectedIndex);
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "CallerClass" : "MyFeedFilterResultComponent",
                "SelectedPosition" : selectedIndex,
            }
        };
        this.router.navigate(["/myfeed/"+ feed.Feed_Id+ "/view"],navigationExtras) //route to feed_detail(1)
        
        
    }

    loadMoreFeeds() {
        if (this.newsFeedList.length > 0) {
            this.feedFilterInfo.Cursor_Index = this.newsFeedList.getItem(this.newsFeedList.length - 1).Feed_Id;
            this.feedFilterInfo.Get_Next = false;
        }
        this.loadFeedList();
    }

    getInnerHtml(desc: string) {
        let dot = '';        
        var rtn = desc.replace(/<\/?[^>]+>/ig, " ");
        rtn = rtn.replace("\n","");
        rtn = rtn.replace("&nbsp;","");
        
        if (rtn.length > 100) { dot = '.....'; }
            
        rtn = rtn.substring(0, 100);
        if (rtn.length >0) { return rtn + dot; } else {
            return '';
        }
    }

    updateMyFeedsUI(feed: FeedInformation,isFeedUpdateOrCreate:string,position:number){
        console.log("feed " + JSON.stringify(feed));
        console.log("update my feedList " + isFeedUpdateOrCreate + " position " + position);
        if(isFeedUpdateOrCreate == "new"){
            this.newsFeedList.unshift(feed);
            this.radListView.refresh();
            //alert("Feed successfully created!");
        }else if(isFeedUpdateOrCreate == "update"){
            //this.newsFeedList.splice(position, 1);// 1, 1
            //this.newsFeedList.splice(position,0,feed);//1,feed
            //this.newsFeedList.notify;

            this.newsFeedList.getItem(position).Feed_Category_Id = feed.Feed_Category_Id;
            this.newsFeedList.getItem(position).Feed_Category_Name = feed.Feed_Category_Name;
            this.newsFeedList.getItem(position).FeedType_Id = feed.FeedType_Id;
            this.newsFeedList.getItem(position).Feed_Type_Name = feed.Feed_Type_Name;
            this.newsFeedList.getItem(position).Title = feed.Title;
            this.newsFeedList.getItem(position).Description = feed.Description;
            this.newsFeedList.getItem(position).Posted_Date = feed.Posted_Date;
            this.newsFeedList.getItem(position).Post_Status = feed.Post_Status;
            this.newsFeedList.getItem(position).Last_Updated_By = feed.Last_Updated_By;
            this.newsFeedList.getItem(position).Last_Updated_On = feed.Last_Updated_On;
            this.newsFeedList.getItem(position).status = feed.status;
            this.newsFeedList.getItem(position).MC_Feed_Files = feed.MC_Feed_Files;

            //alert("Feed successfully updated!");

        }else if( isFeedUpdateOrCreate == "ARCHIVE"){
            try{
                console.log("unpost myFeeds"); 
                setTimeout(() => {
                    let i = this.newsFeedList.indexOf(this.newsFeedList.getItem(position))
                    this.newsFeedList.splice(i,1);
                    //alert("Feed successfully unposted!");                     
                    console.log("remove " + position);
                }, 2000);

            }catch(e){
                console.log(e);
            }
  
        }

        else if(isFeedUpdateOrCreate == "NOTIFY"){
            alert("Feeds successfully notified!");
        }
    }

    static getMyFeedsFilterResultObject(){
        return MyFeedFilterResultComponent.myFeedFilterResultComponent;
    }
}


