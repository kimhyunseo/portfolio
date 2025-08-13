
import AboutMe from './AboutMe';
import Cover from './Cover';
import MainP from './MainP';
import Map from './Map';
import Skill from './Skill';

const MainPage = () => {
  return (
    <div id='main-page'>
        <Cover/>
        <Map/>
        <AboutMe/>
        <Skill/>
        <MainP/>
    </div>
  );
};

export default MainPage;