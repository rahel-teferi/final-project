import { useRef } from "react";
export const UserSearch = ({ onSearch }) => {
  const searchInput = useRef("");
  const searchByUser = () => {
    onSearch(searchInput.current.value);
  };
  return (
    <>
      <input type="text" placeholder="Search" ref={searchInput} />
      <button type="button" onClick={searchByUser}>
        Search
      </button>
    </>
  );
};
