import React, {useState, useEffect} from 'react'
import { Layout } from '../../components/layout/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const SaleList = () => {
    const [sales, setsales] = useState([]);

    const getAllsales = async () => {
        try {
            const { data } = await axios.get("http://localhost:8081/api/sales");
            if (data) {
                setsales(data);
                toast.success('List of all Sales');
            }
        } catch (error) {
            toast.error('Error while getting the sales.');
            console.log(`Error while loading the sales :: ${error}`);
        }
    }
    useEffect(() => {
        getAllsales();
    }, []);
  return (
    <Layout>
        <div className="container mt-4 items-container" style={{ marginLeft: '12rem' }}>
                <div className='row'>
                    <div className='col-md-10'>
                        <h2 className='text-center text-info'>Sales List</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">S.No.</th>
                                    <th scope="col">Invoice No.</th>
                                    <th scope="col">Invoice Date</th>
                                    <th scope="col">Views</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales?.map((sale, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{sale.invoiceNo}</td>
                                        <td>{sale.invoiceDate}</td>
                                        <td>
                                           <Link to={`/view_sales/${sale.id}`} className='btn btn-primary'>View</Link>
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

export default SaleList