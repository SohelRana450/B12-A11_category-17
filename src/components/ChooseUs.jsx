import React, { useState, useEffect } from "react";
import * as Icons from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";


const ChooseUs = () => {
  const [travelTips, setTravelTips] = useState([]);

  useEffect(() => {
    fetch("/chooseUs.json")
      .then((res) => res.json())
      .then((data) => setTravelTips(data))
      .catch((err) => console.error("Failed to load tips:", err));
  }, []);

 

  return (
    <section className="bg-gray-100 rounded-xl py-12 px-4 md:px-6">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-purple-500 mb-10 leading-tight">
           Why Choose Us – {" "}
            <span className="text-yellow-400">
              <Typewriter
                words={["Travel Tips"]}
                loop
                cursor
                cursorStyle="."
                typeSpeed={120}
                deleteSpeed={70}
                delaySpeed={1000}
              />
            </span>
          </h2>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {travelTips.map((tipCategory, index) => {
          const IconComponent = Icons[tipCategory.icon];
          return (
            <div
              key={index}
              className="card bg-white shadow-lg border rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div
                  className={`${tipCategory.color} p-3 rounded-full text-white mr-3 text-xl`}
                >
                  {IconComponent && <IconComponent />}
                </div>
                <h3 className="text-xl text-purple-900 font-semibold">{tipCategory.title}</h3>
              </div>
              <ol className="list-disc pr-0 px-2  text-gray-900">
                {tipCategory.tips
                  .map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
              </ol>
             
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ChooseUs;



