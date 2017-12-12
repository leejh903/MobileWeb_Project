
/* 라우팅 정보 설정 모듈 파일
 * 사용자 추가를 위한 DB url, DB 스키마, 라우팅 정보 설정
*/

module.exports = {
    //속성 설정
	server_port: 3000,
	db_url: 'mongodb://localhost:27017/memberDB',
	db_schemas: [//db 스키마
	    {file:'./user_schema', collection:'members', schemaName:'UserSchema', modelName:'UserModel'}
	],

	// 라우팅 모듈 적는 곳
	route_info: [
		// 라우팅 처리 할 file, type(get or post, 처리방법), path, method 필요
	],

	facebook: {		// passport facebook
		clientID: '1442860336022433',
		clientSecret: '13a40d84eb35f9f071b8f09de10ee734',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	google: {		// passport google
		clientID: '806879796918-1f5kvth04q2so69oftgumlj85h4dk8i4.apps.googleusercontent.com',
		clientSecret: 'RqbLa5gUVH09YmF7LDltQM4H',
		callbackURL: '/auth/google/callback'
	}
}
