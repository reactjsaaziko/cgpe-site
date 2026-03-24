import React from 'react';

const EmptyState = ({ 
    icon = "📋", 
    title = "No plans available", 
    description = "We're working on adding new plans. Please check back soon!",
    actionButton = null,
    variant = "info" // info, warning, error
}) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'warning':
                return {
                    container: "bg-yellow-50 border-yellow-200 text-yellow-800",
                    title: "text-yellow-800",
                    description: "text-yellow-600"
                };
            case 'error':
                return {
                    container: "bg-red-50 border-red-200 text-red-800",
                    title: "text-red-800", 
                    description: "text-red-600"
                };
            default: // info
                return {
                    container: "bg-blue-50 border-blue-200 text-blue-800",
                    title: "text-blue-800",
                    description: "text-blue-600"
                };
        }
    };

    const styles = getVariantStyles();

    return (
        <div className={`${styles.container} border rounded-lg p-8 text-center`}>
            <div className="text-4xl mb-3">{icon}</div>
            <div className={`text-lg font-semibold ${styles.title} mb-2`}>
                {title}
            </div>
            <div className={`text-sm ${styles.description}`}>
                {description}
            </div>
            {actionButton && (
                <div className="mt-4">
                    {actionButton}
                </div>
            )}
        </div>
    );
};

export default EmptyState;
