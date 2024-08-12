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

function ProposalView() {
    const { setPathStackOfProposalView, pathText, setPathText, pathStackOfProposalView, fatherID, setFatherID, oldFatherID, setOldFatherID } = useGlobal();
    const [fatherData, setfatherData] = useState<Proposal[]>([]);   // Es donde se almacena el padre y sus hijos (Todos los datos de la proposal)
    const [selectedID, setSelectedID] = useState(fatherID);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
        buildPathText(pathStackOfProposalView);
    }, [fatherID]);

    const fetchData = async () => {
        try {
            const response = await getProposal(oldFatherID, fatherID);
            const data: Proposal = await response;
            setfatherData([data]);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data');
        }
    };

    const buildPathText = (pathStack: { path: { id: number; title: string; }[] }) => {
        setPathText(pathStack.path.map(children => children.title).join('/'));
    };

    const handleChildClick = (childID: number) => {
        setSelectedID(childID);
    };

    const handleSetChildAsFatherButtonClick = (childID: number, childTitle: string, childOfChildID: number) => {
        setOldFatherID(fatherID);
        setFatherID(childID);
        setSelectedID(childOfChildID);
        const id = childID;
        const title = childTitle;

        const newPath = {
            path: [
                ...pathStackOfProposalView.path,
                { id, title }
            ]
        };
        setPathStackOfProposalView(newPath);
    };

    const renderChildOfChild = (child: CategoryItem) => {

        if (child.categories.main.is_numerated) {
            return (<ol className="children-ordered-item-list">
                {child.categories.main.items.map((childOfchild, index) => (
                    <div style={{ display: "flex", marginTop: 10, marginLeft: 20 }}>
                        <li key={index}></li>
                        <div className="childrenOfChildren" onClick={() => handleSetChildAsFatherButtonClick(child.id, child.title, childOfchild.id)}>
                            <p>{childOfchild.title}</p>
                            <button className="top-right-button" onClick={(e) => {
                                e.stopPropagation();
                                // Call function
                            }}>...</button>
                        </div>
                    </div>
                ))}
            </ol>)
        } else {
            return (
                <ul className="children-unordered-item-list">
                    {child.categories.main.items.map((childOfchild, index) => (
                        <div>
                            <li key={index}></li>
                            <div className="childrenOfChildren" onClick={() => handleChildClick(child.id)}>
                                <p>{childOfchild.title}</p>
                                <button className="top-right-button">...</button>
                            </div>
                        </div>
                    ))}
                </ul>
            )
        }
    };

    const renderChild = (child: CategoryItem) => {
        if (selectedID === child.id) {
            return (
                <div className="selectedChildrenContainer">
                    <div className="selectedChildren" onClick={() => handleChildClick(-1)}>
                        <div className="selectedChildrenContent">
                            <div className="selectedChildrenTop-left">
                                <p className="selectedChildrenTitle">{child.title}</p>
                                <br />
                                <p className="selectedChildrenDescription">{child.description}</p>
                            </div>
                            <br />
                            <div className="selectedChildrenBottom-left">
                                <button className="selectedChildrenLeft-button" onClick={(e) => {
                                    e.stopPropagation();
                                    // Call function
                                }}>Listado</button>
                                <button className="selectedChildrenLeft-button" onClick={(e) => {
                                    e.stopPropagation();
                                    // Call function
                                }}>Numerado</button>
                            </div>
                        </div>
                        <div className="selectedChildrenRightCenter">
                            <button className="selectedChildrenCenter-right-button" onClick={(e) => {
                                e.stopPropagation();
                                // Call function
                            }}>...</button>
                        </div>
                    </div>
                    <div className="childrenOfChildrenContainer">
                        {renderChildOfChild(child)}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="children" onClick={() => handleChildClick(child.id)}>
                    <p>{child.title}</p>
                    <button className="top-right-button" onClick={(e) => {
                        e.stopPropagation();
                        // Call Proposal Contextual menu
                    }}>...</button>
                </div>
            );
        };
    };

    const renderChildren = (father: Proposal) => {
        if (father.categories.main.is_numerated) {
            return (<ol className="ordered-item-list">
                {father.categories.main.items.map((children, index) => (
                    <div style={{ display: "flex", marginLeft: 80 }}>
                        <li key={index}></li>
                        {renderChild(children)}
                    </div>
                ))}
            </ol>);
        } else {
            return (
                <ol className="unordered-item-list">
                    {father.categories.main.items.map((children, index) => (
                        <div style={{ display: "flex", marginLeft: 80 }}>
                            <li key={index}></li>
                            {renderChild(children)}
                        </div>
                    ))}
                </ol>
            );
        };
    };

    return (
        <div>
            <Header headerTitle={pathText} headerLeftButton="Back" headerRightButton="Manifesto" headerRight2Button="Asks" />

            <div className="Proposal Container">
                {error ? (
                    <div>{error}</div>
                ) : (
                    <div className="father-container">
                        {fatherData.map((father) => (
                            <div className="father" key={father.id}>
                                <div className="father-header">
                                    <h2 className="father-title">{father.title}</h2>
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
            <div className="white-background"></div>
            {fatherData.map((father) => (
                <div className="children-container">
                    {renderChildren(father)}
                </div>
            ))
            }
        </div >
    );
};

export default ProposalView;

{/*     
-----------------------------------------------------------------------------------------------
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