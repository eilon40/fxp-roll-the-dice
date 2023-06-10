import { useState, useEffect } from "react";
import { fetchThreadData } from "../../service/fetch";
import useResults from "../../lib/hooks/use-results";
import useSearch from "../../lib/hooks/use-search";
import dice from "../../assets/dice.gif";
import { ChangeEvent } from "react";
import Spinner from "./spinner";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [amount, setAmount] = useState<string>("1");
  const [loading, setLoading] = useState<boolean>(false);

  const results = useResults();
  const search = useSearch();

  useEffect(() => {
    search.setStateLoading(loading);
  }, [loading]);

  const submitRequest = async () => {
    if (!searchTerm) return;
    setLoading(true);
    search.set(searchTerm);
    search.setAmount(amount);
    try {
      const response = await fetchThreadData(searchTerm, amount);
      results.set(response);
      setLoading(false);
    } catch (error) {
      alert("שגיאה בעת שליפת נתונים!");
      setLoading(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(+event.target.value)) return alert("מספרים בלבד!");
    setSearchTerm(event.target.value);
  };

  const selectOptions = ["1", "3", "5", "7", "10"];
  const handleAmountChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (selectOptions.indexOf(event.target.value) === -1) return;
    if (isNaN(+event.target.value)) return alert("מספרים בלבד!");
    setAmount(event.target.value);
  };

  return (
    <section>
      <img src={dice} className="w-32 h-32 mx-auto" />
      <h1 className="h1-header">הגרלת מגיבים</h1>
      <div className="flex flex-col gap-2 md:w-1/2 mx-auto">
        <label htmlFor="tid">הזן ID אשכול:</label>
        <small className="bg-orange-50 py-1 italic px-6 text-gray-600 rounded-xl shadow-sm">
          לדוגמה: fxp.co.il/showthread.php?t=
          <b className="text-red-500">21653164</b>
        </small>
        <div className="flex gap-3 lg:flex-row flex-col">
          <div className="flex gap-3 item-center">
            <input
              disabled={loading}
              value={searchTerm}
              onChange={handleChange}
              id="tid"
              className="w-full search-input input"
              placeholder="21653164"
            />
            <select
              disabled={loading}
              onChange={handleAmountChange}
              defaultValue={search.current.amount}
              className="input px-2"
            >
              {selectOptions.map((opt) => (
                <option key={opt} value={+opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <button
            className="main-btn text-center"
            disabled={loading}
            onClick={submitRequest}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <Spinner />
                טוען נתונים...
              </div>
            ) : (
              "הגרל משתמשים"
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
