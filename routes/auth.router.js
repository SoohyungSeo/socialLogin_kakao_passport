const express = require('express')
const router = express.Router();
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
require("dotenv").config();

const Kakao = require('../schema/users')

passport.use(
    'kakao',
    new KakaoStrategy({
        clientID: process.env.KAKAO_RESTAPI_KEY,
        callbackURL: '/auth/kakao/callback',
        clientSecret: process.env.KAKAO_SECRET_KEY
    },
    async(accessToken, refreshToken, profile, done) => {        
        console.log('kakao profile', profile);
        console.log(accessToken)
        console.log(refreshToken)
        try{
            const exUser = await Kakao.findOne({userId: profile.id, provider:'kakao'});
            if(exUser){
                done(null, exUser)
            } else {
                const newUser = await Kakao.create({                    
                    nickname: profile.displayName,
                    userId: profile.id,
                    provider:'kakao',
                    refresh_token: refreshToken
                });
                done(null, newUser)
            }
        }catch(error){
            console.log(error)
        }
    }
    )
)

router.get('/kakao',passport.authenticate('kakao'));

router.get('/kakao/callback',
    passport.authenticate('kakao'), (req,res)=>{
        res.redirect('/')
    }       
)

passport.serializeUser(function (user, done) {
    done(null, user);
    });
    passport.deserializeUser(function (user, done) {
    done(null, user);
    });

module.exports = router;