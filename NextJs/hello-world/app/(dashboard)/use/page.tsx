"use client";

import { Suspense } from "react";
import UseApi from "./useApi";

export default function UseApiData(){
    return <>
        <Suspense fallback={<div>Loading...</div>}>
             <UseApi />
        </Suspense>
    </>
}