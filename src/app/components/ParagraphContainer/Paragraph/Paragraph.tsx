'use client'
import classes from './Paragraph.module.css';

const Paragraph = ({ text }) => {
    return (
        <>
            <p className={classes.spacing}>
                {text}
            </p>
        </>
    )
}

export default Paragraph;