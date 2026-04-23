var STORAGE_KEY = "dogti.quiz.state.v2";

var screens = {
  intro: document.getElementById("screen-intro"),
  quiz: document.getElementById("screen-quiz"),
  result: document.getElementById("screen-result")
};

var btnStart = document.getElementById("btn-start");
var btnBackIntro = document.getElementById("btn-back-intro");
var btnNext = document.getElementById("btn-next");
var btnRestart = document.getElementById("btn-restart");
var btnShare = document.getElementById("btn-share");

var quizProgressText = document.getElementById("quiz-progress-text");
var quizQuestionText = document.getElementById("quiz-question-text");
var quizOptionsContainer = document.getElementById("quiz-options");

var resultDate = document.getElementById("result-date");
var resultAvatar = document.getElementById("result-avatar");
var resultTitle = document.getElementById("result-title");
var resultSubtitle = document.getElementById("result-subtitle");
var resultQuote = document.getElementById("result-quote");
var resultTags = document.getElementById("result-tags");
var resultDesc = document.getElementById("result-desc");
var shareHint = document.getElementById("share-hint");
var introDogElements = document.querySelectorAll(".dog[data-dog-slot]");

var quizState = {
  currentIndex: 0,
  answers: []
};

var introDogImageSources = [
  ["https://placedog.net/160/160?id=11", "https://placedog.net/160/160?id=311"],
  ["https://placedog.net/160/160?id=12", "https://placedog.net/160/160?id=312"],
  ["https://placedog.net/160/160?id=13", "https://placedog.net/160/160?id=313"],
  ["https://placedog.net/160/160?id=14", "https://placedog.net/160/160?id=314"],
  ["https://placedog.net/160/160?id=15", "https://placedog.net/160/160?id=315"],
  ["https://placedog.net/160/160?id=16", "https://placedog.net/160/160?id=316"],
  ["https://placedog.net/160/160?id=17", "https://placedog.net/160/160?id=317"],
  ["https://placedog.net/160/160?id=18", "https://placedog.net/160/160?id=318"],
  ["https://placedog.net/160/160?id=19", "https://placedog.net/160/160?id=319"],
  ["https://placedog.net/160/160?id=20", "https://placedog.net/160/160?id=320"],
  ["https://placedog.net/160/160?id=21", "https://placedog.net/160/160?id=321"],
  ["https://placedog.net/160/160?id=22", "https://placedog.net/160/160?id=322"]
];

var quizQuestions = [
  {
    text: "在外面遇到了一条从没见过的陌生狗，你怎么做？",
    options: [
      { label: "A", text: "直接冲上去，先闻为敬，交朋友这件事从不犹豫", score: 2 },
      { label: "B", text: "在旁边观望，确认对方没问题再慢慢靠近", score: 1 },
      { label: "C", text: "绕开走，今天不想社交", score: 0 }
    ]
  },
  {
    text: "周末主人加班，你一个狗在家，会干嘛？",
    options: [
      { label: "A", text: "把家里巡视一圈，顺便整理好自己的窝", score: 2 },
      { label: "B", text: "睡个长觉，等主人回来再说", score: 1 },
      { label: "C", text: "趁机拆个家，给生活增加点刺激", score: 0 }
    ]
  },
  {
    text: "散步到一半，下起了小雨，你会？",
    options: [
      { label: "A", text: "坚持把既定路线走完，不能半途而废", score: 2 },
      { label: "B", text: "看主人脸色，要回家就回家", score: 1 },
      { label: "C", text: "立刻往家冲，雨天不适合出门", score: 0 }
    ]
  },
  {
    text: "如果可以选择，你更想要哪种狗生？",
    options: [
      { label: "A", text: "事业型打工狗，每天有目标有安排", score: 2 },
      { label: "B", text: "躺平快乐狗，能晒太阳就满足", score: 0 },
      { label: "C", text: "社交达人狗，到哪都有朋友", score: 1 }
    ]
  },
  {
    text: "有人摸你头但手上有一点点零食味，你会？",
    options: [
      { label: "A", text: "先享受摸头，再适当讨要一点零食", score: 1 },
      { label: "B", text: "直接把注意力全部转移到零食上", score: 0 },
      { label: "C", text: "礼貌点头，保持矜持", score: 2 }
    ]
  },
  {
    text: "晚上已经很困了，但今天计划的事还没完成，你会？",
    options: [
      { label: "A", text: "拼一把，做完再睡，不给自己留遗憾", score: 2 },
      { label: "B", text: "先睡觉，明天精神好了再补上", score: 1 },
      { label: "C", text: "计划这种东西，下次再说吧", score: 0 }
    ]
  }
];

