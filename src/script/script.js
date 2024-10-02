
const links = [
    { title: 'Bookmarklet', url: 'https://ticket.di9x.net', icon: 'fas fa-bookmark' },
    { title: 'Gửi Mail SMTP', url: 'https://smtp.di9x.com', icon: 'fas fa-mail-bulk' },
    { title: 'Kiểm tra Mail', url: 'https://testmail.di9x.net', icon: 'fas fa-envelope-open-text' },
    { title: 'Check DNS', url: 'https://dns.di9x.net/', icon: 'fas fa-network-wired' },
    { title: 'Microsoft Powershell', url: '#', icon: 'fab fa-microsoft' },
    { title: 'Wiki Mắt Bão', url: 'https://wk.di9x.net', icon: 'fab fa-wikipedia-w' },
    { title: 'Check TenantID', url: 'https://msid.di9x.net', icon: 'fab fa-windows' },
    { title: 'Cài mail Outlook', url: 'https://help.di9x.com/', icon: 'fas fa-envelope' }
];

const linksGrid = document.getElementById('links-grid');
const searchInput = document.getElementById('search-input');

function renderLinks(linksToRender) {
    linksGrid.innerHTML = '';
    linksToRender.forEach(link => {
        const div = document.createElement('div');
        div.className = 'link-item';
        div.innerHTML = `
                    <i class="${link.icon}"></i>
                    <a href="${link.url}" target="_blank" onclick="handleLinkClick(event, '${link.title}')">${link.title}</a>
                `;
        linksGrid.appendChild(div);
    });
}

function filterLinks(searchTerm) {
    return links.filter(link =>
        link.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

searchInput.addEventListener('input', (e) => {
    const filteredLinks = filterLinks(e.target.value);
    renderLinks(filteredLinks);
});

renderLinks(links);

function handleLinkClick(event, title) {
    if (title === 'Microsoft Powershell') {
        event.preventDefault();
        showPowershellAnimation();
    }
}

function showPowershellAnimation() {
    const powershellAnimation = document.getElementById('powershell-animation');
    powershellAnimation.style.display = 'flex';

    const command = "irm demo.com | iex";
    const output = `
 ____  _   ___         _____           _
|  _ \\(_) / _ \\__  __ |_   _|__   ___ | |___
| | | | || (_) \\ \\/ /   | |/ _ \\ / _ \\| / __|
| |_| | | \\__, |>  <    | | (_) | (_) | \\__ \\
|____/|_|   /_//_/\\_\\   |_|\\___/ \\___/|_|___/
`;

    new Typed('#typed-command', {
        strings: [command],
        typeSpeed: 50,
        showCursor: false,
        onComplete: (self) => {
            setTimeout(() => {
                document.querySelector('#output').textContent = output;
            }, 500);
        }
    });
}

function closePowershellAnimation() {
    const powershellAnimation = document.getElementById('powershell-animation');
    powershellAnimation.style.display = 'none';
    document.querySelector('#output').textContent = '';
    document.querySelector('#typed-command').textContent = '';
}

function copyCommand() {
    const commandText = document.getElementById('copy-command').innerText;
    navigator.clipboard.writeText(commandText).then(() => {
        alert('Đã sao chép lệnh!');
    }).catch(err => {
        console.error('Không thể sao chép: ', err);
    });
}
