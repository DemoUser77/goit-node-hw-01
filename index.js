import { program } from 'commander';

import contactService from "./contacts.js";

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();


const  invokeAction = async({ action, id, name, email, phone }) =>{
    try {
        switch (action) {
            case 'list':
                const allContact = await contactService.listContacts();
                return console.table(allContact);
            case 'get':
                const oneContact = await contactService.getContactById(id);
                return console.table(oneContact);
            case 'add':
                const newContact = await contactService.addContact( { name, email, phone });
                return console.table(newContact);
            case 'remove':
                const removeContact = await contactService.removeContact(id);
                return console.table(removeContact);
            default:
                console.warn('\x1B[31m Unknown action type!');
        }
    }
    catch (error) {
        console.log(error.message);
    }
}

invokeAction(argv);