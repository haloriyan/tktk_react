import React from "react";
import config from "../../../config";
import { BiCalendar } from "react-icons/bi";
import moment from "moment";
import Currency from "../../../components/Currency";

const OrderItem = ({order}) => {
    return (
        <>
            {
                order.items.map((item, i) => (
                    <div key={i} className={`flex row item-center gap-20 border bottom pb-2 mb-2`}>
                        <img 
                            src={`${config.baseUrl}/storage/u${item.product.user_id}/product_images/${item.product.image.filename}`} 
                            alt={item.product.name} 
                            className="h-70 ratio-1-1 rounded"
                        />
                        <div className="flex column grow-1">
                            <div className="text bold">{item.product.name}</div>
                            {
                                item.product.is_service ?
                                <div>
                                    <div className="text small">{item.quantity} item(s)</div>
                                    <div className="flex row item-center gap-10 text size-12 mt-05">
                                        <BiCalendar />
                                        <span>{moment(item.booking_date).format('DD MMM Y, HH:mm')} WIB</span>
                                    </div>
                                </div>
                                :
                                <div className="flex row item-center gap-10 mt-05">
                                    <div className="text small">{item.quantity} item(s)</div>
                                </div>
                            }
                            </div>
                        <div className="text bold" style={{color: order.user.accent_color}}>{Currency(item.total_price).encode()}</div>
                    </div>
                ))
            }
        </>
    )
}

export default OrderItem;