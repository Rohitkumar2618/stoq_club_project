import { useParams } from "react-router-dom";
import All_Awail_Basket from "./All_Awail_Basket";
import Basket from "./Basket";
import Mpopular_Basket from "./Mpopular_Basket";
import { useState, useEffect } from "react";

function DashBoard() {
  let { username } = useParams();
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
      <div className="flex flex-col min-h-30">
        <div className="bg-white mt-3  p-4">
          <h1 className="text-lg font-semibold">Hey {username} !</h1>
          <p className="text-sm text-gray-500 mt-1">Your portfolio of today:</p>
          <div className="flex items-baseline mt-3">
            <h2 className="text-3xl font-bold"> ₹ 23,03.00</h2>
            <span className=" px-4 py-1 rounded-md  bg-zinc-100  ml-2 text-sm font-semibold text-green-500">
              +13%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            You're 13% better than the market today! Congrats!
          </p>
          <div className="px-5 py-5 flex mt-5 bg-zinc-200 rounded-md border border-blue-500">
            <div className="flex flex-grow ">
              <span className="font-semibold flex-1">Overall investment:</span>
              <h1 className="text-2xl flex-1  font-bold "> ₹ 50000</h1>
            </div>
          </div>
        </div>
      </div>

      <Basket />
      <Mpopular_Basket />
      {loading ? <p>Loading...</p> : <All_Awail_Basket list={basketsData} />}
    </>
  );
}

export default DashBoard;
