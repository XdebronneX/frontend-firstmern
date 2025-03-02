// import React, { Fragment, useEffect, useState } from "react";
// import MetaData from "./layout/MetaData";
// import Product from "./product/Product";
// import Loader from "./layout/Loader";
// import { useDispatch, useSelector } from "react-redux";
// import { getProducts } from "../actions/productActions";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Home = () => {
//     const dispatch = useDispatch();
//     const { loading, products, error } = useSelector((state) => state.products);

//     const [category, setCategory] = useState('');  // Category Filter

//     const categories = ["Nike", "Adidas", "Converse", "Vans", "Reebok", "Puma", "Jordan"];

//     const notify = (message = '') => toast.error(message, {
//         position: toast.POSITION.BOTTOM_CENTER
//     });

//     useEffect(() => {
//         dispatch(getProducts(category));
//         if (error) {
//             notify(error);  // Show error notification if any
//         }
//     }, [dispatch, error, category]);  // Re-run when category or error changes

//     return (
//         <Fragment>
//             {loading ? (
//                 <Loader />
//             ) : (
//                 <Fragment>
//                     <MetaData title={"Buy Best Products Online"} />
//                     <h1 id="products_heading">Latest Products</h1>
//                     <section id="products" className="container mt-5">
//                         <div className="row">
//                             {/* Category Filters */}
//                             <div className="col-12 col-md-3 mt-5 mb-5">
//                                 <div className="px-5">
//                                     <h4 className="mb-3">Categories</h4>
//                                     <ul className="pl-0">
//                                         {categories.map((cat) => (
//                                             <li
//                                                 key={cat}
//                                                 onClick={() => setCategory(cat)}  // Set the category when clicked
//                                                 style={{ cursor: "pointer", fontWeight: category === cat ? 'bold' : 'normal' }}
//                                             >
//                                                 {cat}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </div>

//                             {/* Product Listings */}
//                             <div className="col-12 col-md-9">
//                                 <div className="row">
//                                     {products && products.length > 0 ? (
//                                         products.map((product) => (
//                                             <Product key={product._id} product={product} col={4} />
//                                         ))
//                                     ) : (
//                                         <div>No products available</div>  // Message when no products found
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                 </Fragment>
//             )}
//         </Fragment>
//     );
// };

// export default Home;


// import React, { Fragment, useEffect, useState } from "react";
// import MetaData from "./layout/MetaData";
// import Product from "./product/Product";
// import Loader from "./layout/Loader";
// import { useDispatch, useSelector } from "react-redux";
// import { getProducts, clearErrors } from "../actions/productActions";
// import { toast } from 'react-toastify';

// const Home = () => {
//     const dispatch = useDispatch();
//     const { loading, products, error } = useSelector((state) => state.products);
//     const [category, setCategory] = useState(''); 
//     const categories = ["All", "Nike", "Adidas", "Converse", "Vans", "Reebok", "Puma", "Jordan"];

//     const notify = (message = '') => toast.error(message, {
//         position: toast.POSITION.BOTTOM_CENTER
//     });

//     useEffect(() => {
//         dispatch(getProducts(category === "All" ? "" : category));
//         if (error) {
//             notify(error);
//             dispatch(clearErrors());
//         }
//     }, [dispatch, error, category]);

//     return (
//         <Fragment>
//             {loading ? (
//                 <Loader />
//             ) : (
//                 <Fragment>
//                     <MetaData title={"Buy Best Products Online"} />
//                     {/* <h1 id="products_heading">Latest Products</h1> */}
//                     <section id="products" className="container mt-5">
//                         {/* Category Filters - Display horizontally */}
//                         <div className="category-filter mb-4">
//                             <h4>Categories</h4>
//                             <div className="category-list">
//                                 {categories.map((cat) => (
//                                     <button
//                                         key={cat}
//                                         onClick={() => setCategory(cat)}
//                                         className={`category-btn ${category === cat ? 'active' : ''}`}
//                                     >
//                                         {cat}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Product Listings */}
//                             <div className="row">
//                                 {products && products.length > 0 ? (
//                                     products.map((product) => (
//                                         <Product key={product._id} product={product} col={4} />
//                                     ))
//                                 ) : (
//                                     <div className="no-products">No products available</div>
//                                 )}
//                             </div>

//                     </section>
//                 </Fragment>
//             )}
//         </Fragment>
//     );
// };

// export default Home;


import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, clearErrors } from "../actions/productActions";
import { toast } from 'react-toastify';

const Home = () => {
    const dispatch = useDispatch();
    const { loading, products, error } = useSelector((state) => state.products);
    const [category, setCategory] = useState('');
    const categories = ["All", "Nike", "Adidas", "Converse", "Vans", "Reebok", "Puma", "Jordan"];
    const [showModal, setShowModal] = useState(true);

    const notify = (message = '') => toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    useEffect(() => {
        dispatch(getProducts(category === "All" ? "" : category));
        if (error) {
            notify(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, category]);

    return (
        <Fragment>
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Slow Page Notice</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>This page may load slowly because it is hosted on free deployment services (Vercel & Render). Thank you for your patience!</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>
                                    Okay, got it!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={"Buy Best Products Online"} />
                    <section id="products" className="container mt-5">
                        <div className="category-filter mb-4">
                            <h4>Categories</h4>
                            <div className="category-list">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={`category-btn ${category === cat ? 'active' : ''}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="row">
                            {products && products.length > 0 ? (
                                products.map((product) => (
                                    <Product key={product._id} product={product} col={4} />
                                ))
                            ) : (
                                <div className="no-products">No products available</div>
                            )}
                        </div>
                    </section>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Home;
