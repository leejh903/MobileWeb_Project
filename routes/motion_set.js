var add_motionset = function(req, res) {
  console.log('routes 안에 add_motionset 호출됨');

  // 파라미터 전달된 것들
  var paramId = req.user._id;
  var paramDates_set = req.body.set_dates || req.query.set_dates;
  var paramMotion_set = req.body.set_motion || req.query.set_motion;
  var paramIndex_set = req.body.set_index || req.query.set_index;
  var paramCount_set = req.body.set_count || req.query.set_count;
  var paramKg_set = req.body.set_count_kg || req.query.set_count_kg;
  var paramMotions_set = req.body.set_motions || req.query.set_motions;

  console.log('파라미터 확인');
  console.log('paramId : ' + paramId);
  console.log('paramDates_set : ' + paramDates_set);
  console.log('paramMotion_set : ' + paramMotion_set);
  console.log('paramIndex_set : ' + paramIndex_set);
  console.log('paramCount_set : ' + paramCount_set);
  console.log('paramKg_set : ' + paramKg_set);

  var database = req.app.get('database');

  if(database.db){

    // 업데이트
    database.UserMotionsModel.find({users: paramId, dates: paramDates_set, motions: paramMotion_set, set_num: paramIndex_set}, function(err, results) {
      if(err) {
        console.error('운동동작 정보 조회중 오류 발생 :' + err.stack);

        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>운동동작 정보 조회 중 오류 발생 </h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();

        return;
      }

      if(results && results.length != 0){

        database.UserMotionsModel.findOneAndUpdate({users: paramId, dates: paramDates_set, motions: paramMotion_set, set_num: paramIndex_set}, {set: paramCount_set, kg: paramKg_set}, function(err, results){
          if(err) {
            console.error('운동동작 정보 변경중 오류 발생 :' + err.stack);

            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
            res.write('<h2>운동동작 정보 변경 중 오류 발생 </h2>');
            res.write('<p>' + err.stack + '</p>');
            res.end();

            return;
          }

          console.dir('운동정보 업데이트 성공');
        });

      } else {

        // 새로 생성
        var set_data = new database.UserMotionsModel({
          users: paramId
          , dates: paramDates_set
          , motions: paramMotion_set
          , set_num: paramIndex_set
          , set: paramCount_set
          , kg: paramKg_set
        });

        set_data.saveUserMotion(function(err, results) {
          if(err) {throw err;}

          console.log(paramDates_set + ' 의 ' + paramMotion_set + ' 동작 1세트 추가');

    });

  }
  
  database.MotionDataModel.load(paramMotion_set, function(err, results) {
    if(err) {
      console.error('운동동작 정보 조회중 오류 발생 :' + err.stack);

      res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
      res.write('<h2>운동동작 정보 조회 중 오류 발생 </h2>');
      res.write('<p>' + err.stack + '</p>');
      res.end();

      return;
    }

    if(results && results.length != 0){
      console.dir(results);

      var motions_list = paramMotions_set;
      var motions_Array = motions_list.split(',');
      var Array_length = motions_Array.length;
      var user = req.user;
      var paramDates = paramDates_set;
      var message = '';

      var motion_kor = results[0]._doc.motion;
      var motion_eng = results[0]._doc.motion_eng;
      var picture_path = results[0]._doc.pic_path;
      var exp = results[0]._doc.explanation;

      var set_data=[];

      database.UserMotionsModel.load(paramId, paramDates_set, paramMotion_set, function(err, doc) {

        if(err) {
          console.error('운동동작 정보 조회중 오류 발생 :' + err.stack);

          res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
          res.write('<h2>운동동작 정보 조회 중 오류 발생 </h2>');
          res.write('<p>' + err.stack + '</p>');
          res.end();

          return;
        }

        console.dir('doc: ' + doc);

        if(doc && doc.length != 0){
        set_data = doc;
      } else {
        set_data = ''
      }

      var context = {
        motion_kor, motion_eng, picture_path, exp, motions_list, motions_Array, Array_length, user, paramDates, message, set_data
      };

      console.log(context);

      // 뷰 템플릿 이용하여 렌더링한 후 전송
      return req.app.render('show_info.ejs', context, function(err, html){
        if(err) {throw err;}
        console.log('응답 웹 문서 : ' + html)
        res.end(html);
      });

      })

    }
  })

  });

    } else {
    console.log('데이터베이스와의 연결이 끊어졌습니다');
    res.end();
  }
}


