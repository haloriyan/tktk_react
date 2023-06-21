import { Route, Routes, useParams } from "react-router-dom";
import Home from "./Home";
import LoadingScreen from "../Partials/LoadingScreen";
import Product from "./Product";
import Service from "./Service";
import Customer from "./Customer";
import Cart from "./Cart";
import CustomerOrderDetail from "./Customer/OrderDetail";
import CustomerOrder from "./Customer/Order";
import Chat from "./Chat";

const UserRouter = () => {
    return (
        <Routes>
            <Route path="/:username" Component={Home} />
            <Route path="/:username/product/:slug" Component={Product} />
            <Route path="/:username/service/:slug" Component={Service} />
            <Route path="/:username/me" Component={Customer} />
            <Route path="/:username/cart" Component={Cart} />
            <Route path="/:username/chat" Component={Chat} />

            <Route path="/:username/order/" Component={CustomerOrder} />
            <Route path="/:username/order/:code" Component={CustomerOrderDetail} />
            <Route path="/loading" Component={LoadingScreen} />
        </Routes>
    )
}

export default UserRouter;