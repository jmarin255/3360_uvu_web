
import React from 'react';
import MainLayout from '../layouts/MainLayout';
const Boostrap = () => {
  return (
    <MainLayout title= "Bootstrap">
        <div className='container'>
            <div className="row">
                <div className="col-12 col-md-6  bg-danger text-white">Column 1</div>
                <div className="col-12 col-md-6  bg-primary text-white">Column 2</div>
                <div className="col-12 col-md-6  bg-danger text-white">Column 3</div>
            
            </div>
        </div>
     

    </MainLayout>
  );
};

export default  Boostrap;