import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Receipt from "./ReceiptPdf";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const dispatch = useDispatch();

  const { loading, error, order = {} } = useSelector(
    (state) => state.orderDetails
  );


  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;

  let { id } = useParams();

  const errMsg = (message = "") =>
    toast.error(message, {
      position: 'bottom-right',
    });

  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, id]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <Fragment>
      <div className='app-content'>
      </div>
      <MetaData title={"Order Details"} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Order # {order._id}</h1>

              <h4 className="mb-4">Shipping Info</h4>

              <p>
                <b>Name:</b> {user && user.name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
              </p>

              <p className="mb-4">
                <b>Address:</b>
                {shippingDetails}
              </p>

              <p>
                <b>Amount:</b> ${totalPrice}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>

              <p className={isPaid ? "greenColor" : "redColor"}>
                <b>{isPaid ? "PAID" : "NOT PAID"}</b>
              </p>

              <h4 className="my-4">Order Status:</h4>

              <p
                className={
                  order.orderStatus &&
                    String(order.orderStatus).includes("Delivered")
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>

              <hr />

              <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((item) => (
                    <div key={item.product} className="row my-5">
                      <div className="col-4 col-lg-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>

              <hr />
            </div>
          </div>
        </Fragment>
      )}
      {/* <button className="btn btn-primary btn-block" onClick={handleExportWithMethod} disabled={order.status === 'Processing'}>Print Receipt</button>
      <button className="btn btn-primary btn-block" onClick={handleExportWithMethod} enabled={order.status === 'Delivered'} >Print Receipt</button> */}

      {/* {if (order.status === 'Processing') {
        <button className="btn btn-primary btn-block" onClick={handleExportWithMethod} disabled>Print Receipt</button>
      } 
      else if (order.status === 'Delivered') {
        <button className="btn btn-primary btn-block" onClick={handleExportWithMethod}>Print Receipt</button>
      }} */}

      {/* {order.orderStatus === 'Processing' ? (
        <button className="btn btn-primary btn-block" onClick={handleExportWithMethod} disabled>Print Receipt</button>
      ) : order.orderStatus === 'Delivered' ? (
          <button className="btn btn-primary btn-block" onClick={handleExportWithMethod}>Print Receipt</button>
      ) : null} */}

      {order.orderStatus === 'Processing' ? (
        <button className="btn btn-primary btn-block" hidden>
          <i className="fa fa-print" /> Print Receipt
        </button>
      ) : order.orderStatus === 'Delivered' ? (
        <PDFDownloadLink
          document={<Receipt order={order} />}
          fileName={`receipt-${order._id}.pdf`}
          className="btn btn-primary btn-block"
        >
          <i className="fa fa-print" />Print Receipt
        </PDFDownloadLink>
      ) : null}
    </Fragment>
  );
};

export default OrderDetails;
