import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Layout } from "../../layout/Layout";
import { Link } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { BsFillPencilFill } from "react-icons/bs";

export const SupplierManagement = () => {
  const [suppliers, setSupplier] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

//   for update
  const [supplierName, setSupplierName] = useState("");
  const [supAddress, setSupAddress] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [mob, setMob] = useState("");

// for Add
  const [newSupName, setNewSupName] = useState("");
  const [newSupMob, setNewSupMob] = useState("");
  const [newSupAddress, setNewSupAddress] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newGender, setNewGender] = useState("");

  const getListOfAllSuppliers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8081/api/suppliers");
      if (data) {
        setSupplier(data);
        toast.success("List of Suppliers");
      }
    } catch (error) {
      toast.error("Error while loading Suppliers!");
      console.log(`Error while loading the Suppliers :: ${error}`);
    }
  };

  const handleEditClick = (supplier) => {
    setSelectedSupplier(supplier);
    setSupplierName(supplier.supplierName || "");
    setSupAddress(supplier.address || "");
    setNewSupMob(supplier.supplierMob || "")
    setEmail(supplier.email || "")
    setGender(supplier.gender || "")
    setShowEditForm(true);
  };

  const handleDeleteClick = async (supplierId) => {
    try {
      let deleteCheck = window.confirm("Do you really want to delete?");
      if (deleteCheck) {
        await axios.delete(`http://localhost:8081/api/suppliers/${supplierId}`);
        getListOfAllSuppliers();
        toast.success("Supplier deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting Supplier");
      console.log(`Error deleting supplier :: ${error}`);
    }
  };

  const handleAddSupplierClick = () => {
    setNewSupAddress("");
    setNewSupMob("");
    setNewEmail("");
    setNewGender("");
    setNewSupName("")
    setShowAddForm(true);
  };

  const handleAddSupplier = async () => {
    try {
      const { data } = await axios.post("http://localhost:8081/api/suppliers", {
        supplierName: newSupName,
        address: newSupAddress,
        supplierMob: newSupMob,
        email: newEmail,
        gender: newGender
      });

      if (data) {
        toast.success("Supplier added successfully");
        setShowAddForm(false);
        getListOfAllSuppliers();
      }
    } catch (error) {
      toast.error("Error adding supplier");
      console.log(`Error adding supplier :: ${error}`);
    }
  };

  const handleUpdateSupplier = async () => {
    try {
      if (selectedSupplier) {
        const { data } = await axios.put(
          `http://localhost:8081/api/suppliers/${selectedSupplier.id}`,
          {
            supplierName: supplierName,
            address: supAddress,
            supplierMob: mob,
            email: email,
            gender: gender
          }
        );
  
        if (data) {
          toast.success("Supplier updated successfully");
          setShowEditForm(false);
          getListOfAllSuppliers();
        }
      } else {
        console.error("Selected supplier is undefined");
      }
    } catch (error) {
      toast.error("Error updating supplier");
      console.log(`Error updating supplier :: ${error}`);
    }
  };
  

  useEffect(() => {
    getListOfAllSuppliers();
  }, []);

  useEffect(() => {
    if (selectedSupplier) {
        setSupplierName(selectedSupplier.supplierName || "");
        setSupAddress(selectedSupplier.address || "");
        setEmail(selectedSupplier.email || "")
        setGender(selectedSupplier.gender || "")
        setMob(selectedSupplier.supplierMob || "")
    }
  }, [selectedSupplier]);

  console.log(suppliers)

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div
            className="col-md-2 mt-2"
            style={{
              display: "flex",
              flexDirection: "column",
              borderRight: "3px solid green",
            }}
          >
            <Link
              className="btn btn-outline-warning"
              style={{
                fontSize: "14px",
                textDecoration: "none",
                color: "gray",
                border: "2px solid white",
                maxWidth: "10vw",
                padding: "5px",
                borderRadius: "8px",
                margin: "5px",
              }}
              to={"/admin/item_management"}
            >
              Item Management
            </Link>
            <Link
              className="btn btn-outline-warning"
              style={{
                fontSize: "14px",
                textDecoration: "none",
                color: "black",
                maxWidth: "10vw",
                border: "2px solid white",
                padding: "5px",
                borderRadius: "8px",
                margin: "5px",
              }}
              to={"/admin/supplier_management"}
            >
              Supplier Management
            </Link>
          </div>
          <div className="col-md-10 mt-3 mb-3">
            <div className="d-flex" style={{ flexDirection: "column" }}>
              <h1 className="text-center text-primary mt-3">Manage Your Suppliers</h1>
              <button
                style={{ maxWidth: "10vh" }}
                className="btn btn-primary mt-2"
                onClick={handleAddSupplierClick}
              >
                +Add
              </button>
              <div>
                <table className="table table-striped table-dark">
                  <thead>
                    <tr>
                      <th scope="col">S. No.</th>
                      <th scope="col">Supplier Name</th>
                      <th scope="col">Supplier Address</th>
                      <th scope="col">Supplier Email</th>
                      <th scope="col">Supplier Mobile</th>
                      <th scope="col">Supplier Gender</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers?.map((supplier, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{supplier.supplierName}</td>
                        <td>{supplier.address}</td>
                        <td>{supplier.email}</td>
                        <td>{supplier.supplierMob}</td>
                        <td>{supplier.gender}</td>
                        <td>
                          <button
                            style={{ margin: "3px" }}
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeleteClick(supplier.id)}
                          >
                            <FaTrashCan />
                          </button>
                          <button
                            style={{ margin: "3px" }}
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleEditClick(supplier)}
                          >
                            <BsFillPencilFill />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {showEditForm && (
                 <div className="modal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', top: '-25%', left: '25%', maxWidth: '50%', justifyContent: 'center' }}>
                  <div className="modal-content" style={{ margin: "10px", top:'0' }}>
                    <span
                      className="close"
                      onClick={() => setShowEditForm(false)}
                    >
                      &times;
                    </span>
                    <h2 className="text-center mt-2">Update Item Form</h2>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateSupplier();
                      }}
                      className="text-center"
                      style={{ margin: "10px" }}
                    >
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          onChange={(e) => setSupplierName(e.target.value)}
                          className="form-control"
                          id="new_item_name"
                          placeholder="New Supplier Name"
                          value={supplierName}
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          onChange={(e) => setSupAddress(e.target.value)}
                          className="form-control"
                          id="new_item_desc"
                          placeholder="New Supp Address"
                          value={supAddress}
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          id="new_item_desc"
                          placeholder="New Supp Email"
                          value={email}
                        />
                      </div>
                      <div className="form-group mt-3">
                        <select
                            id="gender"
                            className="form-control"
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                         >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>
                        </div>
                        <div className="form-group mt-3">
                        <input
                          type="number"
                          onChange={(e) => setMob(e.target.value)}
                          className="form-control"
                          id="new_item_desc"
                          placeholder="New Supp Email"
                          value={mob}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mt-3"
                      >
                        Update Supplier
                      </button>
                      <button
                        className="btn btn-secondary mt-3 ml-3"
                        onClick={() => setShowEditForm(false)}
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              )}
              {showAddForm && (
                 <div className="modal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', top: '-25%', left: '25%', maxWidth: '50%', justifyContent: 'center' }}>
                  <div className="modal-content" style={{ margin: "10px" }}>
                    <span
                      className="close"
                      onClick={() => setShowAddForm(false)}
                    >
                      &times;
                    </span>
                    <h2 className="text-center mt-2">Add Supplier Form</h2>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAddSupplier();
                      }}
                      className="text-center"
                      style={{ margin: "10px" }}
                    >
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          onChange={(e) => setNewSupName(e.target.value)}
                          className="form-control"
                          id="new_item_name"
                          placeholder="New Supplier Name"
                          value={newSupName}
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          onChange={(e) => setNewSupAddress(e.target.value)}
                          className="form-control"
                          id="new_item_desc"
                          placeholder="New Supp Address"
                          value={newSupAddress}
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          onChange={(e) => setNewEmail(e.target.value)}
                          className="form-control"
                          id="new_item_desc"
                          placeholder="New Supp Email"
                          value={newEmail}
                        />
                      </div>
                      <div className="form-group mt-3">
                        <select
                            id="gender"
                            className="form-control"
                            onChange={(e) => setNewGender(e.target.value)}
                            value={newGender}
                         >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>
                        </div>
                        <div className="form-group mt-3">
                        <input
                          type="number"
                          onChange={(e) => setNewSupMob(e.target.value)}
                          className="form-control"
                          id="new_item_desc"
                          placeholder="New Supp Email"
                          value={newSupMob}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mt-3"
                      >
                        Add Supplier
                      </button>
                      <button
                        className="btn btn-secondary mt-3 ml-3"
                        onClick={() => setShowAddForm(false)}
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
