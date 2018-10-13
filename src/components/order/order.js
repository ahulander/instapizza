import React from 'react';
import PizzaMenu from './pizza-menu'
import PizzaEditor from './pizza-editor';
import Cart from './cart'
import { randomPizza } from './constants';
import { Button, ButtonClose } from '../common/button';

function Loading({hidden}) {

    const classNames = [
        "loading",
        hidden ? "hidden" : ""
    ].join(" ");

    return (
        <div className={classNames}>
            <div className="loading__ball loading__ball-0"></div>
            <div className="loading__ball loading__ball-1"></div>
            <div className="loading__ball loading__ball-2"></div>
            <div className="loading__ball loading__ball-3"></div>
        </div>
    );
}

class OrderPizzaPopup extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            waiting: true
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.show && !prevProps.show) {
            
            this.setState({
                waiting: true
            });

            if (this.timeout !== undefined) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(() => {
                console.log("Timeout!");
                this.timeout = undefined;
                this.setState({
                    waiting: false
                });
            }, (5.0 + Math.random() * 5.0) * 1000);
        }
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        const waiting = this.state.waiting;

        return (
            <div className="order-pizza__popup">
                <div className="order_pizza__popup__container">
                    <h2 className="order-pizza__popup__header">Kontaktar pizzerian</h2>
                    <p className="order-pizza__popup__info">
                        { waiting
                            ? "Väntar på order bekräftelse. Det här kan ta ett par timmar."
                            : "Tyvärr så har pizzerian stängt. Testa gärna igen lite senare eller välj en annan restaurang."
                        }
                    </p>
                    <Loading hidden={!waiting}/>
                    <Button
                        className="btn-secondary"
                        onClick={this.props.onDismiss}
                    >
                        Avbryt
                    </Button>
                </div>
            </div>
        );
    }
}

function CartMobile({children, show, onDismiss, onShow, disabled}) {
    const classNames = [
        "popup",
        show ? "" : "hidden"
    ].join(" ");
    return (
        <div className="cart-mobile">
            <Button
                disabled={disabled}
                onClick={onShow}
                className="cart-mobile__btn"
            >
                { disabled ? "Välj en pizza först" : "Till kassan" }
            </Button>
            <div className={classNames}>
                <div className="cart-popup">
                    <ButtonClose onClick={onDismiss} />
                    {/* className="pizza-editor__btn-close"*/}
                    
                    {children}
                </div>
            </div>
        </div>
    );
}

function I({children}) {
    return (
        <span className="italics">
            {children}
        </span>
    );
}

function Popup({show, previousName, name, addedToppings, removedToppings, onDismiss}) {
    
    const classNames = [
        'pizza-editor',
        show ? null : 'hidden'
    ].filter(c => c != null).join(' ');

    addedToppings = addedToppings || [];
    removedToppings = removedToppings || [];

    const removed = <span>utan <I>{removedToppings.join(', ')}</I></span>;
    const added = <span>med <I>{addedToppings.join(', ')}</I></span>;

    return (
        <div className={classNames}>
            <div className="pizza-editor__container popup__container">
                <div>
                    <ButtonClose onClick={onDismiss} />                    
                </div>
                <div>
                    <span>Vi bytte ut din {previousName} mot en {name} {removed} {removedToppings.length > 0 && addedToppings.length > 0 ? 'och' : null} {added} efter som det passar bättre!</span>
                </div>
            </div>
        </div>
    )
}

export default class Order extends React.Component {
    constructor(props) {
        super(props);

        this.onSelectPizza = this.onSelectPizza.bind(this);
        this.onPizzaCompleted = this.onPizzaCompleted.bind(this);
        this.onDismissPopup = this.onDismissPopup.bind(this);
        this.onDismissMobileCartPopup = this.onDismissMobileCartPopup.bind(this);
        this.onShowMobileCartPopup = this.onShowMobileCartPopup.bind(this);
        this.onDismissOrderPopup = this.onDismissOrderPopup.bind(this);
        this.onPlaceOrder = this.onPlaceOrder.bind(this);
        
        this.state = {
            pizzas: [],
            popup: {
                show: false
            },
            mobileCartPopup: {
                show: false
            },
            orderPopup: {
                show: false
            }
        };
    }

    onSelectPizza(pizza) {
        this.setState({
            selectedPizza: pizza
        });
    }

    onPizzaCompleted(pizza) {
        let nextState = {
            selectedPizza: null
        };
        if (pizza) {
            nextState.pizzas = this.state.pizzas.concat(this.swapPizza(pizza));
        }
        this.setState(nextState);
    }

    swapPizza(pizza) {

        let result = randomPizza();
        const same = pizza.toppings.filter(t0 => result.toppings.find(t1 => t0 === t1));
        const added = pizza.toppings.filter(t0 => !same.find(t1 => t0 === t1));
        const removed = result.toppings.filter(t0 => !same.find(t1 => t0 === t1));
        
        result.toppings = [...pizza.toppings];

        this.showPopup(result.name, pizza.name, added, removed);
        
        return result;
    }

    showPopup(name, previousName, addedToppings, removedToppings) {
        this.setState({
            popup: {
                show: true,
                name,
                previousName,
                addedToppings,
                removedToppings
            }
        });
    }

    onDismissPopup() {
        this.setState({
            popup: {
                ...this.state.popup,
                show: false
            }
        });
    }

    onShowMobileCartPopup() {
        this.setState({
            mobileCartPopup: {
                show: true
            }
        });
    }

    onDismissMobileCartPopup() {
        this.setState({
            mobileCartPopup: {
                show: false
            }
        });
    }

    onDismissOrderPopup() {
        this.setState({
            orderPopup: {
                show: false
            }
        });
    }

    onPlaceOrder() {
        this.setState({
            orderPopup: {
                show: true
            }
        });
    }

    render() {
        return (
            <div className="order main-content">
                <h1 className="main-content__header" onClick={() => {this.props.history.push("/");}}>
                    <img className="order__logo" src="/assets/instapizza-logo-2.svg" alt="" />
                </h1>
                <div className="order__container">
                    <PizzaMenu onSelectPizza={this.onSelectPizza}/>
                    <Cart onPlaceOrder={this.onPlaceOrder} pizzas={this.state.pizzas}/>
                </div>
                <CartMobile
                    disabled={this.state.pizzas.length === 0}
                    show={this.state.mobileCartPopup.show}
                    onShow={this.onShowMobileCartPopup}
                    onDismiss={this.onDismissMobileCartPopup}
                >
                    <Cart
                        onPlaceOrder={this.onPlaceOrder}
                        pizzas={this.state.pizzas}
                    />
                </CartMobile>
                <PizzaEditor pizza={this.state.selectedPizza} onPizzaCompleted={this.onPizzaCompleted}/>
                <Popup
                    show={this.state.popup.show}
                    name={this.state.popup.name}
                    previousName={this.state.popup.previousName}
                    addedToppings={this.state.popup.addedToppings}
                    removedToppings={this.state.popup.removedToppings}
                    onDismiss={this.onDismissPopup}
                />
                <OrderPizzaPopup
                    onDismiss={this.onDismissOrderPopup}
                    show={this.state.orderPopup.show}
                />
            </div>
        );
    }
}
