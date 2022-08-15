import {useEffect, useState} from "react";
import { Link } from 'react-router-dom';

import { deletePlayerApi } from "helpers/api/players";

export default function Lists({ players }){
    const [list, setList] = useState(players);

    /* DELETE FUNCTION */
    const handleRemove = async (id) => {
        try {
            const response = await deletePlayerApi(id);
            if(response.status == 200){
                // Remove player from list without reload
                const newList = list.filter((item) => item.id !== id);
                setList(newList);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setList(players);
    }, [players]);

    return(
        <div className="lists">
            <table className="table table-dark">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    list.map((player, idx) => {
                        return(
                            <tr key={idx}>
                                <th scope="row">{idx+1}</th>
                                <td>{player.username}</td>
                                <td>
                                    <div className="d-inline">
                                        <Link to={"/detail/" + player.id} className="me-1">
                                            <img src="/assets/icon/eye.svg" alt=""/>
                                        </Link>
            
                                        <Link to={"/edit/" + player.id}><img src="/assets/icon/edit.svg" alt=""/></Link>
                                        
                                        <button type="button" className="bg-dark border-0" onClick={() => handleRemove(player.id)}>
                                            <img src="/assets/icon/trash-2.svg" alt=""/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}