import React from "react";
import { BiTrash } from "react-icons/bi";
import { colors } from "../config";
import style from "./Ticket.module.css";

const Ticket = ({data, label, onDelete = null}) => {
    return (
        <div className={style.ticket}>
            <div className={style.ticket_info}>
                <div className="flex row">
                    <div className={`flex grow-1 mr-1 ${style.ticket_name}`}>{data.name}</div>
                    <div className="flex row">
                        <span className="pointer" onClick={() => {
                            if (onDelete !== null) {
                                onDelete(data);
                            }
                        }}>
                            <BiTrash color={colors.red} />
                        </span>
                    </div>
                </div>
                <div className={style.ticket_description}>
                    {data.description}
                </div>
            </div>
            <div className={style.ticket_bottom}>
                <div className={style.ticket_price}>{data.price}</div>
                <li></li>
                <div>{label}</div>
            </div>
        </div>
    )
}

export default Ticket;