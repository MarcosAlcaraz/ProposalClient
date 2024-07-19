  import '../CSS/Header.css';
  import { useNavigate } from 'react-router-dom';
  // import { useGlobal } from '../context/GlobalContext';

  interface HeaderProps {
    headerTitle: string;
    headerLeftButton: string;
    headerRightButton: string;
    headerRight2Button: string;
  }

  const Header: React.FC<HeaderProps> = ({ headerTitle, headerLeftButton, headerRightButton, headerRight2Button }) => {
    // const { headerTitle } = useGlobal();
    // const { headerLeftButton } = useGlobal();
    // const { headerRightButton } = useGlobal();
    // const { headerRight2Button } = useGlobal();
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
          <button onClick={handleLeftButtonClick}>{headerLeftButton}</button>
          <h1>{headerTitle}</h1>
          <div className="right-buttons">
            <button onClick={handleRightButtonClick}>{headerRightButton}</button>
            <button onClick={handleRight2ButtonClick}>{headerRight2Button}</button>
          </div>
        </header>
      </div>
    );
  }

  export default Header;
