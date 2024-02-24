
import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

export const Home = () => {
    const [items, setItems]  = useState([]);
    let counter = 1;

    const getItemsList = async () => 
    {
        try {
            const {data} = await axios.get("http://localhost:8081/api/items");
            if(data)
            {
                //console.log(data);
                setItems(data);
                toast.success("List of all Items");
            }
        } catch (error) 
        {
            console.log(`Error While getting the list of all items ${error}`);
        }
    }

    useEffect(() => {
        getItemsList();
    }, [])    

  return (
    <Layout>
      <div className = "container mt-4 items-container" style={{marginLeft:'12rem'}}>
        <div className='row'>
            <div className='col-md-10'>
                <h2 className='text-center text-info'>List of Items</h2>
                <Table striped="columns">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Item Namee</th>
                            <th>Item Desc</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items?.map((item,key) => (
                            <tr key={key}>
                                <td>{counter++}</td>
                                <td>{item.item_name}</td>
                                <td>{item.item_desc}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
               <div>
                  <Link style={{margin:'20px'}} to="/purchase" className='btn btn-outline-primary'>Purchase Items</Link>
                  <Link style={{margin:'20px'}} to="/sale" className='btn btn-outline-primary'>Sale Items</Link>
               </div>
            </div>
        </div>
      </div>
    </Layout>
  );
}

// export default Home;
