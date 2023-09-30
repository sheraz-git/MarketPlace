import React from "react";

const category = [
  { name: "Electronics", value: "electronics" },
  { name: "Home", value: "home" },
  { name: "Toys", value: "toys" },
];

const Filters = ({ filters, setFilters, showFilters, setShowFilters }) => {
  return (
    <div className="w-72">
      <div className="flex justify-between items-center">
        <h1>Filters</h1>
        <i
          className="ri-close-line"
          onClick={() => {
            setShowFilters(!showFilters); // Use showFilters instead of setFilters
          }}
        ></i>
      </div>

      <div className="flex flex-col gap-4">
        <h1>Category</h1>
        <div className="flex flex-col gap-3">
          {category.map((item) => {
            return (
              <div key={item.value}>
                <input
                  type="checkbox"
                  name="category"
                  checked={filters?.category?.includes(item.value)} 
                  onChange={(e) => {
                    if (e.target.checked) { 
                      setFilters({
                        ...filters,
                        category: [...filters.category, item.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        category: filters.category.filter(
                          (selectedCategory) => selectedCategory !== item.value
                        ),
                      });
                    }
                  }}
                />
                <label>{item.name}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Filters;