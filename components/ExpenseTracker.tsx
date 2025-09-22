import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Expense, Filter } from '../types';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import FilterControls from './FilterControls';
import SummaryCard from './SummaryCard';
import { CashIcon } from './icons/Icons';


interface ExpenseTrackerProps {
    expenses: Expense[];
    allExpenses: Expense[];
    addExpense: (expense: Omit<Expense, 'id'>) => void;
    deleteExpense: (id: string) => void;
    filter: Filter;
    setFilter: (filter: Filter) => void;
}

const COLORS = ['#a3a3a3', '#737373', '#525252', '#404040', '#262626', '#171717']; // Neutral gray palette

const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({ expenses, allExpenses, addExpense, deleteExpense, filter, setFilter }) => {
    
    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

    const totalExpenses = React.useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);

    const expenseByCategory = React.useMemo(() => {
        const categoryMap: { [key: string]: number } = {};
        expenses.forEach(e => {
            categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
        });
        return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
    }, [expenses]);
    
    return (
        <div className="space-y-6">
            <FilterControls filter={filter} setFilter={setFilter} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <SummaryCard 
                    title="Total Expenses" 
                    value={formatCurrency(totalExpenses)} 
                    icon={<CashIcon />}
                    iconStyle={{ bg: 'bg-accent/20', text: 'text-accent' }}
                 />
            </div>

            {expenses.length > 0 && (
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-secondary p-6 rounded-lg shadow-xl">
                        <h3 className="text-xl font-semibold mb-4 text-text-primary">Expenses by Category</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={expenseByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#a3a3a3" label>
                                    {expenseByCategory.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-secondary p-6 rounded-lg shadow-xl">
                        <h3 className="text-xl font-semibold mb-4 text-text-primary">Recent Expenses</h3>
                         <ResponsiveContainer width="100%" height={300}>
                           <BarChart data={expenses.slice(0,10).reverse()}>
                               <XAxis dataKey="date" tickFormatter={(dateStr) => new Date(dateStr).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})} stroke="#a3a3a3"/>
                               <YAxis stroke="#a3a3a3" tickFormatter={(value) => `₹${value}`} />
                               <Tooltip contentStyle={{ backgroundColor: '#262626', border: 'none' }} cursor={{fill: 'rgba(115, 115, 115, 0.3)'}} formatter={(value) => formatCurrency(Number(value))}/>
                               <Legend />
                               <Bar dataKey="amount" fill="#a3a3a3" name="Expense Amount" />
                           </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
           
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
                <div className="lg:col-span-1">
                    <ExpenseForm addExpense={addExpense} />
                </div>
                <div className="lg:col-span-2">
                    <ExpenseList expenses={allExpenses} deleteExpense={deleteExpense}/>
                </div>
            </div>
        </div>
    );
};

export default ExpenseTracker;