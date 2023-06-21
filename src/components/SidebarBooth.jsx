import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BiHome, BiShoppingBag, BiGroup, BiComment, BiMoney, BiWallet } from 'react-icons/bi';
import { AiOutlineFileText } from 'react-icons/ai';

import '../styles/Sidebar.css';

const SidebarBooth = ({active = 'home', parent = null, user = null}) => {
    const [isActive, setActive] = useState(false);

    const { id } = useParams();

    const prefix = `/booth/${id}`;

    return (
        <>
            <div className={`Sidebar flex column ${isActive ? 'active' : ''}`}>
                <div className="SidebarToggler" onClick={() => setActive(!isActive)}>
                    <div className="inner"></div>
                </div>
                <div className="flex column grow-1">
                    {/* <a href={`/organizer/${org_username}`} className="text primary small">
                        <BiLeftArrowAlt style={{position: 'relative',top: 2,marginRight: 10}} />
                        kembali ke Organizer
                    </a> */}

                    {/* <div className="h-30"></div> */}

                    <a href={`${prefix}`}>
                        <li className={`MenuItem flex row item-center ${active === 'home' ? 'active' : ''}`}><BiHome size={18} className="icon" /> Booth Overview</li>
                    </a>

                    <div className="text small muted mt-2 mb-05">BOOTH SPACE</div>
                    <a href={`${prefix}/handout`}>
                        <li className={`MenuItem flex row item-center ${active === 'handout' ? 'active' : ''}`}><AiOutlineFileText size={18} className="icon" /> Handout</li>
                    </a>
                    <a href={`${prefix}/agent`}>
                        <li className={`MenuItem flex row item-center ${active === 'agent' ? 'active' : ''}`}><BiGroup size={18} className="icon" /> User</li>
                    </a>
                    <a href={`${prefix}/product`}>
                        <li className={`MenuItem flex row item-center ${active === 'product' ? 'active' : ''}`}><BiShoppingBag size={18} className="icon" /> Produk</li>
                    </a>

                    <div className="text small muted mt-2 mb-05">LAPORAN</div>
                    <a href={`${prefix}/visitor`}>
                        <li className={`MenuItem flex row item-center ${active === 'visitor' ? 'active' : ''}`}><BiGroup size={18} className="icon" /> Pengunjung</li>
                    </a>
                    <a href={`${prefix}/product-sales`}>
                        <li className={`MenuItem flex row item-center ${active === 'product-sales' ? 'active' : ''}`}><BiShoppingBag size={18} className="icon" /> Penjualan Produk</li>
                    </a>
                    <a href={`${prefix}/conversation`}>
                        <li className={`MenuItem flex row item-center ${active === 'conversation' ? 'active' : ''}`}><BiComment size={18} className="icon" /> Percakapan</li>
                    </a>

                    <div className="text small muted mt-2 mb-05">FINANCE</div>
                    <a href={`${prefix}/withdraw`}>
                        <li className={`MenuItem flex row item-center ${active === 'withdraw' ? 'active' : ''}`}><BiMoney size={18} className="icon" /> Withdraw</li>
                    </a>
                    <a href={`${prefix}/bank-account`}>
                        <li className={`MenuItem flex row item-center ${active === 'bank-account' ? 'active' : ''}`}><BiWallet size={18} className="icon" /> Rekening Bank</li>
                    </a>
                </div>

                <div className="border-top pt-2 mt-2 flex row wrap">
                    <a href="https://company.agendakota.id" className="text small muted flex grow-1">
                        Bantuan
                    </a>
                    <a href="https://company.agendakota.id" className="text small muted flex grow-1">
                        Panduan
                    </a>
                    <a href="https://company.agendakota.id" className="text small muted flex grow-1">
                        Blog
                    </a>
                </div>
            </div>
        </>
    )
}

export default SidebarBooth;