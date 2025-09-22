import React, { useState, useMemo } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { Expense, Loan, View, Filter, LoanStatus, ExpenseCategory } from './types';
import Header from './components/Header';
import ExpenseTracker from './components/ExpenseTracker';
import LoanTracker from './components/LoanTracker';

const App: React.FC = () => {
    const [view, setView] = useState<View>('expenses');
    const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);
    const [loans, setLoans] = useLocalStorage<Loan[]>('loans', []);
    const [filter, setFilter] = useState<Filter>('month');

    const addExpense = (expense: Omit<Expense, 'id'>) => {
        const newExpense: Expense = { ...expense, id: new Date().toISOString() };
        setExpenses(prev => [newExpense, ...prev]);
    };

    const addLoan = (loan: Omit<Loan, 'id' | 'status'>) => {
        const newLoan: Loan = { ...loan, id: new Date().toISOString(), status: 'pending' };
        setLoans(prev => [newLoan, ...prev]);
    };

    const updateLoanStatus = (id: string, status: LoanStatus) => {
        setLoans(prev => prev.map(loan => loan.id === id ? { ...loan, status } : loan));
    };

    const deleteExpense = (id: string) => {
        setExpenses(prev => prev.filter(expense => expense.id !== id));
    }

    const deleteLoan = (id: string) => {
        setLoans(prev => prev.filter(loan => loan.id !== id));
    }

    const filteredData = useMemo(() => {
        const now = new Date();
        const startOf = {
            week: new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()),
            month: new Date(now.getFullYear(), now.getMonth(), 1),
            year: new Date(now.getFullYear(), 0, 1),
        };

        if (filter === 'all') {
            return { filteredExpenses: expenses, filteredLoans: loans };
        }

        const filterDate = startOf[filter];
        filterDate.setHours(0, 0, 0, 0);

        const filteredExpenses = expenses.filter(e => new Date(e.date) >= filterDate);
        const filteredLoans = loans.filter(l => new Date(l.date) >= filterDate);

        return { filteredExpenses, filteredLoans };
    }, [expenses, loans, filter]);


    const renderView = () => {
        switch (view) {
            case 'expenses':
                return <ExpenseTracker 
                            expenses={filteredData.filteredExpenses} 
                            allExpenses={expenses}
                            addExpense={addExpense} 
                            deleteExpense={deleteExpense}
                            filter={filter}
                            setFilter={setFilter}
                        />;
            case 'loans':
                return <LoanTracker 
                            loans={filteredData.filteredLoans} 
                            addLoan={addLoan} 
                            updateLoanStatus={updateLoanStatus}
                            deleteLoan={deleteLoan}
                            filter={filter}
                            setFilter={setFilter}
                        />;
            default:
                return <ExpenseTracker 
                            expenses={filteredData.filteredExpenses}
                            allExpenses={expenses}
                            addExpense={addExpense} 
                            deleteExpense={deleteExpense}
                            filter={filter}
                            setFilter={setFilter}
                        />;
        }
    };

    return (
        <div className="min-h-screen bg-primary font-sans">
            <Header setView={setView} currentView={view} />
            <main className="p-4 sm:p-6 lg:p-8">
                {renderView()}
            </main>
        </div>
    );
};

export default App;
