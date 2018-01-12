import { Injectable } from '@angular/core';
import { Role, Return } from '../../shared/interfaces';

@Injectable()
export class CommonService {

    constructor() {}

    public IsAccess(roles: Role[], useraccess: string): boolean {
        if (roles != null) {
            for (const r of roles){
                if (useraccess === r.Role) {
                    return true;
                }
            }
            return false;
        }
    }

    public showMessage(rtn: Return, successMessage: string) {
        if (rtn.response.code === '200') {
            if (successMessage !== '') {
                // this.notificationService.printSuccessMessage(successMessage);
                this.openSnackBar(successMessage, '');
            }else {
                // this.notificationService.printSuccessMessage(rtn.response.message);
                this.openSnackBar(rtn.response.message, '');
            }
        }else {
            // this.notificationService.printErrorMessage(rtn.response.message);
            this.openSnackBar(rtn.response.message, '');
        }
    }

    public showMessageForFail(failMessage: string) {

                this.openSnackBar(failMessage, '');
    }

    public showMessageForSaveImageInGallery(message: string) {

                this.openSnackBar(message, '');
    }

    // Notification(Succeess/Fail)
    openSnackBar(message: string, action: string) {
        // this.snackBar.open(message, action, {
        //   duration: 3000,
        // });
      }

    // Generate New GUID
    public NewGuid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      }

    public getLocal_From_UTCDate(orgDat: Date): Date {
    let d = new Date();
    d.setFullYear(orgDat.getUTCFullYear());
    d.setMonth(orgDat.getUTCMonth());
    d.setDate(orgDat.getUTCDate());
    d.setHours(orgDat.getUTCHours());
    d.setMinutes(orgDat.getUTCMinutes());
    d.setSeconds(orgDat.getUTCSeconds());
    d.setMilliseconds(orgDat.getUTCMilliseconds());
    return d;
  }

  public getUTC_From_LocalDate(orgDat: Date): Date {
    let d = new Date();
    d.setUTCFullYear(orgDat.getFullYear());
    d.setUTCMonth(orgDat.getMonth());
    d.setUTCDate(orgDat.getDate());
    d.setUTCHours(orgDat.getHours());
    d.setUTCMinutes(orgDat.getMinutes());
    d.setUTCSeconds(orgDat.getSeconds());
    d.setUTCMilliseconds(orgDat.getMilliseconds());
    return d;
  }

  public getCondoId():any{
      return "8E3919CE-3BD8-4528-BD9A-4127AEA09414";
  }

}