"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ConfigService = /** @class */ (function () {
    function ConfigService() {
        this._apiURI = 'http://192.168.100.254:8013/api/';
        //this._apiURI = 'http://service.mycondo.sg/api/';
        // this._strFilePathURI = 'http://file.mycondo.sg/';
        this._strFilePathURI = 'http://192.168.100.254:8062/';
        // this._strHandlerURI = 'http://192.168.100.254:8011/Handlers/mySurvey1.ashx';
    }
    ConfigService.prototype.getApiURI = function () {
        return this._apiURI;
    };
    ConfigService.prototype.getFilePathURI = function () {
        return this._strFilePathURI;
    };
    ConfigService.prototype.getHandlerURI = function () {
        return this._strHandlerURI;
    };
    ConfigService.prototype.getUserDefaultImage = function () {
        return this._strFilePathURI + 'myResources/residentphoto.jpg';
    };
    ConfigService.prototype.getApiHost = function () {
        return this._apiURI.replace('api/', '');
    };
    Object.defineProperty(ConfigService.prototype, "DEVELOPMENT_FILE_CREATE", {
        // Roles (start)
        // myCondosg
        get: function () {
            return 'DEVELOPMENT_FILE_CREATE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "DEVELOPMENT_FILE_DELETE", {
        get: function () {
            return 'DEVELOPMENT_FILE_DELETE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "MYCOUNCIL_LIST", {
        // Council
        get: function () {
            return 'MYCOUNCIL_LIST';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "MYCLASSIFIED_CREATE", {
        // myClassified
        get: function () {
            return 'MYCLASSIFIED_CREATE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "SURVEY_CREATE", {
        // Forms
        get: function () {
            return 'SURVEY_CREATE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "SURVEY_EDIT", {
        get: function () {
            return 'SURVEY_EDIT';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "SURVEY_ACTIVATE", {
        get: function () {
            return 'SURVEY_ACTIVATE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "SURVEY_DEACTIVATE", {
        get: function () {
            return 'SURVEY_DEACTIVATE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "VIEW_SURVEY_RESULT", {
        get: function () {
            return 'VIEW_SURVEY_RESULT';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "SURVEY_DELETE", {
        get: function () {
            return 'SURVEY_DELETE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "PAST_BOOKING", {
        // Facility
        get: function () {
            return 'PAST_BOOKING';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "CONFIRM_BOOKING_WITH_MYCREDIT", {
        get: function () {
            return 'CONFIRM_BOOKING_WITH_MYCREDIT';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "PRINT_BOOKING_LIST", {
        get: function () {
            return 'PRINT_BOOKING_LIST';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "VIEW_BOOKING_LIST_OF_OTHERS", {
        get: function () {
            return 'VIEW_BOOKING_LIST_OF_OTHERS';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "CANCEL_BOOKING", {
        get: function () {
            return 'CANCEL_BOOKING';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "BOOKING_ON_BEHALF_OF_OTHERS", {
        get: function () {
            return 'BOOKING_ON_BEHALF_OF_OTHERS';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "BOOK_FACILITIES", {
        get: function () {
            return 'BOOK_FACILITIES';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "CONFIRM_BOOKING", {
        get: function () {
            return 'CONFIRM_BOOKING';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "BOOKING_ALLOW_DAY", {
        get: function () {
            return 'BOOKING_ALLOW_DAY';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "UNLIMITED_BOOKING", {
        // To Discuss with Ko Tay
        // get VIEW_LIST***(): string{
        //         return 'VIEW_LIST***';
        // }
        // get VIEW_CALENDAR***(): string{
        //         return 'VIEW_CALENDAR***';
        // }
        get: function () {
            return 'UNLIMITED_BOOKING';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "CHANGE_BOOKING_PURPOSE", {
        get: function () {
            return 'CHANGE_BOOKING_PURPOSE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "CAN_VIEW_THREAD", {
        // Facility End
        // Issue
        get: function () {
            return 'CAN_VIEW_THREAD';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "CAN_SUBMIT_MANAGEMENT_ISSUE", {
        get: function () {
            return 'CAN_SUBMIT_MANAGEMENT_ISSUE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "CAN_SUBMIT_COUNCIL_ISSUE", {
        get: function () {
            return 'CAN_SUBMIT_COUNCIL_ISSUE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "CAN_SUBMIT_MYCONDO_ISSUE", {
        get: function () {
            return 'CAN_SUBMIT_MYCONDO_ISSUE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "ALLOW_EDIT_FOR_OWN_ISSUE", {
        get: function () {
            return 'ALLOW_EDIT_FOR_OWN_ISSUE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "ISSUE_CATEGORY_CREATE", {
        get: function () {
            return 'ISSUE_CATEGORY_CREATE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "ISSUE_CATEGORY_EDIT", {
        get: function () {
            return 'ISSUE_CATEGORY_EDIT';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "ISSUE_CATEGORY_CHANGE", {
        get: function () {
            return 'ISSUE_CATEGORY_CHANGE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "SHARE_ISSUE_WITH_OTHER", {
        get: function () {
            return 'SHARE_ISSUE_WITH_OTHER';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "CHANGE_ISSUE_STATUS", {
        get: function () {
            return 'CHANGE_ISSUE_STATUS';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "CAN_CHANGE_ISSUE_SUBJECT", {
        get: function () {
            return 'CAN_CHANGE_ISSUE_SUBJECT';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "CAN_DEADLINE", {
        get: function () {
            return 'CAN_DEADLINE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "CAN_VIEW_HISTORY", {
        get: function () {
            return 'CAN_VIEW_HISTORY';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "CAN_POST", {
        get: function () {
            return 'CAN_POST';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "CAN_ACCESS_MANAGEMENT_ISSUE", {
        get: function () {
            return 'CAN_ACCESS_MANAGEMENT_ISSUE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "CAN_ACCESS_COUNCIL_ISSUE", {
        get: function () {
            return 'CAN_ACCESS_COUNCIL_ISSUE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "CAN_ACCESS_MYCONDO_ISSUE", {
        get: function () {
            return 'CAN_ACCESS_MYCONDO_ISSUE';
        },
        enumerable: true,
        configurable: true
    });
    ConfigService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ConfigService);
    return ConfigService;
}());
exports.ConfigService = ConfigService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUkzQztJQU1JO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxrQ0FBa0MsQ0FBQztRQUNsRCxrREFBa0Q7UUFFbEQsb0RBQW9EO1FBQ3BELElBQUksQ0FBQyxlQUFlLEdBQUcsOEJBQThCLENBQUM7UUFDdEQsK0VBQStFO0lBQ2xGLENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELHNDQUFjLEdBQWQ7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNoQyxDQUFDO0lBRUQscUNBQWEsR0FBYjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQy9CLENBQUM7SUFFRCwyQ0FBbUIsR0FBbkI7UUFFRyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRywrQkFBK0IsQ0FBQztJQUNqRSxDQUFDO0lBRUQsa0NBQVUsR0FBVjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQU1ELHNCQUFJLGtEQUF1QjtRQUgzQixnQkFBZ0I7UUFFaEIsWUFBWTthQUNaO1lBQ0ksTUFBTSxDQUFDLHlCQUF5QixDQUFDO1FBQ3JDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksa0RBQXVCO2FBQTNCO1lBQ0ksTUFBTSxDQUFDLHlCQUF5QixDQUFDO1FBQ3JDLENBQUM7OztPQUFBO0lBR0Qsc0JBQUkseUNBQWM7UUFEbEIsVUFBVTthQUNWO1lBQ0ksTUFBTSxDQUFDLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksOENBQW1CO1FBRHZCLGVBQWU7YUFDZjtZQUNJLE1B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O0lBQ0Qsc0JBQUksZ0RBQXFCO2FBQXpCO1lBQ0ksTUFBTSxDQUFDLHVCQUF1QixDQUFDO1FBQ25DLENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksaURBQXNCO2FBQTFCO1lBQ0ksTUFBTSxDQUFDLHdCQUF3QixDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksOENBQW1CO2FBQXZCO1lBQ0ksTUFBTSxDQUFDLHFCQUFxQixDQUFDO1FBQ2pDLENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksbURBQXdCO2FBQTVCO1lBQ0ksTUFBTSxDQUFDLDBCQUEwQixDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksdUNBQVk7YUFBaEI7WUFDSSxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksMkNBQWdCO2FBQXBCO1lBQ0ksTUFBTSxDQUFDLGtCQUFrQixDQUFDO1FBQzlCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksbUNBQVE7YUFBWjtZQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSxzREFBMkI7YUFBL0I7WUFDSSxNQUFNLENBQUMsNkJBQTZCLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSxtREFBd0I7YUFBNUI7WUFDSSxNQUFNLENBQUMsMEJBQTBCLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSxtREFBd0I7YUFBNUI7WUFDSSxNQUFNLENBQUMsMEJBQTBCLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUEvTFEsYUFBYTtRQUZ6QixpQkFBVSxFQUFFOztPQUVBLGFBQWEsQ0FxTXpCO0lBQUQsb0JBQUM7Q0FBQSxBQXJNRCxJQXFNQztBQXJNWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuXHJcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcclxuXHJcbiAgICBfYXBpVVJJOiBzdHJpbmc7XHJcbiAgICBfc3RyRmlsZVBhdGhVUkk6IHN0cmluZztcclxuICAgIF9zdHJIYW5kbGVyVVJJOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fYXBpVVJJID0gJ2h0dHA6Ly8xOTIuMTY4LjEwMC4yNTQ6ODAxMy9hcGkvJztcclxuICAgICAgICAvL3RoaXMuX2FwaVVSSSA9ICdodHRwOi8vc2VydmljZS5teWNvbmRvLnNnL2FwaS8nO1xyXG5cclxuICAgICAgICAvLyB0aGlzLl9zdHJGaWxlUGF0aFVSSSA9ICdodHRwOi8vZmlsZS5teWNvbmRvLnNnLyc7XHJcbiAgICAgICAgdGhpcy5fc3RyRmlsZVBhdGhVUkkgPSAnaHR0cDovLzE5Mi4xNjguMTAwLjI1NDo4MDYyLyc7XHJcbiAgICAgICAgLy8gdGhpcy5fc3RySGFuZGxlclVSSSA9ICdodHRwOi8vMTkyLjE2OC4xMDAuMjU0OjgwMTEvSGFuZGxlcnMvbXlTdXJ2ZXkxLmFzaHgnO1xyXG4gICAgIH1cclxuXHJcbiAgICAgZ2V0QXBpVVJJKCkge1xyXG4gICAgICAgICByZXR1cm4gdGhpcy5fYXBpVVJJO1xyXG4gICAgIH1cclxuXHJcbiAgICAgZ2V0RmlsZVBhdGhVUkkoKSB7XHJcbiAgICAgICAgIHJldHVybiB0aGlzLl9zdHJGaWxlUGF0aFVSSTtcclxuICAgICB9XHJcblxyXG4gICAgIGdldEhhbmRsZXJVUkkoKXtcclxuICAgICAgICAgcmV0dXJuIHRoaXMuX3N0ckhhbmRsZXJVUkk7XHJcbiAgICAgfVxyXG5cclxuICAgICBnZXRVc2VyRGVmYXVsdEltYWdlKClcclxuICAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0ckZpbGVQYXRoVVJJICsgJ215UmVzb3VyY2VzL3Jlc2lkZW50cGhvdG8uanBnJztcclxuICAgICB9XHJcblxyXG4gICAgIGdldEFwaUhvc3QoKSB7XHJcbiAgICAgICAgIHJldHVybiB0aGlzLl9hcGlVUkkucmVwbGFjZSgnYXBpLycsICcnKTtcclxuICAgICB9XHJcblxyXG5cclxuICAgICAvLyBSb2xlcyAoc3RhcnQpXHJcblxyXG4gICAgIC8vIG15Q29uZG9zZ1xyXG4gICAgIGdldCBERVZFTE9QTUVOVF9GSUxFX0NSRUFURSgpOiBzdHJpbmd7XHJcbiAgICAgICAgIHJldHVybiAnREVWRUxPUE1FTlRfRklMRV9DUkVBVEUnO1xyXG4gICAgIH1cclxuXHJcbiAgICAgZ2V0IERFVkVMT1BNRU5UX0ZJTEVfREVMRVRFKCk6IHN0cmluZ3tcclxuICAgICAgICAgcmV0dXJuICdERVZFTE9QTUVOVF9GSUxFX0RFTEVURSc7XHJcbiAgICAgfVxyXG5cclxuICAgICAvLyBDb3VuY2lsXHJcbiAgICAgZ2V0IE1ZQ09VTkNJTF9MSVNUKCk6IHN0cmluZ3tcclxuICAgICAgICAgcmV0dXJuICdNWUNPVU5DSUxfTElTVCc7XHJcbiAgICAgfVxyXG5cclxuICAgICAvLyBteUNsYXNzaWZpZWRcclxuICAgICBnZXQgTVlDTEFTU0lGSUVEX0NSRUFURSgpOiBzdHJpbmd7XHJcbiAgICAgICAgIHJldHVybiAnTVlDTEFTU0lGSUVEX0NSRUFURSc7XHJcbiAgICAgfVxyXG5cclxuICAgICAvLyBGb3Jtc1xyXG4gICAgIGdldCBTVVJWRVlfQ1JFQVRFKCk6IHN0cmluZ3tcclxuICAgICAgICAgcmV0dXJuICdTVVJWRVlfQ1JFQVRFJztcclxuICAgICB9XHJcblxyXG4gICAgIGdldCBTVVJWRVlfRURJVCgpOiBzdHJpbmd7XHJcbiAgICAgICAgIHJldHVybiAnU1VSVkVZX0VESVQnO1xyXG4gICAgIH1cclxuXHJcbiAgICAgZ2V0IFNVUlZFWV9BQ1RJVkFURSgpOiBzdHJpbmd7XHJcbiAgICAgICAgIHJldHVybiAnU1VSVkVZX0FDVElWQVRFJztcclxuICAgICB9XHJcblxyXG4gICAgIGdldCBTVVJWRVlfREVBQ1RJVkFURSgpOiBzdHJpbmd7XHJcbiAgICAgICAgIHJldHVybiAnU1VSVkVZX0RFQUNUSVZBVEUnO1xyXG4gICAgIH1cclxuXHJcbiAgICAgZ2V0IFZJRVdfU1VSVkVZX1JFU1VMVCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuICdWSUVXX1NVUlZFWV9SRVNVTFQnO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXQgU1VSVkVZX0RFTEVURSgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuICdTVVJWRVlfREVMRVRFJztcclxuICAgIH1cclxuXHJcbiAgICAvLyBGYWNpbGl0eVxyXG4gICAgIGdldCBQQVNUX0JPT0tJTkcoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiAnUEFTVF9CT09LSU5HJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgQ09ORklSTV9CT09LSU5HX1dJVEhfTVlDUkVESVQoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiAnQ09ORklSTV9CT09LSU5HX1dJVEhfTVlDUkVESVQnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBQUklOVF9CT09LSU5HX0xJU1QoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiAnUFJJTlRfQk9PS0lOR19MSVNUJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgVklFV19CT09LSU5HX0xJU1RfT0ZfT1RIRVJTKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gJ1ZJRVdfQk9PS0lOR19MSVNUX09GX09USEVSUyc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IENBTkNFTF9CT09LSU5HKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gJ0NBTkNFTF9CT09LSU5HJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgQk9PS0lOR19PTl9CRUhBTEZfT0ZfT1RIRVJTKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gJ0JPT0tJTkdfT05fQkVIQUxGX09GX09USEVSUyc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IEJPT0tfRkFDSUxJVElFUygpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuICdCT09LX0ZBQ0lMSVRJRVMnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBDT05GSVJNX0JPT0tJTkcoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiAnQ09ORklSTV9CT09LSU5HJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgQk9PS0lOR19BTExPV19EQVkoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiAnQk9PS0lOR19BTExPV19EQVknO1xyXG4gICAgfVxyXG4vLyBUbyBEaXNjdXNzIHdpdGggS28gVGF5XHJcbiAgICAvLyBnZXQgVklFV19MSVNUKioqKCk6IHN0cmluZ3tcclxuICAgIC8vICAgICAgICAgcmV0dXJuICdWSUVXX0xJU1QqKionO1xyXG4gICAgLy8gfVxyXG5cclxuICAgICAgLy8gZ2V0IFZJRVdfQ0FMRU5EQVIqKiooKTogc3RyaW5ne1xyXG4gICAgLy8gICAgICAgICByZXR1cm4gJ1ZJRVdfQ0FMRU5EQVIqKionO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIGdldCBVTkxJTUlURURfQk9PS0lORygpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuICdVTkxJTUlURURfQk9PS0lORyc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IENIQU5HRV9CT09LSU5HX1BVUlBPU0UoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiAnQ0hBTkdFX0JPT0tJTkdfUFVSUE9TRSc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRmFjaWxpdHkgRW5kXHJcblxyXG4gICAgLy8gSXNzdWVcclxuICAgIGdldCBDQU5fVklFV19USFJFQUQoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiAnQ0FOX1ZJRVdfVEhSRUFEJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgQ0FOX1NVQk1JVF9NQU5BR0VNRU5UX0lTU1VFKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gJ0NBTl9TVUJNSVRfTUFOQUdFTUVOVF9JU1NVRSc7XHJcbiAgICB9XHJcbiAgICBnZXQgQ0FOX1NVQk1JVF9DT1VOQ0lMX0lTU1VFKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gJ0NBTl9TVUJNSVRfQ09VTkNJTF9JU1NVRSc7XHJcbiAgICB9XHJcbiAgICBnZXQgQ0FOX1NVQk1JVF9NWUNPTkRPX0lTU1VFKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gJ0NBTl9TVUJNSVRfTVlDT05ET19JU1NVRSc7XHJcbiAgICB9XHJcbiAgICBnZXQgQUxMT1dfRURJVF9GT1JfT1dOX0lTU1VFKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gJ0FMTE9XX0VESVRfRk9SX09XTl9JU1NVRSc7XHJcbiAgICB9XHJcbiAgICBnZXQgSVNTVUVfQ0FURUdPUllfQ1JFQVRFKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gJ0lTU1VFX0NBVEVHT1JZX0NSRUFURSc7XHJcbiAgICB9XHJcbiAgICBnZXQgSVNTVUVfQ0FURUdPUllfRURJVCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuICdJU1NVRV9DQVRFR09SWV9FRElUJztcclxuICAgIH1cclxuICAgIGdldCBJU1NVRV9DQVRFR09SWV9DSEFOR0UoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiAnSVNTVUVfQ0FURUdPUllfQ0hBTkdFJztcclxuICAgIH1cclxuICAgIGdldCBTSEFSRV9JU1NVRV9XSVRIX09USEVSKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gJ1NIQVJFX0lTU1VFX1dJVEhfT1RIRVInO1xyXG4gICAgfVxyXG4gICAgZ2V0IENIQU5HRV9JU1NVRV9TVEFUVVMoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiAnQ0hBTkdFX0lTU1VFX1NUQVRVUyc7XHJcbiAgICB9XHJcbiAgICBnZXQgQ0FOX0NIQU5HRV9JU1NVRV9TVUJKRUNUKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gJ0NBTl9DSEFOR0VfSVNTVUVfU1VCSkVDVCc7XHJcbiAgICB9XHJcbiAgICBnZXQgQ0FOX0RFQURMSU5FKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gJ0NBTl9ERUFETElORSc7XHJcbiAgICB9XHJcbiAgICBnZXQgQ0FOX1ZJRVdfSElTVE9SWSgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuICdDQU5fVklFV19ISVNUT1JZJztcclxuICAgIH1cclxuICAgIGdldCBDQU5fUE9TVCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuICdDQU5fUE9TVCc7XHJcbiAgICB9XHJcbiAgICBnZXQgQ0FOX0FDQ0VTU19NQU5BR0VNRU5UX0lTU1VFKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gJ0NBTl9BQ0NFU1NfTUFOQUdFTUVOVF9JU1NVRSc7XHJcbiAgICB9XHJcbiAgICBnZXQgQ0FOX0FDQ0VTU19DT1VOQ0lMX0lTU1VFKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gJ0NBTl9BQ0NFU1NfQ09VTkNJTF9JU1NVRSc7XHJcbiAgICB9XHJcbiAgICBnZXQgQ0FOX0FDQ0VTU19NWUNPTkRPX0lTU1VFKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gJ0NBTl9BQ0NFU1NfTVlDT05ET19JU1NVRSc7XHJcbiAgICB9XHJcbiAgICAvLyBnZXQgVklFV19PVEhFUl9SRVNJREVOVCdcXCdcXFNfSVNTVUUoKTogc3RyaW5ne1xyXG4gICAgLy8gICAgIHJldHVybiAnQ0FOX0FDQ0VTU19NWUNPTkRPX0lTU1VFJztcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBSb2xlcyAoZW5kKVxyXG59Il19