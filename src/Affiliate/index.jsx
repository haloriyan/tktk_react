import { Route, Routes } from "react-router-dom";
import AffiliateLogin from "./Login";
import AffiliateDashboard from "./Dashboard";
import AffiliateCoupon from "./Coupon";
import AffiliateMiddleware from "../Middleware/Affiliate";
import AffiliateLogout from "./Logout";
import AffiliateReport from "./Report";

const AffiliateRouter = () => {
    return (
        <Routes>
            <Route path="/affiliate/login" Component={AffiliateLogin} />
            <Route path="/affiliate/logout" Component={AffiliateLogout} />
            <Route path="/affiliate/dashboard" element={<AffiliateMiddleware><AffiliateDashboard /></AffiliateMiddleware>} />
            <Route path="/affiliate/coupon" element={<AffiliateMiddleware><AffiliateCoupon /></AffiliateMiddleware>} />
            <Route path="/affiliate/report" element={<AffiliateMiddleware><AffiliateReport /></AffiliateMiddleware>} />
        </Routes>
    )
}

export default AffiliateRouter;