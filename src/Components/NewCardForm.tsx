import React, { useState } from "react";
import "../CSS/NewCardForm.css"

interface NewCardFormProps {
  stateOfVisibility: boolean;
  onClose: () => void;
}

const NewCardForm: React.FC<NewCardFormProps> = ({ stateOfVisibility, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#000000');
  const [note, setNote] = useState('');

  const handlePost = async () => {
    onClose();
  }

  const handleCancelation = () => {
    onClose();
  }

  if (!stateOfVisibility) {
    return null;
  }

  return (
    <div className="addMedView">
      <div className="whiteBoardAddMed">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>
        <div className="color-picker">
          <input
            type="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <label htmlFor="color">{color}</label>
        </div>
        <p>Optional</p>
        <input
          type="text"
          placeholder="Add an event note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="button-group">
          <button className="cancel-button" onClick={handleCancelation}>
            Cancel
          </button>
          <button className="finish-button" onClick={handlePost}>
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewCardForm;
