import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";


function Jobs() {
  // useResetSearchedQuery(); // ensures searchedQuery resets on route change

  const [showFilter, setShowFilter] = useState(false);
  const { allJobs, searchedQuery } = useSelector((state) => state.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  // Filter jobs based on searchedQuery
  useEffect(() => {
    if (searchedQuery) {
      const filtered = allJobs.filter((job) =>
        job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      );
      setFilterJobs(filtered);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Large screen filter */}
          <div className="hidden md:block w-full md:w-[22%]">
            <FilterCard />
          </div>

          {/* Small screen filter button */}
          <div className="block md:hidden mb-2">
            <Button
              onClick={() => setShowFilter(true)}
              className="bg-[#7209b7] text-white flex items-center gap-2 px-4 py-2"
            >
              <Filter size={18} />
              Filters
            </Button>
          </div>

          {/* Jobs grid */}
          <div className="flex-1 h-[80vh] overflow-y-auto pb-6">
            {filterJobs.length === 0 ? (
              <span className="text-gray-600">Jobs not found</span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterJobs.map((job) => (
                  <div key={job._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Small screen filter modal */}
      {showFilter && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center md:hidden">
          <div className="bg-white rounded-lg w-11/12 max-w-sm p-4 relative shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowFilter(false)}
            >
              <X />
            </button>
            <FilterCard />
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;
