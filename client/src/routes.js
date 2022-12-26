import {
    ADD_STUDENT_ROUTE,
    CARD_CONTRACT_ROUTE,
    CARD_QUOTA_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    START_ROUTE,
    ACCOUNT_ROUTE, LOAD_ROUTE
} from "./utils/consts";
import HomePage from './Pages/HomePage'
import StartPage from './Pages/StartPage';
import LoginPage from "./Pages/LoginPage";
import PersonalCardContract from "./Pages/PersonalCardContract";
import PersonalCardQuota from "./Pages/PersonalCardQuota";
import AddStudent from "./Pages/AddStudent";
import Index from "./Pages/Account";
import LoadingPage from "./Pages/LoadingPage";

export const readerRoutes = [
    {
        path: HOME_ROUTE,
        Component: HomePage
    },
    {
        path: CARD_CONTRACT_ROUTE,
        Component: PersonalCardContract
    },
    {
        path: CARD_QUOTA_ROUTE,
        Component: PersonalCardQuota
    },
    {
        path: ACCOUNT_ROUTE,
        Component: Index
    }
]

export const publicRoutes = [
    {
        path: START_ROUTE,
        Component: StartPage
    },
    {
        path: LOGIN_ROUTE,
        Component: LoginPage
    },
    {
        path: LOAD_ROUTE,
        Component: LoadingPage
    }
]

export const editorRoutes = [
    {
        path: ADD_STUDENT_ROUTE,
        Component: AddStudent
    }
]