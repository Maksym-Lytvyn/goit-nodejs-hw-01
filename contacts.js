const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");
const dirName = 'db';

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    return [];
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const filteredContacts = contacts.find(
    (contactToFind) => contactToFind.id === contactId
  );
  console.log(filteredContacts) || console.log(null);
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((c) => c.id === contactId);
    if (index !== -1) {
      const removedContact = contacts.splice(index, 1)[0];
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return removedContact;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
