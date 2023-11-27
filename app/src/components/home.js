import React from 'react';
import '../styles/home_style.module.css'

const Home = () => {
    return (
        <div className="background bg-cover bg-center h-screen flex flex-col">

        <header className="flex justify-between items-center p-4">

            <div className="text-white text-2xl font-bold">Your Logo</div>

            <button className="bg-blue-500 text-white px-4 py-2 rounded">Entrar no WorkChat</button>
        </header>

        <div className="flex-grow flex items-center justify-center">
            <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Seja bem-vindo ao WorkChat</h1>
            <p className="text-gray-500 mb-6">Conecte-se com colegas de trabalho de forma fácil e eficiente.</p>
            <button className="bg-green-500 text-white px-6 py-3 rounded">Cadastrar-se</button>
            </div>
        </div>

        </div>
    );
};

export default Home;
