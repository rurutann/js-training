import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart08";
import instruction from "./instruction.md?raw";

const convertData = (input) => {
  for (const item of input) {
    item.tags.sort();
    /* itemの要素のtagsをソートする */
  }

  const tagSet = new Set();
  /* Setで重複を削除 */
  for (const item of input) {
    /* 新変数itemを作り、inputの中の要素を1個ずつ取り出す */
    for (const tag of item.tags) {
      tagSet.add(tag);
      /* tagを追加している */
    }
  }
  const tags = Array.from(tagSet);

  const count = {};
  for (const tag1 of tags) {
    count[tag1] = {};
    /* 空のobjectを作る */
    for (const tag2 of tags) {
      count[tag1][tag2] = 0;
      /* tag1とtag2を0にする */
    }
  }

  for (const item of input) {
    const n = item.tags.length;
    /* items.tagsの長さ */
    for (let j = 0; j < n; ++j) {
      /* tagsの長さまで */
      for (let i = 0; i < j; ++i) {
        count[item.tags[i]][item.tags[j]] += 1;
      }
    }
  }

  const links = [];
  for (const tag1 of tags) {
    for (const tag2 of tags) {
      if (count[tag1][tag2] >= 2) {
        /* tag1とtag2が一緒に出た回数が2回以上 */
        links.push({
          source: tag1,
          target: tag2,
        });
        /* linksの末尾に追加 */
      }
    }
  }

  const nodeSet = new Set();
  for (const { source, target } of links) {
    nodeSet.add(source);
    nodeSet.add(target);
    /* 末尾に追加 */
  }

  const nodes = Array.from(nodeSet).map((tag) => {
    return {
      id: tag,
    };
  });

  return {
    nodes,
    links,
  };
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer08"
      convertData={convertData}
      dataUrl="data/qiita-articles.json"
      instruction={instruction}
      title="Lesson 08"
      Chart={Chart}
    />
  );
};

export default Lesson;
