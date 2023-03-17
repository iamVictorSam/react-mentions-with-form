import { useState, useCallback, useEffect } from "react";
import { Mention, MentionsInput } from "react-mentions";
import mentionStyle from "./mentionStyle";
import merge from "lodash/merge";
import style from "./style.module.css";

// import CustomForm from "./CustomForm";

function App() {
  const [result, setResult] = useState("");
  const [emojiValue, setEmojiValue] = useState([]);

  const emailRegex = /(([^\s@]+@[^\s@]+\.[^\s@]+))$/;
  const notMatchingRegex = /($a)/;

  // let customStyle = merge({}, style, {
  //   input: {
  //     overflow: "auto",
  //     height: 80,
  //     width: 500,
  //   },
  //   highlighter: {
  //     boxSizing: "border-box",
  //     overflow: "hidden",
  //     height: 80,
  //     width: 500,
  //   },
  // });

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

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb/raw/d8e4b78cfe66862cf3809443c1dba017f37b61db/emojis.json"
    )
      .then((data) => {
        return data.json();
      })
      .then((jsonData) => {
        setEmojiValue(jsonData.emojis);
      });
  }, []);

  const queryEmojis = (query, callback) => {
    if (query.length === 0) return;

    const filterValue = emojiValue
      .filter((emoji) => {
        return emoji.name.indexOf(query.toLowerCase()) > -1;
      })
      .slice(0, 10);
    return filterValue.map(({ emoji }) => ({ id: emoji }));
  };

  return (
    // <div>
    //   <MentionsInput
    //     // value={value}
    //     // onChange={onChange}
    //     className="mentions"
    //     classNames={style}
    //     a11ySuggestionsListLabel={"Suggested mentions"}
    //   >
    //     <Mention data={data} className={style.mentions__mention} />
    //   </MentionsInput>
    // </div>
    <div className="App" style={{ padding: "2rem" }}>
      {/* Working with Default mentions */}
      <h2>Lets get started</h2>
      {/* <MentionsInput
        style={style}
        value={result}
        onChange={(e) => setResult(e.target.value)}
      >
        <Mention style={mentionStyle} data={data} />
      </MentionsInput>
      <br />
      <br />
      <br /> */}
      <h2>Single line Input</h2>
      <MentionsInput
        singleLine
        style={style}
        value={result}
        onChange={(e) => setResult(e.target.value)}
      >
        <Mention style={mentionStyle} data={data} />
      </MentionsInput>
      <br />
      <br />
      <br />
      <br />

      <h2>Using Multiple Trigger pattern</h2>
      <MentionsInput
        style={style}
        value={result}
        onChange={(e) => setResult(e.target.value)}
      >
        <Mention style={mentionStyle.mention__mention} data={data} />

        <Mention
          trigger={emailRegex}
          data={(search) => [{ id: search, display: search }]}
          onAdd={useCallback((...args) => {
            console.log(...args);
          }, [])}
          style={{ backgroundColor: "#d1c4e9" }}
        />
      </MentionsInput>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2>Scrollable Container</h2>
      <MentionsInput
        value={result}
        onChange={(e) => setResult(e.target.value)}
        // style={customStyle}
        placeholder={"Mention people using '@'"}
        a11ySuggestionsListLabel={"Suggested mentions"}
      >
        <Mention trigger="@" data={data} style={mentionStyle} />
      </MentionsInput>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2>Displaying ID</h2>
      <MentionsInput
        style={style}
        value={result}
        onChange={(e) => setResult(e.target.value)}
      >
        <Mention
          displayTransform={(id) => `<!--${id}-->`}
          style={mentionStyle}
          data={data}
        />
      </MentionsInput>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* Working with external data
     <h2>Fetching response from external sources</h2>
      <MentionsInput
        value={result}
        onChange={(e) => setResult(e.target.value)}
        style={style}
        placeholder="Mention any JsonPlaceholder username by typing `@` followed by at least one character"
        a11ySuggestionsListLabel={
          "Suggested JsonPlaceholder username for mention"
        }
      >
        <Mention
          displayTransform={(id) => `@${id}`}
          trigger="@"
          data={fetchUsers}
          style={mentionStyle}
        />
      </MentionsInput>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h3>Emoji support</h3>
      <MentionsInput
        value={result}
        onChange={(e) => setResult(e.target.value)}
        style={style}
        placeholder={"Press ':' for emojis, mention people using '@'"}
      >
        <Mention
          trigger="@"
          displayTransform={(username) => `@${username}`}
          markup="@__id__"
          data={data}
          regex={/@(\S+)/}
          style={mentionStyle}
          appendSpaceOnAdd
        />
        <Mention
          trigger="&"
          markup="__id__"
          regex={notMatchingRegex}
          data={queryEmojis}
        />
      </MentionsInput>
      <br />
      <br />
      <br />
      <br />
      {/* <CustomForm/> */}
    </div>
  );
}

export default App;
