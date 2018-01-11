var showdiet = function(req, res) {
  console.log('diet모듈 안에 showdiet 호출됨');

  // 파라미터
  var paramId = req.user._id;
  var paramDates = req.body.dates || req.query.dates;

  console.log('요청 파라미터 paramId : ' + paramId);
  console.log('요청 파라미터 paramDates : ' + paramDates);

  var database = req.app.get('database');

  // 데이터베이스 객체가 초기화된 경우
  if(database.db){

    database.DietModel.find({users: paramId, dates: paramDates}, function(err, results){
      if(err) {
        console.error('식사 정보 조회중 오류 발생 :' + err.stack);

        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>식사 정보 조회 중 오류 발생 </h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();

        return;
      }

      // 전역 변수 정의
      var diet_data = [];
      var user = req.user;
      var message = '';

      if(results && results.length !=0){
        console.dir(results);

        diet_data = results
      }

        var context = {
          diet_data, paramDates, user, message
        }


        return req.app.render('diet_list.ejs', context, function(err, html){
          if(err) {throw err;}
          res.end(html);
        });


    })
  }
}

var adddiet = function(req, res) {
  console.log('diet 모듈 안에 adddiet 호출됨 ');

  // 파라미터
  var paramId = req.user._id;
  var paramDates = req.body.dates || req.query.dates;
  var paramMeals_Index = req.body.meal_index || req.query.meal_index;
  var paramMeals = req.body.meal_contents || req.query.meal_contents;

  var user = req.user;

  console.log('요청 파라미터 paramId : ' + paramId);
  console.log('요청 파라미터 paramDates : ' + paramDates);
  console.log('요청 파라미터 paramMeals_Index : ' + paramMeals_Index);
  console.log('요청 파라미터 paramMeals : ' + paramMeals);

  // 날짜 선택이 안되어 있다면 message 보내기
  if(paramDates === undefined || paramDates == ''){
    console.log('날짜 데이터가 안 들어옴');

    var message = '날짜를 선택하세요!!';
    diet_data = [];
    param_Dates = '';

    var context = {
      diet_data, paramDates, user, message
    }

    return req.app.render('diet_list.ejs', context, function(err, html){
      if(err) {throw err;}
      res.end(html);
    });
  }

  var database = req.app.get('database');

  // 기존 날짜에 식사 기록이 있다면 업데이트
  database.DietModel.findOneAndUpdate({users: paramId, dates: paramDates, meals: paramMeals_Index},{contents: paramMeals}, function(err, results){

    // 기존 날짜에 식사 기록이 없다면
    if(results == undefined || results.length < 1){
      var diet = new database.DietModel({
        users: paramId,
        dates: paramDates,
        meals: paramMeals_Index,
        contents: paramMeals
      });

      diet.saveDiet(function(err, results) {
        if(err) {throw err;}

        console.log(paramDates + '에 식사기록(' + paramMeals_Index + ') 추가함');
      });
    }

    return res.redirect('/showdiet?dates='+paramDates);
  })

}

module.exports.showdiet = showdiet;
module.exports.adddiet = adddiet;
