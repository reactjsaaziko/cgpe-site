import React from 'react';

const LoadingState = ({ 
    message = "Loading plans...",
    size = "medium" // small, medium, large
}) => {
    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return {
                    spinner: "h-4 w-4",
                    text: "text-sm",
                    container: "py-4"
                };
            case 'large':
                return {
                    spinner: "h-12 w-12",
                    text: "text-lg",
                    container: "py-12"
                };
            default: // medium
                return {
                    spinner: "h-8 w-8",
                    text: "text-base",
                    container: "py-8"
                };
        }
    };

    const styles = getSizeStyles();

    return (
        <div className={`text-center ${styles.container}`}>
            <div className={`animate-spin rounded-full ${styles.spinner} border-b-2 border-blue-600 mx-auto`}></div>
            <p className={`mt-2 text-gray-600 ${styles.text}`}>{message}</p>
        </div>
    );
};

export default LoadingState;
