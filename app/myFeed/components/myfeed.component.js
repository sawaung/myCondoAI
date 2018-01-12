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
                    //alert(this.createOrUpdate);
                    console.log("myFeed Description -1 " + _this.feedInfoDetail.Description);
                }
                console.log("Feed -->" + JSON.stringify(_this.feedInfoDetail));
            });
        }
        else if (this.route.url["_value"][0]["path"] == "new") {
            this.feedInfoDetail = new myfeed_model_1.FeedInformation();
            this.feedInfoDetail.Title = "";
            this.createOrUpdate = "new";
            //alert(this.createOrUpdate);     
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
            //console.log("feed category id --> " + MyFeedComponent.feedCategoryId);
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
                _this.feedInfoDetail.Description = "";
                if (para != null) {
                    _this.feedInfoDetail.Description = para;
                }
                //console.log("getDescription --> " + para);
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
        //console.log("feed create --> " + JSON.stringify(this.feedInfoDetail));
        //console.log("retrieve date --> " + Date.now().toString());
    };
    MyFeedComponent.prototype.saveFeedInformation = function () {
        var _this = this;
        if (this.createOrUpdate == "new") {
            console.log("saveFeedInformation --> " + JSON.stringify(this.feedInfoDetail));
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
                    //MyFeedDetailComponent.getMyFeedDetailObject().updateFeedDetailUI(this.feedInfoDetail);
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
        console.log("init");
        this.isLoading = true;
        this.feedService.getfeedType()
            .subscribe(function (res) {
            //console.log("getFeedType -> " + JSON.stringify(res));
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
            //console.log("getFeedCategory -> " + JSON.stringify(res));
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
        console.log("view init");
        this.webview = this.webViewRef.nativeElement;
        //this.scrollView = this.scrollViewRef.nativeElement;
        this.page = this.pageRef.nativeElement;
        this.dropDownFeedType = this.page.getViewById("dropDownFeedType");
        this.dropDownFeedCategory = this.page.getViewById("dropDownFeedCategory");
        //this.webview.android.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT));
        this.oWebViewInterface = new nativescript_webview_interface_1.WebViewInterface(this.webview, "~/summer_note/index.html");
        //this.webview.android.setLayoutParams(new android.view.WindowManager.LayoutParams(android.view.WindowManager.LayoutParams.MATCH_PARENT,
        //    android.view.WindowManager.LayoutParams.WRAP_CONTENT));
        this.webview.on('loadFinished', function (args) {
            if (!args.error) {
                if (!platform_1.isIOS) {
                    var _webSetting = android.webkit.WebSettings;
                    console.log("load finished" + "webview hieght " + _this.webview.height);
                    _webSetting = _this.webview.android.getSettings();
                    _webSetting.setLayoutAlgorithm(android.webkit.WebSettings.LayoutAlgorithm.NORMAL);
                    //this.webview.android.setLayoutParams(new org.nativescript.widgets.CommonLayoutParams());    
                    _this.webview.android.getSettings().setBuiltInZoomControls(false);
                    _this.webview.android.getSettings().setDisplayZoomControls(false);
                    var vc = _this.webview.android.getLayoutParams();
                    vc.height = android.view.ViewGroup.LayoutParams.WRAP_CONTENT;
                    _this.webview.android.setLayoutParams(vc);
                }
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
        this.oWebViewInterface.callJSFunction('insertDescription', this.feedInfoDetail.Description);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlmZWVkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15ZmVlZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBcUc7QUFDckcsMENBQXlEO0FBR3pELHNEQUE2RDtBQUs3RCxzREFBK0c7QUFDL0csNkRBQTJEO0FBRTNELG9FQUFrRTtBQUNsRSxzREFBNEQ7QUFHNUQsaUZBQWtFO0FBR2xFLHFDQUFpQztBQUNqQyxpQ0FBbUM7QUFDbkMsaUVBQW1EO0FBSW5ELHNEQUF3RDtBQUN4RCx3Q0FBMEM7QUFDMUMsMkVBQXlFO0FBQ3pFLGlGQUFrRTtBQUVsRSxtRUFBaUU7QUFFakUsb0NBQXNDO0FBQ3RDLHNDQUFpRDtBQUNqRCxrRUFBMkY7QUFDM0YsNEdBQWlHO0FBRWpHLCtFQUEyRTtBQVkzRTtJQStCSSxxREFBcUQ7SUFDckQseUJBQW9CLE1BQWMsRUFBUyxLQUFxQixFQUFTLGdCQUFrQyxFQUMvRixXQUF3QixFQUN2QixXQUF5QixFQUMxQixhQUE0QixFQUMzQixZQUFnQyxFQUNoQyxnQkFBa0M7UUFML0MsaUJBaUZDO1FBakZtQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQy9GLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3ZCLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1FBQzFCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzNCLGlCQUFZLEdBQVosWUFBWSxDQUFvQjtRQUNoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBNUIvQyxnQkFBVyxHQUFHLEtBQUssRUFBVSxDQUFDO1FBQzlCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFLM0IsdUJBQWtCLEdBQUcsSUFBSSxrQ0FBUyxFQUFxQixDQUFDO1FBQ3hELDJCQUFzQixHQUFHLElBQUksa0NBQVMsRUFBcUIsQ0FBQztRQUU1RCxpQkFBWSxH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LHNCQUFDOztDQUFBLEFBL3FCRCxJQStxQkM7QUEvcUJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsLCBTYWZlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlLCBSZXF1ZXN0T3B0aW9ucywgUmVzcG9uc2VDb250ZW50VHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEZlZWRJbmZvcm1hdGlvbiwgRmVlZFR5cGUsIEZlZWRDYXRlZ29yeSwgRmVlZEZpbGUsIFRlbXBvcmFyeUZpbGUsIFJvbGUgfSBmcm9tICcuLi9tb2RlbC9teWZlZWQubW9kZWwnO1xyXG5pbXBvcnQgeyBNeUZlZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbXlmZWVkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29tbW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy9jb21tb24uc2VydmljZSc7XHJcbmltcG9ydCB7IERyb3BEb3duVmFsdWVQYWlyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXJcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBXZWJWaWV3SW50ZXJmYWNlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXdlYnZpZXctaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgV2ViVmlldywgTG9hZEV2ZW50RGF0YSB9IGZyb20gXCJ1aS93ZWItdmlld1wiO1xyXG5pbXBvcnQgeyBTY3JvbGxWaWV3IH0gZnJvbSBcInVpL3Njcm9sbC12aWV3XCI7XHJcbmltcG9ydCB7IGlzSU9TIH0gZnJvbSAncGxhdGZvcm0nO1xyXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSAnYXBwbGljYXRpb24nO1xyXG5pbXBvcnQgeyBWYWx1ZUxpc3QgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBEcm9wRG93biB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2Ryb3AtZG93blwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgKiBhcyBpbWFnZXBpY2tlciBmcm9tIFwibmF0aXZlc2NyaXB0LWltYWdlcGlja2VyXCI7XHJcbmltcG9ydCAqIGFzIGZpbGVTeXN0ZW0gZnJvbSBcImZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBMb2FkaW5nSW5kaWNhdG9yIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xyXG5pbXBvcnQgeyBSZXR1cm59IGZyb20gXCIuLi8uLi9zaGFyZWQvaW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBpb3MgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3N0eWxpbmcvZm9udCc7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSwgTW9kYWxEaWFsb2dPcHRpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBteWZlZWRDcmVhdGVEaWFsb2cgfSBmcm9tIFwiLi4vLi4vbXlGZWVkL2NvbXBvbmVudHMvZGlhbG9nL215ZmVlZENyZWF0ZURpYWxvZy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtSZXNwb25zZSBhcyBteVJlc3BvbnNlfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2ludGVyZmFjZXNcIlxyXG5pbXBvcnQge015RmVlZHNDb21wb25lbnR9IGZyb20gXCIuLi8uLi9teUZlZWQvY29tcG9uZW50cy9teWZlZWRzLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQge015RmVlZERldGFpbENvbXBvbmVudH0gZnJvbSBcIi4uLy4uL215RmVlZC9jb21wb25lbnRzL215ZmVlZGRldGFpbC5jb21wb25lbnRcIjtcclxuXHJcbmRlY2xhcmUgdmFyIGFuZHJvaWQ7XHJcbmRlY2xhcmUgdmFyIG9yZztcclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6ICdhcHAtbXlmZWVkJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnbXlmZWVkLmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vbXlmZWVkLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE15RmVlZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBmZWVkSW5mb0RldGFpbDogRmVlZEluZm9ybWF0aW9uO1xyXG4gICAgcHVibGljIG9XZWJWaWV3SW50ZXJmYWNlOldlYlZpZXdJbnRlcmZhY2U7XHJcbiAgICBwdWJsaWMgd2VidmlldzogV2ViVmlldztcclxuICAgIHNjcm9sbFZpZXc6IFNjcm9sbFZpZXcgO1xyXG4gICAgZmVlZElkOiBhbnk7XHJcbiAgICBmZWVkVHlwZTpBcnJheTxGZWVkVHlwZT47XHJcbiAgICBmZWVkQ2F0ZWdvcnk6QXJyYXk8RmVlZENhdGVnb3J5PjtcclxuICAgIHBhZ2U6UGFnZTtcclxuICAgIGFyckZlZWRUeXBlID0gQXJyYXk8U3RyaW5nPigpO1xyXG4gICAgaXNMb2FkaW5nOiBCb29sZWFuID0gZmFsc2U7XHJcbiAgICByYWRMaXN0Vmlld0hlaWdodDpudW1iZXI7XHJcblxyXG4gICAgZHJvcERvd25GZWVkVHlwZTpEcm9wRG93bjtcclxuICAgIGRyb3BEb3duRmVlZENhdGVnb3J5OkRyb3BEb3duO1xyXG4gICAgZGF0YVNvdXJjZUZlZWRUeXBlID0gbmV3IFZhbHVlTGlzdDxEcm9wRG93blZhbHVlUGFpcj4oKTsgIFxyXG4gICAgZGF0YVNvdXJjZUZlZWRDYXRlZ29yeSA9IG5ldyBWYWx1ZUxpc3Q8RHJvcERvd25WYWx1ZVBhaXI+KCk7ICBcclxuXHJcbiAgICBmaWxlUGFyZW50SWQ6c3RyaW5nID0gXCJcIjtcclxuICAgIGFyckZlZWRGaWxlTGlzdDogT2JzZXJ2YWJsZUFycmF5PEZlZWRGaWxlPjtcclxuICAgIGFyckZlZWRGaWxlVG9VcGxvYWRMaXN0OiBPYnNlcnZhYmxlQXJyYXk8RmVlZEZpbGU+O1xyXG4gICAgZmVlZEZpbGVVcGxvYWRlZDpudW1iZXIgPSAwO1xyXG5cclxuICAgIGxvYWRlcjphbnk7XHJcbiAgICBvcHRpb25zOmFueTtcclxuICAgIGNyZWF0ZU9yVXBkYXRlOnN0cmluZztcclxuICAgIHN0YXRpYyBmZWVkQ2F0ZWdvcnlJZDpzdHJpbmcgPSBcIlwiOyBzdGF0aWMgZmVlZFR5cGVJZDpzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIHB1YmxpYyByZXN1bHQ6IHN0cmluZztcclxuICAgIEBWaWV3Q2hpbGQoXCJwYWdlXCIpIHBhZ2VSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKFwid2ViVmlld1wiKSB3ZWJWaWV3UmVmOiBFbGVtZW50UmVmO1xyXG4gICAgLy9AVmlld0NoaWxkKFwic2Nyb2xsdmlld1wiKSBzY3JvbGxWaWV3UmVmOiBFbGVtZW50UmVmO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgIHB1YmxpYyBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXHJcbiAgICAgICAgIHByaXZhdGUgZmVlZFNlcnZpY2U6TXlGZWVkU2VydmljZSxcclxuICAgICAgICAgcHVibGljIGNvbW1vblNlcnZpY2U6IENvbW1vblNlcnZpY2UsXHJcbiAgICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbERpYWxvZ1NlcnZpY2UsXHJcbiAgICAgICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZil7IFxyXG4gICAgICAgIC8qaWYodGhpcy5yb3V0ZS51cmwgPT0gJy9teWZlZWQvbmV3JyApIHtcclxuXHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpOyAgICAgIFxyXG4gICAgICAgICAgICAvLyBvcHRpb25hbCBvcHRpb25zXHJcbiAgICAgICAgICAgIC8vIGFuZHJvaWQgYW5kIGlvcyBoYXZlIHNvbWUgcGxhdGZvcm0gc3BlY2lmaWMgb3B0aW9uc1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgbWVzc2FnZTogJ0xvYWRpbmcuLi4nLFxyXG4gICAgICAgICAgICBwcm9ncmVzczogMC42NSxcclxuICAgICAgICAgICAgYW5kcm9pZDoge1xyXG4gICAgICAgICAgICBpbmRldGVybWluYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgbWF4OiAxMDAsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwcm9ncmVzc051bWJlckZvcm1hdDogXCIlMWQvJTJkXCIsXHJcbiAgICAgICAgICAgIHByb2dyZXNzUGVyY2VudEZvcm1hdDogMC41MyxcclxuICAgICAgICAgICAgcHJvZ3Jlc3NTdHlsZTogMSxcclxuICAgICAgICAgICAgc2Vjb25kYXJ5UHJvZ3Jlc3M6IDFcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qaW9zOiB7XHJcbiAgICAgICAgICAgICAgICBkZXRhaWxzOiBcIkFkZGl0aW9uYWwgZGV0YWlsIG5vdGUhXCIsXHJcbiAgICAgICAgICAgICAgICBtYXJnaW46IDEwLFxyXG4gICAgICAgICAgICAgICAgZGltQmFja2dyb3VuZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBcIiM0QjlFRDZcIiwgLy8gY29sb3Igb2YgaW5kaWNhdG9yIGFuZCBsYWJlbHNcclxuICAgICAgICAgICAgICAgIC8vIGJhY2tncm91bmQgYm94IGFyb3VuZCBpbmRpY2F0b3JcclxuICAgICAgICAgICAgICAgIC8vIGhpZGVCZXplbCB3aWxsIG92ZXJyaWRlIHRoaXMgaWYgdHJ1ZVxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInllbGxvd1wiLFxyXG4gICAgICAgICAgICAgICAgaGlkZUJlemVsOiB0cnVlLCAvLyBkZWZhdWx0IGZhbHNlLCBjYW4gaGlkZSB0aGUgc3Vycm91bmRpbmcgYmV6ZWxcclxuICAgICAgICAgICAgICAgIHZpZXc6IFVJVmlldywgLy8gVGFyZ2V0IHZpZXcgdG8gc2hvdyBvbiB0b3Agb2YgKERlZmF1bHRzIHRvIGVudGlyZSB3aW5kb3cpXHJcbiAgICAgICAgICAgICAgICBtb2RlOiBNQlByb2dyZXNzSFVETW9kZURldGVybWluYXRlLy8gc2VlIGlPUyBzcGVjaWZpYyBvcHRpb25zIGJlbG93XHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYXJyRmVlZEZpbGVMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxGZWVkRmlsZT4oKTtcclxuICAgICAgICB0aGlzLmFyckZlZWRGaWxlVG9VcGxvYWRMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxGZWVkRmlsZT4oKTtcclxuXHJcbiAgICAgICAgbGV0IGY6RmVlZEZpbGUgPSBuZXcgRmVlZEZpbGUoKTtcclxuICAgICAgICBmLkZlZWRfSWQ9IFwiODczNjg1MWItMTI4Zi00Yzc0LTk3ZTktNjNlOTU4MWE3MGVlXCI7XHJcbiAgICAgICAgZi5GaWxlX0lkID0gXCI5ZjEyMTZiMS05N2Q4LTRhYTEtOWE5Yi1iYjAwMzAwZmU1ZmVcIjtcclxuICAgICAgICBmLkNvbmRvbWluaXVtX0lkPSBcIjhlMzkxOWNlLTNiZDgtNDUyOC1iZDlhLTQxMjdhZWEwOTQxNFwiO1xyXG4gICAgICAgIGYuRmlsZV9OYW1lPSBcImRvd25sb2FkICgzKS5qcGdcIjtcclxuICAgICAgICBmLkZpbGVfUGF0aD0gXCI4ZTM5MTljZS0zYmQ4LTQ1MjgtYmQ5YS00MTI3YWVhMDk0MTQvU2VydmljZXMvMWFkZWQ4ZDQtODQ1Mi00NjQyLTgzMmMtOTExMzFjNzkzODI3LmpwZ1wiO1xyXG4gICAgICAgIGYuRmlsZV9UeXBlPSBcImltYWdlL2pwZWdcIjtcclxuICAgICAgICBmLkFjdHVhbF9GaWxlX1BhdGg9IFwiaHR0cDovLzE5Mi4xNjguMTAwLjI1NDo4MDYyLzhlMzkxOWNlLTNiZDgtNDUyOC1iZDlhLTQxMjdhZWEwOTQxNC9TZXJ2aWNlcy8xYWRlZDhkNC04NDUyLTQ2NDItODMyYy05MTEzMWM3OTM4MjcuanBnXCI7XHJcbiAgICAgICAgZi5TbWFsbF9GaWxlX1BhdGg9IFwiZmlsZTovLy9Vc2Vycy9teWNvbmRvL0xpYnJhcnkvRGV2ZWxvcGVyL0NvcmVTaW11bGF0b3IvRGV2aWNlcy9BRDVCRTIzQS1GRjJFLTQyNEEtQURGMi1EQkY0RTMwMkU0NkUvZGF0YS9NZWRpYS9EQ0lNLzEwMEFQUExFL0lNR18wMDAyLkpQR1wiO1xyXG4gICAgICAgIGYuUGFyZW50X0lkPSBcIjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMFwiO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInJlYWQgdXJsIFwiICsgdGhpcy5yb3V0ZS51cmxbXCJfdmFsdWVcIl1bMF1bXCJwYXRoXCJdKTtcclxuICAgICAgICBpZih0aGlzLnJvdXRlLnVybFtcIl92YWx1ZVwiXVswXVtcInBhdGhcIl0gPT0gXCJlZGl0XCIpe1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4geyAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuZmVlZEluZm9EZXRhaWwgPSBKU09OLnBhcnNlKHBhcmFtc1tcIkZlZWRcIl0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJGZWVkRmlsZUxpc3QucHVzaCh0aGlzLmZlZWRJbmZvRGV0YWlsLk1DX0ZlZWRfRmlsZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZmVlZEluZm9EZXRhaWwgIT0gbnVsbCApe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZmVlZEluZm9EZXRhaWwuTUNfRmVlZF9GaWxlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlUGFyZW50SWQgPSB0aGlzLmZlZWRJbmZvRGV0YWlsLk1DX0ZlZWRfRmlsZXNbMF0uUGFyZW50X0lkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVPclVwZGF0ZSA9IFwidXBkYXRlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgTXlGZWVkQ29tcG9uZW50LmZlZWRUeXBlSWQgPSB0aGlzLmZlZWRJbmZvRGV0YWlsLkZlZWRUeXBlX0lkO1xyXG4gICAgICAgICAgICAgICAgICAgIE15RmVlZENvbXBvbmVudC5mZWVkQ2F0ZWdvcnlJZCA9IHRoaXMuZmVlZEluZm9EZXRhaWwuRmVlZF9DYXRlZ29yeV9JZDtcclxuICAgICAgICAgICAgICAgICAgICAvL2FsZXJ0KHRoaXMuY3JlYXRlT3JVcGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibXlGZWVkIERlc2NyaXB0aW9uIC0xIFwiICsgdGhpcy5mZWVkSW5mb0RldGFpbC5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmVlZCAtLT5cIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuZmVlZEluZm9EZXRhaWwpKTtcclxuICAgICAgICAgICAgfSk7ICBcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLnJvdXRlLnVybFtcIl92YWx1ZVwiXVswXVtcInBhdGhcIl0gPT0gXCJuZXdcIil7XHJcbiAgICAgICAgICAgIHRoaXMuZmVlZEluZm9EZXRhaWwgPSBuZXcgRmVlZEluZm9ybWF0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmVlZEluZm9EZXRhaWwuVGl0bGUgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU9yVXBkYXRlID0gXCJuZXdcIjsgICAgICBcclxuICAgICAgICAgICAgLy9hbGVydCh0aGlzLmNyZWF0ZU9yVXBkYXRlKTsgICAgIFxyXG4gICAgICAgICAgICAvL3RoaXMuYXJyRmVlZEZpbGVMaXN0LnB1c2goZik7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0gICAgXHJcbiAgICBcclxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcclxuICAgIG5nT25Jbml0KCkgeyBcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB0aGlzLmdldEhlaWdodCgpO1xyXG4gICAgICAgIGlmKGlzSU9TKXtcclxuICAgICAgICAgICAvLyB0aGlzLmluaXQoKTtcclxuICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9wZXJhdGlvbiBzeXN0ZW0gLSBJT1NcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3BlcmF0aW9uIHN5c3RlbSAtIEFORFJPSURcIik7XHJcbiAgICAgICAgICAgICAvL2xldCBkZWNvclZpZXcgPSBhcHAuYW5kcm9pZC5zdGFydEFjdGl2aXR5LmdldFdpbmRvdygpLmdldERlY29yVmlldygpO1xyXG4gICAgICAgICAgICAgLy9kZWNvclZpZXcuc2V0U3lzdGVtVWlWaXNpYmlsaXR5KGFuZHJvaWQudmlldy5WaWV3LlNZU1RFTV9VSV9GTEFHX0xJR0hUX1NUQVRVU19CQVIpO1xyXG4gICAgICAgICAgICAgLy9hcHAuYW5kcm9pZC5zdGFydEFjdGl2aXR5LmdldFdpbmRvdygpLmNsZWFyRmxhZ3MoYW5kcm9pZC52aWV3LldpbmRvd01hbmFnZXIuTGF5b3V0UGFyYW1zLkZMQUdfRk9SQ0VfTk9UX0ZVTExTQ1JFRU4pO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmluaXQoKTtcclxuICAgICAgICAgICAgIGFwcC5hbmRyb2lkLnN0YXJ0QWN0aXZpdHkuZ2V0V2luZG93KCkuYWRkRmxhZ3MoYW5kcm9pZC52aWV3LldpbmRvd01hbmFnZXIuTGF5b3V0UGFyYW1zLkZMQUdfRk9SQ0VfTk9UX0ZVTExTQ1JFRU4pO1xyXG4gICAgICAgICAgICAgYXBwLmFuZHJvaWQuc3RhcnRBY3Rpdml0eS5nZXRXaW5kb3coKS5jbGVhckZsYWdzKGFuZHJvaWQudmlldy5XaW5kb3dNYW5hZ2VyLkxheW91dFBhcmFtcy5GTEFHX0ZVTExTQ1JFRU4pO1xyXG4gICAgICAgICAgICAgYXBwLmFuZHJvaWQuc3RhcnRBY3Rpdml0eS5nZXRXaW5kb3coKS5zZXRTb2Z0SW5wdXRNb2RlKGFuZHJvaWQudmlldy5XaW5kb3dNYW5hZ2VyLkxheW91dFBhcmFtcy5TT0ZUX0lOUFVUX0FESlVTVF9QQU4gfCBhbmRyb2lkLnZpZXcuV2luZG93TWFuYWdlci5MYXlvdXRQYXJhbXMuU09GVF9JTlBVVF9TVEFURV9ISURERU4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgXHJcbiAgICB9XHJcbiAgXHJcbiAgICBwdWJsaWMgc2hvd0RpYWxvZygpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZihNeUZlZWRDb21wb25lbnQuZmVlZENhdGVnb3J5SWQgPT0gXCJcIiB8fCBNeUZlZWRDb21wb25lbnQuZmVlZENhdGVnb3J5SWQgPT0gXCIwXCIpe1xyXG4gICAgICAgICAgICBhbGVydChcIlBsZWFzZSBzZWxlY3QgZmVlZCBjYXRlZ29yeSFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9ZWxzZSBpZihNeUZlZWRDb21wb25lbnQuZmVlZFR5cGVJZCA9PSBcIlwiIHx8IE15RmVlZENvbXBvbmVudC5mZWVkVHlwZUlkID09IFwiMFwiKXtcclxuICAgICAgICAgICAgYWxlcnQoXCJQbGVhc2Ugc2VsZWN0IGZlZWQgdHlwZSFcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1lbHNlIGlmKCB0aGlzLmZlZWRJbmZvRGV0YWlsLlRpdGxlID09IFwiXCIpe1xyXG4gICAgICAgICAgICBhbGVydChcIlBsZWFzZSBlbnRlciBmZWVkIHRpdGxlIVwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY3JlYXRlT3JVcGRhdGUgPT0gXCJuZXdcIil7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmlld0NvbnRhaW5lclJlZlxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwobXlmZWVkQ3JlYXRlRGlhbG9nLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRpYWxvZ1Jlc3VsdDogc3RyaW5nKSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRpYWxvZ1Jlc3VsdCA9PSBcInNhdmVfYXNfZHJhZnRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmVlZEluZm9EZXRhaWwuRmVlZF9JZCA9JzAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmVlZEluZm9EZXRhaWwuc3RhdHVzID0gXCJkcmFmdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU9yVXBkYXRlRmVlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGRpYWxvZ1Jlc3VsdCA9PSBcInBvc3RfYW5kX25vdGlmeVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mZWVkSW5mb0RldGFpbC5GZWVkX0lkID0nMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mZWVkSW5mb0RldGFpbC5zdGF0dXMgPSBcIm5vdGlmeVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU9yVXBkYXRlRmVlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGRpYWxvZ1Jlc3VsdCA9PSBcInBvc3RcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmVlZEluZm9EZXRhaWwuRmVlZF9JZCA9JzAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmVlZEluZm9EZXRhaWwuc3RhdHVzID0gXCJwb3N0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlT3JVcGRhdGVGZWVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuY3JlYXRlT3JVcGRhdGUgPT0gXCJ1cGRhdGVcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZlZWRJbmZvRGV0YWlsLkZlZWRfSWQgPSB0aGlzLmZlZWRJbmZvRGV0YWlsLkZlZWRfSWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZlZWRJbmZvRGV0YWlsLlBvc3RfU3RhdHVzID0gdGhpcy5mZWVkSW5mb0RldGFpbC5Qb3N0X1N0YXR1cztcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlT3JVcGRhdGVGZWVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjcmVhdGVPclVwZGF0ZUZlZWQoKXtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIC8vaWYodGhpcy5jcmVhdGVPclVwZGF0ZSA9PSBcIm5ld1wiKXtcclxuICAgICAgICAgICAgLy8gICAgdGhpcy5mZWVkSW5mb0RldGFpbC5GZWVkX0lkID0nMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwJztcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5mZWVkSW5mb0RldGFpbC5Qb3N0X1N0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAvL3RoaXMuZmVlZEluZm9EZXRhaWwuQ29uZG9taW5pdW1fSWQ9IHRoaXMuY29tbW9uU2VydmljZS5nZXRDb25kb0lkO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZmVlZCBjYXRlZ29yeSBpZCAtLT4gXCIgKyBNeUZlZWRDb21wb25lbnQuZmVlZENhdGVnb3J5SWQpO1xyXG4gICAgICAgICAgICB0aGlzLmZlZWRJbmZvRGV0YWlsLkZlZWRfQ2F0ZWdvcnlfSWQgPSBNeUZlZWRDb21wb25lbnQuZmVlZENhdGVnb3J5SWQ7XHJcbiAgICAgICAgICAgIHRoaXMuZmVlZEluZm9EZXRhaWwuRmVlZFR5cGVfSWQ9IE15RmVlZENvbXBvbmVudC5mZWVkVHlwZUlkO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy90aGlzLmZlZWRJbmZvRGV0YWlsLlBvc3RlZF9CeSA9IFwiVFQtQ09ORE9NQU5BR0VSXCI7IC8vcG9zdGVkIGNyZWF0b3JcclxuICAgICAgICAgICAgLy8gdGhpcy5mZWVkSW5mb0RldGFpbC5Qb3N0ZWRfRGF0ZSA9IG5ldyBEYXRlKERhdGUubm93KCkudG9TdHJpbmcoKSk7ICAgICAgICAvL3Bvc3RlZCBjcmVhdGVkIGRhdGVcclxuICAgICAgICAgICAgLy90aGlzLmZlZWRJbmZvRGV0YWlsLmlzQmxvY2tlZCA9IGZhbHNlOyAgLy90aGlzIGZlZWQgaXMgbm90IGJsb2NrZWQgYWxsIHVzZXIgY2FuIHNlZSBpZiBpdCBpcyBwb3N0ZWRcclxuICAgICAgICAgICAgLy90aGlzLmZlZWRJbmZvRGV0YWlsLkNyZWF0ZWRfQnkgPSBcIlRULUNPTkRPTUFOQUdFUlwiO1xyXG4gICAgICAgICAgICAvL3RoaXMuZmVlZEluZm9EZXRhaWwuTGFzdF9VcGRhdGVkX0J5ID0gXCJUVC1DT05ET01BTkFHRVJcIjtcclxuICAgICAgICAgICAgdGhpcy5mZWVkSW5mb0RldGFpbC5GZWVkX0dyb3VwID0gMTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgZmlsZUxpc3QgPSBBcnJheTxGZWVkRmlsZT4oKTsgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmFyckZlZWRGaWxlTGlzdC5mb3JFYWNoKGZlZWQgPT4ge1xyXG4gICAgICAgICAgICAgICBmaWxlTGlzdC5wdXNoKDxGZWVkRmlsZT5mZWVkKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5mZWVkSW5mb0RldGFpbC5NQ19GZWVkX0ZpbGVzID0gZmlsZUxpc3Q7ICAgXHJcblxyXG4gICAgICAgICAgICB0aGlzLm9XZWJWaWV3SW50ZXJmYWNlLmNhbGxKU0Z1bmN0aW9uKCdnZXREZXNjcmlwdGlvbicsbnVsbCwocGFyYSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coIFwid2VidmlldyBoaWVnaHQgXCIgKyAgdGhpcy53ZWJ2aWV3LmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgLy9hbGVydChgJHtvU2VsZWN0ZWRMYW5nfWApO1xyXG4gICAgICAgICAgICAgICAgIHRoaXMuZmVlZEluZm9EZXRhaWwuRGVzY3JpcHRpb24gPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgIGlmKHBhcmEgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mZWVkSW5mb0RldGFpbC5EZXNjcmlwdGlvbiA9IHBhcmE7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJnZXREZXNjcmlwdGlvbiAtLT4gXCIgKyBwYXJhKTtcclxuICAgICAgICAgICAgICAgICB0aGlzLnNhdmVGZWVkSW5mb3JtYXRpb24oKTsgXHJcbiAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL3RoaXMuZmVlZEluZm9EZXRhaWwuRXZlbnRTdGFydERhdGVUaW1lID0gbmV3IERhdGUoXCIxOTAwLTAxLTAxIDAwOjAwOjAwLjAwMFwiKTtcclxuICAgICAgIC8vIHRoaXMuZmVlZEluZm9EZXRhaWwuRXZlbnRFbmREYXRlVGltZSA9IG5ldyBEYXRlKFwiMTkwMC0wMS0wMSAwMDowMDowMC4wMDBcIik7XHJcbiAgICAgICAgLy90aGlzLmZlZWRJbmZvRGV0YWlsLklzU2hvd0VuZERhdGVUaW1lID0gZmFsc2U7XHJcbiAgICAgICAgLy90aGlzLmZlZWRJbmZvRGV0YWlsLkV2ZW50UGxhY2UgPSBcIlwiO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJmZWVkIGNyZWF0ZSAtLT4gXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmZlZWRJbmZvRGV0YWlsKSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInJldHJpZXZlIGRhdGUgLS0+IFwiICsgRGF0ZS5ub3coKS50b1N0cmluZygpKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2F2ZUZlZWRJbmZvcm1hdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5jcmVhdGVPclVwZGF0ZSA9PSBcIm5ld1wiKSB7Ly8gc2F2ZSBmZWVkXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2F2ZUZlZWRJbmZvcm1hdGlvbiAtLT4gXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmZlZWRJbmZvRGV0YWlsKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZlZWRTZXJ2aWNlLnNhdmVGZWVkSW5mbyh0aGlzLmZlZWRJbmZvRGV0YWlsKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5jb21tb25TZXJ2aWNlLnNob3dNZXNzYWdlKHJlcywgJ0ZlZWQgaW5mb3JtYXRpb24gaGFzIGJlZW4gc2F2ZWQgc3VjY2Vzc2Z1bGx5LicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2F2ZUZlZWRJbmZvcm1hdGlvbiAtLT4gXCIgKyBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IHJlc3BvbnNlOm15UmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcy5yZXNwb25zZS4sdGhpcy5kYXRhU2VydmljZS5yZXZpdmVyKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXMucmVzcG9uc2UuY29kZSA9PSBcIjIwMFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzLnJlc3BvbnNlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXMucmVzdWx0WzBdICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZlZWQ6RmVlZEluZm9ybWF0aW9uID0gcmVzLnJlc3VsdFswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25OYXZCdG5UYXAoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNeUZlZWRzQ29tcG9uZW50LmdldE15RmVlZHNPYmplY3QoKS51cGRhdGVNeUZlZWRzVUkoZmVlZCxcIm5ld1wiLG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzLnJlc3BvbnNlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbXlmZWVkJ10pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jcmVhdGVPclVwZGF0ZSA9PSBcInVwZGF0ZVwiKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmZlZWRTZXJ2aWNlLnVwZGF0ZWZlZWRJbmZvKHRoaXMuZmVlZEluZm9EZXRhaWwpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1cGRhdGVGZWVkSW5mb3JtYXRpb24gLS0+IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmNvbW1vblNlcnZpY2Uuc2hvd01lc3NhZ2UocmVzLCAnRmVlZCBJbmZvcm1hdGlvbiBoYXMgYmVlbiB1cGRhdGVkIHN1Y2Nlc3NmdWxseS4nKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXMucmVzcG9uc2UuY29kZSA9PSBcIjIwMFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzLnJlc3BvbnNlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL015RmVlZERldGFpbENvbXBvbmVudC5nZXRNeUZlZWREZXRhaWxPYmplY3QoKS51cGRhdGVGZWVkRGV0YWlsVUkodGhpcy5mZWVkSW5mb0RldGFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHJlcy5yZXNwb25zZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbXlmZWVkJ10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0KCl7XHJcbiAgICAgICAgLy90aGlzLmZlZWRJbmZvRGV0YWlsLkZlZWRfR3JvdXAgPSAxOz1cclxuICAgICAgICAvL3RoaXMuZmVlZEluZm9EZXRhaWwuRmVlZF9JZCA9IHRoaXMuZmVlZElkO1xyXG4gICAgICAgIC8vdGhpcy5mZWVkSW5mb0RldGFpbCA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zWydpZCddO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcImluaXRcIik7XHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZmVlZFNlcnZpY2UuZ2V0ZmVlZFR5cGUoKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZ2V0RmVlZFR5cGUgLT4gXCIgKyBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZlZWRUeXBlID0gcmVzLnJlc3VsdDsgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdHJ5eyBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZHJvcERvd25WYWx1ZVBhaXI7ICBcclxuICAgICAgICAgICAgICAgICAgICBkcm9wRG93blZhbHVlUGFpciA9IG5ldyBEcm9wRG93blZhbHVlUGFpcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRyb3BEb3duVmFsdWVQYWlyLnZhbHVlID0gXCIwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcERvd25WYWx1ZVBhaXIuZGlzcGxheSA9IFwiQWxsXCI7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlRmVlZFR5cGUucHVzaChkcm9wRG93blZhbHVlUGFpcik7ICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRTZWxlY3RlZEZlZWRUeXBlX0lkOm51bWJlcjsgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IDA7ICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmVlZFR5cGUubWFwKCh2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wRG93blZhbHVlUGFpciA9IG5ldyBEcm9wRG93blZhbHVlUGFpcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcERvd25WYWx1ZVBhaXIudmFsdWUgPSAgdi5GZWVkVHlwZV9JZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wRG93blZhbHVlUGFpci5kaXNwbGF5ID0gdi5GZWVkVHlwZV9OYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlRmVlZFR5cGUucHVzaChkcm9wRG93blZhbHVlUGFpcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCArKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHYuRmVlZFR5cGVfSWQgPT0gdGhpcy5mZWVkSW5mb0RldGFpbC5GZWVkVHlwZV9JZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGVkRmVlZFR5cGVfSWQgPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5hcnJGZWVkVHlwZS5wdXNoKHYuRmVlZFR5cGVfTmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3BEb3duRmVlZFR5cGUuaXRlbXMgPSB0aGlzLmRhdGFTb3VyY2VGZWVkVHlwZTsgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jcmVhdGVPclVwZGF0ZSA9PSBcIm5ld1wiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wRG93bkZlZWRUeXBlLnNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuY3JlYXRlT3JVcGRhdGUgPT0gXCJ1cGRhdGVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcERvd25GZWVkVHlwZS5zZWxlY3RlZEluZGV4ID0gY3VycmVudFNlbGVjdGVkRmVlZFR5cGVfSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaChlKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5mZWVkU2VydmljZS5nZXRmZWVkQ2F0ZWdvcnkoKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImdldEZlZWRDYXRlZ29yeSAtPiBcIiArIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mZWVkQ2F0ZWdvcnkgPSByZXMucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgdHJ5eyBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZHJvcERvd25WYWx1ZVBhaXI7ICBcclxuICAgICAgICAgICAgICAgICAgICBkcm9wRG93blZhbHVlUGFpciA9IG5ldyBEcm9wRG93blZhbHVlUGFpcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRyb3BEb3duVmFsdWVQYWlyLnZhbHVlID0gXCIwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcERvd25WYWx1ZVBhaXIuZGlzcGxheSA9IFwiQWxsXCI7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlRmVlZENhdGVnb3J5LnB1c2goZHJvcERvd25WYWx1ZVBhaXIpOyBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFNlbGVjdGVkRmVlZENhdGVnb3J5X0lkOm51bWJlcjsgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IDA7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mZWVkQ2F0ZWdvcnkubWFwKCh2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wRG93blZhbHVlUGFpciA9IG5ldyBEcm9wRG93blZhbHVlUGFpcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcERvd25WYWx1ZVBhaXIudmFsdWUgPSAgdi5GZWVkX0NhdGVnb3J5X0lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcERvd25WYWx1ZVBhaXIuZGlzcGxheSA9IHYuRmVlZF9DYXRlZ29yeV9OYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlRmVlZENhdGVnb3J5LnB1c2goZHJvcERvd25WYWx1ZVBhaXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ICsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodi5GZWVkX0NhdGVnb3J5X0lkID09IHRoaXMuZmVlZEluZm9EZXRhaWwuRmVlZF9DYXRlZ29yeV9JZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGVkRmVlZENhdGVnb3J5X0lkID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuYXJyRmVlZFR5cGUucHVzaCh2LkZlZWRUeXBlX05hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3BEb3duRmVlZENhdGVnb3J5Lml0ZW1zID0gdGhpcy5kYXRhU291cmNlRmVlZENhdGVnb3J5OyBcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmNyZWF0ZU9yVXBkYXRlID09IFwibmV3XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3BEb3duRmVlZENhdGVnb3J5LnNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuY3JlYXRlT3JVcGRhdGUgPT0gXCJ1cGRhdGVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcERvd25GZWVkQ2F0ZWdvcnkuc2VsZWN0ZWRJbmRleCA9IGN1cnJlbnRTZWxlY3RlZEZlZWRDYXRlZ29yeV9JZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidmlldyBpbml0XCIpO1xyXG4gICAgICAgIHRoaXMud2VidmlldyA9IHRoaXMud2ViVmlld1JlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIC8vdGhpcy5zY3JvbGxWaWV3ID0gdGhpcy5zY3JvbGxWaWV3UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5wYWdlID0gdGhpcy5wYWdlUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIHRoaXMuZHJvcERvd25GZWVkVHlwZSA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZDxEcm9wRG93bj4oXCJkcm9wRG93bkZlZWRUeXBlXCIpO1xyXG4gICAgICAgIHRoaXMuZHJvcERvd25GZWVkQ2F0ZWdvcnkgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQ8RHJvcERvd24+KFwiZHJvcERvd25GZWVkQ2F0ZWdvcnlcIik7XHJcbiAgICAgICBcclxuICAgICAgICAvL3RoaXMud2Vidmlldy5hbmRyb2lkLnNldExheW91dFBhcmFtcyhuZXcgYW5kcm9pZC53aWRnZXQuTGluZWFyTGF5b3V0LkxheW91dFBhcmFtcyhhbmRyb2lkLnZpZXcuVmlld0dyb3VwLkxheW91dFBhcmFtcy5XUkFQX0NPTlRFTlQsIGFuZHJvaWQudmlldy5WaWV3R3JvdXAuTGF5b3V0UGFyYW1zLldSQVBfQ09OVEVOVCkpO1xyXG4gICAgICAgIHRoaXMub1dlYlZpZXdJbnRlcmZhY2UgPSBuZXcgV2ViVmlld0ludGVyZmFjZSh0aGlzLndlYnZpZXcsIFwifi9zdW1tZXJfbm90ZS9pbmRleC5odG1sXCIpO1xyXG4gICAgICAgXHJcbiAgICAgICBcclxuICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy53ZWJ2aWV3LmFuZHJvaWQuc2V0TGF5b3V0UGFyYW1zKG5ldyBhbmRyb2lkLnZpZXcuV2luZG93TWFuYWdlci5MYXlvdXRQYXJhbXMoYW5kcm9pZC52aWV3LldpbmRvd01hbmFnZXIuTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVCxcclxuICAgICAgICAvLyAgICBhbmRyb2lkLnZpZXcuV2luZG93TWFuYWdlci5MYXlvdXRQYXJhbXMuV1JBUF9DT05URU5UKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy53ZWJ2aWV3Lm9uKCdsb2FkRmluaXNoZWQnLCAoYXJncykgPT4ge1xyXG4gICAgICAgICAgaWYgKCFhcmdzLmVycm9yKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZighaXNJT1Mpe1xyXG4gICAgICAgICAgICAgICAgdmFyIF93ZWJTZXR0aW5nID0gYW5kcm9pZC53ZWJraXQuV2ViU2V0dGluZ3M7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2FkIGZpbmlzaGVkXCIgKyBcIndlYnZpZXcgaGllZ2h0IFwiICsgIHRoaXMud2Vidmlldy5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgIF93ZWJTZXR0aW5nID0gdGhpcy53ZWJ2aWV3LmFuZHJvaWQuZ2V0U2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICBfd2ViU2V0dGluZy5zZXRMYXlvdXRBbGdvcml0aG0oYW5kcm9pZC53ZWJraXQuV2ViU2V0dGluZ3MuTGF5b3V0QWxnb3JpdGhtLk5PUk1BTCk7ICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIC8vdGhpcy53ZWJ2aWV3LmFuZHJvaWQuc2V0TGF5b3V0UGFyYW1zKG5ldyBvcmcubmF0aXZlc2NyaXB0LndpZGdldHMuQ29tbW9uTGF5b3V0UGFyYW1zKCkpOyAgICBcclxuICAgICAgICAgICAgICB0aGlzLndlYnZpZXcuYW5kcm9pZC5nZXRTZXR0aW5ncygpLnNldEJ1aWx0SW5ab29tQ29udHJvbHMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgIHRoaXMud2Vidmlldy5hbmRyb2lkLmdldFNldHRpbmdzKCkuc2V0RGlzcGxheVpvb21Db250cm9scyhmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHZjID0gdGhpcy53ZWJ2aWV3LmFuZHJvaWQuZ2V0TGF5b3V0UGFyYW1zKCk7XHJcbiAgICAgICAgICAgICAgICB2Yy5oZWlnaHQgPSBhbmRyb2lkLnZpZXcuVmlld0dyb3VwLkxheW91dFBhcmFtcy5XUkFQX0NPTlRFTlQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYnZpZXcuYW5kcm9pZC5zZXRMYXlvdXRQYXJhbXModmMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIHRoaXMuaW5zZXJ0RGVzY3JpcHRpb24oKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIC8vdGhpcy5saXN0ZW5XZWJWaWV3RXZlbnRzKCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXMgbG9hZGVkIGxvYWVkXCIpO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgIH1cclxuXHJcbiAgICBvbmNoYW5nZUZlZWRUeXBlKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkVmFsdWUgPSB0aGlzLmRhdGFTb3VyY2VGZWVkVHlwZS5nZXRWYWx1ZSh0aGlzLmRyb3BEb3duRmVlZFR5cGUuc2VsZWN0ZWRJbmRleCk7ICAgICAgXHJcbiAgICAgICAgTXlGZWVkQ29tcG9uZW50LmZlZWRUeXBlSWQgPSBzZWxlY3RlZFZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZWxlY3RlZFZhbHVlIFwiICsgc2VsZWN0ZWRWYWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgRHJvcCBEb3duIHNlbGVjdGVkIGluZGV4IGNoYW5nZWQgZnJvbSAke2FyZ3Mub2xkSW5kZXh9IHRvICR7YXJncy5uZXdJbmRleH1gKTtcclxuICAgIH1cclxuICAgIG9uY2hhbmdlRmVlZENhdGVnb3J5KGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkVmFsdWUgPSB0aGlzLmRhdGFTb3VyY2VGZWVkQ2F0ZWdvcnkuZ2V0VmFsdWUodGhpcy5kcm9wRG93bkZlZWRDYXRlZ29yeS5zZWxlY3RlZEluZGV4KTtcclxuXHJcbiAgICAgICAgIE15RmVlZENvbXBvbmVudC5mZWVkQ2F0ZWdvcnlJZCA9IHNlbGVjdGVkVmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImZlZWQgY2F0ZWdvcnkgSWQgXCIgKyBzZWxlY3RlZFZhbHVlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgRHJvcCBEb3duIHNlbGVjdGVkIGluZGV4IGNoYW5nZWQgZnJvbSAke2FyZ3Mub2xkSW5kZXh9IHRvICR7YXJncy5uZXdJbmRleH1gKTtcclxuICAgIH1cclxuICAgIG9ub3Blbigpe1xyXG5cclxuICAgIH1cclxuICAgIG9uY2xvc2UoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25OYXZCdG5UYXAoKXtcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XHJcbiAgICB9ICAgXHJcbiAgICBcclxuICAgIGdldERlc2NyaXB0aW9uKCk6YW55IHtcclxuICAgICAgICB0aGlzLm9XZWJWaWV3SW50ZXJmYWNlLmNhbGxKU0Z1bmN0aW9uKCdnZXREZXNjcmlwdGlvbicsbnVsbCwocGFyYSkgPT4ge1xyXG4gICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCBcIndlYnZpZXcgaGllZ2h0IFwiICsgIHRoaXMud2Vidmlldy5oZWlnaHQpO1xyXG4gICAgICAgICAgICAvL2FsZXJ0KGAke29TZWxlY3RlZExhbmd9YCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibXlEcmkgLS0+IFwiICsgcGFyYSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qdGhpcy5vV2ViVmlld0ludGVyZmFjZS5jYWxsSlNGdW5jdGlvbignZG9jdW1lbnRIZWlnaHQnLG51bGwsKHBhcmEpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coIFwiYm9keSBoaWVnaHQgXCIgKyBwYXJhKTtcclxuICAgICAgICB9KTsqL1xyXG4gICAgfVxyXG4gICAgaW5zZXJ0RGVzY3JpcHRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5vV2ViVmlld0ludGVyZmFjZS5jYWxsSlNGdW5jdGlvbignaW5zZXJ0RGVzY3JpcHRpb24nLHRoaXMuZmVlZEluZm9EZXRhaWwuRGVzY3JpcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEhlaWdodCgpe1xyXG4gICAgICAgIC8vaWYodGhpcy5hcnJGZWVkRmlsZUxpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgdGhpcy5yYWRMaXN0Vmlld0hlaWdodCA9IHRoaXMuYXJyRmVlZEZpbGVMaXN0Lmxlbmd0aCA+IDIgPyAoKHRoaXMuYXJyRmVlZEZpbGVMaXN0Lmxlbmd0aCAlIDIpICsgKHRoaXMuYXJyRmVlZEZpbGVMaXN0Lmxlbmd0aCAvIDIpKSAqIDE1MCA6IDE1MDtcclxuICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgIC8vaWYodGhpcy5hcnJGZWVkRmlsZUxpc3QubGVuZ3RoIDwgMSl7XHJcbiAgICAgICAgLy8gICAgdGhpcy5yYWRMaXN0Vmlld0hlaWdodCA9IDA7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJsaXN0IGhlaWdodCAtPiBcIiArIHRoaXMucmFkTGlzdFZpZXdIZWlnaHQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJhZExpc3RWaWV3SGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgb25JbWFnZVRhcChmZWVkOkZlZWRJbmZvcm1hdGlvbil7XHJcbiAgICAgICAgYWxlcnQoXCJpbmRleCBcIiArIGZlZWQuRmVlZF9JZCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBvbkltYWdlUmVtb3ZlVGFwKGZpbGVJZCl7XHJcbiAgICAgICAgLy92YXIgZmlsZVRvUmVtb3ZlID0gdGhpcy5mZWVkSW5mb0RldGFpbC5NQ19GZWVkX0ZpbGVzLmZpbHRlcihmaWxlID0+IGZpbGUuRmlsZV9JZCA9PSBmaWxlSWQpO1xyXG4gICAgICAgIHZhciBmaWxlVG9SZW1vdmUgPSB0aGlzLmFyckZlZWRGaWxlTGlzdC5maWx0ZXIoZmlsZSA9PiBmaWxlLkZpbGVfSWQgPT0gZmlsZUlkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImZpbGUgdG8gcmVtb3ZlIFwiICsgSlNPTi5zdHJpbmdpZnkoZmlsZVRvUmVtb3ZlKSk7XHJcbiAgICAgICAgbGV0IGkgPSB0aGlzLmFyckZlZWRGaWxlTGlzdC5pbmRleE9mKGZpbGVUb1JlbW92ZVswXSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJpbmRleCBvZiBmaWxlIFwiICsgaSk7XHJcblxyXG4gICAgICAgIHRoaXMuYXJyRmVlZEZpbGVMaXN0LnNwbGljZShpLDEpO1xyXG4gICAgICAgIHRoaXMuZ2V0SGVpZ2h0KCk7XHJcbiAgICAgICAgLy90aGlzLmFyckZlZWRGaWxlTGlzdC5ub3RpZnk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxpc3RlbldlYlZpZXdFdmVudHMoKXsgIFxyXG4gICAgICAgIC8vIGhhbmRsZXMgbGFuZ3VhZ2Ugc2VsZWN0aW9uQ2hhbmdlIGV2ZW50LlxyXG4gICAgICAgIHRoaXMub1dlYlZpZXdJbnRlcmZhY2Uub24oJ3dlYnZpZXdDaGFuZ2VkJywgKGhlaWdodCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgLypjb25zb2xlLmxvZyhcIndlYnZpZXcgY2hhbmdlIFwiICsgaGVpZ2h0KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3ZWJ2aWV3IGNoYW5nZSBcIiArIGhlaWdodCk7XHJcbiAgICAgICAgICAgIHZhciB2YyA9IHRoaXMud2Vidmlldy5hbmRyb2lkLmdldExheW91dFBhcmFtcygpO1xyXG4gICAgICAgICAgICB2Yy53aWR0aD12Yy53aWR0aDtcclxuICAgICAgICAgICAgdmFyIHJlZHVjZVNpemUgPSB2Yy5oZWlnaHQgLSBoZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid2VidmlldyBoZWlnaHQgXCIgKyB2Yy5oZWlnaHQgKyBcIiAtIFwiICsgaGVpZ2h0ICsgXCIgPSBcIisgcmVkdWNlU2l6ZSApO1xyXG4gICAgICAgICAgICB2YXIgY2hhbmdlU2l6ZT12Yy5oZWlnaHQgLSByZWR1Y2VTaXplO1xyXG4gICAgICAgICAgICB2Yy5oZWlnaHQgPSBoZWlnaHQgKyAyMDA7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hhbmdlcyBoZWlnaHQgXCIgKyB2Yy5oZWlnaHQgK1wiIC0gXCIrIHJlZHVjZVNpemUgK1wiID0gXCIrIGNoYW5nZVNpemUpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgIFxyXG4gICAgICAgICAgICB0aGlzLndlYnZpZXcuYW5kcm9pZC5zZXRMYXlvdXRQYXJhbXModmMpOyovXHJcblxyXG4gICAgICAgICAgICB2YXIgdmMgPSB0aGlzLndlYnZpZXcuYW5kcm9pZC5nZXRMYXlvdXRQYXJhbXMoKTtcclxuICAgICAgICAgICAgdmMuaGVpZ2h0ID0gYW5kcm9pZC52aWV3LlZpZXdHcm91cC5MYXlvdXRQYXJhbXMuV1JBUF9DT05URU5UO1xyXG4gICAgICAgICAgICB0aGlzLndlYnZpZXcuYW5kcm9pZC5zZXRMYXlvdXRQYXJhbXModmMpO1xyXG5cclxuICAgICAgICAgICAgLyp0aGlzLndlYnZpZXcuYW5kcm9pZC5zZXRMYXlvdXRQYXJhbXMoXHJcbiAgICAgICAgICAgICAgICBuZXcgYW5kcm9pZC53aWRnZXQuQWJzb2x1dGVMYXlvdXQuTGF5b3V0UGFyYW1zXHJcbiAgICAgICAgICAgICAgICAgICAgKGFuZHJvaWQudmlldy5WaWV3R3JvdXAuTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVCxcclxuICAgICAgICAgICAgICAgICAgICBhbmRyb2lkLnZpZXcuVmlld0dyb3VwLkxheW91dFBhcmFtcy5XUkFQX0NPTlRFTlQpLFxyXG4gICAgICAgICAgICAgICAgICAgIDAsMFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIC8vdGhpcy53ZWJ2aWV3LmFuZHJvaWQucmVsb2FkKCk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBwYXJhbXMgPSBuZXcgYW5kcm9pZC53aWRnZXQuUmVsYXRpdmVMYXlvdXQuTGF5b3V0UGFyYW1zKGFuZHJvaWQud2lkZ2V0LlJlbGF0aXZlTGF5b3V0LkxheW91dFBhcmFtcy5GSUxMX1BBUkVOVCwgYW5kcm9pZC53aWRnZXQuUmVsYXRpdmVMYXlvdXQuTGF5b3V0UGFyYW1zLldSQVBfQ09OVEVOVCk7IFxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAvL3RoaXMud2Vidmlldy5hbmRyb2lkLnNldExheW91dFBhcmFtcyhwYXJhbXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja1VwbG9hZEltYWdlKCl7XHJcbiAgICAgICAgbGV0IG15RmVlZENvbXBvbmVudDpNeUZlZWRDb21wb25lbnQgPSB0aGlzO1xyXG4gICAgICAgIGxldCBmaWxlUGF0aDpzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGxldCBjb250ZXh0ID0gaW1hZ2VwaWNrZXIuY3JlYXRlKHtcclxuICAgICAgICAgICAgbW9kZTogXCJtdWx0aXBsZVwiIC8vIHVzZSBcIm11bHRpcGxlXCIgZm9yIG11bHRpcGxlIHNlbGVjdGlvblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnRleHRcclxuICAgICAgICAuYXV0aG9yaXplKClcclxuICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQucHJlc2VudCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKHNlbGVjdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBteUZlZWRDb21wb25lbnQuYXJyRmVlZEZpbGVUb1VwbG9hZExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEZlZWRGaWxlPigpO1xyXG4gICAgICAgICAgICBzZWxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbihzZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgZmlsZVBhdGggPSBzZWxlY3RlZC5maWxlVXJpO1xyXG4gICAgICAgICAgICAgICAgaWYoaXNJT1Mpe1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVQYXRoID0gZmlsZVBhdGguc3Vic3RyaW5nKDcsZmlsZVBhdGgubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXJpOiBcIiArIGZpbGVQYXRoKTsgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBmZWVkRmlsZTogRmVlZEZpbGUgPSBteUZlZWRDb21wb25lbnQuZ2V0TWNGZWVkRmlsZShmaWxlUGF0aCk7XHJcbiAgICAgICAgICAgICAgICBteUZlZWRDb21wb25lbnQuYXJyRmVlZEZpbGVUb1VwbG9hZExpc3QucHVzaChmZWVkRmlsZSk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuYXJyRmVlZEZpbGVMaXN0LnB1c2goZmVlZEZpbGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS50aGVuKCgpPT57XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIGZlZWQgZmlsZSBzaXplIC0tLT4gXCIgKyB0aGlzLmFyckZlZWRGaWxlVG9VcGxvYWRMaXN0Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLmFyckZlZWRGaWxlVG9VcGxvYWRMaXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGxvYWRNdWx0aXBsZUZpbGVzKHRoaXMuYXJyRmVlZEZpbGVUb1VwbG9hZExpc3QuZ2V0SXRlbSgwKS5GaWxlX1BhdGgpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3RoaXMuYXJyRmVlZEZpbGVMaXN0LnB1c2goZmVlZEZpbGUpO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIC8vIHByb2Nlc3MgZXJyb3JcclxuICAgICAgICB9KTsgXHJcbiAgICB9XHJcblxyXG4gICAgdXBsb2FkTXVsdGlwbGVGaWxlcyhmaWxlUGF0aDpzdHJpbmcpe1xyXG4gICAgICAgIGlmKHRoaXMuZmlsZVBhcmVudElkID09IFwiXCIgfHwgdGhpcy5maWxlUGFyZW50SWQgPT0gXCIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDBcIil7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsZVBhcmVudElkID0gdGhpcy5jb21tb25TZXJ2aWNlLk5ld0d1aWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJmaWxlIHBhcmVudCBpZCAtPiBcIiArIHRoaXMuZmlsZVBhcmVudElkKTtcclxuICAgICAgICAvL3ZhciBmaWxlID0gaW1hZ2VTb3VyY2UuZnJvbUZpbGUoZmlsZVBhdGgpOyAgIFxyXG4gICAgICAgIGxldCBteURhdGFTZXJ2aWNlID0gdGhpcy5kYXRhU2VydmljZTtcclxuICAgICAgICBsZXQgbXlGZWVkQ29tcG9uZW50Ok15RmVlZENvbXBvbmVudCA9IHRoaXM7XHJcbiAgICAgICAgaWYoIXRoaXMubG9hZGVyLnNob3coKSl7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVyLnNob3codGhpcy5vcHRpb25zKTsgLy8gb3B0aW9ucyBpcyBvcHRpb25hbFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2VydmVyX3JldHVybjpSZXR1cm47XHJcbiAgICAgICAgdmFyIHRhc2sgPSB0aGlzLmZlZWRTZXJ2aWNlLnVwbG9hZEZpbGUodGhpcy5maWxlUGFyZW50SWQsZmlsZVBhdGgpOyAgICAgIFxyXG4gICAgICAgXHJcblxyXG4gICAgICAgIHRhc2sub24oXCJwcm9ncmVzc1wiLCBsb2dFdmVudCk7XHJcbiAgICAgICAgdGFzay5vbihcImVycm9yXCIsIGxvZ0V2ZW50KTtcclxuICAgICAgICB0YXNrLm9uKFwiY29tcGxldGVcIiwgbG9nRXZlbnQpO1xyXG4gICAgICAgIHRhc2sub24oXCJyZXNwb25kZWRcIiwgdXBsb2FkQ29tcGxldGUpO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gbG9nRXZlbnQoZSkge1xyXG4gICAgICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImV2ZW50IG5hbWUgXCIgKyBlLmV2ZW50TmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZihlLmV2ZW50TmFtZSA9PSBcImVycm9yXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIkNhbid0IGNvbm5lY3QgdG8gc2VydmVyIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2goZSl7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkVycm9yIGluIHVwbG9hZGluZyB0byBzZXJ2ZXIhXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSB0aGlzLmZlZWRGaWxlVXBsb2FkZWQ7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHVwbG9hZENvbXBsZXRlKGNvbXBsZXRlRXZlbnQpIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImNvbXBsZXRlIFwiICsgY29tcGxldGVFdmVudC5yZXNwb25zZS5nZXRCb2R5QXNTdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgIC8vdmFyIHN0ciA9ICd7XCJyZXN1bHRcIjpbe1wiUGFyZW50X0lkXCI6XCIzNmU0OTIzNC0zOWQ0LTQ1MjItYjE1ZC02ZDE3OTQ1M2NiNzdcIixcIkZpbGVfSWRcIjpcImNhYTYyMmY0LWM5ZjgtNGU2YS1hODJiLTlkYWZhNzFlODgzMlwiLFwiQ29uZG9taW5pdW1fSWRcIjpcIjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMFwiLFwiRmlsZV9OYW1lXCI6XCJiZy5qcGdcIixcIkZpbGVfU2l6ZVwiOjAsXCJGaWxlX1BhdGhcIjpcIjhlMzkxOWNlLTNiZDgtNDUyOC1iZDlhLTQxMjdhZWEwOTQxNC9UZW1wX0ZpbGUvZDhkMDQ2M2MtZjA1Mi00MDBkLWJiMDItMzI1ZGQyNTc5NDBkLmpwZ1wiLFwiQXJjaGl2ZVwiOmZhbHNlLFwiQ3JlYXRlZF9PblwiOlwiMDAwMS0wMS0wMVQwMDowMDowMFwiLFwiTGFzdF9VcGRhdGVkX09uXCI6XCIwMDAxLTAxLTAxVDAwOjAwOjAwXCJ9XSxcInJlc3BvbnNlXCI6e1wiY29kZVwiOlwiMjAwXCIsXCJtZXNzYWdlXCI6XCJTYXZlIFN1Y2Nlc3NmdWxseSFcIixcInRhcmdldFwiOlwiVGVtcF9GaWxlXCJ9fSc7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzID0gSlNPTi5wYXJzZShjb21wbGV0ZUV2ZW50LmRhdGEpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3BvbmRlZCAtLT4gXCIgKyBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJfcmV0dXJuID0gSlNPTi5wYXJzZShjb21wbGV0ZUV2ZW50LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYoc2VydmVyX3JldHVybi5yZXNwb25zZS5jb2RlID09IFwiMjAwXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG15RmlsZTpGZWVkRmlsZSA9IDxGZWVkRmlsZT5zZXJ2ZXJfcmV0dXJuLnJlc3VsdFswXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3VsdCAtLT4gXCIgKyBKU09OLnN0cmluZ2lmeShteUZpbGUpKTtcclxuICAgICAgICAgICAgICAgICAgICBteUZlZWRDb21wb25lbnQudXBkYXRlX2FyckZlZWRGaWxlVG9VcGxvYWRMaXN0KG15RmlsZSxwb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgLS0tPiBcIiArIGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdGhpcy5mZWVkRmlsZVVwbG9hZGVkKys7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiAtLS0tID4gXCIgKyBteUZlZWRDb21wb25lbnQuZmVlZEZpbGVVcGxvYWRlZCArIFwiIC0gXCIgKyBteUZlZWRDb21wb25lbnQuYXJyRmVlZEZpbGVUb1VwbG9hZExpc3QubGVuZ3RoKTtcclxuICAgICAgICAgICAgaWYobXlGZWVkQ29tcG9uZW50LmZlZWRGaWxlVXBsb2FkZWQgPT0gbXlGZWVkQ29tcG9uZW50LmFyckZlZWRGaWxlVG9VcGxvYWRMaXN0Lmxlbmd0aC0xKXtcclxuICAgICAgICAgICAgICAgIG15RmVlZENvbXBvbmVudC5sb2FkZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaW5pc2ggdXBsb2FkICAtLS0+IFwiKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy9teUZlZWRDb21wb25lbnQuYXJyRmVlZEZpbGVMaXN0ID0gbXlGZWVkQ29tcG9uZW50LmFyckZlZWRGaWxlVG9VcGxvYWRMaXN0O1xyXG4gICAgICAgICAgICAgICAgLy9teUZlZWRDb21wb25lbnQuYXJyRmVlZEZpbGVMaXN0Lm5vdGlmeTtcclxuXHJcbiAgICAgICAgICAgICAgICBteUZlZWRDb21wb25lbnQucmVmcmVzaEltYWdlKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYXJyRmVlZEZpbGVMaXN0IHNpemUgLS0+IFwiICsgbXlGZWVkQ29tcG9uZW50LmFyckZlZWRGaWxlTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgbXlGZWVkQ29tcG9uZW50LmFyckZlZWRGaWxlTGlzdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYXJyRmVlZEZpbGVMaXN0IC0tLSBlbGVtZW50IFwiICsgSlNPTi5zdHJpbmdpZnkoZWxlbWVudCkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbXlGZWVkQ29tcG9uZW50LmZlZWRGaWxlVXBsb2FkZWQrKztcclxuICAgICAgICAgICAgICAgIG15RmVlZENvbXBvbmVudC51cGxvYWRNdWx0aXBsZUZpbGVzKG15RmVlZENvbXBvbmVudC5hcnJGZWVkRmlsZVRvVXBsb2FkTGlzdC5nZXRJdGVtKG15RmVlZENvbXBvbmVudC5mZWVkRmlsZVVwbG9hZGVkKS5GaWxlX1BhdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICB1cGRhdGVfYXJyRmVlZEZpbGVUb1VwbG9hZExpc3QoZmVlZEZpbGU6RmVlZEZpbGUscG9zaXRpb24pe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0IC0tPiBcIiArIEpTT04uc3RyaW5naWZ5KGZlZWRGaWxlKSArIFwiIC0gXCIrIHBvc2l0aW9uKTtcclxuICAgICAgICAvL3RoaXMuYXJyRmVlZEZpbGVUb1VwbG9hZExpc3Quc2V0SXRlbShwb3NpdGlvbixmZWVkRmlsZSk7IFxyXG4gICAgICAgIHRoaXMuYXJyRmVlZEZpbGVUb1VwbG9hZExpc3QuZ2V0SXRlbShwb3NpdGlvbikuRmlsZV9JZCA9IGZlZWRGaWxlLkZpbGVfSWQ7XHJcbiAgICAgICAgdGhpcy5hcnJGZWVkRmlsZVRvVXBsb2FkTGlzdC5nZXRJdGVtKHBvc2l0aW9uKS5QYXJlbnRfSWQgPSBmZWVkRmlsZS5QYXJlbnRfSWQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLWZlZWRGaWxlTGlzdFwiKyB0aGlzLmFyckZlZWRGaWxlVG9VcGxvYWRMaXN0Lmxlbmd0aCArXCIgPT09PT09PT09PT4gXCIrIEpTT04uc3RyaW5naWZ5KHRoaXMuYXJyRmVlZEZpbGVUb1VwbG9hZExpc3QuZ2V0SXRlbSgwKSkpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgZ2V0TWNGZWVkRmlsZShwYXRoOnN0cmluZyl7IC8vR2htXHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmVlZCBmaWxlIHBhdGggLT4gXCIgKyBwYXRoKTtcclxuXHJcbiAgICAgICAgbGV0IGZlZWRfZmlsZXMgPSBuZXcgRmVlZEZpbGUoKTtcclxuICAgICAgICBsZXQgZmlsZSA9IGZpbGVTeXN0ZW0uRmlsZS5mcm9tUGF0aChwYXRoKTtcclxuICAgICAgICBmZWVkX2ZpbGVzLkZpbGVfSWQgPSBcIjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMFwiO1xyXG4gICAgICAgIGZlZWRfZmlsZXMuRmlsZV9OYW1lID0gZmlsZS5uYW1lO1xyXG4gICAgICAgIGZlZWRfZmlsZXMuRmlsZV9UeXBlID0gZmlsZS5leHRlbnNpb247XHJcbiAgICAgICAgZmVlZF9maWxlcy5GaWxlX1BhdGggPSBmaWxlLnBhdGg7XHJcbiAgICAgICAgZmVlZF9maWxlcy5TbWFsbF9GaWxlX1BhdGggPSAgXCJmaWxlOi8vXCIgKyBmaWxlLnBhdGg7XHJcbiAgICAgICAgZmVlZF9maWxlcy5QYXJlbnRfSWQgPSB0aGlzLmZpbGVQYXJlbnRJZDtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJmZWVkX2ZpbGVzIC0+IFwiICsgSlNPTi5zdHJpbmdpZnkoZmVlZF9maWxlcykpO1xyXG5cclxuICAgICAgICByZXR1cm4gZmVlZF9maWxlcztcclxuICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXhjZXB0aW9uIC0tPiBcIiArIGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoSW1hZ2UoKXtcclxuICAgICAgICB0aGlzLmFyckZlZWRGaWxlVG9VcGxvYWRMaXN0LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJyRmVlZEZpbGVMaXN0LnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXJyRmVlZEZpbGVMaXN0Lm5vdGlmeTtcclxuICAgICAgICAgICAgdGhpcy5nZXRIZWlnaHQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGNyZWF0ZUZlZWREaWFsb2coKXtcclxuICAgICAgICBkaWFsb2dzLnByb21wdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIllvdXIgdGl0bGVcIixcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJZb3VyIG1lc3NhZ2VcIixcclxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIllvdXIgYnV0dG9uIHRleHRcIixcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWwgdGV4dFwiLFxyXG4gICAgICAgICAgICBuZXV0cmFsQnV0dG9uVGV4dDogXCJOZXV0cmFsIHRleHRcIixcclxuICAgICAgICAgICAgZGVmYXVsdFRleHQ6IFwiRGVmYXVsdCB0ZXh0XCIsXHJcbiAgICAgICAgICAgIGlucHV0VHlwZTogZGlhbG9ncy5pbnB1dFR5cGUucGFzc3dvcmRcclxuICAgICAgICB9KS50aGVuKHIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgci5yZXN1bHQgKyBcIiwgdGV4dDogXCIgKyByLnRleHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICBcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=