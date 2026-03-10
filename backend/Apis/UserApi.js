import express from "express";
export const UserApp = express.Router();

import { UserModel } from "../modules/UserModel.js";


// ================= CREATE USER =================
UserApp.post("/users", async (req, res, next) => {
  
    const newUser = req.body;

    const newUserDocument = new UserModel(newUser);
    await newUserDocument.save();

    res.status(201).json({ message: "User created" });


});


// ================= READ ALL USERS =================
UserApp.get("/users", async (req, res) => {
  
    const users = await UserModel.find({status:true});
    res.status(200).json({ message: "All users", payload: users });

});


// ================= READ USER BY ID =================
UserApp.get("/users/:id", async (req, res) => {
  
    const uid = req.params.id;

    const user = await UserModel.findById(uid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User found", payload: user });

});


// ================= UPDATE USER =================
// UserApp.put("/users/:id", async (req, res, next) => {
//   try {
//     const uid = req.params.id;
//     const modifiedUser = req.body;

//     const updatedUser = await UserModel.findByIdAndUpdate(
//       uid,
//       modifiedUser,
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ message: "User updated", payload: updatedUser });

//   } catch (err) {
//     next(err);
//   }
// });


// ================= DELETE USER =================
UserApp.delete("/users/:id", async (req, res) => {
  
    const uid = req.params.id;

    const deletedUser = await UserModel.findByIdAndUpdate(uid,{$set:{status:true}},{new:true});

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted" })

});

//Activate user(change status to true)
UserApp.patch("/users/:id",async(req,res)=>{
//PUT and PATCH 
 let uid = req.params.id;
 //find user and change status to true

    const deletedUser = await UserModel.findByIdAndUpdate(uid,{$set:{status:true}},{new:true});

   //send res
    res.status(200).json({ message: "User Activated",payload:deletedUser })
})




//Update user by IDv