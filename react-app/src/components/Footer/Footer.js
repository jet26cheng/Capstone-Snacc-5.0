import './Footer.css'
import gh from '../../assets/gh.svg'
import li from '../../assets/li.svg'
import pr from '../../assets/pr.svg'

export default function Footer() {
    return (
        <>
            <div className="footer-space"></div>
            <div className="footer-wrapper">
                <div className="footer-inner-container">
                    <div>Jeddy Cheng</div>
                    <div>
                        <a href="https://github.com/jet26cheng" target="_blank">
                            <img className="footer-ico1" src={gh} />
                        </a>

                        <a href="https://www.linkedin.com/in/jeddy-cheng" target="_blank">
                            <img className="footer-ico2" src={li} />
                        </a>

                        <a href="https://jet26cheng.github.io/Jeddy-Portfolio/" target="_blank">
                            <img className="footer-ico3" src={pr} />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
