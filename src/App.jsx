import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';

function App() {
  // Cria um estado chamado 'agenda' para guardar os dados da planilha.
  // Inicialmente, é um array vazio.
  const [agenda, setAgenda] = useState([]);

  // URL da sua planilha publicada como CSV.
  // !!!!!!!!!! COLE A SUA URL AQUI DENTRO DAS ASPAS !!!!!!!!!!
  const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

  useEffect(() => {
    // Papa.parse busca e converte os dados do CSV.
    Papa.parse(GOOGLE_SHEET_URL, {
      download: true, // Indica que a URL é um arquivo para baixar.
      header: true,   // A primeira linha do CSV é o cabeçalho.
      complete: (results) => {
        // Quando a conversão termina, os dados estão em 'results.data'.
        // Atualizamos nosso estado 'agenda' com esses dados.
        console.log(results.data); // Ótimo para ver no console se os dados chegaram certo!
        setAgenda(results.data);
      },
    });
  }, []); // O array vazio [] faz com que isso rode apenas uma vez, quando o componente é montado.

  return (
    <div className="App">
      <header className="App-header">
        <h1>Minha Agenda de Eventos</h1>
      </header>
      <main className="container">
        {/* Usamos .map() para criar um card para cada item da nossa agenda */}
        {agenda.map((item, index) => (
          <div key={index} className="item-card">
            <h3>{item.data}</h3>
            {/* Usamos item['dia da semana'] com colchetes porque o nome da coluna 
              tem espaços. Se fosse "diasemana", poderíamos usar item.diasemana 
            */}
            <p><strong>Dia:</strong> {item['dia da semana']}</p>
            <p><strong>Período:</strong> {item.periodo}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              Acessar Link
            </a>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;