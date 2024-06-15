class ProductModel {
  constructor(
    name,
    description,
    quantity,
    imageUrl,
    category,
    price,
    sizes,
    rating = []
  ) {
    this.name = name;
    this.quantity = parseInt(quantity);
    this.imageUrl = imageUrl;
    this.ratings = rating;
    this.description = description;
    this.categories = category;
    this.price = parseFloat(price);
    this.sizes = sizes;
  }
}

export default ProductModel;
