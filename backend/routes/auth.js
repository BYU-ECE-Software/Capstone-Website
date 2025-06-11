const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login', 
    passport.authenticate('saml', {
        failureRedirect: '/login/fail', // figure out what we would need this for
    })
);

router.post('/saml/callback',
    passport.authenticate('saml', {
        failureRedirect: '/login/fail',
        failureFlash: true, // what this do?
    }),
    (req, res) => {
        res.redirect('/'); // where do we want to send the user after a successful login?
    }
);

// this route is optional. But probably useful
router.get('/login/fail', (req, res) => {
    res.status(401).send('Login Failure');
});

// this route is for a local logout, not a CAS logout.
router.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        req.session.destroy();
        res.redirect('/'); // or could be a logout confirmation page
    });
});
// we'll need to setup SLO once we get SAML working

// potentially useful route. Suggested by ChatGPT
router.get('/whoami', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).send('Not logged in');
    }
});

module.exports = router;