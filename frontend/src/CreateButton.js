import { useContext } from 'react';
import './HomePage.css';
import { CreateModeContext } from './HomePage.js';

// Create Button Component
function CreateButton() {
  const { isCreateMode, setIsCreateMode } = useContext(CreateModeContext);

  const handleCreateClick = () => {
    console.log('Create button clicked');
    setIsCreateMode(!isCreateMode);
  };
  return (
    <button className="create-button" onClick={handleCreateClick}>
      +
    </button>
  );
}

export default CreateButton;