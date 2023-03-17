import { useState, useCallback, useEffect } from "react";
import { Mention, MentionsInput } from "react-mentions";
import style from "./style.module.css";

const MentionExample = () => {
  const [result, setResult] = useState("");
  const [emojiValue, setEmojiValue] = useState([]);

  const data = [
    {
      id: "Avatar",
      display: "Avatar Aang",
    },
    {
      id: "Spiderman",
      display: "Peter Parker",
    },
  ];

  return (
    <MentionsInput
      // classNames={style}
      value={result}
      onChange={(e) => setResult(e.target.value)}
    >
      <Mention data={data} />
    </MentionsInput>
  );
};

export default MentionExample;
