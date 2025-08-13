
import AboutMe from './AboutMe';
import Clone from './Clone';
import Cover from './Cover';
import MainP from './MainP';
import Map from './Map';
import Skill from './Skill';

const MainPage = () => {
  return (
    <div id='main-page'>

      <Cover />
      <Map />
      <AboutMe />
      <Skill />
      <MainP />
      <Clone />
    </div>
  );
};

export default MainPage;