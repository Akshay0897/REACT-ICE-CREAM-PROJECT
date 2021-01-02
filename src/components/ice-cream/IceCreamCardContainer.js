import React from 'react';

export default function IceCreamCardContainer({ children }) {
  return (
    <ul className="container">
      {React.Children.map(children, card => (
        <li>{card}</li>
      ))}
    </ul>
  );
}
