import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { isIOS } from "platform";
import * as app from "application";
import { GlobalStorageService } from '../../../shared/store/globalstorage.service';
import { CommonService } from '../../../shared/utils/common.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { RouterExtensions } from "nativescript-angular/router";
import { DataService } from '../../../shared/services/data.service';
import { MyFacilityService } from '../../services/myfacility.service';
import { Role, Users } from '../../../shared/interfaces';
import { Subscription } from 'rxjs';
import { FacilityList, FacilityGroup, Fee, FacilityGroupFile, BookingCalendar, TotalTimeSlot, Booking, BookingDetail, CancelBookingConfirm, BookingMaps, BookingCancellationObject, ChequeBalanceInfo, Facility } from '../../model/myfacility.model';


@Component({
  moduleId: module.id,
  selector: 'app-myfacility',
  templateUrl: './myfacility.html'
})


export class MyFacilityComponent implements OnInit {

  role: Role[];
  currentuserInfo: Users;
  userList: Users[];
  selectedUserId = '';
  selecteduserInfo: Users;
  busy: Subscription;

  collFacilityGroup: FacilityGroup[];
  selectedFacilityGroup: FacilityGroup;

  selectedFacilityId: any;

  private _sideDrawerTransition: DrawerTransitionBase;

  @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
  constructor(private route: ActivatedRoute,
    private router: Router, private dataService: DataService,
    public facilityService: MyFacilityService,
    private commonService: CommonService,
    private globalStorageService: GlobalStorageService,
  ) { }



  ngOnInit(): void {
    this._sideDrawerTransition = new SlideInOnTopTransition();
    this.dataService.getUserRole('myfacility')
      .subscribe(res1 => {
        this.role = res1.result;
        this.globalStorageService.setPermission('myFacility', JSON.stringify(res1.result));
        console.log("role permission --> " + this.globalStorageService.getPermission('myFacility'));
      });

      this.currentuserInfo = this.globalStorageService.getCurrentUserInfo();

    this.facilityService.getUserBookingList()
      .subscribe(res2 => {
        console.log("userList --> " + JSON.stringify(res2.result));
        this.userList = res2.result;
    
        if (this.userList.filter((item) => (item.UserId === this.currentuserInfo.UserId)).length > 0) {
          this.selectedUserId = this.currentuserInfo.UserId;
        } else { }
        this.setSelectedUserInfo(this.selectedUserId);
        this.loadFacilityGroup(this.getSelectedUserId());
      });


  }

  setSelectedUserInfo(uid: string) {
    this.globalStorageService.setBookedUserId('');
    this.selecteduserInfo = null;
    for (const u of this.userList) {
      if (u.UserId === uid) {
        this.selecteduserInfo = new Users();
        this.selecteduserInfo.UserId = u.UserId;
        this.selecteduserInfo.FullName = u.FullName;
        this.globalStorageService.setBookedUserId(this.selecteduserInfo.UserId);//save selected userInfo
      }
    }
  }

  loadFacilityGroup(userId: string) {
    this.busy = this.facilityService.getFacilityGroups(this.globalStorageService.getCondominiumId(), true)
      .subscribe(res => {
        console.log("facilityList --> " + JSON.stringify(res.result));
        this.collFacilityGroup = res.result;
        if (this.collFacilityGroup) {
          this.selectedFacilityId = this.collFacilityGroup[0].Facility_Group_Id;
        }
        if (this.globalStorageService.getFacilityGroupId()) {
          this.selectedFacilityId = this.globalStorageService.getFacilityGroupId();
        }
        // this.globalStorageService.setBookedFacilityId(this.selectedfacilityInfo.Facility_Id);
        this.bindSelectedFacility();
        //this.bindSelectedCalendar(userId);
      });
      console.log("loadfacilityGroup finish");
  }

  getSelectedUserId(): string {
    if (this.selecteduserInfo) {
      console.log("selectedUserInfo " + this.selecteduserInfo.UserId);
      return this.selecteduserInfo.UserId;
    }
    return '';
  }

  /* Facility dropdown index changed */
  bindSelectedFacility() {
    for (let fg of this.collFacilityGroup) {
      if (fg.Facility_Group_Id == this.selectedFacilityId) {
        this.selectedFacilityGroup = fg;
      }
    }
    //this.bindSelectedCalendar(this.getSelectedUserId());
  }
  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }


  onDrawerButtonTap(): void {
    this.drawerComponent.sideDrawer.showDrawer();
  }
}

