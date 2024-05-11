// Mpopular_Basket.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {
  Card as NextUICard,
  CardHeader,
  CardBody,
  Avatar,
  Button,
} from "@nextui-org/react";
import { InfinitySpin } from "react-loader-spinner";

function Mpopular_Basket() {
  const [basketsData, setBasketsData] = useState([]);
  const [loading, setLoading] = useState(true);

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
        if (
          !data ||
          !data.data ||
          !data.data.basket_data ||
          Object.keys(data.data.basket_data).length === 0
        ) {
          throw new Error("No basket data found");
        }
        const basketsArray = Object.entries(data.data.basket_data).map(
          ([basketId, basketData]) => ({
            id: basketId,
            ...basketData,
          })
        );
        setBasketsData(basketsArray);
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
      <div className="flex-col overflow-hidden overflow-y-scroll justify-center items-center md:w-full mt-3 p-5">
        <h1 className="font-bold flex justify-center text-3xl mb-3">
          Most Popular Baskets
        </h1>

        <div className="flex gap-2 overflow-x-auto">
          <div className="flex-shrink-0">
            <div className="w-full flex gap-2 overflow-x-auto mr-5 justify-content items-center rounded-md p-10">
              {loading ? (
                <InfinitySpin
                  visible={true}
                  width="200"
                  color="#4fa94d"
                  ariaLabel="infinity-spin-loading"
                />
              ) : (
                basketsData.map((basket, index) => (
                  <div key={basket.id} className="flex-shrink-0">
                    <Link to={`/popular_basket/${index}`}>
                      {" "}
                      {/* Wrap the card with Link */}
                      <NextUICard
                        className="max-w-[340px] bg-[#F0F4FE] gap-3"
                        style={{
                          width: "340px",
                          height: "208px",
                          overflow: "hidden",
                        }}
                      >
                        <CardHeader className="justify-between">
                          <div className="flex gap-5">
                            <Avatar
                              isBordered
                              radius="full"
                              size="md"
                              src={basket.avatarSrc}
                              alt=""
                              // Assuming there's an avatarSrc property
                            />
                            <div className="flex flex-col gap-1 items-start justify-center">
                              <h4 className="text-black font-bold leading-none">
                                {basket.basket_name}
                              </h4>
                              <h5 className="text-small tracking-tight text-default-400">
                                {basket.clients_subscribed} clients subscribed
                              </h5>
                            </div>
                          </div>
                          <Button
                            className={`text-white ${
                              basket.popular ? "bg-green-500" : "bg-red-500"
                            }`}
                          >
                            {basket.popular ? "Popular" : " Average"}
                          </Button>
                        </CardHeader>
                        <CardBody
                          className="px-3 py-0 text-small text-black-600"
                          style={{ overflow: "hidden" }}
                        >
                          <p className="mb-3">{basket.basket_rational}</p>
                        </CardBody>
                      </NextUICard>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mpopular_Basket;
