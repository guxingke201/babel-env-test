class Hello {
  // 如果传入字符串是 hello，则不执行，并进行提示
  @forbidSayHello
  static say(word) {
    console.log(word)
  }

  // 调用这个方法，会进行提示，警告这个方法已经废弃，使用 say 替换
  @deprecate('say')
  static speak(word) {}

  // 调用这个方法，开始执行时输出时间，结束时输出时间和总共运行时间
  @executeStatistics
  static run() {
    let sum = 0
    for (let i = 0; i < 1000000000; i++) {
      sum += i
    }
    return sum
  }

  // add(1, 2, 3, 4) 原来返回 10
  // 进行修饰后，需要返回 0 * 1 + 1 * 2 + 2 * 3 + 3 * 4 = 20
  // 也就是原先返回输入元素之和，现在返回 元素 * 下标之和
  @recursionCalculate
  static add(...args) {
    return args.reduce((now, next) => {
      return now + next
    })
  }
}

function recursionCalculate(target, name, descriptor) {
  var oldValue = descriptor.value

  descriptor.value = function () {
    var [...arg] = arguments
    return oldValue.apply(this, arg.map((item,index) => index * item))
  }

  return descriptor
}

function forbidSayHello(target, name, descriptor) {
  var oldValue = descriptor.value

  descriptor.value = function () {
    if (arguments && arguments[0] === 'hello') {
      console.warn('Forbid to say hello.')
    } else {
      return oldValue.apply(this, arguments)
    }
  }

  return descriptor
}

function deprecate(newMethodName) {
  return function (target, name, descriptor) {
    descriptor.value = function () {
      console.warn(`The method "${name}" is deprecate,please use "${newMethodName}" instead!`)
    }
    return descriptor
  }
}

function executeStatistics(target, name, descriptor) {
  var oldValue = descriptor.value

  descriptor.value = function () {
    var startTime = new Date()
    var newValue = oldValue.apply(this, arguments)
    var endTime = new Date()
    console.log(
      `Execute the method "${name}" start at ${startTime.toLocaleString()} ${startTime.getMilliseconds()}, end at ${endTime.toLocaleString()} ${endTime.getMilliseconds()}，consume ${endTime.getTime() -
        startTime.getTime()}ms.`
    )
  }

  return descriptor
}

function log(target, name, descriptor) {
  console.log('just a log')
}

export default Hello
