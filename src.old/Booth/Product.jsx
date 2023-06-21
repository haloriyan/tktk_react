import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { BiEdit, BiImageAdd, BiMinus, BiPlus, BiTrash, BiUpload, BiX } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Currency from "../components/Currency";
import FAB from "../components/FAB";

import Header from "../components/Header";
import InputFile from "../components/InputFile";
import Popup from "../components/Popup";
import SidebarBooth from "../components/SidebarBooth";
import Squarize from "../components/Squarize";
import config from "../config";

const BoothProduct = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [booth, setBooth] = useState(null);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [message, setMessage] = useState({
        status: 200,
        body: ''
    });
    const [inputCounter, setInputCounter] = useState(['input']);
    const inputsRef = useRef([]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('0');
    const [priceDisplay, setPriceDisplay] = useState('0');
    const [quantity, setQuantity] = useState('1');
    const [type, setType] = useState('physical');
    const [weight, setWeight] = useState('1');
    const [panjang, setPanjang] = useState('0');
    const [lebar, setLebar] = useState('0');
    const [tinggi, setTinggi] = useState('0');

    const [isLoading, setLoading] = useState(true);
    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    
    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
        Squarize();
    }, [user])

    useEffect(() => {
        if (!isAdding && inputCounter.length > 1) {
            setInputCounter(['input']);
        }
    }, [isAdding, inputCounter.length])

    useEffect(() => {
        if (message.body !== "") {
            setTimeout(() => {
                setMessage({status: 200, body: ''});
            }, 2000);
        }
    })

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/booth/${id}/product`)
            .then(response => {
                let res = response.data;
                setProducts(res.products);
                setBooth(res.booth);
            })
        }
    }, [isLoading, id]);

    const quantityControl = action => {
        let qty = parseInt(quantity);
        if (action === "increase") {
            qty += 10;
        } else if (action === "decrease" && qty > 10) {
            qty -= 10;
        }
        setQuantity(qty.toString());
    }

    const submit = e => {
        let formData = new FormData();
        formData.append('booth_id', id);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('type', type);

        document.querySelectorAll("input.images_add").forEach(input => {
            if (input.files[0] !== undefined) {
                formData.append('images[]', input.files[0]);
            }
        });

        if (type === "digital") {
            formData.append('file', document.querySelector("input#file_add").files[0]);
        } else {
            let dimension = `${panjang}|${lebar}|${tinggi}`;
            formData.append('weight', weight);
            formData.append('dimension', dimension);
        }

        axios.post(`${config.baseUrl}/api/booth/${id}/product/create`, formData)
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setAdding(false);
        })
        e.preventDefault();
    }


    const TypingCurrency = (input) => {
        let value = input.value;
        if (value === "") {
            value = "0";
        }
        let decodedValue = Currency(value).decode();
        setPrice(decodedValue.toString());
        setPriceDisplay(Currency(decodedValue).encode());
    }
    const del = () => {
        axios.post(`${config.baseUrl}/api/booth/${id}/product/delete`, {
            id: product.id,
        })
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setDeleting(false);
        })
    }

    return (
        <>
            <Header />
            <SidebarBooth active="product" />
            <div className="content p-4">
                <h2 className="text bigger mt-0">Produk</h2>

                {
                    message.body !== "" &&
                    <div className={`${message.status === 200 ? 'bg-green' : 'bg-red'} transparent rounded p-2 mb-2`}>
                        {message.body}
                    </div>
                }

                {
                    products.map((prod, p) => (
                        <div className="bordered rounded mb-3 flex row wrap p-2">
                            <img 
                                className="cover h-100 ratio-1-1 rounded"
                                src={`${config.baseUrl}/storage/event/${booth.event_id}/product_images/${prod.id}/${prod.image.filename}`} alt="Gambar" 
                            />
                            <div className="flex grow-1 column mr-2 ml-2">
                                <div>{prod.name}</div>
                                <div className="mt-05 text small primary">{Currency(prod.price).encode()}</div>
                                <div className="flex row mt-2">
                                    <div className="bg-green transparent rounded p-1 pl-2 pr-2 pointer">
                                        <BiEdit />
                                    </div>
                                    <div className="bg-red transparent rounded p-1 pl-2 pr-2 pointer ml-2" onClick={e => {
                                        setProduct(prod);
                                        setDeleting(true);
                                    }}>
                                        <BiTrash />
                                    </div>
                                </div>
                            </div>
                            <div className="flex column w-15">
                                <div className={`rounded text center p-1 pl-2 pr-2 small ${prod.type === "digital" ? "bg-green" : "bg-blue"}`}>
                                    {prod.type === "digital" ? "Produk Digital" : "Produk Fisik"}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <FAB icon={<FaPlus color="#fff" />} onClick={() => setAdding(true)} />

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <h3 className="mt-0 text big">Hapus Produk</h3>
                    <div>
                        Yakin ingin menghapus produk {product.name}? Tindakan ini tidak dapat dibatalkan
                    </div>
                    <div className="mt-2 pt-2 border top flex row item-center justify-end">
                        <div className="text mr-2 pointer" onClick={() => setDeleting(false)}>Batal</div>
                        <div className="text bold red pointer" onClick={del}>Ya</div>
                    </div>
                </Popup>
            }
            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)}>
                    <div className="flex row item-center">
                        <h3 className="mt-0 text big flex grow-1">Tambah Produk</h3>
                        <div className="h-40 bg-grey rounded-max flex row item-center justify-center squarize use-height pointer" onClick={() => setAdding(false)}>
                            <BiX />
                        </div>
                    </div>
                    <form action="#" onSubmit={submit}>
                        <div className="flex row wrap gap-10">
                            {
                                inputCounter.map((inp, i) => (
                                    <div className="group relative" key={i} ref={(el) => (inputsRef.current[i] = el)}>
                                        <div id={`preview_add_${i}`} className="h-100 rounded flex row item-center justify-center squarize use-height bordered">
                                            <BiImageAdd size={18} />
                                        </div>
                                        <input type="file" className="images_add" onChange={e => InputFile(e, `#preview_add_${i}`, () => {
                                            let inp = [...inputCounter];
                                            inp.push('input');

                                            setInputCounter(inp);
                                        })} />
                                        {
                                            i !== inputCounter.length - 1 &&
                                            <div className="pointer index-99 bg-red h-25 squarize use-height text center m-05 rounded absolute top-0 right-0" onClick={e => {
                                                inputsRef.current[i].remove();
                                            }}>
                                                <BiTrash size={11} />
                                            </div>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <div className="group">
                            <input type="text" id="name" onInput={e => setName(e.currentTarget.value)} required />
                            <label htmlFor="name">Nama Produk :</label>
                        </div>
                        <div className="group">
                            <textarea id="description" required onInput={e => setDescription(e.currentTarget.value)}></textarea>
                            <label htmlFor="description">Deskripsi :</label>
                        </div>
                        <div className="group">
                            <input type="text" id="price" value={priceDisplay} onInput={e => {
                                TypingCurrency(e.currentTarget);
                            }} />
                            <label htmlFor="price">Harga :</label>
                        </div>

                        <div className="flex row item-center">
                            <div onClick={() => quantityControl('decrease')} className="pointer border primary rounded flex w-10 h-55 flex row item-center justify-center" style={{marginTop: 9}}>
                                <BiMinus color={config.primaryColor} />
                            </div>
                            <div className="flex grow-1 ml-2 mr-2">
                                <div className="group w-100">
                                    <input type="number" id="quantity" placeholder="Kuantitas..." value={quantity} onInput={e => setQuantity(e.currentTarget.value)} min={1} />
                                    <label htmlFor="quantity" className="active">Jumlah produk :</label>
                                </div>
                            </div>
                            <div onClick={() => quantityControl('increase')} className="pointer border primary rounded flex w-10 h-55 flex row item-center justify-center" style={{marginTop: 9}}>
                                <BiPlus color={config.primaryColor} />
                            </div>
                        </div>

                        <div className="flex row item-center mt-2 border top pt-3 mt-3">
                            <div className="flex grow-1 mr-2">
                                Tipe Produk
                            </div>
                            <div className="flex row item-center p-05 border primary text ">
                                <div className={`flex grow-1 pl-2 pr-2 p-05  pointer ${type === 'physical' ? 'bg-primary' : ''}`} onClick={() => {
                                    setType('physical')
                                }}>
                                    Fisik
                                </div>
                                <div className={`flex grow-1 pl-2 pr-2 p-05  pointer ${type === 'digital' ? 'bg-primary' : ''}`} onClick={() => {
                                    setType('digital')
                                }}>
                                    Digital
                                </div>
                            </div>
                        </div>

                        {
                            type === "digital" &&
                            <div>
                                <div className="group relative">
                                    <div className="bg-grey w-100 rounded h-150 mt-2 flex row item-center justify-center">
                                        <BiUpload size={32} color={'#444'} />
                                        <div className="ml-3 flex column" id="prev_add">
                                            <div className="text mt-1">Upload File</div>
                                            <div className="text small muted mt-05">Kompres semua file <br /> menjadi satu file zip</div>
                                        </div>
                                    </div>
                                    <input type="file" accept=".zip" className="file_add" id="file_add" onChange={e => InputFile(e, "#prev_add", null, false)} />
                                </div>
                            </div>
                        }
                        {
                            type === "physical" &&
                            <div>
                                <div className="group">
                                    <input type="number" value={weight} id="weight" onInput={e => setWeight(e.currentTarget.value)} min={1} />
                                    <label htmlFor="weight">Berat (kg):</label>
                                </div>

                                <div className="text mt-2">Dimensi (dalam cm)</div>
                                <div className="flex row gap-20">
                                    <div className="flex column grow-1">
                                        <div className="group">
                                            <input type="text" value={panjang} id="panjang" onInput={e => setPanjang(e.currentTarget.value)} required />
                                            <label htmlFor="panjang">Panjang :</label>
                                        </div>
                                    </div>
                                    <div className="flex column grow-1">
                                        <div className="group">
                                            <input type="text" value={lebar} id="lebar" onInput={e => setLebar(e.currentTarget.value)} required />
                                            <label htmlFor="lebar">Lebar :</label>
                                        </div>
                                    </div>
                                    <div className="flex column grow-1">
                                        <div className="group">
                                            <input type="text" value={tinggi} id="tinggi" onInput={e => setTinggi(e.currentTarget.value)} required />
                                            <label htmlFor="tinggi">Tinggi :</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        <button className="w-100 mt-3 primary">Submit</button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default BoothProduct;