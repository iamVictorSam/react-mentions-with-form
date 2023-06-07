import React, { useState, useEffect } from "react";
import { MentionsInput, Mention } from "react-mentions";
import styles from "./commentFormStyle.module.css";
import mentionStyle from "./style.module.css";

const CommentForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [dataResp, setDataResp] = useState([]);

  const [submittedComment, setSubmittedComment] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const randomId = Math.floor(Math.random() * 10000000);
    const currentDate = new Date().toLocaleString();
    const platform = getPlatform();

    const newComment = {
      id: randomId,
      name,
      email,
      comment,
      date: currentDate,
      platform,
    };

    setSubmittedComment(newComment);
    clearForm();
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setComment("");
  };

  const getPlatform = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isTablet = /(iPad|Android)/i.test(navigator.userAgent);

    if (isMobile) {
      return "Mobile";
    } else if (isTablet) {
      return "Tablet";
    } else {
      return "PC";
    }
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
    <div>
      {/* Displaying User's comment */}
      {submittedComment && (
        <div className={styles.commentTile}>
          <div>
            <strong>User #{submittedComment.id}</strong> -{" "}
            {submittedComment.name}
          </div>
          <div>Email: {submittedComment.email}</div>
          <div>
            Comment: <strong> {submittedComment.comment}</strong>
          </div>
          <div>ID: {submittedComment.id}</div>
          <div>Date: {submittedComment.date}</div>
          <div>Platform: {submittedComment.platform}</div>
        </div>
      )}

      <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <label className={styles.label} htmlFor="name">
            Name:
          </label>
          <input
            className={styles.input}
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className={styles.form_group}>
          <label className={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className={styles.form_group}>
          <label className={styles.label} htmlFor="comment">
            Comment:
          </label>
          {/* Using the Mention Component */}
          <MentionsInput
            value={comment}
            classNames={mentionStyle}
            onChange={(event, newValue) => setComment(newValue)}
          >
            <Mention
              trigger="@"
              data={dataResp}
              className={mentionStyle.mentions__mention}
            />
            <Mention
              trigger="#"
              data={dataResp}
              className={mentionStyle.mentions__mention}
            />
          </MentionsInput>
        </div>

        <button className={styles["submit-btn"]} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
