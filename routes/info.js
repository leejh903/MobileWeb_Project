
var addinfo = function(req, res) {
  console.log('info 모듈 안에 있는 addinfo가 호출됨')

  var paramId = req.user._id;
  var paramMotion_del = req.body.del_motion || req.query.del_motion

  var paramsMotions = req.body.motions || req.query.motions;
  var paramsDates = req.body.dates || req.query.dates;
  var paramUser = req.user.email;

  // 날짜 선택이 안되면 message 보내기
  if(paramsDates === undefined || paramDates.length == 0){
    console.log('날짜 데이터가 안 들어옴');
    var motion_kor = '';
    var motion_eng = '';
    var picture_path = '';
    var exp = '';

    var motions_list = '';
    var motions_Array = motions_list.split('');
    var Array_length = motions_Array.length;
    var user = req.user;
    var paramDates = '';
    var message = '날짜를 선택하세요!!';

    var set_data='';

    var context = {
          motion_kor, motion_eng, picture_path, exp, motions_list, motions_Array, Array_length, user, paramDates, message, set_data
    };
    return res.render('show_info.ejs', context, function(err, html){
      if(err) {throw err;}
      res.end(html);
    });
  };

  // 운동 동작이 선택이 안되도 showinfo로 넘겨서 달력에 그 날짜 표시되도록
  if(paramsMotions === undefined){
    paramsMotions = '';
  };

  console.log('요청 파라미터 : ' + paramsMotions + ',' + paramsDates + ',' + paramUser);

  var database = req.app.get('database');

  // 운동동작 삭제
  database.UserMotionsModel.remove({users: paramId, dates: paramsDates, motions: paramMotion_del}, function(err, results) {
    if(err) {
      console.error('운동동작 정보 조회중 오류 발생 :' + err.stack);

      res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
      res.write('<h2>운동동작 정보 조회 중 오류 발생 </h2>');
      res.write('<p>' + err.stack + '</p>');
      res.end();

      return;
    }

    console.dir('성공적으로 해당 날짜 모션데이터 삭제!');
    }
    )


  // 데이터베이스 객체가 초기화된 경우
  if(database.db) {
    // 이메일을 사용해 사용자 검색
    database.UserModel.findByEmail(paramUser, function(err, results) {
      if(err) {
        console.error('운동동작 추가 중 오류 발생 : ' + err.stack);

        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>운동동작 정보 추가 중 오류 발생 </h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();
      }

      if(results == undefined || results.length < 1) {
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>사용자를 찾을 수 없습니다 </h2>');
        res.end();
        return;
      }

      var userObjectId = results[0]._doc._id;
      console.log('사용자 ObjectId : ' + paramUser + '->' + userObjectId);

      // 기존 같은 날짜에 데이터 있으면 업데이트
      database.InfoModel.findOneAndUpdate({users: userObjectId, dates: paramsDates}, {motions: paramsMotions}, function(err, results){

        if(results == undefined || results.length < 1){

          // 기존 같은 날짜에 데이터가 없다면
          // save()로 저장
          var info = new database.InfoModel({
            motions: paramsMotions,
            dates: paramsDates,
            users: userObjectId
          });

          info.saveInfo(function(err, result) {
            if(err) {throw err;}

            console.log("운동동작 추가함")


          });
        }

        return res.redirect('/showinfo?dates='+paramsDates);
      })

})
}
}

var showinfo = function(req, res){
  console.log('info 모듈 안에 있는 showinfo 호출됨');

  // URL 파라미터로 전달됨
  var paramId = req.user._id;
  var paramDates = req.body.dates || req.query.dates

  console.log('요청 파라미터 : ' + paramId);
  console.log('요청 파라미터 : ' + paramDates);

  var database = req.app.get('database');

  // 데이터베이스 객체가 초기화된 경우
  if(database.db){

    database.InfoModel.load(paramId, paramDates, function(err, results) {
      if(err) {
        console.error('운동동작 정보 조회중 오류 발생 :' + err.stack);

        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>운동동작 정보 조회 중 오류 발생 </h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();

        return;
      }

      if(results && results.length != 0 && results[0]._doc.motions.length > 0){
        console.dir(results);
        console.dir('데이터 렌더링 준비')
        var motion_kor = '';
        var motion_eng = '';
        var picture_path = '';
        var exp = '';

        var motions_list = results[0]._doc.motions;
        var motions_Array = motions_list.split(',');
        var Array_length = motions_Array.length;
        var user = req.user;
        var message = '';

        var set_data='';

        var context = {
          motion_kor, motion_eng, picture_path, exp, motions_list, motions_Array, Array_length, user, paramDates, message, set_data
        };

        // 뷰 템플릿을 이용하여 렌더링한 후 전송
        return req.app.render('show_info.ejs', context, function(err, html){
          if(err) {throw err;}
          res.end(html);
        });
      } else {
        var motion_kor = '';
        var motion_eng = '';
        var picture_path = '';
        var exp = '';

        var motions_list = '';
        var motions_Array = motions_list.split('');
        var Array_length = motions_Array.length;
        var user = req.user;
        var message = '';

        var set_data='';

        var context = {
          motion_kor, motion_eng, picture_path, exp, motions_list, motions_Array, Array_length, user, paramDates, message, set_data
        };
        return req.app.render('show_info.ejs', context, function(err, html){
          if(err) {throw err;}
          console.log('응답 웹 문서 : ' + html)
          res.end(html);
        });
      }

  })
} else {
  console.log('데이터베이스와의 연결이 끊어졌습니다');
  res.end();
}
}

module.exports.addinfo = addinfo;
module.exports.showinfo = showinfo;
