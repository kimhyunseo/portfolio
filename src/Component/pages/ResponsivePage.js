import React from 'react';

const ResponsivePage = ({ page }) => {
  return (
    <div className='responsive'>

       <div className='top'>
          <h2>반응형 디자인</h2>
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
        <div className='img-wrap'>

              <img src={`${process.env.PUBLIC_URL}/images/${page.img}.png`} alt={page.title} />

        </div>
      </div>

    </div>
  );
};

export default ResponsivePage;