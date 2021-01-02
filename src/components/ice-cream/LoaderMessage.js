import React from 'react';

export default function LoaderMessage({ loadingMessage, isLoading }) {
  return isLoading ? <p className="loading">{ loadingMessage }</p> : null;
}
