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
    phoneNumber: "+44 110 5791 0234",
    email: "jayprice@outlook.com",
  },
];

const contactsList = document.querySelector(".contacts-list");
const addContactButton = document.querySelector(".contacts-button");

const renderContact = function () {
  contactsList.innerHTML = template({ contacts });

  
};

const savedContacts = localStorage.getItem("contacts");

if (savedContacts) {
  contacts.push(...defaultContacts, ...JSON.parse(savedContacts));
} else {
  contacts.push(...defaultContacts);
}

localStorage.setItem("contacts", JSON.stringify(contacts));

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