import { Component, OnInit, ViewChild, ElementRef,AfterViewInit } from '@angular/core';
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
import { ObservableArray } from "tns-core-modules/data/observable-array";
import {RouterExtensions} from "nativescript-angular/router";
import { Router, ActivatedRoute,NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-choose-account',
  template: `
  <StackLayout #container>

  <Image id="logo" src="res://ic_logo" stretch="none" horizontalAlignment="center"></Image>

    <Label class="header Roboto-Regular" text="Choose An Account" class="m-l-10 m-b-10"></Label>

    <RadListView id = "radListView" [items]="userList"  (itemTap)="onItemTap($event)"  (itemSelected)="onItemSelected($event)">
        <ListViewLinearLayout tkListViewLayout scrollDirection="Vertical" itemInsertAnimation="Default" itemDeleteAnimation="Slide"></ListViewLinearLayout>      
        <ng-template tkListItemTemplate let-item="item" let-i="index" let-odd="odd">
                    <GridLayout class = "cardview m-x-10 m-y-5" rows="*" columns= "*,*">   
                        <StackLayout orientation="vertical" row="0" col="0" class = "m-t-5"  width="170">
                          <Label class="header Roboto-Regular" [text]="item.FullName" class = "m-l-5"></Label>
                          <Label class="header Roboto-Regular" [text]="item.UserId" class = "m-l-5"></Label>
                        </StackLayout>  
                        <StackLayout  horizontalAlignment="right" orientation="vertical" row="0" col="1" class = "m-t-5 m-l-10" width="40">
                          <Image src="res://ic_image_remove" width = "20" height = "20" horizontalAlignment="right" (tap) = "onRemoveAccount(item.UserId)"></Image>                                         
                      </StackLayout>  
                    </GridLayout>              
        </ng-template>
    </RadListView>

    <Button text="Add An Account" autocapitalizationType="none" (tap)="addAnAccount()" verticalAlignment="bottom"></Button>
  </StackLayout>
          
  `,
  styleUrls: ['login/login.component.css']
})

export class ChooseAccountComponent implements OnInit,AfterViewInit {
  userList:Users[];

  constructor(private router: Router,private route: ActivatedRoute,private routerExtensions: RouterExtensions,private globalStorageService:GlobalStorageService,private page: Page){ 

  }
  

  ngOnInit(){
    this.page.androidStatusBarBackground = new Color("#97519A");
    this.page.actionBarHidden = true;

    this.userList = [];

   this.userList = JSON.parse(this.globalStorageService.getUserDao('0'));

    if(this.userList.length > 0 ){
       this.userList.forEach(element => {
         console.log("FullName -> " + element.FullName);
       });

    }else{  
    this.routerExtensions.navigate(["/login"], {
      transition: {
          name: "fade"
      },
      clearHistory: true,
    
    });
    }
  }
  ngAfterViewInit(){

  }

  addAnAccount(){
    this.router.navigate(['/login']);
  }

  onItemTap(args) {
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
    }

    loader.show();

    let selectedIndex:number = <number>args.index;
    let user:Users = this.userList[selectedIndex];

    this.globalStorageService.setTokenKey(user.TokenKey);
    this.globalStorageService.setCondominiumId(user.Condominium_Id);
    this.globalStorageService.setCurrentUserId(user.UserId);
    this.globalStorageService.setBatchNumber(user.BatchNo);
    this.globalStorageService.setCurrentUserInfo(user);



    loader.hide();
    this.router.navigate(["/myfeed"]) //route to feed_detail(1)
    

    //this.updateMyFeedsUI(null,"UNPOST",selectedIndex);
  }

  onNavBtnTap(){
    this.routerExtensions.back();
  }

  onRemoveAccount(userId){
     //var fileToRemove = this.feedInfoDetail.MC_Feed_Files.filter(file => file.File_Id == fileId);
     var itemToRemove = this.userList.filter(user => user.UserId == userId);
     console.log("file to remove " + JSON.stringify(itemToRemove));
     let i = this.userList.indexOf(itemToRemove[0]);
     console.log("index of file " + i);

     this.userList.splice(i,1);
     this.globalStorageService.setUserDao('0', JSON.stringify(this.userList));
  }

}