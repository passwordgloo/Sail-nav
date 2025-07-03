// js/link-render.js
import { linkGroups } from './links.js';

export function renderLinkGroups() {
    const container = document.getElementById('dynamic-links');
    if (!container) return;

    // 清空容器防止重复渲染
    container.innerHTML = '';

    linkGroups.forEach(group => {
        const linkGroupHTML = getLinkGroupHTML(group);
        container.insertAdjacentHTML('beforeend', linkGroupHTML);
    });
}

// 初始加载时执行
document.addEventListener('DOMContentLoaded', renderLinkGroups);

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
    // 隐藏导航菜单
    const navList = document.getElementById('nav_list');
    if (navList && navList.classList.contains('active')) {
        navList.classList.remove('active');
    }

    const targetId = navElement.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        console.warn(`找不到目标anchor ID：${targetId}`);
    }
}

// 暴露到全局作用域，使HTML中可以调用
window.scrollToLinkGroup = scrollToLinkGroup;