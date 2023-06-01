import rfTexture2Large from 'assets/recipe-finder1-large.jpg';
import rfTexture2Placeholder from 'assets/recipe-finder2-placeholder.jpg';
import rfTexture2 from 'assets/recipe-finder1.jpg';
import rfTextureLarge from 'assets/recipe-finder2-large.jpg';
import rfTexturePlaceholder from 'assets/recipe-finder1-placeholder.jpg';
import rfTexture from 'assets/recipe-finder2.jpg';
import sfTextureLarge from 'assets/shivaflix-large.jpg';
import sfTexturePlaceholder from 'assets/shivaflix-placeholder.jpg';
import sfTexture from 'assets/shivaflix.jpg';
import ioTextureLarge from 'assets/imageodyssey-large.jpg';
import ioTexturePlaceholder from 'assets/imageodyssey-placeholder.jpg';
import ioTexture from 'assets/imageodyssey.jpg';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const disciplines = ['Designer', 'UI/UX', 'Problem Solver'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta
        title="Developer"
        description="Design portfolio of Sudhanshu Samal — a Web Developer with a focus on motion, experience design, and accessibility."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Use Your Imagination to create world"
        description="Generate Your Imaginative and Stunning Ideas into Image"
        buttonText="View Website"
        buttonLink="https://imageodyssey.netlify.app"
        model={{
          type: 'laptop',
          alt: 'Image Genertion Ai',
          textures: [
            {
              srcSet: [ioTexture, ioTextureLarge],
              placeholder: ioTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Recipe Finder of Every Cuisine"
        description="Find Your Favorite Food Recipe in Written Blog & Youtube Video"
        buttonText="View website"
        buttonLink="https://foodz-finder.netlify.app/"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: [rfTexture, rfTextureLarge],
              placeholder: rfTexturePlaceholder,
            },
            {
              srcSet: [rfTexture2, rfTexture2Large],
              placeholder: rfTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="ShivaFlix"
        description="Watch Your Favorite Anime For Free Without Ads & Login"
        buttonText="View Website"
        buttonLink="https://shivaflix.tk"
        model={{
          type: 'laptop',
          alt: 'Annotating a biomedical image in the Slice app',
          textures: [
            {
              srcSet: [sfTexture, sfTextureLarge],
              placeholder: sfTexturePlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
