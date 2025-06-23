const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const fs = require('fs');
const path = require('path');
const samlConfig = require('../config/saml.json');

passport.serializeUser((user, done) => {
    done(null, user); // depending on what our saml profile returns this could be just a couple attributes or an ID instead of the whole user object
});
passport.deserializeUser((user, done) => {
    done(null, user); // ^^^. Also, instead of deserializing from the session, we might just want to pull from the DB
});

const samlStrategy = new SamlStrategy(
    {
        callbackUrl: samlConfig.callbackUrl,
        entryPoint: samlConfig.entryPoint,
        issuer: samlConfig.issuer,


        cert: '-----BEGIN CERTIFICATE-----\nFAKECERT\n-----END CERTIFICATE-----', //fs.readFileSync(path.resolve(__dirname, '..', samlConfig.idpCertPath), 'utf-8'),
        privateKey: fs.existsSync(path.resolve(__dirname, '..', samlConfig.privateKeyPath), 'utf-8') //privateCert instead of privateKey???
            ? fs.readFileSync(path.resolve(__dirname, '..', samlConfig.privateKeyPath), 'utf-8')
            : null,
    },
    (profile, done) => {
        //console.log('SAML Profile:', profile);
        // put our custom post-login logic here. Look something up in DB? Check the roles and permissions?
        return done(null, profile);
    }
);

passport.use(samlStrategy);