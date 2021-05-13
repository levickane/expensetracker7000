const router = require('express').Router();
const { Profloss } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/newexpense', withAuth, async (req, res) => {
  try {
    const newExpense = await Profloss.create({
      ...req.body,
      userid: req.session.userid,
    });

    res.status(200).json(newExpense);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const proflossData = await Profloss.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!proflossData) {
      res.status(404).json({ message: 'No profloss found with this id!' });
      return;
    }

    res.status(200).json(proflossData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
