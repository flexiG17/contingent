import {
    ADD_NOTIFICATION_ROUTE,
    ADD_STUDENT_NOTIFICATION_ROUTE,
    ADD_STUDENT_ROUTE,
    CARD_CONTRACT_ROUTE,
    CARD_QUOTA_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE, NOTIFICATION_ROUTE,
    REGISTRATION_ROUTE,
    START_ROUTE,
    ACCOUNT_ROUTE, LOAD_ROUTE
} from "./utils/consts";
import HomePage from './Pages/HomePage'
import RegistrationPage from './Pages/RegistrationPage'
import StartPage from './Pages/StartPage';
import LoginPage from "./Pages/LoginPage";
import PersonalCardContract from "./Pages/PersonalCardContract";
import PersonalCardQuota from "./Pages/PersonalCardQuota";
import Notifications from "./Pages/Notifications";
import AddStudent from "./Pages/AddStudent";
import AddStudentNotification from "./Pages/AddStudentNotification";
import AddNotification from "./Pages/AddNotification";
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
    },
    {
        path: NOTIFICATION_ROUTE,
        Component: Notifications
    },
    {
        path: ADD_STUDENT_NOTIFICATION_ROUTE,
        Component: AddStudentNotification
    },
    {
        path: ADD_NOTIFICATION_ROUTE,
        Component: AddNotification
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

export const adminRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: RegistrationPage
    }
]

export const editorRoutes = [
    {
        path: ADD_STUDENT_ROUTE,
        Component: AddStudent
    }
]