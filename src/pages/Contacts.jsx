import { useState } from "react";
import { useLocalStorage } from "../hooks/Uselocalstorage";

const EMPTY_CONTACT = { name: "", company: "", role: "", email: "", phone: "", notes: "" };

export default function Contacts() {
  const [contacts, setContacts] = useLocalStorage("ch_contacts", []);
  const [formData, setFormData] = useState(EMPTY_CONTACT);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addContact = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setContacts([...contacts, { id: crypto.randomUUID(), ...formData }]);
    setFormData(EMPTY_CONTACT);
  };

  const removeContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <div className="contacts-page">
      <h1>Contacts</h1>

      <form className="contact-form" onSubmit={addContact}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} />
        <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />
        <button type="submit" className="btn-add">
          + Add Contact
        </button>
      </form>

      <div className="contact-list">
        {contacts.map((contact) => (
          <div key={contact.id} className="contact-card">
            <h3>{contact.name}</h3>
            {(contact.company || contact.role) && (
              <p className="listing-meta">
                {[contact.role, contact.company].filter(Boolean).join(" at ")}
              </p>
            )}
            {contact.email && <p className="listing-meta">{contact.email}</p>}
            {contact.phone && <p className="listing-meta">{contact.phone}</p>}
            {contact.notes && <p className="listing-description">{contact.notes}</p>}

            <button className="btn-remove" onClick={() => removeContact(contact.id)}>
              Remove
            </button>
          </div>
        ))}

        {contacts.length === 0 && <p className="dashboard-empty">No contacts yet.</p>}
      </div>
    </div>
  );
}
