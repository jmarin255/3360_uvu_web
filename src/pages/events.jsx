


import React from 'react';

import MainLayout from '../layouts/MainLayout';

const Easybutton=()=> {
    const handleClick= (event)=>{
        alert("That was easy")
        console.log(event)
    }
    return(
        <button  onClick={handleClick}className="btn btn-primary">Easy Button</button>
    );
};

const EventPreventDefault=()=> {
    const HandleSubmit= (event) =>{
        alert("form submitted")
    };
    return (
        <form onSubmit={HandleSubmit}>
            <button className="btn btn-primary" type="submit">Submit</button>
        </form>
    );
};

const Events = () => {
  return (
    <MainLayout title= "events">
        <div className="Container">
            <div className="row">
                <div className='col'>
                    <h2>Easy Button</h2>
                    <Easybutton/>
                    <h3>Submit button</h3>
                    <EventPreventDefault/>
                </div>
            </div>
        </div>
      
    </MainLayout>
  );
};

export default Events;