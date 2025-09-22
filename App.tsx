import React, { useState, useMemo, useEffect } from 'react';
import { Expense, Loan, View, Filter, LoanStatus } from './types';
import Header from './components/Header';
import ExpenseTracker from './components/ExpenseTracker';
import LoanTracker from './components/LoanTracker';
import * as api from './api/client'; // Import the local API client

const App: React.FC = () => {
    const [view, setView] = useState<View>('expenses');
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loans, setLoans] = useState<Loan[]>([]);
    const [filter, setFilter] = useState<Filter>('month');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch data from the local API client
                const [expensesData, loansData] = await Promise.all([
                    api.getExpenses(),
                    api.getLoans()
                ]);

                // Sort data to show newest first
                setExpenses(expensesData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
                setLoans(loansData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
                setError(null);
            } catch (err) {
                console.error(err);
                setError('Could not load data from your browser. Please ensure storage is enabled.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const addExpense = async (expense: Omit<Expense, 'id'>) => {
        try {
            const newExpense = await api.addExpense(expense);
            setExpenses(prev => [newExpense, ...prev]);
        } catch (error) {
            console.error(error);
            alert('Failed to add expense. Please try again.');
        }
    };

    const addLoan = async (loan: Omit<Loan, 'id' | 'status'>) => {
        try {
            const newLoan = await api.addLoan(loan);
            setLoans(prev => [newLoan, ...prev]);
        } catch (error) {
            console.error(error);
            alert('Failed to add loan record. Please try again.');
        }
    };

    const updateLoanStatus = async (id: string, status: LoanStatus) => {
        try {
            const updatedLoan = await api.updateLoanStatus(id, status);
            setLoans(prev => prev.map(loan => (loan.id === id ? updatedLoan : loan)));
        } catch (error) {
            console.error(error);
            alert('Failed to update status. Please try again.');
        }
    };

    const deleteExpense = async (id: string) => {
        try {
            await api.deleteExpense(id);
            setExpenses(prev => prev.filter(expense => expense.id !== id));
        } catch (error) {
            console.error(error);
            alert('Failed to delete expense. Please try again.');
        }
    }

    const deleteLoan = async (id: string) => {
        try {
            await api.deleteLoan(id);
            setLoans(prev => prev.filter(loan => loan.id !== id));
        } catch (error) {
            console.error(error);
            alert('Failed to delete loan. Please try again.');
        }
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
                            allLoans={loans}
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

    if (loading) {
        return (
            <div className="min-h-screen bg-primary flex flex-col items-center justify-center text-text-primary">
                <svg className="animate-spin h-8 w-8 text-accent mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-xl">Loading Data...</p>
                <p className="text-sm text-text-secondary">Accessing local storage.</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-primary flex flex-col items-center justify-center text-center text-text-primary p-4">
                 <p className="text-2xl font-bold text-danger mb-2">Storage Error</p>
                 <p className="text-lg">{error}</p>
            </div>
        )
    }

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