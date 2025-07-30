import React from 'react';
import NavBar from './components/NavBar';
import Form from './components/Form';
import Tasks from './components/Tasks';

const App: React.FC = () => {
  return (
    <main className='bg-gradient-to-r from-slate-900 to-slate-700 min-h-screen flex items-center justify-center'>
      <section className='bg-gray-200 p-4 h-auto rounded-lg shadow-lg w-2/5 '>
        <NavBar />
        <Form />
        <Tasks />
      </section>
    </main>
  );
};

export default App;
