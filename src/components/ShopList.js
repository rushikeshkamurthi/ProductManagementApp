import React from 'react';

export default function ShopList({shops, onSelect}) {
  return (
    <div className="list-container">
      {shops.map(shop => (
        <div key={shop.id} className="list-item" onClick={() => onSelect(shop)}>
          {shop.name}
        </div>
      ))}
    </div>
  );
}
