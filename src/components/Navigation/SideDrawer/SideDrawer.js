import React from 'react';
import classes from './SideDrawer.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Aux from '../../../hoc/AUX/Aux';
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
    //...
    let attachedClass = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClass = [classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.close}/>
            {/*<Backdrop show={true}/>*/}
            <div className={attachedClass.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;