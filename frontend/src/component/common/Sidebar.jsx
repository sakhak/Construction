import React, { useContext } from 'react'
import { AuthContext } from '../frontend/context/AuthContext';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const {logout} = useContext(AuthContext);
  return (
    <>
    <div className="rounded-lg border border-black/10 bg-white p-4 shadow-sm">
        <div>
            <h4 className="mb-4 text-lg font-semibold text-brand-dark">Admin Menu</h4>
            <ul className="m-0 space-y-1 p-0">
                <li><Link className="block rounded px-3 py-2 font-medium text-gray-700 transition hover:bg-brand-soft hover:text-brand-pink" to="/admin/dashboard">Dashboard</Link></li>
                <li><Link className="block rounded px-3 py-2 font-medium text-gray-700 transition hover:bg-brand-soft hover:text-brand-pink" to="/admin/services">Service</Link></li>
                <li><Link className="block rounded px-3 py-2 font-medium text-gray-700 transition hover:bg-brand-soft hover:text-brand-pink" to="/admin/projects">Projects</Link></li>
                <li><Link className="block rounded px-3 py-2 font-medium text-gray-700 transition hover:bg-brand-soft hover:text-brand-pink" to="/admin/articles">Articles</Link></li>
                <li><button onClick={logout} type='submit' className='mt-4 w-full rounded bg-brand-pink px-4 py-2 font-semibold uppercase text-white transition hover:bg-brand-yellow hover:text-brand-dark'>Logout</button></li>
            </ul>
        </div>
    </div>
    </>
  )
}

export default Sidebar
