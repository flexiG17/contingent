import {useNavigate} from 'react-router-dom';
import {HOME_ROUTE} from "../../utils/consts/pathRoutes";
import {useEffect} from "react";

export default function LoadingPage() {
    const navigate = useNavigate()

    useEffect(() => {
        window.location.reload();
        navigate(HOME_ROUTE);
    })

    return (
        <>
            <h1>Загрузка...</h1>
        </>
    );
}