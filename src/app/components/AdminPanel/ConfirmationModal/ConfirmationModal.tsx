/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useEffect } from 'react';
import classes from './ConfirmationModal.module.css';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    message: string;
    showCancelButton?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    message,
    showCancelButton = true,
}) => {
    const [isClosing, setIsClosing] = useState(false);
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setShowModal(true);
        } else if (!isOpen && !isClosing) {
            setTimeout(() => setShowModal(false), 300); // Matches animation duration
        }
    }, [isOpen, isClosing]);

    if (!showModal) return null;

    const handleOnClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose(); // Fire after animation
            setIsClosing(false);
            setShowModal(false);
        }, 300); // Delay matches animation duration
    };

    const handleOnConfirm = () => {
        onConfirm && onConfirm();
        handleOnClose();
    };
    
    return (
        <div
            className={`${classes.modalContainer} ${
                !isOpen && isClosing ? classes.hidden : ''
            }`}
        >
            {/* Overlay with fade effect */}
            <div
                className={`${classes.overlay} ${
                    isClosing ? classes.overlayClosing : ''
                }`}
                onClick={handleOnClose}
            />
            
            {/* Modal Content with slide-up/down animation */}
            <div
                className={`${classes.modal} ${
                    isClosing ? classes.modalClosing : ''
                }`}
            >
                <div className={classes.modalHeader}>Confirmation</div>
                <div className={classes.modalBody}>
                    <p>{message}</p>
                </div>
                <div className={classes.modalFooter}>
                    {showCancelButton && (
                        <button
                            onClick={handleOnClose}
                            className={`${classes.button} ${classes.buttonCancel}`}
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        onClick={handleOnConfirm}
                        className={`${classes.button} ${classes.buttonConfirm}`}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
