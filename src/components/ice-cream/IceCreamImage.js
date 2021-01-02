import React from 'react'
import PropTypes from 'prop-types';

export default function IceCreamImage({ iceCreamId }) {
    
    IceCreamImage.propTypes = {
        iceCreamId: PropTypes.number.isRequired,
      };

    return (
        iceCreamId != null && (
          <img
            src={`${
              process.env.PUBLIC_URL
            }/ice-cream-images/ice-cream-${iceCreamId.toString()}.svg`}
            alt=""
          />
        )
      );
}
