import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './components/RootLayout'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import AddUser from './components/AddUser'
import User from './components/User'
import UserList from './components/UserList'

function App() {
  const routerObj=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      children:[
        {
          path:"",
          element:<Home/>
        },{
          path:"adduser",
          element:<AddUser/>

        },{
          path:"users",
          element:<User/>

        },
        {
          path:"userlist",
          element:<UserList/>
        }
      ]
    }
  ])

  return <RouterProvider router={routerObj}/>
   
}

export default App