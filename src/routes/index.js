import { Navigate, Route, Routes } from "react-router-dom";
import GuardRoute from "../components/GuardRoute";
import GuestOnlyRoute from "../components/GuestOnlyRoute";
import SNavbar from "../components/Navbar";
import SignIn from "../pages/signin";
import { CategoriesRoute } from "./CategoriesRoute";
import { HomeRoute } from "./HomeRoute";
import { PaymentsRoute } from "./PaymentsRoute";
import { TalentsRoute } from "./TalentsRoute";

export function AppRoutes() {
    return (
        <Routes>
            <Route path='/login' element={<GuestOnlyRoute> <SignIn /> </GuestOnlyRoute>} />
            <Route path='/' element={<> <SNavbar /> <GuardRoute /> </>} >
                <Route path="dashboard/*" element={<HomeRoute />} />
                <Route path="categories/*" element={<CategoriesRoute />} />
                <Route path="talents/*" element={<TalentsRoute />} />
                <Route path="payments/*" element={<PaymentsRoute />} />

                <Route path="" element={<Navigate to={'/dashboard'} replace={true} />} />
            </Route>
        </Routes>
    )
}