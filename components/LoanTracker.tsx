import React from 'react';
import { Loan, LoanStatus, Filter } from '../types';
import LoanForm from './LoanForm';
import LoanList from './LoanList';
import FilterControls from './FilterControls';
import SummaryCard from './SummaryCard';
import { ArrowDownIcon, ArrowUpIcon } from './icons/Icons';

interface LoanTrackerProps {
    loans: Loan[];
    addLoan: (loan: Omit<Loan, 'id' | 'status'>) => void;
    updateLoanStatus: (id: string, status: LoanStatus) => void;
    deleteLoan: (id: string) => void;
    filter: Filter;
    setFilter: (filter: Filter) => void;
}

const LoanTracker: React.FC<LoanTrackerProps> = ({ loans, addLoan, updateLoanStatus, deleteLoan, filter, setFilter }) => {
    
    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

    const totals = React.useMemo(() => {
        const totalLent = loans
            .filter(l => l.type === 'lent' && l.status === 'pending')
            .reduce((sum, l) => sum + l.amount, 0);
        const totalBorrowed = loans
            .filter(l => l.type === 'borrowed' && l.status === 'pending')
            .reduce((sum, l) => sum + l.amount, 0);
        return { totalLent, totalBorrowed };
    }, [loans]);

    return (
        <div className="space-y-6">
            <FilterControls filter={filter} setFilter={setFilter} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SummaryCard 
                    title="Total Lent (Pending)" 
                    value={formatCurrency(totals.totalLent)} 
                    icon={<ArrowUpIcon />} 
                    iconStyle={{ bg: 'bg-success/20', text: 'text-success' }}
                />
                <SummaryCard 
                    title="Total Borrowed (Pending)" 
                    value={formatCurrency(totals.totalBorrowed)} 
                    icon={<ArrowDownIcon />} 
                    iconStyle={{ bg: 'bg-danger/20', text: 'text-danger' }}
                />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
                <div className="lg:col-span-1">
                    <LoanForm addLoan={addLoan} />
                </div>
                <div className="lg:col-span-2">
                    <LoanList loans={loans} updateLoanStatus={updateLoanStatus} deleteLoan={deleteLoan} />
                </div>
            </div>
        </div>
    );
};

export default LoanTracker;
