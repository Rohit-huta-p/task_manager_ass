import React, { useState } from 'react'

const Filter = ({filter,setFilter}) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setIsDropdownOpen(false); 
    };
  return (


            <div className="relative inline text-left z-50">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg font-medium"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                    Filter: {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute mt-2 bg-white border rounded-lg shadow-lg w-40">
                        <ul>
                            <li
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleFilterChange("all")}
                            >
                                All
                            </li>
                            <li
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleFilterChange("pending")}
                            >
                                Pending
                            </li>
                            <li
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleFilterChange("completed")}
                            >
                                Completed
                            </li>
                        </ul>
                    </div>
                )}
            </div>

  )
}

export default Filter