import { useEffect, useState } from "react";
import Header from "../Components/Header";
import { useGlobal } from "../context/GlobalContext";
import getProposal from "../api/getProposal";
import '../CSS/ProposalView.css';

interface CategoryItem {
    id: number;
    title: string;
    description: string;
    categories: {
        main: {
            is_numerated: boolean;
            items: CategoryItem[];
        };
        recompilation: {
            is_numerated: boolean;
            items: CategoryItem[];
        };
        miscellaneous: {
            items: CategoryItem[];
        };
        done: {
            is_numerated: boolean;
            items: CategoryItem[];
        };
        archived: {
            items: CategoryItem[];
        };
        to_dos: {
            is_numerated: boolean;
            items: CategoryItem[];
        };
    };
    proposal_parent_id: number;
};

interface Proposal {
    id: number;
    title: string;
    description: string;
    is_card: boolean;
    color: string;
    categories: {
        main: {
            is_numerated: boolean;
            items: CategoryItem[];
        };
        recompilation: {
            is_numerated: boolean;
            items: CategoryItem[];
        };
        miscellaneous: {
            items: CategoryItem[];
        };
        done: {
            is_numerated: boolean;
            items: CategoryItem[];
        };
        archived: {
            items: CategoryItem[];
        };
        to_dos: {
            is_numerated: boolean;
            items: CategoryItem[];
        };
    };
};

const childrenRender = () => {
    return (
        <div></div>
    );
};

