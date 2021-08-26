import React, {useEffect, useState} from 'react';
import axios from "axios";

const GamePokemon = () => {
    const [pokemon, setPokemon] = useState([])
    const [goal, setGoal] = useState({})
    const [answer, setAnswer] = useState([])
    const [string, setString] = useState('')
    const [score, setScore] = useState(0)
    const [attempts, setAttempts] = useState(10)
    // const [refresh, setRefresh] = useState('')

    useEffect(() => {
        axios("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json")
            .then(({data}) => setPokemon(data.pokemon))
    }, [])

    const handleStart = () => {
        const random = Math.round(Math.random() * 151) + 1
        setGoal(pokemon.find(item => item.id === random))
        const numbers = [random, Math.round(Math.random() * 151) + 1, Math.round(Math.random() * 151) + 1, Math.round(Math.random() * 151) + 1]
        setAnswer(numbers.map(item => {
            return pokemon.find(elem => elem.id === item)
        }))
        if(attempts === 0){
           window.location.reload()
        }
    }

    const compareAnswer = (id) => {
        if (id === goal.id) {
            setString('Win')
            setScore(score + 1)
            setAttempts(attempts -1)

        }else {
            setString('Loose')
        }
        handleStart()
    }
    return (
        <div key={pokemon.id} className='main'>
            <button onClick={handleStart} className='start'>Start</button>
            {/*<button onClick={handleRefresh}>Refresh</button>*/}
            <div>
                <img src={goal.img} alt="" className='img'/>
            </div>
            {
                answer.map(el => (
                    <button className='btns' key={el.id} disabled={!attempts} onClick={() => compareAnswer(el.id)}>{el.name}</button>
                ))
            }
            {
                goal.id &&
                <div>
                    <h3 className='remain'>your attempts : {attempts}</h3>
                    <h5 className='string'>String: {string}</h5>
                    <h5 className='score'>Score: {score}</h5>
                </div>
            }
        </div>
    );
};

export default GamePokemon;