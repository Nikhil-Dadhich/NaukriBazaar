import React from "react";
import Marquee from "react-fast-marquee";
import { Button } from "./ui/button";
const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "DevOps Engineer",
  "AI Engineer",
  "UI/UX Designer",
  "Cloud Architect",
  "Security Analyst",
  "ML Engineer",
];

function CategoryMarquee() {
  return (
    <div className="w-full bg-white  space-y-6">
      {/* Row 1 - Left to Right */}
      <Marquee
        gradient={true}
        speed={50}
        pauseOnHover={true}
        className="gap-2"
      >
        {categories.map((category, index) => (
          <Button
            key={`top-${index}`}
            variant="outline"
            className="mx-3 text-base font-semibold px-6 py-3 whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </Marquee>
    </div>
  );
}

export default CategoryMarquee;
