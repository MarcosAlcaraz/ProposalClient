import React from 'react';
import '../CSS/CardsView.css';

interface CardViewProps {
  title: string;
  description: string;
  color: string;
}

const CardView: React.FC<CardViewProps> = ({ title, description, color }) => {
  return (
    <div className="card-view" style={{backgroundColor: color}}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default CardView;
