import React, { useEffect, useState } from 'react';
import getProposalCards from '../Api/getProposalCards';
import '../CSS/CardsView.css'
import CardView from './CardView';

interface Card {
  id: number;
  title: string;
  color: string;
  categories: {
    main: { 
      is_numerated: boolean;
      items: Array<{ title: string }>;
    };
  };
}

const GetProposalCards: React.FC = () => {
  const [proposalData, setProposalData] = useState<Array<{ id: number, title: string; color: string; is_numerated: boolean; childrenTitles: string[] }>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cards: Card[] = await getProposalCards();

        const data = cards.map((card) => ({
          id: card.id,
          title: card.title,
          color: card.color,
          is_numerated: card.categories.main.is_numerated,
          childrenTitles: card.categories.main.items.map(item => `- ${item.title}`),
        }));

        setProposalData(data);
      } catch (error) {
        console.error('Error fetching data:', error); // Log más específico del error
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card-grid" >
      {error && <p>{error}</p>}
      {proposalData.map((card, index) => (
        <CardView key={index} title={card.title} color={card.color} is_numerated ={card.is_numerated}childrenTitles={card.childrenTitles}/>
      ))}
    </div>
  );
};

export default GetProposalCards;
