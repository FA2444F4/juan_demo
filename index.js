function login() {
  const phone = document.querySelector('input[name=loginPhone]').value
  const password = document.querySelector('input[name=loginPassword]').value
  request('post', '/user/login', {
    phone,
    password
  })
    .then(res => {
      console.log('res', res)
    })
    .catch(err => {
      console.log('err', err.msg)
      showTips(err.msg)
    })
}

function register() {
  const name = document.querySelector('input[name=registerName]').value
  const phone = document.querySelector('input[name=registerPhone]').value
  const password = document.querySelector('input[name=registerPassword]').value
  if (!checkPhone(phone) ||
    !checkPassword(password) ||
    !checkName(name)
  ) {
    console.log('输入有误，请检查')
    return
  }
  request('post', '/user/register', {
    name,
    phone,
    password
  })
    .then(res => {
      console.log('res', res)
    })
    .catch(err => {
      console.log('errMsg', err.msg)
      showTips(err.msg)
    })
}



function showMask(login) {
  hideTips()
  let loginContainer = document.querySelector('#login')
  let registerContainer = document.querySelector('#register')
  if (login) {
    loginContainer.style.display = "block"
    registerContainer.style.display = "none"
  } else {
    loginContainer.style.display = "none"
    registerContainer.style.display = "block"
  }
  let mask = document.querySelector('.mask')
  mask.style.display = 'block'
}

function hideMask() {
  let mask = document.querySelector('.mask')
  mask.style.display = 'none'
}

function checkPhone(phone) {
  return /^1[3456789]\d{9}/.test(phone)
}

function checkName(name) {
  return name.length !== 0
}

function checkPassword(password) {
  return password.length >= 6
}

function showTips(msg) {
  const tips = document.querySelectorAll('.form-tips')
  tips.forEach(tip => {
    tip.style.display = 'block'
    tip.innerHTML = msg
  })
}

function hideTips() {
  const tips = document.querySelectorAll('.form-tips')
  tips.forEach(tip => {
    tip.style.display = 'none'
  })
}
new()
{}
