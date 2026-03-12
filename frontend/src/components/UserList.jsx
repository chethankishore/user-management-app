import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function UserList() {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  let {state}=useLocation()
  let navigate=useNavigate()

  const navigateToUser=(userObj)=>{
    navigate('/user',{state:{user:userObj}})
  }
  useEffect(() => {

    async function getUsers() {
      try {
        const res = await fetch("https://user-management-app-uad6.onrender.com/user-api/users");

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch users");
        }

        setUsers(data.payload);

      } catch (err) {
        setError(err.message);
      }
    }

    getUsers();   //  IMPORTANT

  }, []);   // 
//get users


  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-4">List of Users</h1>

      {error && <p className="text-red-500">{error}</p>}

      {users.length === 0 && <p>No users found</p>}

      {users.map((userObj) => (
        <div key={userObj._id} className="border p-4 mb-3 rounded shadow  hover:cursor-pointer " onClick={()=>navigateToUser(userObj)}>
          <p className="text-xl font-semibold">{userObj.name}</p>
          <p>{userObj.email}</p>
        </div>
      ))}

    </div>
  );
}

export default UserList;