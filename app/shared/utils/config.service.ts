import { Injectable } from '@angular/core';

@Injectable()

export class ConfigService {

    _apiURI: string;
    _strFilePathURI: string;
    _strHandlerURI: string;

    constructor() {
        this._apiURI = 'http://192.168.100.254:8013/api/';
        //this._apiURI = 'http://service.mycondo.sg/api/';

        // this._strFilePathURI = 'http://file.mycondo.sg/';
        this._strFilePathURI = 'http://192.168.100.254:8062/';
        // this._strHandlerURI = 'http://192.168.100.254:8011/Handlers/mySurvey1.ashx';
     }

     getApiURI() {
         return this._apiURI;
     }

     getFilePathURI() {
         return this._strFilePathURI;
     }

     getHandlerURI(){
         return this._strHandlerURI;
     }

     getUserDefaultImage()
     {
        return this._strFilePathURI + 'myResources/residentphoto.jpg';
     }

     getApiHost() {
         return this._apiURI.replace('api/', '');
     }


     // Roles (start)

     // myCondosg
     get DEVELOPMENT_FILE_CREATE(): string{
         return 'DEVELOPMENT_FILE_CREATE';
     }

     get DEVELOPMENT_FILE_DELETE(): string{
         return 'DEVELOPMENT_FILE_DELETE';
     }

     // Council
     get MYCOUNCIL_LIST(): string{
         return 'MYCOUNCIL_LIST';
     }

     // myClassified
     get MYCLASSIFIED_CREATE(): string{
         return 'MYCLASSIFIED_CREATE';
     }

     // Forms
     get SURVEY_CREATE(): string{
         return 'SURVEY_CREATE';
     }

     get SURVEY_EDIT(): string{
         return 'SURVEY_EDIT';
     }

     get SURVEY_ACTIVATE(): string{
         return 'SURVEY_ACTIVATE';
     }

     get SURVEY_DEACTIVATE(): string{
         return 'SURVEY_DEACTIVATE';
     }

     get VIEW_SURVEY_RESULT(): string{
        return 'VIEW_SURVEY_RESULT';
    }


    get SURVEY_DELETE(): string{
        return 'SURVEY_DELETE';
    }

    // Facility
     get PAST_BOOKING(): string{
        return 'PAST_BOOKING';
    }

    get CONFIRM_BOOKING_WITH_MYCREDIT(): string{
        return 'CONFIRM_BOOKING_WITH_MYCREDIT';
    }

    get PRINT_BOOKING_LIST(): string{
        return 'PRINT_BOOKING_LIST';
    }

    get VIEW_BOOKING_LIST_OF_OTHERS(): string{
        return 'VIEW_BOOKING_LIST_OF_OTHERS';
    }

    get CANCEL_BOOKING(): string{
        return 'CANCEL_BOOKING';
    }

    get BOOKING_ON_BEHALF_OF_OTHERS(): string{
        return 'BOOKING_ON_BEHALF_OF_OTHERS';
    }

    get BOOK_FACILITIES(): string{
        return 'BOOK_FACILITIES';
    }

    get CONFIRM_BOOKING(): string{
        return 'CONFIRM_BOOKING';
    }

    get BOOKING_ALLOW_DAY(): string{
        return 'BOOKING_ALLOW_DAY';
    }
// To Discuss with Ko Tay
    // get VIEW_LIST***(): string{
    //         return 'VIEW_LIST***';
    // }

      // get VIEW_CALENDAR***(): string{
    //         return 'VIEW_CALENDAR***';
    // }

    get UNLIMITED_BOOKING(): string{
        return 'UNLIMITED_BOOKING';
    }

    get CHANGE_BOOKING_PURPOSE(): string{
        return 'CHANGE_BOOKING_PURPOSE';
    }

    // Facility End

    // Issue
    get CAN_VIEW_THREAD(): string{
        return 'CAN_VIEW_THREAD';
    }

    get CAN_SUBMIT_MANAGEMENT_ISSUE(): string{
        return 'CAN_SUBMIT_MANAGEMENT_ISSUE';
    }
    get CAN_SUBMIT_COUNCIL_ISSUE(): string{
        return 'CAN_SUBMIT_COUNCIL_ISSUE';
    }
    get CAN_SUBMIT_MYCONDO_ISSUE(): string{
        return 'CAN_SUBMIT_MYCONDO_ISSUE';
    }
    get ALLOW_EDIT_FOR_OWN_ISSUE(): string{
        return 'ALLOW_EDIT_FOR_OWN_ISSUE';
    }
    get ISSUE_CATEGORY_CREATE(): string{
        return 'ISSUE_CATEGORY_CREATE';
    }
    get ISSUE_CATEGORY_EDIT(): string{
        return 'ISSUE_CATEGORY_EDIT';
    }
    get ISSUE_CATEGORY_CHANGE(): string{
        return 'ISSUE_CATEGORY_CHANGE';
    }
    get SHARE_ISSUE_WITH_OTHER(): string{
        return 'SHARE_ISSUE_WITH_OTHER';
    }
    get CHANGE_ISSUE_STATUS(): string{
        return 'CHANGE_ISSUE_STATUS';
    }
    get CAN_CHANGE_ISSUE_SUBJECT(): string{
        return 'CAN_CHANGE_ISSUE_SUBJECT';
    }
    get CAN_DEADLINE(): string{
        return 'CAN_DEADLINE';
    }
    get CAN_VIEW_HISTORY(): string{
        return 'CAN_VIEW_HISTORY';
    }
    get CAN_POST(): string{
        return 'CAN_POST';
    }
    get CAN_ACCESS_MANAGEMENT_ISSUE(): string{
        return 'CAN_ACCESS_MANAGEMENT_ISSUE';
    }
    get CAN_ACCESS_COUNCIL_ISSUE(): string{
        return 'CAN_ACCESS_COUNCIL_ISSUE';
    }
    get CAN_ACCESS_MYCONDO_ISSUE(): string{
        return 'CAN_ACCESS_MYCONDO_ISSUE';
    }
    // get VIEW_OTHER_RESIDENT'\'\S_ISSUE(): string{
    //     return 'CAN_ACCESS_MYCONDO_ISSUE';
    // }

    // Roles (end)
}