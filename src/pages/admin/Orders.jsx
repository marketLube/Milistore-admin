import React, { useEffect, useState, useRef } from "react";
import PageHeader from "../../components/Admin/PageHeader";
import DateRangePicker from "../../components/shared/Datepicker";
import Ordercards from "../../components/Admin/Order/Ordercards";
import { getcategoriesbrands } from "../../sevices/adminApis";
import { getOrders } from "../../sevices/OrderApis";

function Orders() {
  const [formUtilites, setFormUtilites] = useState([]);
  const [orders, setOrders] = useState([]);
  const AnalysisData = [
    { data: "Orders Completed", color: "#00BA9D", count: "2345" },
    { data: "Orders Confirmed", color: "#FF5470", count: "323" },
    { data: "Orders Canceled", color: "#035ECF", count: "17" },
    { data: "Orders on Refound", color: "#035ECF", count: "2" },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(res.orders);
        console.log(res.orders);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getcategoriesbrands();
        setFormUtilites(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const ConfirmationPopup = ({ isOpen, onClose, onConfirm, status }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
          <h3 className="text-lg font-semibold mb-4">Confirm Status Change</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to change the status to "{status}"?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  const StatusDropdown = ({ currentStatus, options, onStatusChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    const handleStatusClick = (status) => {
      setSelectedStatus(status);
      setShowConfirmation(true);
      setIsOpen(false);
    };

    const handleConfirm = () => {
      onStatusChange(selectedStatus);
      setShowConfirmation(false);
      setSelectedStatus(null);
    };

    const getStatusColor = (status) => {
      const colors = {
        pending: "bg-yellow-100 text-yellow-800",
        paid: "bg-green-100 text-green-800",
        failed: "bg-red-100 text-red-800",
        processing: "bg-blue-100 text-blue-800",
        shipped: "bg-purple-100 text-purple-800",
        delivered: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
      };
      return colors[status.toLowerCase()] || "bg-gray-100 text-gray-800";
    };

    return (
      <td className="px-6 py-4">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-2"
          >
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                currentStatus
              )}`}
            >
              {currentStatus}
            </span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <div
              className="fixed rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              style={{
                zIndex: 50,
                marginTop: "0.5rem",
                transform: "translateY(-100%)",
                minWidth: "150px",
              }}
            >
              <div className="py-1" role="menu">
                {options?.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusClick(status)}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                      currentStatus === status ? "bg-gray-50" : ""
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          )}

          <ConfirmationPopup
            isOpen={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            onConfirm={handleConfirm}
            status={selectedStatus}
          />
        </div>
      </td>
    );
  };

  const TableRow = ({ order }) => {
    const [paymentStatus, setPaymentStatus] = useState(
      order.paymentStatus || "Pending"
    );
    const [orderStatus, setOrderStatus] = useState(order.status || "Pending");

    const paymentOptions = ["Pending", "Paid", "Failed"];
    const orderOptions = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    const handlePaymentStatusChange = (newStatus) => {
      setPaymentStatus(newStatus);
      // Add your API call here to update payment status
      console.log("Payment status changed to:", newStatus);
    };

    const handleOrderStatusChange = (newStatus) => {
      setOrderStatus(newStatus);
      // Add your API call here to update order status
      console.log("Order status changed to:", newStatus);
    };

    // Function to format products display
    const formatProducts = (products) => {
      return products?.map((product, index) => (
        <div
          key={product._id}
          className={index !== 0 ? "mt-2 pt-2 border-t" : ""}
        >
          <div className="flex items-start">
            <img
              src={product.productId.images[0]}
              alt={product.productId.name}
              className="w-10 h-10 object-cover rounded mr-2"
            />
            <div>
              <p className="font-medium">{product.productId.name}</p>
              <p className="text-xs text-gray-500">
                Qty: {product.quantity} × ₹{product.price}
              </p>
            </div>
          </div>
        </div>
      ));
    };

    return (
      <tr className="bg-white border-b hover:bg-gray-50">
        <td className="px-6 py-4">
          <div className="max-h-32 overflow-y-auto">
            {formatProducts(order.products)}
          </div>
        </td>
        <td className="px-6 py-4">{order.user.phonenumber}</td>
        <td className="px-6 py-4">{order.user.address || "N/A"}</td>
        <td className="px-6 py-4">
          <div className="space-y-1">
            {[
              ...new Set(order.products?.map((p) => p.productId.category.name)),
            ].join(", ")}
          </div>
        </td>
        <StatusDropdown
          currentStatus={paymentStatus}
          options={paymentOptions}
          onStatusChange={handlePaymentStatusChange}
        />
        <StatusDropdown
          currentStatus={orderStatus}
          options={orderOptions}
          onStatusChange={handleOrderStatusChange}
        />
      </tr>
    );
  };

  return (
    <div>
      <PageHeader content={"Orders"} />

      <div className="flex">
        <div className="w-1/3 space-y-2">
          <p className="font-medium text-sm">Sales Period</p>
          <div className="w-full">
            <DateRangePicker />
          </div>
          <div className="w-full">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Filter by Product Category</option>
              {formUtilites.categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          {AnalysisData?.map((d) => (
            <Ordercards data={d.data} count={d.count} />
          ))}
        </div>
      </div>
      {/* table */}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Items
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Phone Number</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Address</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Categories</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Payment Status</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Order Status</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <TableRow order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
