import React from 'react';
import Navbar from '../component/NavBar';
import { useAppContext } from '../context/AppContext';

const UserDashboard = () => {
  const { currentUser } = useAppContext();
  return (
    <div>
      <Navbar />
      <div className="mx-8 sm:mx-20 xl:mx-32 py-10">
        <h1 className="text-2xl font-semibold mb-2">Welcome{currentUser?.name ? `, ${currentUser.name}` : ''}</h1>
        <p className="text-gray-600">You're logged in as {currentUser?.email}.</p>
        <div className="mt-6 p-6 border rounded-lg">
          <h2 className="font-medium mb-2">Your account</h2>
          <div className="text-sm text-gray-600">Role: {currentUser?.role}</div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

