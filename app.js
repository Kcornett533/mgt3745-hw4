// Set API URL (Replace with your live Cloudflare Worker URL after deployment)
const API = "https://mgt3745-hw4.YOUR-SUBDOMAIN.workers.dev";

// DOM Elements
const form = document.getElementById('provenance-form');
const pipelineInput = document.getElementById('pipeline-name');
const paramsInput = document.getElementById('execution-params');
const signatureInput = document.getElementById('file-signature');
const notesInput = document.getElementById('researcher-notes');
const clearBtn = document.getElementById('clear-btn');
const clearAllBtn = document.getElementById('clear-all-btn');
const recordsList = document.getElementById('records-list');
const statusBadge = document.getElementById('status-badge');

// Application State
let manifestEntries = [];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    refreshEntries();

    form.addEventListener('submit', handleFormSubmit);
    clearBtn.addEventListener('click', clearForm);
    if (clearAllBtn) clearAllBtn.addEventListener('click', handleClearAll);
});

// Load State from Cloudflare Worker
async function loadEntries() {
    const res = await fetch(API + "/entries");
    if (!res.ok) {
        updateStatus('MANIFEST VERIFICATION FAILED', true);
        return [];
    }
    updateStatus('SYSTEM READY', false);
    return res.json();
}

// Save State to Cloudflare Worker
async function saveEntry(entry) {
    const res = await fetch(API + "/entries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(entry),
    });

    if (!res.ok) {
        const reason = await res.text();
        updateStatus('MANIFEST VERIFICATION FAILED', true);
        alert('Could not save: ' + (reason || res.status));
        return false;
    }
    updateStatus('SYSTEM READY', false);
    return true;
}

// Refresh entries from remote server
async function refreshEntries() {
    try {
        manifestEntries = await loadEntries();
        renderEntries();
    } catch (e) {
        updateStatus('SERVER UNREACHABLE', true);
    }
}

// Handle Form Submission
async function handleFormSubmit(event) {
    event.preventDefault();

    const pipelineName = pipelineInput.value.trim();
    const executionParams = paramsInput.value.trim();
    const fileSignature = signatureInput.value.trim();
    const notes = notesInput.value.trim();

    // Client-side regex pre-validation
    const hex64Regex = /^[a-fA-F0-9]{64}$/;
    if (!pipelineName || !executionParams || !hex64Regex.test(fileSignature)) {
        updateStatus('MANIFEST VERIFICATION FAILED', true);
        alert('Validation Error: Ensure all required fields are populated and the file signature is exactly 64 hexadecimal characters.');
        return;
    }

    const newEntry = {
        id: 'MAN-' + Date.now(),
        pipelineName,
        executionParams,
        fileSignature,
        notes: notes || 'N/A'
    };

    try {
        const success = await saveEntry(newEntry);
        if (success) {
            clearForm();
            await refreshEntries();
        }
    } catch (e) {
        updateStatus('SERVER UNREACHABLE', true);
    }
}

// Render Provenance Records
function renderEntries() {
    recordsList.textContent = '';

    if (!manifestEntries || manifestEntries.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty-state';
        empty.textContent = 'No provenance entries recorded yet. Submit the form above to capture an execution log.';
        recordsList.appendChild(empty);
        return;
    }

    manifestEntries.forEach((entry) => {
        const card = document.createElement('div');
        card.className = 'record-item';

        const header = document.createElement('div');
        header.className = 'record-header';

        const title = document.createElement('span');
        title.textContent = entry.pipelineName;

        const time = document.createElement('span');
        time.style.fontSize = '0.8rem';
        time.style.color = '#64748b';
        time.textContent = entry.timestamp ? new Date(entry.timestamp).toLocaleString() : new Date().toLocaleString();

        header.appendChild(title);
        header.appendChild(time);

        const meta = document.createElement('div');
        meta.className = 'record-meta';

        const hashSpan = document.createElement('code');
        hashSpan.textContent = entry.fileSignature;

        meta.innerHTML = `
            <strong>SHA-256 Hash:</strong> <code>${escapeText(entry.fileSignature)}</code><br>
            <strong>Parameters:</strong> ${escapeText(entry.executionParams)}<br>
            <strong>Notes:</strong> ${escapeText(entry.notes)}
        `;

        const actions = document.createElement('div');
        actions.className = 'record-actions';

        const exportBtn = document.createElement('button');
        exportBtn.className = 'btn btn-secondary';
        exportBtn.textContent = 'Export JSON Manifest';
        exportBtn.onclick = () => exportManifestJSON(entry);

        actions.appendChild(exportBtn);

        card.appendChild(header);
        card.appendChild(meta);
        card.appendChild(actions);

        recordsList.appendChild(card);
    });
}

// Export Manifest JSON Blob
function exportManifestJSON(entry) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entry, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${entry.pipelineName.replace(/[^a-z0-9]/gi, '_')}_manifest.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function handleClearAll() {
    alert('Server table reset must be performed via D1 CLI commands.');
}

function clearForm() {
    pipelineInput.value = '';
    paramsInput.value = '';
    signatureInput.value = '';
    notesInput.value = '';
}

function updateStatus(message, isError) {
    statusBadge.textContent = message;
    statusBadge.className = isError ? 'badge badge-danger' : 'badge badge-success';
}

function escapeText(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
}
