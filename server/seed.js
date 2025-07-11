// seed.js - Script para popular o banco de dados

const Datastore = require('nedb-promises');

const db = new Datastore({ filename: 'contacts.db', autoload: true });

async function seedDatabase() {
  try {
    await db.remove({}, { multi: true });
    console.log('Banco de dados limpo!');

    const setores = ['Desenvolvimento', 'Design', 'Marketing', 'Recursos Humanos', 'Financeiro'];
    const nomes = ['Ana Clara', 'Bruno Gomes', 'Carla Dias', 'Daniel Alves', 'Eduarda Lima', 'Fábio Melo', 'Gabriela Rocha', 'Heitor Borges', 'Isabela Cruz', 'João Mendes', 'Larissa Nunes', 'Marcos Pires'];
    
    const contatosFicticios = [];
    for (let i = 0; i < 12; i++) {
        const setorAleatorio = setores[Math.floor(Math.random() * setores.length)];
        const nome = nomes[i];
        
        const novoContato = {
            name: nome,
            email: `${nome.split(' ')[0].toLowerCase()}@mmtech.com`,
            phone: `(42) 9${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
            sector: setorAleatorio,
            createdAt: new Date()
        };
        contatosFicticios.push(novoContato);
    }

    await db.insert(contatosFicticios);
    console.log(`${contatosFicticios.length} contatos fictícios criados com sucesso!`);

  } catch (error) {
    console.error('Ocorreu um erro ao popular o banco de dados:', error);
  }
}

seedDatabase();