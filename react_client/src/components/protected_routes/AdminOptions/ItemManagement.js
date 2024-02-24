import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Layout } from "../../layout/Layout";
import { Link } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { BsFillPencilFill } from "react-icons/bs";

export const ItemManagement = () => {
  const [items, setItems] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemPrice, setItemPrice]  = useState('');

  const [newItemName, setNewItemName] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemPrice, setNewItemPrice] = useState('');

  const getListOfAllItems = async () => {
    try {
      const { data } = await axios.get("http://localhost:8081/api/items");
      if (data) {
        setItems(data);
        toast.success("List of Items");
      }
    } catch (error) {
      toast.error("Error while loading items!");
      console.log(`Error while loading the Items :: ${error}`);
    }
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setItemName(item.item_name || "");
    setItemDesc(item.item_desc || "");
    setItemPrice(item.price || "")
    setShowEditForm(true);
  };

  const handleDeleteClick = async (itemId) => {
    try {
      let deleteCheck = window.confirm("Do you really want to delete?");
      if (deleteCheck) {
        await axios.delete(`http://localhost:8081/api/items/${itemId}`);
        getListOfAllItems();
        toast.success("Item deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting item");
      console.log(`Error deleting item :: ${error}`);
    }
  };

  const handleAddItemClick = () => {
    setNewItemName("");
    setNewItemDesc("");
    setNewItemPrice("");
    setShowAddForm(true);
  };

  const handleAddItem = async () => {
    try {
      const { data } = await axios.post("http://localhost:8081/api/items", {
        item_name: newItemName,
        item_desc: newItemDesc,
        price: newItemPrice
      });

      if (data) {
        toast.success("Item added successfully");
        setShowAddForm(false);
        getListOfAllItems();
      }
    } catch (error) {
      toast.error("Error adding item");
      console.log(`Error adding item :: ${error}`);
    }
  };

  const handleUpdateItem = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:8081/api/items/${selectedItem.id}`,
        {
          item_name: itemName,
          item_desc: itemDesc,
          price:itemPrice
        }
      );

      if (data) {
        toast.success("Item updated successfully");
        setShowEditForm(false);
        getListOfAllItems();
      }
    } catch (error) {
      toast.error("Error updating item");
      console.log(`Error updating item :: ${error}`);
    }
  };

  useEffect(() => {
    getListOfAllItems();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      setItemName(selectedItem.item_name || "");
      setItemDesc(selectedItem.item_desc || "");
      setItemPrice(selectedItem.price || "");
    }
  }, [selectedItem]);

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
              <h1 className="text-center text-primary mt-3">Manage Your Items</h1>
              <button
                style={{ maxWidth: "10vh" }}
                className="btn btn-primary mt-2"
                onClick={handleAddItemClick}
              >
                +Add
              </button>
              <div>
                <table className="table table-striped table-dark">
                  <thead>
                    <tr>
                      <th scope="col">S. No.</th>
                      <th scope="col">Item Name</th>
                      <th scope="col">Item Desc</th>
                      <th scope="col">Price</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.item_name}</td>
                        <td>{item.item_desc}</td>
                        <td>{item.price}</td>
                        <td>
                          <button
                            style={{ margin: "3px" }}
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeleteClick(item.id)}
                          >
                            <FaTrashCan />
                          </button>
                          <button
                            style={{ margin: "3px" }}
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleEditClick(item)}
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
                <div
                  className="modal"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "fixed",
                    top: "25%",
                    left: "25%",
                    maxWidth: "50%",
                    justifyContent: "center",
                  }}
                >
                  <div className="modal-content" style={{ margin: "10px" }}>
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
                        handleUpdateItem();
                      }}
                      className="text-center"
                      style={{ margin: "10px" }}
                    >
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          onChange={(e) => setItemName(e.target.value)}
                          className="form-control"
                          id="new_item_name"
                          placeholder="New Item Name"
                          value={itemName}
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="number"
                          onChange={(e) => setItemPrice(e.target.value)}
                          className="form-control"
                          id="new_item_desc"
                          placeholder="New Item Description"
                          value={itemPrice}
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          onChange={(e) => setItemDesc(e.target.value)}
                          className="form-control"
                          id="new_item_desc"
                          placeholder="New Item Description"
                          value={itemDesc}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mt-3"
                      >
                        Update Item
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
                <div
                  className="modal"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "fixed",
                    top: "25%",
                    left: "25%",
                    maxWidth: "50%",
                    justifyContent: "center",
                  }}
                >
                  <div className="modal-content" style={{ margin: "10px" }}>
                    <span
                      className="close"
                      onClick={() => setShowAddForm(false)}
                    >
                      &times;
                    </span>
                    <h2 className="text-center mt-2">Add Item Form</h2>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAddItem();
                      }}
                      className="text-center"
                      style={{ margin: "10px" }}
                    >
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          onChange={(e) => setNewItemName(e.target.value)}
                          className="form-control"
                          id="new_item_name"
                          placeholder="New Item Name"
                          value={newItemName}
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="number"
                          onChange={(e) => setNewItemPrice(e.target.value)}
                          className="form-control"
                          id="new_item_desc"
                          placeholder="New Item Description"
                          value={newItemPrice}
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          onChange={(e) => setNewItemDesc(e.target.value)}
                          className="form-control"
                          id="new_item_desc"
                          placeholder="New Item Description"
                          value={newItemDesc}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mt-3"
                      >
                        Add Item
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
