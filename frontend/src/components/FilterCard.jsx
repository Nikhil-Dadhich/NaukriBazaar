import React, { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bengaluru", "Hyderabad", "Pune", "Mumbai","Gurugram"],
  },
  {
    filterType: "Industry",
    array: ["Frontend", "Backend", "FullStack","Cloud","ios"],
  }
];

function FilterCard() {
  const { searchedQuery } = useSelector((state) => state.job);
  const [selectedValue, setSelectedValue] = useState(searchedQuery || "");
  const dispatch = useDispatch();

  // Sync local state with Redux in case it was reset
  useEffect(() => {
    setSelectedValue(searchedQuery);
  }, [searchedQuery]);

  const changeHandler = (value) => {
    setSelectedValue(value);
    dispatch(setSearchedQuery(value));
  };

  return (
    <div>
      <h1 className="font-bold text-xl mb-2">Filter Jobs</h1>
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data) => (
          <div key={data.filterType} className="mb-4">
            <h2 className="font-semibold">{data.filterType}</h2>
            {data.array.map((item) => (
              <Label
                key={item}
                className="flex items-center gap-2 cursor-pointer my-1"
              >
                <RadioGroupItem value={item} />
                <span>{item}</span>
              </Label>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default FilterCard;