function ProposalView() {
    const { pathText, setPathText, pathStackOfProposalView, fatherID } = useGlobal();
    const [proposalData, setProposalData] = useState<Proposal[]>([]);   // Es donde se almacena el padre y sus hijos (Todos los datos de la proposal)
    const [selectedID, setSelectedID] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProposal(fatherID);
                const data: Proposal = await response;
                setProposalData([data]);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            }
        };
        fetchData();
        buildPath(pathStackOfProposalView);
    }, [fatherID]);

    const buildPath = (pathStack: { path: { id: number; title: string; }[] }) => {
        setPathText(pathStack.path.map(item => item.title).join('/'));
    };

    const handleChildrenClick = (childrenID: number) => {
        setSelectedID(childrenID);
    };

    return (
        <div>
            <Header headerTitle={pathText} headerLeftButton="Back" headerRightButton="Manifesto" headerRight2Button="Asks" />
            {/* FATHER */}
            <div>
                {error ? (
                    <div>{error}</div>
                ) : (
                    <div className="father-container">
                        {proposalData.map((proposal) => (
                            <div className="father" key={proposal.id}>
                                <div className="father-header">
                                    <h2 className="father-title">{proposal.title}</h2>
                                    <button className="top-right-button">...</button>
                                </div>
                                <div className="father-body"></div>
                                <div className="father-footer">
                                    <div className="footer-left">
                                        <button className="left-button">Listado</button>
                                        <button className="left-button">Numerado</button>
                                    </div>
                                    <div className="footer-right">
                                        <button className="right-button">to-dos</button>
                                        <button className="right-button">main</button>
                                        <button className="right-button">recompilation</button>
                                        <button className="right-button">...</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* FATHER ENDs */}
            {/* CHILDREN */}
            {proposalData.map((proposal) => (
                <div className="children-container">
                    {proposal.categories.main.is_numerated ? (
                        // WORKSPACE
                        // TODO:
                        // 1. Mostrar Hijos de los hijos
                        // 2. 
                        // 3. 

                        <ol className="ordered-item-list">
                            {proposal.categories.main.items.map((item, index) => (
                                <div style={{ display: "flex", marginLeft: 80 }}>
                                    <li key={index}></li>
                                    {selectedID === item.id ? (
                                        <div className="selectedChildrenContainer">
                                            <div className="selectedChildren" onClick={() => handleChildrenClick(-1)}>
                                                <div className="selectedChildrenContent">
                                                    <div className="selectedChildrenTop-left">
                                                        <p className="selectedChildrenTitle">{item.title}</p>
                                                        <br />
                                                        <p className="selectedChildrenDescription">{item.description}</p>
                                                    </div>
                                                    <br />
                                                    <div className="selectedChildrenBottom-left">
                                                        <button className="selectedChildrenLeft-button">Listado</button>
                                                        <button className="selectedChildrenLeft-button">Numerado</button>
                                                    </div>
                                                    <button className="selectedChildrenCenter-right-button">...</button>
                                                </div>
                                            </div>
                                            <div className="childrenOfChildrenContainer">
                                                {item.categories.main.is_numerated ? (
                                                    <ol className="children-ordered-item-list">
                                                        {item.categories.main.items.map((childrenOfChildren, index) => (
                                                            <div style={{ display: "flex", marginTop: 10, marginLeft: 20}}>
                                                                <li key={index}></li>
                                                                <div className="childrenOfChildren" onClick={() => handleChildrenClick(item.id)}>
                                                                    <p>{childrenOfChildren.title}</p>
                                                                    <button className="top-right-button">...</button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </ol>
                                                ) : (
                                                    <ul className="children-unordered-item-list">
                                                        {item.categories.main.items.map((childrenOfChildren, index) => (
                                                            <div>
                                                                <li key={index}></li>
                                                                <div className="childrenOfChildren" onClick={() => handleChildrenClick(item.id)}>
                                                                    <p>{childrenOfChildren.title}</p>
                                                                    <button className="top-right-button">...</button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>

                                    ) : (
                                        <div className="children" onClick={() => handleChildrenClick(item.id)}>
                                            <p>{item.title}</p>
                                            <button className="top-right-button">...</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </ol>
                        // WORKSPACE

                    ) : (

                        <ol className="unordered-item-list">
                            {proposal.categories.main.items.map((item, index) => (
                                <div style={{ display: "flex", marginLeft: 80 }}>
                                    <li key={index}></li>
                                    {selectedID === item.id ? (
                                        <div className="selectedChildrenContainer">
                                            <div className="selectedChildren" onClick={() => handleChildrenClick(-1)}>
                                                <div className="selectedChildrenContent">
                                                    <div className="selectedChildrenTop-left">
                                                        <p className="selectedChildrenTitle">{item.title}</p>
                                                        <br />
                                                        <p className="selectedChildrenDescription">{item.description}</p>
                                                    </div>
                                                    <br />
                                                    <div className="selectedChildrenBottom-left">
                                                        <button className="selectedChildrenLeft-button">Listado</button>
                                                        <button className="selectedChildrenLeft-button">Numerado</button>
                                                    </div>
                                                    <button className="selectedChildrenCenter-right-button">...</button>
                                                </div>
                                            </div>
                                            <div className="childrenOfChildrenContainer">
                                                <p>CHILDREN OF CHILDREN CONTAINER</p>
                                            </div>
                                        </div>

                                    ) : (
                                        <div className="children" onClick={() => handleChildrenClick(item.id)}>
                                            <p>{item.title}</p>
                                            <button className="top-right-button">...</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </ol>

                    )
                    }
                </div>
            ))
            }
            {/* CHILDREN ENDs */}
        </div >
    );
};

export default ProposalView;

{/*     
-----------------------------------------------------------------------------------------------           
                Proposal Area (DOING)
                    Father area (DOING)
                        PROGRAM Father contextual button 
                            PROGRAM AND Call component "Proposal contextual menu"
                                Show options:
                                {
                                    Make todo
                                    Move
                                    Share Parent-ship
                                    Mark as done
                                    Archived
                                }
                        PROGRAM Father Numerated or non numerated switch
                        PROGRAM Father Categories
                            PROGRAM AND CALL Call Component "Proposal Categories Menu"
                            {
                                to-dos
                                main
                                recompilation
                                more button
                                    miscelaneous
                                    done
                                    archived
                            }          
-----------------------------------------------------------------------------------------------
                    Children Area (DOING)
                        Children VIEW
                            Render Children (DOING)
                                PROGRAM Contextual button
                                    PROGRAM AND Call component "Proposal contextual menu"
                                        Show options:
                                        {
                                            Make todo
                                            Move
                                            Share Parent-ship
                                            Mark as done
                                            Archive
                                        }
                                ONLY IF USER CLICK A PROPOSAL
                                    Show his Description after title
                                    PROGRAM AND Call Component "Proposal Categories Menu"
                                    {
                                        to-dos
                                        main
                                        recompilation
                                        more button
                                            miscelaneous
                                            done
                                            archived
                                    }
                            New Children Button
                                *** Pop-up window ***
_______________________________________________________________________________________________
                Event Area
                    Event header
                    Event Subheader
                    Event column
                        Event component
                            Icon
                            Title
                            Parent title (who owns the event)
                            Event Description
                            Date of event
                            ONLY IF IS THERE &&
                                Comment icon
-----------------------------------------------------------------------------------------------
*/}