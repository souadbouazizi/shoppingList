// Fonction Add list
document.getElementById('addList').addEventListener('click', function() {
    const Items = document.getElementById('Items').value.trim();
    const Quantity = parseInt(document.getElementById('Quantity').value.trim());
    const Price = parseFloat(document.getElementById('Price').value.trim());

    if (Items && Quantity && Price) {
        const total = Quantity * Price;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${Items}</td>
            <td>${Quantity}</td>
            <td>${Price.toFixed(2)}$</td>
            <td class="total">${total.toFixed(2)}$</td>
            <td><button class="btn btn-danger btn-sm remove-task">Remove</button></td>`;
        
        // Ajoutez la nouvelle ligne au tableau
        document.getElementById('taskList').appendChild(tr);
        
        // Clear input fields
        document.getElementById('Items').value = '';
        document.getElementById('Quantity').value = '';
        document.getElementById('Price').value = '';
        
        // Ajouter un écouteur d'événement pour le bouton de suppression
        tr.querySelector('.remove-task').addEventListener('click', function() {
            // Afficher la boîte de confirmation avant de supprimer la ligne
            const confirmation = confirm('Are you sure you want to remove this item?');
            if (confirmation) {
                tr.remove();
                calculateTotal(); // Recalculer le total après suppression
            }
        });

        calculateTotal(); // Recalculer le total après ajout
    } else {
        alert('Please fill out all fields');
    }
});

// Fonction pour calculer le total général
function calculateTotal() {
    let grandTotal = 0;
    document.querySelectorAll('#taskList .total').forEach(function(cell) {
        const rowTotal = parseFloat(cell.innerText.replace('$', ''));
        if (!isNaN(rowTotal)) {
            grandTotal += rowTotal;
        }
    });
    // Mise à jour des éléments de total général
    document.getElementById('total').innerText = grandTotal.toFixed(2) + '$';
    document.getElementById('GrandTotal').innerText = grandTotal.toFixed(2) + '$';
}
