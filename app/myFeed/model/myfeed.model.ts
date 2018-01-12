export class Role {
    Role: string;
}

export class FeedInformation {
    Feed_Id: any;
    Condominium_Id: any;
    Feed_Category_Id: any;
    FeedType_Id: any;
    Title: string;
    Description: any;
    Posted_By: string;
    Posted_Date: Date;
    Post_Status: boolean;
    isBlocked: boolean;
    Created_On: Date;
    Created_By: string;
    Last_Updated_On: Date;
    Last_Updated_By: string;
    Feed_Group: number;
    EventStartDateTime: Date;
    EventEndDateTime: Date;
    IsShowEndDateTime: boolean;
    EventPlace: string;
    Feed_Category_Name: string;
    Feed_Type_Name: string;
    status: string;
    Hide: boolean;
    MC_Feed_Files: FeedFile[];
}

export class FeedFilter {
    Feed_Id: any;
    Condominium_Id: any;
    Feed_Category_Id: any;
    FeedType_Id: any;
    Title: string;
    SearchKeyword: string;
    Description: string;
    Posted_Date_From: Date;
    Posted_Date_To: Date;
    Cursor_Index: any;
    Get_Next: boolean;
    Page_Size: number;
    Post_Status: boolean;
    UnPost_Status: boolean;
    isBlocked: boolean;
    Created_From: Date;
    Created_To: Date;
    Checked: boolean;
}

export class FeedFile {
    Feed_Id: any;
    File_Id: any;
    Condominium_Id: any;
    File_Name: string;
    File_Path: string;
    File_Type: string;
    Physical_Path: string;
    Actual_File_Path: string;
    Small_File_Path: string;
    Parent_Id: string;
}

// For Feed_Type
export class FeedType {
    FeedType_Id: any;
    FeedType_Name: string;
    Condominium_Id: any;
    Archive: boolean;
    Created_On: Date;
    Created_By: string;
    Last_Updated_On: Date;
    Last_Updated_By: string;
    MC_Feed_Information: any;
}

// For Feed_Category
export class FeedCategory {
    Feed_Category_Id: any;
    Feed_Type_Id: any;
    Feed_Category_Name: string;
    Condominium_Id: any;
    Archive: boolean;
    Created_On: Date;
    Created_By: string;
    Last_Updated_On: Date;
    Last_Updated_By: string;
    MC_Bulletin: any;
    MC_Feed_Information: any;
    MC_Form: any;
    MC_House_Rule: any;
}

export class EventUserListStatus {
    UserId: string;
    FullName: string;
    Phone: any;
    Mobile: any;
    Email: string;
    Status: string;
    Selected: boolean;
    Hide: boolean;
}

// TemporaryFile
export class TemporaryFile {
    Parent_Id: any;
    File_Id: any;
    Condominium_Id: any;
    File_Name: string;
    File_Size: string;
    Physical_Path: any;
}

// Event Status Count
export class StatusCount {
    status: string;
    count: number;
}

