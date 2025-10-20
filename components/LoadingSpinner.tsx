'use client'

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    text?: string;
}

export default function LoadingSpinner({ size = 'medium', text }: LoadingSpinnerProps) {
    const sizeClasses = {
        small: 'w-6 h-6 border-2',
        medium: 'w-10 h-10 border-3',
        large: 'w-16 h-16 border-4'
    };

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className={`${sizeClasses[size]} border-gray-300 dark:border-gray-600 border-t-black dark:border-t-white rounded-full animate-spin`}></div>
            {text && (
                <p className="mt-4 text-black dark:text-white font-medium">{text}</p>
            )}
        </div>
    );
}
