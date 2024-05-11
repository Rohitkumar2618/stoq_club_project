import React, { useState, useEffect } from "react";
import { FallingLines } from "react-loader-spinner";
import { Grid } from "react-loader-spinner";
import { useParams } from "react-router-dom";
function BasketDetails() {
  let { id } = useParams("");
  // State to store fetched basket data
  const [baskets, setBaskets] = useState([]);
  // State to track loading state for baskets
  const [loading, setLoading] = useState(true);

  const products = baskets.map((basket) => ({
    name: basket.basket_name,
    weight: basket.fund_required,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://centrum-backend.vercel.app/login/admin/dashboard/ALL",
          {
            headers: {
              Authorization: "Basic QTE6dGhpc2lzYWRtaW4=",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("API response:", data); // Log the entire response
        if (
          !data ||
          !data.data ||
          !data.data.basket_data ||
          Object.keys(data.data.basket_data).length === 0
        ) {
          throw new Error("No basket data found");
        }
        // Convert basket_data object to an array of objects
        const basketsArray = Object.entries(data.data.basket_data).map(
          ([basketId, basketData]) => ({
            id: basketId,
            ...basketData,
          })
        );
        setBaskets(basketsArray);

        // Corrected function name
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();

    // Scroll to the top when the component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  function handleForm(e) {
    e.preventDefault(); // Prevent default form submission behavior
    const basketMultiple = document.getElementById("basketMultiple").value;
    console.log(basketMultiple); // Log the value to the console
  }

  return (
    <>
      <div className="p-10 font-bold text-2xl">
        <h1 className="text-1xl">Basket Name: {name}</h1>
      </div>

      {/* $ Boxes Code */}
      <div className="p-3 flex flex-wrap gap-5 items-center justify-center">
        {loading ? (
          <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        ) : (
          baskets.map((basket, index) => (
            <div
              key={index}
              className="w-32 h-32 flex flex-col bg-zinc-300 rounded-md"
            >
              <h1 className="p-5">{basket.basket_name}</h1>
              <h1>{basket.annual_returns}</h1>
            </div>
          ))
        )}
      </div>
      {/* Why we want to invest wala code */}
      <div className="p-3">
        <h3 className="font-semibold mb-3">Why to invest in this basket</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae
          minus quis itaque, atque expedita nulla sapiente provident cumque
          quasi? Nisi nihil possimus atque rem suscipit praesentium voluptatum
          adipisci qui quo?
        </p>
      </div>

      {/* Stocks and weight Code  */}
      <div className="">
        <span className="font-semibold p- text-2xl">
          <h3 className="p-3">Stocks & Weights</h3>
        </span>
        <div className=" p-5">
          <div className="flex justify-center items-center p-3 gap-40">
            <h3 className="text-red-400 font-bold">Stock</h3>
            <h3 className="text-red-400 font-bold">Weight</h3>
          </div>
          <div className="overflow-y-auto *: " style={{ maxHeight: "200px" }}>
            {loading ? (
              <div className="flex items-center justify-center mt-3">
                <Grid
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="grid-loading"
                  radius="12.5"
                  wrapperStyle={{}}
                  wrapperClass="grid-wrapper"
                />
              </div>
            ) : (
              products.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mt-5 p-2 bg-gray-100 rounded-md"
                >
                  <h3 className="text-gray-800">{product.name}</h3>
                  <h3 className="text-gray-800">₹ {product.weight}</h3>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* About the manager code */}

      <div className="mt-32 p-3">
        <span>
          <h1 className="mb-3 text-xl font-bold"> About the Manager </h1>
        </span>

        <div className="bg-zinc-300 rounded-lg shadow-md overflow-hidden p-3">
          <div className="p-4">
            <h2 className="text-xl font-bold">Centrum</h2>
            <p className="text-gray-700 mt-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
              earum illum qui et dolorum dignissimos reprehenderit distinctio,
              ratione exercitationem est!
            </p>
            <div className="flex items-center mt-4">
              <p className="text-gray-500 mr-2">Manages smallcases</p>
              <p className="text-blue-500">Manages smallcases</p>
            </div>
            <div className="flex items-center mt-2">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
              <p className="text-gray-500">Thematic</p>
            </div>
            <div className="flex items-center mt-2">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              <p className="text-gray-500">Growth</p>
            </div>
            <div className="mt-4">
              <p className="text-gray-500 text-sm">+ 6 more strategies</p>
            </div>
            <div className="mt-6 flex gap-20">
              <a className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View manager details &gt;
              </a>

              <a className="text-sm font-medium text-zinc-800">Disclosures</a>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <div className="flex items-center">
            <h1 className="font-bold mr-2">Basket Multiple :</h1>
            <input
              id="basketMultiple" // Add id attribute
              type="text"
              className="border-2 border-red-500 px-2 py-1 rounded-md"
              placeholder="Enter multiple of Basket"
            />
          </div>
        </div>
        <button
          className="w-full h-full mt-3 px-3 py-1 rounded-md text-white font-bold text-1xl bg-blue-700"
          onClick={handleForm}
        >
          Invest Now
        </button>
      </div>
    </>
  );
}

export default BasketDetails;
