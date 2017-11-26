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
        $start_day.eq(i).html(date);
        date++;
    }

    // caption 년, 월 표시
    $caption_year.html(year);
    $caption_month.html(month+1);
}


  // ========== 프로그램 시작 함수(메인함수) 선언 ==========
  /* 즉시실행함수(메인함수)를 익명함수로 선언
     - C언어의 main()함수와 같이 프로그램을 시작하고 서브 루틴(함수)과 연결하는 역할을 수행하는 함수
     - 프로그램 시작과 함께 자동 호출되며, 즉시실행함수내에서 선언한 변수를 외부에서 접근 가능함
     - 선언방법 : 함수의 바깥쪽을 괄호로 감싸고, 뒤에 ()를 추가
  */
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



/* ************************************************************ */
/* 라이트 박스 부분 */
$(function(){

	var $lightbox = $('#lightbox');//라이트박스 본체
	var $block = $('#block');	// 라이트박스 배경

	/* 라이트 박스 열기 */
	function lightbox_open(num){

		$lightbox.addClass('active');

		$block.addClass('active');

	}

	/* 라이트 박스 종료 */
	function lightbox_close(){

		$lightbox.removeClass('active');

		$block.removeClass('active');
	}


	// 라이트 박스 닫기 버튼  click 이벤트
	$(".btn-close").click(function(){
		lightbox_close();
	});
});

/* ************************************************************ */
/* 클릭 이벤트 발생시 운동목록에 운동 추가 */

	// 필요한 문서객체 저장
  var $list = $('#list-group > li');
	var day_list = document.getElementById('day_workoutlist');

	// 리스트 추가
  $list.click(function(){
    if(event.target.nodeName == "LI"){
			var workout_name = $(event.target).text();  // 클릭한 운동 이름 반환

			day_list.innerHTML += '<li class="list-group-item"><a href="#">' + workout_name + '</a></li>'

		}
  })
