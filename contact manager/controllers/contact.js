const User = require ("../models/user.js");
const Contact = require ("../models/contact.js");


const createContact = async (req, res) => {
    try {
        const {fullName, email, phone } = req.body;
        const userId = req.user.id;


        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized!" });
          }

        if(!fullName || !email || !phone)
            return res.status(400).json({
        message: "All fields are required"
        })

        const contact = new Contact ({
            fullName,
            email,
            phone,
            owner : userId
        })

        await contact.save();
        return res.status(201).json({ message: "Contact created successfully!"});

    } catch (error) {
        res.status(400).json("something went wrong, contact creation faild!")
    }
}

const getMyContact = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized access!" });
    }

    try {
        const contacts = await Contact.find({ owner: req.user.id });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Server error occurred!" });
    }
}

const updateMyContact = async (req, res) => {
    try {
        const { id } = req.params; 
        const { fullName, email, phone } = req.body; 

        const contact = await Contact.findOne({ _id: id, owner: req.user.id });

        if (!contact) {
            return res.status(404).json({ message: "Contact not found or unauthorized access!" });
        }

        if (fullName) contact.fullName = fullName;
        if (email) contact.email = email;
        if (phone) contact.phone = phone;

        await contact.save(); 

        res.json({ message: "Contact updated successfully!", contact });
    } catch (error) {
        res.status(500).json({ message: "Server error occurred!" });
    }
}


module.exports = {
    createContact,
    getMyContact,
    updateMyContact
}