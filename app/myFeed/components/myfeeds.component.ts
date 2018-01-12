import { Component, ViewChild, OnInit, OnDestroy, ElementRef,Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute,NavigationExtras} from '@angular/router';

import { Subscription } from 'rxjs';
//import * as moment from 'moment';

import { FeedInformation, FeedType, FeedCategory, FeedFilter, Role } from '../model/myfeed.model';
import { MyFeedService } from '../services/myfeed.service';
import { CommonService } from '../../shared/utils/common.service';
import { GlobalStorageService } from '../../shared/store/globalstorage.service';

//import { DialogService } from '../../shared/utils/dialog.service';
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { constant } from "../../shared/utils/constant";
import {RouterExtensions} from "nativescript-angular/router";
import { isIOS} from "platform";
import * as app from "application";
import {RadListView,ListViewLinearLayout, ListViewEventData, ListViewLoadOnDemandMode} from "nativescript-pro-ui/listview";
import * as Timer from "tns-core-modules/timer";
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
import * as htmlViewModule from "tns-core-modules/ui/html-view";
import { ObservableArray } from "tns-core-modules/data/observable-array";



@Component({
    moduleId: module.id,
    selector: 'app-myfeeds',
    templateUrl: './myfeeds.html',
    styleUrls: ['./myfeeds.component.css']
})

export class MyFeedsComponent implements OnInit, OnDestroy {
    busy: Subscription;
    role:Role[];
    static myFeedsComponent:MyFeedsComponent;
    newsFeedList:ObservableArray<FeedInformation>;
    feedFilterInfo: FeedFilter = new FeedFilter();
    isLoading: Boolean = false;
    isCreateAccess:Boolean = false;
    radListView:RadListView;
    initUI:boolean= true;
    updateUI:boolean = false;
    selectedIndex:number = -1;
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    //@ViewChild("page") container: ElementRef;
    
        private _sideDrawerTransition: DrawerTransitionBase;
      

        constructor(public route: ActivatedRoute,
            public router: Router, 
            public feedService: MyFeedService,
            private routerExtensions: RouterExtensions,
            private globalStorageService: GlobalStorageService,
            public commonService: CommonService) {
                this.newsFeedList = new ObservableArray<FeedInformation>();
                /*this.myItems = [];
                this.counter = 0;
                for (var i = 0; i < 50; i++) {
                    this.myItems.push(new DataItem(i, "data item " + i));
                    this.counter = i;
                }*/

                MyFeedsComponent.myFeedsComponent = this;
             }


        /* ***********************************************************
        * Use the sideDrawerTransition property to change the open/close animation of the drawer.
        *************************************************************/
        ngOnInit(){
            //if(this.initUI == true){
                this._sideDrawerTransition = new SlideInOnTopTransition();
                this.role = JSON.parse(this.globalStorageService.getPermission('1'));
                this.isCreateAccess = this.IsAccess('ADD_FEED');
                this.initialize();
                this.loadFeedList();
            //    console.log('on init 1');
           // }else{
            //    this.newsFeedList = this.newsFeedList;
            //    console.log('on init 2');
            //}
            //console.log('on init');
            //constant.setPreviousObject(<Object>this.myfeeds);
        }
        ngAfterViewInit() {
           var drawer = this.drawerComponent.nativeElement;
            this.radListView = drawer.getViewById("radListView");
        }
        
        ngOnDestroy(){
            console.log('on destroy');
        }
        get sideDrawerTransition(): DrawerTransitionBase {
            return this._sideDrawerTransition;
        }
    
        /* ***********************************************************
        * According to guidelines, if you have a drawer on your page, you should always
        * have a button that opens it. Use the showDrawer() function to open the app drawer section.
        *************************************************************/
        onDrawerButtonTap(): void {
            this.drawerComponent.sideDrawer.showDrawer();
        }

        initialize() {
            this.feedFilterInfo.Feed_Category_Id = null;
            this.feedFilterInfo.FeedType_Id = null;
            this.feedFilterInfo.Title = null;
            this.feedFilterInfo.SearchKeyword = null;
            this.feedFilterInfo.Posted_Date_From = null;
            this.feedFilterInfo.Posted_Date_To = null;
            this.feedFilterInfo.Created_From = null;
            this.feedFilterInfo.Created_To = null;
            this.feedFilterInfo.Cursor_Index = null;
            this.feedFilterInfo.Get_Next = false;
            this.feedFilterInfo.Page_Size = 9;
            this.feedFilterInfo.Post_Status = true;
            this.feedFilterInfo.UnPost_Status = false;
            this.feedFilterInfo.isBlocked = false;
        }

        loadFeedList() {
            if(this.newsFeedList.length < 1){
                this.isLoading = true;
            }
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
                    if(this.newsFeedList.length < 1){ this.isLoading = false; }
                    /*
                   
                    if (this.feedFilterInfo.Cursor_Index === null) {
                        this.newsFeedList.push(res.result);
                    } else {
                        this.newsFeedList = this.newsFeedList.concat(res.result);
                    }*/
                    
                    console.log("loadFeedList --> " + JSON.stringify(res));

                    var feedList = Array<FeedInformation>();                 
                    res.result.forEach(feed => {
                       feedList.push(<FeedInformation>feed);
                    })
                    this.newsFeedList.push(feedList);
                });
        }

        IsAccess(role: string) {
           // alert(this.commonService.IsAccess(this.role,role));
           let _return = this.commonService.IsAccess(this.role, role);
           //alert(_return);
            return _return;
        }

        
        public onLoadMoreItemsRequested(args: ListViewEventData) {
            var that = new WeakRef(this);
            var listView: RadListView = args.object;
            let arrLength = that.get().newsFeedList.length;
            //var sPosition = parseInt(listView.scrollPosition);
            //alert("pos " + sPosition);
            //if(sPosition == arrLength - 2){
            Timer.setTimeout(function () {
                //let feed:Feed = that.get().arrFeedList.getItem(arrLength-1);
                //that.get().getFeedList(feed.Feed_Id);
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
                    //"Feed" : JSON.stringify(feed),
                    "CallerClass" : "MyFeedsComponent",
                    "SelectedPosition" : selectedIndex,
                    //"Condominium_Id": feed.Condominium_Id
                }
            };
            this.router.navigate(["/myfeed/"+ feed.Feed_Id+ "/view"],navigationExtras) //route to feed_detail(1)
            

            //this.updateMyFeedsUI(null,"UNPOST",selectedIndex);
        }

        onItemSelected(args){
            var selectedIndex = args.index;
            //alert("selected index " + selectedIndex);
        }

        loadMoreFeeds() {
            if (this.newsFeedList.length > 0) {
                this.feedFilterInfo.Cursor_Index = this.newsFeedList.getItem(this.newsFeedList.length - 1).Feed_Id;       
                this.feedFilterInfo.Get_Next = false;
            }
            this.loadFeedList();
        }
       
        fabTap(){   
            this.router.navigate(["/myfeed/new"]);
        }

        getInnerHtml(desc: string) {

            /*const tmp = document.createElement('DIV');
            tmp.innerHTML = desc;
            let rtn = tmp.textContent || tmp.innerText || '';*/
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

        onSearchFeed(){
            this.router.navigate(["/myfeed/search"]);
        }
        onFilterFeed(){
          this.router.navigate(["/myfeed/filter"]);
          //this.refreshUI();
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
                    this.selectedIndex = position;
                    
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

        static getMyFeedsObject(){
            return MyFeedsComponent.myFeedsComponent;
        }

        //event listen
}

class DataItem {
    constructor(public id: number, public name: string) { }
}
