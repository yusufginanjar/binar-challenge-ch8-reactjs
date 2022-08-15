import axios from "axios";
import {useEffect, useState} from "react";

import Lists from 'parts/Lists';
import Navbar from 'parts/Navbar';

import { getPlayersApi } from "helpers/api/players";
import { baseURL } from "helpers/api/index";

export default function Create(){
    const [players, setPlayers] = useState(null);
    const [player, setPlayer] = useState({
        username: '',
        email: '',
        password: '',
        experience: '',
    });

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
    }, [player]);

    function handleSubmit(e){
        e.preventDefault();
        axios
          .post(baseURL + 'players', {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            experience: e.target.experience.value,
          })
          .then(() => {
            setPlayer({
                username: '',
                email: '',
                password: '',
                experience: '',
            });
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
                <h1 className="text-center ">Create User</h1>
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
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" value={player.password} onChange={handleChange} name='password' id="password" placeholder="Password"/>
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