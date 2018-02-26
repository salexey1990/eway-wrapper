var $notify = angular.module('$notify', []);
$notify.factory('$notify', function () {

  function success(text, title) {
    if (text || title)
      return toastr.success(text, title, {timeOut: 5000});
  }

  function error(text, title) {
    if (text || title)
      return toastr.error(text, title, {timeOut: 5000});
  }

  function warning(text, title) {
    if (text || title)
      return toastr.warning(text, title, {timeOut: 5000});
  }

  function info(text, title) {
    if (text || title)
      return toastr.info(text, title, {timeOut: 5000});
  }


  function infinitySuccess(text, title) {
    if (text || title)
      return toastr.success(text, title, {timeOut: -1});
  }

  function infinityError(text, title) {
    if (text || title)
      return toastr.error(text, title, {timeOut: -1});
  }

  function infinityWarning(text, title) {
    if (text || title)
      return toastr.warning(text, title, {timeOut: -1});
  }

  function infinityInfo(text, title) {
    if (text || title)
      return toastr.info(text, title, {timeOut: -1});
  }


  function handlerError(err) {
    var text = (err && err.text) || ((err && _.isString(err)) ? err : 0) || 'Неизвестная ошибка';
    return error(text);
  }

  function clear(data) {
    if (data) {
      return toastr.clear(data);
    } else {
      return toastr.clear();
    }
  }

  function remove() {
    return toastr.remove();
  }

  var message = function(text, title) {
    success(text, title);
  };

  message.success = success;
  message.message = success;
  message.error = error;
  message.warning = warning;
  message.info = info;

  message.infinitySuccess = infinitySuccess;
  message.infinityMessage = infinitySuccess;
  message.infinityError = infinityError;
  message.infinityWarning = infinityWarning;
  message.infinityInfo = infinityInfo;

  message.handlerError = handlerError;
  message.clear = clear;
  message.remove = remove;

  return message;
});
