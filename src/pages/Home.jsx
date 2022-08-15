import axios from "axios";
import {useEffect, useState} from "react";

import Lists from 'parts/Lists';
import Navbar from 'parts/Navbar';

import { getPlayersApi } from "helpers/api/players";

export default function Home(){
    const [players, setPlayers] = useState(null);

    useEffect(() => {
        const getPlayers = async () => {
            try {
                const response = await getPlayersApi();
                setPlayers(response.data);          
            } catch (error) {
                console.log(error);
            }
        };
        getPlayers();
    }, []);

    return(
        <div className="container">
            <h1 className='text-center'>Home Page / All Players List</h1>
            <div className="row">
                <div className="col-lg-6">
                <Navbar></Navbar>
                {players && (
                    <Lists players={players && players.data}></Lists>
                )}
                </div>
            </div>
        </div>
    )
}