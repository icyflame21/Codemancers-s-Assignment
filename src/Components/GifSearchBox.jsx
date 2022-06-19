import React, { useEffect, useState } from "react";
import style from "./Styles/GifSearchBox.module.css";
import Masonry from "react-masonry-css";

export function GifSearchBox({ selectedElem }) {
  const [search, setSearch] = useState("trending");
  const [gifs, setGifs] = useState();

  const api_key = "oHLQO6VS4J3xjN5nnhxEqewtaQUj36KR";
  useEffect(() => {
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${search}&limit=20`
    )
      .then((res) => res.json())
      .then((resData) => {
        setGifs(resData);
        console.log(resData);
      });
  }, [search]);

  const onSelectedGif = (i) => {
    selectedElem(i);
  };
  const breakpoints = {
    default: 2,
    1100: 2,
    700: 1
  };
  return (
    <div className={style.main}>
      <div>
        <input
          type="text"
          autoFocus={true}
          spellCheck={false}
          placeholder="Search Gif"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Masonry
        breakpointCols={breakpoints}
        className={style.masonary}
        columnClassName="my-masonry-grid_column"
      >
        {gifs
          ? gifs.data.map((i) => (
              <img
                className={style.masonaryItem}
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                key={i.id}
                src={i.images.downsized.url}
                alt={i.title}
                onClick={() => onSelectedGif(i)}
              />
            ))
          : ""}
      </Masonry>
    </div>
  );
}
