/* 모션에 대한 데이터 스키마 */

var utils = require('../utils/utils');

// Motion_Data_Schema 객체 선언
var Motion_Data_Schema = {};

Motion_Data_Schema.createSchema = function(mongoose) {
  console.log('moion_data_schema.js 호출');

  // 스키마 정의
  var MotionDataSchema = mongoose.Schema({
    motion : { type: String, index: {unique : false} }
    , motion_eng : { type: String}
    , pic_path : {type: String}
    , explanation : {type: String}
  });

  MotionDataSchema.methods = {
    saveMotionData : function(callback) {
      var motiondata = this;

      this.validate(function(err) {
        if(err) return callback(err);

        motiondata.save(callback);
      });
    }
  }

  MotionDataSchema.statics = {
    // motion으로 찾기
    load : function(motions, callback) {
      this.find({motion: motions})
        .exec(callback);
    }
  }

  console.log('MotionDataSchema 정의함');
  return MotionDataSchema;
}

// module.exports로 객체 할당
module.exports = Motion_Data_Schema;
