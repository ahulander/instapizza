import React from 'react';
import Splash from './splash';

function formatName(name) {
    return name.toLocaleLowerCase()
        .replace(/[åä]/g, 'a')
        .replace(/ö/g, 'o')
        .replace(/[^\w\s]/gi, '')
        .replace(/\s/g, '-');
}

function Rating({rating}) {
    
    let content = [];
    for (let i = 0; i < rating; ++i) {
        content.push(<span className="star" key={`star-${i}`}>&#9733;</span>)
    }

    return (
        <span className="rating">
            {content}
        </span>
    );
}

function PizzaPlace({name, history, src, rating}) {
    return (
        <div className="pizza-place">
            <div
                className="pizza-place__content"
                onClick={() => history.push(`/order/${formatName(name)}`)}
            >
                <h2 className="pizza-place__title">
                    {name}
                    <Rating rating={rating}/>
                </h2>
                <div className="pizza-place__image__container">
                    <div className="pizza-place__image">
                        <img alt="" src={src} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Home(props) {
    return (
        <div className="main-content">
            <h1 className="home-header">
                <img className="order__logo" src="/assets/instapizza-logo-2.svg" alt="" />
            </h1>
            <div className="home-container">
                <PizzaPlace history={props.history} name="Grändens Pizzeria" src="/assets/photos/pizza-0.jpg" rating={5}/>
                <PizzaPlace history={props.history} name="Pizzakanten" src="/assets/photos/pizza-1.jpg" rating={3}/>
                <PizzaPlace history={props.history} name="Källar'n" src="/assets/photos/pizza-2.jpg" rating={2}/>
                <PizzaPlace history={props.history} name="Top Notch" src="/assets/photos/pizza-3.jpg" rating={4}/>
                <PizzaPlace history={props.history} name="Bränt var det här" src="/assets/photos/pizza-4.jpg" rating={5}/>
                <PizzaPlace history={props.history} name="Ost och Ost" src="/assets/photos/pizza-5.jpg" rating={2}/>
            </div>
            <Splash />
        </div>
    );
}
