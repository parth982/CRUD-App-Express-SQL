const express = require('express');
const router = express.Router();

const {
    All_Data,
    add_Data,
    remove_Data,
    update_Data,
    One_Row
} = require('../controllers/crud_cntrlls');

router.route('/getAll').get(All_Data);
router.route('/insert').post(add_Data);
router.route('/delete/:id').delete(remove_Data);
router.route('/update').patch(update_Data);
router.route('/search/:name').get(One_Row);

module.exports = router;