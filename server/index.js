const express = require('express');
const cors = require('cors');

const app = express();

const Datastore = require('nedb-promises');

const db = new Datastore({ filename: 'contacts.db', autoload: true });

app.use(cors());
app.use(express.json())

const PORT = 3001;

app.get('/', (req, res) => {
    res.json({ message: "API está funcionando como deveria." });
});

app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}. Listening...`)
})

// Ler / Read (GET)
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await db.find({});
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar contatos.", error: error });
  }
});

// Criar / Create (POST)
app.post('/contacts', async (req, res) => {
  const { name, email, phone, sector } = req.body;

  if (!name || !email || !phone || !sector) {
    return res.status(400).json({ message: "Nome, email, telefone e setor são obrigatórios." });
  }

  try {
    const newContact = { name, email, phone, sector, createdAt: new Date() };
    const createdContact = await db.insert(newContact);
    res.status(201).json(createdContact);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar contato.", error: error });
  }
});

// Atualizar / Modify (PUT)
app.put('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, sector } = req.body;

    try {
        const updatedContact = await db.update(
            { _id: id },
            { $set: { name, email, phone, sector } },
            { returnUpdatedDocs: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ message: "Contato não foi encontrado no banco!!" })
        }

        res.json(updatedContact);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar contato.", error: error });
    }
});

// Remover / Delete (DELETE)
app.delete('/contacts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const numRemoved = await db.remove({ _id: id });

        if (numRemoved === 0) {
            return res.status(404).json({ message: "Contato não foi encontrado no banco!!" })
        }

        res.status(200).json({ message: "Contato deletado com sucesso." })
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar contato.", error: error });
    }
})