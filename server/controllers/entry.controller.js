 const Entry = require('../models/entry.model.js');
const EntryDetail = require('../models/entrydetail.model.js');

const getEntries = async (req, res) => {
    try {
        const entry = await Entry.find({});
        res.status(200).json(entry);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSingleEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.query;

        let entryData;

        if (type === 'entry') {
            entryData = await Entry.findById(id);
        } else if (type === 'entrydetails') {
            entryData = await EntryDetail.find({});
        } else {
            // Belirtilen model tipi geçerli değilse, uygun bir hata döndür
            return res.status(400).json({ message: 'Invalid type parameter' });
        }

        // Veriyi istemciye gönder
        res.status(200).json(entryData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addEntry = async (req, res) => {
    try {
        const entry = await Entry.create(req.body);
        res.status(200).json(entry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getEntryDetail = async (req, res) => {
    try {
        const entries = await EntryDetail.find({});
        res.status(200).json(entries);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSingleEntryDetail = async (req, res) => {
    try {
        const { id } = req.params;
 
        let entryData = await EntryDetail.findById(id);
     
        res.status(200).json(entryData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addEntryDetail = async (req, res) => {
    try {
        const entryDetail = await EntryDetail.create(req.body);
        res.status(200).json(entryDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteEntry = async (req, res) => {
    try {
        const {id} = req.params;
        const entry = await Entry.findByIdAndDelete(id);
        if (!entry) {
            res.status(200).json({ message: "Entry bulunamadı❓" });
        }
        res.status(200).json(updatedEntry);


    } catch (error) {
        res.status(500).json({message : "Entry başarılı bir şekilde silindi❌"});
        
    }
}

const deleteEntryComment = async (req, res) => {
    try {
        const {id} = req.params;
        const entry = await EntryDetail.findByIdAndDelete(id);
        if (!entry) {
            res.status(200).json({ message: "Entry Comment bulunamadı❓" });
        }
        res.status(200).json(updatedEntry);


    } catch (error) {
        res.status(500).json({message : "Entry Comment başarılı bir şekilde silindi❌"});
        
    }
}

const updateEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const entry = await Entry.findByIdAndUpdate(id, req.body);
        if (!entry) {
            res.status(404).json({ message: "Entry bulunamadı❓" });
        }

        const updatedEntry = await Entry.findById(id);
        res.status(200).json(updatedEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateEntryComment = async (req, res) => {
    try {
        const { id } = req.params;
        const entry = await EntryDetail.findByIdAndUpdate(id, req.body);
        if (!entry) {
            res.status(404).json({ message: "Entry bulunamadı❓" });
        }

        const updatedEntry = await EntryDetail.findById(id);
        res.status(200).json(updatedEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const allCommentEntry = async (req, res) => {
    try {
        const { id } = req.params;

        // Belirli bir entry'nin tüm yorumlarını çek
        const entryComments = await EntryDetail.find({ entryid: id });

        res.status(200).json(entryComments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const mixEntry = async (req, res) => {
    try {
        const randomizedEntries = await Entry.aggregate([{ $sample: { size: 18 } }]); // Örnek olarak 10 entry döndürüyoruz
        res.json(randomizedEntries);

     } catch (error) {
        res.status(500).json({ message: 'Server Error' });

     }
}

module.exports = {
    getEntries,
    getSingleEntry,
    addEntry,
    deleteEntry,
    updateEntry,
    addEntryDetail,
    getEntryDetail,
    deleteEntryComment,
    updateEntryComment,
    getSingleEntryDetail,
    allCommentEntry,
    mixEntry
}