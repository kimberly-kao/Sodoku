const V = 4;
var color;

// checks if current color is ok to use on the vertex v
function isSafe(v, graph, color, c){
    for(var i = 0; i<V; i++){
        if(graph[v][i] == 1 && c == color[i])
            return false;
    }
    return true;
}

function graphColoringUtil(graph, m, color, v){
    if(v == V)
        return true
    for(var c = 1; c<=m; c++){
        if(isSafe(v, graph, color, c)){
            color[v] = c;
            if(graphColoringUtil(graph, m, color, v+1))
                return true;
            color[v] = 0;
        }
    }
    return false;
}

function graphColoring(graph, m){
    color = new int[V];
    for(var i = 0; i<V; i++){
        color[i] = 0;
    }
    if(!graphColoringUtil(graph, m, color, 0)){
        return false;
    }
    return true;
}