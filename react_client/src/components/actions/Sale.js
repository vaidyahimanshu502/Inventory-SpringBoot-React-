import React, { useState, useEffect } from 'react';
import { Layout } from '../layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Sale = () => {
  const [items, setItems] = useState([]);
  const [saleRequests, setsaleRequests] = useState([]);
  const [customerName, setyCustomerName] = useState('');
  const [customerMob, setCustomermob] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [invoice, setInvoice] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [rate, setRate] = useState('');
  const [selectedItemPrice, setSelectedItemPrice] = useState(0);
  const [itemName, setItemName] = useState('');

  const navigate = useNavigate();

  const getAllItems = async () => 
  {
    try 
    {
      const { data } = await axios.get("http://localhost:8081/api/items");
      if (data) 
      {
        setItems(data);
      }
    } catch (error) {
      console.error(`Error while getting the items: ${error}`);
    }
  };

  const generateInvoice = () => 
  {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let newInvoice = '';

    for (let i = 0; i < 10; i++) 
    {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newInvoice += chars.charAt(randomIndex);
    }
    setInvoice(newInvoice);
  };

  useEffect(() => 
  {
    getAllItems();
    generateInvoice();

    const storedSales = JSON.parse(localStorage.getItem('sales')) || [];
    setsaleRequests(storedSales);
  }, []);

  useEffect(() => {
    const fetchItemPrice = async () => 
    {
      if (itemId) 
      {
        try 
        {
          const { data } = await axios.get(`http://localhost:8081/api/items/${itemId}`);
          setSelectedItemPrice(data ? data.price : 0);
        } catch (error) {
          console.error(`Error while fetching item price: ${error}`);
        }
      } else {
        setSelectedItemPrice(0);
      }
    };

    fetchItemPrice();
  }, [itemId]);

  const handleAddSale = () => 
  {
    if (!itemId || !quantity || !rate) 
    {
      alert('Please fill in all fields for the item.');
      return;
    }

    const newSale = {
      customerName: customerName,
      customerMob: customerMob,
      customerAddress: customerAddress,
      invoiceNo: invoice,
      invoiceDate: invoiceDate,
      itemName: itemName,
      itemId: Number(itemId),
      quantity: Number(quantity),
      rate: Number(rate),
      amount: Number(quantity) * rate,
    };

    setsaleRequests((prevsaleRequests) => [...prevsaleRequests, newSale]);

    setItemId('');
    setQuantity('');
    setRate('');
  };

  const handleCreatesales = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const formattedsaleRequests = saleRequests.map((sale) => ({
        itemId: sale.itemId,
        quantity: sale.quantity,
        rate: sale.rate,
        invoiceNo: sale.invoiceNo,
        invoiceDate: sale.invoiceDate,
        customerName: sale.customerName,
        customerMob: sale.customerMob,
        customerAddress: sale.customerAddress,
      }));

      const { data } = await axios.post("http://localhost:8081/api/sales", formattedsaleRequests);

      if(data)
      {
        toast.success("sale Created Successfully!");
        localStorage.removeItem('sales');
        setsaleRequests([]);
        setInvoice('');
        setInvoiceDate('');
        setyCustomerName('');
        setCustomermob('');
        setCustomerAddress('');
        setRate('');
        setQuantity('');
        navigate("/sale_lists");
      }
    } catch (error) {
      console.error(`Error while creating sale: ${error}`);
      toast.error("Failed to create sale");
    }
  };
  
  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="text-center text-info">Sale Items</h2>
        <div className="row mb-3">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Invoice No :</th>
                  <th scope="col">Invoice Date :</th>
                  <th scope="col">Customer Name :</th>
                  <th scope="col">Customer Mob :</th>
                  <th scope="col">Customer Address :</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input className="form-control" type="text" value={invoice} readOnly />
                  </td>
                  <td>
                    <input className="form-control" type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
                  </td>
                  <td>
                    <input className="form-control" type="text" onChange={(e) => setyCustomerName(e.target.value)} />
                  </td>
                  <td>
                    <input className="form-control" type="number" onChange={(e) => setCustomermob(e.target.value)} />
                  </td>
                  <td>
                    <textarea
                      style={{ maxHeight: '5rem' }}
                      className="form-control"
                      rows={10}
                      cols={20}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Items</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Saling Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <select
                      className="form-control"
                      id="itemId"
                      value={itemId}
                      onChange={async (e) => {
                        const selectedItemId = e.target.value;
                        setItemId(selectedItemId);
                        const { data } = await axios.get(`http://localhost:8081/api/items/${selectedItemId}`);
                        if (data) {
                          setSelectedItemPrice(data.price);
                          setItemName(data.item_name);
                        } else {
                          setSelectedItemPrice(0);
                        }
                      }}
                    >
                      <option value="">Select Item</option>
                      {items.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.item_name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input type="text" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                  </td>
                  <td>{selectedItemPrice}</td>
                  <td>
                    <input type="number" className="form-control" id="salingPrice" value={rate} onChange={(e) => setRate(e.target.value)} />
                  </td>
                </tr>
              </tbody>
            </table>

            <button className="btn btn-primary" onClick={handleAddSale}>
              Add Item
            </button>
          </div>

          <div className="col-md-12">
            <h2>Added sales</h2>
            <table className="table">
              <thead>
                <tr>
                  <td>S.No.</td>
                  <th scope="col">Item Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Rate</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {saleRequests.map((sale, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{sale.itemName}</td>
                    <td>{sale.quantity}</td>
                    <td>{sale.rate}</td>
                    <td>{sale.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="btn btn-success" onClick={handleCreatesales}>
              Create sales
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
