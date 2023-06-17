import React from 'react';
import './_loader.scss';

export function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner"></div>
    </div>
  )
}
