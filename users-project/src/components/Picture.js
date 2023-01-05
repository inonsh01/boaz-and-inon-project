import React, { useState, useEffect, useContext, useRef } from "react";
import { AlbumContext } from './../components/AlbumsContext';
import "../style/Picture.css"


function Picture(params) {
    const getAlbum = useContext(AlbumContext)
    const [picture, setPicture] = useState([]);
    const idForGetSpesificPic = useRef();
    const timeFetchHappened = useRef(10);


    useEffect(() => {
        console.log("getAlbum.Album2:", getAlbum.Album);
        fetch(`https://jsonplaceholder.typicode.com/photos/?albumId=${getAlbum.Album}`)
            .then((response) => response.json())
            .then((data) => {
                let picList = [];
                let idOfPicture = 0;
                for (let i = 0; i < 10; i++) {
                    picList.push(data[i].url);
                    data[i].id > idOfPicture ? idOfPicture = data[i].id :
                        idOfPicture = idOfPicture
                }
                setPicture(picList);
                idForGetSpesificPic.current = idOfPicture;
            })
    }, [getAlbum.Album]);

    async function showMorePicture() {
        let picList = [...picture];
        let idOfPicture = 0;

        if (timeFetchHappened.current < 50) {
            for (let i = 1; i < 11; i++) {
                let num = idForGetSpesificPic.current + i
                let pictures = await fetch(`https://jsonplaceholder.typicode.com/photos/?id=${num}`)
                let data = await pictures.json();
                picList.push(data[0].url);
                data[0].id > idOfPicture ? idOfPicture = data[0].id :
                    idOfPicture = idOfPicture
                timeFetchHappened.current = timeFetchHappened.current + 1
            }
            setPicture(picList);
            idForGetSpesificPic.current = idOfPicture;
        } else {
            alert("there is no more picture in this album.")
        }

    }
    return (
        <div className="picsArea">
            <div className="pics">
                {picture.map((pic, index) =>
                    <div >
                        <img key={index} src={picture[index]} alt="picture" />
                    </div>
                )}
            </div>
            <button onClick={() => showMorePicture()}>
                Show more!
            </button>
        </div>
    )
}

export default Picture;