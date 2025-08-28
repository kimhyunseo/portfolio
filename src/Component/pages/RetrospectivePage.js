import { BiSolidError } from "react-icons/bi";
import { HiLightBulb } from "react-icons/hi2";
import { IoDocumentText } from "react-icons/io5";
import ReactMarkdown from "react-markdown";

const RetrospectivePage = ({page}) => {
  return (
    <div className='restrospective'>
      <div className='top'>
          <h2>RETROSPECTIVE</h2>
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
        <ul>
            <li><div><BiSolidError />어려웠던 점</div><ReactMarkdown >{page.problem}</ReactMarkdown></li>
            <li><div><HiLightBulb />해결 방법</div><ReactMarkdown>{page.solutions}</ReactMarkdown></li>
            <li><div><IoDocumentText />리펙토링 포인트</div><ReactMarkdown>{page.refactoting}</ReactMarkdown></li>
        </ul>
      </div>

    </div>
  );
};

export default RetrospectivePage;