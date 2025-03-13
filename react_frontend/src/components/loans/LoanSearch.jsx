import { useRef } from "react";
export const LoanSearch = ({ onSearch }) => {
  const searchInput = useRef("");
  const searchByLoan = () => {
    onSearch(searchInput.current.value);
  };
  return (
    <>
      <input type="text" placeholder="Search" ref={searchInput} />
      <button type="button" onClick={searchByLoan}>
        Search
      </button>
    </>
  );
};
