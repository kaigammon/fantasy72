const getGoalScore = (position, goals) => {
    let multiplier = 1
    switch(position) {
        case 'G':
        case 'D':
            multiplier = 6
            break
        case 'M':
            multiplier = 5
            break
        case 'F':
            multiplier = 4
            break
        default:
            console.warn('Invalid case for position on getGoalScore')
            multiplier = 0
            break
    }

    return multiplier * goals
}
const getAssistScore = (position, assists) => {
    return 3 * assists
}
const getCardScore = (cards) => {
    if (cards?.red) {
        return -3
    }
    if (cards?.yellow) {
        return -1
    }
    return 0
}
const getMinsScore = (mins) => {
    return mins >= 60 ? 2 : 1
}

export function getScore(player) {
    let goals = getGoalScore(player.position, player.goals?.total)
    let assists = getAssistScore(player.position, player.goals?.assists)
    let cards = getCardScore(player.cards)
    let mins = getMinsScore(player.minutes_played)

    return [goals, assists, cards, mins].reduce((a, b) => a + b, 0)
}

export function getStats(player, events) {
    let stats = {
        goals: [],
        assists: [],
        yellowCards: [],
        redCards: [],
        ownGoals: []
    }

    events.forEach((pe) => {
        switch(pe.type) {
            case 'Goal': {
                if (pe.player_id === player.player_id) {
                    if (pe.detail === 'Own Goal') {
                        stats.ownGoals.push(pe.elapsed)
                    }
                    if (pe.detail === 'Normal Goal') {
                        stats.goals.push(pe.elapsed)
                    }
                }
                if (pe.assist_id === player.player_id) {
                    if (pe.detail === 'Normal Goal') {
                        stats.assists.push(pe.elapsed)
                    }
                }
                break
            }
            case 'Card': {
                if (pe.player_id === player.player_id) {
                    if (pe.detail === 'Yellow Card') {
                        stats.yellowCards.push(pe.elapsed)
                    }
                    if (pe.detail === 'Red Card') {
                        stats.redCards.push(pe.elapsed)
                    }
                }
                break
            }
            default: {
                console.warn('Invalid case for event on getStats')
                break
            }
        }
    })

    return stats
}

export default {getScore,getStats}