// Function to add an item to the list
document.getElementById('addList').addEventListener('click', function() {
    // Get and trim input values
    const Items = document.getElementById('Items').value.trim();
    const Quantity = parseInt(document.getElementById('Quantity').value.trim());
    const Price = parseFloat(document.getElementById('Price').value.trim());

    // Check if all fields are filled
    if (Items && Quantity && Price) {
        // Calculate the total price for the row
        const total = Quantity * Price;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${Items}</td>
            <td>${Quantity}</td>
            <td>${Price.toFixed(2)}$</td>
            <td class="total">${total.toFixed(2)}$</td>
            <td><button class="btn btn-warning text-white btn-sm remove-task">Remove</button></td>`;
        
        // Add the new row to the table
        document.getElementById('taskList').appendChild(tr);
        
        // Clear input fields
        document.getElementById('Items').value = '';
        document.getElementById('Quantity').value = '';
        document.getElementById('Price').value = '';
        
        // Add event listener to the remove button
        tr.querySelector('.remove-task').addEventListener('click', function() {
            // Show confirmation dialog before removing the row
            if (confirm('Are you sure you want to remove this item?')) {
                tr.remove();
                calculateTotal(); // Recalculate total after removal
                alert('Item removed successfully!'); // Show alert after removal
            }
        });

        calculateTotal(); // Recalculate total after adding
    } else {
        alert('Please fill out all fields'); // Alert if any fields are empty
    }
});

// Function to calculate the total amount
function calculateTotal() {
    let grandTotal = 0;
    document.querySelectorAll('#taskList .total').forEach(function(cell) {
        const rowTotal = parseFloat(cell.innerText.replace('$', ''));
        if (!isNaN(rowTotal)) {
            grandTotal += rowTotal; // Sum up the total amounts
        }
    });
    // Update total elements
    document.getElementById('total').innerText = grandTotal.toFixed(2) + '$';
    document.getElementById('GrandTotal').innerText = grandTotal.toFixed(2) + '$';
}
