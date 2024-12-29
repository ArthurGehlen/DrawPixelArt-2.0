const grid = document.getElementById("grid");

// Set the number of columns and rows
let current_columns = 10;
let current_rows = 10;

// Create the map to save the grid items
let map = [];

// Get the input fields
const columns_input = document.getElementById("column_input");
const rows_input = document.getElementById("row_input");

// Get the color picker
const color_picker = document.getElementById("color_input");

// Get the auto switch button
const auto_switch_checkbox = document.getElementById("auto_switch");

// Get the clear button
document.getElementById("clear_btn").addEventListener("click", clear_grid);

// Get the textarea
const code_input = document.getElementById("code_input");

function create_grid_item(id) {
    // Create a grid item
    let grid_item = document.createElement("button");

    // Add the grid item class
    grid_item.classList.add("grid_item");

    // Add the click or mouseover event listener based on the auto-switch checkbox
    if (auto_switch_checkbox.checked) {
        grid_item.addEventListener("mouseover", change_color);
    } else {
        grid_item.addEventListener("click", change_color);
    }

    grid_item.setAttribute("Id", `grid_item_${id}`)

    // Add the grid item to the grid
    grid.appendChild(grid_item);
}

function create_grid(columns, rows) {
    // Clear the grid
    grid.innerHTML = "";

    // Calculate the number of grid items
    let grid_lenght = columns * rows;

    // Create the grid items
    for (let i = 0; i < grid_lenght; i++) {
        create_grid_item(i);
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
    create_grid(current_columns, current_rows);
}

function change_color(ev) {
    // Get the color from the color picker
    let color = color_picker.value;

    // Change the background color of the grid item
    ev.target.style.backgroundColor = color;
}

function clear_grid() {
    create_grid(current_columns, current_rows);
}

function save_code() {
    // Clear the map 
    map = [];

    let grid_lenght = current_rows * current_columns;

    for (let i = 0; i <= grid_lenght; i++) {
        // Get the grid item by ID
        let grid_item = document.getElementById(`grid_item_${i}`);

        // Check if the grid item is not null or undefined
        if (grid_item) {
            // Use getComputedStyle to get the computed style
            let computed_style = window.getComputedStyle(grid_item);
            let background_color = computed_style.backgroundColor;

            // Create the par array to store the index and background color
            let par = [];
            par.push(i);
            par.push(background_color);
            
            // Add the par in the map
            map.push(par);
        }
    }

    console.log(map);
}

// Create the initial grid
create_grid(current_columns, current_rows);

// Event listeners for input fields
columns_input.addEventListener("input", function () {
    update_grid(columns_input.value, null);
});

rows_input.addEventListener("input", function () {
    update_grid(null, rows_input.value);
});

// Update event listeners on auto-switch checkbox change
auto_switch_checkbox.addEventListener("change", () => {
    // Recreate the grid to apply updated event listeners
    create_grid(current_columns, current_rows);
});
