import { useAuth } from '../context/AuthContext';
import { useGlobal } from '../context/GlobalContext';
import Header from "../Components/Header";
import CardView from "../Components/CardView";
import '../CSS/HomePage.css';
import { useState } from 'react';

function HomePage() {
  const { setHeaderTitle } = useGlobal();
  const { token } = useAuth(); // se usará para navegar entre proposals
  const defaultMainProposalViewData = {
    "is_card": true,
    // path
    "current_proposals_data": undefined,
    "current_id_of_selected_proposal": undefined,
    "current_id_of_parent_selected_data": undefined,
    "proposal_with_multiselection": [], // [Parent, child], [Parent, Child], ... to n
  }
  const [mainProposalViewData, setMainProposalViewData] = useState(defaultMainProposalViewData);


  setHeaderTitle("Proposal");

  // Ejemplo de datos para las tarjetas
  const cards = [
    { title: "Card 1", description: "This is the first card." },
    { title: "Card 2", description: "This is the second card." },
    { title: "Card 3", description: "This is the third card." },
    // Añade más tarjetas según sea necesario
  ];

  return (
    <div>
      <Header />
      <div className="home-page">
        <div className="card-grid">
          {cards.map((card, index) => (
            <CardView key={index} title={card.title} description={card.description} />
          ))}
        </div>
      </div>yy
    </div>

  );
};

export default HomePage;


// NOTES

{/* <div>
      <h1>Some Component</h1>
      <p>Global String: {globalString}</p>
      <p>Global Array: {globalArray.join(', ')}</p>
      <button onClick={() => setGlobalString('new string')}>Change String</button>
      <button onClick={addItemToArray}>Add Item to Array</button>
    </div> */}
