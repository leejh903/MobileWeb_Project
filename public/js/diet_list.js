
/* 식단 기록 입력 모달 */

  // 필요한 문서객체 저장
  var $diet_select = $('.dropdown-menu > li');

  $diet_select.click(function() {
    $('#diet_Modal').modal('show');
    $('#myModalLabel').text('식단 입력 - ' + $(this).text())

    // meal_index에 입력
    $('#meal_index').val($(this).index());

  })

  // 식단 기록 클릭 이벤트
  $('.panel-collapse').click(function() {

    var contents = $(this).find('.panel-body').text();

    $('#meal_textarea').text(contents);
    $('#myModalLabel').text('식단 입력 - ' + $(this).attr('name'))
    $('#meal_index').val($(this).attr('value'));
    $('#diet_Modal').modal('show');
  })
