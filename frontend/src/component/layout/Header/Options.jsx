import React, { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import "./Options.css"

const Options = () => {
    const [open, setOpen] = useState(false);
    return (
        <Fragment>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                className="speedDial"
                // icon={
                //     <img
                //         className="speedDialIcon"
                //         src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                //         alt="Profile"
                //     />
                // }
            ></SpeedDial>
        </Fragment>

    );
}

export default Options