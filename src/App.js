import React from 'react'
import axios from './api/axios'
import style from './lib/style'
import { Container, Segment, Header } from 'semantic-ui-react'

class App extends React.Component {
  state = {
    countries: []
  }

  componentDidMount() {
    axios.get(`countries`)
      .then(res => {
        const countries = res.data.api.countries;
        this.setState({ countries });
      })
  }

  render() {
    return (
      <div>
        <Header as='h1' content='Countries' style={style.headers.h1} textAlign='center' />
        <Container>
          <Segment.Group>
            {this.state.countries.map(country => <Segment><a href={`/countries/${country.code}`}>{country.country}</a></Segment>)}
          </Segment.Group>
        </Container>
      </div>
    )
  }
}
export default App