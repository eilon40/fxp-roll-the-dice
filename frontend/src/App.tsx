import RandomizedUsers from "./components/results/randomized-users";
import SearchPage from "./components/search/search-page";

function App() {
  return (
    <section className="w-full flex flex-col gap-12 md:gap-14">
      <SearchPage />
      <RandomizedUsers />
    </section>
  );
}

export default App;
