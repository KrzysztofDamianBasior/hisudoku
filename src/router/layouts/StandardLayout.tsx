import { Outlet } from "react-router-dom";
import AnimatePageTransition from "../../shared/components/others/AnimatedPage";

const StandardLayout = () => {
    return (
        <AnimatePageTransition>
            <Outlet />
        </AnimatePageTransition>
    );
};

export default StandardLayout;
