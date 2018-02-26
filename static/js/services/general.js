var $general = angular.module('$general', []);
$general.factory('$general', function () {
  function isValidUUID(uuid) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
  }

  function getEnding(number, aEndings) {
    number = Math.floor(Math.abs(number)) % 100;
    var cases = [2, 0, 1, 1, 1, 2];
    return aEndings[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
  }

  function getEndingRating(iNumber) {
    return getEnding(iNumber, ['балл', 'балла', 'баллов']);
  }

  function getEndingTrips(iNumber) {
    return getEnding(iNumber, ['поездка', 'поездки', 'поездок']);
  }

  function getUserName(user) {
    var result = 'Новый клиент';
    if (user && (user.first_name || user.last_name)) {
      result = user.first_name + (user.first_name ? ' ' : '') + user.last_name;
    }
    return result;
  }

  function formatDate(date, format) {
    var _format = format || 'lll';
    return date ? moment(date).format(_format) : '';
  }

  function showLockScreen(){
    const lockScreen = angular.element('<div id="lock-screen"></div>');
    const curDocument = angular.element(document).find('body').eq(0)
    lockScreen.css({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height : curDocument[0].scrollHeight,
      zIndex : 9999
    });
    const spinner = angular.element('<div></div>')
    spinner.css({
      marginTop : window.pageYOffset,
      width : curDocument.width(),
      height : curDocument.height(),
      position : 'relative',
      backgroundColor: '#333',
      color : '#fff',
      opacity : 0.7
    })
    lockScreen.append(spinner.append(new Spinner({color : '#fff'}).spin().el))
    curDocument.append(lockScreen)
  }

  function hideLockScreen() {
    const lockScreen = angular.element(document).find('#lock-screen').eq(0)
    lockScreen.remove()
  }

  function deepClone(initalObj) {
    var obj = {};
    try {
      obj = JSON.parse(JSON.stringify(initalObj));
    }catch(e){
      console.error(e)
    }
    return obj;
  }

  return {
    deepClone : deepClone,
    isValidUUID: isValidUUID,
    getEnding: getEnding,
    getEndingRating: getEndingRating,
    getEndingTrips: getEndingTrips,
    getUserName: getUserName,
    formatDate: formatDate,
    showLockScreen : showLockScreen,
    hideLockScreen : hideLockScreen
  };
});
