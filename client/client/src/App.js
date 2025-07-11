import React, { useState, useEffect, useRef } from "react";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import './App.css';

function App() {
  const [ contacts, setContacts ] = useState([]);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ editingContact, setEditingContact ] = useState(null);

  const [ selectedContactId, setSelectedContactId ] = useState(null);

  const [ isFabVisible, setIsFabVisible ] = useState(true);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ sectorFilter, setSectorFilter ] = useState('Todos');
  const lastScrollY = useRef(0);

  
  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:3001/contacts');
      const data = await response.json();
      
      setContacts(data);
      
      // console.log("Contatos recebidos do backend:", data);

    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current){
        setIsFabVisible(false);
      } else {
        setIsFabVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectContact = (contactId) => {
    if (selectedContactId === contactId) {
      setSelectedContactId(null);
    } else {
      setSelectedContactId(contactId);
    }
  }

  const handleSave = () => {
    setIsModalOpen(false);
    setEditingContact(null);
    fetchContacts();
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };
  
  const handleAddNew = () => {
    setEditingContact(null);
    setIsModalOpen(true);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingContact(null)
  }
  
  const handleDelete = async (contactId) => {
    if (window.confirm("Tem certeza que deseja deletar este contato?")) {
      try {
        await fetch(`http://localhost:3001/contacts/${contactId}`, {
          method: 'DELETE',
        });
        fetchContacts();
      } catch (error) {
        console.error("Erro ao deletar contato:", error);
        alert('Um erro ocorreu ao deletar o contato.');
      }
    }
  };

  const filteredContacts = contacts
  .filter(contact => {
    if (sectorFilter === 'Todos') {
      return true;
    }
    return contact.sector === sectorFilter;
  })
  .filter(contact => {
    const term = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term) ||
      contact.phone.toLowerCase().includes(term) ||
      contact.sector.toLowerCase().includes(term)
    );
  });

  return (
    <div className="page-container">
      <h1 className="page-title">CONTATOS DA EMPRESA</h1>
      <hr className="hr"/>

      <div className="search-container">
        <i className="fas fa-search search-icon"></i> 
        <input 
          type="text" 
          placeholder="Buscar por nome, email, telefone ou setor..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
          <select className="sector-filter" value={sectorFilter} onChange={(e) => setSectorFilter(e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="Desenvolvimento">Desenvolvimento</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Recursos Humanos">Recursos Humanos</option>
            <option value="Financeiro">Financeiro</option>
          </select>
      </div>

        <ContactList 
          contacts={filteredContacts}

          onEdit={handleEdit}
          onDelete={handleDelete}

          selectedContactId={selectedContactId}
          onSelectContact={handleSelectContact}
        />

      {!isModalOpen && (
        <button 
          className={`fab-add-button ${isFabVisible ? 'visible' : 'hidden'}`} 
          onClick={handleAddNew}>
            Adicionar Contato
        </button>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ContactForm 
              onSave={handleSave}
              onCancel={handleCancel}
              onDelete={handleDelete}
              contactToEdit={editingContact}
            />
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
