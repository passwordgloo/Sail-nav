// js/link-render.js
import { linkGroups } from './links.js';

const template = document.getElementById('linkGroupTemplate');

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('dynamic-links');
    if (!container) return;

    linkGroups.forEach(group => {
        const linkGroupHTML = getLinkGroupHTML(group);
        container.insertAdjacentHTML('beforeend', linkGroupHTML);
    });
});

function getLinkGroupHTML({ id, icon, links }) {
    const linksHTML = links.map(link => getLinkItemHTML(link)).join('');

    return `
    <div class="link_group">
        <div class="link_group_title_content">
        <i class="${icon}"></i>
        <h2 class="link_group_title" id="${id}">${id}</h2>
        </div>
        <div class="link_group_content">
        ${linksHTML}
        </div>
    </div>
`;
}

function getLinkItemHTML({ title, desc, logo, url }) {
    return `
    <a class="link_group_content_link" href="${url}" target="_blank" rel="noopener noreferrer">
        <div class="link_group_content_item">
            <div class="link_group_content_item_logo">
                <img class="link_group_content_item_logo_img" src="${logo}" alt="${title}" loading="lazy" />
            </div>
            <div class="link_group_content_item_info">
                <div class="link_group_content_item_info_content">
                    <p class="link_group_content_item_info_content_title">${title}</p>
                    <p class="link_group_content_item_info_content_description">${desc || ''}</p>
                </div>
            </div>
        </div>
    </a>
`;
}

function scrollToLinkGroup(navElement) {
    const targetId = navElement.getAttribute('data-target');

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        console.warn(`找不到目标anchor ID：${targetId}`);
    }
}
