
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../../components/navbar/Index';
import { getMangaImage, getMangaRead } from '../../../services/MangaService';
import {consumet, consumetProxy} from '../../../constants/constants';

// const ListImage = ({imgs})=>(
//     <div className="flex flex-col">
//         <ul>
//             {}
//         </ul>
//     </div>
// );

const fetchMangaImage = async (url)=>{
    const response = await getMangaImage(url);
   console.log(response);
    return await response;
}

const MangaRead = () => {
    const [data, setData] = useState();
    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');


    useEffect(()=>{
        const fetchMangaRead = async () =>{
            const response = await getMangaRead(id);
            const dataRes = await Promise.allSettled(response.map(async (val)=>{

                const imageData = await fetchMangaImage(val.img);
                return {
                    ...val,
                    imageData
                }
            })).then(res => {
                // console.log(res)
                return res.map(val=>val.value);
            });
            console.log(dataRes);

            setData(response);

        }

        fetchMangaRead();
        // fetchMangaImage();
    },[id]);

    return (<>
        <Navbar />
        {data ? (<>
            <div className="space-y-6 rounded-xl p-6 bg-white my-2">
                <span className="text-2xl font-bold ">Manga Read</span>
                <div className="flex flex-col">
                    <ul>
                    {data.map((val)=>{
                        // const test = await fetchMangaImage();
                        // console.log(test);
                        return <li>
                            <img key={val?.id} src={`${consumet}/utils/image-proxy?url=${val.img}&referer=https://mangakakalot.com`} alt={val?.id} />
                        </li>
                    })}
                    </ul>
                </div>
            </div>
        </>) : <>Loading ..</>}
    </>);
}

export default MangaRead;