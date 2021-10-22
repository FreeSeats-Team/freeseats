import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../logo.svg'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper href="http://course.ece.cmu.edu/~ece500/projects/f21-teama3/">
                <img src={logo} width="50" height="50" alt="http://course.ece.cmu.edu/~ece500/projects/f21-teama3/" />
            </Wrapper>
        )
    }
}

export default Logo
