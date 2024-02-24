import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import './App.css';
import Login from "./components/forms/Login";
import { Dashboard } from "./components/protected_routes/Dashboard";
import { AdminRoutes } from "./components/protected_routes/AdminRoutes";
import { ItemManagement } from "./components/protected_routes/AdminOptions/ItemManagement";
import { SupplierManagement } from './components/protected_routes/AdminOptions/SupplierManagement';
import Purchase from "./components/actions/Purchase";
import { Sale } from "./components/actions/Sale";
import PurchaseList from "./pages/views/PurchaseList";
import PurchaseView from "./pages/views/PurchaseView";
import SaleList from "./pages/views/SaleList";
import SaleViews from "./pages/views/SaleViews";

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />

              {/* Protected Routes for Admin */}
              <Route path="/admin/*" element={<AdminRoutes />} >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="item_management" element={<ItemManagement />} />
                <Route path="supplier_management" element={<SupplierManagement />} />
              </Route>

              <Route path="/purchase" element={<Purchase />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/purchase_list" element={<PurchaseList />} />
              <Route path="/view_details/:purchaseId" element={<PurchaseView />} />
              <Route path="/sale_lists" element={<SaleList />} />
              <Route path="/view_sales/:saleId" element={<SaleViews />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
