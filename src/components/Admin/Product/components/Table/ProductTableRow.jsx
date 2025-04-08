import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmationModal from "../../../ConfirmationModal";
import { deleteProduct } from "../../../../../sevices/ProductApis";

const ProductTableRow = ({ product }) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (id) => {
    navigate(`/admin/product/addproduct`, { state: { productId: id } });
  };

  const handleDelete = (id) => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteProduct(product?._id);
      toast.success("Product deleted successfully");
      setShowDeleteModal(false);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {product?.name.split("").length > 30
            ? product.name.slice(0, 30) + "..."
            : product?.name}
        </th>
        <td className="px-6 py-4">{product?.brand?.name}</td>
        <td className="px-6 py-4">{product?.stock}</td>
        <td className="px-6 py-4">₹{product?.price}</td>
        <td className="px-6 py-4">₹{product?.offerPrice}</td>
        <td className="px-6 py-4">{product?.category?.name}</td>
        <td className="px-6 py-4">
          {new Date(product?.updatedAt).toLocaleDateString()}
        </td>
        <td className="px-6 py-4 flex gap-3">
          <FaEdit
            className="w-5 h-5 text-blue-600 cursor-pointer"
            onClick={() => handleEdit(product?._id)}
          />
          <button
            onClick={() => handleDelete(product?._id)}
            className="font-medium text-red-600 hover:underline"
          >
            <FaTrash size={18} />
          </button>
        </td>
      </tr>
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete the product "${product?.name}"?`}
        isLoading={isDeleting}
        confirmButtonText="Delete"
        confirmButtonColor="red"
      />
    </>
  );
};

export default ProductTableRow;
