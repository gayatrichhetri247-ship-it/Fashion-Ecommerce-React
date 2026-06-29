import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/features/cartSlice";
import { deleteproduct, getproducts } from "../api/products.service";



const ProductManagement = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const cart = useSelector((state) => state.cart.cartItems);
  console.log(cart);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getproducts,
  });

  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: (id) => {
      return deleteproduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => {
      console.log("failed to delete product");
    },
  });

  if (isPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
        <span className="ml-3 text-lg font-medium text-gray-600">
          Loading product database...
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto my-8 max-w-md rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-700">
        <p className="font-semibold">Something went wrong!</p>
        <p className="text-sm">{error?.message || "Could not fetch menu."}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header section with responsive layout adjustment */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            product Management
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all items in the product menu database including their image,
            description, and price.
          </p>
        </div>
        <div className="w-full sm:w-auto sm:flex-none">
          <button
            onClick={() => {
              navigate("/admin/add-product");
            }}
            className="w-full sm:w-auto block rounded-lg bg-orange-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 transition-colors"
          >
            Add New Item
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE LIST LAYOUT (Visible only on screens smaller than md)               */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {data?.products?.map((product) => (
          <div 
            key={product._id || product.name}
            className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3"
          >
            <div className="flex gap-4">
              <img
                onClick={() =>
                  navigate(`/menu/${product._id}`, { state: product })
                }
                src={product.photo}
                alt={product.name}
                className="h-16 w-20 rounded-md object-cover border border-gray-100 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                <p className="text-xs text-gray-600 line-clamp-2 mt-0.5">{product.description}</p>
                <span className="inline-block text-sm font-semibold text-orange-600 mt-1">
                  RS {product.price}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">
              <button
                className="w-full py-2 text-center text-sm font-medium rounded-lg text-indigo-600 bg-indigo-50/50 hover:bg-indigo-50 transition-colors"
                onClick={() => navigate("/admin/edit-product", { state: product })}
              >
                Edit
              </button>
              <button
                className="w-full py-2 text-center text-sm font-medium rounded-lg text-red-600 bg-red-50/50 hover:bg-red-50 transition-colors"
                onClick={() => {
                  deleteMutation.mutate(product._id);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP TABLE LAYOUT (Visible only on md screens and up)                 */}
      {/* ========================================================================= */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Image
                </th>
                <th scope="col" className="px-6 py-4">
                  Item Name
                </th>
                <th scope="col" className="px-6 py-4">
                  Description
                </th>
                <th scope="col" className="px-6 py-4">
                  Price
                </th>
                <th scope="col" className="px-6 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data?.products?.map((product) => (
                <tr
                  key={product._id || product.name}
                  className="hover:bg-gray-50/70 transition-colors"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <img
                      onClick={() =>
                        navigate(`/menu/${product._id}`, { state: product })
                      }
                      src={product.photo}
                      alt={product.name}
                      className="h-12 w-16 rounded-md object-cover border border-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                    {product.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600 max-w-md">
                    <p className="line-clamp-2 text-xs sm:text-sm">
                      {product.description}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 font-semibold text-orange-600">
                    RS {product.price}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium space-x-3">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 transition-colors"
                      onClick={() => navigate("/admin/edit-product", { state: product })}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 transition-colors"
                      onClick={() => {
                        deleteMutation.mutate(product._id);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;