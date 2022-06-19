import React, { useState } from "react";
import user from "./Assets/Github.jpeg";
import style from "./Styles/UserInput.module.css";
import { GifSearchBox } from "./GifSearchBox";

export function UserInput() {
  const [toggleGifBox, setToggleGifBox] = useState(false);
  const [selectedGifShow, setSelectedGifShow] = useState();
  const [writtenPost, setWrittenPost] = useState("");
  const [container, setContainer] = useState(false);
  const [posts, setPosts] = useState([]);

  const toggleGifSearchBox = () => {
    setToggleGifBox(!toggleGifBox);
  };

  const handleGifUpdate = (elem) => {
    setSelectedGifShow(elem);
    setToggleGifBox(!toggleGifBox);
  };

  const handlePosts = () => {
    if (writtenPost !== "" && selectedGifShow) {
      setPosts([
        
        {
          date: new Date(),
          text: writtenPost,
          image: selectedGifShow.images.downsized.url
        },
        ...posts
      ]);
      setSelectedGifShow();
      setWrittenPost("");
      setContainer(true);
    } else if (writtenPost === "" && !selectedGifShow) {
      alert("write something in post and select a gif");
    } else if (writtenPost === "") {
      alert("write something in post");
    } else if (!selectedGifShow) {
      alert("select a gif");
    }
  };

  return (
    <>
      <div className={style.input}>
        <div>
          <img src={user} alt="userImg" />
          <textarea
            name="text"
            id="Post"
            autoFocus={true}
            spellCheck={false}
            placeholder="Post something..."
            value={writtenPost}
            onChange={(e) => setWrittenPost(e.target.value)}
          ></textarea>
        </div>

        {selectedGifShow && (
          <img src={selectedGifShow.images.downsized.url} alt="gif" />
        )}

        <div className={style.boxes}>
          <div>Tag friends</div>
          <div>Check in</div>
          <div onClick={toggleGifSearchBox}>GIF</div>
          <div>Tag events</div>
        </div>

        {toggleGifBox && <GifSearchBox selectedElem={handleGifUpdate} />}

        <div className={style.buttonDiv}>
          <button onClick={handlePosts}>Post</button>
        </div>
      </div>
      <div className={style.post}>
        <div></div>
      </div>
      {container ? (
        <div className={style.post_container}>
          {posts
            ? posts.map((post) => (
                <>
                  <div className={style.indiviual_container}>
                    <div className={style.posts} key={post.image}>
                      <div className={style.nav}>
                        <img src={user} alt="user_img" />
                        <div className={style.nav1}>
                          <p>Biswaranjan</p>
                          <p>{`${post.date.getDate()} ${post.date.toLocaleString(
                            "en-us",
                            {
                              month: "long"
                            }
                          )} at ${post.date.toLocaleString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                          })}`}</p>
                        </div>
                      </div>
                      <div className={style.post_area}>
                        <p>{post.text}</p>
                        <img src={post.image} alt="Gif" />
                      </div>
                      <div className={style.buttons}>
                        <button>Like</button>
                        <button>Comment</button>
                        <button>Share</button>
                      </div>
                    </div>
                  </div>
                </>
              ))
            : ""}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
