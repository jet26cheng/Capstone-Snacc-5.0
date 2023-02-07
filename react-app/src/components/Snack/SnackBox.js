import { useSelector } from "react-redux";
import "../Snack/SnackBox.css"
import SnackPage from "./SnackPage";


export default function SnackBox() {
    const snacks = useSelector(state => state.snacks.allSnacks)


    const imageOnErrorHandler = (event) => {
        event.currentTarget.src = 'https://www.arirangusa.net/wp-content/uploads/2020/09/LUCKY-BOX-RANDOM-21PACKS-M.jpg';
    };

    return (
        <>
        <div className="snackBox-grid">
           
            <SnackPage />
        </div>
        </>
    )
}
