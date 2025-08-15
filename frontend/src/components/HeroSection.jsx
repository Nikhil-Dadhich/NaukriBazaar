import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const [query,setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();   
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }
  return (
    <div className="text-center px-4">
      <div className="flex flex-col items-center gap-5 my-10">
        <span className="inline-block px-5 py-2 rounded-full bg-gray-100 text-[#f92e01] font-semibold tracking-wide text-sm">
          India’s #1 Launchpad for Dream Careers 🚀
        </span>

        <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
          Unlock, Apply & <br />
          Land Your <span className="text-[#6A38C2]">Dream Job</span> in Style!
        </h1>

        <p className="text-gray-600 max-w-md text-center text-lg">
          Join thousands skyrocketing their careers. One click, one leap, one dream closer.
        </p>

        <div className="flex w-full max-w-xl shadow-lg border border-gray-300 pl-3 pr-1 py-1 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            value={query}
            placeholder="Find your dream jobs..."
            aria-label="Search for jobs"
            className="outline-none border-none w-full text-base bg-transparent"
            onChange={(e)=> setQuery(e.target.value)}
          />
          <Button onClick={searchJobHandler} className="rounded-full px-4 py-2 bg-[#6A38C2] hover:bg-[#5a2dae] transition-all text-white flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
