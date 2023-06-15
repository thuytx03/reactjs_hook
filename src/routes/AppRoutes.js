import { Routes, Route } from "react-router-dom";
import React from 'react'
import Home from "../components/Home";
import { Login } from "../components/Login";
import TableUsers from "../components/TableUsers";
import PrivateRoute from "./PrivateRoute";
const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                <Route path="/users"
                    element={
                        <PrivateRoute >
                            <TableUsers />
                        </PrivateRoute>}>
                </Route>
            </Routes>

        </>
    )
}
export default AppRoutes;