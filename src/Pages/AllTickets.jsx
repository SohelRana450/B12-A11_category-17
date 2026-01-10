


import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import SingleData from "../components/SingleData";
import Pending from "../components/Pending";

const AllTickets = () => {
  const axiosSecure = useAxiosSecure();

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [transport, setTransport] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isLoading } = useQuery({
    queryKey: ["all-tickets", search, transport, sortOrder, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-tickets?search=${search}&Transport=${transport}&sort=${sortOrder}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: false,
  });

  const tickets = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const resetFilters = () => {
    setSearchInput("");
    setSearch("");
    setTransport("");
    setSortOrder("");
    setPage(1);
  };

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleTransportChange = (value) => {
    setTransport(value);
    setPage(1);
  };
  const handleSortChange = (value) => {
    setSortOrder(value);
    setPage(1);
  };

  if (isLoading) return <Pending />;

  return (
    <div className="my-10 container mx-auto px-4">
      <h2 className="text-center bg-base-200 py-5 rounded-t-md font-bold text-4xl">
        All Tickets
      </h2>

      <div className="p-4 bg-base-200 rounded-md flex flex-wrap gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search From or To"
          className="input input-bordered w-full sm:w-1/4"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="btn btn-primary w-full sm:w-auto"
          onClick={handleSearch}
        >
          Search
        </button>

        <select
          value={transport}
          onChange={(e) => handleTransportChange(e.target.value)}
          className="select select-bordered w-full sm:w-1/4"
        >
          <option value="">All Transport</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="launch">Launch</option>
          <option value="plane">Plane</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => handleSortChange(e.target.value)}
          className="select select-bordered w-full sm:w-1/4"
        >
          <option value="">Sort By Price</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>

        <button className="btn btn-neutral w-full sm:w-auto" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {tickets.length > 0 ? (
          tickets.map((t) => <SingleData key={t._id} single={t} />)
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
