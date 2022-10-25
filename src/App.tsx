import React from 'react';

import './App.css';
import { AdminProvider } from './Contexts/Admin';
import { BrandProvider } from './Contexts/Brand';
import { CustomerProvider } from './Contexts/Customer';
import { Navigation } from './Routes/routes';

function App() {
  return (
    <>
      <AdminProvider>
        <BrandProvider>
          <CustomerProvider>
            <Navigation></Navigation>
          </CustomerProvider>
        </BrandProvider>
      </AdminProvider>

    </>
  );
}

export default App;