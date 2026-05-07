import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart04";
import instruction from "./instruction.md?raw";

const convertData = (input) => {
  const species =Array.from(new Set(input.map(({species})=>species)));
  /*inputの中のspeciesだけを取り除く
  setで重複を消し、配列に戻す*/
  return species.map((species)=>{
    return{
      id:species,data:input
      .filter((item)=>item.species===species)
      /*speciesだけ残す.mapでx,yに変換しグラフで使いやすいように変換*/
      .map(({sepalLength:x,petalWidth:y})=>({x,y})),
    };
  }); // ここを作りましょう！
};
const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer04"
      dataUrl="data/iris.json"
      convertData={convertData}
      instruction={instruction}
      title="Lesson 04"
      Chart={Chart}
    />
  );
};

export default Lesson;
