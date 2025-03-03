import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listProducts, searchProducts } from "../../sevices/ProductApis";
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
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchKeyword) {
      handleSearch();
    } else {
      fetchProducts(currentPage);
    }
  }, [currentPage, searchKeyword]);

  const fetchProducts = async (page) => {
    try {
      setIsLoading(true);
      const res = await listProducts(page);

      setProducts(res?.data?.data?.products);
      setTotalPages(res?.data?.data?.totalPages);
      //   setCurrentPage(res?.data?.data?.currentPage);
    } catch (err) {
      toast.error("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const res = await searchProducts({
        keyword: searchKeyword,
        page: currentPage,
        limit: 3,
      });
      setProducts(res?.data?.data?.products);
      setTotalPages(res?.data?.data?.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const handleSearchInput = debounce((value) => {
    setCurrentPage(1);
    setSearchKeyword(value);
  }, 500);

  const handlePageChange = async (page) => {
    setCurrentPage(page);
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
        <SearchBar handleSearch={(e) => handleSearchInput(e.target.value)} />
      </div>

      {isLoading ? (
        <LoadingSpinner color="primary" text="Loading products..." />
      ) : (
        <>
          {products.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No products found
            </div>
          ) : (
            <ProductTable products={products} />
          )}

          {totalPages > 1 && (
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
          )}
        </>
      )}
    </div>
  );
}

export default Products;
