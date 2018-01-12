/* Start of myFacility */

export class FacilityList {
    Facility_Group_Id: any;
    Facility_Id: any;
    Facility_Name: string;
    availableCount: number;
}

export class BookingCalendar {
    Calendar_Date: Date;
    DayName: string;
    Facility_Name: string;
    Total_Block_Count: number;
    Total_Book_Count: number;
    Total_Time_Slot_Count: number;
    Status_Color: string;
    Status: string;
    availableCount: number;
    Selected: boolean;
}

export class FacilityGroup{
    Facility_Group_Id: any;
    Facility_Group_Name: string;
    Condominium_Id: string;
    HouseRule_Id: any;
    Priority: 3;
    Note: string;
    Color: string;
    BGColor: string;
    Actual_File_Path: string;
    Facilities: Facility[];
    Facility_Maps: FacilityGroupFile[];
}
export class FacilityGroupFile{
    Attach_Map_Id: any;
    Facility_Group_Id: any;
    File_Name: string;
    File_Path: string;
    File_Type: string;
    Actual_File_Path: string;
}
export class TotalTimeSlot {
    TimePeriod_Detail_Id: any;
    From: Date;
    To: Date;
    IsPeak: boolean;
    Status: number;
    Status_Label: string;
    Description: string;
    Expired_Date: Date;
}

export class BookingDetail {
    Booking_Id: any;
    Facility_Id: any;
    Facility_Name: string;
    Booking_Date: Date;
    Resident_Id: string;
    TimePeriod_Detail_Id: any;
    Start_Time: Date;
    End_Time: Date;
    Session_Group_Id: any;
    FeeDetail: FeeDetail[];
}

export class FeeDetail {
    Fees_Id: any;
    Fees_Name: string;
    Fees_Amount: number;
    Currency_Sign: any;
    Is_Optional: boolean;
    Is_Additional: boolean;
}

export class Booking {
    Booking_Id: any;
    Resident_Id: any;
    Facility_Id: any;
    Reference_No: any;
    Remark: string;
    TimePeriod_Detail_Id: any;
    Booking_Date: Date;
    BookedBy: string;
    CurrentState: number;
    ActionBy: string;
    ActionOn: string;
    Facility_Name: string;
    Start_Time: Date;
    End_Time: Date;
    IsExitPayment: boolean;
    ReceiveId: any;
    ExpiredDate: Date;
    Fees: Fee[];
    FeeDetail: FeeDetail[];
}

export class Fee {
    Fees_Id: any;
    Fees_Name: string;
    Fees_Amount: number;
    Payment_Mode: number;
    Cheque_No: number;
    Bank_Name: string;
    Selected: boolean;
    Cheque_Dated: Date;
    Currency_Sign: any;
    myCredit_Id: any;
    ChequeStatusDescription: string;
}

export class Facility {
    Facility_Group_Id: any;
    Facility_Id: any;
    Facility_Name: string;
    availableCount: number;
}

export class BookingMaps {
    Attach_Map_Id: any;
    Facility_Group_Id: any;
    File_Name: string;
    File_Path: string;
    File_Type: string;
    Created_On: Date;
    Created_By: string;
    Last_Updated_On: Date;
    Last_Updated_By: string;
    MC_Facility_Group: BookingMaps[];
}

export class BookingMapsInfo {
    Attach_Map_Id: any;
    Facility_Group_Id: any;
    File_Name: string;
    File_Path: string;
    File_Type: string;
    Created_On: Date;
    Created_By: string;
    Last_Updated_On: Date;
    Last_Updated_By: string;
    MC_Facility_Group: BookingMaps[];
}
export class CashBalanceInfo {
    Room_Id: any;
    CashBalance: number;
}
export class ChequeBalanceInfo {
    myCredit_Id: any;
    Condominium_Id: any;
    Resident_Id: any;
    isDebit: boolean;
    Date: Date;
    Mode: number;
    Amount: number;
    Cheque_Number: number;
    isCheque_Refund: boolean;
    Parent_Id: any;
    isWithdrew: boolean;
    Receiver_Id: string;
    Bank_Id: any;
    Cheque_Dated: Date;
    Created_On: Date;
    Created_By: string;
    Last_Updated_On: Date;
    Last_Updated_By: string;
    MyCredit_ReceiptNo: any;
    Room_Id: any;
    BankIn_Id: any;
    ReferenceNo: any;
    Bank_Name: string;
    Expiry_Date: Date;
    ChequeStatus: number;
    ChequeStatusDescription: string;
    ChequeFrom: number;
    Selected: boolean;
    Used: boolean;
}

export class CancelBookingConfirm {
    Message: string;
    Chancellation_Charge_Message: string;
    Payable_Amount: number;
    Cash_Balance: number;
    Cheque_List: ChequeBalanceInfo[];
}

export class BookingCancellationObject {
    Remark: string;
    Cancellation_Fee_With_Cheque: boolean;
    Cancellation_myCredit_Id: any;
    Amount: number;
}
/* End for myFacility */


/* Start for TopUp */
export class BankListInfo {
    Bank_Id: any;
    Bank_Name: string;
    Condominium_Id: any;
    Created_By: string;
    Created_On: Date;
    Last_Updated_By: string;
    Last_Updated_On: Date;
}
export class MyCreditTopUp {
    Mode: number;
    Amount: number;
    ReferenceNo: any;
    Cheque_Number: number;
    Bank_Id: any;
    Bank_Name: string;
    Cheque_Dated: Date;
}
/* End for TopUp */
