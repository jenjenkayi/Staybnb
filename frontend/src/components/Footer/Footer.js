import './Footer.css';

const Footer = () => {

return (
    <footer className='footer-container'>
        <div className="footer-background"></div>
            <div className='footer-info'>Connect With The Developer!</div>
                <div className='footer-links'>
                    <i className="fa-brands fa-github"></i>
                    <a 
                        className='about-me-link'
                        href='https://github.com/jenjenkayi'
                        target="_blank"
                        rel="noreferrer">
                        Github
                    </a>
                    <i className="fa-brands fa-linkedin"></i>
                    <a 
                        className='about-me-link'
                        href='https://www.linkedin.com/in/jenny-jiang-81033b48/'
                        target="_blank"
                        rel="noreferrer">
                        LinkedIn
                    </a>
                </div>
    </footer>
    )
}

export default Footer;