import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css'

const Burger = (props) => {
    /**
     * It has a keys method which extracts the keys of a given object and turns that into an array
     * .map transform this string value into an array with
     *  as many elements as we have ingredients for a given ingredient.
     *
     *  ****** This is the method transform object with key-value pairs to an array ***********
     */
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) =>{
                return <BurgerIngredient key={igKey+i} type={igKey}/>
            });
        }).reduce((arr,el) => {//flatten the array
            return arr.concat(el)
        }, []);// check out the documentation of those default js array functin like .map and  .reduce
    if (transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>;
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type={'bread-top'}/>
            {transformedIngredients}
            <BurgerIngredient type={'bread-bottom'}/>
        </div>
    );
}

export default Burger;