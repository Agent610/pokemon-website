import React from "react";
import "./About.css";
import sistersBrotherPic from "../../../images/sisters-brother-pic.png";

function About() {
  return (
    <section className="about">
      <div className="about__content">
        <div className="about__image-container">
          <img
            src={sistersBrotherPic}
            alt="Me with my two sisters"
            className="about__image"
          />
        </div>
        <div className="about__text-content">
          <h1 className="about__title">About the Engineer</h1>
          <p className="about__text">
            Hello ! My name is Parth Sonanitwala and I am a passionate aspiring
            Software Engineer and a commited tutor for TripleTen. Throughout my
            journey at TripleTen, I've developed proficiency in the following
            programs: React, Javascript, HTML, CSS, Github, and Webpack. Going
            back to me and Software Engineering what I can bring to the
            customers is well designed applications and websites that deliver
            value for customers. With an expertise and speciaility in the
            backend development and a good amount of experience in the frontend.
            Also as a tutor it's more than just teaching it's about helping
            students grow and develop into beginniners to confident developers.
            I Parth, from wanting to join the Connecticut State Police and
            becoming a Connecticut State-Trooper to now a Software Engineer I'm
            ready to do any project, assignment and provide meaningful solutions
            for my company that I work with.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
