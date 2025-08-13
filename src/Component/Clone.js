import data from '../json/clonecoding.json';

const Clone = () => {
  return (
    <div className='clone'>
      <div className='title'>
        <img src={`${process.env.PUBLIC_URL}/images/clonecoding.png`} />
      </div>

      <ul className="item-wrap">

        {data.map(({ title, description, image }, idx) => {
          return (
            <li className="item" key={idx}>
              <img src={`../images/${image}`} alt={title} />
              <div className="txt-wrap">
                <div className='left'>
                  <p>0{idx + 1}</p>
                </div>
                <div className='right'>
                  <p>{title}</p>
                  <p>{description}</p>
                </div>

              </div>
            </li>
          )
        })}
      </ul>

    </div>
  );
};

export default Clone;