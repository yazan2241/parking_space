var express = require('express');
var router = express.Router();
var query = require('../Config/queries');

var cors = require('cors');
router.use(cors()); 

router.post('/addSpace', query.createSpace);
router.get('/getSpaces' , query.getSpaces);
router.delete('/deleteSpace/:id' , query.deleteSpace);
router.put('/updateSpace/:id' , query.updateSpace);
router.get('/getSpace/:id' , query.getSpace);


module.exports = router;