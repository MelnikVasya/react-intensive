import React, { Component, createContext } from "react";

import { getDisplayName } from 'instruments';

const { Provider, Consumer } = createContext();

const withProfile = (WrappedComponent) => {
    class WithPofile extends Component {
        render () {
            return (
                <Consumer>
                    {(context) => (
                        <WrappedComponent { ...context } { ...this.props } />
                    )}
                </Consumer>
            );
        }
    }

    WithPofile.displayName = `WithPofile(${getDisplayName(WrappedComponent)})`;

    return WithPofile;
};


export { Provider, withProfile };
