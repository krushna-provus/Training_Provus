"use client";

import "./../../globals.css";
import { useState } from "react";
import { ComplexDashboardContext } from "./loginContext/loginContext";



export default function ComplexDashboardLayout(
    {children,analytics,revenue,notifications,login}:
    {
        children : React.ReactNode,
        analytics : React.ReactNode,
        revenue : React.ReactNode,
        notifications : React.ReactNode,
        login : React.ReactNode
    }
){

    const [loggedIn,setLoggedIn] = useState(false);

    return (

        <ComplexDashboardContext.Provider
          value={{ toggle: setLoggedIn, value: loggedIn }}
        >
          {loggedIn ? (
            <div className="flex flex-col">
              {children}
              <div className="grid grid-cols-2 gap-1.5">
                <div className="flex flex-col gap-1.5">
                  <div>{analytics}</div>
                  <div>{revenue}</div>
                </div>
                <div>{notifications}</div>
              </div>
            </div>
          ) : (
            login
          )}
        </ComplexDashboardContext.Provider>
  );
}