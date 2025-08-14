
import AboutMe from './AboutMe';
import Clone from './Clone';
import Cover from './Cover';
import MainP from './MainP';
import Map from './Map';
import Skill from './Skill';
import BackgroundAnimation from './BackgroundAnimation';
import Practical from './Practical';

const MainPage = () => {
  return (
    <div id='main-page'>
      <BackgroundAnimation/>
      <Cover />
      <Map />
      <AboutMe />
      <Skill />
      <MainP />
      <Clone />
      <Practical/>
    </div>
  );
};

export default MainPage;