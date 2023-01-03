import { Route, Routes } from "react-router-dom";
import OrdersPage from "../pages/orders";

export function OrdersRoute() {
    return (
        <Routes>
            <Route path='/' element={<OrdersPage />} />
        </Routes>
    )
}