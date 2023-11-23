import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { useParams } from "react-router-dom";
import config from "../../config";
import Currency from "../../components/Currency";
import { BiCartAdd, BiLink, BiShoppingBag } from "react-icons/bi";
import Chip from "../../components/Chip";

const TabProduct = ({user, products, actions, message, links, categories}) => {
    const { username } = useParams();
    const [viewing, setViewing] = useState('product');
    const [category, setCategory] = useState('');

    const [theProducts, setTheProducts] = useState(null);

    useEffect(() => {
        if (theProducts === null && products.length > 0) {
            filterProduct(products);
        }
    }, [theProducts, products]);

    const filterProduct = (prods) => {
        let s = category.toLowerCase();
        console.log('showing', s);
        let datas = [];
        if (s !== "") {
            datas = prods.filter(product => {
                if (product.categories !== null && product.categories.toLowerCase().includes(s)) {
                    return product;
                }
            });
        } else {
            datas = prods;
        }
        setTheProducts(datas);
    }
    
    return (
        <>
            <div className={styles.TabArea} style={{marginTop: 20}}>
                <div className={styles.TabItem} onClick={() => setViewing('product')} style={{
                    color: viewing === 'product' ? user.accent_color : '#555',
                    borderColor: viewing === 'product' ? user.accent_color : '#ddd',
                    fontWeight: viewing === 'product' ? 700 : 400
                }}><BiShoppingBag /> Produk</div>
                <div className={styles.TabItem} onClick={() => setViewing('link')} style={{
                    color: viewing === 'link' ? user.accent_color : '#555',
                    borderColor: viewing === 'link' ? user.accent_color : '#ddd',
                    fontWeight: viewing === 'link' ? 700 : 400
                }}><BiLink /> Link</div>
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
                (viewing === 'product' && theProducts !== null) &&
                <>
                    {
                        categories.length > 0 &&
                        <div className="flex row item-center gap-20 inner_content mt-2">
                            <div onClick={() => {
                                setCategory('');
                                setTheProducts(null);
                            }} className="bg-white h-50 pl-2 pr-2 text size-14 border pointer rounded flex row item-center gap-10" style={{
                                color: category === '' ? user.accent_color : '#444',
                                borderColor: category === '' ? user.accent_color : '#ddd',
                            }}>Semua</div>
                            {
                                categories.map((cat, c) => (
                                    <div key={c} onClick={() => {
                                        setCategory(cat.name);
                                        setTheProducts(null);
                                    }} className="bg-white h-50 pl-1 pr-1 text size-14 border pointer rounded flex row item-center gap-10" style={{
                                        color: category === cat.name ? user.accent_color : '#444',
                                        borderColor: category === cat.name ? user.accent_color : '#ddd',
                                    }}>
                                        {
                                            cat.icon !== null &&
                                            <img src={`${config.baseUrl}/storage/category_icons/${cat.icon}`} alt={cat.name} className="h-35 ratio-1-1 bg-grey rounded" />
                                        }
                                        {cat.name}
                                    </div>
                                ))
                            }
                        </div>
                    }
                    <div className="flex row wrap gap-20 inner_content mt-2">
                        {
                            theProducts.map((product, p) => (
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
                </>
            }
        </>
    )
}

export default TabProduct;