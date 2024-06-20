import AutoSuggestInput from "./components/AutoSuggestInput";
import SavedList from "./components/SavedList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AutoSuggestInput />} />
          <Route path="saved" element={<SavedList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
