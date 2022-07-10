import { createMachine, assign, send, spawn } from 'xstate'
import { spawnedMachine } from '~/machines/spawnedMachine'
import { invokedMachine } from '~/machines/invokedMachine'

export const parentMachine = createMachine({
  id: 'parent',
  initial: 'step_one',
  context: {
    localOne: null
  },
  states: {
    step_one: {
      entry: assign({
        localOne: () => spawn(spawnedMachine)
      }),
      on: {
        'LOCAL.WAKE': {
          actions: send({ type: 'WAKE' }, { to: context => context.localOne })
        },
        'REMOTE.ONLINE': { target: 'step_two' }
      }
    },
    step_two: {
      src: invokedMachine,
      onDone: 'step_three'
    },
    step_three: {
      type: 'final'
    }
  }
})
