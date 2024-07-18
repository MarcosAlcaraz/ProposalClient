import '../CSS/Header.css';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../context/GlobalContext';

function Header() {
  const { headerTitle } = useGlobal();
  const navigate = useNavigate();
  
  const handleLeftButtonClick = () => {
    navigate("/home");
  };

  const handleRightButtonClick = () => {
    navigate("/home");
  };

  const handleRight2ButtonClick = () => {
    navigate("/home");
  };

  return (
    <div className="app">
      <header className="header">
        <button onClick={handleLeftButtonClick}>Izquierdo</button>
        <h1>{headerTitle}</h1>
        <div className="right-buttons">
          <button onClick={handleRightButtonClick}>Derecho 1</button>
          <button onClick={handleRight2ButtonClick}>Derecho 2</button>
        </div>
      </header>
    </div>
  );
}

export default Header;
