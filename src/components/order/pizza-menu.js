import React from 'react';
import { pizzas as AllPizzas } from './constants'

function Pizza({pizza, onSelect}) {
    return (
        <div className="pizza-menu__pizza" onClick={() => onSelect(pizza)}>
            <div>
                <span className="pizza-menu__pizza__header">{pizza.name}</span>
                { pizza.folded ? <span className="pizza__folded">Inbakad</span> : null }
                <span className="pizza__price">{`${pizza.price} kr`}</span>
            </div>
            <ul className="pizza-menu__pizza__toppings">
                { pizza.toppings.map((topping, i) => 
                    <li
                        className="pizza-menu__pizza__toppings__topping"
                        key={`topping-${i}`}
                    >{topping}</li>
                )}
            </ul>
        </div>
    );
}

export default function PizzaMenu({onSelectPizza}) {

    return (
        <div className="pizza-menu">
            { AllPizzas.map((pizza, i) => <Pizza pizza={pizza} onSelect={onSelectPizza} key={`pizza-${i}`}/>) }
        </div>
    );
}
