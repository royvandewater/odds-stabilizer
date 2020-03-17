import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { debounce } from 'debounce'

import Header from 'components/Header'
import SettingsIcon from 'images/SettingsIcon'

const H1 = styled.h1`
  margin: 0;
`

const SettingsButton = styled.button`
  color: white;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
`

const Settings = styled.div(({ open }) => `
  display: ${open ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  padding: 32px 8px;

  label {
    margin-bottom: 8px;
  }

  textarea {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    font-size: 24px;
    background: #282c34;
    color: white;
    height: 25vh;
    width: 50vw;
  }
`)

const Error = styled.p`
  color: red;
`

const formatFunction = (fn) => {
  const lines = fn.toString().split('\n')
  return lines.splice(1, lines.length - 2).join('\n')
}

const SettingsHeader = ({ settings, setSettings }) => {
  const [open, setOpen] = React.useState(false)
  const [calcFnStr, setCalcFnStr] = React.useState(formatFunction(settings.calculateOdds))
  const [error, setError] = React.useState(null)

  const setCalculateOdds = debounce(value => {
    try {
      const calculateOdds = new Function(value)
      setError(null)
      setSettings({ ...settings, calculateOdds })
    } catch (e) {
      setError(e)
    }
  }, 1000)

  React.useEffect(() => {
    setCalculateOdds(calcFnStr)
  }, [calcFnStr])

  return (<Header>
    <SettingsButton onClick={() => setOpen(!open)}>
      <SettingsIcon />
    </SettingsButton>
    <H1>Odds Stabilizer</H1>
    <Settings open={open}>
      <label htmlFor="calculate-odds-fn">Odds calculation</label>
      <textarea 
        id="caluclate-odds-fn" 
        value={calcFnStr} 
        onChange={event => setCalcFnStr(event.currentTarget.value) } />
      {error && <Error>Syntax Error: {error.message}</Error>}
    </Settings>
  </Header>)
}

SettingsHeader.propTypes = {
  settings: PropTypes.shape({
    calculateOdds: PropTypes.func.isRequired,
  }).isRequired,
  setSettings: PropTypes.func.isRequired,
}

export default SettingsHeader