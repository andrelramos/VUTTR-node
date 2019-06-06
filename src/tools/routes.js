import { express } from 'express'
import { get_all_tools } from "./controllers"

const router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(get_all_tools());
});

module.exports = router;