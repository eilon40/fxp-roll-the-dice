import { User } from "../../lib/redux/slices/results.slice";
import { useState } from "react";

const ListResults = ({ data, title, isOpen }: IListResultsProps) => {
  const [show, setShow] = useState<boolean>(isOpen ? true : false);
  const toggleShow = () => setShow((prev) => !prev);

  return (
    <div className="flex flex-col gap-6 mx-auto w-full">
      <div className="flex items-center gap-6 justify-between">
        <h2 className="w-max h2-header border-r-4 border-r-orange-400 pr-3 mr-3 md:mr-0">
          {title}
        </h2>
        <button
          onClick={toggleShow}
          data-open={show ? "true" : "false"}
          className={`text-sm main-btn`}
        >
          {show ? "הסתר" : "הצג"}
        </button>
      </div>
      {show ? (
        <ul className="flex flex-col gap-3 mr-5">
          {data.map((user, i) => (
            <li
              key={i}
              className="w-max hover:scale-[1.02] duration-300 ease-in-out"
            >
              <b>{user.order ?? i + 1}</b>.{" "}
              <a
                href={user.href}
                target="_blank"
                className="font-bold text-slate-600 hover:text-cyan-600 duration-300 ease-in-out"
              >
                {user.nickname}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

interface IListResultsProps {
  title: string;
  isOpen?: boolean;
  data: User[];
}

export default ListResults;
