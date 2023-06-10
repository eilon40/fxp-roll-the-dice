import { ReactNode, useState } from "react";
import logo from "../../assets/fxp-logo.webp";
import Explanation from "../general/explanation";

const MainLayout = ({ children }: IMainLayoutProps) => {
  const [showExp, setShowExp] = useState<boolean>(false);

  return (
    <>
      <Explanation show={showExp} toggle={() => setShowExp((prev) => !prev)} />

      <nav className="p-3 bg-slate-800 flex items-center gap-8 text-white font-bold">
        <img
          src={logo}
          className="w-8 h-8 shadow-md shadow-gray-500 rounded-full"
        />
        <a href="/">חזרה לכלי הראשי</a>
      </nav>
      <main className="mx-auto bg-slate-50 rounded-xl mt-8 max-w-6xl p-8 min-h-screen">
        {children}
      </main>
      <div className="fixed z-50 md:bottom-0 top-0 md:top-auto left-0 md:ml-20 md:mb-10 ml-5 mt-2 text-sm md:text-xl">
        <button
          className="main-btn"
          onClick={() => setShowExp((prev) => !prev)}
        >
          צריכים עזרה?
        </button>
      </div>
    </>
  );
};

interface IMainLayoutProps {
  children: ReactNode[] | ReactNode;
}

export default MainLayout;
