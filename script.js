// Get the grid container
const grid = document.getElementById("grid");

// Set the number of columns and rows
let current_columns = 10;
let current_rows = 10;

// Create the map to save grid items
let map = [];

// Get the input fields
const columns_input = document.getElementById("column_input");
const rows_input = document.getElementById("row_input");

// Get the color picker
const color_picker = document.getElementById("color_input");

// Get the auto-switch checkbox
const auto_switch_checkbox = document.getElementById("auto_switch");

// Get the clear button
document.getElementById("clear_btn").addEventListener("click", clear_grid);

// Get the save button
document.getElementById("save_btn").addEventListener("click", function () {
    save_code();
});

// Get the load button
document.getElementById("load_btn").addEventListener("click", load_code);

// Get the textarea for custom code input
const code_input = document.getElementById("code_input");

function create_grid_item(id) {
    // Create a grid item
    let grid_item = document.createElement("button");

    // Add the grid item class
    grid_item.classList.add("grid_item");

    // Add an event listener for click or mouseover based on the auto-switch checkbox
    if (auto_switch_checkbox.checked) {
        grid_item.addEventListener("mouseover", change_color);
    } else {
        grid_item.addEventListener("click", change_color);
    }

    grid_item.setAttribute("Id", `grid_item_${id}`);

    // Add the grid item to the grid container
    grid.appendChild(grid_item);
}

function create_grid(columns, rows) {
    // Clear all existing grid items
    grid.innerHTML = "";

    // Calculate the total number of grid items
    let grid_lenght = columns * rows;

    // Create the grid items
    for (let i = 0; i < grid_lenght; i++) {
        create_grid_item(i);
    }

    grid.style.gridTemplateColumns = `repeat(${columns}, 50px)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 50px)`;
}

function update_grid(columns, rows) {
    if (columns != null) {
        current_columns = columns;
    }
    if (rows != null) {
        current_rows = rows;
    }
    create_grid(current_columns, current_rows);
}

function change_color(ev) {
    // Get the selected color from the color picker
    let color = color_picker.value;

    // Change the background color of the grid item
    ev.target.style.backgroundColor = color;
}

function clear_grid() {
    create_grid(current_columns, current_rows);
}

function save_code() {
    // Clear the map to save the current grid state
    map = [];

    let grid_lenght = current_rows * current_columns;

    for (let i = 0; i <= grid_lenght; i++) {
        // Get the grid item by its ID
        let grid_item = document.getElementById(`grid_item_${i}`);

        // Ensure the grid item exists
        if (grid_item) {
            // Get the computed background color of the grid item
            let computed_style = window.getComputedStyle(grid_item);
            let background_color = computed_style.backgroundColor;

            // Create an array to store the index and background color
            let par = [];
            par.push(i);
            par.push(background_color);

            // Add the pair to the map
            map.push(par);
        }
    }
}

function load_code() {
    let grid_lenght = current_columns * current_rows;

    for (let i = 0; i <= grid_lenght; i++) {
        // Retrieve the index from the map
        let index = map[i][0]; // The index is always the first element

        // Retrieve the background color from the map
        let background_color = map[i][1]; // The background color is always the second element

        // Apply the background color to the grid item
        document.getElementById(`grid_item_${index}`).style.backgroundColor = background_color;
    }
}

function load_user_code() {
    let code = code_input.value;

    // Split the input into pairs of IDs and background colors
    let data = code.split(",");

    // Loop to iterate over each element in the "data" array
    for (let i = 0; i < data.length; i++) {
        // Get the current element from the "data" array
        let par = data[i];

        // Split the current element into two parts using ":" as a separator
        // The first part will be used as an id, and the second as the background color
        let values = par.split(":");

        // Create the ID for the HTML element by combining "grid_item_" with the first part of the values
        let id = `grid_item_${values[0]}`;

        // Get the background color from the second part of the values
        let background_color = values[1];

        // Select the HTML element by its ID and set its background color
        document.getElementById(id).style.backgroundColor = background_color;
    }
}

// Create the initial grid
create_grid(current_columns, current_rows);

// Event listeners for input fields
columns_input.addEventListener("click", function () {
    columns_input.addEventListener("input", function () {
        update_grid(columns_input.value, null);
    });
});

rows_input.addEventListener("click", function () {
    rows_input.addEventListener("input", function () {
        update_grid(null, rows_input.value);
    });
});

code_input.addEventListener("input", load_user_code);

// Update event listeners when the auto-switch checkbox is toggled
auto_switch_checkbox.addEventListener("change", () => {
    // Recreate the grid to apply updated event listeners
    save_code();
    create_grid(current_columns, current_rows);
    load_code();
});