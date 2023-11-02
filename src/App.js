import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import LayOutProvider from "./components/LayOutProvider";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LayOutProvider />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
