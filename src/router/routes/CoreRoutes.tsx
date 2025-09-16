import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import NoMatch from "../../pages/NoMatch";
import StandardLayout from "../layouts/StandardLayout";
import HomePage from "../../pages/Home/page";
import SudokuPage from "../../pages/Sudoku/page";
import FeedPage from "../../pages/Feed/page";

const CoreRoutes = () => {
    const location = useLocation();

    return (
        <Routes key={location.pathname} location={location}>
            <Route element={<StandardLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<Navigate to="/" />} />
                <Route path="/sudoku" element={<SudokuPage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    );
};

export default CoreRoutes;
