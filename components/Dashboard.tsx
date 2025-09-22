import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Expense, Loan, Filter } from '../types';
import SummaryCard from './SummaryCard';
import FilterControls from './FilterControls';
import { ArrowDownIcon, ArrowUpIcon, CashIcon } from './icons/Icons';


interface DashboardProps {
    expenses: Expense[];
    loans: Loan[];
    filter: Filter;
    setFilter: (filter: Filter) => void;
}

const COLORS = ['#a3a3a3', '#737373', '#525252', '#404040', '#262626', '#171717']; // Neutral gray palette

const Dashboard: React.FC<DashboardProps> = ({ expenses, loans, filter, setFilter }) => {
    const totals = React.useMemo(() => {
        const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
        const totalLent = loans
            .filter(l => l.type === 'lent' && l.status === 'pending')
            .reduce((sum, l) => sum + l.amount, 0);
        const totalBorrowed = loans
            .filter(l => l.type === 'borrowed' && l.status === 'pending')
            .reduce((sum, l) => sum + l.amount, 0);
        return { totalExpenses, totalLent, totalBorrowed };
    }, [expenses, loans]);

    const expenseByCategory = React.useMemo(() => {
        const categoryMap: { [key: string]: number } = {};
        expenses.forEach(e => {
            categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
        });
        return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
    }, [expenses]);
    
    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

    return (
        <div className="space-y-6">
            <FilterControls filter={filter} setFilter={setFilter} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SummaryCard title="Total Expenses" value={formatCurrency(totals.totalExpenses)} icon={<CashIcon />} />
                <SummaryCard title="Total Lent (Pending)" value={formatCurrency(totals.totalLent)} icon={<ArrowUpIcon />} />
                <SummaryCard title="Total Borrowed (Pending)" value={formatCurrency(totals.totalBorrowed)} icon={<ArrowDownIcon />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-secondary p-6 rounded-lg shadow-xl">
                    <h3 className="text-xl font-semibold mb-4 text-text-primary">Expenses by Category</h3>
                    {expenseByCategory.length > 0 ? (
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
                    ) : (
                         <div className="flex items-center justify-center h-[300px] text-text-secondary">No expense data for this period.</div>
                    )}
                </div>
                <div className="bg-secondary p-6 rounded-lg shadow-xl">
                    <h3 className="text-xl font-semibold mb-4 text-text-primary">Recent Expenses</h3>
                    {expenses.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                       <BarChart data={expenses.slice(0,10).reverse()}>
                           <XAxis dataKey="date" tickFormatter={(dateStr) => new Date(dateStr).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})} stroke="#a3a3a3"/>
                           <YAxis stroke="#a3a3a3" tickFormatter={(value) => `₹${value}`} />
                           <Tooltip contentStyle={{ backgroundColor: '#262626', border: 'none' }} cursor={{fill: 'rgba(115, 115, 115, 0.3)'}} formatter={(value) => formatCurrency(Number(value))}/>
                           <Legend />
                           <Bar dataKey="amount" fill="#a3a3a3" name="Expense Amount" />
                       </BarChart>
                    </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-[300px] text-text-secondary">No expense data for this period.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;