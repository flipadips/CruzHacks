import './HomePage.css';

function List({items}) {
  const handleItemClick = (item) => {
  console.log('Item clicked:', item);
  };
  return (
    <div className="list-container">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="list-item"
          onClick={() => handleItemClick(item)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default List;
