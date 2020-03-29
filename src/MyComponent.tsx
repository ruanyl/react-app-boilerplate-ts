import React from 'react'

const styles = require('./MyComponent.css')

export class MyComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  render() {
    const a = {}
    console.log({ ...a })
    return <div className={styles.myComponent}>Hello world</div>
  }
}
