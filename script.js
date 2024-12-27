const grid = document.getElementById("grid");

// Set the number of columns and rows
let current_columns = 10;
let current_rows = 10;

// Get the input fields
const columns_input = document.getElementById("column_input");
const rows_input = document.getElementById("row_input");

function create_grid_item () {
    // Create a grid item
    let grid_item = document.createElement("div");

    // Add the grid item class
    grid_item.classList.add("grid_item");
    
    // Add the grid item to the grid
    grid.appendChild(grid_item);
}

function create_grid (columns, rows) {
    // Clear the grid
    grid.innerHTML = "";

    // Calculate the number of grid items
    let grid_lenght = columns * rows;

    // Create the grid items
    for (let i = 0; i <= grid_lenght - 1; i++) {
        create_grid_item();
    }

    // Set the grid template columns
    grid.style.gridTemplateColumns = `repeat(${columns}, 50px)`;

    // Set the grid template rows
    grid.style.gridTemplateRows = `repeat(${rows}, 50px)`;
}

function update_grid(columns, rows) {
    // Update the number of Columns
    if (columns != null) {
        current_columns = columns;
    }
    // Update the number of Rows
    if (rows != null) {
        current_rows = rows;
    }
}



create_grid(current_columns, current_rows);

// Event listeners
columns_input.addEventListener("input", function () {
    update_grid(columns_input.value, null);
    create_grid(current_columns, current_rows);
})

rows_input.addEventListener("input", function () {
    update_grid(null, rows_input.value);
    create_grid(current_columns, current_rows);
})
