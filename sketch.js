function setup() {

    seed = 0;

    createCanvas(800, 800);

    vector = createVector(10, 10);
    
    point = createVector(100, 100);

    grid = intialize_grid(width, height, 20);

    field = initialize_field(grid, seed );


    moving_point = createVector(width/2 +5, height/2 + 5);


    moving_points = initialize_moving_points(100);

}

function draw() {
    background(0);
    time = millis()/1000;

    for (point of moving_points) {
        fill(255, 0, 0);
        noStroke();
        circle(point.x, point.y, 10);

        closest_point = get_closest_point_index(point, grid);
        point.add(field[closest_point]);
        point = fix_bounds(point, width, height);
    }


    stroke(255);
    strokeWeight(1);

    for (i = 0; i < grid.length; i++) {
        point = grid[i];
        vector = field[i];
        draw_vector(point, vector);
    }

    draw_vector(point, vector);

   update_field(time);
    

}


function draw_vector(point, vector, scale = 10) {

        line(point.x, point.y, point.x + vector.x * scale, point.y + vector.y * scale);

}

function intialize_grid(width, height, spacing) {
    grid = [];
    for (x = spacing; x < width; x += spacing) {
        for (y = spacing; y < height; y += spacing) {
            grid.push(createVector(x, y));
        }
    }
    return grid;
}

function initialize_field(grid, seed = 0) {
    field = [];
    for (i = 0; i < grid.length; i++) {

        vector = createVector(noise(i + seed), noise(i + seed + 100)).rotate(i);
        vector.mult(1);

        field.push(vector);
    }
    return field;

}

function update_field(time) {
    for (i = 0; i < field.length; i++) {
        vector = field[i];
        vector.rotate(noise(i + time)/10);
        vector.mult(1);
        field[i] = vector;
    }
    return field;
}


function initialize_moving_points(number) {

    moving_points = [];

    for (i = 0; i < number; i++) {
        moving_points.push(createVector(random(width), random(height)));
    }

    return moving_points;

}


function get_closest_point_index(point, grid) {
    closest_point_index = 0;

    for (i = 0; i < grid.length; i++) {
        if (point.dist(grid[i]) < point.dist(grid[closest_point_index])) {
            closest_point_index = i;
        }
    }

    return closest_point_index;

}

function fix_bounds(point, width, height) {
    if (point.x > width) {
        point.x = 0;
    }
    if (point.x < 0) {
        point.x = width;
    }
    if (point.y > height) {
        point.y = 0;
    }
    if (point.y < 0) {
        point.y = height;
    }
    return point;
}