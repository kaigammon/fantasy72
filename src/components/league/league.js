import React from 'react'
import axios from '../../api/axios'
import style from '../../lib/style'
import { Container, Segment, Header } from 'semantic-ui-react'

class League extends React.Component {
    state = {
        fixtures: [],
        teams: []
    }

    componentDidMount() {
        const { params } = this.props.match
        axios.get(`fixtures/league/${params.id}`)
            .then(res => {
                const fixtures = res.data.api.fixtures
                this.setState({ fixtures })
            })
        axios.get(`teams/league/${params.id}`)
            .then(res => {
                const teams = res.data.api.teams
                this.setState({ teams })
            })
    }

    render() {
        return (
            <div>
              {/* <Header as='h1' content='Teams' style={style.headers.h1} textAlign='center' />
              <Container>
                <Segment.Group>
                  {this.state.teams.map(team => <Segment><a href={`/teams/${team.team_id}`}>{team.name}</a></Segment>)}
                </Segment.Group>
              </Container> */}
              <Header as='h1' content='Fixtures' style={style.headers.h1} textAlign='center' />
              <Container>
                <Segment.Group>
                  {this.state.fixtures.map(fixture => <Segment><a href={`/fixtures/${fixture.fixture_id}`}>{`${fixture.homeTeam.team_name} vs. ${fixture.awayTeam.team_name}`}</a></Segment>)}
                </Segment.Group>
              </Container>
            </div>
        )
    }
}
export default League