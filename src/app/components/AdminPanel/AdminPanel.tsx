'use client'

import { useState } from "react";
import ProductForm from "./ProductForm/ProductForm";
import ProductEdit from "./ProductEdit/ProductEdit";  // Import ProductEdit component
import classes from './AdminPanel.module.css'

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState<'add' | 'edit'>('add');  // State to manage active tab

    return (
        <>
            <div className={classes['admin-container']}>
                {/* Tab navigation */}
                <div className={classes['tab-container']}>
                    <button
                        onClick={() => setActiveTab('add')}
                        className={`${classes.button} ${activeTab === 'edit' ? classes['active-tab'] : ''}`}
                    >
                        Add Product
                    </button>
                    <button
                        onClick={() => setActiveTab('edit')}
                        className={`${classes.button} ${activeTab === 'edit' ? classes['active-tab'] : ''}`}
                    >
                        Edit Products
                    </button>
                </div>

                {/* Render the active tab content */}
                {activeTab === 'add' && <ProductForm />}
                {activeTab === 'edit' && <ProductEdit />}
            </div>
        </>
    );
};

export default AdminPanel;
