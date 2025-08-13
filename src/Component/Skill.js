import { ReactComponent as Title } from "../svg/title.svg";
import { Icons } from '../svg/index';

const Skill = () => {
  const selectedIcons = [
    { name: 'ps', label: 'PhotoShop' },
    { name: 'ai', label: 'Illustrator' },
    { name: 'figma', label: 'Figma' },
    { name: 'procreate', label: 'Procreate' },
    { name: 'html', label: 'Html5' },
    { name: 'css', label: 'CSS3' },
    { name: 'js', label: 'JS(ES6)' },
    { name: 'scss', label: 'SCSS' },
    { name: 'react', label: 'REACT' },
    { name: 'supabase', label: 'Supabase' },
    { name: 'git2', label: 'Git & Github' },
    { name: 'slack', label: 'Slack' },
  ];
  return (
    <div className="skill">
      <div className='title'>
        <h3>SKILLS & TOOLS</h3>
        <Title />
      </div>
      <div className="item-wrap">
        <div className="left">
          <div className="bubble">
            <p>탐험을 떠나기 위해선<br />
              든든히 준비해야 해!</p>
          </div>
          <div className="character">
            <img src={`${process.env.PUBLIC_URL}/images/catskill.png`} alt="탐험 고양이" />
          </div>

        </div>
        <div className="right">
          <div className="icon-list">
            {selectedIcons.map(({ name, label }) => {
              const Icon = Icons[name];
              if (!Icon) return null;
              return (
                <div key={name} className="icon-item">
                  <Icon className="w-10 h-10" />
                  <p>{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skill;