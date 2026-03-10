import { Schema,model } from "mongoose";
//create user schema' with validation
const userSchema=new Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already existed"]
    },
    dateOfBirth:{
        type:Date,
        required:[true,"dateOfBirth is required"],
        
    },
    mobileNumber:{
        type:Number
    },
    status:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true,
    versionKey:false,
    strict:"throw"
},

)
//create user model for user schema
 export const UserModel=model("user",userSchema)