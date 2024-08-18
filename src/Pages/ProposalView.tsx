import { useEffect, useState, useRef } from "react";
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
    const { setPathStackOfProposalView, pathText, setPathText, pathStackOfProposalView, fatherID, setFatherID, oldFatherID, setOldFatherID, multiSelectionArray, setMultiSelectionArray } = useGlobal();
    const [fatherData, setfatherData] = useState<Proposal[]>([]);   // Es donde se almacena el padre y sus hijos (Todos los datos de la proposal)
    const [selectedID, setSelectedID] = useState(fatherID);
    const [error, setError] = useState<string | null>(null);
    const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const menuRef = useRef(null);
    const [isMultiselectionEnabled, setIsMultiselectionEnabled] = useState(false);
    const [proposalIDWithContextMenuOpen, setProposalIDWithContextMenuOpen] = useState(-1);

    useEffect(() => {
        if (isMultiselectionEnabled === false) {
            setMultiSelectionArray([]);
        }
    }, []);

    useEffect(() => {
        fetchData();
        buildPathText(pathStackOfProposalView);
    }, [fatherID]);

    useEffect(() => {
        if (isContextMenuVisible === false) {
            setProposalIDWithContextMenuOpen(-1);
        }
    }, [isContextMenuVisible]);

    const switchIsContextMenuVisible = (proposalID: number) => {
        setProposalIDWithContextMenuOpen(proposalID); // Define que ese proposal es el que ha abierto el menú contextual
        setIsContextMenuVisible(!isContextMenuVisible); // Alterna la visibilidad del menú
    };

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

    const handleSetChildAsFatherButtonClick = (childID: number, childTitle: string, GrandSonID: number) => {
        setOldFatherID(fatherID);
        setFatherID(childID);
        setSelectedID(GrandSonID);
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

    const renderGrandSon = (child: CategoryItem) => {
        if (child.categories.main.is_numerated) {
            return (<ol className="children-ordered-item-list">
                {child.categories.main.items.map((grandSon, index) => (
                    <div style={{ display: "flex", marginTop: 10, marginLeft: 20 }}>
                        <li key={index}></li>
                        <div className="childOfChild" onClick={() => handleSetChildAsFatherButtonClick(child.id, child.title, grandSon.id)} style={{
                            backgroundColor: multiSelectionArray.includes(grandSon.id) ? '#B85EFF' : 'white'
                        }}>
                            <p>{grandSon.title}</p>
                            <button className="top-right-button" onClick={(e) => {
                                e.stopPropagation();
                                if (isMultiselectionEnabled) {
                                    addOrRemoveProposalIntoMultiselectArray(grandSon.id);
                                } else {
                                    setMenuPosition({ top: e.clientY, left: e.clientX });
                                    switchIsContextMenuVisible(grandSon.id);
                                }
                            }}>{isMultiselectionEnabled ? (multiSelectionArray.includes(grandSon.id) ? '✔' : '☐') : '...'}</button>
                        </div>
                    </div>
                ))}
            </ol>)
        } else {
            return (
                <ul className="children-unordered-item-list">
                    {child.categories.main.items.map((grandSon, index) => (
                        <div>
                            <li key={index}></li>
                            <div className="childOfChild" onClick={() => handleChildClick(child.id)} style={{
                                backgroundColor: multiSelectionArray.includes(grandSon.id) ? '#B85EFF' : 'white'
                            }}>
                                <p>{grandSon.title}</p>
                                <button className="top-right-button" onClick={(e) => {
                                    e.stopPropagation();
                                    if (isMultiselectionEnabled) {
                                        addOrRemoveProposalIntoMultiselectArray(grandSon.id);
                                    } else {
                                        setMenuPosition({ top: e.clientY, left: e.clientX });
                                        switchIsContextMenuVisible(grandSon.id);
                                    }
                                }}>{isMultiselectionEnabled ? (multiSelectionArray.includes(grandSon.id) ? '✔' : '☐') : '...'}</button>
                            </div>
                        </div>
                    ))}
                </ul>
            )
        }
    };

    // Context Menu Options
    const multiSelectClick = () => {
        setIsMultiselectionEnabled(true);
        addOrRemoveProposalIntoMultiselectArray(proposalIDWithContextMenuOpen); // Añade el primer elemento
    };

    const addOrRemoveProposalIntoMultiselectArray = (proposalToAddOrRemove: number) => { // Recibe el ID de los proposals que se estarán añadiendo al array
        setMultiSelectionArray(multiSelectionArray => {
            if (multiSelectionArray.includes(proposalToAddOrRemove)) {
                return multiSelectionArray.filter(id => id !== proposalToAddOrRemove);  // Si el ID ya existe, lo elimina
            } else {
                return [...multiSelectionArray, proposalToAddOrRemove];                 // Si el ID no existe, lo agrega al array
            }
        });

        // Colorear father, child or grandSon si está seleccionado 
        // Ocultar Botónes de más opciones de cada proposal " ... "
    };

    // DELETE TEST
    useEffect(() => {
        console.log(multiSelectionArray);
    }, [multiSelectionArray])

    const renderChild = (child: CategoryItem) => {
        if (selectedID === child.id) {
            return (
                <div className="selectedChildrenContainer">
                    <div className="selectedChildren" onClick={() => handleChildClick(-1)} style={{
                        backgroundColor: multiSelectionArray.includes(child.id) ? '#B85EFF' : '#CEA9FF'
                    }}>
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
                            <div className="selectedChildrenBottom-Right">
                                <button className="right-button" onClick={(e) => {
                                    e.stopPropagation();
                                    // Call function
                                }}>to-dos</button>
                                <button className="right-button" onClick={(e) => {
                                    e.stopPropagation();
                                    // Call function
                                }}>main</button>
                                <button className="right-button" onClick={(e) => {
                                    e.stopPropagation();
                                    // Call function
                                }}>recompilation</button>
                                <button className="right-button" onClick={(e) => {
                                    e.stopPropagation();
                                    // Call function
                                }}>...</button>
                            </div>
                        </div>
                        <div className="selectedChildrenRightCenter">
                            <button className="selectedChildrenCenter-right-button" onClick={(e) => {
                                e.stopPropagation();
                                if (isMultiselectionEnabled) {
                                    addOrRemoveProposalIntoMultiselectArray(child.id);
                                } else {
                                    setMenuPosition({ top: e.clientY, left: e.clientX });
                                    switchIsContextMenuVisible(child.id);
                                }
                            }}>{isMultiselectionEnabled ? (multiSelectionArray.includes(child.id) ? '✔' : '☐') : '...'}</button>
                        </div>
                    </div>
                    <div className="childOfChildContainer">
                        {renderGrandSon(child)}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="children" onClick={() => handleChildClick(child.id)} style={{
                    backgroundColor: multiSelectionArray.includes(child.id) ? '#B85EFF' : "white"
                }}>
                    <p>{child.title}</p>
                    <button className="top-right-button" onClick={(e) => {
                        e.stopPropagation();
                        if (isMultiselectionEnabled) {
                            addOrRemoveProposalIntoMultiselectArray(child.id);
                        } else {
                            setMenuPosition({ top: e.clientY, left: e.clientX });
                            switchIsContextMenuVisible(child.id);
                        }
                    }}>{isMultiselectionEnabled ? (multiSelectionArray.includes(child.id) ? '✔' : '☐') : '...'}</button>
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

    const proposalContextMenu = () => {
        return (
            <div ref={menuRef} className="context-menu" style={{ top: menuPosition.top, left: menuPosition.left - 150 }} onClick={(e) => e.stopPropagation()}>
                <ul>
                    {!isMultiselectionEnabled && (
                        <li onClick={() => { setIsContextMenuVisible(!isContextMenuVisible) }}>Make as To Do</li>
                    )}
                    <li onClick={() => { setIsContextMenuVisible(!isContextMenuVisible) }}>Move</li>
                    <li onClick={() => { setIsContextMenuVisible(!isContextMenuVisible) }}>Share parent-ship</li>
                    <li onClick={() => { setIsContextMenuVisible(!isContextMenuVisible) }}>Mark as done</li>
                    <li onClick={() => { setIsContextMenuVisible(!isContextMenuVisible) }}>Archive</li>
                    {!isMultiselectionEnabled && (
                        <li onClick={() => { setIsContextMenuVisible(!isContextMenuVisible); multiSelectClick() }}>Multi-selection</li>
                    )}
                </ul>
            </div>
        );
    };

    return (
        <div className="main-container" onClick={() => { setIsContextMenuVisible(false) }}>
            <Header headerTitle={pathText} headerLeftButton="Back" headerRightButton="Manifesto" headerRight2Button="Asks" />
            <div className="Proposal Container">
                {error ? (
                    <div>{error}</div>
                ) : (
                    <div className="father-container">
                        {fatherData.map((father) => (
                            <div className="father" key={father.id} style={{
                                backgroundColor: multiSelectionArray.includes(father.id) ? '#B85EFF' : '#CEA9FF'
                            }}>
                                <div className="father-header">
                                    <h2 className="father-title">{father.title}</h2>
                                    <button className="top-right-button" onClick={(e) => {
                                        e.stopPropagation(); // Evita que el clic cierre el menú si se maneja en otro lugar
                                        if (isMultiselectionEnabled) {
                                            addOrRemoveProposalIntoMultiselectArray(father.id);
                                        } else {
                                            setMenuPosition({ top: e.clientY, left: e.clientX });
                                            switchIsContextMenuVisible(father.id);
                                        }
                                    }}>{isMultiselectionEnabled ? (multiSelectionArray.includes(father.id) ? '✔' : '☐') : '...'}</button>
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
            {isContextMenuVisible && (
                proposalContextMenu()
            )}
            {isMultiselectionEnabled && (
                <div className="bottom-right-buttons">
                    <button className="unselect-all-button">Unselect all</button>
                    <button className="options-button" onClick={(e) => {
                        e.stopPropagation();
                        setMenuPosition({ top: e.clientY - 200, left: e.clientX });
                        setIsContextMenuVisible(!isContextMenuVisible);
                    }} >Options</button>
                </div>
            )}
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