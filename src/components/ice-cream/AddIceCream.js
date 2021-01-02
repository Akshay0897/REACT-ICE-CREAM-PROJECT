import React, { useEffect, useState } from 'react';
import { getIceCream, postMenuItem } from '../../data/iceCreamData';
import Main from '../../structure/Main';
import { useIsMountedRef } from '../hooks/useIsMounted';
import IceCream from './IceCream';

// /menu-items/add?iceCreamId=6

export default function AddIceCream({ history, location }) {
  const [iceCream, setIceCream] = useState({});

  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    getIceCream(location.search.split('=')[1])
      .then(item => {
        if (isMountedRef) {
          console.log(item);
          setIceCream(item);
        }
      })
      .catch(err => {
        if (err.response.status === 404 && isMountedRef) {
          history.replace('/', { focus: true });
        }
      });
  }, [isMountedRef]);

  const onSubmitHandler = menuItem => {
    postMenuItem(menuItem).then(() => history.push('/', { focus: true }));
  };

  return (
    <Main headingText="Add some fucking icecream">
      {iceCream.id && (
        <IceCream iceCream={iceCream} onSubmit={onSubmitHandler} />
      )}
    </Main>
  );
}
