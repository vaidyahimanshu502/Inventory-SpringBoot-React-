import React, { useState, useEffect } from 'react';
import { Layout } from '../layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Purchase = () => 
{
  const [purchaseRequests, setPurchaseRequests] = useState([]); // for localStorage

  //for data manupulations
  const [itemId, setItemId] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [invoice, setInvoice] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedItemPrice, setSelectedItemPrice] = useState(0);
  const [itemName, setItemName] = useState('');

  //for Api calls
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const navigate = useNavigate();  // for navigation

  // Getting all items
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

  // generating random invoice
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

  // getting suppliers
  const getAllSuppliers = async () => 
  {
    try 
    {
      const { data } = await axios.get("http://localhost:8081/api/suppliers");
      if (data) {
        setSuppliers(data);
      }
    } catch (error) {
      console.error(`Error while getting the suppliers: ${error}`);
    }
  };

  useEffect(() => {
    getAllItems();
    getAllSuppliers();
    generateInvoice();

    const storedPurchases = JSON.parse(localStorage.getItem('purchases')) || [];
    setPurchaseRequests(storedPurchases);
  }, []);

  useEffect(() => 
  {
    // fetching item's price by item id
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

  const handleAddPurchase = () => 
  {
    if (!itemId || !supplierId || !quantity) 
    {
      alert('Please fill in all fields.');
      return;
    }

    const newPurchase = {
      invoiceNo: invoice,
      invoiceDate: invoiceDate,
      itemName: itemName,
      itemId: Number(itemId),
      supplierId: Number(supplierId),
      quantity: Number(quantity),
      rate: selectedItemPrice, 
      amount: Number(quantity) * selectedItemPrice, 
    };

    setPurchaseRequests((prevPurchaseRequests) => [...prevPurchaseRequests, newPurchase]);

    setItemId('');
    setQuantity('');

    const updatedPurchases = [...purchaseRequests, newPurchase];
    localStorage.setItem('purchases', JSON.stringify(updatedPurchases));
  };

  const handleCreatePurchases = async () => 
  {
    try {
      const formattedPurchaseRequests = purchaseRequests.map((purchase) => ({
        itemId: purchase.itemId,
        supplierId: purchase.supplierId,
        quantity: purchase.quantity,
        invoiceNo:purchase.invoiceNo,
        invoiceDate: purchase.invoiceDate
      }));
  
      const { data } = await axios.post("http://localhost:8081/api/purchases", formattedPurchaseRequests);
  
      if(data)
      {
        toast.success("Purchase Created Successfully!");
        localStorage.removeItem('purchases');
        setPurchaseRequests([]);
        setInvoice('');
        setInvoiceDate('');
        setSelectedSupplier('');
        navigate("/purchase_list")
      }
    } catch (error) {
      console.error(`Error while creating Purchase: ${error}`);
      toast.error("Failed to create Purchase");
    }
  };
  

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className='text-center text-info'>Purchase Items</h2>
        <div className="row mb-3">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Invoice No</th>
                  <th scope="col">Invoice Date</th>
                  <th scope="col">Supplier</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type='text' className='form-control' value={invoice} readOnly /></td>
                  <td><input type='date' className='form-control' value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} /></td>
                  <td>
                    <select
                      className="form-control"
                      value={selectedSupplier}
                      onChange={(e) => {
                        const selectedSupplierId = e.target.value;
                        setSelectedSupplier(selectedSupplierId);
                        setSupplierId(selectedSupplierId);
                      }}
                    >
                      <option value="">Select Supplier</option>
                      {suppliers.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.supplierName}
                        </option>
                      ))}
                    </select>
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
                  <td><input type="text" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></td>
                  <td>{selectedItemPrice}</td>
                </tr>
              </tbody>
            </table>

            <button className="btn btn-primary" onClick={handleAddPurchase}>Add Item</button>
          </div>

          <div className="col-md-12">
            <h2>Added Purchases</h2>
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
                {purchaseRequests.map((purchase, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{purchase.itemName}</td>
                    <td>{purchase.quantity}</td>
                    <td>{purchase.rate}</td>
                    <td>{purchase.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="btn btn-success" onClick={handleCreatePurchases}>Create Purchases</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Purchase;
