import './HomePage.css';

// Create Button Component
function CreateButton() {
  const handleCreateClick = () => {
    console.log('Create button clicked');
    // Add logic to create new item
  };
  return (
    <button className="create-button" onClick={handleCreateClick}>
      +
    </button>
  );
}

export default CreateButton;