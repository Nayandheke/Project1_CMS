import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { Layout } from "../components"
import * as Pages from "../pages"
import { PrivateRoutes } from "./PrivateRoutes"
import {AdminRoutes} from "./AdminRoutes"


export const CmsRoutes = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PrivateRoutes element={<Pages.Dashboard />} />} />

                <Route path="edit-profile" element={<PrivateRoutes element={<Pages.Profile.Edit />} />} />

                <Route path="changepassword" element={<PrivateRoutes element={<Pages.Profile.Password />} />} />

                <Route path="staffs" element={<PrivateRoutes element={<AdminRoutes element={<Outlet/>}/>} />}>
                    <Route index element={<Pages.Staffs.List/>} />
                    <Route path="create" element={<Pages.Staffs.Create/>} />
                </Route>

                <Route path="login" element={<Pages.Login />} />
            </Route>

        </Routes>
    </BrowserRouter>
}