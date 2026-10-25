import { useEffect, useRef, useState } from "react";
import { getUnitQuestions, practicalSteps, units } from "./courseData";
import LandingPage from "./LandingPage";
import "./index.css";

const STORAGE_KEY = "ict-quest-progress-v3";
const initialProgress = {
  xp: 0,
  completedTopics: [],
  completedLessons: [],
  rewardedQuestions: [],
  attempts: [],
  topicScores: {},
  mistakes: [],
  practicalChecked: [],
  practicalComplete: false,
  examBest: null,
};
const examQuestions = units.map((unit) => getUnitQuestions(unit)[0]);

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return saved ? { ...initialProgress, ...saved } : initialProgress;
  } catch {
    return initialProgress;
  }
}

function persistProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    return false;
  }
  return true;
}

function saveExamAttempt(previous, answers) {
  const score = examQuestions.reduce((total, item) => total + (answers[item.id] === item.correctAnswer ? 1 : 0), 0);
  const examMistakes = examQuestions.filter((item) => answers[item.id] !== item.correctAnswer).map((item) => ({
    questionId: item.id,
    unitId: item.unitId,
    topicId: item.topicId,
    question: item.prompt,
    answer: answers[item.id] === undefined ? "No answer submitted" : item.options[answers[item.id]],
    explanation: item.explanation,
  }));
  const mastered = new Set(examQuestions.filter((item) => answers[item.id] === item.correctAnswer).map((item) => item.id));
  return {
    ...previous,
    attempts: [...previous.attempts, { id: `exam-${Date.now()}`, type: "exam", score, total: examQuestions.length, date: new Date().toISOString() }],
    examBest: Math.max(previous.examBest ?? 0, score),
    xp: previous.xp + (previous.examBest === null ? 30 : 0),
    mistakes: [...previous.mistakes.filter((mistake) => !mastered.has(mistake.questionId) && !examMistakes.some((item) => item.questionId === mistake.questionId)), ...examMistakes],
  };
}

function unitScore(unit, topicScores) {
  const total = unit.topics.reduce((sum, item) => sum + item.questions.length, 0);
  const earned = unit.topics.reduce((sum, item) => sum + (topicScores[`${unit.id}:${item.id}`] ?? 0), 0);
  return { earned, total, percent: total ? Math.round((earned / total) * 100) : 0 };
}

