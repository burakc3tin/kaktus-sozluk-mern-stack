const express = require('express');
const router = express.Router();
const {deleteEntryComment,getEntries,mixEntry,allCommentEntry, getSingleEntry, addEntry, getSingleEntryDetail,deleteEntry, updateEntry, updateEntryComment, getEntryDetail, addEntryDetail} = require('../controllers/entry.controller');
const loginMiddleware = require('../middleware/login.middleware.js');
const authToken = require('../middleware/auth.middleware');

router.get('/', getEntries );
router.get('/:id', getSingleEntry );
router.get('/entrysingle', getEntryDetail );
router.get('/entrycommentsingle/:id', getSingleEntryDetail );
router.get('/allcomment/:id', allCommentEntry );
router.get('/mixentry',mixEntry);

router.post('/', authToken, addEntry );
router.post('/add', authToken, addEntryDetail );

router.delete('/:id', deleteEntry);
router.delete('/entrycomment/:id', deleteEntryComment);

router.put('/:id', updateEntry);
router.put('/entrycomment/:id', updateEntryComment);

module.exports = router;