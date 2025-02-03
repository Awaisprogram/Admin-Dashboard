const productSchema = {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    { name: "name", type: "string" },
    { name: "subname", type: "string" },
    { name: "discount", type: "number" },
    { name: "price", type: "number" },
    { name: "description", type: "text" },
    { name: "availiblity", type: "text" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 200,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .replace(/[^a-z0-9-]/g, "") // Remove special characters
            .slice(0, 200),
      },
    },
    {
      name: "image",
      type: "image",
      options: {
        hotspot: true, // Optional: Allows image cropping in the Sanity Studio
      },
    },
  ],
};

export default productSchema;
