import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

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

const SettingsHeader = ({ settings, setSettings }) => {
  const [open, setOpen] = React.useState(true)

  const setCalculateOdds = event => {
    const calculateOdds = new Function(event.currentTarget.value)
    setSettings({ ...settings, calculateOdds })
  }

  return (<Header>
    <SettingsButton onClick={() => setOpen(!open)}>
      <SettingsIcon />
    </SettingsButton>
    <H1>Odds Stabilizer</H1>
    <Settings open={open}>
      <label htmlFor="calculate-odds-fn">Odds calculation</label>
      <textarea id="caluclate-odds-fn" value={settings.calculateOdds.toString()} onChange={setCalculateOdds} />
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