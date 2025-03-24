'use client'
import { useFadeIn } from "@/app/hooks/FadeIn/useFadeIn";
import animationClasses from '@/app/hooks/useFadeInArray/Animations.module.css';

const ParagraphContainer = ({ children }) => {
    const { ref: ref1, isVisible: isVisible1 } = useFadeIn();
    return (
        <>
            <div
                ref={ref1}
                className={`${animationClasses['fade-in']} ${isVisible1 ? animationClasses['fade-in-visible'] : ''}`}
            >
                {children}
            </div>
        </>
    )
}

export default ParagraphContainer;