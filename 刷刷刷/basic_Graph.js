class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = []
        } else {
            return false
        }
    }
    addEdge(v1, v2) {
        if (!this.adjacencyList[v1] || !this.adjacencyList[v2]) return false

        this.adjacencyList[v1].push(v2)
        this.adjacencyList[v2].push(v1)
        return true
    }
    removeEdge(v1, v2) {
        if (!this.adjacencyList[v1] || !this.adjacencyList[v2]) return false

        this.adjacencyList[v1] = this.adjacencyList[v1].filter(vertex => vertex !== v2)
        this.adjacencyList[v2] = this.adjacencyList[v2].filter(vertex => vertex !== v1)
        return true
    }
    removeVertex(vertex) {
        if (!this.adjacencyList[vertex]) return false

        this.adjacencyList[vertex].map(adjacencyVertex =>
            this.removeEdge(vertex, adjacencyVertex)
        )

        delete this.adjacencyList[vertex]
        return true
    }

    depthFirst(begin) {
        if (!this.adjacencyList[begin]) return false

        let data = [];
        let visited = {};
        let list = this.adjacencyList;
        recursion(begin);
        function recursion(vertex) {
            data.push(vertex)
            if (!visited[vertex]) visited[vertex] = true;
            list[vertex].map(adjacencyVertex => {
                if (!visited[adjacencyVertex]) {
                    recursion(adjacencyVertex)
                }
            })
        }
        return data
    }

    breadthFirst(begin) {
        if (!this.adjacencyList[begin]) return false

        let data = [];
        let visited = {}
        let queue = [begin];
        let list = this.adjacencyList;
        recursion()

        function recursion() {
            if (queue.length === 0) return
            let vertex = queue.shift()
            let len = list[vertex] ? list[vertex].length : 0;

            if (!visited[vertex]) {
                data.push(vertex)
                visited[vertex] = true;
                for (let i = 0; i < len; i++) {
                    if (!visited[list[vertex][i]])
                        queue.push(list[vertex][i])
                }
            }
            recursion(vertex)
        }
        return data
    }
    // A:[B,C]
    // B:[A,C]
    // C:{A,B}
}


let gg = new Graph();
gg.addVertex("A")
gg.addVertex("B")
gg.addVertex("C")
gg.addVertex("D")
gg.addVertex("E")
gg.addVertex("X")
gg.addVertex("Y")
gg.addEdge("A", "B")
gg.addEdge("A", "E")
gg.addEdge("B", "C")
gg.addEdge("B", "X")
gg.addEdge("C", "D")
gg.addEdge("D", "E")
gg.addEdge("D", "Y")