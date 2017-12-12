/**
 * 패스포트 설정 파일
 *
 * 구글 인증 방식에 사용되는 패스포트 설정
 *
 * @date 2016-11-10
 * @author Mike
 */

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../config');

module.exports = function(app, passport) {
	return new GoogleStrategy({
    	clientID: config.google.clientID,
    	clientSecret: config.google.clientSecret,
    	callbackURL: config.google.callbackURL
	}, function(accessToken, refreshToken, profile, done) {
		console.log('passport의 google 호출됨.');
		console.dir(profile);

		var database = app.get('database');
	    database.UserModel.findOne({'email' : profile.emails[0].value}, function (err, user) {
			if (err) return done(err);

			// 기존에 같은 메일이 존재하지 않으면 새로 생성
			if (!user) {
				var user = new database.UserModel({
							name: profile.displayName,
			        email: profile.emails[0].value,
			        provider: 'google',
			        google: profile._jsons
				});

				user.save(function (err) {
					if (err) console.log(err);
					console.log('새 사용자 등록함');
					return done(err, user);
				});
			}
			// 기존 회원 경우 바로 로그인
			else {
				console.log('기존 사용자 접속함');
				return done(err, user);
			}
	    });
	});
};
