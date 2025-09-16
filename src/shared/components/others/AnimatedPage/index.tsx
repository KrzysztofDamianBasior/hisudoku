import React from "react";
import { motion } from "motion/react";

const animations = {
    initial: {
        opacity: 0,
        // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
    },
    animate: {
        opacity: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    },
    exit: {
        opacity: 0,
        // clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    },
};

type Props = {
    children: React.ReactNode;
};

const AnimatePageTransition = ({ children }: Props) => {
    // useEffect(() => {
    //     window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    // }, []);

    //  React doesn’t provide a method that notifies components when they’re about to be unmounted or allows them to delay the unmounting. Instead, the components simply disappear from the DOM, making them hard to animate.
    // AnimatePresence animates the direct children, we need to provide the <Component> to which we’re returning a unique key
    // <AnimatePresence
    //   mode="wait": This just tells Framer Motion to complete any exit animations (exiting page) before starting a new animation (new page) on the new component
    // mode={"wait"}
    // initial={false}
    // The default behavior of the Link component in Next.js is to scroll to the top of the page before changing pages, but we want the navigation and the transition to start immediately after the Link is clicked. One solution to this is to add the scroll={false} prop on all Link components. There’s no way to change the default behavior of Link components. Unfortunately, that creates a new problem.  Once we scroll down and transition to the new page, Next.js persists the scroll position and we land in the middle of the new page. This is clearly not a great user experience. Fixing this issue is easy with the attribute on root <AnimatePresence>, where we can add any onExitComplete function. All we have to do is scroll the window back to the top once the exit animation is complete. Then, regardless of the page length, the new page will start from the top:
    // onExitComplete={() => window.scrollTo(0, 0)}
    // >

    return (
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 2 }}
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatePageTransition;
