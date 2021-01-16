import v8n from 'v8n'
import { InputWithSettings } from '../../types/'
import { Spring, SpringSettings } from '../../types/public-api-types'
import { orderKeys } from '../../utils'
import { InternalNumberSettings, normalizeKeyValue } from '../Number/number-plugin'

type SpringInput = InputWithSettings<Spring, SpringSettings>

export type InternalSpring = { tension: number; friction: number; mass: number }
export type InternalSpringSettings = { [key in keyof InternalSpring]: InternalNumberSettings }

const number = v8n().number()

export const schema = (o: any) =>
  v8n()
    .schema({
      tension: number,
      friction: number,
      mass: v8n().optional(number),
    })
    .test(o)

const defaultTensionSettings = { min: 1 }
const defaultFrictionSettings = { min: 1 }
const defaultMassSettings = { min: 0.1 }

export const normalize = ({ value, ..._settings }: SpringInput) => {
  _settings = _settings || {}
  const settings = {
    tension: { ...defaultTensionSettings, ..._settings.tension },
    friction: { ...defaultFrictionSettings, ..._settings.friction },
    mass: { ...defaultMassSettings, ..._settings.mass },
  }
  const _value = orderKeys({ mass: 1, ...value }, ['tension', 'friction', 'mass'])
  return normalizeKeyValue(_value, settings)
}
