import { PiStarFourFill } from "react-icons/pi";

const DesignSystemPage = ({ page }) => {
  return (
    <div className='design-page'>
      <div className='top'>
        <h2>DESIGN SYSTEM</h2>
        <div
          style={{
            width: "50px",
            height: "5px",
            marginLeft: "2rem",
            backgroundColor: page.line || "#222", // JSON에서 색 받아오기
          }}
        />
      </div>
      <div className='bottom'>
        <div className="item-container">
          <div className="first">
            {page.logo && (<div className='item'>
              <div className="title">
                <PiStarFourFill style={{ fill: page.color }} /><span>LOGO</span>
              </div>
              <div className="contents">
                {Array.isArray(page.logo) ? page.logo.map((r, idx) => (
                  <img key={idx} src={`${process.env.PUBLIC_URL}/images/${r}.png`} alt={r} />
                )) : <img key="1" src={`${process.env.PUBLIC_URL}/images/${page.logo}.png`} alt={page.logo} />
                }
              </div>
            </div>
            )}
            {page.colors && (<div className='item color-item'>
              <div className="title">
                <PiStarFourFill style={{ fill: page.color }} /><span>COLOR</span>
              </div>
              <div className="color-wrap">
                {Array.isArray(page.colors) && page.colors.map((color) => (
                  <div key={color.name} className="color">
                    <span className="w" style={{ backgroundColor: color.value }} />
                    <div className="txt-wrap">
                      <p>{color.name}</p>
                      <p>{color.value}</p>
                    </div>

                  </div>
                ))}
              </div>
            </div>
            )}
          </div>

          <div className="second">
            {
              page.typography && (
                <div className="item">
                  <div className="title">
                    <PiStarFourFill style={{ fill: page.color }} /><span>TYPO</span>
                  </div>
                  <div className="txt-container">
                    <h4 style={{ fontFamily: page.typography?.[1]?.font_family }}>{page.typography?.[1]?.font_family}</h4>
                    <ul className="text-list">
                      {Array.isArray(page.typography) &&
                        page.typography.map((r, idx) => (
                          <li key={idx}>
                            <span style={{ fontFamily: r.font_family, fontSize: r.size }}>{r.text}</span>
                            <span>{r.size}</span>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              )
            }
          </div>
          {page.components && (
            <div className="third">
              {
                page.components && (
                  <div className="item">
                    <div className="title">
                      <PiStarFourFill style={{ fill: page.color }} /><span>COMPONENT</span>
                    </div>
                    <div className="img-wrap">
                      {page.components && <img src={`${process.env.PUBLIC_URL}/images/${page.components}.png`} alt={page.components} />}
                    </div>
                  </div>
                )
              }
            </div>
          )
          }
        </div>

      </div>

    </div >
  );
};

export default DesignSystemPage;