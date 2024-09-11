const fetchProducts = async () => {
  const res = await fetch(`${process.env.API_URL}/api/product`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  return data.products || [];
};
const Review = async () => {
  const products = await fetchProducts();
  return (
    <div className=" mx-14 px-5">
      <div className="container mt-5 mb-2">
        <div className="text-center">
          <h1 className="search-text">
            List of
            <span className="search-heading-text">Review</span>
          </h1>
          <hr />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b bg-cyan-900 ">
                  <tr className="text-white font-bold">
                    <th scope="col" className="text-sm   px-6 py-4 text-left">
                      Customer Name
                    </th>
                    <th scope="col" className="text-sm   px-6 py-4 text-left">
                      Product Name
                    </th>
                    <th scope="col" className="text-sm   px-6 py-4 text-left">
                      Description
                    </th>
                    <th scope="col" className="text-sm   px-6 py-4 text-left">
                      Brand Name
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr className="border-b" key={product._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {product.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {product.productName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {product.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {product.brandName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
