
/* 라우팅 정보 설정 모듈 파일
 * 사용자 추가를 위한 DB url, DB 스키마, 라우팅 정보 설정
*/

module.exports = {
    //속성 설정
	server_port: 3000,
	db_url: 'mongodb://localhost:27017/local',
	db_schemas: [//db 스키마
	    {file:'./user_schema', collection:'users4', schemaName:'UserSchema', modelName:'UserModel'}
	],
	route_info: [
	],
	facebook: {		// passport facebook
		clientID: '1442860336022433',
		clientSecret: '13a40d84eb35f9f071b8f09de10ee734',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {		// passport twitter
		clientID: 'id',
		clientSecret: 'secret',
		callbackURL: '/auth/twitter/callback'
	},
	google: {		// passport google
		clientID: 'id',
		clientSecret: 'secret',
		callbackURL: '/auth/google/callback'
	}
}
