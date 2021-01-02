import React, { useState, useEffect } from 'react';
import { getMenu } from '../../data/iceCreamData';
import propTypes from 'prop-types';
import Main from '../../structure/Main';
import IceCreamCard from '../ice-cream/IceCreamCard';
import IceCreamCardContainer from './IceCreamCardContainer';
import LoaderMessage from './LoaderMessage';

export default function Menu({ history }) {
  Menu.propTypes = {
    history: propTypes.shape({
      push: propTypes.func.isRequired,
    }),
  };

  const [menu, setmenu] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    //setting this var because sometimes it tries to do like
    //setmenu even after component gets unmountes
    let isMounted = true;
    getMenu().then(data => {
      if (isMounted) {
        console.log(data);
        setmenu(data);
        setisLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <React.Fragment>
      <LoaderMessage loadingMessage="loading menu...." isLoading={isLoading}></LoaderMessage>
      <Main headingText="Rock your test buds with one of these ">
        <IceCreamCardContainer>
          {menu.length > 0
            ? menu.map(
                ({ id, iceCream, price, description, inStock, quantity }) => {
                  return (
                    <IceCreamCard
                      key={id.toString()}
                      to={`/menu-items/${id.toString()}`}
                      iceCreamId={iceCream.id}
                      heading={iceCream.name}
                      history={history}
                    >
                      <div className="content card-content">
                        <p className="price">{`$${price.toFixed(2)}`}</p>
                        <p className={`stock${inStock ? '' : 'out'}`}>
                          {inStock
                            ? `${quantity} in stock`
                            : 'Currently out of stock'}
                        </p>
                        <p className="description">{description}</p>
                      </div>
                    </IceCreamCard>
                  );
                }
              )
            : ''}
        </IceCreamCardContainer>
      </Main>
    </React.Fragment>
  );
}
