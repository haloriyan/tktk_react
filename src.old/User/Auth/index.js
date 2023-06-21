import Login from "./Login";
import Register from "./Register";
import ForgetPassword from "./ForgetPassword";
import Activate from "./Activate";
import { Route, Routes } from "react-router-dom";
import Otp from "./Otp";
import Logout from "./Logout";
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "../../config";

const GoogleOAuthWrapper = ({ children, ...rest }) => (
    <GoogleOAuthProvider clientId={config.google_client_id}>
        {children}
    </GoogleOAuthProvider>
)

const Auth = () => {
    return (
        <Routes>
            <Route path="/login" element={<GoogleOAuthWrapper><Login /></GoogleOAuthWrapper>} />
            <Route path="/register" element={<GoogleOAuthWrapper><Register /></GoogleOAuthWrapper>} />
            <Route path="/logout" Component={Logout} />
            <Route path="/otp" Component={Otp} />
            <Route path="/activate/:email" Component={Activate} />
            <Route path="/forget-password" Component={ForgetPassword} />
        </Routes>
    )
}

export default Auth;