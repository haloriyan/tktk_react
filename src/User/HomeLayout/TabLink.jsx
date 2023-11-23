import React, { useState } from "react";
import styles from "../../styles/Home.module.css";
import { useParams } from "react-router-dom";
import config from "../../config";
import Currency from "../../components/Currency";
import { BiCartAdd } from "react-icons/bi";

const TabLink = ({user, products, actions, message, links}) => {
    const { username } = useParams();
    const [viewing, setViewing] = useState('link');
    
    return (
        <>
            <div className={styles.TabArea} style={{marginTop: 20}}>
                <div className={styles.TabItem} onClick={() => setViewing('link')} style={{
                    color: viewing === 'link' ? user.accent_color : '#555',
                    borderColor: viewing === 'link' ? user.accent_color : '#ddd',
                    fontWeight: viewing === 'link' ? 700 : 400
                }}>Link</div>
                <div className={styles.TabItem} onClick={() => setViewing('product')} style={{
                    color: viewing === 'product' ? user.accent_color : '#555',
                    borderColor: viewing === 'product' ? user.accent_color : '#ddd',
                    fontWeight: viewing === 'product' ? 700 : 400
                }}>Produk</div>
            </div>

            {
                viewing === 'link' &&
                <div className="flex column gap-10 mt-3">
                    {
                        links.map((lnk, l) => (
                            <div key={l} className="flex row item-center gap-20 bg-white p-15 rounded border pointer" onClick={() => actions.clickLink(lnk)}>
                                {
                                    lnk.image !== null &&
                                    <img 
                                        src={`${config.baseUrl}/storage/link_images/${lnk.image}`} alt={lnk.title} 
                                        className="h-60 ratio-1-1 rounded bg-grey cover"
                                    />
                                }
                                <div className="flex grow-1 text" style={{color: user.accent_color}}>{lnk.title}</div>
                            </div>
                        ))
                    }
                </div>
            }

            {
                viewing === 'product' &&
                <div className="flex row wrap gap-20 mt-3 inner_content">
                    {
                        products.map((product, p) => (
                            <div key={p} className={`${styles.ProductBox} bg-white rounded flex column basis-2 grow-1 text black relative`} style={{
                                borderBottomColor: `${user.accent_color}30`
                            }}>
                                <a href={`/${username}/${product.is_service ? 'service' : 'product'}/${product.slug}`}>
                                    <img 
                                        src={`${config.baseUrl}/storage/u${user.id}/product_images/${product.images[0].filename}`} 
                                        alt={product.name} 
                                        className={`${styles.ProductImage} cover`}
                                    />
                                </a>
                                <div className="p-2 flex row item-center gap-10">
                                    <a href={`/${username}/${product.is_service ? 'service' : 'product'}/${product.slug}`} className="flex column grow-1">
                                        <div className="text bold small black">{product.name}</div>
                                        <div className="text small mt-05" style={{color: user !== null ? user.accent_color : config.primaryColor}}>
                                            {Currency(product.price).encode()}
                                        </div>
                                    </a>
                                    <div className="h-40 ratio-1-1 rounded-max flex centerize pointer" style={{backgroundColor: user !== null ? user.accent_color : config.primaryColor}} onClick={() => actions.addToCart(product.id, p)}>
                                        <BiCartAdd color="#fff" />
                                    </div>
                                </div>

                                {
                                    (message !== null && message.index === p) &&
                                    <div className="bg-green rounded p-1 pl-2 pr-2 m-1 mt-2 text size-12 absolute">
                                        {message.body}
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>
            }
        </>
    )
}

export default TabLink;