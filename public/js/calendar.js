/* ************************************************************ */
// calendar 함수
function calendar(new_year, new_month) {
    // 특정 년,월을 시작일(1일)부터 조회(year, month, date(1일부터시작))
    var d = new Date(new_year, new_month-1, 1);

    // 월별 일수 구하기 공식
    var d_length = 32 - new Date(new_year, new_month-1, 32).getDate(); //공식

    var year = d.getFullYear();//년
    var month = d.getMonth();//월
    var date = d.getDate();//일
    var day = d.getDay();//요일

      console.log(year, month, date, day, d_length);

    // caption 영역에 년, 월을 표시할 객체를 변수에 저장
    var $caption_year = $('.year');//년
    var $caption_month = $('.month');//월

      //날자가 표시될 달력 테이블의 td 객체를 지정(배열객체(td[0]~td[41]))
    var $start_day = $('tr td');

    // 달력 테이블 초기화
    $start_day.each(function (i) {
        $(this).html('&nbsp;')
    });

    // 한달치 날짜를 테이블에 시작요일(day)부터 순서대로 표시(d_length까지)
    for (var i = day; i < day + d_length; i++) {

      var calendardate = year + '-' + (month+1) + '-' + date

      // 오늘 날짜 나타낼 수 있도록
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
      var todaydate = yyyy + '-' + mm + '-' + dd

        if(todaydate == calendardate){
          console.log('날짜가 일치하는 날이 존재');
          $start_day.eq(i).html('<div style= "background-color:rgb(200, 34, 38); border-radius: 100%; width: 20px;"> <a style="color:white; padding-left:5px;">' + date +'</a></div>'); // 다르게
        } else {
          $start_day.eq(i).html('<a>' + date +'</a>');
        }

        date++;
    }

    // caption 년, 월 표시
    $caption_year.html(year);
    $caption_month.html(month+1);

    // 날짜 클릭 하였을 때 이벤트 추가
    for (var i = day; i < day + d_length; i++) {
       $start_day.eq(i).click(function() {
        console.log(year + '-' + (month+1) + '-' + $(this).text());

        var mm = month + 1;
        var dd = $(this).text();

        if(mm<10){ mm = '0' + mm }
        if(dd<10){ dd = '0' + dd }

       // form 태그 안에 날짜 값 전달되도록(안보이게 설정)
      $('#calendar_input').val(year + '-' + mm + '-' + dd);
      // action 실행
      document.getElementById('calendar_output').submit();


       })
    }

}

(function () {
    var $prev = $('#prev');//이전
    var $next = $('#next');//이후
    var year = new Date().getFullYear();//년
    var month = new Date().getMonth()+1;//월

      //현재 시점을 기준으로 calendar() 함수 호출
      console.log(year,month);
      calendar(year, month);

      //이전달 정보를 요청하는 네비게이션 버튼의 이벤트 핸들러 설정
    $prev.click(function () {
       calendar(year, --month);//현재월 --
    });

       //다음달 정보를 요청하는 네비게이션 버튼의 이벤트 핸들러 설정
    $next.click(function () {
        calendar(year, ++month);//현재월 ++
    });

})();  // 메인메소드처럼 (function () ) () 즉시 실행 되게 하는 것
