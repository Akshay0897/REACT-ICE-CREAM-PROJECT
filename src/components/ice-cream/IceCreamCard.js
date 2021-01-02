import React from 'react';
import { withRouter } from 'react-router-dom';
import FocusLink from '../../structure/FocusLink';
import IceCreamImage from './IceCreamImage';

function IceCreamCard({ children, history, to, iceCreamId, heading }) {
  const onItemClickHandler = () => {
    history.push(to, { focus: true });
  };

  const onLinkClickHandler = e => {
    e.preventDefault();
  };

  return (
    <section className="card" onClick={onItemClickHandler}>
      <div className="image-container">
        <IceCreamImage iceCreamId={iceCreamId} />
      </div>
      <div className="text-container">
        <h3>
          <FocusLink onClick={onLinkClickHandler} to={to}>
            {heading}
          </FocusLink>{' '}
        </h3>
        {children}
      </div>
    </section>
  );
}

export default IceCreamCard;
