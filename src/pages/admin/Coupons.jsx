import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

// CouponForm Component
const CouponForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountAmount: "",
    minPurchase: "",
    maxDiscount: "",
    expiryDate: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create New Coupon</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Coupon Code
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Enter coupon code"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount Type
            </label>
            <select
              value={formData.discountType}
              onChange={(e) =>
                setFormData({ ...formData, discountType: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount Amount
            </label>
            <input
              type="number"
              value={formData.discountAmount}
              onChange={(e) =>
                setFormData({ ...formData, discountAmount: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Enter discount amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Minimum Purchase
            </label>
            <input
              type="number"
              value={formData.minPurchase}
              onChange={(e) =>
                setFormData({ ...formData, minPurchase: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Enter minimum purchase amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Maximum Discount
            </label>
            <input
              type="number"
              value={formData.maxDiscount}
              onChange={(e) =>
                setFormData({ ...formData, maxDiscount: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Enter maximum discount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="date"
              value={formData.expiryDate}
              onChange={(e) =>
                setFormData({ ...formData, expiryDate: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            rows="3"
            placeholder="Enter coupon description"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create Coupon
        </button>
      </form>
    </div>
  );
};

// CouponTable Component
const CouponTable = ({ coupons, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Discount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Min Purchase
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coupons.map((coupon) => (
              <tr key={coupon.id}>
                <td className="px-6 py-4 whitespace-nowrap">{coupon.code}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coupon.discountType === "percentage"
                    ? `${coupon.discountAmount}%`
                    : `₹${coupon.discountAmount}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ₹{coupon.minPurchase}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(coupon.expiryDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      new Date(coupon.expiryDate) > new Date()
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {new Date(coupon.expiryDate) > new Date()
                      ? "Active"
                      : "Expired"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onEdit(coupon)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(coupon.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main Coupon Component
const Coupon = () => {
  const [coupons, setCoupons] = useState([
    // Sample data - replace with actual API call
    {
      id: 1,
      code: "SUMMER2024",
      discountType: "percentage",
      discountAmount: 20,
      minPurchase: 1000,
      maxDiscount: 500,
      expiryDate: "2024-06-30",
      description: "Summer sale discount",
    },
  ]);

  const handleSubmit = (formData) => {
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleEdit = (coupon) => {
    // Handle edit action
    console.log("Edit coupon:", coupon);
  };

  const handleDelete = (couponId) => {
    // Handle delete action
    console.log("Delete coupon:", couponId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Coupon Management
        </h1>
        <CouponForm onSubmit={handleSubmit} />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Active Coupons
        </h2>
        <CouponTable
          coupons={coupons}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Coupon;
