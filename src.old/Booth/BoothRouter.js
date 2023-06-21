import { Route, Routes } from "react-router-dom";
import BoothAgent from "./Agent";
import BoothHandout from "./Handout";
import BoothHome from "./Home";
import BoothProduct from "./Product";
import BoothBank from "./Bank";

const BoothRouter = () => {
    return (
        <Routes>
            <Route path="/booth/:id/agent" Component={BoothAgent} />
            <Route path="/booth/:id/handout" Component={BoothHandout} />
            <Route path="/booth/:id/product" Component={BoothProduct} />
            <Route path="/booth/:id/bank-account" Component={BoothBank} />
            <Route path="/booth/:id" Component={BoothHome} />
        </Routes>
    )
}

export default BoothRouter;