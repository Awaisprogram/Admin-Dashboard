import { client } from "@/sanity/lib/client";

export const getOrders = async () => {
  try {
    const query = `*[_type == "order"] | order(orderDate desc) {
      _id,
      firstName,
      lastName,
      address,
      city,
      zipCode,
      phone,
      email,
      cartItems[] {
        _key,
        quantity,
        product->{
          _id,
          name,
          price,
         "image": image.asset->url
        }
      },
      total,
      orderDate
    }`;

    const orders = await client.fetch(query);
    return orders;
    
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
  
};

