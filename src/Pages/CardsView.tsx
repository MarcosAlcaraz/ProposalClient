// import { useAuth } from '../context/AuthContext';
// import { useGlobal } from '../context/GlobalContext';
import Header from "../Components/Header";
import GetProposalCards from '../Components/GetProposalCards';
import SubHeader from '../Components/SubHeader';
import NewCardForm from '../Components/NewCardForm';
import { useState } from 'react';

function HomePage() {
  // const { token } = useAuth(); // se usará para navegar entre proposals
  const [visibility, setVisibility] = useState(false)

  const handleNewProposalButtonClick = () => {
    setVisibility(true);
  }

  const handleCloseForm = () => {
    setVisibility(false);
  }

  return (
    <div>
      <Header headerTitle="Proposal" headerLeftButton='To Do' headerRightButton='Manifesto' headerRight2Button='Questions'/>
      <SubHeader
        headerButton1Title="Archived"
        headerButton2Title="Others"
      />
      <div className="home-page">
        <GetProposalCards />
      </div>
      <button className="new-proposal-button" onClick={handleNewProposalButtonClick}>
      New
      </button>
      <NewCardForm stateOfVisibility= {visibility} onClose= {handleCloseForm} />
    </div>
  );
};

export default HomePage;