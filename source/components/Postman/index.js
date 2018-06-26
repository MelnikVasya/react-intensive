// Core
import React from "react";

// Instruments
import Styles from "./styles.m.css";

//hocs
import { withProfile } from "hoc/withProfile";

const Postman = ({ avatar, currentUserFirstName }) => (
    <section className = { Styles.postman }>
        <img src = { avatar } />
        <span>
            Welcome online,{"\n"}
            <b>{currentUserFirstName}</b>
            !
        </span>
    </section>
);

export default withProfile(Postman);
