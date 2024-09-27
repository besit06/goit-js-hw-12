import{a as g,S as L,i as b}from"./assets/vendor-u8rapaCG.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();const w="46065399-355f71206950d55166b7078e9",v="https://pixabay.com/api/";async function S(s,r=1,o=15){const t=`${v}?key=${w}&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${o}`;try{return(await g.get(t)).data}catch(e){throw console.error("Error fetching images:",e),e}}let d;function $(s){const r=document.querySelector(".gallery"),o=s.map(t=>`
      <li class="gallery-item">
        <a href="${t.largeImageURL}" target="_blank">
          <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${t.likes}</p>
          <p><b>Views:</b> ${t.views}</p>
          <p><b>Comments:</b> ${t.comments}</p>
          <p><b>Downloads:</b> ${t.downloads}</p>
        </div>
      </li>
    `).join("");r.insertAdjacentHTML("beforeend",o),d?d.refresh():d=new L(".gallery a")}function a(s){b.error({title:"Error",message:s})}const m=document.querySelector(".search-form"),q=m.querySelector('input[name="searchQuery"]'),P=document.querySelector(".gallery"),p=document.getElementById("loader"),f=document.querySelector(".load-more");let c=1;const u=15;let i="";function E(){p.classList.remove("hidden")}function h(){p.classList.add("hidden")}m.addEventListener("submit",I);f.addEventListener("click",M);async function I(s){if(s.preventDefault(),i=q.value.trim(),P.innerHTML="",c=1,i===""){a("Please enter a search query.");return}await y(i,c)}async function M(){c++,await y(i,c)}async function y(s,r){try{E(),f.classList.add("hidden");const o=await S(s,r,u);if(h(),o.hits.length===0&&r===1){a("Sorry, there are no images matching your search query. Please try again!");return}$(o.hits),o.hits.length<u||o.totalHits<=r*u?a("We're sorry, but you've reached the end of search results."):f.classList.remove("hidden")}catch{h(),a("Something went wrong. Please try again later.")}}
//# sourceMappingURL=index.js.map
