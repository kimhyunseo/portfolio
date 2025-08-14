import data from '../json/practical.json';
import { Icons } from '../svg/index';

const Practical = () => {
  return (
    <div className='practical'>
      <div className='title'>
        <img src={`${process.env.PUBLIC_URL}/images/practical.png`} />
      </div>
      <ul className='item-wrap'>
        {data.map(({ title, description, icons, image }, idx) => {
          return (
            <li className="item" key={idx}>
              <div className='top'>
                <div className="txt-wrap">
                  <p>{title}</p>
                  <ul>
                    {icons.map((icon) => {
                      const IconComponent = Icons[icon.toLowerCase()];
                      return (
                        <li key={icon}>
                          {IconComponent ? <IconComponent /> : icon}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <img src={`../images/${image}`} alt={title} />
              </div>
              <div className='bottom'>
                <p>{description}</p>
              </div>
            </li>
          )
        })}
      </ul>

    </div>
  );
};

export default Practical;