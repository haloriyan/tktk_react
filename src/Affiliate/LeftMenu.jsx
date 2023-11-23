import React from "react";
import { BiChart, BiHome, BiLogOutCircle } from "react-icons/bi";

const LeftMenu = ({active = 'dashboard', user = null}) => {
    return (
        <div className="fixed top-0 bottom-0 left-0 w-20 text white" style={{backgroundColor: '#00355f'}}>
            {
                user !== null &&
                <div className="p-2 flex row item-center">
                    <div className="h-60 rounded-max ratio-1-1 bg-grey"></div>
                    <div className="flex column grow-1 ml-2">
                        <div>Halo,</div>
                        <h3 className="m-0">Riyan Satria</h3>
                    </div>
                </div>
            }

            <nav className="mt-4">
                <a href="/affiliate/dashboard" className="flex row item-center text white p-15 pl-2 pr-2" style={{
                    backgroundColor: active === 'dashboard' ? '#ffffff' : 'none',
                    color: active === 'dashboard' ? '#00192d' : '#fff',
                }}>
                    <BiHome />
                    <div className="text ml-2">Dashboard</div>
                </a>
                <a href="/affiliate/coupon" className="flex row item-center text white p-15 pl-2 pr-2" style={{
                    backgroundColor: active === 'coupon' ? '#ffffff' : 'none',
                    color: active === 'coupon' ? '#00192d' : '#fff',
                }}>
                    <BiHome />
                    <div className="text ml-2">Coupon</div>
                </a>
                <a href="/affiliate/report" className="flex row item-center text white p-15 pl-2 pr-2" style={{
                    backgroundColor: active === 'report' ? '#ffffff' : 'none',
                    color: active === 'report' ? '#00192d' : '#fff',
                }}>
                    <BiChart />
                    <div className="text ml-2">Report</div>
                </a>
                <a href="/affiliate/logout" className="flex row item-center text white p-15 pl-2 pr-2">
                    <BiLogOutCircle />
                    <div className="text ml-2">Logout</div>
                </a>
            </nav>
        </div>
    )
}

export default LeftMenu