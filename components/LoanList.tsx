import React from 'react';
import { Loan, LoanStatus } from '../types';
import { TrashIcon } from './icons/Icons';

interface LoanListProps {
    loans: Loan[];
    updateLoanStatus: (id: string, status: LoanStatus) => void;
    deleteLoan: (id: string) => void;
}

const LoanList: React.FC<LoanListProps> = ({ loans, updateLoanStatus, deleteLoan }) => {

    const handleStatusChange = (loan: Loan) => {
        const newStatus: LoanStatus = loan.status === 'pending' ? 'paid' : 'pending';
        updateLoanStatus(loan.id, newStatus);
    };

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

    return (
        <div className="bg-secondary p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold text-text-primary mb-4">Loan History</h3>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                {loans.length === 0 ? (
                     <p className="text-text-secondary text-center py-8">No loan records yet.</p>
                ) : (
                    loans.map(loan => (
                        <div key={loan.id} className={`bg-neutral-800 p-4 rounded-lg flex justify-between items-center border-l-4 ${loan.type === 'lent' ? 'border-success' : 'border-danger'}`}>
                            <div>
                                <p className={`font-semibold text-text-primary ${loan.status === 'paid' ? 'line-through' : ''}`}>
                                    {loan.person}
                                </p>
                                <p className="text-sm text-text-secondary">
                                    <span className={loan.type === 'lent' ? 'text-success' : 'text-danger'}>
                                        {loan.type === 'lent' ? 'Lent' : 'Borrowed'}
                                    </span>
                                    &nbsp;&middot; {new Date(loan.date).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className={`font-bold text-lg ${loan.status === 'paid' ? 'text-text-secondary line-through' : loan.type === 'lent' ? 'text-success' : 'text-danger'}`}>
                                    {formatCurrency(loan.amount)}
                                </p>
                                <button
                                    onClick={() => handleStatusChange(loan)}
                                    className={`px-3 py-1 text-xs font-bold rounded-full ${loan.status === 'pending' ? 'bg-yellow-500 text-yellow-900' : 'bg-green-500 text-green-900'}`}
                                >
                                    {loan.status}
                                </button>
                                <button onClick={() => deleteLoan(loan.id)} className="text-danger hover:opacity-80">
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

export default LoanList;