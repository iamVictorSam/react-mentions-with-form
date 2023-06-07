import { useState, useEffect } from "react";
import { Mention, MentionsInput } from "react-mentions";
import style from "./style.module.css";

const MentionExample = () => {
  const [result, setResult] = useState("");

  const [emoji, setEmoji] = useState();

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

  function fetchUsers(query, callback) {
    if (!query) return;
    fetch(`https://jsonplaceholder.typicode.com/users?q=${query}`, {
      json: true,
    })
      .then((res) => res.json())
      // Transform the users to what react-mentions expects
      .then((res) =>
        res.map((user) => ({ display: user.username, id: user.name }))
      )

      .then(callback);
  }

  const [text, setText] = useState("");

  const [dataResp, setDataResp] = useState([]);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/iamVictorSam/react-mentions-with-form/7d03dd94f7ae1740e835bef959d704ca81d1355b/src/names.json"
    )
      .then((response) => response.json())
      .then((json) => {
        const mentionableNames = json.people.map((person) => ({
          id: person.name,
          display: person.name,
        }));
        setDataResp(mentionableNames);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div>
        <h1>Fetching Mention Data From External Source</h1>
        <MentionsInput
          value={text}
          onChange={handleInputChange}
          classNames={style}
        >
          <Mention
            className={style.mentions__mention}
            trigger="@"
            data={dataResp}
            displayTransform={(id, display) => `@${display}`}
          />
        </MentionsInput>
        <div>{text}</div>
      </div>

      <h1>Multiple menstion Trigger Method</h1>
      <MentionsInput
        classNames={style}
        value={result}
        onChange={(e) => setResult(e.target.value)}
      >
        {/* <Mention className={style.mentions__mention} data={data} /> */}
        <Mention
          className={style.mentions__mention}
          data={dataResp}
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
        <Mention
          displayTransform={(id) => `@${id}`}
          className={style.mentions__mention}
          data={fetchUsers}
          trigger="@"
          // trigger={"?email"}
        />
      </MentionsInput>
    </>
  );
};

export default MentionExample;
