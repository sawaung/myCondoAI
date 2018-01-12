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



@Component({
    moduleId: module.id,
    selector: 'app-myfeedsearch',
    templateUrl: 'myfeedsearch.html',
    //styleUrls: ['./myfeedsearch.css']
})

export class MyFeedSearchComponent implements OnInit {

    busy: Subscription;
    isLoading: Boolean = false;
    searchHistoryList:ObservableArray<string>;
    matchSearchKeyworkList:ObservableArray<string>;
    searchKeyword:string;
    newsFeedList: ObservableArray<FeedInformation>;
    feedFilterInfo: FeedFilter = new FeedFilter();
    showSearchSuggestion:boolean = false;
    showSearchResult:boolean = false;
    radListView:RadListView;
    static myFeedSearchComponent:MyFeedSearchComponent;

    //@ViewChild("page") pageRef: ElementRef;
    @ViewChild("radListView") radListViewRef: ElementRef;
    constructor(private router: Router,private route: ActivatedRoute,private routerExtensions: RouterExtensions,private feedService:MyFeedService, private globalStorageService:GlobalStorageService){ 
        this.newsFeedList = new  ObservableArray<FeedInformation>();
        MyFeedSearchComponent.myFeedSearchComponent = this;
    }

    ngOnInit(){
        this.searchHistoryList = new ObservableArray<string>();
        this.matchSearchKeyworkList= new ObservableArray<string>();
       
       // alert(localStorage.getItem('Another Plugin'));
       //alert(this.globalStorageService.getSaveKeyword('0'));
        let str = this.globalStorageService.getSaveKeyword('0');
        console.log("history --> " + str);
        if(str != null){
            str = str.substring(1,str.length-1);
            let myArray = str.split(",");
            this.searchHistoryList.push(myArray)
            /*console.log("searchKeywordLIst ==> " + JSON.stringify(myArray));
            console.log("length of list --> " + this.searchHistoryList.length);
            if(this.searchHistoryList.length > 0){
                for(var i = 0; i< this.searchHistoryList.length; i++){
                    console.log(this.searchHistoryList.getItem(i));
                  
                }
            }*/

            this.matchSearchKeyworkList = this.searchHistoryList;

        }

        //this.initialize();
        //this.loadFeedList();
        alert(this.isLoading);
    }


    ngAfterViewInit() {
        this.radListView = <RadListView>this.radListViewRef.nativeElement;
       
    }

    onNavBtnTap(){
        this.routerExtensions.backToPreviousPage();
    }
  
    onSaveSearchKeyword(){
        /*console.log("saving");
        //localStorage.setItem('Another Plugin', 'By Master Technology');
  
        this.searchKeywordList.push("a");
        this.searchKeywordList.push("b");
        this.searchKeywordList.push("c");
        this.searchKeywordList.push("d");

        this.globalStorageService.setSaveKeyword('0', JSON.stringify(this.searchKeywordList.toString()));
        //console.log("saved keyword " + JSON.stringify(stringify(this.searchKeywordList)));   */

        var arr = this.matchSearchKeyworkList.filter(str => str == this.searchKeyword);
        if(arr.length == 0){
            this.searchHistoryList.push(this.searchKeyword);
            //this.matchSearchKeyworkList.push(this.searchKeyword);
            this.globalStorageService.setSaveKeyword('0', JSON.stringify(this.searchHistoryList.toString()));

            this.isLoading = true;
            this.showSearchSuggestion = false;
            this.newsFeedList = new ObservableArray<FeedInformation>();
            alert(this.searchKeyword);
            this.initialize();
            this.loadFeedList();
        }
    }

    public onTextChange(args) {
        this.showSearchSuggestion = true;
        this.showSearchResult = false;
        let textField = <TextField>args.object;
        this.searchKeyword = textField.text.toLocaleLowerCase();
        this.searchInList();
    }

