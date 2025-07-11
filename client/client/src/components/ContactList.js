import React from "react";
import ContactCard from "./ContactCard";
import './ContactList.css'

function ContactList({ contacts, onEdit, onDelete, selectedContactId, onSelectContact }) {
    return (
        <div>
            <div className="contact-list-grid">
            {contacts.map(contact => (
                <ContactCard 
                key={contact._id} 
                contact={contact} 
                onEdit={onEdit}
                onDelete={onDelete}

                isSelected={selectedContactId === contact._id}
                onSelect={() => onSelectContact(contact._id)}
                />
            ))}
            </div>
        </div>
    );
}

export default ContactList