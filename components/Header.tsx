import React from 'react';
import { View } from '../types';
import { CurrencyDollarIcon, CollectionIcon } from './icons/Icons';

interface HeaderProps {
    setView: (view: View) => void;
    currentView: View;
}

const Header: React.FC<HeaderProps> = ({ setView, currentView }) => {
    const navItems: { view: View; label: string; icon: JSX.Element }[] = [
        { view: 'expenses', label: 'Daily Expenses', icon: <CurrencyDollarIcon /> },
        { view: 'loans', label: 'Lent & Borrow', icon: <CollectionIcon /> },
    ];

    return (
        <header className="bg-secondary shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-accent">Expense Tracker</h1>
                    </div>
                    <nav className="hidden md:flex space-x-4">
                        {navItems.map(item => (
                            <button
                                key={item.view}
                                onClick={() => setView(item.view)}
                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                    currentView === item.view
                                        ? 'bg-accent text-secondary'
                                        : 'text-text-secondary hover:bg-neutral-700 hover:text-text-primary'
                                }`}
                            >
                                {item.icon}
                                <span className="ml-2">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
                 {/* Mobile Nav */}
                <nav className="md:hidden pt-2 pb-4">
                    <div className="flex justify-around">
                        {navItems.map(item => (
                             <button
                                key={item.view}
                                onClick={() => setView(item.view)}
                                className={`flex flex-col items-center p-2 rounded-md text-xs font-medium transition-colors duration-200 w-1/2 ${
                                    currentView === item.view
                                        ? 'bg-accent text-secondary'
                                        : 'text-text-secondary hover:bg-neutral-700 hover:text-text-primary'
                                }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;