    searchInList(){
        if(this.searchHistoryList.length > 0){
            for(var i = 0; i< this.searchHistoryList.length; i++){
                console.log(this.searchHistoryList.getItem(i));
              
            }
        }
        this.matchSearchKeyworkList = this.searchHistoryList;
        var arrMatchList = this.matchSearchKeyworkList.filter(str => str.includes(this.searchKeyword));
        this.matchSearchKeyworkList = new ObservableArray<string>();
        this.matchSearchKeyworkList.push(arrMatchList);
    }
    /* 
      var color_1 = require("color");

        var page;
        function navigatingTo(args) {
            page = args.object;
            var color = new color_1.Color("#CECECE");
            var textField = page.getViewById("textfield");
            if (page.android) {
                textField.android.setHintTextColor(color.android);
            }
            else if(page.ios){
                var placeholder = textField.ios.valueForKey("placeholderLabel");
                placeholder.textColor = color.ios;
            }
        }
        exports.navigatingTo = navigatingTo;
     */

    initialize() {
        this.feedFilterInfo.Feed_Category_Id = null;
        this.feedFilterInfo.FeedType_Id = null;
        this.feedFilterInfo.Title = null;
        this.feedFilterInfo.SearchKeyword = this.searchKeyword;
        this.feedFilterInfo.Posted_Date_From = null;
        this.feedFilterInfo.Posted_Date_To = null;
        this.feedFilterInfo.Created_From = null;
        this.feedFilterInfo.Created_To = null;
        this.feedFilterInfo.Cursor_Index = null;
        this.feedFilterInfo.Get_Next = false;
        this.feedFilterInfo.Page_Size = 10;
        this.feedFilterInfo.Post_Status = true;
        this.feedFilterInfo.UnPost_Status = false;
        this.feedFilterInfo.isBlocked = false;
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
                if(this.newsFeedList.length > 0){
                    this.showSearchResult = true;
                }

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
                "CallerClass" : "MyFeedSearchComponent",
                "SelectedPosition" : selectedIndex,
            }
        };
        this.router.navigate(["/myfeed/"+ feed.Feed_Id+ "/view"],navigationExtras) //route to feed_detail(1)
        
        
    }
    onSearchHistoryItemTap(args) { 
        var selectedIndex = args.index;   
        var search_keyword = this.matchSearchKeyworkList.getItem(selectedIndex);
        this.searchKeyword = search_keyword

        this.isLoading = true;
        this.showSearchSuggestion = false;
        this.newsFeedList = new ObservableArray<FeedInformation>();
        this.initialize();
        this.loadFeedList();
        
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
        //alert("update my feedLIst");
        console.log("feed " + JSON.stringify(feed));
        console.log("update my feedList " + isFeedUpdateOrCreate + " position " + position);
        if(isFeedUpdateOrCreate == "new"){
            //alert("update my feedLIst");
            this.newsFeedList.unshift(feed);
            this.radListView.refresh();
            //alert("Feed successfully created!");
            //this.newsFeedList.notify;
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

        }else if(isFeedUpdateOrCreate == "UNPOST" || isFeedUpdateOrCreate == "ARCHIVE"){
            try{

                console.log("unpost myFeeds");
                /*let tempFeedList:ObservableArray<FeedInformation>  = new ObservableArray<FeedInformation>();
                for(var i = 0; i< this.newsFeedList.length; i++){
                    tempFeedList.setItem(i,this.newsFeedList.getItem(i));
                }
                //tempFeedList.splice(position,1);
                this.newsFeedList = new ObservableArray<FeedInformation>();
                this.newsFeedList = tempFeedList;
            
                /*this.newsFeedList.forEach(element => {
                    console.log(element.Title);
                });*/

                /*if(this.radListView != null){
                    console.log("listview refresh");
                    this.radListView.refresh();
                } else{
                    console.log("listview is null")
                }  */   

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

    static getMyFeedsSearchObject(){
        return MyFeedSearchComponent.myFeedSearchComponent;
    }
}


