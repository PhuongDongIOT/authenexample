import { Response } from "express"

class ResponseStatusJson {

    public status: number
    public returnData: any
    public response: Response

    constructor(response: Response, status: number, returnData: any) {
        this.returnData = returnData
        this.status = status
        this.response = response
    }

    public responseJson() {
        return this.response.status(this.status).json(this.returnData)
    }
}

function responseStatus(response: Response, status: number, data: any) {
    const responseStatusJson: ResponseStatusJson = new ResponseStatusJson(response, status, data)
    return responseStatusJson.responseJson()
}

export { responseStatus }