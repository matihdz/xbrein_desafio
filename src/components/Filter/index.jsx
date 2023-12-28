import PropTypes from "prop-types";
import MagnifyingGlassSolid from "../../assets/svg/magnifying-glass-solid.svg?react";
import XmarkSolid from "../../assets/svg/xmark-solid.svg?react";
import { useState } from "react";

const Filter = ({ onFilterChange }) => {
  const [text, setText] = useState("");

  const handleFilterChange = (filterText) => {
    setText(filterText);
    if (onFilterChange) onFilterChange(filterText);
  };

  return (
    <div className="flex items-center justify-between p-2 bg-white border-2 border-gray-500 rounded-sm">
      <input value={text} type="text" placeholder="Buscar..." className="w-full text-gray-700 placeholder-gray-400 bg-transparent outline-none" onChange={(e) => handleFilterChange(e.target.value)} />
      {text.length == 0 ? (
        <MagnifyingGlassSolid className="cursor-pointer flex-shrink-0 text-gray-500" />
      ) : (
        <XmarkSolid className="cursor-pointer flex-shrink-0 text-gray-500" onClick={() => handleFilterChange("")} />
      )}
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};
export default Filter;
