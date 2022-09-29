import React from 'react';
import spinner from './spinner.svg';
import './LoadingSpinner.css';

function LoadingSpinner() {
    return (
        <div className="loading-container"><img src={spinner} alt="Loading spinner"/><p className="text-center w-100">Attendere...</p></div>
    );
}

export default LoadingSpinner;