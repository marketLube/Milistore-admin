import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listProducts } from "../../sevices/ProductApis";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";

import PageHeader from "../../components/Admin/PageHeader";
import SearchBar from "../../components/Admin/Product/components/Search/SearchBar";
import ProductTable from "../../components/Admin/Product/components/Table/ProductTable";
import Pagination from "../../components/Admin/Product/components/Pagination/Pagination";

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(currentPage);
  }, []);

  const fetchProducts = async (page) => {
    try {
      setIsLoading(true);
      const res = await listProducts(page);

      setProducts(res?.data?.data?.products);
      setTotalPages(res?.data?.data?.totalPages);
      //   setCurrentPage(res?.data?.data?.currentPage);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    // Implement search logic
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    await fetchProducts(page);
  };

  return (
    <div className="space-y-6 relative min-h-screen pb-20">
      <PageHeader content="Products" />

      <div className="flex flex-col md:flex-row justify-between">
        <button
          onClick={() => navigate("addproduct")}
          className="bg-green-500 p-1 text-md md:p-2 text-white rounded-md"
        >
          Add New Product
        </button>
        <SearchBar handleSearch={handleSearch} />
      </div>

      {isLoading ? (
        <LoadingSpinner color="primary" text="Loading products..." />
      ) : (
        <>
          <ProductTable products={products} />

          <div className="flex justify-between fixed right-9">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            {/* <button className="btn fixed  bg-red-600 text-white py-1 rounded-sm px-3">
              Delete
            </button> */}
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
