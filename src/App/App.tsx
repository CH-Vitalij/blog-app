import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
