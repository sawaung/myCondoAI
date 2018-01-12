"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var myfeedCreateDialog = /** @class */ (function () {
    function myfeedCreateDialog(params) {
        this.params = params;
        this.prompt = params.context.promptMsg;
    }
    myfeedCreateDialog.prototype.close = function (result) {
        this.params.closeCallback(result);
    };
    myfeedCreateDialog = __decorate([
        core_1.Component({
            selector: "modal-content",
            template: "\n    <StackLayout margin=\"24\" horizontalAlignment=\"center\" verticalAlignment=\"center\">\n    <Label text=\"Choose an action\"></Label>\n        <StackLayout orientation=\"vertical\" marginTop=\"12\">\n            <Button text=\"Save As Draft\" (tap)=\"close('save_as_draft')\" class=\"ns_button\"></Button>\n            <Button text=\"Post And Notify\" (tap)=\"close('post_and_notifiy')\" class=\"ns_button\"></Button>\n            <Button text=\"Post\" (tap)=\"close('post')\"  class=\"ns_button\"></Button>\n        </StackLayout>\n    </StackLayout>\n  "
        }),
        __metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams])
    ], myfeedCreateDialog);
    return myfeedCreateDialog;
}());
exports.myfeedCreateDialog = myfeedCreateDialog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlmZWVkQ3JlYXRlRGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15ZmVlZENyZWF0ZURpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsa0VBQXNFO0FBZXRFO0lBRUksNEJBQW9CLE1BQXlCO1FBQXpCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7SUFDM0MsQ0FBQztJQUVNLGtDQUFLLEdBQVosVUFBYSxNQUFjO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFSVSxrQkFBa0I7UUFiOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSxvakJBU1g7U0FDRixDQUFDO3lDQUc4QixnQ0FBaUI7T0FGcEMsa0JBQWtCLENBUzlCO0lBQUQseUJBQUM7Q0FBQSxBQVRELElBU0M7QUFUWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm1vZGFsLWNvbnRlbnRcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgIDxTdGFja0xheW91dCBtYXJnaW49XCIyNFwiIGhvcml6b250YWxBbGlnbm1lbnQ9XCJjZW50ZXJcIiB2ZXJ0aWNhbEFsaWdubWVudD1cImNlbnRlclwiPlxuICAgIDxMYWJlbCB0ZXh0PVwiQ2hvb3NlIGFuIGFjdGlvblwiPjwvTGFiZWw+XG4gICAgICAgIDxTdGFja0xheW91dCBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgbWFyZ2luVG9wPVwiMTJcIj5cbiAgICAgICAgICAgIDxCdXR0b24gdGV4dD1cIlNhdmUgQXMgRHJhZnRcIiAodGFwKT1cImNsb3NlKCdzYXZlX2FzX2RyYWZ0JylcIiBjbGFzcz1cIm5zX2J1dHRvblwiPjwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvbiB0ZXh0PVwiUG9zdCBBbmQgTm90aWZ5XCIgKHRhcCk9XCJjbG9zZSgncG9zdF9hbmRfbm90aWZpeScpXCIgY2xhc3M9XCJuc19idXR0b25cIj48L0J1dHRvbj5cbiAgICAgICAgICAgIDxCdXR0b24gdGV4dD1cIlBvc3RcIiAodGFwKT1cImNsb3NlKCdwb3N0JylcIiAgY2xhc3M9XCJuc19idXR0b25cIj48L0J1dHRvbj5cbiAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICA8L1N0YWNrTGF5b3V0PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIG15ZmVlZENyZWF0ZURpYWxvZyB7XG4gICAgcHVibGljIHByb21wdDogc3RyaW5nO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcykge1xuICAgICAgICB0aGlzLnByb21wdCA9IHBhcmFtcy5jb250ZXh0LnByb21wdE1zZztcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvc2UocmVzdWx0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayhyZXN1bHQpO1xuICB9XG59Il19