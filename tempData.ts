
export const tempProducts = [
    {
      _id: "1",
      slug: "product-1",
      media: {
        mainMedia: {
          image: {
            url: "product1.jpg",
            altText: "Product 1",
          },
        },
      },
      manageVariants: false,
      stock: {
        inStock: true,
      },
      name: "Product 1",
      price: {
        formatted: {
          price: "$19.99",
        },
      },
    },
    {
      _id: "2",
      slug: "product-2",
      media: {
        mainMedia: {
          image: {
            url: "product2.jpg",
            altText: "Product 2",
          },
        },
      },
      manageVariants: true,
      stock: {
        inStock: false,
      },
      name: "Product 2",
      price: {
        formatted: {
          price: "$24.99",
        },
      },
    },
  ];
