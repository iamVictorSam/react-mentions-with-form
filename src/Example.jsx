import { useState, useCallback, useEffect } from "react";
import { Mention, MentionsInput } from "react-mentions";
import style from "./style.module.css";

const MentionExample = () => {
  const [result, setResult] = useState("");
  const [emojiValue, setEmojiValue] = useState([]);

  const data = [
    {
      id: "Ichigo",
      display: "Kurosaki Ichigo",
    },
    {
      id: "Madara",
      display: "Madara Uchiha",
    },
    {
      id: "Nobody",
      display: "nobody@someone.whoknows",
    },
    {
      id: "Iamvictorsam",
      display: "iamvictorsam@gmail.com",
    },
  ];

  return (
    <MentionsInput
      classNames={style}
      value={result}
      onChange={(e) => setResult(e.target.value)}
    >
      <Mention className={style.mentions__mention} data={data} />
    </MentionsInput>
  );
};

export default MentionExample;
