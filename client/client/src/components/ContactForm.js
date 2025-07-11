import React, { useEffect, useState } from "react";
import './ContactForm.css'
import { IMaskInput } from 'react-imask';

function ContactForm ({ onSave, onCancel, onDelete, contactToEdit }) {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ sector, setSector ] = useState('Desenvolvimento');

    const isEditing = !!contactToEdit;

    useEffect(() => {
        if (isEditing) {
            setName(contactToEdit.name);
            setEmail(contactToEdit.email);
            setPhone(contactToEdit.phone);
            setSector(contactToEdit.sector);
        } else {
            setName('');
            setEmail('');
            setPhone('');
            setSector('Desenvolvimento');
        }
    }, [contactToEdit, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (phone.length !== 10 && phone.length !== 11) {
            alert('Por favor, preencha o telefone completamente.');
            return;
        }
        const contactData = { name, email, phone, sector };

        const url = isEditing
            ? `http://localhost:3001/contacts/${contactToEdit._id}`
            : 'http://localhost:3001/contacts/';

        const method = isEditing ? 'PUT' : 'POST';        

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData),
            });

            if (!response.ok) {
                throw new Error('Falha ao criar contato.')
            }

            onSave();
        } catch (error) {
            console.error(error);
            alert('Não foi possível salvar o contato.');
        }
    };

    return (
        <div className="contact-form relative-container">
            <div className="modal-header">
                <h2>{isEditing ? 'Editar Contato' : 'Adicionar Novo Contato'}</h2>
                <button type="button" className="btn-close" onClick={onCancel}>
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <h4>Digite o Nome Completo:</h4>
                    <input type="text" className="form-control" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <h4>Digite o E-mail:</h4>
                    <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required  />
                </div>

                <div className="form-group">
                    <h4>Digite o Telefone:</h4>
                    <IMaskInput
                      mask={[
                        { mask: '(00) 0000-0000' },
                        { mask: '(00) 00000-0000' }
                      ]}
                      value={phone}
                      unmask={true}
                      onAccept={(value) => setPhone(value)}
                      className="form-control"
                      placeholder="(XX) XXXXX-XXXX"
                      required
                    />
                </div>

                <div className="form-group">
                    <h4>Selecione um Setor:</h4>
                    <select id="sector" className="form-control" value={sector} onChange={(e) => setSector(e.target.value)}>
                        <option value="Desenvolvimento">Desenvolvimento</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Recursos Humanos">Recursos Humanos</option>
                        <option value="Financeiro">Financeiro</option>
                    </select>
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-primary">Salvar</button>
                    {isEditing && (
                        <button type="button" className="btn-danger" onClick={() => { if (window.confirm("Tem certeza que deseja deletar este contato?")) { onDelete(contactToEdit._id); onCancel(); } }}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default ContactForm;