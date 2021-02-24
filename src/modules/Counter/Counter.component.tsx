import React from 'react'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { app } from '../../store'

export const CounterModel = app.model('Counter', { total: 50 })

const [mutations] = CounterModel.mutations({
  increase: () => (s) => s.set('total', s.total + 1),
  decrease: () => (s) => s.set('total', s.total - 1),
})

export const Counter = () => {
  const total = useSelector(CounterModel.selectors.total)
  const dispatch = useDispatch()

  return (
    <div>
      <Button type="primary" onClick={() => dispatch(mutations.decrease())}>
        -
      </Button>
      {total}
      <Button type="primary" onClick={() => dispatch(mutations.increase())}>
        +
      </Button>
    </div>
  )
}
