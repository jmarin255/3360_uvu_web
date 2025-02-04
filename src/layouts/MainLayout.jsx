import React, { useEffect } from "react";
import MainNav from "../pages/MainNav";
import MainFooter from "../pages/MainFooter";


const MainLayout= ({children, title})=> {
    useEffect(()=> {
        if(title)
        {
            document.title=title;
        }

    

    }, [title]);
    return(
        <div>
            <MainNav />
            {children}

            <MainFooter/>
        </div>

    );
}

export default MainLayout