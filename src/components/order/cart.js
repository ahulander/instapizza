import React from 'react';
import { Button } from '../common/button';

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

export default function Cart({onPlaceOrder, pizzas, isPopup}) {
    return (
        <div className="cart">
            <Button
                disabled={pizzas.length === 0}
                className="cart__btn-checkout"
                onClick={onPlaceOrder}
            >Beställ</Button>
            { pizzas.map((pizza, i) => <Pizza pizza={pizza} key={`checkout-pizza-${i}`} onSelect={() => {}} />) }
        </div>
    );
}
