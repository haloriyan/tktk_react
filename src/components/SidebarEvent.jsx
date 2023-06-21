import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BiHome, BiEdit, BiQr, BiCalendar, BiTime, BiLeftArrowAlt, BiGroup, BiQrScan, BiCertification } from 'react-icons/bi';
import { HiOutlineTicket } from 'react-icons/hi';
import { AiOutlineFileText } from 'react-icons/ai';
import { FiUsers } from "react-icons/fi";
import { IoPricetagOutline } from "react-icons/io5";

import '../styles/Sidebar.css';
import { BsBalloonHeart, BsFillBuildingFill } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";

const SidebarEvent = ({active = 'home', parent = null, user = null}) => {
    const [isActive, setActive] = useState(false);

    const { org_username, slug } = useParams();

    const prefix = `/organizer/${org_username}/event/${slug}`;

    return (
        <>
            <div className={`Sidebar flex column ${isActive ? 'active' : ''}`}>
                <div className="SidebarToggler" onClick={() => setActive(!isActive)}>
                    <div className="inner"></div>
                </div>
                <div className="flex column grow-1">
                    <a href={`/organizer/${org_username}/events`} className="text primary small ml-2 mt-2">
                        <BiLeftArrowAlt style={{position: 'relative',top: 2,marginRight: 10}} />
                        kembali ke Organizer
                    </a>

                    <div className="h-30"></div>

                    <a href={`${prefix}`}>
                        <li className={`MenuItem flex row item-center ${active === 'overview' ? 'active' : ''}`}><BiHome size={18} className="icon" /> Event Overview</li>
                    </a>
                    <a href={`${prefix}/checkin`}>
                        <li className={`MenuItem flex row item-center ${active === 'checkin' ? 'active' : ''}`}><BiQrScan size={18} className="icon" /> QR Checkin</li>
                    </a>

                    <div className="text small muted mt-2 mb-05 ml-2">EVENT DETAILS</div>
                    <a href={`${prefix}/basic-info`}>
                        <li className={`MenuItem flex row item-center ${active === 'basic-info' ? 'active' : ''}`}><BiEdit size={18} className="icon" /> Basic Info</li>
                    </a>
                    <a href={`${prefix}/qr-event`}>
                        <li className={`MenuItem flex row item-center ${active === 'qr-event' ? 'active' : ''}`}><BiQr size={18} className="icon" /> QR Event</li>
                    </a>
                    <a href={`${prefix}/ticket`}>
                        <li className={`MenuItem flex row item-center ${active === 'ticket' ? 'active' : ''}`}><HiOutlineTicket size={18} className="icon" /> Ticket & Pricing</li>
                    </a>
                    <a href={`${prefix}/handout`}>
                        <li className={`MenuItem flex row item-center ${active === 'handout' ? 'active' : ''}`}><AiOutlineFileText size={18} className="icon" /> Handout</li>
                    </a>
                    <a href={`${prefix}/discount`}>
                        <li className={`MenuItem flex row item-center ${active === 'discount' ? 'active' : ''}`}><IoPricetagOutline size={18} className="icon" /> Kode Promo</li>
                    </a>

                    <div className="text small muted mt-2 mb-05 ml-2">EVENT SPACE</div>
                    <a href={`${prefix}/rundown`}>
                        <li className={`MenuItem flex row item-center ${active === 'rundown' ? 'active' : ''}`}><BiCalendar size={18} className="icon" /> Rundown</li>
                    </a>
                    <a href={`${prefix}/session`}>
                        <li className={`MenuItem flex row item-center ${active === 'session' ? 'active' : ''}`}><BiTime size={18} className="icon" /> Session</li>
                    </a>
                    <a href={`${prefix}/certificate`}>
                        <li className={`MenuItem flex row item-center ${active === 'certificate' ? 'active' : ''}`}><BiCertification size={18} className="icon" /> Sertifikat</li>
                    </a>

                    <div className="text small muted mt-2 mb-05 ml-2">ROLES</div>
                    <a href={`${prefix}/speaker`}>
                        <li className={`MenuItem flex row item-center ${active === 'speaker' ? 'active' : ''}`}><BiGroup size={18} className="icon" /> Speakers</li>
                    </a>
                    <a href={`${prefix}/booth-category`}>
                        <li className={`MenuItem flex row item-center ${active === 'booth-category' ? 'active' : ''}`}><BsFillBuildingFill size={18} className="icon" /> Kategori Booth</li>
                    </a>
                    <a href={`${prefix}/booth`}>
                        <li className={`MenuItem flex row item-center ${active === 'booth' ? 'active' : ''}`}><BsFillBuildingFill size={18} className="icon" /> Booth</li>
                    </a>
                    <a href={`${prefix}/sponsor`}>
                        <li className={`MenuItem flex row item-center ${active === 'sponsor' ? 'active' : ''}`}><BsBalloonHeart size={18} className="icon" /> Sponsors</li>
                    </a>

                    <div className="text small muted mt-2 mb-05 ml-2">LAPORAN</div>
                    <a href={`${prefix}/ticket-selling`}>
                        <li className={`MenuItem flex row item-center ${active === 'ticket-selling' ? 'active' : ''}`}><GrMoney size={18} className="icon" /> Ticket Selling</li>
                    </a>
                    <a href={`${prefix}/participant`}>
                        <li className={`MenuItem flex row item-center ${active === 'participant' ? 'active' : ''}`}><FiUsers size={18} className="icon" /> Peserta</li>
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

export default SidebarEvent;