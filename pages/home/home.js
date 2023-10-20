function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert('Erro ao sair');
    })
}

findTransactions();

function findTransactions() {
    firebase.firestore()
        .collection('contatos')
        .get()
        .then(snapshot => {
            const transactions = snapshot.docs.map(doc => doc.data());
            addTransactionsToScreen(transactions);
        })
}

function addTransactionsToScreen(transactions) {
    
    const tableBody = document.getElementById("transaction-table-body");
    tableBody.innerHTML = "";

    transactions.forEach(transaction => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const numeroCell = document.createElement("td");

        nameCell.textContent = transaction.name || "";        
        numeroCell.textContent = transaction.numero || "";
        
        row.appendChild(nameCell);
        row.appendChild(numeroCell);

        tableBody.appendChild(row);

    });
}


