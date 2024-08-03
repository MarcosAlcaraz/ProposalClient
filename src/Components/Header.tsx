import { useGlobal } from '../context/GlobalContext';
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
  const { pathStackOfProposalView, setPathStackOfProposalView, setPathText } = useGlobal();
  const navigate = useNavigate();

  const buildPath = (pathStack: { path: { id: number; title: string; }[] }) => {
    setPathText(pathStack.path.map(item => item.title).join('/'));
  };

  const handleLeftButtonClick = () => {
    setPathStackOfProposalView({path: pathStackOfProposalView.path.slice(0, -1)})
    buildPath({path: pathStackOfProposalView.path.slice(0, -1)}); // HERE BUILD DELETE LAST ROUTE
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
