import React from "react"
import { Navigate, Outlet} from "react-router-dom"

 export function Admin(){
  const isAuth = localStorage.getItem("isAuth");
  const role = localStorage.getItem("role");
 
    if(isAuth && role==="Admin")
    return <Outlet/>
    else return  <Navigate to={"/"}/>;
  }

 export function User(){
  const isAuth = localStorage.getItem("isAuth");
  const role = localStorage.getItem("role");
 
    if(isAuth && role==="User")
    return <Outlet/>
    else return  <Navigate to={"/"}/>;
    }