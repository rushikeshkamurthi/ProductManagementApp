import React from 'react';
export default function Header({user, onLogout}) {
  return (
    <header className="header">
      <h1>Dashboard</h1>
      <div className="user-info">
        <span>{user?.email}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}
