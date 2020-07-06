import React from 'react';
import {Container, Content, Spinner} from 'native-base';
import styles from '../../Styles/styles'

const Loading = () => (
  <Container>
    <Content contentContainerStyle={{...styles.container, justifyContent: 'center'}}>
      <Spinner color="blue" />
    </Content>
  </Container>
);

export default Loading;
