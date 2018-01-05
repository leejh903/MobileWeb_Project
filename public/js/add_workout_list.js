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
        $start_day.eq(i).html('<a href="#">' + date +'</a>');
        date++;
    }

    // caption 년, 월 표시
    $caption_year.html(year);
    $caption_month.html(month+1);

    // 날짜 클릭 하였을 때 이벤트 추가
    for (var i = day; i < day + d_length; i++) {
       $start_day.eq(i).click(function() {
        console.log(year + '/' + (month+1) + '/' + $(this).text());

       // form 태그 안에 날짜 값 전달되도록(안보이게 설정)
      // $('#calendar_input').val(year + '-' + (month+1) + '-' + $(this).text());
      $('#calendar_input').val(year + '-' + (month+1) + '-' + $(this).text());

      // action 실행
      document.getElementById('calendar_show').submit();
       })
    }

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

    /* 클릭 이벤트 발생시 운동목록에 운동 추가 */
    add_motionlist();

    /* 운동 세트 추가/제거 */
    add_workout_set();

    /* 기록 입력 모달 */
    set_modal();

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

  // + 버튼 누르면 라이트박스 등장(운동 추가 부분)
  $("#button_add_workout_list").click(function(){
    $('#lightbox').addClass('active');
    $('#block').addClass('active');
    $("#wrapper").removeClass("toggled"); // 사이드바 퇴장
  });

});

/* ************************************************************ */

/* 라이트 박스2 부분 */
$(function(){

	var $lightbox2 = $('#lightbox2');//라이트박스 본체
  var $block = $('#block');	// 라이트박스 배경
  var $motion_detail = $('.day_list_title')

	/* 라이트 박스 열기 */
	function lightbox2_open(num){
		$lightbox2.addClass('active');
		$block.addClass('active');
	}

	/* 라이트 박스 종료 */
	function lightbox2_close(){
		$lightbox2.removeClass('active');
		$block.removeClass('active');
	}

	// 라이트 박스 닫기 버튼  click 이벤트
	$(".btn-close2").click(function(){
		lightbox2_close();
	});

  $motion_detail.click(function(){
    console.log(this);
    $('#lightbox2').addClass('active');
    $('#block').addClass('active');
    $("#wrapper").removeClass("toggled"); // 사이드바 퇴장
  });

});

/* ************************************************************ */

/* 클릭 이벤트 발생시 운동 세트 추가 */

function add_workout_set(){
// 필요한 문서객체 저장
var $set_plus = $('#add_amount_workout');
var $set_minus = $('#minus_amount_workout');
var set_list = document.getElementById('plan_workout_ul');
var set_index = $(plan_workout_ul).find('li').length;

// 세트 추가
$set_plus.click(function(){
  if(event.target.nodeName = "I"){
  set_index++;
  console.log(set_index);
  set_list.innerHTML += '<li class="list-group-item"><p>set' + set_index + '</p><span><a>0</a>kg</span><span> <a>0</a>회</span>';
  }
})

// 세트 제거
$set_minus.click(function(){
  if(set_index > 3){ // 3개 세트는 고정
    set_index--;
    console.log(set_index);
    set_list.removeChild(set_list.lastChild);
    }
})

}

/* ************************************************************ */

/* 클릭 이벤트 발생시 운동목록에 운동 추가 */

	// 필요한 문서객체 저장
  function add_motionlist(){
  var $list = $('#list-group > li');
	var day_list = document.getElementById('day_workoutlist');
  var day_list_index = [];

	// 리스트 추가
  $list.click(function(){

    console.log($list.index(this));  // 선택한 요소의 인덱스 번호

    // 같은 제목인거 필터링
    var i = 0;  // i는 플래그

    for(var j=0; j < day_list_index.length+1; j++){
      if(day_list_index[j] == $list.index(this)){
        console.log("같은게 있는 경우")
        break;
      } else if(j == day_list_index.length) {
        console.log("같은게 없는 경우 추가")
        day_list_index[day_list_index.length] = $list.index(this);
        i = 1;
        break;
      }
    }

    console.log(day_list_index);  // 추가된 요소의 배열

    // 조건 맞으면 실제 리스트 추가
      if(event.target.nodeName == "LI" && i == 1){
			   var workout_name = $(event.target).text();  // 클릭한 운동 이름 반환
			   day_list.innerHTML += '<li class="list-group-item day_list_title"><a><input value="' + workout_name + '"name="motions" style="background-color:transparent; clear: none; border:0px none; border-image:none" readonly/></a></li>';
      }
  })
}

/* ************************************************************ */

/* 기록 입력 모달 */

function set_modal(){
  // 필요한 문서객체 저장
  var $setting_list = $('#plan_workout_ul > li');
  var $set_workout_amt = $('#set_workout_amt');
  var object1 = {};
  var object2 = {};

  $setting_list.click(function() {
    $('#goal_Modal').modal('show');

    var event_info = $('#plan_workout_ul > li').index(this)
    var $test1 = $('#plan_workout_ul > li').eq(event_info);
    var $test2 = $('test1').find('span');

    // console.log(event_info);
    object1 = $test1.eq(0).find('a').eq(0);
    object2 = $test1.eq(0).find('a').eq(1);
    // console.log(object1.text());  // 회
    // console.log(object2.text());  // kg
  })


  $set_workout_amt.click(function() {
    // console.log($('#set_num').val());
    // console.log($('#kg_num').val());

    object2.text($('#kg_num').val());
    object1.text($('#set_num').val());
  })
}
