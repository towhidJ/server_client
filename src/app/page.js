"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Swal from "sweetalert2";
import { zodResolver } from "@hookform/resolvers/zod";
import { RingLoader } from "react-spinners";
import { useState } from "react";
import Image from "next/image";
import { banner } from "../../public/banner.jpg";
const Home = () => {
  const [loading, setLoading] = useState(false); // Add loading state
  //
  const schema = z.object({
    productName: z.string().nonempty("Product Name is required"),
    description: z.string(),
    mobileNo: z.string(),
    customerName: z.string().nonempty("Please type your Name"),
    brandName: z.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    try {
      console.log(data);
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: "আপনার গুরুত্বপূর্ণ মতামত টি আমাদের সাথে শেয়ার করার জন্য ধনবাদ ❤️❤️",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.message || "Something went wrong!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Faield",
      });
    } finally {
      setLoading(false); // End loading
      reset();
    }
  };
  return (
    <>
      <div style={{ height: "200px", width: "100%", position: "relative" }}>
        <h1>Fixed Height Image Example</h1>
        <Image
          src="/banner.jpg" // Path to your image in the public folder
          alt="Banner"
          layout="fill" // Makes the image fill the parent container
          objectFit="cover" // Ensures the image covers the container without distortion
        />
      </div>
      <div className="bg-gray-200 mt-3 mx-auto max-w-6xl bg-white py-20 px-12 lg:px-24 shadow-xl mb-24">
        <h1 className="text-center pb-5 text-4xl font-bold text-cyan-900">
          আপনার উজ্জ্বল ও সুন্দর ত্বকের যত্নে ব্যাবহিত প্রসাধনী গুলোর নাম ও
          রিভিও দিন।
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="shadow-2xl rounded-xl"
        >
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <div className="grid md:grid-cols-1 gap-2">
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-full px-3">
                  <label
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    htmlFor="name"
                  >
                    আপনার নাম*
                  </label>
                  <input
                    className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    id="application-link"
                    type="text"
                    placeholder="এখানে আপনার নামটি লিখুন।"
                    {...register("customerName")}
                  />
                  <div>
                    <span className="text-red-500 text-xs italic">
                      {errors.customerName?.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="-mx-3 md:flex mb-6"></div>
            </div>
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-full px-3">
                <label
                  className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  আপনার ব্যাবহিত পণ্য গুলোর নাম দিন* (একাদিক হলে কমা দিয়ে লিখুন)
                </label>
                <textarea
                  className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                  id="application-link"
                  type="text"
                  rows="5"
                  placeholder="আপনার ব্যাবহিত পণ্য গুলোর নাম দিন* (একাদিক হলে কমা দিয়ে লিখুন)"
                  {...register("productName")}
                />
                <div>
                  <span className="text-red-500 text-xs italic">
                    {errors.productName?.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-full px-3">
                <label
                  className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  আপনার ব্যাবহিত পণ্য গুলোর রিভিও* (একাদিক হলে কমা দিয়ে লিখুন)
                </label>
                <textarea
                  className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                  id="application-link"
                  type="text"
                  rows="5"
                  placeholder="আপনার ব্যাবহিত পণ্য গুলোর রিভিও* (একাদিক হলে কমা দিয়ে লিখুন)"
                  {...register("description")}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-full px-3">
                  <label
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    htmlFor="name"
                  >
                    মোবাইল নাম্বার (যদি থাকে)
                  </label>
                  <input
                    className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    id="application-link"
                    type="text"
                    placeholder="mobileno"
                    {...register("mobileNo")}
                  />
                  <div>
                    <span className="text-red-500 text-xs italic">
                      {errors.mobileNo?.message}
                    </span>
                  </div>
                </div>
              </div>

              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-full px-3">
                  <label
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    htmlFor="name"
                  >
                    ব্রান্ড নাম*
                  </label>
                  <input
                    className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    id="application-link"
                    type="text"
                    placeholder="ব্রান্ড নাম"
                    {...register("brandName")}
                  />
                </div>
              </div>
            </div>

            <div className="-mx-3 md:flex mt-2">
              <div className="md:w-full px-3">
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white font-bold py-2 px-4 border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-full"
                >
                  {loading ? (
                    <RingLoader color="#C8FF00FF" size={24} /> // Show spinner when loading
                  ) : (
                    "ক্লিক"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Home;
