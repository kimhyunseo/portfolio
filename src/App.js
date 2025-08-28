import "./App.scss";
import { HashRouter, Routes, Route} from "react-router-dom";
import MainPage from './Component/MainPage';
import ProjectPage from './Component/ProjectPage';

const App = () => {
  return (
    <HashRouter>
    <div id="app">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/projects" element={<ProjectPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;