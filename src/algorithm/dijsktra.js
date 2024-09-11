// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      // If we encounter a wall, we skip it.
      if (closestNode.isWall) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finishNode) return visitedNodesInOrder;
      updateUnvisitedNeighbors(closestNode, grid);
    }
  }
  
  function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  
  function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  
  function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  
  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
  export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }

// #include <vector>
// #include <queue>
// #include <algorithm>

// using namespace std;

// struct Node {
//     int row;
//     int col;
//     int distance;
//     bool isWall;
//     bool isVisited;
//     Node* previousNode;

//     Node(int r, int c) : row(r), col(c), distance(INT_MAX), isWall(false), isVisited(false), previousNode(nullptr) {}
// };

// struct CompareNode {
//     bool operator()(Node* const & n1, Node* const & n2) {
//         return n1->distance > n2->distance;
//     }
// };

// vector<Node*> dijkstra(vector<vector<Node*>>& grid, Node* startNode, Node* finishNode) {
//     vector<Node*> visitedNodesInOrder;
//     startNode->distance = 0;
//     priority_queue<Node*, vector<Node*>, CompareNode> unvisitedNodes;
//     for (auto& row : grid) {
//         for (auto& node : row) {
//             unvisitedNodes.push(node);
//         }
//     }

//     while (!unvisitedNodes.empty()) {
//         sortNodesByDistance(unvisitedNodes);
//         Node* closestNode = unvisitedNodes.top();
//         unvisitedNodes.pop();
//         // If we encounter a wall, we skip it.
//         if (closestNode->isWall) continue;
//         // If the closest node is at a distance of infinity,
//         // we must be trapped and should therefore stop.
//         if (closestNode->distance == INT_MAX) return visitedNodesInOrder;
//         closestNode->isVisited = true;
//         visitedNodesInOrder.push_back(closestNode);
//         if (closestNode == finishNode) return visitedNodesInOrder;
//         updateUnvisitedNeighbors(closestNode, grid);
//     }
//     return visitedNodesInOrder;
// }

// void sortNodesByDistance(priority_queue<Node*, vector<Node*>, CompareNode>& unvisitedNodes) {
//     // This function is not necessary in C++ because the priority queue will automatically sort nodes by distance.
// }

// void updateUnvisitedNeighbors(Node* node, vector<vector<Node*>>& grid) {
//     vector<Node*> unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
//     for (auto& neighbor : unvisitedNeighbors) {
//         neighbor->distance = node->distance + 1;
//         neighbor->previousNode = node;
//     }
// }

// vector<Node*> getUnvisitedNeighbors(Node* node, vector<vector<Node*>>& grid) {
//     vector<Node*> neighbors;
//     int row = node->row;
//     int col = node->col;
//     if (row > 0) neighbors.push_back(grid[row - 1][col]);
//     if (row < grid.size() - 1) neighbors.push_back(grid[row + 1][col]);
//     if (col > 0) neighbors.push_back(grid[row][col - 1]);
//     if (col < grid[0].size() - 1) neighbors.push_back(grid[row][col + 1]);
//     neighbors.erase(remove_if(neighbors.begin(), neighbors.end(), [](Node* neighbor) { return neighbor->isVisited; }), neighbors.end());
//     return neighbors;
// }

// vector<Node*> getAllNodes(vector<vector<Node*>>& grid) {
//     vector<Node*> nodes;
//     for (auto& row : grid) {
//         for (auto& node : row) {
//             nodes.push_back(node);
//         }
//     }
//     return nodes;
// }

// // Backtracks from the finishNode to find the shortest path.
// // Only works when called *after* the dijkstra method above.
// vector<Node*> getNodesInShortestPathOrder(Node* finishNode) {
//     vector<Node*> nodesInShortestPathOrder;
//     Node* currentNode = finishNode;
//     while (currentNode != nullptr) {
//         nodesInShortestPathOrder.insert(nodesInShortestPathOrder.begin(), currentNode);
//         currentNode = currentNode->previousNode;
//     }
//     return nodesInShortestPathOrder;
// }


// Dijkstra's Algorithm using BFS approach


