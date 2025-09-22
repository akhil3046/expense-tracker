import React from 'react';
import { Filter } from '../types';

interface FilterControlsProps {
    filter: Filter;
    setFilter: (filter: Filter) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ filter, setFilter }) => {
    const filters: { id: Filter; label: string }[] = [
        { id: 'week', label: 'This Week' },
        { id: 'month', label: 'This Month' },
        { id: 'year', label: 'This Year' },
        { id: 'all', label: 'All Time' },
    ];

    return (
        <div className="bg-secondary p-2 rounded-lg shadow-md flex items-center justify-center space-x-1 sm:space-x-2">
            {filters.map(f => (
                <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                        filter === f.id
                            ? 'bg-accent text-secondary'
                            : 'bg-transparent text-text-secondary hover:bg-neutral-700 hover:text-text-primary'
                    }`}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );
};

export default FilterControls;