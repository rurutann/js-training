import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart07";
import instruction from "./instruction.md?raw";

const convertData = (input) => {
  for (const item of input) {
    /* itemoという変数を作る */
    /* inputのデータを取り出す */
    const d = new Date(`${item.createdAt} UTC`);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const date = `${d.getDate()}`.padStart(2, "0");
    item.createdAt = `${year}-${month}-${date}`;
    /* createdAtに上書き */
  }

  const dates = Array.from(new Set(input.map(({ createdAt }) => createdAt)));
  /* inputからcreatedAtだけを抜き出す */
  /* Setで重複を消す */
  dates.sort();
  /* ソート */
  const count = { tweet: {}, retweet: {} };

  for (const d of dates) {
    count.tweet[d] = 0;
    count.retweet[d] = 0;
  }
  /* dataのデータを取り出す */
  for (const { createdAt, isRetweet } of input) {
    if (isRetweet) {
      count.retweet[createdAt] += 1;
      /* リツイートの回数 */
    } else {
      count.tweet[createdAt] += 1;
    }
    /* ツイートの回数 */
  }
  return ["tweet", "retweet"].map((key) => {
    /* tweet,retweetのデータを作る */
    return {
      id: key,
      /* tweetならid:tweetとでる逆もしかり */
      data: dates.map((d) => {
        /* 日付ごとのデータ */
        return {
          x: d,
          y: count[key][d],
          /* 必要なデータだけで組み立て */
        };
      }),
    };
  });
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer07"
      convertData={convertData}
      dataUrl="data/covid19-tweets.json"
      instruction={instruction}
      title="Lesson 07"
      Chart={Chart}
    />
  );
};

export default Lesson;
