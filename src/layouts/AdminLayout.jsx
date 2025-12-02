// src/layouts/AdminLayout.jsx (CRITICAL FIX)
import React, { useState } from 'react'; // <--- Ensure useState is IMPORTED
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
    // 1. DEFINE THE STATE VARIABLE HERE
    const [isOpen, setIsOpen] = useState(true); 
    
    // Function to toggle the sidebar state
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Use useNavigate and useAuth here 
    const navigate = useNavigate();
    const { user } = useAuth();
    
    // --- STYLES ---
    const mainContentStyle = {
        // Adjusts margin based on sidebar state
        marginLeft: isOpen ? '260px' : '0px', 
        transition: 'margin-left 0.3s ease',
        padding: '20px',
        position: 'relative', 
        zIndex: 1, 
        minHeight: '100vh', 
        backgroundColor: '#f8f9fa' 
    };

    return (
        <div className="d-flex">
            {/* 2. PASS isOpen and toggleSidebar as props */}
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            
            <div style={mainContentStyle} className="w-100">
                <Header 
                    toggleSidebar={toggleSidebar} 
                    user={user} 
                    
                />
                
                <Outlet /> 

             
            </div>
        </div>
    );
};

export default AdminLayout;


