import axios from "axios";
import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import Lists from 'parts/Lists';
import Navbar from 'parts/Navbar';

import { getPlayersApi } from "helpers/api/players";
import { getPlayerApi } from "helpers/api/players";

export default function Detail(){
    const [players, setPlayers] = useState(null);
    const [player, setPlayer] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const getPlayers = async () => {
            try {
                const response = await getPlayersApi();
                setPlayers(response.data);          
            } catch (error) {
                console.log(error);
            }
        };

        const getPlayerById = async() => {
            try {
                const response = await getPlayerApi(id);
                const data = await response.data.data
                setPlayer({
                    username: data.username,
                    email: data.email,
                    experience: data.experience,
                    lvl: data.lvl,
                });
            } catch (error) {
                console.log(error);
            }
        };

        getPlayerById()
        getPlayers();
    }, [id]);


    return(
        <div className="container">
            <h1 className="text-center ">Detail User</h1>
            <div className="row">
                <div className="col-lg-6">
                    <Navbar></Navbar>
                    {players && (
                        <Lists players={players && players.data}></Lists>
                    )}
                </div>
                <div className="col-lg-6">
                <table className="table table-dark mt-5 pt-5">
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>{player && player.username}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{player && player.email}</td>
                            </tr>
                            <tr>
                                <td>Experience</td>
                                <td>{player && player.experience}</td>
                            </tr>
                            <tr>
                                <td>Level</td>
                                <td>{player && player.lvl}</td>
                            </tr>
                        </tbody>
                        </table>
                </div>
            </div>
        </div>
    )
}