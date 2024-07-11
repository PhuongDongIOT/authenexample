import HttpException from './HttpException'

class ResponseFailedException extends HttpException {
    constructor(message: string, status?: number) {
        if (status) {
            super(status, message)
        } else {
            super(403, message)
        }
    }
}


function responseFailed(message: string, status?: number) {
    const response = new ResponseFailedException(message, status)
    return response
}

export { ResponseFailedException, responseFailed }
