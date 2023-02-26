import React from "react";
import '../App'

const Footer = () => {
    const scrollup = () => {
        window.scrollTo(0, 0);
    }
    var date = new Date();
    let showDate = date.toDateString()
    let hour = date.getHours()
    let time = date.getMinutes()
    return (
        <div className="footer">
            <p>@Ecomm DashBoard</p>
            <p className="clock">{showDate} / {hour}:{time}</p>
            <button onClick={scrollup} className="scrollup">Λ</button>
        </div>
    )
}
export default Footer;