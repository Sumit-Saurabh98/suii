"use client"
import { designTypes } from "@/config/Config";
import { Loader } from "lucide-react";


const DesignTypes = () => {
    const loading = false; // Replace with actual loading state
    const currentSelectedType = 0; // Replace with actual selected type index
    return (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 mt-12 justify-center">
          {designTypes.map((type, index) => (
            <div
              onClick={() => {}}
              key={index}
              className="flex cursor-pointer flex-col items-center"
            >
              <div
                className={`${type.bgColor} w-14 h-14 rounded-full flex items-center justify-center mb-2`}
              >
                {type.icon}
              </div>
              <span className="text-xs items-center flex gap-2 text-center">
                {loading && currentSelectedType === index && (
                  <Loader className="w-3 h-3" />
                )}
                {type.label}
              </span>
            </div>
          ))}
        </div>
      );
}

export default DesignTypes
