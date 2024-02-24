import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Login from '../forms/Login';

export const AdminRoutes = () => {
    const [ok, setOk] = useState("");

    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    useEffect(() => {
        const checkOk = () => {
            try {
                if(parsedUser)
                {
                    setOk("User Exist");
                    toast.success("Authenticated!");
                } else {
                    toast.error("You are not authenticated.");
                }
            } catch (error) {
                console.log(`Error while Authentication ${error}`);
            }
        }
        checkOk();
    },[user])
  return  ok ? <Outlet /> : <Login />;
}
