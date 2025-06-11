import { Routes, Route } from "react-router-dom";
import LandingPage from "../LandingPage";
export default function RouteConfiguration() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </div>
    );
}