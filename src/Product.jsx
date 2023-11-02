import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

const Product = () => {
  const params = useParams();

  const mutation = useMutation({
    mutationFn: (newProduct) => {
      return axios.put(`https://dummyjson.com/products/${params.productId}`, newProduct);
    },
  });

  const fetchProduct = async () => {
    const response = await fetch(
      `https://dummyjson.com/products/${params.productId}`
    );
    const data = await response.json();
    return data;
  };

  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ["product", params.productId],
    queryFn: fetchProduct,
  });

  if (isLoading) {
    return <h3>Loading!!!</h3>;
  }

  //   return <div>Product {product.title}</div>;
  return <button onClick={() => {mutation.mutate({title: "Lets nacho"})}}>Create Product</button>;
};

export default Product;
