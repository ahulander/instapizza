
export const toppings = [
    'Pepperoni',
    'Mozzarella',
    'Chaminjoner',
    'Bacon',
    'Lök',
    'Rödlök',
    'Korv',
    'Chili',
    'Basilika',
    'Tomat',
    'Ananas',
    'Oliver',
    'Skinka',
    'Paprika',
    'Parmersan',
    'Kyckling',
    'Jalapeño',
    'Spenat',
    'Salami',
    'Pesto',
    'Musslor',
    'Fetaost',
    'Soltorkade Tomater',
    'BBQ-sås',
    'Mildsås',
    'Starksås',
    'Tacosås',
    'Kebabsås',
    'Ost',
    'Rostad Lök',
    'Pulled Pork',
    'Getost',
    'Kronärtskocka',
    'Anjovis',
    'Gorgonzola',
    'Banan',
    'Kebab',
    'Rucola',
    'Majs',
    'Räkor',
    'Ägg',
    'Tonfisk',
    'Kräftor',
    'Krabba',
    'Lax',
    'Tomatsås',
    'Köttfärs',
    'Peperoncini',
    'Kapris',
    'Sparris'
];

export function getPrice(topping) {
    return Math.max(5, Math.floor(topping.length / 5) * 5);
}

export function calculatePrice(toppings) {
    return toppings.reduce((prev, cur) => {
        return prev + getPrice(cur);
    }, 0);
}

function toPizza(name, toppings, price, folded) {
    return { name, toppings, price, folded };
}

export const pizzas = [

    toPizza('Bolognese', ['Köttfärs', 'Tomat', 'Lök'], 60), 
    toPizza('Calzone', ['Skinka'], 70, true),
    toPizza('Capricciosa', ['Champinjoner', 'Skinka'], 70), 
    toPizza('Ciao', ['Skinka', 'Lök'], 70, true), 
    toPizza('Frutti di mare', ['Tonfisk', 'Musslor', 'Räkor'], 70), 
    toPizza('Hawaii', ['Skinka', 'Ananas'], 70), 
    toPizza('Kebabpizza', ['Kebab', 'Lök', 'Peperoncini', 'Kebabsås'], 70), 
    toPizza('Marinara', ['Räkor', 'Musslor'], 70), 
    toPizza('Mexicana', ['Köttfärs', 'Jalapeños', 'Lök', 'Stark sås'], 70), 
    toPizza('Napolitana', ['Anjovis', 'Oliver', 'Kapris'], 70), 
    toPizza('Quattro', ['Skinka', 'Räkor', 'Musslor', 'Champinjoner', 'Kronärtskocka'], 70), 
    toPizza('Vegetariana', ['Champinjoner', 'Lök', 'Ananas', 'Kronärtskocka', 'Sparris', 'Paprika'], 70),
    toPizza('Peperoni', ['Peperoni', 'Tomatsås', 'Mozzarella'], 70),
    toPizza('Maltija', ['Tomatsås', 'Getost', 'Soltorkade Tomater', 'Korv', 'Lök'], 70)
];

export function randomPizza() {
    const index = Math.floor(Math.random() * pizzas.length);
    const result = {...pizzas[index]};
    return result;
}
