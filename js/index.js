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
  return (inputtxt.value.match(decimal));
}

/**
 * On menu button click, show/hide menu from right. Call for animation show/hide menu.
*/
function showMenu() {

  var menu = document.getElementById('menu'),
    slidemenu = document.getElementById('slidemenu'),
    menuWidth = menu.clientWidth,
    startMenuWidth = document.body.clientWidth * 0.31082, /* start width menu div from header = 31.082% */
    finishWidth = document.body.clientWidth * 0.68693693694; /* finish width menu div from header = 68.693693694% */

  if(!isClassExist('active', slidemenu)) { /* if slidemenu doesn't have active class, than menu hide and we call show function*/
    slidemenu.className = slidemenu.className + " active";
    animateShowMenuFirstPart(menuWidth, finishWidth);
  } else {
    slidemenu.className = slidemenu.className.replace("active", '');
    animateShowMenuSecondPart(-1, menuWidth, finishWidth, 0, startMenuWidth);
  }
}

/**
 * On Login button click check username and password
 * if one of fields no valid, call animateShowError
*/
function login(){
  var username = document.getElementById('username'),
      password = document.getElementById('password'),
      body = document.body;
  if((username && !username.value) || (password && !checkPassword(password))) {
    if(!isClassExist('error', body)) {
      body.className = body.className + " error";
      animateShowError()
    }
  } else {
    body.className = body.className.replace('error', '');
  }
}

/**
 * On Show password button click show/hide password value
*/
function showPassword(){
  var password = document.getElementById('password');
  if(password.value) {
    if (password.getAttribute('type') != 'text') {
      password.setAttribute('type', 'text');
    } else {
      password.setAttribute('type', 'password');
    }
  } else {
    password.setAttribute('type', 'password');
  }
}

/**
 * For animated show error message
 */
function animateShowError() {
  var start = Date.now();

  var timer = setInterval(function() {
    var timePassed = Date.now() - start;
    if (timePassed >= 1000) {
      clearInterval(timer);
      return;
    }
    var error = document.getElementById('error-message');
    error.style.top = timePassed * 0.07 + 'px';

  }, 2);
}

/**
 * For animated show right menu. Animated right menu block until top menu block
 * @param {number} menuWidth - width of header menu block
 * @param {number} finishWidth - finish right menu width
 */
function animateShowMenuFirstPart(menuWidth, finishWidth) {
  var start = Date.now();
  var slidemenu = document.getElementById('slidemenu');

  var timer = setInterval(function() {
    var timePassed = Date.now() - start;

    if(timePassed >= 500) {
      clearInterval(timer);
      animateShowMenuSecondPart(1, finishWidth, menuWidth, timePassed, menuWidth);
      return;
    }
    slidemenu.style.right = -slidemenu.clientWidth + timePassed * (menuWidth/500) + 'px';
  }, 2);
}

/**
 * For animated show/hide right menu. Animated right menu block after top menu block. And Hide right menu.
 * @param {number} index - 1 if show, -1 if hide
 * @param {number} finishWidth - finish right menu width
 * @param {number} menuWidth - width of header menu block
 * @param {number} timePassedStart - the duration of the animation is already past
 * @param {number} startMenuWidth - start width of header menu block
 */
function animateShowMenuSecondPart(index, finishWidth, menuWidth, timePassedStart, startMenuWidth) {
  if(!timePassedStart) {
    timePassedStart = 0
  }
  var start = Date.now();
  var slidemenu = document.getElementById('slidemenu');
  slidemenu.style['z-index'] = 10000;
  var timer2 = setInterval(function() {
    var timePassed = Date.now() - start;

    if((index == 1) && (timePassed >= 490)) {
      clearInterval(timer2);
      return;
    }
    if ((index == -1) &&(timePassed >= 1000)) {
      clearInterval(timer2);
      slidemenu.style['z-index'] = 100;
      return;
    }

    if(index == -1) { /* hide menu */
      if((slidemenu.clientWidth -(timePassedStart + timePassed) * (menuWidth/1000)) <= startMenuWidth){
        slidemenu.style['z-index'] = 100;
      }
      slidemenu.style.right = -(timePassedStart + timePassed) * (menuWidth/1000) + 'px';
    } else { /* open menu */
      slidemenu.style.right = -slidemenu.clientWidth + (timePassedStart + timePassed) * (finishWidth/1000) + 'px';
    }

  }, 2);
}