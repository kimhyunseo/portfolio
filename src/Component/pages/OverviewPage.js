import { PiStarFourFill } from "react-icons/pi";

const OverviewPage = ({ page }) => {
  return (
    <div className="overview-page">
      <div className="left">
        <div className='top'>
          <h2>OVERVIEW</h2>
          <div
            style={{
              width: "50px",
              height: "5px",
              marginLeft: "2rem",
              backgroundColor: page.line || "#222", // JSON에서 색 받아오기
            }}
          />
        </div>

        <div className="project-container">
          {page.goal && <div className="project-item"><PiStarFourFill style={{ fill: page.color }} /><span>프로젝트의 목표</span> <p>{page.goal}</p></div>}
          {page.contribution && <div className="project-item"><PiStarFourFill style={{ fill: page.color }} /><span>맡은 역할</span> <p>{page.contribution}</p><p>{page.part}</p></div>}
          {page.roles && (<div className="project-item">
            <PiStarFourFill style={{ fill: page.color }} /><span>{page.text}</span>
            <ul>
              {page.roles.map((r, idx) => <li key={idx}>- {r}</li>)}
            </ul>
          </div>
          )}
        </div>

        <div className='middle'>
          <div className='img-wrap'>
            <img src={`${process.env.PUBLIC_URL}/images/${page.img}2.png`} alt={page.title} />
          </div>

        </div>
      </div>
      <div className="right">
        <div className="img-wrap">
          {page.img && <img src={`${process.env.PUBLIC_URL}/images/${page.img}.png`} alt={page.title} />}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;