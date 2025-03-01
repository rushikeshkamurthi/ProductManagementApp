import React from 'react';

export default function AccountList({accounts, onSelect}) {
  return (
    <div className="list-container">
      {accounts.map(account => (
        <div
          key={account.id}
          className="list-item"
          onClick={() => onSelect(account)}>
          {account.name}
        </div>
      ))}
    </div>
  );
}
