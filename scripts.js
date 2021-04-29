var board = document.getElementById("myCanvas");
var ctx = board.getContext("2d");
var colorset = ['#698B22', '#CD2626', '#FF7F00', '#FFD700', '#00CDCD', '#1874CD', '#FF00FF', '#CD6090'];

$(document).ready(function () {
    $("#vertex").click(function () {
        tool = "vertex";
    });
    $("#edge").click(function () {
        tool = "edge";
    });
    $("#clear").click(function () {
        clears();
    });
});

board.onmousedown = function (e) {
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    ctx.fillStyle = "#000000"
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
    ctx.fillText(++node_id, x + 10, y - 10);
    node_set.push({ id: node_id, "x": x, "y": y });
}

for (var i=0;i<node_set.length;i++){
    var n_x = node_set[i].x;
    var n_y = node_set[i].y;
    if (!adj_list[i+1]){
        adj_list[i+1] = [];
    }
    if (x <= n_x+10 && x >= n_x-10 && y <= n_y+10 && y >= n_y-10){
        if (!edge_started){
            s_x = n_x, s_y = n_y;
            glitter(s_x, s_y);
            ctx.beginPath();
            ctx.moveTo(n_x, n_y);
            edge_started = true;
            bgn_vertex = i+1;
        } else {
            draw_edge(n_x, n_y);
            glitter(s_x, s_y);
            edge_started = false;
            adj_list[bgn_vertex].push(node_set[i]["id"]);
            adj_list[node_set[i].id].push(node_set[bgn_vertex-1]["id"]);
        }      
    }
}

function send(){
    $.post("/", {adj_data: JSON.stringify(adj_list)}, function(data, status) {
        colorify_graph(JSON.parse(data));
    });
}
 
function colorify_graph (data){
    for (var i=0; i<=node_set.length; i++){
        ctx.fillStyle = colorset[data[i+1]];
        ctx.beginPath();
        ctx.arc(node_set[i].x, node_set[i].y, 10, 0 , 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();  
    }
}

function clears(){
    document.location.href="/";   
  }