import "../styles/Hero.css";

export default function Hero() {
    return (
        <div className="hero--wrapper">
            <div className="background"></div>
            <div className="content">
                <div className="hero--text">
                    <p><span className="blue">Travel</span> is the only thing you <br /> buy that makes you <span className="blue">richer</span></p>
                </div>
                <div className="hero--search--box">
                    <input type="text" className="hero--large--input" placeholder="ORIGIN" />
                    <input type="text" className="hero--large--input" placeholder="DESTINATION" />
                    <input type="date" className="hero--large--input" placeholder="DD/MM/yyyy" pattern="\d{2}/\d{2}/\d{4}" />
                    <button className="hero--search--btn">SEARCH</button>
                </div>
            </div>
        </div>
    )
}

