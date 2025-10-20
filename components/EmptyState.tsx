'use client'

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
}

export default function EmptyState({ title, description, icon }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            {icon && (
                <div className="mb-4 text-gray-400 dark:text-gray-500">
                    {icon}
                </div>
            )}
            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">{title}</h3>
            {description && (
                <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">{description}</p>
            )}
        </div>
    );
}
