import { units } from "./courseData";

function LandingPage({ onEnter, onStart }) {
  return (
    <div className="landing-page">
      <header className="landing-nav">
        <a className="landing-brand" href="#top" aria-label="ICT Quest home">
          <span className="landing-brand-mark">Q</span>
          <span>ICT QUEST</span>
        </a>
        <nav aria-label="Landing page navigation">
          <a href="#curriculum">Curriculum</a>
          <a href="#approach">How it works</a>
        </nav>
        <a className="landing-nav-cta" href="#learning-app" onClick={(event) => { event.preventDefault(); onEnter(); }}>
          Open learning app <span>↗</span>
        </a>
      </header>

      <main>
        <section className="landing-hero" id="top">
          <div className="hero-photo" aria-hidden="true" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content">
            <p className="landing-eyebrow"><span /> KENYA · DIPLOMA IN ICT</p>
            <h1>ICT Quest<span>.</span></h1>
            <p className="hero-copy">Build confidence in the digital skills that move your studies and work forward.</p>
            <div className="hero-actions">
              <a className="hero-primary" href="#learning-app" onClick={(event) => { event.preventDefault(); onEnter(); }}>Enter the learning space <span>→</span></a>
              <a className="hero-secondary" href="#curriculum">Explore the course <span>↓</span></a>
            </div>
            <div className="hero-footnote"><span>01—07</span> A focused ICT study path with notes, practice, and saved progress.</div>
          </div>
          <div className="hero-index"><span>LEARN BY DOING</span><strong>ICT<br />ESSENTIALS</strong><i>NOTES · PRACTICE · PROGRESS</i></div>
          <a className="scroll-cue" href="#curriculum"><span /> SCROLL TO EXPLORE</a>
        </section>

        <section className="landing-curriculum" id="curriculum">
          <div className="landing-section-heading">
            <div><p className="landing-section-label">THE STUDY PATH</p><h2>Seven units.<br /><em>One skill at a time.</em></h2></div>
            <p>Explore the unit areas, revise each topic, then put your understanding to the test. Your progress stays on this device.</p>
          </div>
          <div className="landing-unit-grid">
            {units.map((unit) => (
              <button className="landing-unit" key={unit.id} onClick={onEnter}>
                <span className="landing-unit-number">{unit.number}</span>
                <strong>{unit.title}</strong>
                <small>{unit.topics.length} TOPICS <i>·</i> 3 QUESTIONS EACH</small>
                <span className="landing-unit-arrow">↗</span>
              </button>
            ))}
          </div>
          <div className="curriculum-footer"><span>01—07 / COURSE MAP</span><button onClick={onStart}>Start with Unit 01 <span>→</span></button></div>
        </section>

        <section className="landing-approach" id="approach">
          <div className="approach-heading"><p className="landing-section-label">A PRACTICAL LEARNING LOOP</p><h2>Read. Practise.<br /><em>Know what to revisit.</em></h2></div>
          <div className="approach-steps">
            <article><span>01</span><h3>Revision notes</h3><p>Focused topic summaries introduce the main ideas before you begin.</p></article>
            <article><span>02</span><h3>Three questions</h3><p>Check your understanding and read explanations for every answer.</p></article>
            <article><span>03</span><h3>Your scoreboard</h3><p>Track your best topic scores, keep useful mistakes, and retry when ready.</p></article>
          </div>
        </section>

        <section className="landing-join">
          <div><p className="landing-section-label">READY WHEN YOU ARE</p><h2>Your next study session<br />starts here.</h2></div>
          <a href="#learning-app" onClick={(event) => { event.preventDefault(); onEnter(); }}>Open ICT Quest <span>↗</span></a>
        </section>
      </main>

      <footer className="landing-footer"><a className="landing-brand" href="#top"><span className="landing-brand-mark">Q</span><span>ICT QUEST</span></a><p>Study framework for Diploma in ICT learners in Kenya.</p><small>Topic mapping should be confirmed against the current official KNEC syllabus.</small></footer>
    </div>
  );
}

export default LandingPage;
