import { LevelConfig, QuizQuestion } from './types';

export const INITIAL_RESOURCES = {
  soldiers: 100, // Percentage representation
  supplies: 100,
  morale: 100
};

// [AI-修改] 背景图库切换为 Wikimedia Commons（长征相关历史图片，具备可追溯来源）
export const HISTORICAL_IMAGE_LIBRARY = {
  start: "https://upload.wikimedia.org/wikipedia/commons/0/06/Long_march_Mao.jpg",
  level1XiangRiver: "https://upload.wikimedia.org/wikipedia/commons/3/39/%E4%BF%AF%E7%9E%B0%E9%95%BF%E5%BE%81%E8%B7%AF_-_Overlooking_the_Red_Army_Long_March_Route_-_2012.10_-_panoramio.jpg",
  level2JinshaRiver: "https://upload.wikimedia.org/wikipedia/commons/d/d0/060_Iron_Chain_from_Luding_Bridge_when_Red_Army_Captured_it_During_Long_March.jpg",
  level3Lazikou: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Long_March_Through_Sichuan_Luding_Bridge_%289958483594%29.jpg",
  victory: "https://upload.wikimedia.org/wikipedia/commons/1/19/Red_Army%27s_Long_March_Through_Sichuan_%289958454925%29.jpg",
  gameOver: "https://upload.wikimedia.org/wikipedia/commons/9/93/1967-10_%E7%BA%A2%E5%86%9B%E6%97%B6%E6%9C%9F%E6%B3%B8%E5%AE%9A%E6%A1%A5.jpg"
};

// [AI-修改] 作业要求为 3 关通关模式，因此保留前三关配置
export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    title: "第一关：血战湘江",
    subtitle: "生存与突围",
    description: "1934年底，中央红军在湘江边与国民党军苦战五昼夜，最终从全州、兴安之间强渡湘江，突破了敌人的第四道封锁线。",
    poemLine: "红军不怕远征难，万水千山只等闲。",
    backgroundUrl: HISTORICAL_IMAGE_LIBRARY.level1XiangRiver,
    objective: "在敌军重兵围堵下，不惜一切代价掩护中央纵队过江。"
  },
  {
    id: 2,
    title: "第二关：巧渡金沙江",
    subtitle: "策略与战术",
    description: "1935年5月，红军利用7只小船，在7天7夜间将主力部队渡过金沙江，摆脱了数十万敌军的围追堵截。",
    poemLine: "金沙水拍云崖暖，大渡桥横铁索寒。",
    backgroundUrl: HISTORICAL_IMAGE_LIBRARY.level2JinshaRiver,
    objective: "运用调虎离山之计，利用有限船只完成全军渡河。"
  },
  {
    id: 3,
    title: "第三关：激战腊子口",
    subtitle: "天险突围",
    description: "1935年9月，红军抵达甘南腊子口。两侧绝壁千仞，隘口狭窄，敌军居高临下火力封锁，突击队必须在猛烈射击中坚持并突围。",
    poemLine: "腊子口上降神兵，百丈悬崖当云梯。",
    backgroundUrl: HISTORICAL_IMAGE_LIBRARY.level3Lazikou,
    objective: "左右移动躲避子弹与手榴弹，坚持 30 秒完成突围。"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "长征的出发地主要在哪里？",
    options: ["井冈山", "瑞金", "延安", "遵义"],
    correctAnswer: 1,
    explanation: "1934年10月，中央红军主力从瑞金等地出发，开始长征。"
  },
  {
    id: 2,
    question: "确立了毛泽东同志在党中央和红军的领导地位的是哪次会议？",
    options: ["古田会议", "八七会议", "遵义会议", "瓦窑堡会议"],
    correctAnswer: 2,
    explanation: "1935年1月召开的遵义会议，是党的历史上一个生死攸关的转折点。"
  },
  {
    id: 3,
    question: "红军长征行程约为多少？",
    options: ["一万里", "五万里", "二万五千里", "十万里"],
    correctAnswer: 2,
    explanation: "红军长征行程约二万五千里，故称“万里长征”。"
  },
  {
    id: 4,
    question: "“大渡桥横铁索寒”指的是哪场战役？",
    options: ["四渡赤水", "飞夺泸定桥", "强渡大渡河", "激战腊子口"],
    correctAnswer: 1,
    explanation: "指的是红军飞夺泸定桥的英勇事迹，22名勇士冒着枪林弹雨攀踏铁索攻占桥头。"
  },
  {
    id: 5,
    question: "三大主力红军在哪里会师，标志着长征胜利结束？",
    options: ["陕北吴起镇", "甘肃会宁", "四川甘孜", "贵州遵义"],
    correctAnswer: 1,
    explanation: "1936年10月，红军三大主力在甘肃会宁地区会师，标志着长征胜利结束。"
  }
];
