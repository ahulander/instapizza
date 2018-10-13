import React from 'react';

export default class Splash extends React.Component {
    
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);

        this.state = {
            hidden: false
        };
    }

    onClick() {
        this.setState({hidden: true});
    }

    render() {

        const classNames = [
            "splash",
            this.state.hidden ? "hidden" : ""
        ].join(" ");

        return (
            <div className={classNames}>
                <img
                    onClick={this.onClick}
                    className="logo-splash"
                    src="/assets/instapizza-logo.svg"
                    alt=""
                />
            </div>
        );
    }
}
