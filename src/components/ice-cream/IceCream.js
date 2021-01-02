import React, { useRef, useState, useEffect } from 'react';
import { useIsMountedRef } from '../hooks/useIsMounted';
import useUniqueIds from '../hooks/useUniqueIds';
import useValidations from '../hooks/useValidations';
import ErrorContainer from './ErrorContainer';
import IceCreamImage from './IceCreamImage';
import {
  validateDescription,
  validatePrice,
  validateQuantity,
} from '../../utils/validators';

export default function IceCream({
  children,
  onDelete,
  onSubmit,
  iceCream = {},
  price = 0,
  quantity = 0,
  inStock = true,
  description = '',
}) {
  const [hassubmitted, sethassubmitted] = useState(false);

  const [descriptionId, stockId, quantityId, priceId] = useUniqueIds(4);

  const [internalData, setinternalData] = useState({
    description: '',
    inStock: true,
    quantity: 0.0,
    price: 0.0,
  });

  
  const descError = useValidations(
    internalData.description,
    validateDescription
  );

  const quantityError = useValidations(
    internalData.quantity,
    validateQuantity,
    internalData.inStock
  );

  const priceError = useValidations(internalData.price, validatePrice);

  useEffect(() => {
    setinternalData({
      price: price.toFixed(2),
      inStock,
      quantity: quantity.toString(),
      description,
    });
  }, [price, quantity, inStock, description]);

  const onChangeHandler = e => {
    let newMenuItemData = {
      ...internalData,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    };

    if (e.target.name === 'quantity') {
      newMenuItemData.inStock = e.target.value !== '0';
    }

    if (e.target.name === 'inStock' && !e.target.checked) {
      newMenuItemData.quantity = '0';
    }

    setinternalData(newMenuItemData);
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    sethassubmitted(true);

    const { price, inStock, quantity, description } = internalData;

    if (!descError && !quantityError && !priceError) {
      onSubmit({
        iceCream: { id: iceCream.id },
        price: parseFloat(price),
        inStock: inStock,
        quantity: quantity,
        description: description,
      });
    }
  };

  return (
    <div>
      <div className="form-frame">
        <div className="image-container">
          <IceCreamImage iceCreamId={iceCream.id} />
        </div>
        <div className="form-container">
          <dl>
            <dt>Name :</dt>
            <dd>{iceCream.name}</dd>
          </dl>
          <form onSubmit={onSubmitHandler}>
            <label htmlFor={descriptionId}>
              Description<span area-hidden="true">*</span>
            </label>
            <ErrorContainer errorText={descError} hasSubmitted={hassubmitted}>
              <textarea
                id={descriptionId}
                name="description"
                rows="3"
                onChange={onChangeHandler}
                value={internalData.description}
              />
            </ErrorContainer>
            <label htmlFor={stockId}>In Stock :</label>
            <div className="checkbox-wrapper">
              <input
                id={stockId}
                type="checkbox"
                name="inStock"
                onChange={onChangeHandler}
                checked={internalData.inStock}
              />
              <div className="checkbox-wrapper-checked" />
            </div>
            <label htmlFor={quantityId}>Quantity :</label>
            <ErrorContainer
              errorText={quantityError}
              hasSubmitted={hassubmitted}
            >
              <select
                id={quantityId}
                name="quantity"
                onChange={onChangeHandler}
                value={internalData.quantity}
              >
                <option value="0">0</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
            </ErrorContainer>
            <label htmlFor={priceId}>Price :</label>
            <ErrorContainer errorText={priceError} hasSubmitted={hassubmitted}>
              <input
                id={priceId}
                type="number"
                step="0.01"
                name="price"
                onChange={onChangeHandler}
                value={internalData.price}
              />
            </ErrorContainer>
            <div className="button-container">
              <button className="ok" type="submit">
                Save
              </button>
              { onDelete && <button className="warning" type="button" onClick={onDelete}>
                delete
              </button> }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
