import { useAuth } from '../context/AuthContext';
import { useGlobal } from '../context/GlobalContext';
import Header from "../Components/Header";
import '../CSS/HomePage.css';
import GetProposalCards from '../Components/CardsView';

function HomePage() {
  const { token } = useAuth(); // se usará para navegar entre proposals

  return (
    <div>
      <Header headerTitle="Proposal" headerLeftButton='To Do' headerRightButton='Manifesto' headerRight2Button='Questions'/>
      //subheader
      <div className="home-page">
        <GetProposalCards />
      </div>
    </div>

  );
};

export default HomePage;