import './NewPokemon.css';
import { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';

const toBase64 = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
}).then((data) => {
    return data
});

const families : FamiliesI[]  = [
    {
        nome: 'fuoco',
        abilities: ['palla di fuoco', 'accendino']
    },
    {
        nome: 'acqua',
        abilities: ['tsunami', 'bolle di sapone']
    },
    {
        nome: 'erba',
        abilities: ['zecche assassine', 'erbaccia']
    }
]


export interface NewPokemonI {
    [name: string]: string | number | undefined | FamiliesI[]
}


export interface FamiliesI{
    nome: string,
    abilities: string[]
}

function NewPokemon() {

    const [newPokemon, setNewPokemon] = useState<NewPokemonI>({
        name: '',
        weight: 0,
        height: 0,
        family: '',
        ability: '',
        image: ''
    })

    const fileRef = useRef(null);

    function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        const value = {
            ...newPokemon
        }
        value[event.target.id] = event.target.value
        setNewPokemon(value);
    }

    async function salvaPokemon() {
        console.log(fileRef);
        const value: NewPokemonI = {
            ...newPokemon
        }

        //@ts-ignore
        if(fileRef?.current?.files[0]){
        //@ts-ignore
         const file = await toBase64(fileRef.current.files[0]) as string;
        value['image'] = file;   
        }        

        console.log(newPokemon);
    }

    return (
        <div id='aggiungi-pokemon'>
            <form>
                <label>Nome:</label>
                <input id='name' type='text' value={newPokemon.name as string} onChange={handleChange} />
                <label>Peso:</label>
                <input id='weight' type='number' value={newPokemon.weight as number} onChange={handleChange} />
                <label>Altezza:</label>
                <input id='height' type='number' value={newPokemon.height as number} onChange={handleChange} />

                <label>Famiglia:</label>
                <select id='family' value={newPokemon.family as string} onChange={handleChange}>
                    <option>Seleziona una famiglia</option>
                    {
                        families?.map((el: FamiliesI) =>
                            <option key={el.nome} value={el.nome}>{el.nome}</option>)
                    }
                </select>


                <label>Abilità:</label>
                <select id='ability' value={newPokemon.ability as string} onChange={handleChange}>
                    <option>Seleziona un'abilità</option>
                    {
                        families.find(el => el.nome === newPokemon.family)?.abilities.map(el =>
                            <option key={el} value={el}>{el}</option>)
                    }
                </select>

                <label>Immagine:</label>
                <input id='image' type='file' ref={fileRef} accept='image/png, image/gif, image/jpeg' />
                <button type='button' onClick={salvaPokemon} >Salva</button>
            </form>
        </div>
    )
}
export default NewPokemon;