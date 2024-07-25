import '../CSS/SubHeader.css';
import { useNavigate } from 'react-router-dom';

interface SubHeaderProps {
  headerButton1Title?: string;
  headerButton2Title?: string;
  headerButton3Title?: string;
  headerButton4Title?: string;

}

const SubHeader: React.FC<SubHeaderProps> = ({
  headerButton1Title = '',
  headerButton2Title = '',
  headerButton3Title = '',
  headerButton4Title = '',
}) => {
  const navigate = useNavigate();

  let showButton1 = false;
  let showButton2 = false;
  let showButton3 = false;
  let showButton4 = false;

  if (headerButton1Title) {
    showButton1 = true;
  }
  if (headerButton2Title) {
    showButton2 = true;
  }
  if (headerButton3Title) {
    showButton3 = true;
  }
  if (headerButton4Title) {
    showButton4 = true;
  }

  const handleButton1Click = () => {
    navigate("/home");
  };

  const handleButton2Click = () => {
    navigate("/home");
  };

  const handleButton3Click = () => {
    navigate("/home");
  };

  const handleButton4Click = () => {
    navigate("/home");
  };

  return (
    <div className="app">
      <header className="subHeader">
        {showButton1 && (
          <button onClick={handleButton1Click}>{headerButton1Title}</button>
        )}
        {showButton2 && (
          <button onClick={handleButton2Click}>{headerButton2Title}</button>
        )}
        {showButton3 && (
          <button onClick={handleButton3Click}>{headerButton3Title}</button>
        )}
        {showButton4 && (
          <button onClick={handleButton4Click}>{headerButton4Title}</button>
        )}
      </header>
    </div>
  );
}

export default SubHeader;
