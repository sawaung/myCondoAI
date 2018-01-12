import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { RouterExtensions } from "nativescript-angular/router";
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
import { CheckBox } from 'nativescript-checkbox';

//import { DialogService } from '../../shared/utils/dialog.service';

@Component({
    moduleId: module.id,
    selector: 'app-myfeedfilter',
    templateUrl: 'myfeedfilter.html',
    styleUrls: ['./myfeedfilter.component.css']
})

export class MyFeedFilterComponent implements OnInit {

    feedType: Array<FeedType>;
    feedCategory: Array<FeedCategory>;
    page: Page;

    dropDownFeedType: DropDown;
    dropDownFeedCategory: DropDown;
    dataSourceFeedType = new ValueList<DropDownValuePair>();
    dataSourceFeedCategory = new ValueList<DropDownValuePair>();
    feedFilterInfo: FeedFilter = new FeedFilter();

    isLoading: Boolean = false;

    searchKeyword:string;
    static feedCategoryId:string = "";
    static feedTypeId:string = "";
    postedDateFrom:string;postedDateTo:string;
    postStatus:string; unpostStatus:string; block:string;
    createdDateFrom:string;createdDateTo:string;
    chkPost:CheckBox;chkUnpost:CheckBox;chkArchive:CheckBox;


    @ViewChild("page") pageRef: ElementRef;
    constructor(private router: Router, private route: ActivatedRoute, private routerExtensions: RouterExtensions, private feedService: MyFeedService) {

    }

    ngOnInit() {
        this.searchKeyword = "";
        this.initialize();
        this.init();
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
        this.feedFilterInfo.Page_Size = 10;
        this.feedFilterInfo.Post_Status = true;
        this.feedFilterInfo.UnPost_Status = false;
        this.feedFilterInfo.isBlocked = false;
    }

    init() {
        //this.feedInfoDetail = new FeedInformation();
        //this.feedInfoDetail.Feed_Group = 1;
        //this.feedInfoDetail.Feed_Id = this.feedId;
        //this.feedInfoDetail = this.route.snapshot.params['id'];


        this.isLoading = true;


        this.feedService.getfeedType()
            .subscribe(res => {
                console.log("getFeedType -> " + JSON.stringify(res));

                this.feedType = res.result;
                try {
                    var dropDownValuePair;
                    dropDownValuePair = new DropDownValuePair();
                    dropDownValuePair.value = "0";
                    dropDownValuePair.display = "ALL";
                    this.dataSourceFeedType.push(dropDownValuePair);
                    this.feedType.map((v) => {
                        dropDownValuePair = new DropDownValuePair();
                        dropDownValuePair.value = v.FeedType_Id;
                        dropDownValuePair.display = v.FeedType_Name;
                        this.dataSourceFeedType.push(dropDownValuePair);
                        //this.arrFeedType.push(v.FeedType_Name)
                    }
                    );

                    this.dropDownFeedType.items = this.dataSourceFeedType;
                    this.dropDownFeedType.selectedIndex = 0;
                } catch (e) {
                    console.log(e);
                }
            });

        this.feedService.getfeedCategory()
            .subscribe(res => {
                this.isLoading = false;
                this.feedCategory = res.result;
                try {
                    var dropDownValuePair;
                    dropDownValuePair = new DropDownValuePair();
                    dropDownValuePair.value = "0";
                    dropDownValuePair.display = "ALL";
                    this.dataSourceFeedCategory.push(dropDownValuePair);
                    this.feedCategory.map((v) => {
                        dropDownValuePair = new DropDownValuePair();
                        dropDownValuePair.value = v.Feed_Category_Id;
                        dropDownValuePair.display = v.Feed_Category_Name;
                        this.dataSourceFeedCategory.push(dropDownValuePair);

                    }
                    );

                    this.dropDownFeedCategory.items = this.dataSourceFeedCategory;
                    this.dropDownFeedCategory.selectedIndex = 0;
                } catch (e) {
                    console.log(e);
                }
            });
    }
    ngAfterViewInit() {
        this.page = this.pageRef.nativeElement;
        this.dropDownFeedType = this.page.getViewById<DropDown>("dropDownFeedType");
        this.dropDownFeedCategory = this.page.getViewById<DropDown>("dropDownFeedCategory");

        this.chkPost = this.page.getViewById<CheckBox>("chkPost");
        this.chkUnpost = this.page.getViewById<CheckBox>("chkUnpost");
        this.chkArchive = this.page.getViewById<CheckBox>("chkArchive");

    }

    onNavBtnTap() {
        this.routerExtensions.backToPreviousPage();
    }

    onchangeFeedType(args: SelectedIndexChangedEventData) {
        let selectedValue = this.dataSourceFeedType.getValue(this.dropDownFeedType.selectedIndex);
        if(selectedValue.toString() != "0"){
            MyFeedFilterComponent.feedTypeId = selectedValue.toString();
        }
       
        console.log("selectedValue " + selectedValue);
        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
    }
    onchangeFeedCategory(args: SelectedIndexChangedEventData) {
        let selectedValue = this.dataSourceFeedCategory.getValue(this.dropDownFeedCategory.selectedIndex);
        MyFeedFilterComponent.feedCategoryId = selectedValue.toString();
        console.log("selectedValue " + selectedValue);
        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
    }
    onopen() {

    }
    onclose() {

    }

    onSearch(){
        this.feedFilterInfo.Feed_Category_Id = MyFeedFilterComponent.feedCategoryId;
        this.feedFilterInfo.FeedType_Id = MyFeedFilterComponent.feedTypeId;

        this.feedFilterInfo.UnPost_Status = this.chkUnpost.checked;
        this.feedFilterInfo.Post_Status = this.chkPost.checked;
        this.feedFilterInfo.isBlocked = this.chkArchive.checked;
        console.log("feedDetail --> " + JSON.stringify(this.feedFilterInfo));

        let navigationExtras: NavigationExtras = {
            queryParams: {
                "FeedFilterInfo" : JSON.stringify(this.feedFilterInfo),
            }
        };


        this.router.navigate(["/myfeed/fiterresult"],navigationExtras);
    }

    callDatePicker(para) {

        const ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
        const picker = new ModalPicker();
        picker.pickDate({
            title: "Select Your Birthday",
            theme: "light",
            maxDate: new Date(new Date().getFullYear(), 11, 31)
        }).then((result) => {
            console.log("Date is: " + result.day + "-" + result.month + "-" + result.year);
            var _day: string = result.day;
            if (_day.toString().length < 2) { _day = "0" + _day; }
            var strDate = new Date(result.year + "-" + result.month + "-" + _day + "T00:00:00");
            var datePipe = new DatePipe("en-US");
            let _date: any = datePipe.transform(strDate, 'dd MMM yyyy');;
            if (para == "postedFrom") {
                this.feedFilterInfo.Posted_Date_From = strDate;
                this.postedDateFrom = _date;
            } else if (para == "postedTo") {
                this.feedFilterInfo.Posted_Date_To = strDate;
                this.postedDateTo = _date;
            } else if (para == "createdFrom") {
                this.feedFilterInfo.Created_From = strDate;
                this.createdDateFrom = _date;
            } else if (para == "createdTo") {
                this.feedFilterInfo.Created_To = strDate;
                this.createdDateTo = _date;
            }
        }).catch((error) => {
            console.log("Error: " + error);
        });
    }
}
