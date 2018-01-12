import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    selector: "modal-content",
    template: `
    <StackLayout margin="24" horizontalAlignment="center" verticalAlignment="center">
    <Label text="Choose an action"></Label>
        <StackLayout orientation="vertical" marginTop="12">
            <Button text="Save As Draft" (tap)="close('save_as_draft')" class="ns_button"></Button>
            <Button text="Post And Notify" (tap)="close('post_and_notifiy')" class="ns_button"></Button>
            <Button text="Post" (tap)="close('post')"  class="ns_button"></Button>
        </StackLayout>
    </StackLayout>
  `
})
export class myfeedCreateDialog {
    public prompt: string;
    constructor(private params: ModalDialogParams) {
        this.prompt = params.context.promptMsg;
    }

    public close(result: string) {
        this.params.closeCallback(result);
  }
}