import React from 'react'
import { Button } from 'antd'

const styles = require('./MyComponent.css')

export class MyComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  render() {
    const a = {}
    console.log({ ...a })
    return (
      <div className={styles.myComponent}>
        <Button type="primary">Hello world</Button>
      </div>
    )
  }
}
