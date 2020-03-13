import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

import Layout from 'components/Layout'
import Header from 'components/Header'
import CloseIcon from 'images/CloseIcon'

const CloseLink = styled(Link)`
  color: white;
  text-decoration: none;
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;

  > svg {
    height: 20px;
    width: 20px;
  }
`

const H1 = styled.h1`
  margin: 0;
`

const SettingsPage = () => (
  <Layout>
    <Header>
      <CloseLink to="/"><CloseIcon /></CloseLink>
      <H1>Settings</H1>
    </Header>
  </Layout>
)

export default SettingsPage