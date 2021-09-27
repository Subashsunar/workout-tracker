const router = require("express").Router();
const { Workout } = require("../../models/");

router.get("/", function (req, res) {
    Workout.aggregate([
        { 
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ]).then((response) => {
    res.json(response);
  });
});
router.put("/:id", function (req, res) {
  Workout.findOneAndUpdate(req.params.id, { $push: { exercises: req.body } },
    { new: true }).then((response) => {res.json(response)});
});
router.post('/', function (req, res) {
    Workout.create({}).then(( response) => {res.json(response)})
})
router.get('/range', function (req, res) {
    Workout.aggregate([
        { 
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ]).sort({_id: -1}).limit(7).then(( response) => {res.json(response)})
})

module.exports = router;
