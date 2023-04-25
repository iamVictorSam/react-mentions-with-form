import { useState, useCallback, useEffect } from "react";
import { Mention, MentionsInput } from "react-mentions";
import style from "./style.module.css";

const MentionExample = () => {
  const [result, setResult] = useState("");

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

  // https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json

  return (
    <>
      <h1>Multiple mention Trigger Method</h1>
      <MentionsInput
        classNames={style}
        value={result}
        onChange={(e) => setResult(e.target.value)}
      >
        <Mention className={style.mentions__mention} data={data} />
        <Mention
          className={style.mentions__mention}
          data={data}
          trigger={"#"}
        />
        <Mention
          className={style.mentions__mention}
          data={data}
          trigger={":site"}
        />
        <Mention
          className={style.mentions__mention}
          data={data}
          trigger={"?email"}
        />
      </MentionsInput>
    </>
  );
};

export default MentionExample;
