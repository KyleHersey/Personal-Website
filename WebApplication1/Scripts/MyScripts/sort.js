function getBoxArray() {
    var children = document.getElementById("sandbox").children;
    var boxes = [];
    for (var i = 0; i < children.length; i++) {
        if (children[i].className = "box") {
            boxes.push(children[i]);
        }
    }
    return boxes;
}

function getBoxHeights() {
    var boxes = getBoxArray();
    var heights = [];
    for (var i = 0; i < boxes.length; i++) {
        heights.push(parseInt(boxes[i].style.height));
    }
    return heights;
}


function performQueue(instructionQueue){
    var boxes = getBoxArray();

    var instruction;

    var intervalID = setInterval(doInstruction, 1);

    function doInstruction() {
        if (instructionQueue.length <= 0) {
            return;
        }
        instruction = instructionQueue.shift()
        var index1 = instruction.var1;
        var index2 = instruction.var2;

        doSwap(index1, index2);
        while(instructionQueue.length > 0 && !instructionQueue[0].takesTime){
            doInstruction();
        }

        if (instructionQueue.length == 0) {
            clearInterval(intervalID);
        }
    }

    function doSwap(i1, i2){
        var tempHeight = boxes[i1].style.height;
        boxes[i1].style.height = boxes[i2].style.height;
        boxes[i2].style.height = tempHeight;
    }
}


function mergeSortBoxesHelper() {
    var heights = getBoxHeights();
    var swapQueue = [];
    
    console.log(heights);

    var sorted = mergeSortBoxes(0, heights);
    function mergeSortBoxes(left, heights) {
        if (heights.length < 2) {
            return heights;
        } else {
            var mid = Math.floor(heights.length / 2);
            var list1 = mergeSortBoxes(left, heights.slice(0, mid));
            var list2 = mergeSortBoxes(left + mid, heights.slice(mid, heights.length));
            return merge(left, list1, list2);
        }
    }
    function merge(left, list1, list2) {
        var combined = list1.concat(list2);

        var index1 = 0;
        var index2 = list1.length;

        while (index1 < combined.length && index2 < combined.length) {
            if (combined[index1] >= combined[index2]) {
                var i;
                for (i = index2; i > index1; i--) {
                    var swap = {var1: i + left, var2: i-1 + left, takesTime: false}
                    swapQueue.push(swap);

                    var temp = combined[i];
                    combined[i] = combined[i - 1];
                    combined[i - 1] = temp;
                }
                var pauseSwap = { var1: 0, var2: 0, takesTime: true }
                swapQueue.push(pauseSwap);

                index2++;
                index1++;
            } else {
                index1++;
            }
        }
        
        return combined;
    }

    console.log(sorted);

    performQueue(swapQueue);
}



function insertionSortBoxes() {
    var heights = getBoxHeights();

    var swapQueue = [];
    for (var index = 1; index < heights.length; index++) {
        var current = heights[index];
        for (var sortedIndex = index - 1; sortedIndex >= 0 && heights[sortedIndex] > current; sortedIndex--) {
            var swap = { var1: sortedIndex, var2: sortedIndex + 1, takesTime: true};
            swapQueue.push(swap);
            
            var temp = heights[sortedIndex];
            heights[sortedIndex] = heights[sortedIndex + 1];
            heights[sortedIndex + 1] = temp;
        }
    }
    performQueue(swapQueue);
}


function bubbleSortBoxes() {
    var heights = getBoxHeights();

    sorted = false;
    var swapQueue = [];
    while (!sorted) {
        sorted = true;
        for (var i = 0; i < heights.length - 1; i++) {
            if (heights[i] > heights[i + 1]) {
                sorted = false;

                var swap = { var1: i, var2: i + 1, takesTime: true};       //swap object to be put on queue
                swapQueue.push(swap);

                var temp = heights[i];
                heights[i] = heights[i + 1];
                heights[i + 1] = temp;
            }
        }
    }
    performQueue(swapQueue);
}