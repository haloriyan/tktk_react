import { BrowserRouter, Route, Routes } from "react-router-dom";
import './styles/Content.css';
import * as BaseStyle from "./styles/base/index"
import UserRouter from "./User";
import AffiliateRouter from "./Affiliate";
import PageRouter from "./Page";

export default function App() {
    return (
        <BrowserRouter>
            <AffiliateRouter />
            <PageRouter />
            <UserRouter />
        </BrowserRouter>
    )
}