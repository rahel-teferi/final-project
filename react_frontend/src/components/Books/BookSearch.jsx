import { useRef } from "react";
export const BookSearch = ({ onSearch }) => {
  //uncontrolled component
  const searchInput = useRef("");
  const searchByBook = () => {
    onSearch(searchInput.current.value);
  };
  return (
    <>
      <input type="text" placeholder="Search" ref={searchInput} />
      <button type="button" onClick={searchByBook}>
        Search
      </button>
    </>
  );
};
