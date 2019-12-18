// 1. Add root node to the queue, and mark it as visited(already explored).
// 2. Loop on the queue as long as it's not empty.
//    1. Get and remove the node at the top of the queue(current).
//    2. For every non-visited child of the current node, do the following:
//        1. Mark it as visited.
//        2. Check if it's the goal node, If so, then return it.
//        3. Otherwise, push it to the queue.
// 3. If queue is empty, then goal node was not found!

const queue = [];
