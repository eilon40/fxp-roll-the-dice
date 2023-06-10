import useResults from "../../lib/hooks/use-results";
import useSearch from "../../lib/hooks/use-search";
import ListResults from "./list-results";

const RandomizedUsers = () => {
  const { current } = useResults();
  const search = useSearch();
  console.log(
    "🚀 ~ file: randomized-users.tsx:6 ~ RandomizedUsers ~ current:",
    current
  );
  if (
    current.count === 0 &&
    search.current.term !== "" &&
    !search.current.loading
  )
    return (
      <div className="text-center font-bold mt-12">
        לא נמצאו תוצאות / אין לך גישה לאשכול
      </div>
    );
  if (current.count === 0) return <></>;
  return (
    <>
      <article className="flex md:gap-6 w-full justify-evenly md:flex-row flex-col gap-24">
        <ListResults
          title={`הזוכים (${current.random.length})`}
          data={current.random}
          isOpen={true}
        />
        <ListResults
          title={`רשימה כוללת (${current.all.length})`}
          data={current.all}
        />
        <ListResults
          title={`משתמשים ייחודיים (${current.unique.length})`}
          data={current.unique}
        />
      </article>
    </>
  );
};

export default RandomizedUsers;
