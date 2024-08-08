import React from 'react';
import '../CSS/CardView.css';
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from 'react-router-dom';

interface CardViewProps {
  id: number;
  title: string;
  color: string;
  is_numerated: boolean;
  childrenTitles: string[];
}

const CardView: React.FC<CardViewProps> = ({ id, title, color, is_numerated, childrenTitles }) => {
  const navigate = useNavigate();
  const { setFatherID, setPathStackOfProposalView, pathStackOfProposalView } = useGlobal();

  const handleCardViewClick = () => {
    setFatherID(id);
    const newPath = {
      path: [
        ...pathStackOfProposalView.path,
        { id, title }
      ]
    };
    setPathStackOfProposalView(newPath);
    navigate("/ProposalView");
  }

  return (
    // CARD
    <div className="card-view" style={{ backgroundColor: color }} onClick={() => handleCardViewClick()}>
      <h3>{title}</h3>
      {is_numerated ? (
        <ol>
          {childrenTitles.map((childrenTitle, index) => (
            <li key={index}>{childrenTitle}</li>
          ))}
        </ol>
      ) : (
        <ul>
          {childrenTitles.map((childrenTitle, index) => (
            <li key={index}>{childrenTitle}</li>
          ))}
        </ul>
      )}
    </div>
    // CARD ENDs
  );
};

export default CardView;
