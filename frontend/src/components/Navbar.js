import { Home, LayoutGrid, ShoppingBag, User, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50">
      <Link to="/" className="flex flex-col items-center text-yellow-500">
        <Home size={24} />
        <span className="text-[10px] uppercase font-bold">Home</span>
      </Link>
      <Link to="/shop" className="flex flex-col items-center text-gray-400">
        <LayoutGrid size={24} />
        <span className="text-[10px] uppercase font-bold">Shop</span>
      </Link>
      <Link to="/cart" className="flex flex-col items-center text-gray-400">
        <ShoppingBag size={24} />
        <span className="text-[10px] uppercase font-bold">Cart</span>
      </Link>
      <Link to="/admin" className="flex flex-col items-center text-gray-400">
        <ShieldCheck size={24} />
        <span className="text-[10px] uppercase font-bold">Admin</span>
      </Link>
    </nav>
  );
};

export default Navbar;