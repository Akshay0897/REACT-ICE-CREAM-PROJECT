import React, { useState, useEffect } from 'react';
import { getIceCreams } from '../../data/iceCreamData';
import Main from '../../structure/Main';
import { useIsMountedRef } from '../hooks/useIsMounted';
import IceCreamCard from './IceCreamCard';
import IceCreamCardContainer from './IceCreamCardContainer';

export default function IceCreams({ history }) {
  const [iceCreams, seticeCreams] = useState([]);
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    getIceCreams().then(icecreams => {
      if (isMountedRef) {
        seticeCreams(icecreams);
      }
    });
  }, []);

  useEffect(() => {
    console.log(iceCreams);
  }, [iceCreams]);

  return (
    <div>
      <Main headingText="Choose your iceCream and enjoy !">
        <IceCreamCardContainer>
          {iceCreams.map(({ id, name }) => {
            return (
              <IceCreamCard
                key={id.toString()}
                iceCreamId={id}
                heading={name}
                history={history}
                to={{pathname : `/ice-creams/add`, search: `?iceCreamId=${id.toString()}` }}
              />
            );
          })}
        </IceCreamCardContainer>
      </Main>
    </div>
  );
}