var dogTypes = [
  {
    id: "corgi",
    title: "没做完不能睡觉的柯基",
    subtitle: "唠叨但执行力无限",
    quote: "说好今天要完成的，凌晨两点也要做完。",
    tags: ["待办清单从不过夜", "没交出自己睡不着", "靠谱到让人有点压力"],
    desc: "你像一只正在整理 todo 的小柯基，看起来毛茸茸、腿短短，但内心其实是“效率狂魔”。你会把自己的目标拆成一件件小事，然后一项项勾掉。别人以为你爱瞎操心，其实你只是对自己的生活有要求。适度学会松弛一点，也是一种很厉害的能力。",
    images: ["https://placedog.net/240/240?id=101", "https://placedog.net/240/240?id=401"]
  },
  {
    id: "samoyed",
    title: "开朗到发光的萨摩",
    subtitle: "笑容就是必杀技",
    quote: "不开心可以先遛一圈，回来再想要不要难过。",
    tags: ["自带社交力场", "容易满足的小太阳", "情绪恢复速度快"],
    desc: "你像一只不会轻易闹情绪的萨摩，身上有很强的“治愈力”。你不太会刻意追求完美，更在意当下舒不舒服。你能很快从低落里走出来，也擅长给别人带去好情绪。适当学一点规划，会让你的狗生从“快乐”升级成“又快乐又稳定”。",
    images: ["https://placedog.net/240/240?id=102", "https://placedog.net/240/240?id=402"]
  },
  {
    id: "husky",
    title: "灵感乱飞的二哈",
    subtitle: "脑洞大于行动力",
    quote: "生活这么无聊，不拆点什么对得起自己吗？",
    tags: ["创意爆棚", "执行看心情", "擅长把平淡变成故事"],
    desc: "你像一只戏特别多的哈士奇，脑子里常常有很多稀奇古怪的想法。你讨厌一成不变的重复，更喜欢有变化、有惊喜的日子。只要给你一点自由，你就能把平平无奇的事情玩出花。如果能给这些灵感配上一点点自律，你会变得非常厉害。",
    images: ["https://placedog.net/240/240?id=103", "https://placedog.net/240/240?id=403"]
  }
];

function requiredElementsReady() {
  return Boolean(
    screens.intro &&
      screens.quiz &&
      screens.result &&
      btnStart &&
      btnBackIntro &&
      btnNext &&
      btnRestart &&
      btnShare &&
      quizProgressText &&
      quizQuestionText &&
      quizOptionsContainer &&
      resultDate &&
      resultAvatar &&
      resultTitle &&
      resultSubtitle &&
      resultQuote &&
      resultTags &&
      resultDesc &&
      shareHint
  );
}

function setShareHint(message) {
  shareHint.textContent = message || "";
}

function switchScreen(target) {
  if (!screens[target]) {
    return;
  }
  for (var key in screens) {
    if (Object.prototype.hasOwnProperty.call(screens, key) && screens[key]) {
      screens[key].classList.remove("screen-active");
    }
  }
  screens[target].classList.add("screen-active");
}

function preloadImage(url, timeoutMs) {
  return new Promise(function (resolve, reject) {
    var done = false;
    var timer = setTimeout(function () {
      if (!done) {
        done = true;
        reject(new Error("图片加载超时"));
      }
    }, timeoutMs || 5000);

    var img = new Image();
    img.onload = function () {
      if (!done) {
        done = true;
        clearTimeout(timer);
        resolve(url);
      }
    };
    img.onerror = function () {
      if (!done) {
        done = true;
        clearTimeout(timer);
        reject(new Error("图片加载失败"));
      }
    };
    img.src = url;
  });
}

