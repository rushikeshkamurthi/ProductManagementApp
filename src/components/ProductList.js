import React from 'react';

export default function ProductList({products}) {
  return (
    <div className="list-container">
      {products.map(product => (
        <div key={product.id} className="list-item">
          {product.name} - ${product.price}
        </div>
      ))}
    </div>
  );
}
