const router = require('express').Router();
const { Profloss, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // // Get all projects and JOIN with user data
    // const userData = await User.findAll({
    //   include: [{model: Profloss},{model: Category}]
    // });

    // // Serialize data so the template can read it
    // const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('profile', { 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/project/:id', async (req, res) => {
//   try {
//     const projectData = await Project.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const project = projectData.get({ plain: true });

//     res.render('project', {
//       ...project,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    console.log('We are hitting the profile route');
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.userid, {
      attributes: { exclude: ['password'] },
      include: [{model: Profloss}],
    });
    const proflossData = await Profloss.findAll({
        where:{
            userid: userData.dataValues.id

        }
    })
    const cleaneduparray = proflossData.map((item)=> item.get({plain:true}))
    console.log(cleaneduparray);
    const user = userData.get({ plain: true });

    res.render('profile', {
      cleaneduparray,
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profiledata', withAuth, async (req, res) => {
    console.log('We are hitting the profile route');
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.userid, {
      attributes: { exclude: ['password'] },
      include: [{model: Profloss}],
    });
    const proflossData = await Profloss.findAll({
        where:{
            userid: 1
            // userData.dataValues.id
        }
    })
    const profiles = proflossData.map((item)=> item.get({plain:true}))
    console.log(profiles);
    const user = userData.get({ plain: true });

    // res.render('profile', {
    //   cleaneduparray,
    //   ...user,
    //   logged_in: true
    // });
    res.json(profiles);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
