/* 유저 - 해당 날짜 운동 데이터 스키마 */

var utils = require('../utils/utils');

// User_Motion_Schema 객체 선언
var User_Motion_Schema = {};

User_Motion_Schema.createSchema = function(mongoose) {
  console.log('user_motion_shema.js 호출');

  // 스키마 정의
  var UserMotionSchema = mongoose.Schema({
    users: { type: String} // 사람 ID
    , dates: { type: String, index: {unique : false}, 'default' : '' }  // 운동 날짜
    , motions: { type: String}
    , set_num : { type: Number} // 세트 번호
    , set: {type: Number, 'default': '0'}  // 세트
    , kg: {type: Number, 'default': '0'} // 무게
    , created_at : {type : Date, index : {unique : false}, 'default' : Date.now}
    , updated_at : {type : Date, index : {unique : false}, 'default' : Date.now}
  });

  UserMotionSchema.methods = {
    saveUserMotion : function(callback) {
      var usermotion = this;

      this.validate(function(err) {
        if(err) return callback(err);

        usermotion.save(callback);
      });
    }

  }

  UserMotionSchema.statics = {
    // Id, 날짜, 운동동작으로 찾기
    load : function(id, date, motion, callback) {
      this.find({$and: [{users: id}, {dates: date}, {motions: motion}]})
        .populate('users') // 조인
        .exec(callback);
    }
  }

  console.log('UserMotionSchema 정의함');
  return UserMotionSchema;
};

// module.exports로 객체 할당
module.exports = User_Motion_Schema;
