import { Injectable } from '@angular/core';
import { Role, Return } from '../../shared/interfaces';
var Sqlite = require( "nativescript-sqlite" );

@Injectable()
export class DatabaseService {
    private database: any;
    DATABASE_NAME:string = "mycondo.db";

    constructor() {
        (new Sqlite(this.DATABASE_NAME)).then(db => {
            this.database = db;
            this.onCreate();
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }

   onCreate(){
        this.createUser();
   }

   createUser(){
        this.database.execSQL("CREATE TABLE IF NOT EXISTS Users ("+
        "UserId TEXT PRIMARY KEY ASC,"+
        "FullName TEXT,"+
        "Phone TEXT,"+
        "Mobile TEXT,"+
        "Email TEXT,"+
        "Condominium_Id TEXT,"+
        "Photo_Path TEXT,"+
        "Photo_Name TEXT,"+
        "Photo_Type TEXT,"+
        "Room_Id TEXT,"+
        "UserType NUMERIC,"+
        "IsActive TEXT,"+
        "Notification_Date NUMERIC,"+
        "Updated_Profile TEXT,"+
        "isDeleted TEXT,"+
        "Created_By TEXT,"+
        "Created_On NUMERIC,"+
        "Last_Updated_By TEXT,"+
        "Last_Updated_On NUMERIC,"+
        "Address TEXT,"+
        "isDefault TEXT,"+
        "SP_CountryId TEXT,"+
        "SP_PostalCode TEXT,"+
        "SP_Address TEXT,"+
        "isBlock TEXT,"+
        "TenancyPeriodFrom NUMERIC,"+
        "TenancyPeriodTo NUMERIC,"+
        "BatchNo TEXT,"+
        "TenancyName TEXT,"+
        "Nationality TEXT,"+
        "DOB NUMERIC,"+
        "ContactNo TEXT,"+
        "Occupation TEXT,"+
        "CompanyName TEXT,"+
        "CompanyAddress TEXT,"+
        "File_Id TEXT,"+
        "Parent_Id TEXT,"+
        "File_Path TEXT,"+
        "Application_Id TEXT,"+
        "Secret_Key TEXT,"+
        "Password TEXT,"+
        "User_Name TEXT)").then(id => {
        }, error => {
            console.log("CREATE TABLE ERROR", error);
        });
   }

   public insertUser() {
        this.database.execSQL("INSERT INTO people (firstname, lastname) VALUES (?, ?)", ["Nic", "Raboy"]).then(id => {
            console.log("INSERT RESULT", id);
            this.fetch();
        }, error => {
            console.log("INSERT ERROR", error);
        });
    }


    public fetch() {
        this.database.all("SELECT * FROM people").then(rows => {
           /*this.people = [];
            for(var row in rows) {
                this.people.push({
                    "firstname": rows[row][1],
                    "lastname": rows[row][2]
                });
            }
            this.people.forEach(element => {
                console.log("----->>>--- " +this.people[0].firstname);
            });*/
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }

}