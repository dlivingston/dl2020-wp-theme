import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useAsync } from 'react-async';
import axios from "axios";

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
    const skillList = document.getElementById('skills-list');
    const project_section = document.getElementById('project_section');

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

const getPortfolioId = (async() => {
    const response = await axios.get('/wp-json/wp/v2/categories');
    console.log('response', response.data.filter(category =>  category.slug == "portfolio" )[0].id);
    return response.data.filter(category =>  category.slug == "portfolio" )[0].id;
})


const Projects = props => {
    const [catId, setCatId] = useState('');
    const [projects, setProj] = useState([]);
    async function getCatId() {
        const response = await axios.get('/wp-json/wp/v2/categories');
        setCatId(response.data.filter(category =>  category.slug == "portfolio" )[0].id)
    }
    async function getProjects() {
        const response = await axios.get('/wp-json/wp/v2/posts?_embed&categories=' + catId);
        setProj(response.data);
        console.log('Projects', response.data);
    }
    useEffect(() => {
        getCatId();
        if(catId !== '') {
            getProjects();
        }
    },[catId]);

    
    return (
        <div>
            <h3>Project Gallery</h3>
            <div className="gallery">
                {projects.map(item => (
                    <div className="card" key={item.id}>                        
                        {(item._embedded["wp:featuredmedia"]) ? <img src={item._embedded["wp:featuredmedia"][0].source_url} alt=""/> : '' }
                        <div className="card-info">
                            <h4>{item.title.rendered}</h4>
                            <div className="excerpt" dangerouslySetInnerHTML={{__html: item.excerpt.rendered}}></div>
                            <a className="btn" href={item.link}>Learn More</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
    // return null

}

