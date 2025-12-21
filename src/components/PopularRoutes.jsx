import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";

const PopularRoutes = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetch("/popularRoutes.json")
      .then((res) => res.json())
      .then((data) => setRoutes(data))
  }, []);

  return (
    <section className="py-12 px-4 md:px-6 text-black">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-purple-500 mb-10 leading-tight">
                 Popular Routes {" "}
                  <span className="text-yellow-400">
                    <Typewriter
                      words={[""]}
                      loop
                      cursor
                      cursorStyle="!"
                      typeSpeed={120}
                      deleteSpeed={70}
                      delaySpeed={1000}
                    />
                  </span>
                </h2>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {routes.map((route, index) => (
          <div
            key={index}
            className=" bg-white  border-0 rounded-xl  transform duration-300  hover:scale-103"
          >
            <img
              src={route.image}
              alt={`${route.from}-${route.to}`}
              className="rounded-md mb-3 w-full h-42 "
            />
            <div className="px-3 pb-2">
              <h3 className="text-xl text-gray-900 font-semibold ">
              {route.from} → {route.to}
            </h3>
            <p>Price: ৳ {route.startingPrice}</p>
            <p>Duration: {route.duration}</p>
            <ul className="list-decimal list-inside">
              {route.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularRoutes;
