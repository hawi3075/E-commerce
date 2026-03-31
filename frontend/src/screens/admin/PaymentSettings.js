import React from 'react';
import { CheckCircle, XCircle, Eye } from 'lucide-react';

const PaymentSettings = () => {
  const transactions = [
    { id: 'TX-101', user: 'Abebe B.', amount: '$165.00', method: 'Telebirr', status: 'Completed' },
    { id: 'TX-102', user: 'Sara K.', amount: '$55.00', method: 'Telebirr', status: 'Pending' },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Payments & Gateway</h1>
        <div className="flex gap-4">
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-green-500"></div>
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Telebirr: Online</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Recent Payments Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50">
            <h3 className="font-bold text-slate-900">Recent Transactions</h3>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-600">
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-blue-600">{tx.id}</td>
                  <td className="px-6 py-4">{tx.user}</td>
                  <td className="px-6 py-4">{tx.method}</td>
                  <td className="px-6 py-4 font-black text-slate-900">{tx.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${tx.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button className="p-2 bg-slate-100 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Eye size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings;