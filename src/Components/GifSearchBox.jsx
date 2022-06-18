import React, { useEffect, useState } from "react";
import style from "./GifSearchBox.module.css";

export function GifSearchBox({ selectedElem }) {
  const [search, setSearch] = useState("trending");
  const [gifs, setGifs] = useState();
  const [isLoading, setisLoading] = useState(false);

  const api_key = "oHLQO6VS4J3xjN5nnhxEqewtaQUj36KR";
  useEffect(() => {
    setisLoading(true);
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${search}&limit=20`
    )
      .then((res) => res.json())
      .then((resData) => setGifs(resData));
  }, [search]);

  const onSelectedGif = (i) => {
    selectedElem(i);
  };

  return (
    <>
      <div className={style.main}>
        <div>
          <input
            type="text"
            autofocus={true}
            spellCheck={false}
            placeholder="Search Gif"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          {gifs
            ? gifs.data.map((i) => (
                <img
                  key={i.id}
                  src={i.images.downsized.url}
                  alt={i.title}
                  onClick={() => onSelectedGif(i)}
                />
              ))
            : ""}
        </div>
      </div>
    </>
  );
}
