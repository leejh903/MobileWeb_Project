(function () {

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
    // 바로 데이터베이스로 정보 전송이 되도록
    document.getElementById('add_workout_db').submit();
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
  // var $motion_detail = $('#day_workoutlist').find('li');
  var $motion_detail = $('input[name=motions]');

	/* 라이트 박스 열기 */
	function lightbox2_open(){
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

    // input에 값 넣고 db로 보내기
    $('#open_lightbox2 > input').val($(this).val());

    console.log($('#open_lightbox2 > input').val());

    document.getElementById('open_lightbox2').submit();

  });

  if($('#title_motion').text().length > 0){
  // 라이트창2 열기
  $("#wrapper").removeClass("toggled");
  // 사이드바 퇴장
  lightbox2_open();
  }

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
console.log('set_list : ' + set_list);
}

/* ************************************************************ */

/* 클릭 이벤트 발생시 운동목록에 운동 추가 */

	// 필요한 문서객체 저장
  function add_motionlist(){
  var $list = $('#list-group > li');
	var day_list = document.getElementById('day_workoutlist');
  var day_list_index = [];

  var motions_array = $("input[name=motions]");
  var motions_array_length = motions_array.length;
  console.log(motions_array_length);

	// 리스트 추가
  $list.click(function(){

    var i = 0;  // i는 플래그
    var a = 0;  // a도 플래그

    // db에 같은 값 있는지 비교
    for(var b=0; b < motions_array_length+1; b++){
      if(motions_array.eq(b).val() == $(this).text()){
        console.log("db에 같은게 있는 경우");
        break;
      } else if(b == motions_array_length){
        console.log("db에 같은게 없는 경우");
        a = 1;
        break;
      }
    }

    // db에 똑같은 값 없을 때
    if(a == 1){

    // 새로 추가할 것 중 같은 제목인거 필터링
    for(var j=0; j < day_list_index.length+1; j++){
      if(day_list_index[j] == $list.index(this)){
        console.log("같은게 있는 경우")
        break;
      } else if(j == day_list_index.length) {
        console.log("같은게 없는 경우 추가")
        day_list_index[day_list_index.length] = $list.index(this);  // 배열에 새로 추가
        i = 1;
        break;
      }
    }

    // 조건 맞으면 실제 리스트 추가
      if(event.target.nodeName == "LI" && i == 1){
			   var workout_name = $(event.target).text();  // 클릭한 운동 이름 반환
			   day_list.innerHTML += '<li class="list-group-item day_list_title"><a><input value="' + workout_name + '" name="motions" style="background-color:transparent; clear: none; border:0px none; border-image:none" readonly/></a><span class="glyphicon glyphicon-minus motion-minus" aria-hidden="true" style="float:right; color:rgb(200, 34, 38)"></span</li>';
      }
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

/* ************************************************************ */

/* 운동동작 지우기 */

$(function(){
  $('.motion-minus').click(function() {
    // - 선택한 운동동작의 index 번호
    var motion_index = $(this).closest('li').index();
    // 해당 li요소
    var motion_li = document.getElementsByClassName('day_list_title')[motion_index];

    // 선택한 요소 지우기
    $(motion_li).remove();

    // 바로 데이터베이스로 정보 전송이 되도록
    document.getElementById('add_workout_db').submit();
  })
});
