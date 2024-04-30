import React from "react";

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Buscar empleado"
        value={searchTerm}
        onChange={handleSearch}
        className="bg-zinc-700 text-white px-4 py-2 rounded-md"
      />
    </div>
  );
};

export default SearchBar;
