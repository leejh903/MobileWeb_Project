
/* 유저 - 해당날짜 관련 스키마 선언 */

var utils = require('../utils/utils');

// Info_Schema 객체 선언
var Info_Schema = {};

//Schema에 user_info_Schema 함수 선언
Info_Schema.createSchema = function(mongoose) {
  console.log('data_schema.js 호출')

  // 스키마 정의
  var InfoSchema = mongoose.Schema({
    // members 콜렉션의 ObjectId를 user로 씀
    users: { type: mongoose.Schema.ObjectId, ref: 'members'} // 사람 ID
    , dates: { type: String, index: {unique : false}, 'default' : '' }  // 운동 날짜
    , motions: { type: String}  // 운동 동작들
    , amounts: [{
        motion: { type: mongoose.Schema.ObjectId, ref: 'infos'} // 자기 테이블에 있는 필드 쓸수있을까?
        , set: {type: Number, 'default': '0'} // 세트
        , kg: {type: Number, 'default': '0'} // 무게
      }]
    , created_at : {type : Date, index : {unique : false}, 'default' : Date.now}
    , updated_at : {type : Date, index : {unique : false}, 'default' : Date.now}
  });

  InfoSchema.methods = {
    saveInfo : function(callback) {  // 운동 저장
      var info = this;

      this.validate(function(err){
        if(err) return callback(err);

        info.save(callback);
      });
    }
  //
  //   addAmounts: function(motions, amount, callback){
  //     this.amount.push({
  //       motion: motions.motion,
  //       set: amount.set,
  //       kg: amount.kg
  //     });
  //     this.save(callback);
  //   },
  //
  //   removeAmounts: function(id, callback){
  //     var index = utils.indexOf(this.amounts, {id : id});
  //
  //     if(~index) {
  //       this.comment.splice(index, 1);
  //     } else {
  //       return callback('동작 [' + id + ']를 가진 객체를 찾을 수 없습니다.')
  //     }
  //     this.save(callback);
  // }
}

  InfoSchema.statics = {
    // Id로 날짜, 운동동작 찾기
    load: function(id, date, callback){
      this.find({$and:[{users: id},{dates: date}]})
        .populate('users') // 조인
        // .populate('motions')
        // .populate('amounts.motion')
        .exec(callback);
  }
  //   list: function(options, callback) {
  //     var criteria = options.criteria || {};
  //
  //     this.find(criteria)
  //       .populate('dates')
  //       .sort({'created_at': -1})
  //       .exec(callback);
  // }
}

  console.log('InfoSchema 정의함.');
  // InfoSchema 객체를 만들어 호출한 곳으로 반환
  return InfoSchema;
};

// module.exports에 date_Schema 객체 직접 할당
module.exports = Info_Schema;
