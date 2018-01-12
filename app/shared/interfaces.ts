
export class Role {
    Role: string;
}

export class DropDownValuePair {
    value: any;
    display: any;
}

export class Users {
    UserId: string;
    FullName: string;
    Phone: number;
    Mobile: number;
    Email: string;
    Condominium_Id: any;
    Photo_Path: string;
    Photo_Name: string;
    Photo_Type: string;
    Room_Id: any;
    UserType: number;
    IsActive: boolean;
    Notification_Date: Date;
    Updated_Profile: boolean;
    isDeleted: boolean;
    Created_By: string;
    Created_On: Date;
    Last_Updated_By: string;
    Last_Updated_On: Date;
    Address: string;
    isDefault: boolean;
    SP_CountryId: any;
    SP_PostalCode: number;
    SP_Address: string;
    isBlock: boolean;
    TenancyPeriodFrom: Date;
    TenancyPeriodTo: Date;
    BatchNo: any;
    TenancyName: string;
    Nationality: string;
    DOB: Date;
    ContactNo: any;
    Occupation: string;
    CompanyName: string;
    CompanyAddress: string;
    File_Id: any;
    Parent_Id: any;
    File_Path: string;
    Application_Id: any;
    Secret_Key: string;
    Password: string;
    User_Name: string;

}

export class User {
    id: string;
    name: string;

    constructor(ID: string, Name: string) {
        this.id = ID;
        this.name = Name;
    }
}

/* Start for UserLogin */

export class UserLogin {
   Application_Id: any;
   User_Name: string;
   Password: string;
   Secret_Key: any;
}

/* End for UserLogin */

/* Start for mycondosg homepage and properties */

export class CondoInfo {
    condoId: any;
    condoAddress: string;
    condoImageFilePath: string;
    managingAgentName: string;
    noOfUnit: number;
    developerName: string;
    condominiumPrefix: string;
}

// For factsheet component/ blocklayout component

export class CondoInfoDetail {
    Condominium_Id: any;
    Request_Id: any;
    Condominium_Name: string;
    MCST_No: number;
    MaintenanceFundAccount: string;
    TOP_Day: number;
    TOP_Month: number;
    TOP_Year: number;
    Tenure: string;
    District_Id: any;
    No_Of_Unit: number;
    SiteArea: number;
    Country_Id: any;
    Postal_Code: number;
    Address: string;
    Current_Website_Address: string;
    MyCondo_Website_Address: string;
    Representing: string;
    Contact_Person: string;
    Salutation: string;
    Designation: string;
    Contact_No: string;
    Contact_Mobile_No: string;
    Contact_Email: string;
    Managing_Agent_Id: any;
    Managing_Agent_Name: string;
    Agent_Head_Office_Address: string;
    Agent_Phone: string;
    Agent_Fax: string;
    MA_Project_Manager: string;
    MA_Mobile: string;
    MA_Email: string;
    Developer_Id: any;
    Developer_Name: string;
    Developer_Head_Office_Address: string;
    Developer_Phone: string;
    Developer_Fax: string;
    Dev_Project_Manager: string;
    Dev_Mobile: string;
    Dev_Email: string;
    Date_Format: string;
    Currency_Id: any;
    IsAutoGenerate_Receive_No: boolean;
    Receive_Prefix: string;
    Receive_No_Type: string;
    IsAutoGenerate_Refund_No: boolean;
    Refund_Prefix: string;
    Refund_No_Type: string;
    Condominium_Prefix: string;
    CondominiumImage: string;
    CondominiumImage_Type: string;
    isActive: boolean;
    ExpireOn: Date;
    LaunchOn: Date;
    SiteMap: string;
    SiteMap_FileType: string;
    LocationMap: string;
    LocatoinMapType: string;
    AboutUs: string;
    Project_Specification: string;
    Project_Specification_FileType: string;
    CurrentBookingNo: number;
    CurrentPaymentNo: number;
    CurrentRefundNo: number;
    CondoManager: string;
    CondoManager_Salutation: string;
    CondoManager_Nickname: string;
    CondoManager_Mobile: string;
    CondoManager_Email: string;
    Current_Initial_Fee_Id: any;
    MO_Email: string;
    MO_Phone: string;
    MO_Fax: string;
    MO_GuardHouse: string;
    MO_Operating_Hours: string;
    isMondayOff: boolean;
    isTuesdayOff: boolean;
    isWednesdayOff: boolean;
    isThursdayOff: boolean;
    isFridayOff: boolean;
    isSaturdayOff: boolean;
    isSundayOff: boolean;
    TemplateName: string;
    Theme: string;
    ThemeId: any;
    isDataEntry: boolean;
    Site_Title: string;
    Enquiry_Email: string;
    Sending_From_Email: string;
    District_Name: string;
    Max_Storey: number;
    Min_Storey: number;
    TotalUnitCount: number;
    TotalBlockCount: number;
    Created_By: string;
    Created_On: Date;
    Last_Updated_By: string;
    Last_Updated_On: Date;
}

