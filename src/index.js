import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useAsync } from 'react-async';
import axios from "axios";
import smoothscroll from 'smoothscroll-polyfill';
import { resolve } from "styled-jsx/css";
import { format, parseISO } from 'date-fns';

smoothscroll.polyfill();

const originUrl = window.location.origin;

if(window.matchMedia("(prefers-color-scheme: light)").matches && !window.localStorage.dl_local_theme) {
    window.localStorage.setItem('dl_local_theme', 'light');
    toggleTheme('light');
}
if(window.matchMedia("(prefers-color-scheme: dark)").matches && !window.localStorage.dl_local_theme) {
    window.localStorage.setItem('dl_local_theme', 'dark');
    toggleTheme('dark');
}
if(window.localStorage.dl_local_theme && window.localStorage.dl_local_theme === 'light') {
    toggleTheme('light');
}
if(window.localStorage.dl_local_theme && window.localStorage.dl_local_theme === 'dark') {
    toggleTheme('dark');
}


function toggleTheme(theme) {
    let newTheme = theme;
    window.localStorage.dl_local_theme = document.documentElement.dataset.theme = newTheme;
}

window.onload = (event) => {
    const toggle = document.getElementById('theme-toggle');
    const skillList = document.getElementById('skills');
    const project_section = document.getElementById('project_section');
    const portfolio_main = document.getElementById('portfolio_main');
    const defaultMenu = document.getElementById('default_menu');
    const featured_posts = document.getElementById('featured_posts');

    toggle.addEventListener('change', () => {
        (document.documentElement.dataset.theme === "dark") ? toggleTheme('light') : toggleTheme('dark');
    });

    if(window.sessionStorage.dl_session_visited) {
        document.body.dataset.state = "loaded";
    }
    if(document.body.dataset.state && document.body.dataset.state === "loading") {
        document.body.dataset.state = "first-load";
        setTimeout(() => {
            document.body.dataset.state = "loaded";
            window.sessionStorage.setItem('dl_session_visited', true);
        }, 5000);
    }
    
    if(skillList) {
        window.addEventListener('scroll', throttle(function() {
            let winY = window.innerHeight || document.documentElement.clientHeight,
            distTop = skillList.getBoundingClientRect().top;
            if(distTop <= (winY * 0.8)) {
                skillList.dataset.scrollView = "view";
            }
        }, 100), false);
        window.addEventListener('resize', debounce(function() {
            let winY = window.innerHeight || document.documentElement.clientHeight,
            distTop = skillList.getBoundingClientRect().top;
            if(distTop <= (winY * 0.8)) {
                skillList.dataset.scrollView = "view";
            }
        }, 100), false);
    }
    
    if (project_section) {
        ReactDOM.render(<Projects />, project_section);
        defaultMenu.insertAdjacentHTML('beforeend', `<span class="menu-item" data-link-dest="project_section">Projects</span>`);
        document.querySelector('[data-link-dest="project_section"]').addEventListener('click', event => {
            const psOffSet = document.querySelector('#project_section').offsetTop + (window.innerHeight/2);
            document.getElementById("site-navigation").classList.remove('toggled');
            window.scroll({ top: psOffSet, left: 0, behavior: 'smooth' });
        });
        document.addEventListener('touchstart', e => {
            document.querySelectorAll('.project-gallery .card').forEach(card => card.classList.remove('active'));
        });
    }

    if (featured_posts) {
        ReactDOM.render(<BlogPosts />, featured_posts);
        defaultMenu.insertAdjacentHTML('beforeend', `<span class="menu-item" data-link-dest="featured_posts">Blog</span>`);
        document.querySelector('[data-link-dest="featured_posts"]').addEventListener('click', event => {
            const fpOffSet = document.querySelector('#featured_posts').offsetTop + (window.innerHeight/2);
            document.getElementById("site-navigation").classList.remove('toggled');
            window.scroll({ top: fpOffSet, left: 0, behavior: 'smooth' });
        });
    }

    if (portfolio_main) {
        document.getElementById('home-link').addEventListener('click', event => {
            event.preventDefault();
            document.getElementById("site-navigation").classList.remove('toggled');
            window.scroll({ top: 0, left: 0, behavior: 'smooth'});
        })
    }
    
}

function debounce(fn, ms) { 
    let time = null;
    return function() {
        let a = arguments, t = this;
        clearTimeout(time);
        time = setTimeout(function() { fn.apply(t, a); }, ms);
    }
}

function throttle(fn, ms) { 
    let time, last = 0;
    return function() {
        var a = arguments, t = this, now = +(new Date), exe = function() { last = now; fn.apply(t, a); };
        clearTimeout(time);
        (now >= last + ms) ? exe() : time = setTimeout(exe, ms);
    }
}

const Projects = props => {
    const [catId, setCatId] = useState('');
    const [projects, setProj] = useState([]);
    async function getCatId() {
        const response = await axios.get('/wp-json/wp/v2/categories');
        setCatId(response.data.filter(category =>  category.slug == "portfolio" )[0].id)
    }
    async function getProjects() {
        const response = await axios.get('/wp-json/wp/v2/posts?_embed&categories=' + catId + '&per_page=8');
        setProj(response.data);

    }
    useEffect(() => {
        getCatId();
        if(catId !== '') {
            getProjects();
        }
    },[catId]);
    return (
        <div>
            <h1>Project Gallery</h1>
            <div className="project-gallery">
                {projects.map(item => (
                    <div className="card" key={item.id} 
                        onTouchStart={ e => { 
                            document.querySelectorAll('.project-gallery .card').forEach(card => card.classList.remove('active'));
                            e.currentTarget.classList.add('active');
                        }}
                    >                        
                        {(item._embedded["wp:featuredmedia"]) ? <img src={item._embedded["wp:featuredmedia"][0].source_url} alt=""/> : '' }
                        <div className="info-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"/></svg>
                        </div>
                        <div className="card-info">
                            <div className="project-text">
                                <h4>{item.title.rendered}</h4>
                                <div className="excerpt" dangerouslySetInnerHTML={{__html: item.excerpt.rendered}}></div>
                            </div>
                            <a className="btn" href={item.link}>Learn More</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const BlogPosts = props => {
    const [posts, setPosts] = useState([]);
    async function getPosts() {
        const response = await axios.get('https://donlivingston.me/index.php/wp-json/wp/v2/posts?_embed&categories=5&per_page=3');
        setPosts(response.data);

    }
    useEffect(() => {
        getPosts();
    }, []);
    return (
        <div className="recent-posts">
            <h1>Recent Blog Posts</h1>
            <div className="blog-posts">
                {posts.map(item => (
                    <a key={item.id} href={item.link}>
                        <div className="card" >                        
                            <div className="img-and-title">
                                {(item._embedded["wp:featuredmedia"]) ? <img src={item._embedded["wp:featuredmedia"][0].source_url} alt=""/> : '' }
                                <h4>{item.title.rendered}</h4>
                            </div>
                            <div className="card-info">
                                <div className="date"><p>{format(parseISO(item.date), 'MMMM d, yyyy')}</p></div>
                                <div className="excerpt" dangerouslySetInnerHTML={{__html: item.excerpt.rendered}}></div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            <a href="https://donlivingston.me" className="btn">View Blog</a>
        </div>
    )
}

