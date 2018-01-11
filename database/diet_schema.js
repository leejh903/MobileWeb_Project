/* 식사 일지 - 해당날짜 관련 스키마 선언 */

var utils = require('../utils/utils');

// Diet_schema 객체 선언
var Diet_Schema = {};

// Schema에 diet_schema 함수 선언
Diet_Schema.createSchema = function(mongoose) {
  console.log('diet_schema.js 호출')

  // 스키마 정의
  var DietSchema = mongoose.Schema({
    users: { type: String, required: true }
    , dates: { type: String, index: {unique : false}, required: true }
    , meals: { type: Number}  // 0:아침, 1:점심, 2:저녁, 3:간식
    , contents: { type: String}
    , created_at : {type : Date, index : {unique : false}, 'default' : Date.now}
    , updated_at : {type : Date, index : {unique : false}, 'default' : Date.now}
  });

  DietSchema.methods = {
    saveDiet : function(callback) {
      var diet = this;

      this.validate(function(err) {
        if(err) return callback(err);

        diet.save(callback);
      });
    }
  }

  DietSchema.statics = {
    load: function(id, date, meal, callback){
      this.find({$and:[{users: id},{dates: date},{meals: meal}]})
        .exec(callback);
    }
  }

  console.log('DietSchema 정의함 ');
  return DietSchema;
};

module.exports = Diet_Schema;
