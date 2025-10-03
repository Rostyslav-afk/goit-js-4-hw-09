import template from "../handlebars/contact-template.hbs";

const contacts = [];

const defaultContacts = [
  {
    photoLink: "https://s3.eu-central-1.amazonaws.com/uberall-userpics-prod/3690366/medium_GyPAdoLu9q.png",
    name: "Pizza Hut",
    phoneNumber: "+44 020 8751 8751",
    email: "pizzahut@gmail.com",
  },
  {
    photoLink: "https://images.stockcake.com/public/3/e/e/3eecfb4e-a7ed-467f-b01d-ab9c473647a0_medium/intense-male-gaze-stockcake.jpg",
    name: "Jay Price",
    phoneNumber: "+44 110 0751 1904",
    email: "jayprice@outlook.com",
  },
];

const contactsList = document.querySelector(".contacts-list");
const addContactButton = document.querySelector(".contacts-button");

const renderContact = function () {
  contactsList.innerHTML = template({ contacts });
};

const normalizePhone = phone => phone.replace(/\D/g, "");

const editContacts = function () {
  const inputRaw = prompt("Write the phone number of the contact you want to edit").trim();
  const inputPhone = normalizePhone(inputRaw);

  const contact = contacts.find(c => normalizePhone(c.phoneNumber) === inputPhone);

  if (!contact) {
    alert("Contact not found");
    return;
  }

  const whatToEdit = prompt("What do you want to edit? 1 - Photo 2 - Name 3 - Phone 4 - Email").trim();

  switch (whatToEdit) {
    case "1": {
      const newPhoto = prompt("Insert new photo link", contact.photoLink);
      if (newPhoto) contact.photoLink = newPhoto;
      break;
    }
    case "2": {
      const newName = prompt("Insert new name", contact.name);
      if (newName) contact.name = newName;
      break;
    }
    case "3": {
      const newPhone = prompt("Insert new phone number", contact.phoneNumber);
      if (newPhone) contact.phoneNumber = newPhone;
      break;
    }
    case "4": {
      const newEmail = prompt("Insert new email", contact.email || "");
      if (newEmail) contact.email = newEmail;
      break;
    }
    default:
      alert("Invalid option");
  }

  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContact();
};


const savedContacts = localStorage.getItem("contacts");

if (savedContacts) {
  contacts.push(...JSON.parse(savedContacts));
} else {
  contacts.push(...defaultContacts);
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

renderContact();

addContactButton.addEventListener("click", () => {
  const photoLink = prompt("Photo (must be a link).");
  const name = prompt("Name and surname.");
  const phoneNumber = prompt("Phone number.");
  const email = prompt("Email.");

  const newContact = { photoLink, name, phoneNumber, email };
  contacts.push(newContact);

  localStorage.setItem("contacts", JSON.stringify(contacts));

  renderContact();
});

const editContactButton = document.querySelector(".item-buttonn");

editContactButton.addEventListener("click", editContacts);