// For UnitCategoryName And Area(1-BedRoom: 12-sqft)

export class UnitCategoryNameRangeInfo {
    Unit_Category_Name: string;
    Area_Unit_Name: string;
    Max_Amount: number;
    Min_Amount: number;
}

// For Facilities by Condominium_Id

export class FacilitiesInfo {
    Facility_Id: any;
    Condominium_Id: any;
    Facility_Group_Id: any;
    TimePeriod_Group_Id: any;
    House_Rule_Id: any;
    Priority: number;
    Serial: number;
    Facility_Name: string;
    Description: string;
    Facility_Image_FileName: string;
    Facility_Image_FilePath: string;
    Facility_Image_File_Type: string;
    Facility_Group_File_Path: string;
    Maximum_Session: number;
    MS_Duration: number;
    Maximum_NonPeek_Session: number;
    Maximum_Peak_Session: number;
    MPN_Duration: number;
    Interval_For_Creation: number;
    IFC_Duration: number;
    IFC_Duration_Type: number;
    Interval_For_Session: number;
    IFS_Duration: number;
    IFS_Duration_Type: number;
    Session_Consume_Limit: number;
    SCL_Duration: number;
    SCL_Duration_Type: number;
    Can_Utilized: boolean;
    Created_On: Date;
    Created_By: string;
    Last_Updated_On: Date;
    Last_Updated_By: string;
    Facility_Rule: string;
}

// For Architecture

export class CondoMaterialInfo {
    Material_Id: any;
    Material_Name: string;
    Material_Description: string;
    Condominium_Id: any;
    Material_Type: number;
    IsEdit: boolean;
    IsEditDescription: boolean;
    Created_On: Date;
    Created_By: string;
    MC_CondoMaterial_Files: MaterialFile[];
}

// For ArchitectureFiles

export class MaterialFile {
    Material_Id: any;
    File_Id: any;
    Condominium_Id: any;
    File_Name: string;
    File_Path: string;
    File_Type: string;
}

// For Schematic Diagram

export class Block {
    Block_Id: any;
    Block_No: number;
    Block_Name: string;
    Block_Address: string;
    No_Of_Story: number;
    No_Of_Basement: number;
    Count: number;
    unitCount: Stack[];
}

export class Stack {
    Unit_Count_Id: any;
    Unit_No: number;
    Building_Name: string;
    Building_Serial: number;
    Block_Id: any;
}

export class Building {
    Building_Name: string;
    Building_Serial: number;
    Block_Id: any;
    Stacks: Stack[];
}

export class Unit {
    Room_Id: any;
    Unit_Type_Id: any;
    Unit_Type_Name: string;
    Unit_Type_Image_FileName: string;
    Unit_Type_Image_File_Type: string;
    Unit_Type_Image_FilePath: string;
    Unit_Type_Color: any;
    Unit_Category_Name: string;
    Story_Plan_Id: any;
    Story_Plan_Name: string;
    Story_Plan_Image_FolderPath: string;
    Story_Plan_Image_FileName: string;
    Story_Plan_Image_File_Type: string;
    Block_Id: string;
    Block_No: string;
    Block_Name: string;
    Block_Address: string;
    No_Of_Story: number;
    No_Of_Basement: number;
    Postal_Code: number;
    Unit_Count_Id: any;
    Unit_No: number;
    Area_Unit_Amount: number;
    Area_Unit_Name: string;
    Building_Name: string;
    Building_Serial: number;
    Stroy_Range: number;
    Parent_Id: any;
    is_SubUnit: boolean;
    RelateWith_Top: boolean;
    RelateWith_Left: boolean;
    RelateWith_Right: boolean;
    RelateWith_Bottom: boolean;

}

//  For Block Layout Plan Files

export class BlockLayoutPlanFile {
    File_Id: any;
    Condominium_Id: any;
    Description: string;
    File_Name: string;
    File_Type: string;
    File_Path: string;
    SerialNo: number;
    IsSelected: boolean;
    Created_On: Date;
    Created_By: string;
    Last_Updated_On: Date;
    Last_Updated_By: string;
}

export class MemberInfo {
    Condominium_Id: any;
    Condominium_Name: string;
    MyCondo_Website_Address: string;
    MCST_No: string;
    Address: string;
    ImageFilePath: string;
    Managing_Agent_Name: string;
    No_Of_Unit: string;
    Developer_Name: string;
    Condominium_Prefix: string;
}

/* For Common Use */

export class Response {
    code: string;
    message: string;
    target: string;
    details: ResponseDetail[];
}

export class ResponseDetail {
    code: string;
    message: string;
    target: string;
}

export class Return {
    result: any[];
    response: Response;
}

// For Patch

export class Patch {
    Id: any;
    op: string;
    path: string;
    value: any;
}

export interface Predicate <T> {
    (item: T): boolean;
}

export interface External {
    mySlider: any;
}
