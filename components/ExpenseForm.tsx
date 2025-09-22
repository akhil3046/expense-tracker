import React, { useState } from 'react';
import { Expense, ExpenseCategory } from '../types';

interface ExpenseFormProps {
    addExpense: (expense: Omit<Expense, 'id'>) => void;
}

const categories: ExpenseCategory[] = ['Food', 'Kitchen', 'Travel', 'Personal', 'Additional'];

const ExpenseForm: React.FC<ExpenseFormProps> = ({ addExpense }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState<ExpenseCategory>('Food');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !amount || !category || !date) {
            alert('Please fill out all fields.');
            return;
        }
        addExpense({
            description,
            amount: parseFloat(amount),
            category,
            date,
        });
        setDescription('');
        setAmount('');
        setCategory('Food');
    };
    
    const commonInputClass = "w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent";

    return (
        <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded-lg shadow-xl space-y-4">
            <h3 className="text-xl font-semibold text-text-primary mb-4">Add New Expense</h3>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="e.g., Coffee"
                    className={commonInputClass}
                />
            </div>
            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-text-secondary mb-1">Amount</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="0.00"
                    className={commonInputClass}
                />
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-text-secondary mb-1">Category</label>
                <select
                    id="category"
                    value={category}
                    onChange={e => setCategory(e.target.value as ExpenseCategory)}
                    className={commonInputClass}
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-text-secondary mb-1">Date</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className={commonInputClass}
                />
            </div>
            <button type="submit" className="w-full bg-accent text-secondary font-bold py-2 px-4 rounded-md hover:bg-neutral-300 transition-colors duration-200">
                Add Expense
            </button>
        </form>
    );
};

export default ExpenseForm;