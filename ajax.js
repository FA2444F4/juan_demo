const baseUrl = 'http://localhost:9000'


function ajax(method, url, data, resolve, reject)
{
  method = method.toUpperCase() // 变为大写
  let http = new XMLHttpRequest();
  http.open(method,`${baseUrl}${url}`,true);

  if (method === 'POST') {
    // 如果想要使用post提交数据,必须添加此行
    http.setRequestHeader('content-type','application/x-www-form-urlencoded')
    // 将数据通过send方法传递
    http.send(dataStringify(data))
  } else {
    http.send()
  }

  http.onreadystatechange=function()
  {
    if (http.readyState===4 && http.status===200)
    {
      const res = JSON.parse(http.responseText)
      if (res.errorCode && res.errorCode !== 200) {
        reject(res)
      } else if (!res.code) {
        resolve(res.data.data)
      } else {
        reject(res)
      }
    }
  }
}

function request(method, url, data) {
  return new Promise((resolve, reject) => {
    ajax(method, url, data,  resolve, reject)
  })
}

function dataStringify(obj) {
  let str = ''
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (str === '') {
        str += `${key}=${obj[key]}`
      } else {
        str += `&${key}=${obj[key]}`
      }
    }
  }
  console.log('str', str)
  return str
}