function applyBackgroundWithFallback(element, urls) {
  if (!element || !urls || !urls.length) {
    return Promise.resolve(false);
  }

  var i = 0;
  function tryNext() {
    if (i >= urls.length) {
      element.classList.add("image-fallback");
      element.style.backgroundImage = "";
      return Promise.resolve(false);
    }
    var currentUrl = urls[i];
    i += 1;
    return preloadImage(currentUrl, 4500)
      .then(function (loadedUrl) {
        element.classList.remove("image-fallback");
        element.style.backgroundImage = "url('" + loadedUrl + "')";
        return true;
      })
      ["catch"](function () {
        return tryNext();
      });
  }
  return tryNext();
}

function initIntroImages() {
  for (var i = 0; i < introDogElements.length; i++) {
    var slot = Number(introDogElements[i].getAttribute("data-dog-slot")) || i + 1;
    var sources = introDogImageSources[slot - 1] || [];
    applyBackgroundWithFallback(introDogElements[i], sources);
  }
}

function isValidAnswer(questionIndex, answerIndex) {
  return Boolean(
    typeof answerIndex === "number" &&
      quizQuestions[questionIndex] &&
      quizQuestions[questionIndex].options &&
      quizQuestions[questionIndex].options[answerIndex]
  );
}

function saveState() {
  var payload = {
    currentIndex: quizState.currentIndex,
    answers: quizState.answers.slice(0, quizQuestions.length)
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    return;
  }
}

function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    return;
  }
}

function loadState() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    var parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.answers)) {
      return;
    }
    var safeAnswers = [];
    for (var i = 0; i < parsed.answers.length; i++) {
      if (isValidAnswer(i, parsed.answers[i])) {
        safeAnswers[i] = parsed.answers[i];
      }
    }
    quizState.answers = safeAnswers;
    if (typeof parsed.currentIndex === "number" && parsed.currentIndex >= 0) {
      quizState.currentIndex = Math.min(parsed.currentIndex, quizQuestions.length - 1);
    } else {
      quizState.currentIndex = 0;
    }
  } catch (err) {
    return;
  }
}

function updateOptionSelection(selectedIndex) {
  var children = quizOptionsContainer.children;
  for (var i = 0; i < children.length; i++) {
    var isSelected = i === selectedIndex;
    children[i].classList.toggle("option-selected", isSelected);
    children[i].setAttribute("aria-selected", isSelected ? "true" : "false");
  }
}

function renderQuestion() {
  if (!quizQuestions.length) {
    alert("题库加载失败，请稍后重试。");
    return;
  }

  var index = quizState.currentIndex;
  if (index < 0 || index >= quizQuestions.length) {
    quizState.currentIndex = 0;
    index = 0;
  }

  var total = quizQuestions.length;
  var current = quizQuestions[index];
  var preSelected = quizState.answers[index];

  quizProgressText.textContent = index + 1 + " / " + total;
  quizQuestionText.textContent = current.text;

  quizOptionsContainer.innerHTML = "";
  btnNext.disabled = !isValidAnswer(index, preSelected);
  setShareHint("");

  current.options.forEach(function (opt, optIndex) {
    var optionEl = document.createElement("button");
    optionEl.type = "button";
    optionEl.className = "option";
    optionEl.dataset.index = String(optIndex);
    optionEl.setAttribute("role", "option");
    optionEl.setAttribute("aria-selected", "false");

    var prefixEl = document.createElement("div");
    prefixEl.className = "option-prefix";
    prefixEl.textContent = opt.label;

    var textEl = document.createElement("div");
    textEl.className = "option-text";
    textEl.textContent = opt.text;

    optionEl.appendChild(prefixEl);
    optionEl.appendChild(textEl);

    optionEl.addEventListener("click", function () {
      quizState.answers[index] = optIndex;
      updateOptionSelection(optIndex);
      btnNext.disabled = false;
      saveState();
    });

    quizOptionsContainer.appendChild(optionEl);
  });

  if (isValidAnswer(index, preSelected)) {
    updateOptionSelection(preSelected);
  }
}

