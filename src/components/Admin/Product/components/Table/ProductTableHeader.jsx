import React from "react";

const ProductTableHeader = () => (
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" className="px-6 py-3">
        Product name
      </th>
      <th scope="col" className="px-6 py-3">
        Brand
      </th>
      <th scope="col" className="px-6 py-3">
        Stock
      </th>
      <th scope="col" className="px-6 py-3">
        Price
      </th>
      <th scope="col" className="px-6 py-3">
        Offer Price
      </th>
      <th scope="col" className="px-6 py-3">
        Category
      </th>
      <th scope="col" className="px-6 py-3">
        Last Updated
      </th>
      <th scope="col" className="px-6 py-3">
        Actions
      </th>
    </tr>
  </thead>
);

export default ProductTableHeader;
