import React from 'react'
import axios from '../../api/axios'
import style from '../../lib/style'
import { Container, Segment, Header, Label, Grid, Divider, Icon, List } from 'semantic-ui-react'
import { getScore, getStats } from '../../lib/player'

class Fixture extends React.Component {
    state = {
        teams: []
    }

    getRibbonColor(score) {
        if (score > 2) return 'teal'
        if (score < 2) return 'red'
        return 'yellow'
    }

    isStarPlayer(player) {
        console.log(player)
        let playersByScore = []
        this.state.teams.forEach((team) => {
            team.players.forEach((player) => {
                playersByScore.push(player)
            })
        })

        console.log(playersByScore)
        let topScore = Math.max.apply(Math, playersByScore.map(function(p) { return p.score; }))
        console.log(topScore)
        let starPlayers = playersByScore.filter((p) => p.score >= topScore)
        console.log(starPlayers)

        return starPlayers.some((p) => p.id === player.id)
    }

    componentDidMount() {
        const { params } = this.props.match
        axios.get(`fixtures/id/${params.id}`)
            .then(res => {
                const fixture = res.data.api.fixtures[0]
                const events = fixture.events
                const teams = [
                    { name: fixture.homeTeam.team_name, players: [], score: fixture.goalsHomeTeam },
                    { name: fixture.awayTeam.team_name, players: [], score: fixture.goalsAwayTeam }
                ]
                const players = fixture.players
                players.forEach((p) => {
                    teams.forEach((t) => {
                        if (p.team_name === t.name) {
                            t.players.push({ id: p.player_id, name: p.player_name, score: getScore(p), stats: getStats(p, events) })
                        }
                    })
                })
                this.setState({ teams })
            })
    }

    render() {
        return (
            <div>
              <Header as='h1' content='Players' style={style.headers.h1} textAlign='center' />
              <Container>
                <Segment>
                    <Grid columns={2} relaxed='very'>
                        {this.state.teams.map((team, i) => {         
                            return (
                                <Grid.Column>
                                    <Header as='h2' style={style.headers.h2} textAlign='center'>
                                        {team.name}
                                        <Header.Subheader>
                                            {team.score}
                                        </Header.Subheader>
                                    </Header>
                                    <Segment.Group>
                                        {team.players.map((player, j) => {
                                            return (
                                                <Segment>
                                                    <Label ribbon color={this.getRibbonColor(player.score)}>
                                                        {this.isStarPlayer(player) ? <Icon color='yellow' name='star'/> : ''}
                                                        {player.score}
                                                    </Label>
                                                    {player.name}
                                                    &nbsp;
                                                    <List horizontal>
                                                        {player.stats.goals.map((g) => {
                                                            return (
                                                                <List.Item><Icon color='black' name='futbol'></Icon> {g}'&nbsp;</List.Item>
                                                            )
                                                        })}
                                                    </List>
                                                    <List horizontal>
                                                        {player.stats.ownGoals.map((og) => {
                                                            return (
                                                                <List.Item><Icon color='red' name='futbol'></Icon> {og}'&nbsp;</List.Item>
                                                            )
                                                        })}
                                                    </List>
                                                    <List horizontal>
                                                        {player.stats.yellowCards.map((yc) => {
                                                            return (
                                                                <List.Item><Icon color='yellow' name='square full'></Icon> {yc}'&nbsp;</List.Item>
                                                            )
                                                        })}
                                                    </List>
                                                    <List horizontal>
                                                        {player.stats.redCards.map((rc) => {
                                                            return (
                                                                <List.Item><Icon color='red' name='square full'></Icon> {rc}'&nbsp;</List.Item>
                                                            )
                                                        })}
                                                    </List>
                                                </Segment>
                                            );
                                        })}
                                    </Segment.Group>
                                </Grid.Column>
                            ) 
                        })}
                    </Grid>
                    <Divider vertical>|</Divider>
                </Segment>
              </Container>
            </div>
        )
    }
}
export default Fixture