/**
 * Check class exist in element
 * @param {string} className - name of checking class
 * @param {js <object>} html element
 * @return {boolean} true - element has class, false - element hasn't class
 */
function isClassExist(className, element){
  return (element && element.className.indexOf(className)> 0)
}

/**
 * Check Password: must be at least 6 characters and contain at least one capital letter and at least one non-alphanumeric character.
 * @param {string} inputtxt - password value
 * @return {boolean} true - password is valid, false -  password isn't valid
 */
function checkPassword(inputtxt)
{
  var decimal=  /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
  return (inputtxt.match(decimal));
}

/**
 * On menu button click, show/hide menu from right. Call for animation show/hide menu.
*/
function showMenu() {
  var menu = $('#menu'),
    slidemenu = $('#slidemenu'),
    menuWidth = menu.outerWidth(),
    startMenuWidth = $('body').outerWidth() * 0.31082, /* start width menu div from header = 31.082% */
    finishWidth = $('body').outerWidth() * 0.68693693694; /* finish width menu div from header = 68.693693694% */

  if(!slidemenu.hasClass('active')) { /* if slidemenu doesn't have active class, than menu hide and we call show function*/
    slidemenu.addClass('active');
    animateShowMenu(menuWidth, finishWidth);
  } else {
    slidemenu.removeClass('active');
    animateHideMenu(startMenuWidth, finishWidth);
  }
}

/**
 * On Login button click check username and password
 * if one of fields no valid, call animateShowError
*/
function login(){
  console.log('ghjghj')
  var username = $('#username'),
      password = $('#password'),
      body = $('body');
  if((username && !username.value) || (password && !checkPassword(password.val()))) {
    if(!body.hasClass('error')) {
      body.addClass('error');
      animateShowError()
    }
  } else {
    body.removeClass('error');
  }
}

/**
 * On Show password button click show/hide password value
*/
function showPassword(){
  var password = $('#password');
  if(password.val()) {
    if (password.attr('type') != 'text') {
      password.attr('type', 'text');
    } else {
      password.attr('type', 'password');
    }
  } else {
    password.attr('type', 'password');
  }
}

/**
 * For animated show error message
 */
function animateShowError() {
  $( "#error-message" ).animate({
    top: "+=70"
  }, 1000, function() {
  });
}

/**
 * For animated show right menu.
 * @param {number} menuWidth - width of header menu block
 * @param {number} finishWidth - finish right menu width
 */
function animateShowMenu(menuWidth, finishWidth) {
  var slidemenu = $( "#slidemenu" )
  slidemenu.animate({
    right: "+=" + menuWidth
  }, 500, function() {
    slidemenu.css({'z-index': 10000});
    slidemenu.animate({
      right: "+=" + (finishWidth - menuWidth)
    }, 1000, function() {
    });
  });
}

/**
 * For animated hide right menu.
 * @param {number} menuWidth - width of header menu block
 * @param {number} finishWidth - finish right menu width
 */
function animateHideMenu(menuWidth, finishWidth) {
  var slidemenu = $( "#slidemenu" )
  slidemenu.animate({
    right: "-=" + (finishWidth - menuWidth)
  }, 1000, function() {
    slidemenu.css({'z-index': 100});
    slidemenu.animate({
      right: "-=" + menuWidth
    }, 500, function() {
    });
  });
}
