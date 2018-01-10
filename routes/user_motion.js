var del_usermotion = function(req, res) {
  console.log('routes 안에 del_usermotion 호출됨');

  // 파라미터 전달된 것들
  var paramId = req.user._id;
  var paramMotion_del = req.body.del_motion || req.query.del_motion
  var paramDates_del = req.body.del_dates || req.query.del_dates

  console.log('paramId : ' + paramId);
  console.log('paramMotion_del : ' + paramMotion_del);
  console.log('paramDates_del : ' + paramDates_del);

  var database = req.app.get('database');

  if(database.db){


    })
  }else {
    console.log('데이터베이스와의 연결이 끊어졌습니다');
    res.end();
  }
}


module.exports.del_usermotion = del_usermotion;
