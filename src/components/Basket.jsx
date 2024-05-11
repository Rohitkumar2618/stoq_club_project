import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";

import { InfinitySpin } from "react-loader-spinner";

function Basket() {
  // State to store fetched basket data
  const [baskets, setBaskets] = useState([]);
  // State to track loading state for baskets
  const [loading, setLoading] = useState(true);

  // Fetch basket data from the API
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
        // console.log("API response:", data); // Log the entire response
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
        setBaskets(basketsArray); // Corrected function name
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-center mt-5">
        <div className="px-4 lg:px-0 w-30 lg:w-auto">
          <h1 className="font-bold flex justify-center text-3xl mb-3">
            Your Baskets
          </h1>
          {loading ? ( // Show loading indicator if data is loading
            <div className="flex justify-center items-center h-40">
              <InfinitySpin
                visible={true}
                width="200"
                color="#4fa94d"
                ariaLabel="infinity-spin-loading"
              />
            </div>
          ) : (
            <div className="overflow-y-scroll max-h-[400px]">
              <div className="grid grid-cols-1 gap-4">
                {baskets.map((basket) => (
                  <div
                    key={basket.id}
                    className="flex items-center justify-between w-full gap-4 p-4 rounded-md 
                  overflow-hidden
                  hover:shadow-lg transition duration-300 bg-[#F0F4FE] mb-3"
                    style={{ width: "100%", maxWidth: "400px" }} // Set max width for responsiveness
                  >
                    <div>
                      <IoMdCheckboxOutline className="text-3xl" />
                    </div>
                    <div style={{ flex: "1" }}>
                      {" "}
                      {/* Allow description to truncate */}
                      <h1 className="text-black font-semibold text-lg mb-2">
                        {basket.basket_name}
                      </h1>
                      <p className="text-black text-sm line-clamp-3">
                        {basket.basket_description}
                      </p>
                    </div>
                    <div>
                      <FaArrowRight className=" px-1 bg-white text-black text-2xl hover:text-blue-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Basket;
