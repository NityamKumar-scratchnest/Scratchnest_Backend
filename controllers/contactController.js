import Contact from "../models/Contact.js";


export const addContact = async (req, res) => {
  try {
    const { name, email, phone, message, reason } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
      reason
    });

    res.json({
      message: "Contact request submitted",
      contact
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit contact form", error: err.message });
  }
};


export const getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
};

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await Contact.findByIdAndUpdate(id, { status });

  res.json({ message: "Status updated successfully" });
};


export const deleteContact = async (req, res) => {
  const { id } = req.params;

  await Contact.findByIdAndDelete(id);

  res.json({ message: "Contact deleted successfully" });
};
