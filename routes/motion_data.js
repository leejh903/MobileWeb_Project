var motion_data = function(req, res) {
  console.log('routes 안에 motion_data 호출됨');

  // 파라미터로 전달됨
  var paramMotion = req.body.motion_data || req.query.motion_data

  console.log('요청 파라미터 : ' + paramMotion);

  var database = req.app.get('database');

  // 데이터베이스 객체가 초기화된 경우
  if(database.db){

    database.MotionDataModel.load(paramMotion, function(err, results) {
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

        var motions_list = '';
        var motions_Array = motions_list.split('');
        var Array_length = motions_Array.length;
        var user = req.user;
        var paramDates = '';
        var message = '';

        var motion_kor = results[0]._doc.motion;
        var motion_eng = results[0]._doc.motion_eng;
        var picture_path = results[0]._doc.pic_path;
        var exp = results[0]._doc.explanation;

        var context = {
          motion_kor, motion_eng, picture_path, exp, motions_list, motions_Array, Array_length, user, paramDates, message
        };

        // 뷰 템플릿 이용하여 렌더링한 후 전송
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

module.exports.motion_data = motion_data;
