import React from 'react';
const styles = require('./MyComponent.css');
await Promise.resolve(1);
export class MyComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const a = {};
        console.log({ ...a });
        return React.createElement("div", { className: styles.myComponent }, "Hello world");
    }
}
//# sourceMappingURL=MyComponent.js.map