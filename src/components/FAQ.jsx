import React, { useState } from "react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import styles from "./styles/FAQ.module.css";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import config from "../config";
import faqs from "../datas/faq.json";

const FAQ = () => {
    const [index, setIndex] = useState(null);

    return (
        <div className="w-80">
            {
                faqs.map((faq, f) => (
                    <div key={f} className={`${styles.faq_item} pointer border ${f === faqs.length - 1 ? 'none' : 'bottom'}`} onClick={() => setIndex(f === index ? null : f)}>
                        <div className="flex row item-center">
                            <h4 className={`${styles.faq_title} text black bold size-24 m-0 flex grow-1`}>{faq.question}</h4>
                            {
                                f === index ? <MdExpandLess size={36} color={config.primaryColor} /> : <MdExpandMore size={36} color={config.primaryColor} />
                            }
                        </div>
                        {
                            index === f &&
                            <div className="mt-2 text size-20 lh-30" dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default FAQ;