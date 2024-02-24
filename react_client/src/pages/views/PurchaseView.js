import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PurchaseView = () => 
{
  const { purchaseId } = useParams();
  const [items, setItems] = useState([]);
  const [purchase, setPurchase] = useState({});

  const getListOfPurchases = async () => 
  {
    try 
    {
        const { data } = await axios.get(`http://localhost:8081/api/purchases/view/${purchaseId}`);
        if(data)
        {
            setItems(data);
        }
    } catch (error) 
    {
        console.log(`Error while getting the purchases :: ${error}`)
    }
  }

  const getPurchase = async () => 
  {
    try 
    {
      const { data } = await axios.get(`http://localhost:8081/api/purchases/${purchaseId}`);
      if (data) 
      {
        setPurchase(data);
      }
    } catch (error) 
    {
      console.log(`Error while getting the purchase :: ${error}`);
    }
  }

  useEffect(() => {
     getListOfPurchases();
     getPurchase();
  }, [])

  return (
    <Layout>
        <div className='container'>
        <div className='row'>
          <div className='col-md-10'>
            <h2 className='text-center text-info'>Purchase Bill</h2>
            {purchase ? (
                <div>
                    <p>Invoice No: {purchase.invoiceNo}</p>
                    <p>Invoice Date: {purchase.invoiceDate}</p>
                    <p>Supplier: {purchase.supplier?.supplierName}</p>
                    <p>Supplier Address: {purchase.supplier?.address}</p>
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
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.item.item_name}</td>
                    <td>{item.item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PurchaseView;
