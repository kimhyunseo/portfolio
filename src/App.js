import "./App.scss";
import { HashRouter} from "react-router-dom";
import MainPage from './Component/MainPage';

const App = () => {
  return (
    <HashRouter>
    <div id="app">
      <MainPage/>
    </div>
    </HashRouter>
  );
};

export default App;