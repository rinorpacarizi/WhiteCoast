import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { BusLine } from '../models/busLine';

export function BusLines(){
    const [busLines, setBusLines] = useState<BusLine[]>([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/api/busline').then(response =>{
            setBusLines(response.data);
        })
    },[])
    return(
        <div>
           <ul>
           {busLines.map(busLine=>(
               <ul key={busLine.id}>

                    <li>
                        {busLine.start}
                    </li>
                     <li>
                     {busLine.end}
                 </li>
               </ul>
                ))}
           </ul>
        </div>
    )
}