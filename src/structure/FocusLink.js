import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function FocusLink({ to, children, activeClassName, ...props }) {
  const newTo =
    typeof to === 'string'
      ? { pathname: to , state: { focus: true } }
      : {
          ...to,
          state: to.state ? { ...to.state, focus: true } : { focus: true },
        };

  return activeClassName ? (
    <NavLink to={newTo} {...props}>{children} </NavLink>
  ) : (
    <Link to={newTo} {...props}>{children} </Link>
  );
}
