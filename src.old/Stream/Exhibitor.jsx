import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiFile, BiPlus, BiVideo } from "react-icons/bi";
import Currency from "../components/Currency";
import Popup from "../components/Popup";
import config from "../config";

const Exhibitor = ({event = null, user = null}) => {
    const [booths, setBooths] = useState([]);
    const [index, setIndex] = useState(0);
    const [isLoading, setLoading] = useState(true);

    const [viewing, setViewing] = useState('about'); // about, handout, product, agent
    const [product, setProduct] = useState(null);
    const [productImgIndex, setProductImgIndex] = useState(0);

    useEffect(() => {
        if (isLoading && user !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/stream/${event.id}/booth`, {
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setBooths(res.booths);
                console.log(res);
            })
        }
    }, [isLoading, user]);
    
    if (booths.length !== 0) {
        return (
            <div>
                <div className="w-100 ratio-10-3 bg-grey rounded flex row item-center justify-center">
                    <img 
                        className="h-300"
                        src={`${config.baseUrl}/storage/event/${event.id}/booth_backgrounds/${booths[index].background}`}  
                        alt="" 
                    />
                </div>
                <div className="flex row item-center justify-centerss p-2">
                    <img 
                        className="h-100 rounded-max ratio-1-1"
                        src={`${config.baseUrl}/storage/event/${event.id}/booth_logos/${booths[index].logo}`} 
                        alt={`Booth ${booths[index].name}`}
                    />
                    <div className="flex column grow-1 ml-2">
                        <div className="text bold size-24">{booths[index].name}</div>
                        <div className="mt-1 flex row item-center">
                            {/* <img 
                                className="h-30 ratio-1-1 rounded-max"
                                src={`${config.baseUrl}/storage/event/${event.id}/booth_category_icons/${booths[index].category.icon}`} alt={booths[index].category.name} 
                            /> */}
                            <div className="text small">
                                {booths[index].category.name}
                            </div>
                        </div>
                    </div>
                    <div className="flex row item-center ml-2 w-40">
                        <div className={`flex item-center justify-center grow-1 h-40 transparent rounded pointer text primary ${viewing === 'about' ? 'bg-primary bold' : ''}`} onClick={e => setViewing('about')}>
                            Tentang
                        </div>
                        <div className={`flex item-center justify-center grow-1 h-40 transparent rounded pointer text primary ${viewing === 'handout' ? 'bg-primary bold' : ''}`} onClick={e => setViewing('handout')}>
                            Handout
                        </div>
                        <div className={`flex item-center justify-center grow-1 h-40 transparent rounded pointer text primary ${viewing === 'product' ? 'bg-primary bold' : ''}`} onClick={e => setViewing('product')}>
                            Produk
                        </div>
                        <div className={`flex item-center justify-center grow-1 h-40 transparent rounded pointer text primary ${viewing === 'agent' ? 'bg-primary bold' : ''}`} onClick={e => setViewing('agent')}>
                            Agents
                        </div>
                    </div>
                </div>

                {
                    viewing === "about" &&
                    <div className="bordered rounded p-3 m-2">
                        <div className="text muted spacing-2 small">DESKRIPSI</div>
                        <div className="mt-2">{booths[index].description}</div>
                    </div>
                }

                {
                    viewing === "handout" &&
                    <div className="m-2 flex row gap-10 wrap">
                        {
                            booths[index].handouts.map((handout, h) => (
                                <div className="bordered rounded flex column grow-1 basis-4" key={h}>
                                    <div className="bg-primary rounded-top-left rounded-top-right w-100 ratio-5-2 flex row item-center justify-center">
                                        {
                                            handout.type === "file" ?
                                                <BiFile size={32} />
                                            :
                                                <BiVideo size={32} />
                                        }
                                    </div>
                                    <div className="p-2">
                                        {handout.title}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }

                {
                    viewing === "product" &&
                    <div className="m-2 flex row wrap gap-10">
                        {
                            booths[index].products.map((prod, p) => (
                                <div className="bordered rounded flex column grow-1 basis-4" key={p} onClick={e => setProduct(prod)}>
                                    <img 
                                        className="w-100 ratio-16-9 rounded-top-left rounded-top-right"
                                        src={`${config.baseUrl}/storage/event/${event.id}/product_images/${prod.id}/${prod.images[0].filename}`} alt={prod.name} 
                                    />
                                    <div className="p-2 mt-05">
                                        {prod.name}
                                        <div className="text small primary">{Currency(prod.price).encode()}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }

                {
                    product !== null &&
                    <Popup onDismiss={() => setProduct(null)}>
                        <img 
                            className="cover w-100 ratio-16-9 rounded-more"
                            src={`${config.baseUrl}/storage/event/${event.id}/product_images/${product.id}/${product.images[productImgIndex].filename}`} alt={product.name} 
                        />
                        <div className="flex row item-center gap-10 mt-2">
                            {
                                product.images.map((image, i) => (
                                    <img 
                                        className={`h-60 pointer rounded ratio-1-1 ${productImgIndex === i ? 'border primary border-3' : ''}`}
                                        src={`${config.baseUrl}/storage/event/${event.id}/product_images/${product.id}/${image.filename}`} alt={image.filename} 
                                        onClick={e => setProductImgIndex(i)}
                                    />
                                ))
                            }
                        </div>

                        <div className="flex row item-center mt-3">
                            <div className="flex column grow-1">
                                <div className="text bold size-24">{product.name}</div>
                                <div className="text muted mt-05">{Currency(product.price).encode()}</div>
                            </div>
                            <div className="bg-primary ml-2 rounded pointer p-1 pl-2 pr-2 flex row item-center">
                                <BiPlus />
                                <div className="text small">Keranjang</div>
                            </div>
                        </div>

                        <div className="mt-3">
                            {product.description}
                        </div>
                    </Popup>
                }
            </div>
        )
    }
}

export default Exhibitor;