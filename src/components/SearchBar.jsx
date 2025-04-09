  const SearchBar = ({ value, onChange }) => {
    return (
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by brand or model..."
          className="w-full p-2 border border-gray-300 rounded"
          value={value} 
          onChange={onChange} 
        />
      </div>
    );
  };

  SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  export default SearchBar;