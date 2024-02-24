import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const PurchaseList = () => {
    const [purchases, setPurchases] = useState([]);

    const getAllPurchases = async () => {
        try {
            const { data } = await axios.get("http://localhost:8081/api/purchases");
            if (data) {
                setPurchases(data);
                toast.success('List of all Purchases');
            }
        } catch (error) {
            toast.error('Error while getting the purchases.');
            console.log(`Error while loading the purchases :: ${error}`);
        }
    }
    useEffect(() => {
        getAllPurchases();
    }, []);
    return (
        <Layout>
            <div className="container mt-4 items-container" style={{ marginLeft: '12rem' }}>
                <div className='row'>
                    <div className='col-md-10'>
                        <h2 className='text-center text-info'>Purchase List</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">S.No.</th>
                                    <th scope="col">Invoice No.</th>
                                    <th scope="col">Invoice Date</th>
                                    <th scope='col'> Supplier Name </th>
                                    <th scope="col">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchases?.map((purchase, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{purchase.invoiceNo}</td>
                                        <td>{purchase.invoiceDate}</td>
                                        <td>{purchase.supplier.supplierName}</td>
                                        <td>
                                            <Link to={`/view_details/${purchase.id}`} className='btn btn-primary'>View</Link>
                                        </td>
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

export default PurchaseList;
