"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var myfeed_model_1 = require("../model/myfeed.model");
var myfeed_service_1 = require("../services/myfeed.service");
var common_service_1 = require("../../shared/utils/common.service");
var interfaces_1 = require("../../shared/interfaces");
var nativescript_webview_interface_1 = require("nativescript-webview-interface");
var platform_1 = require("platform");
var app = require("application");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var imagepicker = require("nativescript-imagepicker");
var fileSystem = require("file-system");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var data_service_1 = require("../../shared/services/data.service");
var dialogs = require("ui/dialogs");
var core_2 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var myfeedCreateDialog_component_1 = require("../../myFeed/components/dialog/myfeedCreateDialog.component");
var myfeeds_component_1 = require("../../myFeed/components/myfeeds.component");
var myfeeddetail_component_1 = require("../../myFeed/components/myfeeddetail.component");
var MyFeedComponent = /** @class */ (function () {
    //@ViewChild("scrollview") scrollViewRef: ElementRef;
    function MyFeedComponent(router, route, routerExtensions, dataService, feedService, commonService, modalService, viewContainerRef) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.routerExtensions = routerExtensions;
        this.dataService = dataService;
        this.feedService = feedService;
        this.commonService = commonService;
        this.modalService = modalService;
        this.viewContainerRef = viewContainerRef;
        this.arrFeedType = Array();
        this.isLoading = false;
        this.dataSourceFeedType = new nativescript_drop_down_1.ValueList();
        this.dataSourceFeedCategory = new nativescript_drop_down_1.ValueList();
        this.fileParentId = "";
        this.feedFileUploaded = 0;
        /*if(this.route.url == '/myfeed/new' ) {

        }*/
        this.loader = new nativescript_loading_indicator_1.LoadingIndicator();
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
        };
        this.arrFeedFileList = new observable_array_1.ObservableArray();
        this.arrFeedFileToUploadList = new observable_array_1.ObservableArray();
        var f = new myfeed_model_1.FeedFile();
        f.Feed_Id = "8736851b-128f-4c74-97e9-63e9581a70ee";
        f.File_Id = "9f1216b1-97d8-4aa1-9a9b-bb00300fe5fe";
        f.Condominium_Id = "8e3919ce-3bd8-4528-bd9a-4127aea09414";
        f.File_Name = "download (3).jpg";
        f.File_Path = "8e3919ce-3bd8-4528-bd9a-4127aea09414/Services/1aded8d4-8452-4642-832c-91131c793827.jpg";
        f.File_Type = "image/jpeg";
        f.Actual_File_Path = "http://192.168.100.254:8062/8e3919ce-3bd8-4528-bd9a-4127aea09414/Services/1aded8d4-8452-4642-832c-91131c793827.jpg";
        f.Small_File_Path = "file:///Users/mycondo/Library/Developer/CoreSimulator/Devices/AD5BE23A-FF2E-424A-ADF2-DBF4E302E46E/data/Media/DCIM/100APPLE/IMG_0002.JPG";
        f.Parent_Id = "00000000-0000-0000-0000-000000000000";
        console.log("read url " + this.route.url["_value"][0]["path"]);
        if (this.route.url["_value"][0]["path"] == "edit") {
            this.route.queryParams.subscribe(function (params) {
                _this.feedInfoDetail = JSON.parse(params["Feed"]);
                _this.arrFeedFileList.push(_this.feedInfoDetail.MC_Feed_Files);
                if (_this.feedInfoDetail != null) {
                    if (_this.feedInfoDetail.MC_Feed_Files.length > 0) {
                        _this.fileParentId = _this.feedInfoDetail.MC_Feed_Files[0].Parent_Id;
                    }
                    _this.createOrUpdate = "update";
                    MyFeedComponent_1.feedTypeId = _this.feedInfoDetail.FeedType_Id;
                    MyFeedComponent_1.feedCategoryId = _this.feedInfoDetail.Feed_Category_Id;
                    alert(_this.createOrUpdate);
                }
                console.log("Feed -->" + JSON.stringify(_this.feedInfoDetail));
            });
        }
        else if (this.route.url["_value"][0]["path"] == "new") {
            this.feedInfoDetail = new myfeed_model_1.FeedInformation();
            this.feedInfoDetail.Title = "";
            this.createOrUpdate = "new";
            alert(this.createOrUpdate);
            //this.arrFeedFileList.push(f);
        }
    }
    MyFeedComponent_1 = MyFeedComponent;
    MyFeedComponent.prototype.ngOnInit = function () {
        this.init();
        this.getHeight();
        if (platform_1.isIOS) {
            // this.init();
            console.log("operation system - IOS");
        }
        else {
            console.log("operation system - ANDROID");
            //let decorView = app.android.startActivity.getWindow().getDecorView();
            //decorView.setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
            //app.android.startActivity.getWindow().clearFlags(android.view.WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
            // this.init();
            app.android.startActivity.getWindow().addFlags(android.view.WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
            app.android.startActivity.getWindow().clearFlags(android.view.WindowManager.LayoutParams.FLAG_FULLSCREEN);
            app.android.startActivity.getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN | android.view.WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN);
        }
    };
    MyFeedComponent.prototype.showDialog = function () {
        var _this = this;
        if (MyFeedComponent_1.feedCategoryId == "" || MyFeedComponent_1.feedCategoryId == "0") {
            alert("Please select feed category!");
            return;
        }
        else if (MyFeedComponent_1.feedTypeId == "" || MyFeedComponent_1.feedTypeId == "0") {
            alert("Please select feed type!");
            return;
        }
        else if (this.feedInfoDetail.Title == "") {
            alert("Please enter feed title!");
            return;
        }
        else {
            if (this.createOrUpdate == "new") {
                var options = {
                    viewContainerRef: this.viewContainerRef
                };
                this.modalService.showModal(myfeedCreateDialog_component_1.myfeedCreateDialog, options)
                    .then(function (dialogResult) {
                    if (dialogResult == "save_as_draft") {
                        _this.feedInfoDetail.Feed_Id = '00000000-0000-0000-0000-000000000000';
                        _this.feedInfoDetail.status = "draft";
                        _this.createOrUpdateFeed();
                    }
                    else if (dialogResult == "post_and_notify") {
                        _this.feedInfoDetail.Feed_Id = '00000000-0000-0000-0000-000000000000';
                        _this.feedInfoDetail.status = "notify";
                        _this.createOrUpdateFeed();
                    }
                    else if (dialogResult == "post") {
                        _this.feedInfoDetail.Feed_Id = '00000000-0000-0000-0000-000000000000';
                        _this.feedInfoDetail.status = "post";
                        _this.createOrUpdateFeed();
                    }
                });
            }
            else if (this.createOrUpdate == "update") {
                this.feedInfoDetail.Feed_Id = this.feedInfoDetail.Feed_Id;
                this.feedInfoDetail.Post_Status = this.feedInfoDetail.Post_Status;
                this.createOrUpdateFeed();
            }
        }
    };
    MyFeedComponent.prototype.createOrUpdateFeed = function () {
        var _this = this;
        try {
            //if(this.createOrUpdate == "new"){
            //    this.feedInfoDetail.Feed_Id ='00000000-0000-0000-0000-000000000000';
            //this.feedInfoDetail.Post_Status = true;
            //}
            //this.feedInfoDetail.Condominium_Id= this.commonService.getCondoId;
            console.log("feed category id --> " + MyFeedComponent_1.feedCategoryId);
            this.feedInfoDetail.Feed_Category_Id = MyFeedComponent_1.feedCategoryId;
            this.feedInfoDetail.FeedType_Id = MyFeedComponent_1.feedTypeId;
            //this.feedInfoDetail.Posted_By = "TT-CONDOMANAGER"; //posted creator
            // this.feedInfoDetail.Posted_Date = new Date(Date.now().toString());        //posted created date
            //this.feedInfoDetail.isBlocked = false;  //this feed is not blocked all user can see if it is posted
            //this.feedInfoDetail.Created_By = "TT-CONDOMANAGER";
            //this.feedInfoDetail.Last_Updated_By = "TT-CONDOMANAGER";
            this.feedInfoDetail.Feed_Group = 1;
            var fileList = Array();
            this.arrFeedFileList.forEach(function (feed) {
                fileList.push(feed);
            });
            this.feedInfoDetail.MC_Feed_Files = fileList;
            this.oWebViewInterface.callJSFunction('getDescription', null, function (para) {
                // console.log( "webview hieght " +  this.webview.height);
                //alert(`${oSelectedLang}`);
                _this.feedInfoDetail.Description = "" + para;
                _this.saveFeedInformation();
            });
        }
        catch (e) {
            console.log(e);
        }
        //this.feedInfoDetail.EventStartDateTime = new Date("1900-01-01 00:00:00.000");
        // this.feedInfoDetail.EventEndDateTime = new Date("1900-01-01 00:00:00.000");
        //this.feedInfoDetail.IsShowEndDateTime = false;
        //this.feedInfoDetail.EventPlace = "";
        console.log("feed create --> " + JSON.stringify(this.feedInfoDetail));
        console.log("retrieve date --> " + Date.now().toString());
    };
    MyFeedComponent.prototype.saveFeedInformation = function () {
        var _this = this;
        if (this.createOrUpdate == "new") {
            this.feedService.saveFeedInfo(this.feedInfoDetail)
                .subscribe(function (res) {
                //this.commonService.showMessage(res, 'Feed information has been saved successfully.');
                console.log("saveFeedInformation --> " + JSON.stringify(res));
                //let response:myResponse = JSON.parse(res.response.,this.dataService.reviver);
                if (res.response.code == "200") {
                    alert(res.response.message);
                    if (res.result[0] != null) {
                        var feed_1 = res.result[0];
                        _this.onNavBtnTap();
                        setTimeout(function () {
                            myfeeds_component_1.MyFeedsComponent.getMyFeedsObject().updateMyFeedsUI(feed_1, "new", null);
                        }, 1500);
                    }
                }
                else {
                    alert(res.response.message);
                }
            }, function (error) {
            });
            //this.router.navigate(['/myfeed']);
        }
        else if (this.createOrUpdate == "update") {
            this.feedService.updatefeedInfo(this.feedInfoDetail)
                .subscribe(function (res) {
                console.log("updateFeedInformation --> " + JSON.stringify(res));
                //this.commonService.showMessage(res, 'Feed Information has been updated successfully.');
                if (res.response.code == "200") {
                    alert(res.response.message);
                    myfeeddetail_component_1.MyFeedDetailComponent.getMyFeedDetailObject().updateFeedDetailUI(_this.feedInfoDetail);
                }
                else {
                    alert(res.response.message);
                }
            }, function (error) {
            });
            //this.router.navigate(['/myfeed']);
        }
    };
    MyFeedComponent.prototype.init = function () {
        //this.feedInfoDetail.Feed_Group = 1;=
        //this.feedInfoDetail.Feed_Id = this.feedId;
        //this.feedInfoDetail = this.route.snapshot.params['id'];
        var _this = this;
        this.isLoading = true;
        this.feedService.getfeedType()
            .subscribe(function (res) {
            console.log("getFeedType -> " + JSON.stringify(res));
            _this.isLoading = false;
            _this.feedType = res.result;
            try {
                var dropDownValuePair;
                dropDownValuePair = new interfaces_1.DropDownValuePair();
                dropDownValuePair.value = "0";
                dropDownValuePair.display = "All";
                _this.dataSourceFeedType.push(dropDownValuePair);
                var currentSelectedFeedType_Id_1;
                var index_1 = 0;
                _this.feedType.map(function (v) {
                    dropDownValuePair = new interfaces_1.DropDownValuePair();
                    dropDownValuePair.value = v.FeedType_Id;
                    dropDownValuePair.display = v.FeedType_Name;
                    _this.dataSourceFeedType.push(dropDownValuePair);
                    index_1++;
                    if (v.FeedType_Id == _this.feedInfoDetail.FeedType_Id) {
                        currentSelectedFeedType_Id_1 = index_1;
                    }
                    //this.arrFeedType.push(v.FeedType_Name)
                });
                _this.dropDownFeedType.items = _this.dataSourceFeedType;
                if (_this.createOrUpdate == "new") {
                    _this.dropDownFeedType.selectedIndex = 0;
                }
                else if (_this.createOrUpdate == "update") {
                    _this.dropDownFeedType.selectedIndex = currentSelectedFeedType_Id_1;
                }
            }
            catch (e) {
                console.log(e);
            }
        });
        this.feedService.getfeedCategory()
            .subscribe(function (res) {
            console.log("getFeedCategory -> " + JSON.stringify(res));
            _this.feedCategory = res.result;
            try {
                var dropDownValuePair;
                dropDownValuePair = new interfaces_1.DropDownValuePair();
                dropDownValuePair.value = "0";
                dropDownValuePair.display = "All";
                _this.dataSourceFeedCategory.push(dropDownValuePair);
                var currentSelectedFeedCategory_Id_1;
                var index_2 = 0;
                _this.feedCategory.map(function (v) {
                    dropDownValuePair = new interfaces_1.DropDownValuePair();
                    dropDownValuePair.value = v.Feed_Category_Id;
                    dropDownValuePair.display = v.Feed_Category_Name;
                    _this.dataSourceFeedCategory.push(dropDownValuePair);
                    index_2++;
                    if (v.Feed_Category_Id == _this.feedInfoDetail.Feed_Category_Id) {
                        currentSelectedFeedCategory_Id_1 = index_2;
                    }
                    //this.arrFeedType.push(v.FeedType_Name)
                });
                _this.dropDownFeedCategory.items = _this.dataSourceFeedCategory;
                if (_this.createOrUpdate == "new") {
                    _this.dropDownFeedCategory.selectedIndex = 0;
                }
                else if (_this.createOrUpdate == "update") {
                    _this.dropDownFeedCategory.selectedIndex = currentSelectedFeedCategory_Id_1;
                }
            }
            catch (e) {
                console.log(e);
                _this.isLoading = false;
            }
        });
    };
    MyFeedComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.webview = this.webViewRef.nativeElement;
        //this.scrollView = this.scrollViewRef.nativeElement;
        this.page = this.pageRef.nativeElement;
        this.dropDownFeedType = this.page.getViewById("dropDownFeedType");
        this.dropDownFeedCategory = this.page.getViewById("dropDownFeedCategory");
        //this.webview.android.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT));
        this.oWebViewInterface = new nativescript_webview_interface_1.WebViewInterface(this.webview, "~/summer_note/index.html");
        var _webSetting = android.webkit.WebSettings;
        //this.webview.android.setLayoutParams(new android.view.WindowManager.LayoutParams(android.view.WindowManager.LayoutParams.MATCH_PARENT,
        //    android.view.WindowManager.LayoutParams.WRAP_CONTENT));
        this.webview.on('loadFinished', function (args) {
            if (!args.error) {
                console.log("load finished" + "webview hieght " + _this.webview.height);
                _webSetting = _this.webview.android.getSettings();
                _webSetting.setLayoutAlgorithm(android.webkit.WebSettings.LayoutAlgorithm.NORMAL);
                //this.webview.android.setLayoutParams(new org.nativescript.widgets.CommonLayoutParams());    
                _this.webview.android.getSettings().setBuiltInZoomControls(false);
                _this.webview.android.getSettings().setDisplayZoomControls(false);
                var vc = _this.webview.android.getLayoutParams();
                vc.height = android.view.ViewGroup.LayoutParams.WRAP_CONTENT;
                _this.webview.android.setLayoutParams(vc);
                _this.insertDescription();
                //this.listenWebViewEvents();
                console.log("is loaded loaed");
            }
        });
    };
    MyFeedComponent.prototype.onchangeFeedType = function (args) {
        var selectedValue = this.dataSourceFeedType.getValue(this.dropDownFeedType.selectedIndex);
        MyFeedComponent_1.feedTypeId = selectedValue.toString();
        console.log("selectedValue " + selectedValue.toString());
        console.log("Drop Down selected index changed from " + args.oldIndex + " to " + args.newIndex);
    };
    MyFeedComponent.prototype.onchangeFeedCategory = function (args) {
        var selectedValue = this.dataSourceFeedCategory.getValue(this.dropDownFeedCategory.selectedIndex);
        MyFeedComponent_1.feedCategoryId = selectedValue.toString();
        console.log("feed category Id " + selectedValue);
        console.log("Drop Down selected index changed from " + args.oldIndex + " to " + args.newIndex);
    };
    MyFeedComponent.prototype.onopen = function () {
    };
    MyFeedComponent.prototype.onclose = function () {
    };
    MyFeedComponent.prototype.onNavBtnTap = function () {
        this.routerExtensions.backToPreviousPage();
    };
    MyFeedComponent.prototype.getDescription = function () {
        this.oWebViewInterface.callJSFunction('getDescription', null, function (para) {
            // console.log( "webview hieght " +  this.webview.height);
            //alert(`${oSelectedLang}`);
            console.log("myDri --> " + para);
            return para;
        });
        /*this.oWebViewInterface.callJSFunction('documentHeight',null,(para) => {
            console.log( "body hieght " + para);
        });*/
    };
    MyFeedComponent.prototype.insertDescription = function () {
        this.oWebViewInterface.callJSFunction('insertDescription', [this.feedInfoDetail.Description]);
    };
    MyFeedComponent.prototype.getHeight = function () {
        //if(this.arrFeedFileList.length > 0){
        this.radListViewHeight = this.arrFeedFileList.length > 2 ? ((this.arrFeedFileList.length % 2) + (this.arrFeedFileList.length / 2)) * 150 : 150;
        // }else{
        //if(this.arrFeedFileList.length < 1){
        //    this.radListViewHeight = 0;
        //}
        console.log("list height -> " + this.radListViewHeight);
        return this.radListViewHeight;
    };
    MyFeedComponent.prototype.onImageTap = function (feed) {
        alert("index " + feed.Feed_Id);
    };
    MyFeedComponent.prototype.onImageRemoveTap = function (fileId) {
        //var fileToRemove = this.feedInfoDetail.MC_Feed_Files.filter(file => file.File_Id == fileId);
        var fileToRemove = this.arrFeedFileList.filter(function (file) { return file.File_Id == fileId; });
        console.log("file to remove " + JSON.stringify(fileToRemove));
        var i = this.arrFeedFileList.indexOf(fileToRemove[0]);
        console.log("index of file " + i);
        this.arrFeedFileList.splice(i, 1);
        this.getHeight();
        //this.arrFeedFileList.notify;
    };
    MyFeedComponent.prototype.listenWebViewEvents = function () {
        var _this = this;
        // handles language selectionChange event.
        this.oWebViewInterface.on('webviewChanged', function (height) {
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
            var vc = _this.webview.android.getLayoutParams();
            vc.height = android.view.ViewGroup.LayoutParams.WRAP_CONTENT;
            _this.webview.android.setLayoutParams(vc);
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
    };
    MyFeedComponent.prototype.onClickUploadImage = function () {
        var _this = this;
        var myFeedComponent = this;
        var filePath = "";
        var context = imagepicker.create({
            mode: "multiple" // use "multiple" for multiple selection
        });
        context
            .authorize()
            .then(function () {
            return context.present();
        })
            .then(function (selection) {
            myFeedComponent.arrFeedFileToUploadList = new observable_array_1.ObservableArray();
            selection.forEach(function (selected) {
                filePath = selected.fileUri;
                if (platform_1.isIOS) {
                    filePath = filePath.substring(7, filePath.length);
                }
                console.log("----------------");
                console.log("uri: " + filePath);
                var feedFile = myFeedComponent.getMcFeedFile(filePath);
                myFeedComponent.arrFeedFileToUploadList.push(feedFile);
                //this.arrFeedFileList.push(feedFile);
            });
        }).then(function () {
            console.log(" feed file size ---> " + _this.arrFeedFileToUploadList.length);
            if (_this.arrFeedFileToUploadList.length > 0) {
                _this.uploadMultipleFiles(_this.arrFeedFileToUploadList.getItem(0).File_Path);
            }
            //this.arrFeedFileList.push(feedFile);
        }).catch(function (e) {
            // process error
        });
    };
    MyFeedComponent.prototype.uploadMultipleFiles = function (filePath) {
        if (this.fileParentId == "" || this.fileParentId == "00000000-0000-0000-0000-000000000000") {
            this.fileParentId = this.commonService.NewGuid();
        }
        console.log("file parent id -> " + this.fileParentId);
        //var file = imageSource.fromFile(filePath);   
        var myDataService = this.dataService;
        var myFeedComponent = this;
        if (!this.loader.show()) {
            this.loader.show(this.options); // options is optional
        }
        var server_return;
        var task = this.feedService.uploadFile(this.fileParentId, filePath);
        task.on("progress", logEvent);
        task.on("error", logEvent);
        task.on("complete", logEvent);
        task.on("responded", uploadComplete);
        function logEvent(e) {
            try {
                console.log("event name " + e.eventName);
                if (e.eventName == "error") {
                    this.loader.hide();
                    alert("Can't connect to server!");
                    return;
                }
            }
            catch (e) {
                alert("Error in uploading to server!");
            }
        }
        var position = this.feedFileUploaded;
        function uploadComplete(completeEvent) {
            //console.log("complete " + completeEvent.response.getBodyAsString());
            try {
                //var str = '{"result":[{"Parent_Id":"36e49234-39d4-4522-b15d-6d179453cb77","File_Id":"caa622f4-c9f8-4e6a-a82b-9dafa71e8832","Condominium_Id":"00000000-0000-0000-0000-000000000000","File_Name":"bg.jpg","File_Size":0,"File_Path":"8e3919ce-3bd8-4528-bd9a-4127aea09414/Temp_File/d8d0463c-f052-400d-bb02-325dd257940d.jpg","Archive":false,"Created_On":"0001-01-01T00:00:00","Last_Updated_On":"0001-01-01T00:00:00"}],"response":{"code":"200","message":"Save Successfully!","target":"Temp_File"}}';
                var res = JSON.parse(completeEvent.data);
                console.log("responded --> " + JSON.stringify(res));
                server_return = JSON.parse(completeEvent.data);
                if (server_return.response.code == "200") {
                    var myFile = server_return.result[0];
                    console.log("result --> " + JSON.stringify(myFile));
                    myFeedComponent.update_arrFeedFileToUploadList(myFile, position);
                }
            }
            catch (e) {
                console.log("error ---> " + e);
            }
            //this.feedFileUploaded++;
            console.log(" ---- > " + myFeedComponent.feedFileUploaded + " - " + myFeedComponent.arrFeedFileToUploadList.length);
            if (myFeedComponent.feedFileUploaded == myFeedComponent.arrFeedFileToUploadList.length - 1) {
                myFeedComponent.loader.hide();
                console.log("finish upload  ---> ");
                //myFeedComponent.arrFeedFileList = myFeedComponent.arrFeedFileToUploadList;
                //myFeedComponent.arrFeedFileList.notify;
                myFeedComponent.refreshImage();
                console.log("arrFeedFileList size --> " + myFeedComponent.arrFeedFileList.length);
                myFeedComponent.arrFeedFileList.forEach(function (element) {
                    console.log("arrFeedFileList --- element " + JSON.stringify(element));
                });
            }
            else {
                myFeedComponent.feedFileUploaded++;
                myFeedComponent.uploadMultipleFiles(myFeedComponent.arrFeedFileToUploadList.getItem(myFeedComponent.feedFileUploaded).File_Path);
            }
        }
    };
    MyFeedComponent.prototype.update_arrFeedFileToUploadList = function (feedFile, position) {
        console.log("result --> " + JSON.stringify(feedFile) + " - " + position);
        //this.arrFeedFileToUploadList.setItem(position,feedFile); 
        this.arrFeedFileToUploadList.getItem(position).File_Id = feedFile.File_Id;
        this.arrFeedFileToUploadList.getItem(position).Parent_Id = feedFile.Parent_Id;
        console.log("--------------feedFileList" + this.arrFeedFileToUploadList.length + " ==========> " + JSON.stringify(this.arrFeedFileToUploadList.getItem(0)));
    };
    MyFeedComponent.prototype.getMcFeedFile = function (path) {
        try {
            console.log("feed file path -> " + path);
            var feed_files = new myfeed_model_1.FeedFile();
            var file = fileSystem.File.fromPath(path);
            feed_files.File_Id = "00000000-0000-0000-0000-000000000000";
            feed_files.File_Name = file.name;
            feed_files.File_Type = file.extension;
            feed_files.File_Path = file.path;
            feed_files.Small_File_Path = "file://" + file.path;
            feed_files.Parent_Id = this.fileParentId;
            console.log("feed_files -> " + JSON.stringify(feed_files));
            return feed_files;
        }
        catch (e) {
            console.log("Exception --> " + e);
        }
    };
    MyFeedComponent.prototype.refreshImage = function () {
        var _this = this;
        this.arrFeedFileToUploadList.forEach(function (element) {
            _this.arrFeedFileList.push(element);
            _this.arrFeedFileList.notify;
            _this.getHeight();
        });
    };
    MyFeedComponent.prototype.createFeedDialog = function () {
        dialogs.prompt({
            title: "Your title",
            message: "Your message",
            okButtonText: "Your button text",
            cancelButtonText: "Cancel text",
            neutralButtonText: "Neutral text",
            defaultText: "Default text",
            inputType: dialogs.inputType.password
        }).then(function (r) {
            console.log("Dialog result: " + r.result + ", text: " + r.text);
        });
    };
    MyFeedComponent.feedCategoryId = "";
    MyFeedComponent.feedTypeId = "";
    __decorate([
        core_1.ViewChild("page"),
        __metadata("design:type", core_1.ElementRef)
    ], MyFeedComponent.prototype, "pageRef", void 0);
    __decorate([
        core_1.ViewChild("webView"),
        __metadata("design:type", core_1.ElementRef)
    ], MyFeedComponent.prototype, "webViewRef", void 0);
    MyFeedComponent = MyFeedComponent_1 = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-myfeed',
            templateUrl: 'myfeed.html',
            styleUrls: ['./myfeed.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, router_2.RouterExtensions,
            data_service_1.DataService,
            myfeed_service_1.MyFeedService,
            common_service_1.CommonService,
            modal_dialog_1.ModalDialogService,
            core_2.ViewContainerRef])
    ], MyFeedComponent);
    return MyFeedComponent;
    var MyFeedComponent_1;
}());
exports.MyFeedComponent = MyFeedComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlmZWVkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15ZmVlZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBcUc7QUFDckcsMENBQXlEO0FBR3pELHNEQUE2RDtBQUs3RCxzREFBK0c7QUFDL0csNkRBQTJEO0FBRTNELG9FQUFrRTtBQUNsRSxzREFBNEQ7QUFHNUQsaUZBQWtFO0FBR2xFLHFDQUFpQztBQUNqQyxpQ0FBbUM7QUFDbkMsaUVBQW1EO0FBSW5ELHNEQUF3RDtBQUN4RCx3Q0FBMEM7QUFDMUMsMkVBQXlFO0FBQ3pFLGlGQUFrRTtBQUVsRSxtRUFBaUU7QUFFakUsb0NBQXNDO0FBQ3RDLHNDQUFpRDtBQUNqRCxrRUFBMkY7QUFDM0YsNEdBQWlHO0FBRWpHLCtFQUEyRTtBQUMzRSx5RkFBcUY7QUFXckY7SUErQkkscURBQXFEO0lBQ3JELHlCQUFvQixNQUFjLEVBQVMsS0FBcUIsRUFBUyxnQkFBa0MsRUFDL0YsV0FBd0IsRUFDdkIsV0FBeUIsRUFDMUIsYUFBNEIsRUFDM0IsWUFBZ0MsRUFDaEMsZ0JBQWtDO1FBTC9DLGlCQThFQztRQTlFbUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUMvRixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN2QixnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQUMxQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMzQixpQkFBWSxHQUFaLFlBQVksQ0FBb0I7UUFDaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQTVCL0MsZ0JBQVcsR0FBRyxLQUFLLEVBQVUsQ0FBQztRQUM5QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBSzNCLHVCQUFrQixHQUFHLElBQUksa0NBQVMsRUFBcUIsQ0FBQztRQUN4RCwyQkFBc0IsR0FBRyxJQUFJLGtDQUFTLEVBQXFCLENBQUM7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Q0FBa0I7WUFDZCx1QkFBZ0I7T0FyQ3RDLGVBQWUsQ0ErcEIzQjtJQUFELHNCQUFDOztDQUFBLEFBL3BCRCxJQStwQkM7QUEvcEJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsLCBTYWZlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlLCBSZXF1ZXN0T3B0aW9ucywgUmVzcG9uc2VDb250ZW50VHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEZlZWRJbmZvcm1hdGlvbiwgRmVlZFR5cGUsIEZlZWRDYXRlZ29yeSwgRmVlZEZpbGUsIFRlbXBvcmFyeUZpbGUsIFJvbGUgfSBmcm9tICcuLi9tb2RlbC9teWZlZWQubW9kZWwnO1xyXG5pbXBvcnQgeyBNeUZlZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbXlmZWVkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29tbW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy9jb21tb24uc2VydmljZSc7XHJcbmltcG9ydCB7IERyb3BEb3duVmFsdWVQYWlyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXJcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBXZWJWaWV3SW50ZXJmYWNlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXdlYnZpZXctaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgV2ViVmlldywgTG9hZEV2ZW50RGF0YSB9IGZyb20gXCJ1aS93ZWItdmlld1wiO1xyXG5pbXBvcnQgeyBTY3JvbGxWaWV3IH0gZnJvbSBcInVpL3Njcm9sbC12aWV3XCI7XHJcbmltcG9ydCB7IGlzSU9TIH0gZnJvbSAncGxhdGZvcm0nO1xyXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSAnYXBwbGljYXRpb24nO1xyXG5pbXBvcnQgeyBWYWx1ZUxpc3QgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBEcm9wRG93biB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2Ryb3AtZG93blwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgKiBhcyBpbWFnZXBpY2tlciBmcm9tIFwibmF0aXZlc2NyaXB0LWltYWdlcGlja2VyXCI7XHJcbmltcG9ydCAqIGFzIGZpbGVTeXN0ZW0gZnJvbSBcImZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBMb2FkaW5nSW5kaWNhdG9yIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xyXG5pbXBvcnQgeyBSZXR1cm59IGZyb20gXCIuLi8uLi9zaGFyZWQvaW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBpb3MgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3N0eWxpbmcvZm9udCc7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSwgTW9kYWxEaWFsb2dPcHRpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBteWZlZWRDcmVhdGVEaWFsb2cgfSBmcm9tIFwiLi4vLi4vbXlGZWVkL2NvbXBvbmVudHMvZGlhbG9nL215ZmVlZENyZWF0ZURpYWxvZy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtSZXNwb25zZSBhcyBteVJlc3BvbnNlfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2ludGVyZmFjZXNcIlxyXG5pbXBvcnQge015RmVlZHNDb21wb25lbnR9IGZyb20gXCIuLi8uLi9teUZlZWQvY29tcG9uZW50cy9teWZlZWRzLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQge015RmVlZERldGFpbENvbXBvbmVudH0gZnJvbSBcIi4uLy4uL215RmVlZC9jb21wb25lbnRzL215ZmVlZGRldGFpbC5jb21wb25lbnRcIjtcclxuXHJcbmRlY2xhcmUgdmFyIGFuZHJvaWQ7XHJcbmRlY2xhcmUgdmFyIG9yZztcclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6ICdhcHAtbXlmZWVkJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnbXlmZWVkLmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vbXlmZWVkLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE15RmVlZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBmZWVkSW5mb0RldGFpbDogRmVlZEluZm9ybWF0aW9uO1xyXG4gICAgcHVibGljIG9XZWJWaWV3SW50ZXJmYWNlOldlYlZpZXdJbnRlcmZhY2U7XHJcbiAgICBwdWJsaWMgd2VidmlldzogV2ViVmlldztcclxuICAgIHNjcm9sbFZpZXc6IFNjcm9sbFZpZXcgO1xyXG4gICAgZmVlZElkOiBhbnk7XHJcbiAgICBmZWVkVHlwZTpBcnJheTxGZWVkVHlwZT47XHJcbiAgICBmZWVkQ2F0ZWdvcnk6QXJyYXk8RmVlZENhdGVnb3J5PjtcclxuICAgIHBhZ2U6UGFnZTtcclxuICAgIGFyckZlZWRUeXBlID0gQXJyYXk8U3RyaW5nPigpO1xyXG4gICAgaXNMb2FkaW5nOiBCb29sZWFuID0gZmFsc2U7XHJcbiAgICByYWRMaXN0Vmlld0hlaWdodDpudW1iZXI7XHJcblxyXG4gICAgZHJvcERvd25GZWVkVHlwZTpEcm9wRG93bjtcclxuICAgIGRyb3BEb3duRmVlZENhdGVnb3J5OkRyb3BEb3duO1xyXG4gICAgZGF0YVNvdXJjZUZlZWRUeXBlID0gbmV3IFZhbHVlTGlzdDxEcm9wRG93blZhbHVlUGFpcj4oKTsgIFxyXG4gICAgZGF0YVNvdXJjZUZlZWRDYXRlZ29yeSA9IG5ldyBWYWx1ZUxpc3Q8RHJvcERvd25WYWx1ZVBhaXI+KCk7ICBcclxuXHJcbiAgICBmaWxlUGFyZW50SWQ6c3RyaW5nID0gXCJcIjtcclxuICAgIGFyckZlZWRGaWxlTGlzdDogT2JzZXJ2YWJsZUFycmF5PEZlZWRGaWxlPjtcclxuICAgIGFyckZlZWRGaWxlVG9VcGxvYWRMaXN0OiBPYnNlcnZhYmxlQXJyYXk8RmVlZEZpbGU+O1xyXG4gICAgZmVlZEZpbGVVcGxvYWRlZDpudW1iZXIgPSAwO1xyXG5cclxuICAgIGxvYWRlcjphbnk7XHJcbiAgICBvcHRpb25zOmFueTtcclxuICAgIGNyZWF0ZU9yVXBkYXRlOnN0cmluZztcclxuICAgIHN0YXRpYyBmZWVkQ2F0ZWdvcnlJZDpzdHJpbmcgPSBcIlwiOyBzdGF0aWMgZmVlZFR5cGVJZDpzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIHB1YmxpYyByZXN1bHQ6IHN0cmluZztcclxuICAgIEBWaWV3Q2hpbGQoXCJwYWdlXCIpIHBhZ2VSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKFwid2ViVmlld1wiKSB3ZWJWaWV3UmVmOiBFbGVtZW50UmVmO1xyXG4gICAgLy9AVmlld0NoaWxkKFwic2Nyb2xsdmlld1wiKSBzY3JvbGxWaWV3UmVmOiBFbGVtZW50UmVmO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgIHB1YmxpYyBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXHJcbiAgICAgICAgIHByaXZhdGUgZmVlZFNlcnZpY2U6TXlGZWVkU2VydmljZSxcclxuICAgICAgICAgcHVibGljIGNvbW1vblNlcnZpY2U6IENvbW1vblNlcnZpY2UsXHJcbiAgICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbERpYWxvZ1NlcnZpY2UsXHJcbiAgICAgICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZil7IFxyXG4gICAgICAgIC8qaWYodGhpcy5yb3V0ZS51cmwgPT0gJy9teWZlZWQvbmV3JyApIHtcclxuXHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpOyAgICAgIFxyXG4gICAgICAgICAgICAvLyBvcHRpb25hbCBvcHRpb25zXHJcbiAgICAgICAgICAgIC8vIGFuZHJvaWQgYW5kIGlvcyBoYXZlIHNvbWUgcGxhdGZvcm0gc3BlY2lmaWMgb3B0aW9uc1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgbWVzc2FnZTogJ0xvYWRpbmcuLi4nLFxyXG4gICAgICAgICAgICBwcm9ncmVzczogMC42NSxcclxuICAgICAgICAgICAgYW5kcm9pZDoge1xyXG4gICAgICAgICAgICBpbmRldGVybWluYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgbWF4OiAxMDAsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwcm9ncmVzc051bWJlckZvcm1hdDogXCIlMWQvJTJkXCIsXHJcbiAgICAgICAgICAgIHByb2dyZXNzUGVyY2VudEZvcm1hdDogMC41MyxcclxuICAgICAgICAgICAgcHJvZ3Jlc3NTdHlsZTogMSxcclxuICAgICAgICAgICAgc2Vjb25kYXJ5UHJvZ3Jlc3M6IDFcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qaW9zOiB7XHJcbiAgICAgICAgICAgICAgICBkZXRhaWxzOiBcIkFkZGl0aW9uYWwgZGV0YWlsIG5vdGUhXCIsXHJcbiAgICAgICAgICAgICAgICBtYXJnaW46IDEwLFxyXG4gICAgICAgICAgICAgICAgZGltQmFja2dyb3VuZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBcIiM0QjlFRDZcIiwgLy8gY29sb3Igb2YgaW5kaWNhdG9yIGFuZCBsYWJlbHNcclxuICAgICAgICAgICAgICAgIC8vIGJhY2tncm91bmQgYm94IGFyb3VuZCBpbmRpY2F0b3JcclxuICAgICAgICAgICAgICAgIC8vIGhpZGVCZXplbCB3aWxsIG92ZXJyaWRlIHRoaXMgaWYgdHJ1ZVxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInllbGxvd1wiLFxyXG4gICAgICAgICAgICAgICAgaGlkZUJlemVsOiB0cnVlLCAvLyBkZWZhdWx0IGZhbHNlLCBjYW4gaGlkZSB0aGUgc3Vycm91bmRpbmcgYmV6ZWxcclxuICAgICAgICAgICAgICAgIHZpZXc6IFVJVmlldywgLy8gVGFyZ2V0IHZpZXcgdG8gc2hvdyBvbiB0b3Agb2YgKERlZmF1bHRzIHRvIGVudGlyZSB3aW5kb3cpXHJcbiAgICAgICAgICAgICAgICBtb2RlOiBNQlByb2dyZXNzSFVETW9kZURldGVybWluYXRlLy8gc2VlIGlPUyBzcGVjaWZpYyBvcHRpb25zIGJlbG93XHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYXJyRmVlZEZpbGVMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxGZWVkRmlsZT4oKTtcclxuICAgICAgICB0aGlzLmFyckZlZWRGaWxlVG9VcGxvYWRMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxGZWVkRmlsZT4oKTtcclxuXHJcbiAgICAgICAgbGV0IGY6RmVlZEZpbGUgPSBuZXcgRmVlZEZpbGUoKTtcclxuICAgICAgICBmLkZlZWRfSWQ9IFwiODczNjg1MWItMTI4Zi00Yzc0LTk3ZTktNjNlOTU4MWE3MGVlXCI7XHJcbiAgICAgICAgZi5GaWxlX0lkID0gXCI5ZjEyMTZiMS05N2Q4LTRhYTEtOWE5Yi1iYjAwMzAwZmU1ZmVcIjtcclxuICAgICAgICBmLkNvbmRvbWluaXVtX0lkPSBcIjhlMzkxOWNlLTNiZDgtNDUyOC1iZDlhLTQxMjdhZWEwOTQxNFwiO1xyXG4gICAgICAgIGYuRmlsZV9OYW1lPSBcImRvd25sb2FkICgzKS5qcGdcIjtcclxuICAgICAgICBmLkZpbGVfUGF0aD0gXCI4ZTM5MTljZS0zYmQ4LTQ1MjgtYmQ5YS00MTI3YWVhMDk0MTQvU2VydmljZXMvMWFkZWQ4ZDQtODQ1Mi00NjQyLTgzMmMtOTExMzFjNzkzODI3LmpwZ1wiO1xyXG4gICAgICAgIGYuRmlsZV9UeXBlPSBcImltYWdlL2pwZWdcIjtcclxuICAgICAgICBmLkFjdHVhbF9GaWxlX1BhdGg9IFwiaHR0cDovLzE5Mi4xNjguMTAwLjI1NDo4MDYyLzhlMzkxOWNlLTNiZDgtNDUyOC1iZDlhLTQxMjdhZWEwOTQxNC9TZXJ2aWNlcy8xYWRlZDhkNC04NDUyLTQ2NDItODMyYy05MTEzMWM3OTM4MjcuanBnXCI7XHJcbiAgICAgICAgZi5TbWFsbF9GaWxlX1BhdGg9IFwiZmlsZTovLy9Vc2Vycy9teWNvbmRvL0xpYnJhcnkvRGV2ZWxvcGVyL0NvcmVTaW11bGF0b3IvRGV2aWNlcy9BRDVCRTIzQS1GRjJFLTQyNEEtQURGMi1EQkY0RTMwMkU0NkUvZGF0YS9NZWRpYS9EQ0lNLzEwMEFQUExFL0lNR18wMDAyLkpQR1wiO1xyXG4gICAgICAgIGYuUGFyZW50X0lkPSBcIjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInJlYWQgdXJsIFwiICsgdGhpcy5yb3V0ZS51cmxbXCJfdmFsdWVcIl1bMF1bXCJwYXRoXCJdKTtcclxuICAgICAgICBpZih0aGlzLnJvdXRlLnVybFtcIl92YWx1ZVwiXVswXVtcInBhdGhcIl0gPT0gXCJlZGl0XCIpe1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4geyAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuZmVlZEluZm9EZXRhaWwgPSBKU09OLnBhcnNlKHBhcmFtc1tcIkZlZWRcIl0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJGZWVkRmlsZUxpc3QucHVzaCh0aGlzLmZlZWRJbmZvRGV0YWlsLk1DX0ZlZWRfRmlsZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZmVlZEluZm9EZXRhaWwgIT0gbnVsbCApe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZmVlZEluZm9EZXRhaWwuTUNfRmVlZF9GaWxlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlUGFyZW50SWQgPSB0aGlzLmZlZWRJbmZvRGV0YWlsLk1DX0ZlZWRfRmlsZXNbMF0uUGFyZW50X0lkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU9yVXBkYXRlID0gXCJ1cGRhdGVcIjtcclxuICAgICAgICAgICAgICAgICAgICBNeUZlZWRDb21wb25lbnQuZmVlZFR5cGVJZCA9IHRoaXMuZmVlZEluZm9EZXRhaWwuRmVlZFR5cGVfSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgTXlGZWVkQ29tcG9uZW50LmZlZWRDYXRlZ29yeUlkID0gdGhpcy5mZWVkSW5mb0RldGFpbC5GZWVkX0NhdGVnb3J5X0lkO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KHRoaXMuY3JlYXRlT3JVcGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGZWVkIC0tPlwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5mZWVkSW5mb0RldGFpbCkpO1xyXG4gICAgICAgICAgICB9KTsgIFxyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMucm91dGUudXJsW1wiX3ZhbHVlXCJdWzBdW1wicGF0aFwiXSA9PSBcIm5ld1wiKXtcclxuICAgICAgICAgICAgdGhpcy5mZWVkSW5mb0RldGFpbCA9IG5ldyBGZWVkSW5mb3JtYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5mZWVkSW5mb0RldGFpbC5UaXRsZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlT3JVcGRhdGUgPSBcIm5ld1wiOyAgICAgIFxyXG4gICAgICAgICAgICBhbGVydCh0aGlzLmNyZWF0ZU9yVXBkYXRlKTsgICAgIFxyXG4gICAgICAgICAgICAvL3RoaXMuYXJyRmVlZEZpbGVMaXN0LnB1c2goZik7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgICBcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xyXG4gICAgbmdPbkluaXQoKSB7IFxyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuZ2V0SGVpZ2h0KCk7XHJcbiAgICAgICAgaWYoaXNJT1Mpe1xyXG4gICAgICAgICAgIC8vIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKFwib3BlcmF0aW9uIHN5c3RlbSAtIElPU1wiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvcGVyYXRpb24gc3lzdGVtIC0gQU5EUk9JRFwiKTtcclxuICAgICAgICAgICAgIC8vbGV0IGRlY29yVmlldyA9IGFwcC5hbmRyb2lkLnN0YXJ0QWN0aXZpdHkuZ2V0V2luZG93KCkuZ2V0RGVjb3JWaWV3KCk7XHJcbiAgICAgICAgICAgICAvL2RlY29yVmlldy5zZXRTeXN0ZW1VaVZpc2liaWxpdHkoYW5kcm9pZC52aWV3LlZpZXcuU1lTVEVNX1VJX0ZMQUdfTElHSFRfU1RBVFVTX0JBUik7XHJcbiAgICAgICAgICAgICAvL2FwcC5hbmRyb2lkLnN0YXJ0QWN0aXZpdHkuZ2V0V2luZG93KCkuY2xlYXJGbGFncyhhbmRyb2lkLnZpZXcuV2luZG93TWFuYWdlci5MYXlvdXRQYXJhbXMuRkxBR19GT1JDRV9OT1RfRlVMTFNDUkVFTik7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICAgICAgYXBwLmFuZHJvaWQuc3RhcnRBY3Rpdml0eS5nZXRXaW5kb3coKS5hZGRGbGFncyhhbmRyb2lkLnZpZXcuV2luZG93TWFuYWdlci5MYXlvdXRQYXJhbXMuRkxBR19GT1JDRV9OT1RfRlVMTFNDUkVFTik7XHJcbiAgICAgICAgICAgICBhcHAuYW5kcm9pZC5zdGFydEFjdGl2aXR5LmdldFdpbmRvdygpLmNsZWFyRmxhZ3MoYW5kcm9pZC52aWV3LldpbmRvd01hbmFnZXIuTGF5b3V0UGFyYW1zLkZMQUdfRlVMTFNDUkVFTik7XHJcbiAgICAgICAgICAgICBhcHAuYW5kcm9pZC5zdGFydEFjdGl2aXR5LmdldFdpbmRvdygpLnNldFNvZnRJbnB1dE1vZGUoYW5kcm9pZC52aWV3LldpbmRvd01hbmFnZXIuTGF5b3V0UGFyYW1zLlNPRlRfSU5QVVRfQURKVVNUX1BBTiB8IGFuZHJvaWQudmlldy5XaW5kb3dNYW5hZ2VyLkxheW91dFBhcmFtcy5TT0ZUX0lOUFVUX1NUQVRFX0hJRERFTik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICBcclxuICAgIH1cclxuICBcclxuICAgIHB1YmxpYyBzaG93RGlhbG9nKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKE15RmVlZENvbXBvbmVudC5mZWVkQ2F0ZWdvcnlJZCA9PSBcIlwiIHx8IE15RmVlZENvbXBvbmVudC5mZWVkQ2F0ZWdvcnlJZCA9PSBcIjBcIil7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiUGxlYXNlIHNlbGVjdCBmZWVkIGNhdGVnb3J5IVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1lbHNlIGlmKE15RmVlZENvbXBvbmVudC5mZWVkVHlwZUlkID09IFwiXCIgfHwgTXlGZWVkQ29tcG9uZW50LmZlZWRUeXBlSWQgPT0gXCIwXCIpe1xyXG4gICAgICAgICAgICBhbGVydChcIlBsZWFzZSBzZWxlY3QgZmVlZCB0eXBlIVwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfWVsc2UgaWYoIHRoaXMuZmVlZEluZm9EZXRhaWwuVGl0bGUgPT0gXCJcIil7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiUGxlYXNlIGVudGVyIGZlZWQgdGl0bGUhXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5jcmVhdGVPclVwZGF0ZSA9PSBcIm5ld1wiKXtcclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb25zOiBNb2RhbERpYWxvZ09wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52aWV3Q29udGFpbmVyUmVmXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlLnNob3dNb2RhbChteWZlZWRDcmVhdGVEaWFsb2csIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZGlhbG9nUmVzdWx0OiBzdHJpbmcpID0+IHsgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGlhbG9nUmVzdWx0ID09IFwic2F2ZV9hc19kcmFmdFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mZWVkSW5mb0RldGFpbC5GZWVkX0lkID0nMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mZWVkSW5mb0RldGFpbC5zdGF0dXMgPSBcImRyYWZ0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlT3JVcGRhdGVGZWVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoZGlhbG9nUmVzdWx0ID09IFwicG9zdF9hbmRfbm90aWZ5XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZlZWRJbmZvRGV0YWlsLkZlZWRfSWQgPScwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZlZWRJbmZvRGV0YWlsLnN0YXR1cyA9IFwibm90aWZ5XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlT3JVcGRhdGVGZWVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoZGlhbG9nUmVzdWx0ID09IFwicG9zdFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mZWVkSW5mb0RldGFpbC5GZWVkX0lkID0nMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mZWVkSW5mb0RldGFpbC5zdGF0dXMgPSBcInBvc3RcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVPclVwZGF0ZUZlZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5jcmVhdGVPclVwZGF0ZSA9PSBcInVwZGF0ZVwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmVlZEluZm9EZXRhaWwuRmVlZF9JZCA9IHRoaXMuZmVlZEluZm9EZXRhaWwuRmVlZF9JZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmVlZEluZm9EZXRhaWwuUG9zdF9TdGF0dXMgPSB0aGlzLmZlZWRJbmZvRGV0YWlsLlBvc3RfU3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVPclVwZGF0ZUZlZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNyZWF0ZU9yVXBkYXRlRmVlZCgpe1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgLy9pZih0aGlzLmNyZWF0ZU9yVXBkYXRlID09IFwibmV3XCIpe1xyXG4gICAgICAgICAgICAvLyAgICB0aGlzLmZlZWRJbmZvRGV0YWlsLkZlZWRfSWQgPScwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAnO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLmZlZWRJbmZvRGV0YWlsLlBvc3RfU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIC8vdGhpcy5mZWVkSW5mb0RldGFpbC5Db25kb21pbml1bV9JZD0gdGhpcy5jb21tb25TZXJ2aWNlLmdldENvbmRvSWQ7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmVlZCBjYXRlZ29yeSBpZCAtLT4gXCIgKyBNeUZlZWRDb21wb25lbnQuZmVlZENhdGVnb3J5SWQpO1xyXG4gICAgICAgICAgICB0aGlzLmZlZWRJbmZvRGV0YWlsLkZlZWRfQ2F0ZWdvcnlfSWQgPSBNeUZlZWRDb21wb25lbnQuZmVlZENhdGVnb3J5SWQ7XHJcbiAgICAgICAgICAgIHRoaXMuZmVlZEluZm9EZXRhaWwuRmVlZFR5cGVfSWQ9IE15RmVlZENvbXBvbmVudC5mZWVkVHlwZUlkO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy90aGlzLmZlZWRJbmZvRGV0YWlsLlBvc3RlZF9CeSA9IFwiVFQtQ09ORE9NQU5BR0VSXCI7IC8vcG9zdGVkIGNyZWF0b3JcclxuICAgICAgICAgICAgLy8gdGhpcy5mZWVkSW5mb0RldGFpbC5Qb3N0ZWRfRGF0ZSA9IG5ldyBEYXRlKERhdGUubm93KCkudG9TdHJpbmcoKSk7ICAgICAgICAvL3Bvc3RlZCBjcmVhdGVkIGRhdGVcclxuICAgICAgICAgICAgLy90aGlzLmZlZWRJbmZvRGV0YWlsLmlzQmxvY2tlZCA9IGZhbHNlOyAgLy90aGlzIGZlZWQgaXMgbm90IGJsb2NrZWQgYWxsIHVzZXIgY2FuIHNlZSBpZiBpdCBpcyBwb3N0ZWRcclxuICAgICAgICAgICAgLy90aGlzLmZlZWRJbmZvRGV0YWlsLkNyZWF0ZWRfQnkgPSBcIlRULUNPTkRPTUFOQUdFUlwiO1xyXG4gICAgICAgICAgICAvL3RoaXMuZmVlZEluZm9EZXRhaWwuTGFzdF9VcGRhdGVkX0J5ID0gXCJUVC1DT05ET01BTkFHRVJcIjtcclxuICAgICAgICAgICAgdGhpcy5mZWVkSW5mb0RldGFpbC5GZWVkX0dyb3VwID0gMTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgZmlsZUxpc3QgPSBBcnJheTxGZWVkRmlsZT4oKTsgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmFyckZlZWRGaWxlTGlzdC5mb3JFYWNoKGZlZWQgPT4ge1xyXG4gICAgICAgICAgICAgICBmaWxlTGlzdC5wdXNoKDxGZWVkRmlsZT5mZWVkKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5mZWVkSW5mb0RldGFpbC5NQ19GZWVkX0ZpbGVzID0gZmlsZUxpc3Q7ICAgXHJcblxyXG4gICAgICAgICAgICB0aGlzLm9XZWJWaWV3SW50ZXJmYWNlLmNhbGxKU0Z1bmN0aW9uKCdnZXREZXNjcmlwdGlvbicsbnVsbCwocGFyYSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coIFwid2VidmlldyBoaWVnaHQgXCIgKyAgdGhpcy53ZWJ2aWV3LmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgLy9hbGVydChgJHtvU2VsZWN0ZWRMYW5nfWApO1xyXG4gICAgICAgICAgICAgICAgIHRoaXMuZmVlZEluZm9EZXRhaWwuRGVzY3JpcHRpb24gPSBgJHtwYXJhfWA7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy5zYXZlRmVlZEluZm9ybWF0aW9uKCk7IFxyXG4gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy90aGlzLmZlZWRJbmZvRGV0YWlsLkV2ZW50U3RhcnREYXRlVGltZSA9IG5ldyBEYXRlKFwiMTkwMC0wMS0wMSAwMDowMDowMC4wMDBcIik7XHJcbiAgICAgICAvLyB0aGlzLmZlZWRJbmZvRGV0YWlsLkV2ZW50RW5kRGF0ZVRpbWUgPSBuZXcgRGF0ZShcIjE5MDAtMDEtMDEgMDA6MDA6MDAuMDAwXCIpO1xyXG4gICAgICAgIC8vdGhpcy5mZWVkSW5mb0RldGFpbC5Jc1Nob3dFbmREYXRlVGltZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vdGhpcy5mZWVkSW5mb0RldGFpbC5FdmVudFBsYWNlID0gXCJcIjtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImZlZWQgY3JlYXRlIC0tPiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuZmVlZEluZm9EZXRhaWwpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInJldHJpZXZlIGRhdGUgLS0+IFwiICsgRGF0ZS5ub3coKS50b1N0cmluZygpKTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlRmVlZEluZm9ybWF0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNyZWF0ZU9yVXBkYXRlID09IFwibmV3XCIpIHsvLyBzYXZlIGZlZWRcclxuICAgICAgICAgICAgdGhpcy5mZWVkU2VydmljZS5zYXZlRmVlZEluZm8odGhpcy5mZWVkSW5mb0RldGFpbClcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuY29tbW9uU2VydmljZS5zaG93TWVzc2FnZShyZXMsICdGZWVkIGluZm9ybWF0aW9uIGhhcyBiZWVuIHNhdmVkIHN1Y2Nlc3NmdWxseS4nKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNhdmVGZWVkSW5mb3JtYXRpb24gLS0+IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL2xldCByZXNwb25zZTpteVJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXMucmVzcG9uc2UuLHRoaXMuZGF0YVNlcnZpY2UucmV2aXZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzLnJlc3BvbnNlLmNvZGUgPT0gXCIyMDBcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHJlcy5yZXNwb25zZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzLnJlc3VsdFswXSAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmZWVkOkZlZWRJbmZvcm1hdGlvbiA9IHJlcy5yZXN1bHRbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTmF2QnRuVGFwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTXlGZWVkc0NvbXBvbmVudC5nZXRNeUZlZWRzT2JqZWN0KCkudXBkYXRlTXlGZWVkc1VJKGZlZWQsXCJuZXdcIixudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDE1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHJlcy5yZXNwb25zZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFsnL215ZmVlZCddKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3JlYXRlT3JVcGRhdGUgPT0gXCJ1cGRhdGVcIikge1xyXG4gICAgICAgICAgICB0aGlzLmZlZWRTZXJ2aWNlLnVwZGF0ZWZlZWRJbmZvKHRoaXMuZmVlZEluZm9EZXRhaWwpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1cGRhdGVGZWVkSW5mb3JtYXRpb24gLS0+IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmNvbW1vblNlcnZpY2Uuc2hvd01lc3NhZ2UocmVzLCAnRmVlZCBJbmZvcm1hdGlvbiBoYXMgYmVlbiB1cGRhdGVkIHN1Y2Nlc3NmdWxseS4nKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXMucmVzcG9uc2UuY29kZSA9PSBcIjIwMFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzLnJlc3BvbnNlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNeUZlZWREZXRhaWxDb21wb25lbnQuZ2V0TXlGZWVkRGV0YWlsT2JqZWN0KCkudXBkYXRlRmVlZERldGFpbFVJKHRoaXMuZmVlZEluZm9EZXRhaWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChyZXMucmVzcG9uc2UubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFsnL215ZmVlZCddKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpe1xyXG4gICAgICAgIC8vdGhpcy5mZWVkSW5mb0RldGFpbC5GZWVkX0dyb3VwID0gMTs9XHJcbiAgICAgICAgLy90aGlzLmZlZWRJbmZvRGV0YWlsLkZlZWRfSWQgPSB0aGlzLmZlZWRJZDtcclxuICAgICAgICAvL3RoaXMuZmVlZEluZm9EZXRhaWwgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1snaWQnXTtcclxuXHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZmVlZFNlcnZpY2UuZ2V0ZmVlZFR5cGUoKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdldEZlZWRUeXBlIC0+IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mZWVkVHlwZSA9IHJlcy5yZXN1bHQ7ICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRyeXsgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRyb3BEb3duVmFsdWVQYWlyOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcERvd25WYWx1ZVBhaXIgPSBuZXcgRHJvcERvd25WYWx1ZVBhaXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBkcm9wRG93blZhbHVlUGFpci52YWx1ZSA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGRyb3BEb3duVmFsdWVQYWlyLmRpc3BsYXkgPSBcIkFsbFwiOyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZUZlZWRUeXBlLnB1c2goZHJvcERvd25WYWx1ZVBhaXIpOyAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50U2VsZWN0ZWRGZWVkVHlwZV9JZDpudW1iZXI7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSAwOyAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZlZWRUeXBlLm1hcCgodikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcERvd25WYWx1ZVBhaXIgPSBuZXcgRHJvcERvd25WYWx1ZVBhaXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BEb3duVmFsdWVQYWlyLnZhbHVlID0gIHYuRmVlZFR5cGVfSWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcERvd25WYWx1ZVBhaXIuZGlzcGxheSA9IHYuRmVlZFR5cGVfTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZUZlZWRUeXBlLnB1c2goZHJvcERvd25WYWx1ZVBhaXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih2LkZlZWRUeXBlX0lkID09IHRoaXMuZmVlZEluZm9EZXRhaWwuRmVlZFR5cGVfSWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTZWxlY3RlZEZlZWRUeXBlX0lkID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuYXJyRmVlZFR5cGUucHVzaCh2LkZlZWRUeXBlX05hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wRG93bkZlZWRUeXBlLml0ZW1zID0gdGhpcy5kYXRhU291cmNlRmVlZFR5cGU7IFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY3JlYXRlT3JVcGRhdGUgPT0gXCJuZXdcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcERvd25GZWVkVHlwZS5zZWxlY3RlZEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmNyZWF0ZU9yVXBkYXRlID09IFwidXBkYXRlXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3BEb3duRmVlZFR5cGUuc2VsZWN0ZWRJbmRleCA9IGN1cnJlbnRTZWxlY3RlZEZlZWRUeXBlX0lkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2goZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZmVlZFNlcnZpY2UuZ2V0ZmVlZENhdGVnb3J5KClcclxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0RmVlZENhdGVnb3J5IC0+IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZlZWRDYXRlZ29yeSA9IHJlcy5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB0cnl7IFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkcm9wRG93blZhbHVlUGFpcjsgIFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3BEb3duVmFsdWVQYWlyID0gbmV3IERyb3BEb3duVmFsdWVQYWlyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcERvd25WYWx1ZVBhaXIudmFsdWUgPSBcIjBcIjtcclxuICAgICAgICAgICAgICAgICAgICBkcm9wRG93blZhbHVlUGFpci5kaXNwbGF5ID0gXCJBbGxcIjsgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2VGZWVkQ2F0ZWdvcnkucHVzaChkcm9wRG93blZhbHVlUGFpcik7IFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50U2VsZWN0ZWRGZWVkQ2F0ZWdvcnlfSWQ6bnVtYmVyOyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gMDsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZlZWRDYXRlZ29yeS5tYXAoKHYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BEb3duVmFsdWVQYWlyID0gbmV3IERyb3BEb3duVmFsdWVQYWlyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wRG93blZhbHVlUGFpci52YWx1ZSA9ICB2LkZlZWRfQ2F0ZWdvcnlfSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wRG93blZhbHVlUGFpci5kaXNwbGF5ID0gdi5GZWVkX0NhdGVnb3J5X05hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2VGZWVkQ2F0ZWdvcnkucHVzaChkcm9wRG93blZhbHVlUGFpcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih2LkZlZWRfQ2F0ZWdvcnlfSWQgPT0gdGhpcy5mZWVkSW5mb0RldGFpbC5GZWVkX0NhdGVnb3J5X0lkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2VsZWN0ZWRGZWVkQ2F0ZWdvcnlfSWQgPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5hcnJGZWVkVHlwZS5wdXNoKHYuRmVlZFR5cGVfTmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcERvd25GZWVkQ2F0ZWdvcnkuaXRlbXMgPSB0aGlzLmRhdGFTb3VyY2VGZWVkQ2F0ZWdvcnk7IFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY3JlYXRlT3JVcGRhdGUgPT0gXCJuZXdcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcERvd25GZWVkQ2F0ZWdvcnkuc2VsZWN0ZWRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5jcmVhdGVPclVwZGF0ZSA9PSBcInVwZGF0ZVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wRG93bkZlZWRDYXRlZ29yeS5zZWxlY3RlZEluZGV4ID0gY3VycmVudFNlbGVjdGVkRmVlZENhdGVnb3J5X0lkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2goZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy53ZWJ2aWV3ID0gdGhpcy53ZWJWaWV3UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgLy90aGlzLnNjcm9sbFZpZXcgPSB0aGlzLnNjcm9sbFZpZXdSZWYubmF0aXZlRWxlbWVudDtcclxuICAgICAgICB0aGlzLnBhZ2UgPSB0aGlzLnBhZ2VSZWYubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICAgICAgdGhpcy5kcm9wRG93bkZlZWRUeXBlID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkPERyb3BEb3duPihcImRyb3BEb3duRmVlZFR5cGVcIik7XHJcbiAgICAgICAgdGhpcy5kcm9wRG93bkZlZWRDYXRlZ29yeSA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZDxEcm9wRG93bj4oXCJkcm9wRG93bkZlZWRDYXRlZ29yeVwiKTtcclxuICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy53ZWJ2aWV3LmFuZHJvaWQuc2V0TGF5b3V0UGFyYW1zKG5ldyBhbmRyb2lkLndpZGdldC5MaW5lYXJMYXlvdXQuTGF5b3V0UGFyYW1zKGFuZHJvaWQudmlldy5WaWV3R3JvdXAuTGF5b3V0UGFyYW1zLldSQVBfQ09OVEVOVCwgYW5kcm9pZC52aWV3LlZpZXdHcm91cC5MYXlvdXRQYXJhbXMuV1JBUF9DT05URU5UKSk7XHJcbiAgICAgICAgdGhpcy5vV2ViVmlld0ludGVyZmFjZSA9IG5ldyBXZWJWaWV3SW50ZXJmYWNlKHRoaXMud2VidmlldywgXCJ+L3N1bW1lcl9ub3RlL2luZGV4Lmh0bWxcIik7XHJcbiAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICB2YXIgX3dlYlNldHRpbmcgPSBhbmRyb2lkLndlYmtpdC5XZWJTZXR0aW5ncztcclxuXHJcbiAgICAgICBcclxuICAgICAgICAvL3RoaXMud2Vidmlldy5hbmRyb2lkLnNldExheW91dFBhcmFtcyhuZXcgYW5kcm9pZC52aWV3LldpbmRvd01hbmFnZXIuTGF5b3V0UGFyYW1zKGFuZHJvaWQudmlldy5XaW5kb3dNYW5hZ2VyLkxheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQsXHJcbiAgICAgICAgLy8gICAgYW5kcm9pZC52aWV3LldpbmRvd01hbmFnZXIuTGF5b3V0UGFyYW1zLldSQVBfQ09OVEVOVCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMud2Vidmlldy5vbignbG9hZEZpbmlzaGVkJywgKGFyZ3MpID0+IHtcclxuICAgICAgICAgIGlmICghYXJncy5lcnJvcikge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvYWQgZmluaXNoZWRcIiArIFwid2VidmlldyBoaWVnaHQgXCIgKyAgdGhpcy53ZWJ2aWV3LmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgX3dlYlNldHRpbmcgPSB0aGlzLndlYnZpZXcuYW5kcm9pZC5nZXRTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgIF93ZWJTZXR0aW5nLnNldExheW91dEFsZ29yaXRobShhbmRyb2lkLndlYmtpdC5XZWJTZXR0aW5ncy5MYXlvdXRBbGdvcml0aG0uTk9STUFMKTsgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgLy90aGlzLndlYnZpZXcuYW5kcm9pZC5zZXRMYXlvdXRQYXJhbXMobmV3IG9yZy5uYXRpdmVzY3JpcHQud2lkZ2V0cy5Db21tb25MYXlvdXRQYXJhbXMoKSk7ICAgIFxyXG4gICAgICAgICAgICAgIHRoaXMud2Vidmlldy5hbmRyb2lkLmdldFNldHRpbmdzKCkuc2V0QnVpbHRJblpvb21Db250cm9scyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy53ZWJ2aWV3LmFuZHJvaWQuZ2V0U2V0dGluZ3MoKS5zZXREaXNwbGF5Wm9vbUNvbnRyb2xzKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdmMgPSB0aGlzLndlYnZpZXcuYW5kcm9pZC5nZXRMYXlvdXRQYXJhbXMoKTtcclxuICAgICAgICAgICAgICAgIHZjLmhlaWdodCA9IGFuZHJvaWQudmlldy5WaWV3R3JvdXAuTGF5b3V0UGFyYW1zLldSQVBfQ09OVEVOVDtcclxuICAgICAgICAgICAgIHRoaXMud2Vidmlldy5hbmRyb2lkLnNldExheW91dFBhcmFtcyh2Yyk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIHRoaXMuaW5zZXJ0RGVzY3JpcHRpb24oKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIC8vdGhpcy5saXN0ZW5XZWJWaWV3RXZlbnRzKCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXMgbG9hZGVkIGxvYWVkXCIpO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgIH1cclxuXHJcbiAgICBvbmNoYW5nZUZlZWRUeXBlKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkVmFsdWUgPSB0aGlzLmRhdGFTb3VyY2VGZWVkVHlwZS5nZXRWYWx1ZSh0aGlzLmRyb3BEb3duRmVlZFR5cGUuc2VsZWN0ZWRJbmRleCk7ICAgICAgXHJcbiAgICAgICAgTXlGZWVkQ29tcG9uZW50LmZlZWRUeXBlSWQgPSBzZWxlY3RlZFZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZWxlY3RlZFZhbHVlIFwiICsgc2VsZWN0ZWRWYWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgRHJvcCBEb3duIHNlbGVjdGVkIGluZGV4IGNoYW5nZWQgZnJvbSAke2FyZ3Mub2xkSW5kZXh9IHRvICR7YXJncy5uZXdJbmRleH1gKTtcclxuICAgIH1cclxuICAgIG9uY2hhbmdlRmVlZENhdGVnb3J5KGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkVmFsdWUgPSB0aGlzLmRhdGFTb3VyY2VGZWVkQ2F0ZWdvcnkuZ2V0VmFsdWUodGhpcy5kcm9wRG93bkZlZWRDYXRlZ29yeS5zZWxlY3RlZEluZGV4KTtcclxuXHJcbiAgICAgICAgIE15RmVlZENvbXBvbmVudC5mZWVkQ2F0ZWdvcnlJZCA9IHNlbGVjdGVkVmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImZlZWQgY2F0ZWdvcnkgSWQgXCIgKyBzZWxlY3RlZFZhbHVlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgRHJvcCBEb3duIHNlbGVjdGVkIGluZGV4IGNoYW5nZWQgZnJvbSAke2FyZ3Mub2xkSW5kZXh9IHRvICR7YXJncy5uZXdJbmRleH1gKTtcclxuICAgIH1cclxuICAgIG9ub3Blbigpe1xyXG5cclxuICAgIH1cclxuICAgIG9uY2xvc2UoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25OYXZCdG5UYXAoKXtcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XHJcbiAgICB9ICAgXHJcbiAgICBcclxuICAgIGdldERlc2NyaXB0aW9uKCk6YW55IHtcclxuICAgICAgICB0aGlzLm9XZWJWaWV3SW50ZXJmYWNlLmNhbGxKU0Z1bmN0aW9uKCdnZXREZXNjcmlwdGlvbicsbnVsbCwocGFyYSkgPT4ge1xyXG4gICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCBcIndlYnZpZXcgaGllZ2h0IFwiICsgIHRoaXMud2Vidmlldy5oZWlnaHQpO1xyXG4gICAgICAgICAgICAvL2FsZXJ0KGAke29TZWxlY3RlZExhbmd9YCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibXlEcmkgLS0+IFwiICsgcGFyYSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qdGhpcy5vV2ViVmlld0ludGVyZmFjZS5jYWxsSlNGdW5jdGlvbignZG9jdW1lbnRIZWlnaHQnLG51bGwsKHBhcmEpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coIFwiYm9keSBoaWVnaHQgXCIgKyBwYXJhKTtcclxuICAgICAgICB9KTsqL1xyXG4gICAgfVxyXG4gICAgaW5zZXJ0RGVzY3JpcHRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5vV2ViVmlld0ludGVyZmFjZS5jYWxsSlNGdW5jdGlvbignaW5zZXJ0RGVzY3JpcHRpb24nLFt0aGlzLmZlZWRJbmZvRGV0YWlsLkRlc2NyaXB0aW9uXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVpZ2h0KCl7XHJcbiAgICAgICAgLy9pZih0aGlzLmFyckZlZWRGaWxlTGlzdC5sZW5ndGggPiAwKXtcclxuICAgICAgICB0aGlzLnJhZExpc3RWaWV3SGVpZ2h0ID0gdGhpcy5hcnJGZWVkRmlsZUxpc3QubGVuZ3RoID4gMiA/ICgodGhpcy5hcnJGZWVkRmlsZUxpc3QubGVuZ3RoICUgMikgKyAodGhpcy5hcnJGZWVkRmlsZUxpc3QubGVuZ3RoIC8gMikpICogMTUwIDogMTUwO1xyXG4gICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgLy9pZih0aGlzLmFyckZlZWRGaWxlTGlzdC5sZW5ndGggPCAxKXtcclxuICAgICAgICAvLyAgICB0aGlzLnJhZExpc3RWaWV3SGVpZ2h0ID0gMDtcclxuICAgICAgICAvL31cclxuICAgICAgICBjb25zb2xlLmxvZyhcImxpc3QgaGVpZ2h0IC0+IFwiICsgdGhpcy5yYWRMaXN0Vmlld0hlaWdodCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmFkTGlzdFZpZXdIZWlnaHQ7XHJcbiAgICB9XHJcbiAgICBvbkltYWdlVGFwKGZlZWQ6RmVlZEluZm9ybWF0aW9uKXtcclxuICAgICAgICBhbGVydChcImluZGV4IFwiICsgZmVlZC5GZWVkX0lkKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIG9uSW1hZ2VSZW1vdmVUYXAoZmlsZUlkKXtcclxuICAgICAgICAvL3ZhciBmaWxlVG9SZW1vdmUgPSB0aGlzLmZlZWRJbmZvRGV0YWlsLk1DX0ZlZWRfRmlsZXMuZmlsdGVyKGZpbGUgPT4gZmlsZS5GaWxlX0lkID09IGZpbGVJZCk7XHJcbiAgICAgICAgdmFyIGZpbGVUb1JlbW92ZSA9IHRoaXMuYXJyRmVlZEZpbGVMaXN0LmZpbHRlcihmaWxlID0+IGZpbGUuRmlsZV9JZCA9PSBmaWxlSWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmlsZSB0byByZW1vdmUgXCIgKyBKU09OLnN0cmluZ2lmeShmaWxlVG9SZW1vdmUpKTtcclxuICAgICAgICBsZXQgaSA9IHRoaXMuYXJyRmVlZEZpbGVMaXN0LmluZGV4T2YoZmlsZVRvUmVtb3ZlWzBdKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImluZGV4IG9mIGZpbGUgXCIgKyBpKTtcclxuXHJcbiAgICAgICAgdGhpcy5hcnJGZWVkRmlsZUxpc3Quc3BsaWNlKGksMSk7XHJcbiAgICAgICAgdGhpcy5nZXRIZWlnaHQoKTtcclxuICAgICAgICAvL3RoaXMuYXJyRmVlZEZpbGVMaXN0Lm5vdGlmeTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbGlzdGVuV2ViVmlld0V2ZW50cygpeyAgXHJcbiAgICAgICAgLy8gaGFuZGxlcyBsYW5ndWFnZSBzZWxlY3Rpb25DaGFuZ2UgZXZlbnQuXHJcbiAgICAgICAgdGhpcy5vV2ViVmlld0ludGVyZmFjZS5vbignd2Vidmlld0NoYW5nZWQnLCAoaGVpZ2h0KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvKmNvbnNvbGUubG9nKFwid2VidmlldyBjaGFuZ2UgXCIgKyBoZWlnaHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIndlYnZpZXcgY2hhbmdlIFwiICsgaGVpZ2h0KTtcclxuICAgICAgICAgICAgdmFyIHZjID0gdGhpcy53ZWJ2aWV3LmFuZHJvaWQuZ2V0TGF5b3V0UGFyYW1zKCk7XHJcbiAgICAgICAgICAgIHZjLndpZHRoPXZjLndpZHRoO1xyXG4gICAgICAgICAgICB2YXIgcmVkdWNlU2l6ZSA9IHZjLmhlaWdodCAtIGhlaWdodDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3ZWJ2aWV3IGhlaWdodCBcIiArIHZjLmhlaWdodCArIFwiIC0gXCIgKyBoZWlnaHQgKyBcIiA9IFwiKyByZWR1Y2VTaXplICk7XHJcbiAgICAgICAgICAgIHZhciBjaGFuZ2VTaXplPXZjLmhlaWdodCAtIHJlZHVjZVNpemU7XHJcbiAgICAgICAgICAgIHZjLmhlaWdodCA9IGhlaWdodCArIDIwMDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjaGFuZ2VzIGhlaWdodCBcIiArIHZjLmhlaWdodCArXCIgLSBcIisgcmVkdWNlU2l6ZSArXCIgPSBcIisgY2hhbmdlU2l6ZSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgXHJcbiAgICAgICAgICAgIHRoaXMud2Vidmlldy5hbmRyb2lkLnNldExheW91dFBhcmFtcyh2Yyk7Ki9cclxuXHJcbiAgICAgICAgICAgIHZhciB2YyA9IHRoaXMud2Vidmlldy5hbmRyb2lkLmdldExheW91dFBhcmFtcygpO1xyXG4gICAgICAgICAgICB2Yy5oZWlnaHQgPSBhbmRyb2lkLnZpZXcuVmlld0dyb3VwLkxheW91dFBhcmFtcy5XUkFQX0NPTlRFTlQ7XHJcbiAgICAgICAgICAgIHRoaXMud2Vidmlldy5hbmRyb2lkLnNldExheW91dFBhcmFtcyh2Yyk7XHJcblxyXG4gICAgICAgICAgICAvKnRoaXMud2Vidmlldy5hbmRyb2lkLnNldExheW91dFBhcmFtcyhcclxuICAgICAgICAgICAgICAgIG5ldyBhbmRyb2lkLndpZGdldC5BYnNvbHV0ZUxheW91dC5MYXlvdXRQYXJhbXNcclxuICAgICAgICAgICAgICAgICAgICAoYW5kcm9pZC52aWV3LlZpZXdHcm91cC5MYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5ULFxyXG4gICAgICAgICAgICAgICAgICAgIGFuZHJvaWQudmlldy5WaWV3R3JvdXAuTGF5b3V0UGFyYW1zLldSQVBfQ09OVEVOVCksXHJcbiAgICAgICAgICAgICAgICAgICAgMCwwXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLndlYnZpZXcuYW5kcm9pZC5yZWxvYWQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIHBhcmFtcyA9IG5ldyBhbmRyb2lkLndpZGdldC5SZWxhdGl2ZUxheW91dC5MYXlvdXRQYXJhbXMoYW5kcm9pZC53aWRnZXQuUmVsYXRpdmVMYXlvdXQuTGF5b3V0UGFyYW1zLkZJTExfUEFSRU5ULCBhbmRyb2lkLndpZGdldC5SZWxhdGl2ZUxheW91dC5MYXlvdXRQYXJhbXMuV1JBUF9DT05URU5UKTsgXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIC8vdGhpcy53ZWJ2aWV3LmFuZHJvaWQuc2V0TGF5b3V0UGFyYW1zKHBhcmFtcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrVXBsb2FkSW1hZ2UoKXtcclxuICAgICAgICBsZXQgbXlGZWVkQ29tcG9uZW50Ok15RmVlZENvbXBvbmVudCA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGZpbGVQYXRoOnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgbGV0IGNvbnRleHQgPSBpbWFnZXBpY2tlci5jcmVhdGUoe1xyXG4gICAgICAgICAgICBtb2RlOiBcIm11bHRpcGxlXCIgLy8gdXNlIFwibXVsdGlwbGVcIiBmb3IgbXVsdGlwbGUgc2VsZWN0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29udGV4dFxyXG4gICAgICAgIC5hdXRob3JpemUoKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGV4dC5wcmVzZW50KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigoc2VsZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIG15RmVlZENvbXBvbmVudC5hcnJGZWVkRmlsZVRvVXBsb2FkTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8RmVlZEZpbGU+KCk7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uKHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBmaWxlUGF0aCA9IHNlbGVjdGVkLmZpbGVVcmk7XHJcbiAgICAgICAgICAgICAgICBpZihpc0lPUyl7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZVBhdGggPSBmaWxlUGF0aC5zdWJzdHJpbmcoNyxmaWxlUGF0aC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1cmk6IFwiICsgZmlsZVBhdGgpOyBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IGZlZWRGaWxlOiBGZWVkRmlsZSA9IG15RmVlZENvbXBvbmVudC5nZXRNY0ZlZWRGaWxlKGZpbGVQYXRoKTtcclxuICAgICAgICAgICAgICAgIG15RmVlZENvbXBvbmVudC5hcnJGZWVkRmlsZVRvVXBsb2FkTGlzdC5wdXNoKGZlZWRGaWxlKTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5hcnJGZWVkRmlsZUxpc3QucHVzaChmZWVkRmlsZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLnRoZW4oKCk9PntcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIgZmVlZCBmaWxlIHNpemUgLS0tPiBcIiArIHRoaXMuYXJyRmVlZEZpbGVUb1VwbG9hZExpc3QubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuYXJyRmVlZEZpbGVUb1VwbG9hZExpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZE11bHRpcGxlRmlsZXModGhpcy5hcnJGZWVkRmlsZVRvVXBsb2FkTGlzdC5nZXRJdGVtKDApLkZpbGVfUGF0aCk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdGhpcy5hcnJGZWVkRmlsZUxpc3QucHVzaChmZWVkRmlsZSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgLy8gcHJvY2VzcyBlcnJvclxyXG4gICAgICAgIH0pOyBcclxuICAgIH1cclxuXHJcbiAgICB1cGxvYWRNdWx0aXBsZUZpbGVzKGZpbGVQYXRoOnN0cmluZyl7XHJcbiAgICAgICAgaWYodGhpcy5maWxlUGFyZW50SWQgPT0gXCJcIiB8fCB0aGlzLmZpbGVQYXJlbnRJZCA9PSBcIjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMFwiKXtcclxuICAgICAgICAgICAgdGhpcy5maWxlUGFyZW50SWQgPSB0aGlzLmNvbW1vblNlcnZpY2UuTmV3R3VpZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcImZpbGUgcGFyZW50IGlkIC0+IFwiICsgdGhpcy5maWxlUGFyZW50SWQpO1xyXG4gICAgICAgIC8vdmFyIGZpbGUgPSBpbWFnZVNvdXJjZS5mcm9tRmlsZShmaWxlUGF0aCk7ICAgXHJcbiAgICAgICAgbGV0IG15RGF0YVNlcnZpY2UgPSB0aGlzLmRhdGFTZXJ2aWNlO1xyXG4gICAgICAgIGxldCBteUZlZWRDb21wb25lbnQ6TXlGZWVkQ29tcG9uZW50ID0gdGhpcztcclxuICAgICAgICBpZighdGhpcy5sb2FkZXIuc2hvdygpKXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZXIuc2hvdyh0aGlzLm9wdGlvbnMpOyAvLyBvcHRpb25zIGlzIG9wdGlvbmFsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzZXJ2ZXJfcmV0dXJuOlJldHVybjtcclxuICAgICAgICB2YXIgdGFzayA9IHRoaXMuZmVlZFNlcnZpY2UudXBsb2FkRmlsZSh0aGlzLmZpbGVQYXJlbnRJZCxmaWxlUGF0aCk7ICAgICAgXHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgdGFzay5vbihcInByb2dyZXNzXCIsIGxvZ0V2ZW50KTtcclxuICAgICAgICB0YXNrLm9uKFwiZXJyb3JcIiwgbG9nRXZlbnQpO1xyXG4gICAgICAgIHRhc2sub24oXCJjb21wbGV0ZVwiLCBsb2dFdmVudCk7XHJcbiAgICAgICAgdGFzay5vbihcInJlc3BvbmRlZFwiLCB1cGxvYWRDb21wbGV0ZSk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBsb2dFdmVudChlKSB7XHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXZlbnQgbmFtZSBcIiArIGUuZXZlbnROYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmKGUuZXZlbnROYW1lID09IFwiZXJyb3JcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiQ2FuJ3QgY29ubmVjdCB0byBzZXJ2ZXIhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaChlKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IgaW4gdXBsb2FkaW5nIHRvIHNlcnZlciFcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IHRoaXMuZmVlZEZpbGVVcGxvYWRlZDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBsb2FkQ29tcGxldGUoY29tcGxldGVFdmVudCkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY29tcGxldGUgXCIgKyBjb21wbGV0ZUV2ZW50LnJlc3BvbnNlLmdldEJvZHlBc1N0cmluZygpKTtcclxuICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICAgLy92YXIgc3RyID0gJ3tcInJlc3VsdFwiOlt7XCJQYXJlbnRfSWRcIjpcIjM2ZTQ5MjM0LTM5ZDQtNDUyMi1iMTVkLTZkMTc5NDUzY2I3N1wiLFwiRmlsZV9JZFwiOlwiY2FhNjIyZjQtYzlmOC00ZTZhLWE4MmItOWRhZmE3MWU4ODMyXCIsXCJDb25kb21pbml1bV9JZFwiOlwiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwXCIsXCJGaWxlX05hbWVcIjpcImJnLmpwZ1wiLFwiRmlsZV9TaXplXCI6MCxcIkZpbGVfUGF0aFwiOlwiOGUzOTE5Y2UtM2JkOC00NTI4LWJkOWEtNDEyN2FlYTA5NDE0L1RlbXBfRmlsZS9kOGQwNDYzYy1mMDUyLTQwMGQtYmIwMi0zMjVkZDI1Nzk0MGQuanBnXCIsXCJBcmNoaXZlXCI6ZmFsc2UsXCJDcmVhdGVkX09uXCI6XCIwMDAxLTAxLTAxVDAwOjAwOjAwXCIsXCJMYXN0X1VwZGF0ZWRfT25cIjpcIjAwMDEtMDEtMDFUMDA6MDA6MDBcIn1dLFwicmVzcG9uc2VcIjp7XCJjb2RlXCI6XCIyMDBcIixcIm1lc3NhZ2VcIjpcIlNhdmUgU3VjY2Vzc2Z1bGx5IVwiLFwidGFyZ2V0XCI6XCJUZW1wX0ZpbGVcIn19JztcclxuICAgICAgICAgICAgICAgIGxldCByZXMgPSBKU09OLnBhcnNlKGNvbXBsZXRlRXZlbnQuZGF0YSlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzcG9uZGVkIC0tPiBcIiArIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlcnZlcl9yZXR1cm4gPSBKU09OLnBhcnNlKGNvbXBsZXRlRXZlbnQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZihzZXJ2ZXJfcmV0dXJuLnJlc3BvbnNlLmNvZGUgPT0gXCIyMDBcIil7XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbXlGaWxlOkZlZWRGaWxlID0gPEZlZWRGaWxlPnNlcnZlcl9yZXR1cm4ucmVzdWx0WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0IC0tPiBcIiArIEpTT04uc3RyaW5naWZ5KG15RmlsZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG15RmVlZENvbXBvbmVudC51cGRhdGVfYXJyRmVlZEZpbGVUb1VwbG9hZExpc3QobXlGaWxlLHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciAtLS0+IFwiICsgZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy90aGlzLmZlZWRGaWxlVXBsb2FkZWQrKztcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIC0tLS0gPiBcIiArIG15RmVlZENvbXBvbmVudC5mZWVkRmlsZVVwbG9hZGVkICsgXCIgLSBcIiArIG15RmVlZENvbXBvbmVudC5hcnJGZWVkRmlsZVRvVXBsb2FkTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgICAgICBpZihteUZlZWRDb21wb25lbnQuZmVlZEZpbGVVcGxvYWRlZCA9PSBteUZlZWRDb21wb25lbnQuYXJyRmVlZEZpbGVUb1VwbG9hZExpc3QubGVuZ3RoLTEpe1xyXG4gICAgICAgICAgICAgICAgbXlGZWVkQ29tcG9uZW50LmxvYWRlci5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmlzaCB1cGxvYWQgIC0tLT4gXCIpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvL215RmVlZENvbXBvbmVudC5hcnJGZWVkRmlsZUxpc3QgPSBteUZlZWRDb21wb25lbnQuYXJyRmVlZEZpbGVUb1VwbG9hZExpc3Q7XHJcbiAgICAgICAgICAgICAgICAvL215RmVlZENvbXBvbmVudC5hcnJGZWVkRmlsZUxpc3Qubm90aWZ5O1xyXG5cclxuICAgICAgICAgICAgICAgIG15RmVlZENvbXBvbmVudC5yZWZyZXNoSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhcnJGZWVkRmlsZUxpc3Qgc2l6ZSAtLT4gXCIgKyBteUZlZWRDb21wb25lbnQuYXJyRmVlZEZpbGVMaXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBteUZlZWRDb21wb25lbnQuYXJyRmVlZEZpbGVMaXN0LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhcnJGZWVkRmlsZUxpc3QgLS0tIGVsZW1lbnQgXCIgKyBKU09OLnN0cmluZ2lmeShlbGVtZW50KSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBteUZlZWRDb21wb25lbnQuZmVlZEZpbGVVcGxvYWRlZCsrO1xyXG4gICAgICAgICAgICAgICAgbXlGZWVkQ29tcG9uZW50LnVwbG9hZE11bHRpcGxlRmlsZXMobXlGZWVkQ29tcG9uZW50LmFyckZlZWRGaWxlVG9VcGxvYWRMaXN0LmdldEl0ZW0obXlGZWVkQ29tcG9uZW50LmZlZWRGaWxlVXBsb2FkZWQpLkZpbGVfUGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHVwZGF0ZV9hcnJGZWVkRmlsZVRvVXBsb2FkTGlzdChmZWVkRmlsZTpGZWVkRmlsZSxwb3NpdGlvbil7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJyZXN1bHQgLS0+IFwiICsgSlNPTi5zdHJpbmdpZnkoZmVlZEZpbGUpICsgXCIgLSBcIisgcG9zaXRpb24pO1xyXG4gICAgICAgIC8vdGhpcy5hcnJGZWVkRmlsZVRvVXBsb2FkTGlzdC5zZXRJdGVtKHBvc2l0aW9uLGZlZWRGaWxlKTsgXHJcbiAgICAgICAgdGhpcy5hcnJGZWVkRmlsZVRvVXBsb2FkTGlzdC5nZXRJdGVtKHBvc2l0aW9uKS5GaWxlX0lkID0gZmVlZEZpbGUuRmlsZV9JZDtcclxuICAgICAgICB0aGlzLmFyckZlZWRGaWxlVG9VcGxvYWRMaXN0LmdldEl0ZW0ocG9zaXRpb24pLlBhcmVudF9JZCA9IGZlZWRGaWxlLlBhcmVudF9JZDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tZmVlZEZpbGVMaXN0XCIrIHRoaXMuYXJyRmVlZEZpbGVUb1VwbG9hZExpc3QubGVuZ3RoICtcIiA9PT09PT09PT09PiBcIisgSlNPTi5zdHJpbmdpZnkodGhpcy5hcnJGZWVkRmlsZVRvVXBsb2FkTGlzdC5nZXRJdGVtKDApKSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBnZXRNY0ZlZWRGaWxlKHBhdGg6c3RyaW5nKXsgLy9HaG1cclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJmZWVkIGZpbGUgcGF0aCAtPiBcIiArIHBhdGgpO1xyXG5cclxuICAgICAgICBsZXQgZmVlZF9maWxlcyA9IG5ldyBGZWVkRmlsZSgpO1xyXG4gICAgICAgIGxldCBmaWxlID0gZmlsZVN5c3RlbS5GaWxlLmZyb21QYXRoKHBhdGgpO1xyXG4gICAgICAgIGZlZWRfZmlsZXMuRmlsZV9JZCA9IFwiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwXCI7XHJcbiAgICAgICAgZmVlZF9maWxlcy5GaWxlX05hbWUgPSBmaWxlLm5hbWU7XHJcbiAgICAgICAgZmVlZF9maWxlcy5GaWxlX1R5cGUgPSBmaWxlLmV4dGVuc2lvbjtcclxuICAgICAgICBmZWVkX2ZpbGVzLkZpbGVfUGF0aCA9IGZpbGUucGF0aDtcclxuICAgICAgICBmZWVkX2ZpbGVzLlNtYWxsX0ZpbGVfUGF0aCA9ICBcImZpbGU6Ly9cIiArIGZpbGUucGF0aDtcclxuICAgICAgICBmZWVkX2ZpbGVzLlBhcmVudF9JZCA9IHRoaXMuZmlsZVBhcmVudElkO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcImZlZWRfZmlsZXMgLT4gXCIgKyBKU09OLnN0cmluZ2lmeShmZWVkX2ZpbGVzKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmZWVkX2ZpbGVzO1xyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFeGNlcHRpb24gLS0+IFwiICsgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hJbWFnZSgpe1xyXG4gICAgICAgIHRoaXMuYXJyRmVlZEZpbGVUb1VwbG9hZExpc3QuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hcnJGZWVkRmlsZUxpc3QucHVzaChlbGVtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5hcnJGZWVkRmlsZUxpc3Qubm90aWZ5O1xyXG4gICAgICAgICAgICB0aGlzLmdldEhlaWdodCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgY3JlYXRlRmVlZERpYWxvZygpe1xyXG4gICAgICAgIGRpYWxvZ3MucHJvbXB0KHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiWW91ciB0aXRsZVwiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIllvdXIgbWVzc2FnZVwiLFxyXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiWW91ciBidXR0b24gdGV4dFwiLFxyXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbCB0ZXh0XCIsXHJcbiAgICAgICAgICAgIG5ldXRyYWxCdXR0b25UZXh0OiBcIk5ldXRyYWwgdGV4dFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0VGV4dDogXCJEZWZhdWx0IHRleHRcIixcclxuICAgICAgICAgICAgaW5wdXRUeXBlOiBkaWFsb2dzLmlucHV0VHlwZS5wYXNzd29yZFxyXG4gICAgICAgIH0pLnRoZW4ociA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIHJlc3VsdDogXCIgKyByLnJlc3VsdCArIFwiLCB0ZXh0OiBcIiArIHIudGV4dCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgIFxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==