import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const SaleViews = () => {
    const { saleId } = useParams();
    const [items, setItems] = useState([]);
    const [sale, setsale] = useState({});

    const getListOfSales = async () => 
    {
        try 
        {
            const { data } = await axios.get(`http://localhost:8081/api/sales/views/sale_d/${saleId}`);
            if(data)
            {
                console.log(data)
                setItems(data);
            }
        } catch (error) 
        {
            console.log(`Error while getting the List of all sales  :: ${error}`)
        }
    }

    const getSale = async () => 
    {
        try 
        {
        const { data } = await axios.get(`http://localhost:8081/api/sales/views/${saleId}`);
        if (data) 
        {
            console.log(data)
            setsale(data);
        }
        } catch (error) 
        {
        console.log(`Error while getting the single sale  :: ${error}`);
        }
    }

    useEffect(() => {
        getListOfSales();
        getSale();
    }, [])

  return (
    <Layout>
    <div className='container'>
        <div className='row'>
          <div className='col-md-10'>
            <h2 className='text-center text-info'>Sale Bill</h2>
            {sale ? (
                <div>
                    <p>Invoice No: {sale.invoiceNo}</p>
                    <p>Invoice Date: {sale.invoiceDate}</p>
                </div>
            ) : (
                <p>Loading or No Data Available</p>
            )} 
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Rate</th>
                  <th scope="col">Quantity</th>
                  <th scope='col'>Amount</th>
                  <th scope='col'>Customer Name</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.item.item_name}</td>
                    <td>{item.rate}</td>
                    <td>{item.quantity}</td>
                    <td>{item.amount}</td>
                    <td>{item.customerName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </Layout>
  )
}

export default SaleViews