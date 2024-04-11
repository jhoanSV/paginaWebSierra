import React from 'react';
import './_Loader.scss';

export function Loader() {
  return (
    <div className="loader-overlay">
        <div className="loader-spinner"></div>
    </div>
  )
}