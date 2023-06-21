import React from "react";
import { BiMailSend, BiPhone } from "react-icons/bi";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import config from "../config";
import theStyle from "./styles/Footer.module.css";

const Footer = () => {
    return (
        <>
            <footer className={`${theStyle.Footer} p-4 flex row justify-center bg-white text black`}>
                <div className={`${theStyle.FooterSection} flex column w-40`}>
                    <img src="/images/logo.png" className="w-40 cover" alt="Logo" />
                    <div className="mt-3">
                        Koridor Coworking Space, Gedung Siola Lt. 3,<br />
                        Jalan Tunjungan, Surabaya
                    </div>
                    <div className="mt-2 flex row item-center">
                        <BiMailSend color={config.primaryColor} size={22} />
                        <div className="ml-1">
                            <a href="mailto:halo@agendakota.id" className="text black">halo@agendakota.id</a>
                        </div>
                    </div>
                    <div className="mt-1 flex row item-center">
                        <BiPhone color={config.primaryColor} size={22} />
                        <div className="ml-1">
                            <a href="https://wa.me/628890079999" className="text black">+62 889 9007 9999</a>
                        </div>
                    </div>

                    <div className="mt-3 flex row item-center">
                        <a href="https://www.youtube.com/@AgendaKotaTV">
                            <FaYoutube color="#999" size={20} />
                        </a>
                        <a href="https://web.facebook.com/agendakota" className="ml-2">
                            <FaFacebook color="#999" size={20} />
                        </a>
                        <a href="https://twitter.com/@AgendaKota" className="ml-2">
                            <FaTwitter color="#999" size={20} />
                        </a>
                        <a href="https://www.instagram.com/agendakota" className="ml-2">
                            <FaInstagram color="#999" size={20} />
                        </a>
                    </div>
                </div>
                <div className={`${theStyle.FooterSection} flex column w-20`}>
                    <div className="text bold size-24">Product</div>
                    <div className="h-20"></div>
                    <a href="https://company.agendakota.id/product/virtual-venue/" target={'_blank'} rel="noreferrer">
                        <li>Virtual Venue</li>
                    </a>
                    <a href="https://company.agendakota.id/product/broadcast-studio/" target={'_blank'} rel="noreferrer">
                        <li>Broadcast Studio</li>
                    </a>
                    <a href="https://company.agendakota.id/product/event-marketing/" target={'_blank'} rel="noreferrer">
                        <li>Event Marketing</li>
                    </a>
                    <a href="https://company.agendakota.id/product/event-management/" target={'_blank'} rel="noreferrer">
                        <li>Event Management</li>
                    </a>
                </div>
                <div className={`${theStyle.FooterSection} flex column w-20`}>
                    <div className="text bold size-24">Solution</div>
                    <div className="h-20"></div>
                    <a href="https://company.agendakota.id/solutions/virtual-events/" target={'_blank'} rel="noreferrer">
                        <li>Virtual Event</li>
                    </a>
                    <a href="https://company.agendakota.id/solutions/onsite-events/" target={'_blank'} rel="noreferrer">
                        <li>Onsite Event</li>
                    </a>
                    <a href="https://company.agendakota.id/solutions/hybrid-events/" target={'_blank'} rel="noreferrer">
                        <li>Hybrid Event</li>
                    </a>
                    <a href="https://company.agendakota.id/solutions/internal-events/" target={'_blank'} rel="noreferrer">
                        <li>Internal Event</li>
                    </a>
                    <a href="https://company.agendakota.id/#" target={'_blank'} rel="noreferrer">
                        <li>In-Person Event</li>
                    </a>
                </div>
                <div className={`${theStyle.FooterSection} flex column w-20`}>
                    <div className="text bold size-24">Support</div>
                    <div className="h-20"></div>
                    <a href="https://agendakota.id/#" target={'_blank'} rel="noreferrer">
                        <li>FAQ</li>
                    </a>
                    <a href="https://company.agendakota.id/news/" target={'_blank'} rel="noreferrer">
                        <li>Blog</li>
                    </a>
                    <a href="https://company.agendakota.id/media-partner/" target={'_blank'} rel="noreferrer">
                        <li>Media Partner</li>
                    </a>
                    <a href="https://company.agendakota.id/help/" target={'_blank'} rel="noreferrer">
                        <li>Help</li>
                    </a>
                    <a href="https://company.agendakota.id/contact/" target={'_blank'} rel="noreferrer">
                        <li>Contact</li>
                    </a>
                </div>
            </footer>
        </>
    )
}

export default Footer;