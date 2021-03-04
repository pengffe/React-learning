import React, {Component} from "react";
import Aux from '../../hoc/AUX/Aux';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios-orders";

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.5,
    bacon: 0.7,
    meat: 1.0
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //
    //     }
    // }
    state = {
        ingredients:{
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat:0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'phil',
                address: {
                    street: '8 franklin',
                    suburb: 'West Melbourne'
                },
                email:'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false, purchasing: false});
            })
    }

    updatePurchasable = (ingredients) => {
        // const ingredients = {...this.state.ingredients};
        // not use this.state which may get the outdated version of state
        const sum = Object.keys(ingredients)
            .map(igKeys => {
                return ingredients[igKeys];
            })
            .reduce((sum, el)=>{
                return sum + el;
            },0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const updateTotalPrice = this.state.totalPrice + INGREDIENT_PRICE[type];

        this.setState({ingredients: updateIngredients, totalPrice: updateTotalPrice} )
        /**
         * the above this.setState may not update the state immediatelly
         * so if here updatePurchasable() to execute on the this.state, it may get the old version
         * so we pass the updateIngredients to the this.updatePurchasable()
         */
        this.updatePurchasable(updateIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return
        }
        const updateCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const updateTotalPrice = this.state.totalPrice - INGREDIENT_PRICE[type];

        this.setState({ingredients: updateIngredients, totalPrice: updateTotalPrice} )
        this.updatePurchasable(updateIngredients);
    }

    render() {
        const disabledInfo = {...this.state.ingredients}
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = <OrderSummary
            totalPrice={this.state.totalPrice}
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
        />;
        if (this.state.loading){
            orderSummary = <Spinner/>
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    disabled={disabledInfo}
                    add={this.addIngredientHandler}
                    remove={this.removeIngredientHandler}/>
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);

