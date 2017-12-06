
/* 라우팅 정보 설정 모듈 파일
 * 사용자 추가를 위한 DB url, DB 스키마, 라우팅 정보 설정
*/

module.exports = {
    //속성 설정
	server_port: 3000,
	db_url: 'mongodb://localhost:27017/local',
	db_schemas: [//db 스키마
	    {file:'./user_schema', collection:'users3', schemaName:'UserSchema', modelName:'UserModel'}
	],
	route_info: [//라우팅 정보
	    // user.js 모듈 파일에 선언된 함수를 로딩하여 처리하도록 설정(요청패스, 실행함수, 전송방식)
	    {file:'./user', path:'/process/login', method:'login', type:'post'},	// user.login 
	    {file:'./user', path:'/process/adduser', method:'adduser', type:'post'},// user.adduser 
	    {file:'./user', path:'/process/listuser', method:'listuser', type:'post'}//user.listuser 
	]
}
