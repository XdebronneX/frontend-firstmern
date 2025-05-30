import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  allSellerOrders,
  clearErrors,
} from "../../actions/orderActions";

const OrdersList = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.allOrders);

  const errMsg = (message = "") =>
     toast.error(message, {
       position: 'bottom-right',
     });
 

  useEffect(() => {
    dispatch(allSellerOrders());

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

      }, [dispatch, error ]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",

          field: "id",

          sort: "asc",
        },

        {
          label: "No of Items",

          field: "numofItems",

          sort: "asc",
        },

        {
          label: "Amount",

          field: "amount",

          sort: "asc",
        },

        {
          label: "Status",

          field: "status",

          sort: "asc",
        },

        {
          label: "Actions",

          field: "actions",
        },
      ],

      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,

        numofItems: order.orderItems.length,

        amount: `$${order.totalPrice}`,

        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),

        actions: (
          <Fragment>
            <Link
              to={`/seller/order/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Orders"} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Orders</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setOrders()}
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

export default OrdersList;
