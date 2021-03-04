import React from 'react';
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.css'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                isDisabled={props.disabled[ctrl.type]}
                key={ctrl.label}
                label={ctrl.label}
                add={() => props.add(ctrl.type)}
                remove={() => props.remove(ctrl.type)}
            />
        ))}
        <button
            onClick={props.ordered}
            className={classes.OrderButton}
            disabled={!props.purchasable}>Order Now</button>
    </div>
);

export default buildControls;