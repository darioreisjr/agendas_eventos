import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';
import BgEventos from '../public/eventos.png'

function App() {
  const [agenda, setAgenda] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('eventos');

  const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

  useEffect(() => {
    Papa.parse(GOOGLE_SHEET_URL, {
      download: true,
      header: true,
      complete: (results) => {
        console.log(results.data);
        setAgenda(results.data);
        setLoading(false);
      },
      error: () => {
        setLoading(false);
      }
    });
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="App">
      {/* Header com Navegação */}
      <header className="main-header">
        <div className="header-container">
          <div className="logo">
            <h1>EventHub</h1>
            <span>Sua agenda de eventos</span>
          </div>
          <nav className="main-nav">
            <ul>
              <li>
                <button 
                  className={activeSection === 'home' ? 'active' : ''}
                  onClick={() => scrollToSection('home')}
                >
                  Início
                </button>
              </li>
              <li>
                <button 
                  className={activeSection === 'eventos' ? 'active' : ''}
                  onClick={() => scrollToSection('eventos')}
                >
                  Eventos
                </button>
              </li>
              <li>
                <button 
                  className={activeSection === 'sobre' ? 'active' : ''}
                  onClick={() => scrollToSection('sobre')}
                >
                  Sobre
                </button>
              </li>
              <li>
                <button 
                  className={activeSection === 'contato' ? 'active' : ''}
                  onClick={() => scrollToSection('contato')}
                >
                  Contato
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Seção Hero */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>Descubra os Melhores Eventos</h1>
          <p>Sua fonte completa para eventos incríveis na cidade</p>
          <button 
            className="cta-button"
            onClick={() => scrollToSection('eventos')}
          >
            Ver Eventos
          </button>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        {/* Seção de Eventos */}
        <section id="eventos" className="eventos-section">
          <div className="section-header">
            <h2>Próximos Eventos</h2>
            <p>Confira nossa agenda completa de eventos</p>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Carregando eventos...</p>
            </div>
          ) : (
            <div className="eventos-grid">
              {agenda.length > 0 ? (
                agenda.map((item, index) => (
                  <div key={index} className="evento-card">
                    <div className="card-image">
                      <img
                        src={item['Imagem do evento'] === "" ? BgEventos : item['Imagem do evento']}
                        alt={item['Nome do evento']}
                      />
                      <div className="card-badge">{item.Periodo}</div>
                    </div>
                    <div className="card-content">
                      <h3>{item['Nome do evento']}</h3>
                      <div className="event-info">
                        <div className="info-item">
                          <span className="icon">📅</span>
                          <span>{item['Data do evento']}</span>
                        </div>
                        <div className="info-item">
                          <span className="icon">⏰</span>
                          <span>{item['Horario do evento']}</span>
                        </div>
                        <div className="info-item">
                          <span className="icon">🗓️</span>
                          <span>{item['Dia da Semana']}</span>
                        </div>
                      </div>
                      <a 
                        href={item['Link do evento']} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="event-link"
                      >
                        Participar do Evento
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-events">
                  <h3>Nenhum evento encontrado</h3>
                  <p>Em breve novos eventos serão adicionados!</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Seção Sobre */}
        <section id="sobre" className="sobre-section">
          <div className="container">
            <div className="sobre-content">
              <h2>Sobre o EventHub</h2>
              <p>
                O EventHub é sua plataforma completa para descobrir e participar dos melhores 
                eventos da cidade. Nossa missão é conectar pessoas através de experiências 
                incríveis e momentos únicos.
              </p>
              <div className="features">
                <div className="feature">
                  <span className="feature-icon">🎯</span>
                  <h4>Eventos Selecionados</h4>
                  <p>Cuidadosamente escolhidos para oferecer as melhores experiências</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">📱</span>
                  <h4>Sempre Atualizado</h4>
                  <p>Nossa agenda é atualizada em tempo real com novos eventos</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎪</span>
                  <h4>Variedade</h4>
                  <p>Shows, palestras, workshops e muito mais para todos os gostos</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Contato */}
        <section id="contato" className="contato-section">
          <div className="container">
            <h2>Entre em Contato</h2>
            <p>Tem alguma dúvida ou sugestão? Adoraríamos ouvir você!</p>
            <div className="contato-info">
              <div className="contato-item">
                <span className="icon">📧</span>
                <div>
                  <strong>Email</strong>
                  <p>contato@eventhub.com</p>
                </div>
              </div>
              <div className="contato-item">
                <span className="icon">📱</span>
                <div>
                  <strong>WhatsApp</strong>
                  <p>(11) 99999-9999</p>
                </div>
              </div>
              <div className="contato-item">
                <span className="icon">📍</span>
                <div>
                  <strong>Localização</strong>
                  <p>São Paulo, SP - Brasil</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>EventHub</h4>
              <p>Conectando pessoas através de eventos incríveis.</p>
              <div className="social-links">
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="Instagram">📷</a>
                <a href="#" aria-label="Twitter">🐦</a>
                <a href="#" aria-label="LinkedIn">💼</a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Links Rápidos</h4>
              <ul>
                <li><button onClick={() => scrollToSection('eventos')}>Eventos</button></li>
                <li><button onClick={() => scrollToSection('sobre')}>Sobre</button></li>
                <li><button onClick={() => scrollToSection('contato')}>Contato</button></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Categorias</h4>
              <ul>
                <li><a href="#">Shows</a></li>
                <li><a href="#">Palestras</a></li>
                <li><a href="#">Workshops</a></li>
                <li><a href="#">Networking</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 EventHub. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;