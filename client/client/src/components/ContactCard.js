import React, { useState } from 'react';
import './ContactCard.css';

const getSectorClass = (sector) => {
  switch (sector) {
    case 'Desenvolvimento':
      return 'tag-dev';
    case 'Design':
      return 'tag-design';
    case 'Marketing':
      return 'tag-marketing';
    case 'Recursos Humanos':
      return 'tag-rh';
    case 'Financeiro':
      return 'tag-financeiro';
    default:
      return '';
  }
}

function ContactCard({ contact, onEdit, onDelete, isSelected, onSelect }) {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    
    setTimeout(() => {
      setCopiedField(null);
    }, 1500);
  };

  return (
    <div 
      className={`contact-card ${isSelected ? 'expanded' : ''}`} 
      onClick={onSelect}
    >
      <div className="card-header">
        <h3>{contact.name}</h3>
        <p className={`sector-tag ${getSectorClass(contact.sector)}`}>{contact.sector}</p>
      </div>

      {isSelected && (
        <div className="card-details">
          <p>
            <strong>Email:</strong> {contact.email}
            <i 
              className={`fas ${copiedField === 'email' ? 'fa-check' : 'fa-copy'} copy-icon`}
              onClick={(e) => { e.stopPropagation(); handleCopy(contact.email, 'email'); }}
            ></i>
          </p>
          <p>
            <strong>Telefone:</strong> {contact.phone}
            <i 
              className={`fas ${copiedField === 'phone' ? 'fa-check' : 'fa-copy'} copy-icon`}
              onClick={(e) => { e.stopPropagation(); handleCopy(contact.phone, 'phone'); }}
            ></i>
          </p>
        </div>
      )}

      {isSelected && (
        <i 
          className="fas fa-cog action-icon" 
          onClick={(e) => { 
            e.stopPropagation();
            onEdit(contact); 
          }}
        ></i>
      )}
    </div>
  );
}

export default ContactCard;