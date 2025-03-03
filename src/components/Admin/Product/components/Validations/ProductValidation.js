export const validateProduct = (data, selectedVariant, images) => {
  const errors = {};

  // Common required fields
  if (!data.name?.trim()) errors.name = "Product name is required";
  if (!data.brand?.trim()) errors.brand = "Brand is required";
  if (!data.category?.trim()) errors.category = "Category is required";
  if (!data.label?.trim()) errors.label = "Label is required";
  if (!data.units?.trim()) errors.units = "Units is required";

  // Validate variant selection
  if (!selectedVariant) {
    errors.variantSelection =
      "Please select whether the product has variants or not";
    return errors;
  }

  if (selectedVariant === "noVariants") {
    // Non-variant product validation
    if (!data.sku?.trim()) errors.sku = "SKU is required";
    if (!data.price) errors.price = "Price is required";
    if (!data.offerPrice) errors.offerPrice = "Offer price is required";
    if (!data.stock) errors.stock = "Stock is required";
    if (!data.description?.trim())
      errors.description = "Description is required";

    // Numeric validation
    if (isNaN(data.price)) errors.price = "Price must be a number";
    if (isNaN(data.offerPrice))
      errors.offerPrice = "Offer price must be a number";
    if (isNaN(data.stock)) errors.stock = "Stock must be a number";

    // Price logic
    if (Number(data.offerPrice) >= Number(data.price)) {
      errors.offerPrice = "Offer price must be less than regular price";
    }

    // Image validation
    if (!images?.some((image) => image)) {
      errors.images = "At least one product image is required";
    }
  }

  // ... rest of the validation logic
  return errors;
};
