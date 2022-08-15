import axios from "axios";
import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import Lists from 'parts/Lists';
import Navbar from 'parts/Navbar';
import { getPlayersApi } from "helpers/api/players";
import { getPlayerApi } from "helpers/api/players";
import { baseURL } from "helpers/api/index";

export default function Edit(){
    const [players, setPlayers] = useState(null);
    const [player, setPlayer] = useState({
        username: '',
        email: '',
        password: '',
        experience: '',
    });
    const [update, setUpdate] = useState(false);
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
                // const response = await axios.get(baseURL + 'players/' + id);
                const data = await response.data.data
                setPlayer({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    experience: data.experience,
                });
            } catch (error) {
                console.log(error);
            }
        };
        
        getPlayerById()
        getPlayers();
    }, [id, update]);

    function handleSubmit(e){
        e.preventDefault();
        axios
        .put(baseURL + 'players/' + id, {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            experience: e.target.experience.value,
        })
        .then(() => {
            setUpdate(!update);
        });
      }
    
      const handleChange = (event) => {
        setPlayer({
          ...player,
          [event.target.name]: event.target.value
        });
      }

    return(
        <div className="container">
            <h1 className="text-center ">Edit User</h1>
            <div className="row">
                <div className="col-lg-6">
                    <Navbar></Navbar>
                    {players && (
                        <Lists players={players && players.data}></Lists>
                    )}
                </div>
                <div className="col-lg-6">
                    <div className="form">
                    <form onSubmit={e => {handleSubmit(e)}}>
                        <div className="form-group mt-2 mt-2">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" value={player.username} onChange={handleChange} name='username' id="username" placeholder="Enter username"/>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" value={player.email} onChange={handleChange} name='email' id="email" placeholder="Enter email"/>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="password">Password <small>Can't be updated</small></label>
                            {/* I disable update password because in there's no password hash in Backend */}
                            <input type="text" className="form-control" value={player.password} onChange={handleChange} name='password' id="password" placeholder="Password" disabled/>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="experience">Experience <small>(Optional)</small></label>
                            <input type="number" className="form-control" value={player.experience} onChange={handleChange} name='experience' id="experience" placeholder='0'/>
                            
                        </div>
                        <button type="submit" className="btn btn-primary mt-4">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}