var del_motionset = function(req, res) {
  console.log('routes 안에 add_motionset 호출됨');

  // 파라미터 전달된 것들
  var paramId = req.user._id;
  var paramDates_del = req.body.del_dates || req.query.del_dates;
  var paramMotion_del = req.body.del_motion || req.query.del_motion;
  var paramIndex_del = req.body.del_index || req.query.del_index;
  var paramCount_del = req.body.del_count || req.query.del_count;
  var paramKg_del = req.body.del_count_kg || req.query.del_count_kg;
  var paramMotions_del = req.body.del_motions || req.query.del_motions;

  console.log('파라미터 확인');
  console.log('paramId : ' + paramId);
  console.log('paramDates_set : ' + paramDates_del);
  console.log('paramMotion_set : ' + paramMotion_del);
  console.log('paramIndex_set : ' + paramIndex_del);
  console.log('paramCount_set : ' + paramCount_del);
  console.log('paramKg_set : ' + paramKg_del);

  var database = req.app.get('database');

  if(database.db){

    database.UserMotionsModel.remove({users: paramId, dates: paramDates_del, motions: paramMotion_del, set_num: paramIndex_del}, function(err, results) {
      if(err) {
        console.error('운동동작 정보 조회중 오류 발생 :' + err.stack);

        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>운동동작 정보 조회 중 오류 발생 </h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();

        return;
      }

      console.dir('성공적으로 해당 날짜 세트데이터 삭제!')
    })

    database.MotionDataModel.load(paramMotion_del, function(err, results) {
      if(err) {
        console.error('운동동작 정보 조회중 오류 발생 :' + err.stack);

        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>운동동작 정보 조회 중 오류 발생 </h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();

        return;
      }

      if(results && results.length != 0){
        console.dir(results);

        var motions_list = paramMotions_del;
        var motions_Array = motions_list.split(',');
        var Array_length = motions_Array.length;
        var user = req.user;
        var paramDates = paramDates_del;
        var message = '';

        var motion_kor = results[0]._doc.motion;
        var motion_eng = results[0]._doc.motion_eng;
        var picture_path = results[0]._doc.pic_path;
        var exp = results[0]._doc.explanation;

        var set_data=[];

        database.UserMotionsModel.load(paramId, paramDates_del, paramMotion_del, function(err, doc) {

          if(err) {
            console.error('운동동작 정보 조회중 오류 발생 :' + err.stack);

            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
            res.write('<h2>운동동작 정보 조회 중 오류 발생 </h2>');
            res.write('<p>' + err.stack + '</p>');
            res.end();

            return;
          }

          console.dir('doc: ' + doc);

          if(doc && doc.length != 0){
          set_data = doc;
        } else {
          set_data = ''
        }

        var context = {
          motion_kor, motion_eng, picture_path, exp, motions_list, motions_Array, Array_length, user, paramDates, message, set_data
        };

        console.log(context);

        // 뷰 템플릿 이용하여 렌더링한 후 전송
        return req.app.render('show_info.ejs', context, function(err, html){
          if(err) {throw err;}
          console.log('응답 웹 문서 : ' + html)
          res.end(html);
        });

        })

      }
    })

    } else {
    console.log('데이터베이스와의 연결이 끊어졌습니다');
    res.end();
  }
}


module.exports.add_motionset = add_motionset;
module.exports.del_motionset = del_motionset;
