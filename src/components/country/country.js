import React from 'react'
import axios from '../../api/axios'
import style from '../../lib/style'
import { Container, Segment, Header } from 'semantic-ui-react'

class Country extends React.Component {
    state = {
        leagues: []
    }

    componentDidMount() {
        const { params } = this.props.match
        axios.get(`leagues/country/${params.id}/2019`)
            .then(res => {
                const leagues = res.data.api.leagues;
                this.setState({ leagues });
            })
    }

    render() {
        return (
            <div>
              <Header as='h1' content='Leagues' style={style.headers.h1} textAlign='center' />
              <Container>
                <Segment.Group>
                  {this.state.leagues.map(league => <Segment><a href={`/leagues/${league.league_id}`}>{league.name}</a></Segment>)}
                </Segment.Group>
              </Container>
            </div>
        )
    }
}
export default Country