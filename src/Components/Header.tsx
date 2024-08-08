import { useEffect, useState } from 'react';
import { useGlobal } from '../context/GlobalContext';
import '../CSS/Header.css';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  headerTitle: string;
  headerLeftButton: string;
  headerRightButton: string;
  headerRight2Button: string;
}

const Header: React.FC<HeaderProps> = ({ headerTitle, headerLeftButton, headerRightButton, headerRight2Button }) => {
  const { pathStackOfProposalView, setPathStackOfProposalView, setPathText, setOldFatherID, setFatherID, fatherID } = useGlobal();
  const [ tryToReturnProposal, setTryToreturnProposal ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    returnProposal();
  }, [tryToReturnProposal])

  const buildPath = (pathStack: { path: { id: number; title: string; }[] }) => {
    setPathText(pathStack.path.map(item => item.title).join('/'));
  };

  const returnProposal = () => {
    const newPath = pathStackOfProposalView.path;
    setFatherID(newPath.length > 0 ? newPath[newPath.length - 1]?.id : -1);
    setOldFatherID(newPath.length > 1 ? newPath[newPath.length - 2]?.id : 0);
    buildPath({ path: newPath });
  };


  const handleLeftButtonClick = () => {
    setPathStackOfProposalView({ path: pathStackOfProposalView.path.slice(0, -1) })
    setTryToreturnProposal(!tryToReturnProposal);
    if(fatherID === pathStackOfProposalView.path.map(item => item.id)[0]) {
      setFatherID(0);
      navigate("/home");
    }
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
