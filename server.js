const express = require( 'express' );
const session = require( 'express-session' );
const passport = require( 'passport' );
const cors = require( 'cors' );
const FacebookStrategy = require( 'passport-facebook' ).Strategy;
const config = require( './config.js' );

const app = express();
const port = 3000;

app.use( cors() );
app.use( session( { secret: config.mySecrets.secret } ) );
app.use( passport.initialize() );
app.use( passport.session() );
app.use( express.static( `${ __dirname }/public/` ) );

passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.secret,
  callbackURL: config.facebook.url
}, function(token, refreshToken, profile, done) {
  return done(null, profile);
}));

// hits the endpoint, then the above middleware, then the passport.authenticate
app.get( '/auth/facebook', passport.authenticate( 'facebook' ) );
app.get( '/auth/facebook/callback', passport.authenticate( 'facebook', {
    successRedirect: '/#/me'
    , failureRedirect: '/login'
} ) );

passport.serializeUser( ( user, done ) => done( null, user ) );
passport.deserializeUser( ( obj, done ) => done( null, obj ) );

// app.get( '/me', ( req, res ) => {
//   res.send( req.user );
// } );

app.listen( port, () => {
    console.log( `Listening on port ${ port }` );
} );
