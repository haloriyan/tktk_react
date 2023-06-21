import moment from "moment";
import React from "react";
import { BiCalendar, BiUser } from "react-icons/bi";
import config from "../config";
import style from "./styles/Event.module.css";

const Event = ({data, org_username}) => {
    return (
        <a href={`/organizer/${org_username}/event/${data.slug}`} className={`${style.event_card} flex basis-3`}>
            <div className={style.event_cover} style={{
                backgroundImage: `url('${config.baseUrl}/storage/event/${data.id}/${data.cover}')`
            }}></div>
            <div className="p-2">
                <h4 className="m-0 mb-1 text black">{data.name}</h4>
                <div className="flex row item-center mt-05">
                    <div className="mr-2">
                        <BiCalendar size={14} color={'#666'} />
                    </div>
                    <div className="text small muted">
                        {moment(data.start_date).format('DD MMMM')}
                        {
                            data.start_date !== data.end_date &&
                            ' - ' + moment(data.end_date).format('DD MMMM')
                        }
                        {
                            ' ' + moment(data.end_date).format('Y')
                        }
                    </div>
                </div>
                <div className="flex row item-center mt-05">
                    <div className="mr-2">
                        <BiCalendar size={14} color={'#666'} />
                    </div>
                    <div className="text small muted">Rp 130.000</div>
                </div>
                <div className="flex row item-center mt-05">
                    <div className="mr-2">
                        <BiUser size={14} color={'#666'} />
                    </div>
                    <div className="text small muted">25 attendees</div>
                </div>
            </div>
        </a>
    )
}

export default Event;