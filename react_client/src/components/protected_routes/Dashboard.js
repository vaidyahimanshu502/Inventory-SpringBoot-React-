import React from 'react'
import { Layout } from '../layout/Layout'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
  return (
    <Layout>
      <div className='container'>
        <div className='row' style={{}}>
          <div className='col-md-2 mt-2' style={{display:'flex', flexDirection:'column', borderRight: '3px solid green'}}>
            <Link className='btn btn-outline-warning' style={{
              fontSize:'14px',
              textDecoration: 'none',
              color:'gray',
              border:'2px solod white',
              maxWidth:'10vw',
              padding:'5px',
              borderRadius:'8px',
              margin:'5px',
             }} to={"/admin/item_management"} >Item Management</Link>
              <Link className='btn btn-outline-warning' style={{
              fontSize:'14px',
              textDecoration: 'none',
              color:'black',
              maxWidth:'10vw',  
              border:'2px solod white',
              padding:'5px',
              borderRadius:'8px',
              margin:'5px',
              }} to={"/admin/supplier_management"} >Supplier Management</Link>
          </div>
          <div className='col-md-8 mt-3'>
            <div className='d-flex' style={{flexDirection:'column'}}>
              <h1 className='text-center'>Admin Name :</h1>
              <p className='text-center'><strong>Admin Email:</strong></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
