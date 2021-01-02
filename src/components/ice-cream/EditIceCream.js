import React, { useEffect, useState } from 'react';
import {
  deleteMenuItem,
  getMenuItem,
  putMenuItem,
} from '../../data/iceCreamData';
import PropTypes from 'prop-types';
import Main from '../../structure/Main';
import { useIsMountedRef } from '../hooks/useIsMounted';
import IceCream from './IceCream';

export default function EditIceCream({ match, history }) {
  EditIceCream.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object.isRequired,
    }),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
    }),
  };

  const [menuItem, setMenuItem] = useState({});

  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    getMenuItem(match.params.menuItemId)
      .then(item => {
        if (isMountedRef) {
          setMenuItem(item);
        }
      })
      .catch(err => {
        if (err.response.status === 404 && isMountedRef) {
          history.replace('/', { focus: true });
        }
      });
  }, [match.params.menuItemId, isMountedRef]);

  const onSubmitHandler = updatedItem => {
    putMenuItem({ id: menuItem.id, ...updatedItem }).then(() => {
      history.push('/', { focus: true });
    });
  };

  const onDeleteHandler = () => {
    deleteMenuItem(match.params.menuItemId).then(() => {
      history.replace('/', { focus: true });
    });
  };

  return (
    <Main headingText="update this beauty">
      {menuItem.id && (
        <IceCream
          {...menuItem}
          onDelete={onDeleteHandler}
          onSubmit={onSubmitHandler}
        />
      )}
    </Main>
  );
}
