import { Route, Routes } from "react-router-dom";
import HomePage from "./Home";
import AboutPage from "./About";
import PricingPage from "./Pricing";

import PhotographerUsecase from "./Usecase/Photographer";
import RepairUsecase from "./Usecase/Repair";
import CustomerRelationSolution from "./Solution/CustomerRelation";
import AnalyticSolution from "./Solution/Analytic";
import ProductManagementSolution from "./Solution/ProductManagement";
import PaymentGatewaySolution from "./Solution/PaymentGateway";
import ArtificialCareSolution from "./Solution/ArtificialCare";
import ShippingSolution from "./Solution/Shipping";
import Terms from "./Terms";
import ProductUsecase from "./Usecase/Product";
import Auth from "./Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "../config";
import Privacy from "./Privacy";

const PageRouter = () => {
    return (
        <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/about" Component={AboutPage} />
            <Route path="/pricing" Component={PricingPage} />
            <Route path="/terms" Component={Terms} />
            <Route path="/privacy" Component={Privacy} />
            <Route path="/auth/:token" element={<GoogleOAuthProvider clientId={config.google_client_id}><Auth /></GoogleOAuthProvider>} />

            <Route path="/solution/customer-relation" Component={CustomerRelationSolution} />
            <Route path="/solution/advanced-analytic" Component={AnalyticSolution} />
            <Route path="/solution/product-management" Component={ProductManagementSolution} />
            <Route path="/solution/payment-gateway" Component={PaymentGatewaySolution} />
            <Route path="/solution/artificial-care" Component={ArtificialCareSolution} />
            <Route path="/solution/shipping" Component={ShippingSolution} />

            <Route path="/usecase/product" Component={ProductUsecase} />
            <Route path="/usecase/service" Component={PhotographerUsecase} />
            <Route path="/usecase/photographer" Component={PhotographerUsecase} />
            <Route path="/usecase/repair-service" Component={RepairUsecase} />
        </Routes>
    )
}

export default PageRouter;