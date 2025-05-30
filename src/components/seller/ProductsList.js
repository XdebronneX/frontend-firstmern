import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerProducts,
  deleteProduct,
  clearErrors,
} from "../../actions/productActions";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { toast } from "react-toastify";

const ProductsList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { loading, error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const errMsg = (message = "") =>
    toast.error(message, {
      position: 'bottom-right',
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: 'bottom-right',
    });

  useEffect(() => {
    dispatch(getSellerProducts());

    if (error) {
      errMsg(error)
      dispatch(clearErrors());
    }

    if (deleteError) {
      errMsg(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      successMsg("Product deleted successfully");
      navigate("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, error, navigate, isDeleted, deleteError]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",

          field: "id",

          sort: "asc",
        },

        {
          label: "Name",

          field: "name",

          sort: "asc",
        },

        {
          label: "Price",

          field: "price",

          sort: "asc",
        },

        {
          label: "Stock",

          field: "stock",

          sort: "asc",
        },

        {
          label: "Actions",

          field: "actions",
        },
      ],

      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,

        name: product.name,

        price: `$${product.price}`,

        stock: product.stock,

        actions: (
          <Fragment>
            <Link
              to={`/seller/product/${product._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>

            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteProductHandler(product._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Products"} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Products</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProducts()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsList;
