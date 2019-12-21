import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="Footer">
                <div className="Icons">
                    <div>Fb</div>
                    <div>Twitter</div>
                    <div>Google</div>
                    <div>In</div>
                    <div>Instagram</div>
                </div>
                <div className="Info">
                    <p className="Copyrights">&copy; 2019 Copyrights</p>
                    <p className="Author">Krzysztof Miszke</p>
                </div>
            </div>
        )
    }
}

export default Footer;