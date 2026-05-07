import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart05";
import instruction from "./instruction.md?raw";

const convertData = (input) => {
  const genders = Array.from(new Set(input.map(({gender})=>gender)));
  /*inputからgenderを取り出す*/
const min = Math.round(
  Math.min(...input.map(({ y }) => y))
);
/* 一番小さい値を取得する*/
const max = Math.round(
  Math.max(...input.map(({ y }) => y))
);
/* 一番大きい値を取得する*/
  const bins=Array.from({length:max-min+1}).map((_,i)=>{
    /*min～maxの区間を作る*/
    const obj={
      bin:(min+i).toString(),
    };
    /*文字列にする*/
    for(const gender of genders){
      obj[gender]=0;
    }
    return obj;
  });
  /*genderの数を数えるために0にする*/
  for(const{y,gender}of input){
    /*inputのデータを1個ずつ取り出す*/
    const i=Math.round(y)-min;
    /*yの値を配列に入れている*/
    bins[i][gender]+=1;
    /*進*/
  }
  return bins;
   // ここを作りましょう！
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer05"
      convertData={convertData}
      dataUrl="data/size-and-weight.json"
      instruction={instruction}
      title="Lesson 05"
      Chart={Chart}
    />
  );
};

export default Lesson;
