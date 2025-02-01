const grid = document.getElementById("grid");

let current_columns = 10;
let current_rows = 10;

// Create the map to save grid items
let map_switch = []; // Map to store the art when the switch is toggled
let map_btn = []; // Map to store the art when the button is clicked

const columns_input = document.getElementById("column_input");
const rows_input = document.getElementById("row_input");

const color_picker = document.getElementById("color_input");

const auto_switch_checkbox = document.getElementById("auto_switch");

document.getElementById("clear_btn").addEventListener("click", clear_grid);

document.getElementById("save_btn").addEventListener("click", () => save_code(map_btn));

document.getElementById("load_btn").addEventListener("click", () => load_code(map_btn));

const code_input = document.getElementById("code_input");

function create_grid_item(id) {
    let grid_item = document.createElement("button");

    grid_item.classList.add("grid_item");

    // Add an event listener for click or mouseover based on the auto-switch checkbox
    if (auto_switch_checkbox.checked) {
        grid_item.addEventListener("mouseover", change_color);
    } else {
        grid_item.addEventListener("click", change_color);
    }

    grid_item.setAttribute("Id", `grid_item_${id}`);

    grid.appendChild(grid_item);
}

function create_grid(columns, rows) {
    grid.innerHTML = "";

    let grid_lenght = columns * rows;

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
    let color = color_picker.value;

    ev.target.style.backgroundColor = color;
}

function clear_grid() {
    create_grid(current_columns, current_rows);
}

function save_code(map) {
    // Clear the map to save the current grid state
    // map = []; // Incorrect reference handling when saving the grid state
    // When the function save_code(map) is called, the passed map parameter is overwritten locally
    map.splice(0, map.length);

    let grid_lenght = current_rows * current_columns;

    for (let i = 0; i <= grid_lenght; i++) {
        let grid_item = document.getElementById(`grid_item_${i}`);

        if (grid_item) {
            // Get the computed background color of the grid item
            let computed_style = window.getComputedStyle(grid_item);
            let background_color = computed_style.backgroundColor;

            // Create an array to store the index and background color
            let par = [];
            par.push(i);
            par.push(background_color);

            map.push(par);
        }
    }
}

function load_code(map) {
    let grid_length = current_columns * current_rows;

    for (let i = 0; i < grid_length; i++) {
        if (map[i]) {
            let index = map[i][0];
            let background_color = map[i][1];
            document.getElementById(`grid_item_${index}`).style.backgroundColor = background_color;
        }
    }
}

function load_user_code() {
    let code = code_input.value;

    // Split the input into pairs of IDs and background colors
    let data = code.split(",");

    for (let i = 0; i < data.length; i++) {
        // Get the current pair from the data array
        let pair = data[i];

        // Split the pair into two parts using ":" as a separator
        // The first part will be used as the ID, and the second as the background color
        let values = pair.split(":");

        // Create the ID for the HTML element by combining "grid_item_" with the first part of the values
        let id = `grid_item_${values[0]}`;

        // Get the background color from the second part of the values
        let background_color = values[1];

        document.getElementById(id).style.backgroundColor = background_color;
    }
}

// Create the initial grid
create_grid(current_columns, current_rows);

columns_input.addEventListener("input", function () {
    update_grid(columns_input.value, null);
});

rows_input.addEventListener("input", function () {
    update_grid(null, rows_input.value);
});

code_input.addEventListener("input", load_user_code);

// Update event listeners when the auto-switch checkbox is toggled
auto_switch_checkbox.addEventListener("change", () => {
    // Recreate the grid to apply updated event listeners
    save_code(map_switch);
    create_grid(current_columns, current_rows);
    load_code(map_switch);
});