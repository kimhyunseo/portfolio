import { Icons } from '../../svg/index';

const CoverPage = ({ page }) => (
  <div className="project-cover">
    <div className="left">
      <div className="top">
        <div className='img-wrap'>
          <img src={`${process.env.PUBLIC_URL}/images/${page.logo}.png`} alt={page.title} />
        </div>
        {page.description && <p>{page.description}</p>}
        <div className="project-container">
          {page.date && <div className="project-item"><span className="label">Date</span><span className="content">{page.date}</span></div>}
          {page.ui_design && <div className="project-item"><span className="label">Ui design</span><span className="content">{page.ui_design}</span></div>}
          {page.layout && <div className="project-item"><span className="label">Layout</span><span className="content">{page.layout}</span></div>}
          {page.type && <div className="project-item"><span className="label">Type</span><span className="content">{page.type}</span></div>}
          {page.roles && (
            <div className="project-item">
              <span className="label">Role</span>
              <ul>{page.roles.map((r) => <li key={r}>- {r}</li>)}</ul>
            </div>
          )}
        </div>
      </div>
      <div className='middle'>
        <div className='img-wrap'>
          <img src={`${process.env.PUBLIC_URL}/images/${page.img}.png`} alt={page.title} />
        </div>

      </div>
      <div className="bottom">
        <ul className="icon-list">
          {page.icons?.map((icon) => {
            const IconComponent = Icons[icon.toLowerCase()];
            return <li key={icon}>{IconComponent ? <IconComponent /> : icon}</li>;
          })}
        </ul>
        <ul className='libraries'>
          {page.libraries?.map((li, idx) => <li key={idx}>{li}</li>)}
        </ul>
      </div>
    </div>
    <div className='right'>
      <div className='img-wrap'>
        <img src={`${process.env.PUBLIC_URL}/images/${page.img}.png`} alt={page.title} />
      </div>
    </div>
    <div className='btn-wrap'>
      {Array.isArray(page.btnwrap) &&
  page.btnwrap.map((item, idx) => (
    <a
      key={idx}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="btn"
      style={{ backgroundColor: item.background, color: item.color }}
    >
      {item.text}
    </a>
  ))
}
    </div>
  </div>
);

export default CoverPage;