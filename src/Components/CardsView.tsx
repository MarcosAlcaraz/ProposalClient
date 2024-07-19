import React, { useEffect, useState } from 'react';
import getProposalCards from '../Api/proposals';
import '../CSS/CardsView.css'
import CardView from './CardView';

interface Card {
  id: number;
  title: string;
  description: string;
  is_card?: boolean;
  color?: string;
  categories?: {
    main: {
      is_numerated: boolean;
      items: Array<{ id: number; title: string; description: string; proposal_parent_id: number }>;
    };
    recompilation: {
      is_numerated: boolean;
      items: Array<{ id: number; title: string; description: string }>;
    };
    miscellaneous: {
      items: Array<{ id: number; title: string; description: string }>;
    };
    done: {
      is_numerated: boolean;
      items: Array<{ id: number; title: string; description: string }>;
    };
    archived: {
      items: Array<{ id: number; title: string; description: string }>;
    };
    to_dos: {
      is_numerated: boolean;
      items: Array<{ id: number; title: string; description: string }>;
    };
  };
}

const GetProposalCards: React.FC = () => {
  const [proposalData, setProposalData] = useState<Array<{ title: string; description: string; color: string}>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cards: Card[] = await getProposalCards();
        const data = cards.map((card: any) => ({
          title: card.title,
          description: card.description,
          color: card.color,
        }));
        setProposalData(data);
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card-grid" >
      {error && <p>{error}</p>}
      {proposalData.map((card, index) => (
        <CardView key={index} title={card.title} description={card.description} color={card.color}/>
      ))}
    </div>
  );
};

export default GetProposalCards;
