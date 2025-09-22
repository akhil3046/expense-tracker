import React from 'react';
import { Expense } from '../types';
import { TrashIcon } from './icons/Icons';

interface ExpenseListProps {
    expenses: Expense[];
    deleteExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, deleteExpense }) => {

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

    return (
        <div className="bg-secondary p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold text-text-primary mb-4">Expense History</h3>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                {expenses.length === 0 ? (
                    <p className="text-text-secondary text-center py-8">No expenses logged yet.</p>
                ) : (
                    expenses.map(expense => (
                        <div key={expense.id} className="bg-neutral-800 p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-text-primary">{expense.description}</p>
                                <p className="text-sm text-text-secondary">{expense.category} &middot; {new Date(expense.date).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                               <p className="font-bold text-lg text-accent">{formatCurrency(expense.amount)}</p>
                               <button onClick={() => deleteExpense(expense.id)} className="text-danger hover:opacity-80">
                                 <TrashIcon />
                               </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ExpenseList;