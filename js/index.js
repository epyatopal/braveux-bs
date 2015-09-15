function toggleClass(newClass, element){
  if(element){
    if(element.className.indexOf(newClass)< 0) {
      element.className = element.className + " " + newClass;
      return true;
    } else {
      element.className = element.className.replace(newClass, '');
      return true;
    }
  } else {
    return false;
  }
}

function isClassExist(className, element){
  if(element && element.className.indexOf(className)> 0) {
    return true
  } else {
    return false
  }
}
function checkPassword(inputtxt)
{
  var decimal=  /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
  if(inputtxt.value.match(decimal))
  {
    console.log('Correct, try another...')
    return true;
  }
  else
  {
    console.log('Wrong...!')
    return false;
  }
}


function showMenu() {

  var menu = document.getElementById('menu');
  var slidemenu = document.getElementById('slidemenu');

  var menuWidth = menu.clientWidth;
  var startMenuWidth = document.body.clientWidth * 0.31082;
  var finishWidth = document.body.clientWidth * 0.68693693694;
  if(!isClassExist('active', slidemenu)) {
    slidemenu.className = slidemenu.className + " active";
    animateShowMenuFirstPart(1, menuWidth, finishWidth, 0, startMenuWidth);
  } else {
    slidemenu.className = slidemenu.className.replace("active", '');
    animateShowMenuSecondPart(-1, menuWidth, finishWidth, 0, startMenuWidth);
  }
}

function login(){
  var username = document.getElementById('username');
  var password = document.getElementById('password');
  var body = document.body;
  if((username && !username.value) || (password && !checkPassword(password))) {
    if(!isClassExist('error', body)) {
      body.className = body.className + " error";
      animateShowError()
    }
  } else {
    body.className = body.className.replace('error', '');
  }
}

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

function animateShowMenuFirstPart(index, menuWidth, finishWidth, timePassedStart, startMenuWidth) {
  if(!timePassedStart) {
    timePassedStart = 0
  }
  var start = Date.now();
  var slidemenu = document.getElementById('slidemenu');

  var timer = setInterval(function() {
    var timePassed = Date.now() - start;

    if (timePassed >= 1000) {
      clearInterval(timer);
      if(index == 1) {
      animateShowMenuSecondPart(index, finishWidth, menuWidth, timePassed, startMenuWidth)
      }
      return;
    }
    if(index == -1) {
      slidemenu.style.right = -(timePassedStart + timePassed) * (finishWidth/2000) + 'px';
    } else {
      slidemenu.style.right = -slidemenu.clientWidth + timePassed * (menuWidth/1000) + 'px';
    }
  }, 2);
}

function animateShowMenuSecondPart(index, finishWidth,menuWidth, timePassedStart, startMenuWidth) {
  if(!timePassedStart) {
    timePassedStart = 0
  }
  var start = Date.now();
  var slidemenu = document.getElementById('slidemenu');
  slidemenu.style['z-index'] = 10000;
  var timer2 = setInterval(function() {
    var timePassed = Date.now() - start;

    if (timePassed >= 1000) {
      clearInterval(timer2);
      if(index == -1) {
        slidemenu.style['z-index'] = 100;
      }
      return;
    }

    if(index == -1) {
      if((slidemenu.clientWidth -(timePassedStart + timePassed) * (menuWidth/1000)) <= startMenuWidth){
        slidemenu.style['z-index'] = 100;
      }
      slidemenu.style.right = -(timePassedStart + timePassed) * (menuWidth/1000) + 'px';
    } else {
      slidemenu.style.right = -slidemenu.clientWidth + (timePassedStart + timePassed) * (finishWidth/2000) + 'px';
    }


  }, 2);
}