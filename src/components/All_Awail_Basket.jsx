import { Link } from "react-router-dom";

function All_Awail_Basket({ list }) {
  return (
    <>
      <div className="bg-zinc-200">
        <div className="p-3">
          <h1 className="font-bold m-5">All Available Baskets</h1>
        </div>
        <div className="flex  flex-wrap justify-around">
          {list.map((item, index) => (
            <Link to={`/basket/${index}`} key={index}>
              <div className="flex flex-col items-center rounded-md px-2 py-1 md:py-16 lg:py-20">
                {item.img ? (
                  <img
                    alt="Logo"
                    className="mb-2 rounded-md"
                    height={80}
                    src={item.img}
                    style={{
                      aspectRatio: "80/80",
                      objectFit: "cover",
                    }}
                    width={80}
                  />
                ) : (
                  <div className="mb-2 rounded-md bg-gray-300 flex  h-20 w-20">
                    <span className="text-gray-500">
                      <i className="fas fa-image fa-2x"></i>
                    </span>
                  </div>
                )}
                <span className="text-sm font-medium">{item.basket_name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default All_Awail_Basket;
