import { Component } from "@angular/core";

@Component({
    selector: "float-btn",
    template: `
        <StackLayout class="float-btn">
            <Label class="float-btn-text" text = "+"> </Label>
        </StackLayout>
    `,
    styles:[
        `
            .float-btn{
                background-color: #30bcfff;
                border-radius: 28;
                width: 56;
                height: 56;
                text-align: center;
                vertical-align: center;
            }
            .float-btn-text{
                color: #fff;
                font-size:36;
                margin-top: -4;
            }
        `
        ]
})
export class FloatBtnComponent{

}