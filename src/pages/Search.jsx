import axios from "axios";
import {useEffect, useState} from "react";

import Lists from 'parts/Lists';
import Navbar from 'parts/Navbar';

import { getPlayersApi } from "helpers/api/players";

export default function Search(){
    const [players, setPlayers] = useState(null);
    const [params, setParams] = useState({
        username: '',
        email: '',
        experience: '',
        lvl: '',
    });

    useEffect(() => {
        const getPlayers = async () => {
            try {
                const response = await getPlayersApi();
                setPlayers(response.data);          
            } catch (error) { console.log(error); }
        };
        getPlayers();
    }, [params]);

    function handleSubmit(e){
        e.preventDefault();
        setParams({
            username: e.target.username.value,
            email: e.target.email.value,
            experience: e.target.experience.value,
            lvl: e.target.lvl.value,
        });
      }
    
    return(
        <div className="search">
            <div className="row text-white">
                <h1 className='text-center'>Search</h1>
                <div className="col-lg-6">
                <Navbar></Navbar>
                {players && (
                    <Lists players={players && players.data}></Lists>
                )}
                </div>
                <div className="col-lg-6 pt-5">
                    <form onSubmit={e => {handleSubmit(e)}}>
                    <div className="row mt-3">
                        <div className="col-lg-8">                       
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input className="form-control" type="text" name="username" id="username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input className="form-control" type="text" name="email" id="email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="experience">Experience</label>
                                <input className="form-control" type="number" name="experience" id="experience" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lvl">Level</label>
                                <input className="form-control" type="number" name="lvl" id="lvl" />
                            </div>
                        </div>
                    </div>
                    <button className="mt-4 btn btn-primary" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </div>
    )
}