
import AboutMe from './AboutMe';
import Clone from './Clone';
import Cover from './Cover';
import MainP from './MainP';
import Map from './Map';
import Skill from './Skill';
import BackgroundAnimation from './BackgroundAnimation';
import Practical from './Practical';
import BoardGame from './BoardGame';
import MainMenuvar from './MainMenuvar';
import Contactme from './Contactme';


const MainPage = () => {
  return (
<div id='main-page'>
      <MainMenuvar/>
      <BackgroundAnimation/>
      <div id="cover"><Cover /></div>
      <div id="map"><Map /></div>
      <div id="about"><AboutMe /></div>
      <div id="skill"><Skill /></div>
      <div id="main-project"><MainP /></div>
      <div id="clone"><Clone /></div>
      <div id="practical"><Practical/></div>
      <div id="boardgame"><BoardGame/></div>
      <div id="contactme"><Contactme/></div>
    </div>
  );
};

export default MainPage;