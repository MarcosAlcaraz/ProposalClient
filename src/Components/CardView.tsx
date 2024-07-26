import React from 'react';
import '../CSS/CardsView.css';

interface CardViewProps {
  title: string;
  color: string;
  is_numerated: boolean;
  childrenTitles: string[];
}

const CardView: React.FC<CardViewProps> = ({ title, color, is_numerated, childrenTitles }) => {
  return (
    <div className="card-view" style={{backgroundColor: color}}>
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
  );
};

export default CardView;
