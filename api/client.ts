import { Expense, Loan, LoanStatus } from '../types';

const EXPENSES_KEY = 'expenses';
const LOANS_KEY = 'loans';

// Helper function to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Data Access Functions ---

const getItems = <T>(key: string): T[] => {
    try {
        const items = localStorage.getItem(key);
        return items ? JSON.parse(items) : [];
    } catch (error) {
        console.error(`Error reading ${key} from localStorage`, error);
        return [];
    }
};

const setItems = <T>(key: string, items: T[]): void => {
    try {
        localStorage.setItem(key, JSON.stringify(items));
    } catch (error) {
        console.error(`Error writing ${key} to localStorage`, error);
    }
};

// --- API Client ---

// A simple ID generator
const generateId = () => `id_${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`;

export const getExpenses = async (): Promise<Expense[]> => {
    await delay(500); // Simulate network latency
    return getItems<Expense>(EXPENSES_KEY);
};

export const getLoans = async (): Promise<Loan[]> => {
    await delay(500);
    return getItems<Loan>(LOANS_KEY);
};

export const addExpense = async (expense: Omit<Expense, 'id'>): Promise<Expense> => {
    await delay(300);
    const expenses = getItems<Expense>(EXPENSES_KEY);
    const newExpense: Expense = { ...expense, id: generateId() };
    setItems<Expense>(EXPENSES_KEY, [newExpense, ...expenses]);
    return newExpense;
};

export const addLoan = async (loan: Omit<Loan, 'id' | 'status'>): Promise<Loan> => {
    await delay(300);
    const loans = getItems<Loan>(LOANS_KEY);
    const newLoan: Loan = { ...loan, id: generateId(), status: 'pending' };
    setItems<Loan>(LOANS_KEY, [newLoan, ...loans]);
    return newLoan;
};

export const updateLoanStatus = async (id: string, status: LoanStatus): Promise<Loan> => {
    await delay(200);
    const loans = getItems<Loan>(LOANS_KEY);
    let updatedLoan: Loan | undefined;
    const updatedLoans = loans.map(loan => {
        if (loan.id === id) {
            updatedLoan = { ...loan, status };
            return updatedLoan;
        }
        return loan;
    });
    if (!updatedLoan) {
        throw new Error('Loan not found');
    }
    setItems<Loan>(LOANS_KEY, updatedLoans);
    return updatedLoan;
};

export const deleteExpense = async (id: string): Promise<{ id: string }> => {
    await delay(200);
    const expenses = getItems<Expense>(EXPENSES_KEY);
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setItems<Expense>(EXPENSES_KEY, updatedExpenses);
    return { id };
};

export const deleteLoan = async (id: string): Promise<{ id: string }> => {
    await delay(200);
    const loans = getItems<Loan>(LOANS_KEY);
    const updatedLoans = loans.filter(loan => loan.id !== id);
    setItems<Loan>(LOANS_KEY, updatedLoans);
    return { id };
};
