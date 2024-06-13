import React, {useEffect, useRef} from "react";
import {motion, useInView, useAnimation} from "framer-motion";

interface Props {
    children: JSX.Element;
    width?: "fit-content" | "100%";
}

export const Reveal = ({children, width ="fit-content"}:Props)  => {
    const ref = useRef(null);
    const isInView = useInView(ref, {once : true});
    const mainControls =useAnimation()
    const slideControls =useAnimation()
    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
            slideControls.start("visible")
            //Fire the animation
        }
    },[isInView])
    return(
        <div ref={ref} style={{ position: "relative" , width, overflow: "hidden"}}>
            <motion.div
            variants={{
                hidden: {opacity: 0, y:75},
                visible: {opacity: 1, y:0},
            }}
            initial="hidden"
            animate="visible"
            transition={{duration: 0.5, delay:0.25, ease: "easeInOut"}}
            >{children}</motion.div>

        <motion.div
            variants={{
                hidden: {left:0},
                visible: {left:"100%"},
            }}
            initial="hidden"
            animate={slideControls}
            transition={{duration: 0.5, ease: "easeInOut"}}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "70%",
                height: "100%",
                background: "#676f9d",
                zIndex:70
            }}
            ></motion.div>

        </div>
        )}