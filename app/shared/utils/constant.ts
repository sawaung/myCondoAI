import { isDevMode } from '@angular/core';
export class constant{
    static objArray = new Array<Object>();

    static isDevelopmentMode(){
        return isDevMode();
    } 
 
    static setPreviousObject(obj:Object){
        if(obj == null){
            console.log("obj is null");
        }else{
            constant.objArray.push(obj);
        }
    }
    static getPreviousUI():any{
        console.log("array len " + constant.objArray.length);
        return constant.objArray.pop();
    }
    /*static getRandomStringUUID(){
        var uuid = uuidv1();    
        return uuid;
    }*/
 }