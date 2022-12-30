//export const URL_PATH = 'http://localhost:5000'
export const URL_PATH = 'https://api.urfu.darktwister.space'
export const START_ROUTE = '/start'
export const LOGIN_ROUTE = '/login'
export const LOAD_ROUTE = '/loading'
export const HOME_ROUTE = '/'
export const CARD_CONTRACT_ROUTE = '/contract/:id'
export const CARD_QUOTA_ROUTE = '/quota'
export const ACCOUNT_ROUTE = '/account'
export const ADD_STUDENT_ROUTE = '/createStudent'

export const internalServerError = (e) => {
    return e.response.status ? 'Ошибка сервера, попробуйте снова' : e.response.data.message
}