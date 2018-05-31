class Hello {
  @log
  static say() {
    console.log('hello, world')
  }
}

function log(target, name, descriptor) {
  console.log('just a log')
}

export default Hello
