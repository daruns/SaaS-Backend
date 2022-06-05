import {ResponseData} from 'src/app/app.service'

export const CannotAuthorize: ResponseData = {
    success: false,
    message: "Forbidden",
    data: {}
}