export const TicketSearch = ({ setterSearchTerms }) => {
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter Search Terms"
          onChange={(e) => {
            setterSearchTerms(e.target.value);
          }}
        />
      </div>
    </>
  );
};