function App() {
  const [progress, setProgress] = useState(loadProgress);
  const [screen, setScreen] = useState("landing");
  const [activeUnitId, setActiveUnitId] = useState(units[0].id);
  const [activeTopicId, setActiveTopicId] = useState(units[0].topics[0].id);
  const [answers, setAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState([]);
  const [practicalChecked, setPracticalChecked] = useState(progress.practicalChecked);
  const [examAnswers, setExamAnswers] = useState({});
  const [examSeconds, setExamSeconds] = useState(7 * 60);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [notice, setNotice] = useState("");
  const examAnswersRef = useRef(examAnswers);

  const activeUnit = units.find((unit) => unit.id === activeUnitId) || units[0];
  const activeTopic = activeUnit.topics.find((item) => item.id === activeTopicId) || activeUnit.topics[0];
  const completedCount = units.filter((unit) => unit.topics.every((item) => progress.completedTopics.includes(`${unit.id}:${item.id}`))).length;
  const completionPercent = Math.round((completedCount / units.length) * 100);
  const activeQuestions = activeTopic.questions;
  const topicKey = `${activeUnit.id}:${activeTopic.id}`;
  const topicComplete = progress.completedTopics.includes(topicKey);
  const allTopicQuestionsChecked = activeQuestions.every((item) => checkedQuestions.includes(item.id));
  const examScore = examQuestions.reduce((score, item) => score + (examAnswers[item.id] === item.correctAnswer ? 1 : 0), 0);

  useEffect(() => {
    persistProgress(progress);
  }, [progress]);

  useEffect(() => {
    if (screen !== "exam" || examSubmitted) return undefined;
    const timer = window.setInterval(() => {
      setExamSeconds((seconds) => {
        if (seconds > 1) return seconds - 1;
        window.clearInterval(timer);
        setExamSubmitted(true);
        setProgress((previous) => saveExamAttempt(previous, examAnswersRef.current));
        return 0;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [screen, examSubmitted]);

  useEffect(() => {
    examAnswersRef.current = examAnswers;
  }, [examAnswers]);

  function openUnit(unitId, topicId) {
    const unit = units.find((item) => item.id === unitId) || units[0];
    setActiveUnitId(unit.id);
    setActiveTopicId(topicId || unit.topics[0].id);
    setAnswers({});
    setCheckedQuestions([]);
    setNotice("");
    setScreen("lesson");
  }

  function checkQuestion(question) {
    const selectedAnswer = answers[question.id];
    if (selectedAnswer === undefined || checkedQuestions.includes(question.id)) return;
    const correct = selectedAnswer === question.correctAnswer;
    setCheckedQuestions((previous) => [...previous, question.id]);
    setProgress((previous) => {
      const attempts = [...previous.attempts, {
        id: `${question.id}-${Date.now()}`,
        questionId: question.id,
        unitId: activeUnit.id,
        topicId: activeTopic.id,
        selectedAnswer,
        correct,
        type: "lesson",
        date: new Date().toISOString(),
      }];
      const alreadyRewarded = previous.rewardedQuestions.includes(question.id);
      const mistakes = correct
        ? previous.mistakes.filter((mistake) => mistake.questionId !== question.id)
        : [
            ...previous.mistakes.filter((mistake) => mistake.questionId !== question.id),
            { questionId: question.id, unitId: activeUnit.id, topicId: activeTopic.id, question: question.prompt, answer: question.options[selectedAnswer], explanation: question.explanation },
          ];
      return {
        ...previous,
        attempts,
        mistakes,
        rewardedQuestions: correct && !alreadyRewarded ? [...previous.rewardedQuestions, question.id] : previous.rewardedQuestions,
        xp: previous.xp + (correct && !alreadyRewarded ? 10 : 0),
      };
    });
  }

  function completeTopic() {
    if (!allTopicQuestionsChecked) return;
    const correctCount = activeQuestions.filter((item) => answers[item.id] === item.correctAnswer).length;
    setProgress((previous) => {
      const updatedTopics = previous.completedTopics.includes(topicKey) ? previous.completedTopics : [...previous.completedTopics, topicKey];
      const unit = units.find((item) => item.id === activeUnit.id);
      const completedUnit = unit.topics.every((item) => updatedTopics.includes(`${unit.id}:${item.id}`));
      const previousBest = previous.topicScores[topicKey] ?? 0;
      return {
        ...previous,
        completedTopics: updatedTopics,
        completedLessons: completedUnit && !previous.completedLessons.includes(unit.id) ? [...previous.completedLessons, unit.id] : previous.completedLessons,
        topicScores: { ...previous.topicScores, [topicKey]: Math.max(previousBest, correctCount) },
        xp: previous.xp + (previous.completedTopics.includes(topicKey) ? 0 : 10),
      };
    });
    setNotice("Topic complete. Your best topic score is saved.");
    setScreen("dashboard");
  }

  function togglePractical(index) {
    setPracticalChecked((previous) => {
      const next = previous.includes(index) ? previous.filter((item) => item !== index) : [...previous, index];
      setProgress((stored) => ({ ...stored, practicalChecked: next }));
      return next;
    });
  }

  function completePractical() {
    setProgress((previous) => ({
      ...previous,
      practicalComplete: true,
      xp: previous.xp + (previous.practicalComplete ? 0 : 50),
    }));
    setNotice("Practical complete. +50 XP");
  }

  function startExam() {
    setExamAnswers({});
    examAnswersRef.current = {};
    setExamSeconds(7 * 60);
    setExamSubmitted(false);
    setScreen("exam");
  }

  function submitExam() {
    if (examSubmitted) return;
    setExamSubmitted(true);
    setProgress((previous) => saveExamAttempt(previous, examAnswers));
  }

  function formatTime(seconds) {
    return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
  }

  const navigation = [
    ["dashboard", "Overview", "01"],
    ["practical", "Practical", "02"],
    ["exam", "Mock exam", "03"],
    ["mistakes", "Review notebook", "04"],
  ];

  if (screen === "landing") {
    return <LandingPage onEnter={() => setScreen("dashboard")} onStart={() => openUnit(units[0].id)} />;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => setScreen("landing")} aria-label="ICT Quest public landing page"><span className="brand-mark">Q</span><span>ICT<span className="brand-light">QUEST</span></span></button>
        <p className="side-label">LEARNING SPACE</p>
        <nav className="side-nav" aria-label="Main navigation">
          {navigation.map(([id, label, number]) => <button key={id} className={`nav-item ${screen === id || (screen === "lesson" && id === "dashboard") ? "nav-active" : ""}`} onClick={() => setScreen(id)}><span className="nav-number">{number}</span><span>{label}</span>{id === "mistakes" && progress.mistakes.length > 0 && <span className="nav-count">{progress.mistakes.length}</span>}</button>)}
        </nav>
        <button className="public-site-link" onClick={() => setScreen("landing")}>← <span>Public site</span></button>
        <div className="sidebar-bottom"><div className="course-mini"><span className="mini-label">CURRENT COURSE</span><strong>KNEC Diploma in ICT</strong><span>7 units · syllabus topics to verify</span></div><span className="local-status"><i /> Saved on this device</span></div>
      </aside>

      <main className="main-area">
        <header className="topbar"><div className="breadcrumb"><span>LEARNING SPACE</span><b>/</b><strong>{navigation.find(([id]) => id === screen)?.[1] || activeUnit.title}</strong></div><div className="topbar-right"><span className="streak-chip">STUDY MODE</span><div className="xp-pill"><span>✦</span> {progress.xp} XP</div></div></header>
        {notice && <div className="notice" role="status"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss notification">×</button></div>}

        {screen === "dashboard" && (
          <section className="page-content dashboard-page">
            <div className="welcome-row"><div><p className="eyebrow">KNEC DIPLOMA IN ICT <span>·</span> COURSE MAP</p><h1>Build your digital<br />confidence.</h1><p className="subtitle">Study each unit, practise its topics, and track your best score.</p></div><div className="course-stamp"><span>YOUR COURSE</span><strong>KNEC<br />Diploma</strong><i>ICT PROGRAMME</i></div></div>
            <section className="continue-panel"><div className="continue-art"><span className="art-kicker">START HERE</span><strong>01</strong><span className="art-brackets">{`{ }`}</span><div className="art-grid" /></div><div className="continue-body"><div className="unit-topline"><span className="unit-tag">UNIT 01 · {units[0].topics.length} TOPICS</span><span className="unit-status">{progress.completedLessons.includes(units[0].id) ? "COMPLETED" : "READY TO START"}</span></div><h2>{units[0].title}</h2><p>{units[0].summary}</p><button className="primary-button" onClick={() => openUnit(units[0].id)}>{progress.completedLessons.includes(units[0].id) ? "Review unit" : "Start unit"}<span>→</span></button></div></section>
            <div className="dashboard-columns"><section className="course-map-section"><div className="section-heading"><div><p className="eyebrow">THE ROADMAP</p><h2>Your units</h2></div><span className="map-count">{completedCount} / {units.length} COMPLETE</span></div><div className="course-map"><div className="map-progress-line"><span style={{ height: `${completionPercent}%` }} /></div>{units.map((unit) => { const done = progress.completedLessons.includes(unit.id); const score = unitScore(unit, progress.topicScores); return <button className={`map-unit ${done ? "map-done" : ""}`} key={unit.id} onClick={() => openUnit(unit.id)}><span className="map-node">{done ? "✓" : unit.number}</span><span className="map-copy"><strong>{unit.title}</strong><small>{unit.topics.length} topics · {score.earned}/{score.total} correct</small></span><span className="map-state score-state">{score.percent}%</span><span className="map-arrow">→</span></button>; })}</div></section><aside className="progress-rail"><section className="progress-card"><div className="section-heading"><div><p className="eyebrow">YOUR MOMENTUM</p><h2>Progress</h2></div><span className="progress-glyph">↗</span></div><div className="progress-ring" style={{ "--progress": `${completionPercent * 3.6}deg` }}><div><strong>{completionPercent}<small>%</small></strong><span>COURSE</span></div></div><div className="mini-metrics"><div><strong>{completedCount}<small> / {units.length}</small></strong><span>Units complete</span></div><div><strong>{progress.attempts.length}</strong><span>Answers checked</span></div></div></section><section className="skill-card"><p className="eyebrow">UNIT SCOREBOARD</p><h3>Best scores, saved per unit.</h3><p>Open any unit to see your score, topic notes, and questions.</p><button className="text-button" onClick={() => setScreen("mistakes")}>Review notebook <span>→</span></button><div className="skill-decoration">↗</div></section></aside></div>
            <p className="source-note">Topics are an ICT study framework based on the unit areas requested. Detailed topic mapping should be checked against the current KNEC Diploma in ICT syllabus document.</p>
          </section>
        )}

        {screen === "lesson" && (
          <section className="page-content lesson-page">
            <button className="back-button" onClick={() => setScreen("dashboard")}>← <span>Course map</span></button>
            <div className="lesson-heading"><div><p className="eyebrow">UNIT {activeUnit.number} <span>·</span> REVISION NOTES & PRACTICE</p><h1>{activeUnit.title}</h1></div><span className="lesson-mark">{activeUnit.number}</span></div>
            <p className="objective"><strong>Unit outcome</strong>{activeUnit.summary}</p>
            <section className="unit-scoreboard"><div><span className="scoreboard-label">UNIT SCOREBOARD</span><strong>{unitScore(activeUnit, progress.topicScores).earned}<small> / {unitScore(activeUnit, progress.topicScores).total}</small></strong><span className="scoreboard-caption">best correct answers across topics</span></div><div className="scoreboard-percent">{unitScore(activeUnit, progress.topicScores).percent}%</div><div className="scoreboard-track"><span style={{ width: `${unitScore(activeUnit, progress.topicScores).percent}%` }} /></div></section>
            <nav className="topic-tabs" aria-label="Unit topics">{activeUnit.topics.map((item, index) => <button key={item.id} className={activeTopic.id === item.id ? "topic-tab topic-tab-active" : "topic-tab"} onClick={() => { setActiveTopicId(item.id); setAnswers({}); setCheckedQuestions([]); }}><span>TOPIC {String(index + 1).padStart(2, "0")}</span><strong>{item.title}</strong><small>{progress.completedTopics.includes(`${activeUnit.id}:${item.id}`) ? "COMPLETE" : `${item.questions.length} QUESTIONS`}</small></button>)}</nav>
            <p className="objective topic-objective"><strong>Topic objective</strong>{activeTopic.objective}</p>
            <div className="lesson-layout"><div className="lesson-main"><article className="lesson-card"><div className="article-label"><span>01</span> REVISION NOTES</div><h2>{activeTopic.title}</h2><ul className="revision-notes">{activeTopic.notes.map((note) => <li key={note}>{note}</li>)}</ul></article><section className="topic-questions"><div className="questions-title"><div><p className="eyebrow">PRACTICE SET</p><h2>Three questions</h2></div><span>{checkedQuestions.filter((id) => activeQuestions.some((item) => item.id === id)).length} / {activeQuestions.length} CHECKED</span></div>{activeQuestions.map((item, index) => { const checked = checkedQuestions.includes(item.id); const correct = answers[item.id] === item.correctAnswer; const rewarded = progress.rewardedQuestions.includes(item.id); return <article className="quiz-card question-card" key={item.id}><div className="quiz-heading"><span className="unit-tag">QUESTION {String(index + 1).padStart(2, "0")}</span><span className="reward">FIRST CORRECT · +10 XP</span></div><h3>{item.prompt}</h3><div className="answer-list">{item.options.map((option, optionIndex) => { let className = "answer-option"; if (answers[item.id] === optionIndex) className += " selected"; if (checked && optionIndex === item.correctAnswer) className += " correct"; else if (checked && answers[item.id] === optionIndex) className += " incorrect"; return <button key={option} className={className} onClick={() => setAnswers((previous) => ({ ...previous, [item.id]: optionIndex }))} disabled={checked} aria-pressed={answers[item.id] === optionIndex}><span className="answer-letter">{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span></button>; })}</div>{checked && <div className={`feedback ${correct ? "feedback-correct" : "feedback-incorrect"}`} role="status"><strong>{correct ? `Correct${rewarded ? " · XP already claimed" : " · +10 XP"}` : "Review this answer"}</strong><p>{item.explanation}</p></div>}<button className="check-question-button" onClick={() => checkQuestion(item)} disabled={answers[item.id] === undefined || checked}>{checked ? "Answer checked ✓" : "Check answer"}</button></article>; })}<button className="primary-button complete-topic" onClick={completeTopic} disabled={!allTopicQuestionsChecked}>{topicComplete ? "Topic completed · score updated" : "Complete topic · +10 XP"}<span>→</span></button></section></div><aside className="lesson-aside"><div className="aside-block aside-current"><span className="aside-number">01</span><strong>Revise</strong><p>Read this topic's notes before answering.</p></div><div className="aside-block"><span className="aside-number">02</span><strong>Practise</strong><p>Answer all three questions and read the explanations.</p></div><div className="aside-block"><span className="aside-number">03</span><strong>Score</strong><p>Your best topic result contributes to this unit's scoreboard.</p></div><div className="aside-progress"><span>UNIT SCORE</span><strong>{unitScore(activeUnit, progress.topicScores).earned} / {unitScore(activeUnit, progress.topicScores).total} correct</strong><div className="progress-track"><div className="progress-fill" style={{ width: `${unitScore(activeUnit, progress.topicScores).percent}%` }} /></div></div></aside></div>
          </section>
        )}

        {screen === "practical" && <section className="page-content assessment-page"><p className="eyebrow">PRACTICAL · SKILLS CHALLENGE</p><h1>Put your skills<br />to work.</h1><p className="subtitle">Create a small, organised class project using familiar productivity tools.</p><div className="assessment-layout"><article className="practical-panel"><div className="panel-head"><div><span className="unit-tag">TASK 01</span><h2>Set up a class project</h2></div><span className="time-chip">ABOUT 20 MIN</span></div><p className="task-intro">Prepare a tidy project folder with a document and a simple budget sheet. Tick each step as you complete it on your device.</p><div className="checklist">{practicalSteps.map((step, index) => <label className={`check-row ${practicalChecked.includes(index) ? "step-checked" : ""}`} key={step}><input type="checkbox" checked={practicalChecked.includes(index)} onChange={() => togglePractical(index)} /><span className="check-custom">✓</span><span>{step}</span></label>)}</div><div className="panel-foot"><span>{practicalChecked.length} OF {practicalSteps.length} CHECKS</span><button className="primary-button" onClick={completePractical} disabled={practicalChecked.length !== practicalSteps.length || progress.practicalComplete}>{progress.practicalComplete ? "Practical completed ✓" : "Submit practical · +50 XP"}</button></div></article><aside className="assessment-note"><span className="note-icon">✳</span><h3>What you’ll practise</h3><ul><li>File and folder organisation</li><li>Document formatting</li><li>Spreadsheet formulas</li><li>Responsible sharing</li></ul><p>Your checklist is saved locally as you work.</p></aside></div></section>}

        {screen === "exam" && <section className="page-content assessment-page exam-page"><div className="exam-header"><div><p className="eyebrow">ASSESSMENT · MOCK EXAM</p><h1>Check what you know.</h1><p className="subtitle">One question from each unit. Your result is saved with a topic-by-topic review.</p></div><div className={`timer ${examSeconds < 60 && !examSubmitted ? "timer-urgent" : ""}`}><span>TIME LEFT</span><strong>{formatTime(examSeconds)}</strong></div></div>{examSubmitted ? <section className="exam-result"><span className="result-kicker">ASSESSMENT COMPLETE</span><h2>{examScore} <small>/ {examQuestions.length}</small></h2><p>{examScore >= Math.ceil(examQuestions.length * .7) ? "A solid foundation. Keep revisiting the topics you missed." : "Use the topic review below, then try again when you’re ready."}</p><div className="result-bars">{examQuestions.map((item) => { const correct = examAnswers[item.id] === item.correctAnswer; const unit = units.find((entry) => entry.id === item.unitId); return <div className="result-row" key={item.id}><span>{unit.title}</span><div className="result-track"><i className={correct ? "bar-correct" : "bar-missed"} /></div><strong>{correct ? "PASS" : "REVIEW"}</strong><button onClick={() => openUnit(item.unitId, item.topicId)}>Review →</button></div>; })}</div><button className="primary-button" onClick={startExam}>Retry exam <span>↻</span></button></section> : <><div className="exam-progress"><span>{Object.keys(examAnswers).length} / {examQuestions.length} ANSWERED</span><div className="progress-track"><div className="progress-fill" style={{ width: `${Object.keys(examAnswers).length / examQuestions.length * 100}%` }} /></div></div><div className="exam-questions">{examQuestions.map((item, index) => { const unit = units.find((entry) => entry.id === item.unitId); return <article className="exam-question" key={item.id}><div><span className="unit-tag">QUESTION {String(index + 1).padStart(2, "0")} · {unit.title}</span><h2>{item.prompt}</h2></div><div className="exam-options">{item.options.map((option, optionIndex) => <button key={option} className={examAnswers[item.id] === optionIndex ? "exam-option exam-selected" : "exam-option"} onClick={() => setExamAnswers((previous) => { const next = { ...previous, [item.id]: optionIndex }; examAnswersRef.current = next; return next; })}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}</button>)}</div></article>; })}</div><button className="primary-button submit-exam" onClick={submitExam} disabled={Object.keys(examAnswers).length !== examQuestions.length}>Submit exam <span>→</span></button></>}</section>}

        {screen === "mistakes" && <section className="page-content notebook-page"><p className="eyebrow">PERSONAL REVIEW · MISTAKE NOTEBOOK</p><h1>Learn from the<br />missed ones.</h1><p className="subtitle">Incorrect answers stay here until you answer them correctly in revision practice or the mock exam.</p>{progress.mistakes.length === 0 ? <div className="empty-notebook"><span>✓</span><h2>Your notebook is clear.</h2><p>Missed answers will appear here with their revision topic and explanation.</p><button className="primary-button" onClick={() => setScreen("dashboard")}>Back to course map <span>→</span></button></div> : <div className="mistake-list">{progress.mistakes.map((mistake) => { const unit = units.find((item) => item.id === mistake.unitId); const unitTopic = unit?.topics.find((item) => item.id === mistake.topicId); if (!unit || !unitTopic) return null; return <article className="mistake-card" key={mistake.questionId}><div className="mistake-top"><span className="unit-tag">UNIT {unit.number} · {unitTopic.title}</span><span className="review-flag">REVISIT</span></div><h2>{mistake.question}</h2><p className="missed-answer">Your answer: {mistake.answer}</p><div className="mistake-explanation"><strong>Remember</strong><p>{mistake.explanation}</p></div><button className="text-button" onClick={() => openUnit(unit.id, unitTopic.id)}>Review this topic <span>→</span></button></article>; })}</div>}</section>}

        <nav className="mobile-nav" aria-label="Mobile navigation">{navigation.map(([id, label, number]) => <button key={id} className={screen === id || (screen === "lesson" && id === "dashboard") ? "mobile-active" : ""} onClick={() => setScreen(id)}><span>{number}</span>{label === "Review notebook" ? "Notebook" : label === "Mock exam" ? "Exam" : label}</button>)}</nav>
      </main>
    </div>
  );
}

export default App;
