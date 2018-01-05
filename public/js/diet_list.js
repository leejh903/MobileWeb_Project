
/* 식단 기록 입력 모달 */

  // 필요한 문서객체 저장
  var $diet_select = $('.dropdown-menu > li');

  $diet_select.click(function() {
    $('#diet_Modal').modal('show');
    $('#myModalLabel').text('식단 입력 - ' + $(this).text())
  })
