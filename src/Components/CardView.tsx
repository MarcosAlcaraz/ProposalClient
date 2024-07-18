import React from 'react';
import '../CSS/CardView.css';

interface CardViewProps {
  title: string;
  description: string;
}

const CardView: React.FC<CardViewProps> = ({ title, description }) => {
  return (
    <div className="card-view">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default CardView;
