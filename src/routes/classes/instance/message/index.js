exports.fail = (error = '9999', path = '/default') => {
  console.log('path :>> ', chalk.bgRedBright(path))
  console.log('error :>> ', chalk.bgRedBright(error))
  const { message: code } = error
  const errorList = {
    '0001': 'account or password is fail',
    '0002': 'email or phone is repeat'
  }
  return (data = '') => {
    return {
      result: data,
      status: {
        code: !errorList[code] ? '9999' : code,
        message: errorList[code] || code
      }
    }
  }
}

exports.success = (code = '0000', message = 'Success') => {
  return (data = '') => {
    return {
      result: data,
      status: {
        code,
        message
      }
    }
  }
}
