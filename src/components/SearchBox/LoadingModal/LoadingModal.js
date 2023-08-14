import React from 'react';
import './LoadingModal.css';
import loading from '../../../assets/loading.gif';

const LoadingModal = () => {
    return (
        <div className="loading-modal">
            <img src={loading} alt="loading" />
        </div>
    );
}

export default LoadingModal;