function pickTypeByScore(totalScore, maxScore) {
  var ratio = maxScore > 0 ? totalScore / maxScore : 0;
  if (ratio >= 0.66) {
    return dogTypes[0];
  }
  if (ratio >= 0.33) {
    return dogTypes[1];
  }
  return dogTypes[2];
}

function calculateResult() {
  var totalScore = 0;
  var answeredCount = 0;

  for (var i = 0; i < quizQuestions.length; i++) {
    var answerIndex = quizState.answers[i];
    if (isValidAnswer(i, answerIndex)) {
      answeredCount += 1;
      totalScore += quizQuestions[i].options[answerIndex].score;
    }
  }

  if (answeredCount !== quizQuestions.length) {
    return null;
  }

  var maxScore = quizQuestions.length * 2;
  return pickTypeByScore(totalScore, maxScore);
}

function renderResult(type) {
  if (!type) {
    return;
  }

  resultTitle.textContent = type.title;
  resultSubtitle.textContent = type.subtitle;
  resultQuote.textContent = "“" + type.quote + "”";
  resultAvatar.setAttribute("aria-label", "狗格头像：" + type.title);
  applyBackgroundWithFallback(resultAvatar, type.images);

  resultTags.innerHTML = "";
  type.tags.forEach(function (tag) {
    var el = document.createElement("span");
    el.className = "result-tag";
    el.textContent = tag;
    resultTags.appendChild(el);
  });
  resultDesc.textContent = type.desc;

  var now = new Date();
  resultDate.textContent = now.getMonth() + 1 + "月" + now.getDate() + "日";
}

function startQuizFromBeginning() {
  if (!quizQuestions.length) {
    alert("题库为空，无法开始测试。");
    return;
  }
  quizState.currentIndex = 0;
  quizState.answers = [];
  clearState();
  switchScreen("quiz");
  renderQuestion();
}

function continueOrStartQuiz() {
  if (quizState.answers.length > 0) {
    switchScreen("quiz");
    renderQuestion();
    return;
  }
  startQuizFromBeginning();
}

function goNextStep() {
  var idx = quizState.currentIndex;
  if (!isValidAnswer(idx, quizState.answers[idx])) {
    setShareHint("请先选择一个答案，再继续。");
    return;
  }
  setShareHint("");

  if (quizState.currentIndex < quizQuestions.length - 1) {
    quizState.currentIndex += 1;
    saveState();
    renderQuestion();
    return;
  }

  var type = calculateResult();
  if (!type) {
    setShareHint("还有题目未作答，请检查后再提交。");
    return;
  }
  renderResult(type);
  clearState();
  switchScreen("result");
}

function shareResult() {
  var finalTitle = resultTitle.textContent;
  if (!finalTitle) {
    setShareHint("请先完成测试再分享。");
    return;
  }
  var text = "我刚做了 DogTI 狗格测试，结果是「" + finalTitle + "」，你也来试试？";
  var sharePayload = {
    title: "DogTI 狗格测试",
    text: text,
    url: window.location.href
  };

  if (navigator.share) {
    navigator
      .share(sharePayload)
      .then(function () {
        setShareHint("分享成功，快看看朋友是什么狗格。");
      })
      ["catch"](function () {
        setShareHint("已取消分享，可点击再次尝试。");
      });
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text + " " + window.location.href)
      .then(function () {
        setShareHint("文案已复制，去粘贴给朋友吧。");
      })
      ["catch"](function () {
        setShareHint("复制失败，请手动复制当前页面链接。");
      });
    return;
  }

  alert(text);
}

if (requiredElementsReady()) {
  initIntroImages();
  loadState();
  switchScreen("intro");

  btnStart.addEventListener("click", continueOrStartQuiz);
  btnBackIntro.addEventListener("click", function () {
    switchScreen("intro");
    setShareHint("");
  });
  btnNext.addEventListener("click", goNextStep);
  btnRestart.addEventListener("click", startQuizFromBeginning);
  btnShare.addEventListener("click", shareResult);
} else {
  console.error("DogTI 初始化失败：缺少必要的 DOM 节点。");
}
