export type View = 'expenses' | 'loans';
export type Filter = 'week' | 'month' | 'year' | 'all';

export type ExpenseCategory = 'Food' | 'Kitchen' | 'Travel' | 'Personal' | 'Additional';

export interface Expense {
    id: string;
    description: string;
    amount: number;
    category: ExpenseCategory;
    date: string;
}

export type LoanType = 'lent' | 'borrowed';
export type LoanStatus = 'pending' | 'paid';

export interface Loan {
    id: string;
    person: string;
    amount: number;
    type: LoanType;
    date: string;
    status: LoanStatus;
}
