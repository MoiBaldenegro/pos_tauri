export const incrementQuantity = (element: number) => {
  const updatedForm = { ...form };
  const updatedProducts = [...form.products];

  if (updatedProducts[index].quantity > 0) {
    updatedProducts[index].quantity -= 1;
    updatedForm.products = updatedProducts;
    setForm(updatedForm);
  }
};

export const reduceQuantity = (element: number) => {
  console.log(element);

  if (element <= 1) {
    return 1;
  }
  if (element <= 0) {
    return 1;
  }
  return element - 1;
};
