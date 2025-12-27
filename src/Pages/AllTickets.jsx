 

import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import SingleData from "../components/SingleData";
import Pending from "../components/Pending";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AllTickets = () => {
  const axiosSecure = useAxiosSecure();

  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [sortOrder, setSortOrder] = useState("");
  const [transport, setTransport] = useState("");

  const [page, setPage] = useState(1);
  const limit = 6;

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const { data, isLoading } = useQuery({
    queryKey: ["all-tickets", sortOrder, debouncedSearch, transport, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-tickets?sort=${sortOrder}&search=${debouncedSearch}&transport=${transport}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Pending />;

  const tickets = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const resetFilters = () => {
    setSearchText("");
    setDebouncedSearch("");
    setSortOrder("");
    setTransport("");
    setPage(1);
  };

  return (
    <div className="my-10 container mx-auto px-4">

      <h2 className="text-center bg-base-200 py-5 rounded-t-md font-bold text-4xl">
        All Tickets Page
      </h2>

  
      <div className="p-4 bg-base-200 rounded-md flex flex-wrap gap-4 justify-between items-center">

  
        <input
          type="text"
          placeholder="Search From → To"
          className="input input-bordered w-full sm:w-1/4"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

   
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered w-full sm:w-1/4"
        >
          <option value="">Sort By Price</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>

      
        <select
          value={transport}
          onChange={(e) => setTransport(e.target.value)}
          className="select select-bordered w-full sm:w-1/4"
        >
          <option value="">Transport Type</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="launch">Launch</option>
          <option value="plane">Plane</option>
        </select>

        <button className="btn btn-neutral w-full sm:w-auto" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {tickets.length > 0 ? (
          tickets.map((single) => (
            <SingleData key={single._id} single={single} />
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No Tickets Found 😢
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-5">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              className={`btn btn-sm ${page === num + 1 ? "btn-primary" : ""}`}
              onClick={() => setPage(num + 1)}
            >
              {num + 1}
            </button>
          ))}

          <button
            className="btn btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllTickets;
