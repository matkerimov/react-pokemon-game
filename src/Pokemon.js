import React, {useEffect, useState} from 'react';
import axios from 'axios'

const Pokemon = () => {
    const [person, setPerson] = useState([])
    const [search, setSearch] = useState('')
    const FilteredPokemons = person.filter(item => item.name.toLowerCase().includes(search))
    const handleSearch = (e) =>{
        setSearch(e.target.value.toLowerCase())
    }
    useEffect(()=>{
        axios("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json")
            .then(({data})=> setPerson(data.pokemon))
    }, [])
    return (
        <div>
            <input type="text" onChange={handleSearch} className='search-input' placeholder='Search...'/>
            <div className='row'>
                {
                    FilteredPokemons.map((item) => (
                        <div className='col-3' key={item.id}>
                            <img src={item.img} alt=""/>
                            <div>Name:{item.name}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Pokemon;