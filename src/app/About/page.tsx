import Paragraph from '../components/ParagraphContainer/Paragraph/Paragraph';
import ParagraphContainer from '../components/ParagraphContainer/ParagraphContainer';
import classes from './About.module.css';
import animationClasses from '../hooks/useFadeInArray/Animations.module.css';

const About = () => {
    return (
        <>
            <div className={`${classes['about-us-container']}`}>
                <ParagraphContainer>
                    <h3 className={classes['header3-large']}>About us</h3>
                    <h2 className={classes['header2-large']}>LocalHost Coffee</h2>
                    <Paragraph text={'aSGASDWSRHDLorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elementum varius sem, et pellentesque ante aliquam vitae. Aliquam justo neque, suscipit sollicitudin fermentum id, dignissim non nisi. Praesent volutpat ipsum vitae malesuada bibendum. Nullam vitae eros eget enim interdum interdum. Maecenas at cursus nisl. In dignissim, nunc et eleifend maximus, nunc felis mollis neque, et faucibus libero ligula non elit. Integer pulvinar consectetur metus, non porttitor augue venenatis nec.'}></Paragraph>
                    <Paragraph text={'POOPY'}></Paragraph>
                </ParagraphContainer>
            </div>
        </>
    )
}

export default About;