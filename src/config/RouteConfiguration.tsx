import { Routes, Route } from "react-router-dom";
import LandingPage from "../main/LandingPage";
import DashBoard from "../dashboard/DashBoard";
export default function RouteConfiguration() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<DashBoard />} />
            </Routes>
        </div>
    );
}