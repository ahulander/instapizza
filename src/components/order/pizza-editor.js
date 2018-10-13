import React from 'react';
import { toppings as AllToppings, getPrice, calculatePrice } from './constants';
import { Button, ButtonClose } from '../common/button';
import { Checkbox } from '../common/checkbox';

export default class PizzaEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toppings: AllToppings.reduce((prev, cur) => {
                prev[cur] = false;
                return prev;
            }, {}),
            hidden: true
        };

        this.onHandleToppingChange = this.onHandleToppingChange.bind(this);
    }
    
    onPizzaFinished(abort) {

        if (abort) {
            this.props.onPizzaCompleted(null);
        }
        else {
            const pizza = {...this.state.selectedPizza};
            pizza.toppings = Object.keys(this.state.toppings).filter(topping => this.state.toppings[topping]);
            this.props.onPizzaCompleted(pizza);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const pizza = this.props.pizza;
        if (prevProps.pizza !== pizza) {
            let nextState = {
                hidden: pizza === null
            };
            if (pizza !== null) {
                let toppings = this.state.toppings;
                Object.keys(toppings).forEach(key => {
                    toppings[key] = pizza.toppings.find(topping => topping === key) !== undefined;
                });
                nextState.selectedPizza = pizza;
                nextState.price = pizza.price - calculatePrice(pizza.toppings);
            }
            this.setState(nextState);        
        }
        
    }

    onHandleToppingChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let toppings = this.state.toppings;
        toppings[name] = value;
        this.setState({
            toppings: toppings
        });
    }

    render() {
        
        const classNames = [
            "pizza-editor",
            this.state.hidden ? "hidden" : null
        ].filter(c => c != null).join(" ");

        const toppings = Object.keys(this.state.toppings).map(key => ({
            name: key,
            value: this.state.toppings[key],
            price: getPrice(key)
        }));

        const pizzaName = this.state.selectedPizza ? this.state.selectedPizza.name : 'Välj en pizza';
        const price = this.state.price + calculatePrice(
            Object.keys(toppings).filter(k => toppings[k].value)
        );

        return (
            <div className={classNames}>
                <div className="pizza-editor__container">
                    <h2 className="pizza-editor__header">
                        <span className="pizza-editor__header__title">
                            {pizzaName}
                            <span className="pizza-editor__price">{`${price} kr`}</span>
                        </span>
                        <ButtonClose onClick={() => this.onPizzaFinished(true)} />
                            {/* className="pizza-editor__btn-close" */}
                        
                    </h2>
                    <div className="pizza-editor__toppings">
                        { toppings.map( (topping, i) => 
                            <Checkbox
                                key={`pizza-editor-toppings-${i}`}
                                name={`${topping.name}`}
                                value={topping.value}
                                onChange={this.onHandleToppingChange}
                            >
                                <span>{topping.name}</span>
                                <span className="pizza-editor__price">{`${topping.price} kr`}</span>
                            </Checkbox>
                        )}
                    </div>
                    <div className="pizza-editor__btn-container">
                        <div className="pizza-editor__count">

                        </div>
                        <Button
                            className="pizza-editor__btn-done"
                            onClick={() => this.onPizzaFinished()}
                        >
                            Klar
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
