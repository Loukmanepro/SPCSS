document.getElementById("start-scan").addEventListener("click", function() {
    let serverUrl = document.getElementById("server-url").value;
    if (serverUrl) {
        fetchServerData(serverUrl);
    } else {
        alert("Please enter a valid server URL.");
    }
});

// تحديث المعطيات كل ثانيتين
setInterval(function() {
    let serverUrl = document.getElementById("server-url").value;
    if (serverUrl) {
        fetchServerData(serverUrl);
    }
}, 2000);

async function fetchServerData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        
        // تحديث المعلومات العامة عن الخادم
        document.getElementById("server-name").innerText = data.name || "N/A";
        document.getElementById("server-owner").innerText = data.owner || "N/A";
        document.getElementById("server-location").innerText = data.location || "N/A";
        document.getElementById("server-type").innerText = data.type || "N/A";

        // تحديث بيانات الخادم
        document.getElementById("player-count").innerText = data.players.count || "N/A";
        document.getElementById("avg-ping").innerText = data.players.avgPing || "N/A";
        document.getElementById("player-accounts").innerText = data.players.accounts.join(", ") || "N/A";

        // تحليل البيانات
        analyzeData(data);
    } catch (error) {
        console.error("Error fetching server data:", error);
    }
}

function analyzeData(data) {
    let warnings = document.getElementById("warnings");
    warnings.innerHTML = "";

    // تحليل التناقضات في البيانات
    data.analysisResults.forEach(result => {
        let warningMessage = document.createElement("div");
        warningMessage.innerText = `Warning: ${result.message}`;
        warningMessage.onclick = function() {
            showDialog(result.source);
        };
        
        warnings.appendChild(warningMessage);
    });
}

function showDialog(player) {
    // نافذة حوار تحذير
    let decision = confirm("Cheating detected from " + player + ". Do you want to ignore or intercept?");
    if (decision) {
        alert("Intercepting cheat commands from " + player);
        // إضافة الإجراءات لاعتراض الغش
    } else {
        alert("Ignoring cheat commands from " + player);
    }
}