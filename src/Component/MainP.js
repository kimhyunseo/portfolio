import { ReactComponent as Title } from "../svg/title.svg";
import data from '../json/mainprojectlist.json';
import { Icons } from '../svg/index';

const MainP = () => {
  return (
    <div className='main-project'>
      <div className='title'>
        <h3>MAIN PROJECT</h3>
        <Title />
      </div>
      <ul className="item-wrap">

        {data.map(({ title, description, icons, image }, idx) => {
          return (
            <li className="item" key={idx}>
              <div className="left">
                <img src={`../images/${image}`} alt={title} />
              </div>
              <div className="right">
                <p>{title}</p>
                <p>{description}</p>
                <ul className="icon-list">
                  {icons.map((icon) => {
                    const IconComponent = Icons[icon.toLowerCase()];
                    return (
                      <li key={icon}>
                        {IconComponent ? <IconComponent/> : icon}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default MainP;