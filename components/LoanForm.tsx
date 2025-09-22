import React, { useState } from 'react';
import { Loan, LoanType } from '../types';

interface LoanFormProps {
    addLoan: (loan: Omit<Loan, 'id' | 'status'>) => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ addLoan }) => {
    const [person, setPerson] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<LoanType>('lent');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!person || !amount || !date) {
            alert('Please fill out all fields.');
            return;
        }
        addLoan({
            person,
            amount: parseFloat(amount),
            type,
            date,
        });
        setPerson('');
        setAmount('');
    };
    
    const commonInputClass = "w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent";

    return (
        <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded-lg shadow-xl space-y-4">
            <h3 className="text-xl font-semibold text-text-primary mb-4">Add Lent/Borrow Record</h3>
            <div>
                <label htmlFor="person" className="block text-sm font-medium text-text-secondary mb-1">Person</label>
                <input
                    type="text"
                    id="person"
                    value={person}
                    onChange={e => setPerson(e.target.value)}
                    placeholder="e.g., John Doe"
                    className={commonInputClass}
                />
            </div>
            <div>
                <label htmlFor="loan-amount" className="block text-sm font-medium text-text-secondary mb-1">Amount</label>
                <input
                    type="number"
                    id="loan-amount"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="0.00"
                    className={commonInputClass}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Type</label>
                <div className="flex space-x-4">
                    <button type="button" onClick={() => setType('lent')} className={`flex-1 py-2 rounded-md ${type === 'lent' ? 'bg-accent text-secondary' : 'bg-neutral-800'}`}>Lent</button>
                    <button type="button" onClick={() => setType('borrowed')} className={`flex-1 py-2 rounded-md ${type === 'borrowed' ? 'bg-accent text-secondary' : 'bg-neutral-800'}`}>Borrowed</button>
                </div>
            </div>
            <div>
                <label htmlFor="loan-date" className="block text-sm font-medium text-text-secondary mb-1">Date</label>
                <input
                    type="date"
                    id="loan-date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className={commonInputClass}
                />
            </div>
            <button type="submit" className="w-full bg-accent text-secondary font-bold py-2 px-4 rounded-md hover:bg-neutral-300 transition-colors duration-200">
                Add Record
            </button>
        </form>
    );
};

export default LoanForm;