import React from 'react';

interface SummaryCardProps {
    title: string;
    value: string;
    icon: JSX.Element;
    iconStyle?: {
        bg: string;
        text: string;
    };
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, iconStyle }) => {
    const iconBg = iconStyle?.bg || 'bg-neutral-800';
    const iconText = iconStyle?.text || 'text-accent';

    return (
        <div className="bg-secondary p-6 rounded-lg shadow-xl flex items-center space-x-4">
            <div className={`p-3 rounded-full ${iconBg} ${iconText}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-text-secondary">{title}</p>
                <p className="text-2xl font-bold text-text-primary">{value}</p>
            </div>
        </div>
    );
};

export default SummaryCard;