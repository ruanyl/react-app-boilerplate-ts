import * as React from 'react'
import { Col, Row } from 'antd'
import { render } from 'react-dom'

import { MyComponent } from './MyComponent'

render(
  <>
    <Row>
      <Col span={24}>
        <MyComponent />
      </Col>
    </Row>
  </>,
  document.getElementById('root')
)
