// Core
import React from "react";

// Components
import Counter from "./";
import dom from "react-test-renderer";

const render = dom.create(<Counter postCount = { 3 } />);

test("<Counter /> should render 3", () => {
    expect(render).toMatchSnapshot();
});
