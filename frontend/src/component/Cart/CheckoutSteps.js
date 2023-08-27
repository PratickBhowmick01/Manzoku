import React, {Fragment} from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./CheckoutSteps.css";


const CheckoutSteps = ({activeStep}) => {
    const steps = [
        {
            label: <Typography style={{color: activeStep >= 0 ? 
                "rgb(171, 142, 107)" : "black"}}>Shipping Details</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            label: <Typography style={{color: activeStep >= 1 ? 
                "rgb(171, 142, 107)" : "black"}}>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />
        },
        {
            label: <Typography style={{color: activeStep >= 2 ? 
                "rgb(171, 142, 107)" : "black"}}>Payment</Typography>,
            icon: <AccountBalanceIcon />
        }

    ];

    const stepStyles = {
        boxSizing: "border-box",
        background: "none",
        
    };

    return (
        <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {steps.map((item, index) => (
                    <Step key={index} active={activeStep === index ? true : false}
                    completed={activeStep >= index ? true : false}
                    >
                        <StepLabel style={{color: activeStep >= index ? 
                        "rgb(171, 142, 107)" : "black",
                    }}
                        icon={item.icon}>{item.label}</StepLabel>

                    </Step>
                ))}

            </Stepper>

          

        </Fragment>
    )
};

export default CheckoutSteps;