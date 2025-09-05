import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';
import BgEventos from '../public/eventos.png'

function App() {
  const [agenda, setAgenda] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('eventos');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

  useEffect(() => {
    // Carrega tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }

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

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.animate-section');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const navigationItems = [
    { id: 'home', label: 'Início', icon: '🏠' },
    { id: 'eventos', label: 'Eventos', icon: '🎉' },
    { id: 'sobre', label: 'Sobre', icon: 'ℹ️' },
    { id: 'contato', label: 'Contato', icon: '📞' }
  ];

  return (
    <div className="App">
      {/* Header com Navegação */}
      <header className="main-header">
        <div className="header-container">
          <div className="logo">
            <h1>EventFlow</h1>
            <span>Eventos em fluxo contínuo</span>
          </div>
          <nav className="main-nav desktop-nav">
            <ul>
              {navigationItems.map(item => (
                <li key={item.id}>
                  <button 
                    className={activeSection === item.id ? 'active' : ''}
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Sidebar para Tablet */}
      <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Alternar menu">
          ☰
        </button>
        <nav className="sidebar-nav">
          {navigationItems.map(item => (
            <button
              key={item.id}
              className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
              aria-label={item.label}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* FAB para Mobile */}
      <button className="mobile-fab" onClick={toggleMobileMenu} aria-label="Menu">
        ☰
      </button>

      {/* Menu Mobile Sheet */}
      {isMobileMenuOpen && (
        <>
          <div className="mobile-overlay" onClick={toggleMobileMenu}></div>
          <div className="mobile-sheet">
            <div className="mobile-sheet-header">
              <h3>Menu</h3>
              <button className="mobile-close" onClick={toggleMobileMenu} aria-label="Fechar menu">
                ✕
              </button>
            </div>
            <nav className="mobile-nav">
              {navigationItems.map(item => (
                <button
                  key={item.id}
                  className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  <span className="mobile-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </>
      )}

      {/* Seção Hero */}
      <section id="home" className="hero-section animate-section">
        <div className="hero-content">
          <div className="hero-badge">Bem-vindo ao futuro dos eventos</div>
          <h1>Conecte-se aos <span className="highlight">Melhores Eventos</span></h1>
          <p>
            Uma plataforma moderna e intuitiva que reúne os eventos mais relevantes 
            da sua cidade. Descubra experiências únicas, conecte-se com pessoas 
            interessantes e participe de momentos que transformam.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Eventos</span>
            </div>
            <div className="stat">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Participantes</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Categorias</span>
            </div>
          </div>
          <button 
            className="cta-button"
            onClick={() => scrollToSection('eventos')}
          >
            Explorar Eventos
            <span className="button-arrow">→</span>
          </button>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        {/* Seção de Eventos */}
        <section id="eventos" className="eventos-section animate-section">
          <div className="section-header">
            <h2>Próximos Eventos</h2>
            <p>
              Eventos cuidadosamente selecionados para proporcionar as melhores experiências. 
              De workshops técnicos a shows musicais, encontre o que combina com você.
            </p>
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
                  <div key={index} className="evento-card" style={{ animationDelay: `${index * 0.1}s` }}>
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
                        Participar
                        <span className="link-arrow">↗</span>
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-events">
                  <div className="empty-icon">📅</div>
                  <h3>Nenhum evento no momento</h3>
                  <p>Estamos preparando eventos incríveis para você. Volte em breve!</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Seção Sobre */}
        <section id="sobre" className="sobre-section animate-section">
          <div className="container">
            <div class="sobre-content">
              <div className="section-badge">Nossa Missão</div>
              <h2>Transformando a forma como você <span className="highlight">descobre eventos</span></h2>
              <p>
                O EventFlow nasceu da necessidade de centralizar e simplificar a descoberta de eventos. 
                Acreditamos que experiências memoráveis acontecem quando as pessoas certas se encontram 
                nos lugares certos, no momento certo.
              </p>
              
              <div className="about-stats">
                <div className="about-stat">
                  <h3>3 anos</h3>
                  <p>Conectando pessoas através de eventos</p>
                </div>
                <div className="about-stat">
                  <h3>100%</h3>
                  <p>Eventos verificados e de qualidade</p>
                </div>
              </div>

              <div className="features">
                <div className="feature">
                  <div className="feature-icon">🎯</div>
                  <h4>Curadoria Especializada</h4>
                  <p>Cada evento passa por um processo rigoroso de seleção, garantindo qualidade e relevância para nossa comunidade.</p>
                </div>
                <div className="feature">
                  <div className="feature-icon">⚡</div>
                  <h4>Atualização em Tempo Real</h4>
                  <p>Nossa plataforma é sincronizada automaticamente, garantindo que você sempre tenha acesso às informações mais recentes.</p>
                </div>
                <div className="feature">
                  <div className="feature-icon">🌐</div>
                  <h4>Diversidade de Categorias</h4>
                  <p>De tecnologia a arte, de negócios a entretenimento. Temos eventos para todos os interesses e momentos da vida.</p>
                </div>
                <div className="feature">
                  <div className="feature-icon">🤝</div>
                  <h4>Comunidade Ativa</h4>
                  <p>Conecte-se com pessoas que compartilham seus interesses e construa uma rede de contatos valiosa.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Contato */}
        <section id="contato" className="contato-section animate-section">
          <div className="container">
            <div className="section-badge">Fale Conosco</div>
            <h2>Vamos criar algo <span className="highlight">incrível juntos</span></h2>
            <p>
              Seja você um organizador de eventos, participante ou parceiro, 
              adoraríamos conhecer sua história e como podemos ajudar.
            </p>
            
            <div className="contato-grid">
              <div className="contato-info">
                <div className="contato-item">
                  <div className="contato-icon">📧</div>
                  <div className="contato-details">
                    <h4>Email</h4>
                    <p>contato@eventflow.com</p>
                    <span>Resposta em até 24h</span>
                  </div>
                </div>
                <div className="contato-item">
                  <div className="contato-icon">💬</div>
                  <div className="contato-details">
                    <h4>WhatsApp</h4>
                    <p>(11) 99999-9999</p>
                    <span>Seg-Sex, 9h às 18h</span>
                  </div>
                </div>
                <div className="contato-item">
                  <div className="contato-icon">📍</div>
                  <div className="contato-details">
                    <h4>Localização</h4>
                    <p>São Paulo, SP - Brasil</p>
                    <span>Atendimento remoto</span>
                  </div>
                </div>
              </div>
              
              <div className="contato-form">
                <h3>Envie sua mensagem</h3>
                <form className="contact-form">
                  <div className="form-group">
                    <input type="text" placeholder="Seu nome" required />
                    <input type="email" placeholder="Seu email" required />
                  </div>
                  <input type="text" placeholder="Assunto" required />
                  <textarea placeholder="Sua mensagem..." rows="4" required></textarea>
                  <button type="submit" className="form-button">
                    Enviar Mensagem
                    <span className="button-arrow">→</span>
                  </button>
                </form>
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
              <h4>EventFlow</h4>
              <p>
                Transformando a descoberta de eventos através de tecnologia, 
                curadoria e uma experiência de usuário excepcional.
              </p>
              <div className="social-links">
                <a href="#" aria-label="LinkedIn">💼</a>
                <a href="#" aria-label="Instagram">📷</a>
                <a href="#" aria-label="Twitter">🐦</a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Navegação</h4>
              <ul>
                <li><button onClick={() => scrollToSection('eventos')}>Eventos</button></li>
                <li><button onClick={() => scrollToSection('sobre')}>Sobre</button></li>
                <li><button onClick={() => scrollToSection('contato')}>Contato</button></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Categorias</h4>
              <ul>
                <li><a href="#">Tecnologia</a></li>
                <li><a href="#">Negócios</a></li>
                <li><a href="#">Arte & Cultura</a></li>
                <li><a href="#">Networking</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Suporte</h4>
              <ul>
                <li><a href="#">Central de Ajuda</a></li>
                <li><a href="#">Termos de Uso</a></li>
                <li><a href="#">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 EventFlow. Todos os direitos reservados.</p>
            <p>Feito com ❤️ para conectar pessoas através de eventos</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;